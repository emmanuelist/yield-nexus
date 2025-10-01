;; Yield Strategy Manager Contract - V3 (Complete & Functional)
;; A secure, compliant yield strategy management system for sBTC on Stacks

;; --- TRAITS ---
;; This is the required "blueprint" for any external strategy contract.
(define-trait strategy-trait
  (
    (deposit (uint principal) (response uint uint))
    (withdraw (uint principal) (response uint uint))
    (get-balance (principal) (response uint uint))
  )
)

;; --- CONSTANTS & ERRORS ---
(define-constant contract-owner tx-sender)
(define-constant sbtc-token-contract 'ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token)
(define-constant max-strategies u100)
(define-constant emergency-cooldown u144) ;; ~24 hours
(define-constant max-allocation-percentage u10000) ;; 100%
(define-constant yield-distribution-interval u144) ;; Distribute yields every ~24 hours
(define-constant performance-fee u200) ;; 2% performance fee on yields
(define-constant auto-compound-threshold u1000) ;; Auto-compound when yields > 1000 satoshis

(define-constant ERR_NOT_AUTHORIZED (err u401))
(define-constant ERR_STRATEGY_NOT_FOUND (err u402))
(define-constant ERR_INVALID_AMOUNT (err u404))
(define-constant ERR_INSUFFICIENT_BALANCE (err u405))
(define-constant ERR_STRATEGY_INACTIVE (err u406))
(define-constant ERR_ALLOCATION_EXCEEDED (err u407))
(define-constant ERR_EMERGENCY_COOLDOWN (err u408))
(define-constant ERR_INVALID_PERCENTAGE (err u409))
(define-constant ERR_STRATEGY_FULL (err u410))
(define-constant ERR_REBALANCE_NOT_NEEDED (err u412))
(define-constant ERR_INVALID_NAME (err u414))
(define-constant ERR_STRATEGY_CALL_FAILED (err u420))
(define-constant ERR_INSUFFICIENT_UNALLOCATED_BALANCE (err u421))
(define-constant ERR_FUNDS_ALREADY_ALLOCATED (err u422))
(define-constant ERR_EMERGENCY_MODE_ACTIVE (err u503))

;; --- DATA STRUCTURES ---
(define-map strategies uint {
  name: (string-ascii 64),
  strategy-contract: principal, ;; Strategy contract address
  risk-level: uint,
  expected-apy: uint,
  current-tvl: uint,
  max-tvl: uint,
  is-active: bool
})

(define-map user-portfolios principal {
  total-locked: uint, ;; Total funds actively allocated in strategies
  unallocated-balance: uint, ;; Funds deposited to the contract but not yet allocated
  last-rebalance: uint,
  emergency-exit-time: (optional uint)
})

(define-map user-strategy-allocations { user: principal, strategy-id: uint } {
  amount: uint
})

(define-map strategy-performance uint {
  total-deposits: uint,
  total-withdrawals: uint,
  actual-apy: uint,
  performance-score: uint,
  total-yield-generated: uint
})

;; --- DATA VARIABLES ---
(define-data-var next-strategy-id uint u1)
(define-data-var total-tvl uint u0)
(define-data-var protocol-fee uint u100) ;; 1% in basis points
(define-data-var emergency-mode bool false)
(define-data-var rebalance-enabled bool true)
(define-data-var last-yield-distribution uint u0)
(define-data-var protocol-treasury uint u0)
(define-data-var total-yield-generated uint u0)

;; --- ADMIN FUNCTIONS ---
(define-public (set-protocol-fee (new-fee uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) ERR_NOT_AUTHORIZED)
    (asserts! (<= new-fee u1000) ERR_INVALID_PERCENTAGE) ;; Max 10%
    (ok (var-set protocol-fee new-fee))
  )
)

(define-public (toggle-emergency-mode)
  (begin
    (asserts! (is-eq tx-sender contract-owner) ERR_NOT_AUTHORIZED)
    (ok (var-set emergency-mode (not (var-get emergency-mode))))
  )
)

;; --- STRATEGY MANAGEMENT ---
(define-public (register-strategy (name (string-ascii 64)) (strategy-contract principal) (risk-level uint) (expected-apy uint) (max-tvl uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) ERR_NOT_AUTHORIZED)
    (asserts! (< (- (var-get next-strategy-id) u1) max-strategies) ERR_STRATEGY_FULL)
    ;; Input validation
    (asserts! (> (len name) u0) ERR_INVALID_NAME)
    (asserts! (<= risk-level u5) ERR_INVALID_PERCENTAGE) ;; Risk level should be 1-5
    (asserts! (<= expected-apy u5000) ERR_INVALID_PERCENTAGE) ;; APY shouldn't exceed 50%
    (let ((id (var-get next-strategy-id)))
      (map-set strategies id {
        name: name,
        strategy-contract: strategy-contract,
        risk-level: risk-level,
        expected-apy: expected-apy,
        current-tvl: u0,
        max-tvl: max-tvl,
        is-active: true
      })
      (map-set strategy-performance id { 
        total-deposits: u0, 
        total-withdrawals: u0, 
        actual-apy: u0, 
        performance-score: u50,
        total-yield-generated: u0 
      })
      (var-set next-strategy-id (+ id u1))
      (ok id)
    )
  )
)