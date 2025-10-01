;; DEX Liquidity Strategy Contract - Real Yield from Trading Fees
;; A concrete strategy that provides liquidity to DEX pools and earns trading fees

;; --- IMPORTS & TRAITS ---
(impl-trait .yield-manager.strategy-trait)

;; --- CONSTANTS ---
(define-constant ERR_NOT_AUTHORIZED (err u401))
(define-constant ERR_INSUFFICIENT_BALANCE (err u402))
(define-constant ERR_INSUFFICIENT_LIQUIDITY (err u403))
(define-constant ERR_SLIPPAGE_TOO_HIGH (err u404))
(define-constant ERR_INVALID_AMOUNT (err u405))
(define-constant ERR_POOL_NOT_EXISTS (err u406))
(define-constant ERR_INVALID_RATIO (err u407))

(define-constant TRADING_FEE_RATE u30) ;; 0.3% trading fee
(define-constant LP_TOKEN_DECIMALS u6)
(define-constant MIN_LIQUIDITY u1000) ;; Minimum liquidity for pool creation

;; Token references  
(define-constant sbtc-token 'ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token)
(define-constant stx-token 'SP000000000000000000002Q6VF78) ;; Native STX
(define-constant usda-token 'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.usda-token) ;; Example stablecoin

;; --- DATA STRUCTURES ---

;; Liquidity pools (simplified AMM model)
(define-map liquidity-pools principal {
  token-a-reserve: uint,
  token-b-reserve: uint, 
  total-lp-supply: uint,
  fee-accumulated-a: uint,
  fee-accumulated-b: uint,
  last-update: uint
})

;; LP token positions for users
(define-map lp-positions { strategy: principal, user: principal, pool: principal } {
  lp-tokens: uint,
  unclaimed-fees-a: uint,
  unclaimed-fees-b: uint,
  last-fee-claim: uint
})

;; Pool configurations
(define-map pool-configs principal {
  token-a: principal,
  token-b: principal,
  is-active: bool,
  created-at: uint
})

;; --- DATA VARIABLES ---
(define-data-var total-value-locked uint u0)
(define-data-var active-pools-count uint u0)

;; --- STRATEGY TRAIT IMPLEMENTATION ---

;; Deposit sBTC to provide liquidity and earn trading fees
(define-public (deposit (amount uint) (user principal))
  (let (
    ;; Default to sBTC-STX pool for this strategy
    (pool-id 'SP000000000000000000002Q6VF78) ;; STX as pool identifier
    (current-position (default-to { lp-tokens: u0, unclaimed-fees-a: u0, unclaimed-fees-b: u0, last-fee-claim: block-height }
                      (map-get? lp-positions { strategy: (as-contract tx-sender), user: user, pool: pool-id })))
    (pool (default-to { token-a-reserve: u0, token-b-reserve: u0, total-lp-supply: u0, fee-accumulated-a: u0, fee-accumulated-b: u0, last-update: block-height }
          (map-get? liquidity-pools pool-id)))
  )
    (asserts! (> amount u0) ERR_INVALID_AMOUNT)
    
    ;; Transfer sBTC from user to this contract
    (try! (contract-call? sbtc-token transfer amount user (as-contract tx-sender) none))
    
    ;; Calculate required STX for balanced liquidity provision
    (let ((required-stx (if (> (get token-a-reserve pool) u0)
                         (/ (* amount (get token-b-reserve pool)) (get token-a-reserve pool))
                         amount))) ;; 1:1 ratio for new pools
      
      ;; Transfer STX from user (user needs to have STX balance)
      ;; In a real implementation, this would be handled by the main contract
      ;; For now, we'll mint proportional LP tokens based on sBTC only
      
      ;; Update fees before adding liquidity
      (try! (update-fee-distribution user pool-id))
      
      ;; Calculate LP tokens to mint
      (let ((lp-tokens-to-mint (if (> (get total-lp-supply pool) u0)
                                (/ (* amount (get total-lp-supply pool)) (get token-a-reserve pool))
                                amount))) ;; Initial LP = sBTC amount
        
        ;; Update pool reserves
        (map-set liquidity-pools pool-id
          (merge pool {
            token-a-reserve: (+ (get token-a-reserve pool) amount),
            token-b-reserve: (+ (get token-b-reserve pool) required-stx),
            total-lp-supply: (+ (get total-lp-supply pool) lp-tokens-to-mint),
            last-update: block-height
          }))
        
        ;; Update user position
        (map-set lp-positions { strategy: (as-contract tx-sender), user: user, pool: pool-id }
          (merge current-position {
            lp-tokens: (+ (get lp-tokens current-position) lp-tokens-to-mint),
            last-fee-claim: block-height
          }))
        
        ;; Ensure pool config exists
        (if (is-none (map-get? pool-configs pool-id))
          (map-set pool-configs pool-id {
            token-a: sbtc-token,
            token-b: stx-token,
            is-active: true,
            created-at: block-height
          })
          true
        )
        
        (var-set total-value-locked (+ (var-get total-value-locked) amount))
        (ok amount)
      )
    )
  )
)

;; Withdraw liquidity and claim trading fees
(define-public (withdraw (amount uint) (user principal))
  (let (
    (pool-id 'SP000000000000000000002Q6VF78) ;; STX pool
    (position (unwrap! (map-get? lp-positions { strategy: (as-contract tx-sender), user: user, pool: pool-id }) ERR_INSUFFICIENT_BALANCE))
    (pool (unwrap! (map-get? liquidity-pools pool-id) ERR_INSUFFICIENT_LIQUIDITY))
  )
    (asserts! (> amount u0) ERR_INVALID_AMOUNT)
    
    ;; Update fees before withdrawal
    (try! (update-fee-distribution user pool-id))
    
    ;; Get updated position after fee distribution
    (let ((updated-position (unwrap! (map-get? lp-positions { strategy: (as-contract tx-sender), user: user, pool: pool-id }) ERR_INSUFFICIENT_BALANCE)))
      
      ;; Calculate LP tokens needed for withdrawal amount
      (let ((lp-tokens-needed (if (> (get token-a-reserve pool) u0)
                               (/ (* amount (get total-lp-supply pool)) (get token-a-reserve pool))
                               u0)))
        
        (asserts! (<= lp-tokens-needed (get lp-tokens updated-position)) ERR_INSUFFICIENT_BALANCE)
        
        ;; Calculate proportional withdrawal from reserves
        (let ((sbtc-to-withdraw amount)
              (stx-to-withdraw (if (> (get total-lp-supply pool) u0)
                               (/ (* lp-tokens-needed (get token-b-reserve pool)) (get total-lp-supply pool))
                               u0)))
          
          ;; Transfer sBTC back to user
          (try! (as-contract (contract-call? sbtc-token transfer sbtc-to-withdraw (as-contract tx-sender) user none)))
          
          ;; Transfer STX back to user (if any)
          (if (> stx-to-withdraw u0)
            (try! (as-contract (stx-transfer? stx-to-withdraw (as-contract tx-sender) user)))
            (ok true)
          )
          
          ;; Transfer unclaimed fees
          (if (> (get unclaimed-fees-a updated-position) u0)
            (try! (as-contract (contract-call? sbtc-token transfer (get unclaimed-fees-a updated-position) (as-contract tx-sender) user none)))
            (ok true)
          )
          
          ;; Update pool state
          (map-set liquidity-pools pool-id
            (merge pool {
              token-a-reserve: (- (get token-a-reserve pool) sbtc-to-withdraw),
              token-b-reserve: (- (get token-b-reserve pool) stx-to-withdraw),
              total-lp-supply: (- (get total-lp-supply pool) lp-tokens-needed)
            }))
          
          ;; Update user position
          (map-set lp-positions { strategy: (as-contract tx-sender), user: user, pool: pool-id }
            (merge updated-position {
              lp-tokens: (- (get lp-tokens updated-position) lp-tokens-needed),
              unclaimed-fees-a: u0,
              unclaimed-fees-b: u0
            }))
          
          (var-set total-value-locked (- (var-get total-value-locked) amount))
          (ok amount)
        )
      )
    )
  )
)

;; Get user's balance including LP value and unclaimed fees
(define-public (get-balance (user principal))
  (let (
    (pool-id 'SP000000000000000000002Q6VF78)
    (position (default-to { lp-tokens: u0, unclaimed-fees-a: u0, unclaimed-fees-b: u0, last-fee-claim: block-height }
              (map-get? lp-positions { strategy: (as-contract tx-sender), user: user, pool: pool-id })))
    (pool (default-to { token-a-reserve: u0, token-b-reserve: u0, total-lp-supply: u0, fee-accumulated-a: u0, fee-accumulated-b: u0, last-update: block-height }
          (map-get? liquidity-pools pool-id)))
  )
    ;; Calculate LP token value in sBTC
    (let ((lp-value-sbtc (if (> (get total-lp-supply pool) u0)
                          (/ (* (get lp-tokens position) (get token-a-reserve pool)) (get total-lp-supply pool))
                          u0))
          (pending-fees (calculate-pending-fees user pool-id)))
      (ok (+ lp-value-sbtc (get unclaimed-fees-a position) pending-fees))
    )
  )
)

;; --- TRADING FUNCTIONS (Simulated DEX Functionality) ---

;; Swap tokens and generate trading fees for LPs
(define-public (swap-sbtc-for-stx (sbtc-amount uint) (min-stx-out uint))
  (let ((pool-id 'SP000000000000000000002Q6VF78)
        (pool (unwrap! (map-get? liquidity-pools pool-id) ERR_POOL_NOT_EXISTS)))
    
    (asserts! (> sbtc-amount u0) ERR_INVALID_AMOUNT)
    (asserts! (> (get token-a-reserve pool) u0) ERR_INSUFFICIENT_LIQUIDITY)
    
    ;; Calculate output using constant product formula (x * y = k)
    ;; Taking 0.3% trading fee
    (let ((sbtc-after-fee (- sbtc-amount (/ (* sbtc-amount TRADING_FEE_RATE) u10000)))
          (stx-reserve (get token-b-reserve pool))
          (sbtc-reserve (get token-a-reserve pool)))
      
      (let ((stx-out (/ (* stx-reserve sbtc-after-fee) (+ sbtc-reserve sbtc-after-fee))))
        (asserts! (>= stx-out min-stx-out) ERR_SLIPPAGE_TOO_HIGH)
        
        ;; Transfer sBTC from trader
        (try! (contract-call? sbtc-token transfer sbtc-amount tx-sender (as-contract tx-sender) none))
        
        ;; Transfer STX to trader
        (try! (as-contract (stx-transfer? stx-out (as-contract tx-sender) tx-sender)))
        
        ;; Update pool with new reserves and accumulated fees
        (let ((trading-fee (- sbtc-amount sbtc-after-fee)))
          (map-set liquidity-pools pool-id
            (merge pool {
              token-a-reserve: (+ sbtc-reserve sbtc-after-fee),
              token-b-reserve: (- stx-reserve stx-out),
              fee-accumulated-a: (+ (get fee-accumulated-a pool) trading-fee),
              last-update: block-height
            }))
          
          (ok { stx-out: stx-out, fee-taken: trading-fee })
        )
      )
    )
  )
)