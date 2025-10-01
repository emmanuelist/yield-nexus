;; Yield Farming Strategy Contract - Compound Yield Generation
;; A concrete strategy that stakes LP tokens and compounds rewards for maximum yield

;; --- IMPORTS & TRAITS ---
(impl-trait .yield-manager.strategy-trait)

;; --- CONSTANTS ---
(define-constant ERR_NOT_AUTHORIZED (err u401))
(define-constant ERR_INSUFFICIENT_BALANCE (err u402))
(define-constant ERR_FARM_NOT_FOUND (err u403))
(define-constant ERR_INVALID_AMOUNT (err u404))
(define-constant ERR_HARVEST_COOLDOWN (err u405))
(define-constant ERR_COMPOUND_FAILED (err u406))
(define-constant ERR_FARM_INACTIVE (err u407))

(define-constant REWARD_TOKEN_RATE u1000) ;; 10% annual reward rate (in basis points)
(define-constant COMPOUND_COOLDOWN u6) ;; 6 blocks between compounds (~1 hour)
(define-constant PERFORMANCE_FEE u200) ;; 2% performance fee on rewards
(define-constant AUTO_COMPOUND_THRESHOLD u100) ;; Auto-compound when rewards > 100 tokens

;; Token references
(define-constant sbtc-token 'ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token)
(define-constant reward-token 'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.yield-nexus-token) ;; Protocol token
(define-constant stx-token 'SP000000000000000000002Q6VF78)

;; --- DATA STRUCTURES ---

;; Farm pools that accept staked tokens and generate rewards
(define-map yield-farms uint {
  name: (string-ascii 32),
  staked-token: principal,
  reward-token: principal,
  total-staked: uint,
  reward-rate: uint, ;; Annual reward rate in basis points
  last-reward-update: uint,
  accumulated-reward-per-token: uint,
  is-active: bool
})

;; User staking positions
(define-map user-stakes { strategy: principal, user: principal, farm-id: uint } {
  staked-amount: uint,
  reward-debt: uint,
  pending-rewards: uint,
  last-compound: uint,
  auto-compound-enabled: bool
})

;; Farm performance tracking
(define-map farm-performance uint {
  total-rewards-distributed: uint,
  total-compounds: uint,
  average-apy: uint,
  last-performance-update: uint
})

;; --- DATA VARIABLES ---
(define-data-var next-farm-id uint u1)
(define-data-var total-value-locked uint u0)
(define-data-var protocol-treasury uint u0)
(define-data-var auto-compound-enabled bool true)

;; --- STRATEGY TRAIT IMPLEMENTATION ---

;; Deposit sBTC to farm and earn compounding rewards
(define-public (deposit (amount uint) (user principal))
  (let (
    ;; Default to farm ID 1 (sBTC farming)
    (farm-id u1)
    (farm (default-to { name: "sBTC Farm", staked-token: sbtc-token, reward-token: reward-token, total-staked: u0, reward-rate: REWARD_TOKEN_RATE, last-reward-update: block-height, accumulated-reward-per-token: u0, is-active: true }
          (map-get? yield-farms farm-id)))
    (current-stake (default-to { staked-amount: u0, reward-debt: u0, pending-rewards: u0, last-compound: block-height, auto-compound-enabled: true }
                   (map-get? user-stakes { strategy: (as-contract tx-sender), user: user, farm-id: farm-id })))
  )
    (asserts! (> amount u0) ERR_INVALID_AMOUNT)
    (asserts! (get is-active farm) ERR_FARM_INACTIVE)
    
    ;; Transfer sBTC from user to this contract
    (try! (contract-call? sbtc-token transfer amount user (as-contract tx-sender) none))
    
    ;; Update farm rewards before changing staked amounts
    (try! (update-farm-rewards farm-id))
    
    ;; Harvest pending rewards before staking more
    (try! (harvest-rewards user farm-id))
    
    ;; Get updated farm state after reward update
    (let ((updated-farm (unwrap! (map-get? yield-farms farm-id) ERR_FARM_NOT_FOUND)))
      
      ;; Calculate reward debt for new stake
      (let ((new-reward-debt (/ (* amount (get accumulated-reward-per-token updated-farm)) u1000000)))
        
        ;; Update user stake
        (map-set user-stakes { strategy: (as-contract tx-sender), user: user, farm-id: farm-id }
          (merge current-stake {
            staked-amount: (+ (get staked-amount current-stake) amount),
            reward-debt: (+ (get reward-debt current-stake) new-reward-debt),
            last-compound: block-height
          }))
        
        ;; Update farm total
        (map-set yield-farms farm-id
          (merge updated-farm {
            total-staked: (+ (get total-staked updated-farm) amount)
          }))
        
        ;; Ensure farm exists if it's the first deposit
        (if (is-none (map-get? farm-performance farm-id))
          (map-set farm-performance farm-id {
            total-rewards-distributed: u0,
            total-compounds: u0,
            average-apy: REWARD_TOKEN_RATE,
            last-performance-update: block-height
          })
          true
        )
        
        (var-set total-value-locked (+ (var-get total-value-locked) amount))
        (ok amount)
      )
    )
  )
)

;; Withdraw staked sBTC and claim all rewards
(define-public (withdraw (amount uint) (user principal))
  (let (
    (farm-id u1)
    (stake (unwrap! (map-get? user-stakes { strategy: (as-contract tx-sender), user: user, farm-id: farm-id }) ERR_INSUFFICIENT_BALANCE))
    (farm (unwrap! (map-get? yield-farms farm-id) ERR_FARM_NOT_FOUND))
  )
    (asserts! (> amount u0) ERR_INVALID_AMOUNT)
    (asserts! (>= (get staked-amount stake) amount) ERR_INSUFFICIENT_BALANCE)
    
    ;; Update farm rewards and harvest before withdrawal
    (try! (update-farm-rewards farm-id))
    (try! (harvest-rewards user farm-id))
    
    ;; Get updated stake after harvest
    (let ((updated-stake (unwrap! (map-get? user-stakes { strategy: (as-contract tx-sender), user: user, farm-id: farm-id }) ERR_INSUFFICIENT_BALANCE)))
      
      ;; Transfer sBTC back to user
      (try! (as-contract (contract-call? sbtc-token transfer amount (as-contract tx-sender) user none)))
      
      ;; Update user stake
      (map-set user-stakes { strategy: (as-contract tx-sender), user: user, farm-id: farm-id }
        (merge updated-stake {
          staked-amount: (- (get staked-amount updated-stake) amount)
        }))
      
      ;; Update farm total
      (map-set yield-farms farm-id
        (merge farm {
          total-staked: (- (get total-staked farm) amount)
        }))
      
      (var-set total-value-locked (- (var-get total-value-locked) amount))
      (ok amount)
    )
  )
)

;; Get user's balance including staked amount and pending rewards
(define-public (get-balance (user principal))
  (let (
    (farm-id u1)
    (stake (default-to { staked-amount: u0, reward-debt: u0, pending-rewards: u0, last-compound: block-height, auto-compound-enabled: true }
           (map-get? user-stakes { strategy: (as-contract tx-sender), user: user, farm-id: farm-id })))
  )
    ;; Calculate pending rewards and convert to sBTC value
    (let ((pending-rewards (calculate-pending-rewards user farm-id))
          (reward-value-in-sbtc (/ pending-rewards u2))) ;; Assume 1 reward token = 0.5 sBTC
      (ok (+ (get staked-amount stake) (get pending-rewards stake) reward-value-in-sbtc))
    )
  )
)

;; --- YIELD FARMING FUNCTIONS ---

;; Harvest accumulated rewards
(define-public (harvest-rewards (user principal) (farm-id uint))
  (let (
    (stake (default-to { staked-amount: u0, reward-debt: u0, pending-rewards: u0, last-compound: block-height, auto-compound-enabled: true }
           (map-get? user-stakes { strategy: (as-contract tx-sender), user: user, farm-id: farm-id })))
    (farm (unwrap! (map-get? yield-farms farm-id) ERR_FARM_NOT_FOUND))
  )
    ;; Update farm rewards first
    (try! (update-farm-rewards farm-id))
    
    ;; Calculate pending rewards
    (let ((pending (calculate-pending-rewards user farm-id)))
      (if (> pending u0)
        (begin
          ;; Take performance fee
          (let ((performance-fee (/ (* pending PERFORMANCE_FEE) u10000))
                (user-reward (- pending performance-fee)))
            
            ;; Add performance fee to treasury
            (var-set protocol-treasury (+ (var-get protocol-treasury) performance-fee))
            
            ;; Update user stake with harvested rewards
            (map-set user-stakes { strategy: (as-contract tx-sender), user: user, farm-id: farm-id }
              (merge stake {
                pending-rewards: (+ (get pending-rewards stake) user-reward),
                reward-debt: (/ (* (get staked-amount stake) (get accumulated-reward-per-token farm)) u1000000)
              }))
            
            ;; Update farm performance
            (let ((perf (default-to { total-rewards-distributed: u0, total-compounds: u0, average-apy: REWARD_TOKEN_RATE, last-performance-update: block-height }
                        (map-get? farm-performance farm-id))))
              (map-set farm-performance farm-id
                (merge perf {
                  total-rewards-distributed: (+ (get total-rewards-distributed perf) user-reward)
                }))
            )
            
            (ok user-reward)
          )
        )
        (ok u0)
      )
    )
  )
)

;; Compound rewards back into the farm
(define-public (compound-rewards (user principal))
  (let (
    (farm-id u1)
    (stake (unwrap! (map-get? user-stakes { strategy: (as-contract tx-sender), user: user, farm-id: farm-id }) ERR_INSUFFICIENT_BALANCE))
  )
    (asserts! (>= (- block-height (get last-compound stake)) COMPOUND_COOLDOWN) ERR_HARVEST_COOLDOWN)
    
    ;; Harvest first to update pending rewards
    (try! (harvest-rewards user farm-id))
    
    ;; Get updated stake
    (let ((updated-stake (unwrap! (map-get? user-stakes { strategy: (as-contract tx-sender), user: user, farm-id: farm-id }) ERR_INSUFFICIENT_BALANCE)))
      (let ((rewards-to-compound (get pending-rewards updated-stake)))
        (if (>= rewards-to-compound AUTO_COMPOUND_THRESHOLD)
          (begin
            ;; Convert rewards to sBTC and reinvest (simplified)
            (let ((sbtc-to-reinvest (/ rewards-to-compound u2))) ;; Assume 2:1 conversion rate
              
              ;; Deposit the converted rewards
              (try! (deposit sbtc-to-reinvest user))