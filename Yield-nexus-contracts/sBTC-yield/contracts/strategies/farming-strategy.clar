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