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

;; Get user's balance including earned interest
(define-public (get-balance (user principal))
  (let (
    (position (default-to { amount-supplied: u0, earned-interest: u0, last-claim: block-height }
              (map-get? lender-positions { strategy: (as-contract tx-sender), lender: user })))
  )
    ;; Calculate pending interest
    (let ((pending-interest (calculate-pending-interest user)))
      (ok (+ (get amount-supplied position) (get earned-interest position) pending-interest))
    )
  )
)

;; --- BORROWING FUNCTIONS ---

;; Borrow sBTC against STX collateral
(define-public (borrow (amount uint) (collateral-amount uint))
  (let (
    (pool (unwrap! (map-get? lending-pools (as-contract tx-sender)) ERR_INSUFFICIENT_BALANCE))
    (current-loan (default-to { borrowed-amount: u0, collateral-amount: u0, interest-accrued: u0, last-update: block-height }
                  (map-get? borrower-loans { strategy: (as-contract tx-sender), borrower: tx-sender })))
  )
    (asserts! (> amount u0) ERR_INVALID_AMOUNT)
    (asserts! (>= (get available-liquidity pool) amount) ERR_POOL_DEPLETED)
    
    ;; Check collateral ratio (simplified: 1 STX = 0.1 sBTC value for demonstration)
    (let ((total-borrowed (+ (get borrowed-amount current-loan) amount))
          (total-collateral (+ (get collateral-amount current-loan) collateral-amount))
          (collateral-value-in-sbtc (/ (* total-collateral u10) u100))) ;; 1 STX = 0.1 sBTC
      
      (asserts! (>= (* collateral-value-in-sbtc u100) (* total-borrowed u125)) ERR_INSUFFICIENT_COLLATERAL) ;; 125% collateral ratio
      
      ;; Transfer STX collateral to contract
      (try! (stx-transfer? collateral-amount tx-sender (as-contract tx-sender)))
      
      ;; Transfer sBTC to borrower
      (try! (as-contract (contract-call? sbtc-token transfer amount (as-contract tx-sender) tx-sender none)))
      
      ;; Update loan
      (map-set borrower-loans { strategy: (as-contract tx-sender), borrower: tx-sender }
        (merge current-loan {
          borrowed-amount: total-borrowed,
          collateral-amount: total-collateral,
          last-update: block-height
        }))
      
      ;; Update pool
      (map-set lending-pools (as-contract tx-sender)
        (merge pool {
          total-borrowed: (+ (get total-borrowed pool) amount),
          available-liquidity: (- (get available-liquidity pool) amount)
        }))
      
      (ok amount)
    )
  )
)

;; Repay borrowed sBTC
(define-public (repay (amount uint))
  (let (
    (loan (unwrap! (map-get? borrower-loans { strategy: (as-contract tx-sender), borrower: tx-sender }) ERR_LOAN_NOT_FOUND))
    (pool (unwrap! (map-get? lending-pools (as-contract tx-sender)) ERR_INSUFFICIENT_BALANCE))
  )
    ;; Update loan interest
    (let ((interest-owed (calculate-loan-interest tx-sender)))
      (let ((total-owed (+ (get borrowed-amount loan) interest-owed))
            (repay-amount (if (<= amount total-owed) amount total-owed)))
        
        ;; Transfer repayment from borrower
        (try! (contract-call? sbtc-token transfer repay-amount tx-sender (as-contract tx-sender) none))
        
        ;; Calculate how much goes to principal vs interest
        (let ((interest-payment (if (<= repay-amount interest-owed) repay-amount interest-owed))
              (principal-payment (- repay-amount interest-payment)))
          
          ;; Add interest to protocol treasury
          (var-set protocol-treasury (+ (var-get protocol-treasury) interest-payment))
          
          ;; Update loan
          (map-set borrower-loans { strategy: (as-contract tx-sender), borrower: tx-sender }
            (merge loan {
              borrowed-amount: (- (get borrowed-amount loan) principal-payment),
              interest-accrued: (- (+ (get interest-accrued loan) interest-owed) interest-payment),
              last-update: block-height
            }))
          
          ;; Update pool
          (map-set lending-pools (as-contract tx-sender)
            (merge pool {
              total-borrowed: (- (get total-borrowed pool) principal-payment),
              available-liquidity: (+ (get available-liquidity pool) repay-amount)
            }))
          
          (ok repay-amount)
        )
      )
    )
  )
)

;; --- HELPER FUNCTIONS ---

