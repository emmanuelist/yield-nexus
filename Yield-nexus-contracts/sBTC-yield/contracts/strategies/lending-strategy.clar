;; Lending Strategy Contract - Real Yield Generation
;; A concrete strategy that implements actual lending/borrowing to generate yield

;; --- IMPORTS & TRAITS ---
(impl-trait .yield-manager.strategy-trait)

;; --- CONSTANTS ---
(define-constant ERR_NOT_AUTHORIZED (err u401))
(define-constant ERR_INSUFFICIENT_BALANCE (err u402))
(define-constant ERR_INSUFFICIENT_COLLATERAL (err u403))
(define-constant ERR_LOAN_NOT_FOUND (err u404))
(define-constant ERR_LIQUIDATION_NOT_ALLOWED (err u405))
(define-constant ERR_INVALID_AMOUNT (err u406))
(define-constant ERR_POOL_DEPLETED (err u407))

(define-constant BASE_INTEREST_RATE u500) ;; 5% annual base rate (in basis points)
(define-constant UTILIZATION_MULTIPLIER u1000) ;; 10% additional rate per utilization point
(define-constant LIQUIDATION_THRESHOLD u8000) ;; 80% collateral ratio threshold
(define-constant LIQUIDATION_PENALTY u1000) ;; 10% liquidation penalty
(define-constant SECONDS_PER_YEAR u31536000) ;; For APY calculations

;; Token references
(define-constant sbtc-token 'ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token)
(define-constant stx-token 'SP000000000000000000002Q6VF78) ;; Native STX for collateral

;; --- DATA STRUCTURES ---

;; Pool state for lending
(define-map lending-pools principal {
  total-supplied: uint,
  total-borrowed: uint,
  available-liquidity: uint,
  interest-rate: uint, ;; Current rate in basis points
  last-update: uint
})

;; Individual lender positions
(define-map lender-positions { strategy: principal, lender: principal } {
  amount-supplied: uint,
  earned-interest: uint,
  last-claim: uint
})

;; Borrower loans with collateral
(define-map borrower-loans { strategy: principal, borrower: principal } {
  borrowed-amount: uint,
  collateral-amount: uint, ;; STX collateral
  interest-accrued: uint,
  last-update: uint
})

;; --- DATA VARIABLES ---
(define-data-var total-value-locked uint u0)
(define-data-var protocol-treasury uint u0)

;; --- STRATEGY TRAIT IMPLEMENTATION ---

;; Deposit sBTC to earn lending interest
(define-public (deposit (amount uint) (user principal))
  (let (
    (current-position (default-to { amount-supplied: u0, earned-interest: u0, last-claim: block-height }
                      (map-get? lender-positions { strategy: (as-contract tx-sender), lender: user })))
    (pool (default-to { total-supplied: u0, total-borrowed: u0, available-liquidity: u0, interest-rate: BASE_INTEREST_RATE, last-update: block-height }
          (map-get? lending-pools (as-contract tx-sender))))
  )
    (asserts! (> amount u0) ERR_INVALID_AMOUNT)
    
    ;; Transfer tokens to this strategy contract
    (try! (contract-call? sbtc-token transfer amount user (as-contract tx-sender) none))
    
    ;; Update interest before changing balances
    (try! (update-interest-rates))
    (try! (compound-interest user))
    
    ;; Update lender position
    (map-set lender-positions { strategy: (as-contract tx-sender), lender: user }
      (merge current-position {
        amount-supplied: (+ (get amount-supplied current-position) amount),
        last-claim: block-height
      }))
    
    ;; Update pool state
    (map-set lending-pools (as-contract tx-sender)
      (merge pool {
        total-supplied: (+ (get total-supplied pool) amount),
        available-liquidity: (+ (get available-liquidity pool) amount),
        last-update: block-height
      }))
    
    (var-set total-value-locked (+ (var-get total-value-locked) amount))
    (ok amount)
  )
)

;; Withdraw sBTC plus earned interest
(define-public (withdraw (amount uint) (user principal))
  (let (
    (position (unwrap! (map-get? lender-positions { strategy: (as-contract tx-sender), lender: user }) ERR_INSUFFICIENT_BALANCE))
    (pool (unwrap! (map-get? lending-pools (as-contract tx-sender)) ERR_INSUFFICIENT_BALANCE))
  )
    (asserts! (> amount u0) ERR_INVALID_AMOUNT)
    
    ;; Update interest before withdrawal
    (try! (update-interest-rates))
    (try! (compound-interest user))
    
    ;; Get updated position after interest compounding
    (let ((updated-position (unwrap! (map-get? lender-positions { strategy: (as-contract tx-sender), lender: user }) ERR_INSUFFICIENT_BALANCE)))
      (asserts! (>= (get amount-supplied updated-position) amount) ERR_INSUFFICIENT_BALANCE)
      (asserts! (>= (get available-liquidity pool) amount) ERR_POOL_DEPLETED)
      
      ;; Transfer tokens back to user
      (try! (as-contract (contract-call? sbtc-token transfer amount (as-contract tx-sender) user none)))
      
      ;; Update position
      (map-set lender-positions { strategy: (as-contract tx-sender), lender: user }
        (merge updated-position {
          amount-supplied: (- (get amount-supplied updated-position) amount)
        }))
      
      ;; Update pool
      (map-set lending-pools (as-contract tx-sender)
        (merge pool {
          total-supplied: (- (get total-supplied pool) amount),
          available-liquidity: (- (get available-liquidity pool) amount)
        }))
      
      (var-set total-value-locked (- (var-get total-value-locked) amount))
      (ok amount)
    )
  )
)