;; Update interest rates based on utilization
(define-private (update-interest-rates)
  (let ((pool (unwrap! (map-get? lending-pools (as-contract tx-sender)) ERR_INSUFFICIENT_BALANCE)))
    (let ((utilization-rate (if (> (get total-supplied pool) u0)
                             (/ (* (get total-borrowed pool) u10000) (get total-supplied pool))
                             u0)))
      (let ((new-rate (+ BASE_INTEREST_RATE (/ (* utilization-rate UTILIZATION_MULTIPLIER) u10000))))
        (map-set lending-pools (as-contract tx-sender)
          (merge pool { interest-rate: new-rate, last-update: block-height }))
        (ok true)
      )
    )
  )
)

;; Compound interest for a lender
(define-private (compound-interest (user principal))
  (let ((position (default-to { amount-supplied: u0, earned-interest: u0, last-claim: block-height }
                  (map-get? lender-positions { strategy: (as-contract tx-sender), lender: user }))))
    (let ((pending-interest (calculate-pending-interest user)))
      (if (> pending-interest u0)
        (map-set lender-positions { strategy: (as-contract tx-sender), lender: user }
          (merge position {
            earned-interest: (+ (get earned-interest position) pending-interest),
            last-claim: block-height
          }))
        true
      )
      (ok true)
    )
  )
)

;; Calculate pending interest for a lender
(define-read-only (calculate-pending-interest (user principal))
  (let (
    (position (default-to { amount-supplied: u0, earned-interest: u0, last-claim: block-height }
              (map-get? lender-positions { strategy: (as-contract tx-sender), lender: user })))
    (pool (default-to { total-supplied: u0, total-borrowed: u0, available-liquidity: u0, interest-rate: BASE_INTEREST_RATE, last-update: block-height }
          (map-get? lending-pools (as-contract tx-sender))))
  )
    (let ((blocks-passed (- block-height (get last-claim position)))
          (annual-rate (get interest-rate pool))
          (blocks-per-year u52560)) ;; Approximate blocks per year (10 min blocks)
      (if (and (> (get amount-supplied position) u0) (> blocks-passed u0))
        (/ (* (* (get amount-supplied position) annual-rate) blocks-passed) (* u10000 blocks-per-year))
        u0
      )
    )
  )
)

;; Calculate interest owed on a loan
(define-read-only (calculate-loan-interest (borrower principal))
  (let ((loan (default-to { borrowed-amount: u0, collateral-amount: u0, interest-accrued: u0, last-update: block-height }
              (map-get? borrower-loans { strategy: (as-contract tx-sender), borrower: borrower }))))
    (let ((blocks-passed (- block-height (get last-update loan)))
          (annual-rate (+ BASE_INTEREST_RATE u500)) ;; Borrowing rate is higher
          (blocks-per-year u52560))
      (if (and (> (get borrowed-amount loan) u0) (> blocks-passed u0))
        (/ (* (* (get borrowed-amount loan) annual-rate) blocks-passed) (* u10000 blocks-per-year))
        u0
      )
    )
  )
)

;; --- READ-ONLY FUNCTIONS ---
(define-read-only (get-pool-stats)
  (let ((pool (default-to { total-supplied: u0, total-borrowed: u0, available-liquidity: u0, interest-rate: BASE_INTEREST_RATE, last-update: block-height }
              (map-get? lending-pools (as-contract tx-sender)))))
    (ok {
      total-supplied: (get total-supplied pool),
      total-borrowed: (get total-borrowed pool),
      available-liquidity: (get available-liquidity pool),
      current-interest-rate: (get interest-rate pool),
      utilization-rate: (if (> (get total-supplied pool) u0)
                         (/ (* (get total-borrowed pool) u10000) (get total-supplied pool))
                         u0)
    })
  )
)

(define-read-only (get-lender-info (user principal))
  (let ((position (default-to { amount-supplied: u0, earned-interest: u0, last-claim: block-height }
                  (map-get? lender-positions { strategy: (as-contract tx-sender), lender: user }))))
    (ok {
      amount-supplied: (get amount-supplied position),
      earned-interest: (get earned-interest position),
      pending-interest: (calculate-pending-interest user),
      last-claim: (get last-claim position)
    })
  )
)

(define-read-only (get-loan-info (borrower principal))
  (let ((loan (default-to { borrowed-amount: u0, collateral-amount: u0, interest-accrued: u0, last-update: block-height }
              (map-get? borrower-loans { strategy: (as-contract tx-sender), borrower: borrower }))))
    (ok {
      borrowed-amount: (get borrowed-amount loan),
      collateral-amount: (get collateral-amount loan),
      interest-accrued: (get interest-accrued loan),
      pending-interest: (calculate-loan-interest borrower),
      last-update: (get last-update loan)
    })
  )
)