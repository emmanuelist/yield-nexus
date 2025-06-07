;; Yield Strategy Manager Contract

;; A secure, compliant yield strategy management system for sBTC on Stacks
;;
;; This contract serves as the central orchestration layer for managing 
;; multiple yield-generating strategies for Bitcoin held in the Stacks ecosystem.
;; It enables users to allocate their sBTC across various risk-adjusted strategies,
;; monitor performance, and optimize returns while maintaining security
;; and regulatory compliance.

;; Contract references
(define-constant sbtc-token-contract 'ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token)
;; (define-constant sbtc-registry-contract 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sbtc-registry)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant max-strategies u100)
(define-constant max-portfolio-entries u500)
(define-constant min-deposit-amount u1000) ;; Minimum 0.00001 BTC equivalent
(define-constant max-allocation-percentage u10000) ;; 100% in basis points
(define-constant emergency-cooldown u144) ;; ~24 hours in blocks
(define-constant rebalance-threshold u500) ;; 5% in basis points

;; Protocol contract flags
(define-constant yield-manager-role 0x02)

;; Error codes
(define-constant ERR_NOT_AUTHORIZED (err u401))
(define-constant ERR_STRATEGY_NOT_FOUND (err u402))
(define-constant ERR_STRATEGY_ALREADY_EXISTS (err u403))
(define-constant ERR_INVALID_AMOUNT (err u404))
(define-constant ERR_INSUFFICIENT_BALANCE (err u405))
(define-constant ERR_STRATEGY_INACTIVE (err u406))
(define-constant ERR_ALLOCATION_EXCEEDED (err u407))
(define-constant ERR_EMERGENCY_COOLDOWN (err u408))
(define-constant ERR_INVALID_PERCENTAGE (err u409))
(define-constant ERR_STRATEGY_FULL (err u410))
(define-constant ERR_PORTFOLIO_LIMIT_REACHED (err u411))
(define-constant ERR_REBALANCE_NOT_NEEDED (err u412))

;; Data structures
(define-map strategies
    uint
    {
        name: (string-ascii 64),
        contract-address: principal,
        risk-level: uint, ;; 1-5 (1=lowest, 5=highest)
        expected-apy: uint, ;; In basis points (e.g., 500 = 5%)
        current-tvl: uint,
        max-tvl: uint,
        is-active: bool,
        created-at: uint,
        last-updated: uint,
    }
)

(define-map strategy-performance
    uint
    {
        actual-apy: uint,
        total-yield-generated: uint,
        total-deposits: uint,
        total-withdrawals: uint,
        performance-score: uint, ;; 1-100
    }
)

(define-map user-portfolios
    principal
    {
        total-deposited: uint,
        total-locked: uint,
        last-rebalance: uint,
        emergency-exit-time: (optional uint),
        strategies-count: uint,
    }
)

(define-map user-strategy-allocations
    {
        user: principal,
        strategy-id: uint,
    }
    {
        amount: uint,
        allocated-at: uint,
        last-yield-claim: uint,
        target-percentage: uint, ;; In basis points
    }
)

;; Data variables
(define-data-var next-strategy-id uint u1)
(define-data-var total-strategies uint u0)
(define-data-var total-tvl uint u0)
(define-data-var protocol-fee uint u100) ;; 1% in basis points
(define-data-var emergency-mode bool false)
(define-data-var rebalance-enabled bool true)

;; Admin functions
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

(define-public (toggle-rebalance)
    (begin
        (asserts! (is-eq tx-sender contract-owner) ERR_NOT_AUTHORIZED)
        (ok (var-set rebalance-enabled (not (var-get rebalance-enabled))))
    )
)

;; Strategy management functions
(define-public (register-strategy
        (name (string-ascii 64))
        (contract-address principal)
        (risk-level uint)
        (expected-apy uint)
        (max-tvl uint)
    )
    (let (
            (strategy-id (var-get next-strategy-id))
            (current-block (- stacks-block-height u0))
        )
        (asserts! (is-eq tx-sender contract-owner) ERR_NOT_AUTHORIZED)
        (asserts! (< (var-get total-strategies) max-strategies) ERR_STRATEGY_FULL)
        (asserts! (and (>= risk-level u1) (<= risk-level u5))
            ERR_INVALID_PERCENTAGE
        )
        (asserts! (> max-tvl u0) ERR_INVALID_AMOUNT)
        (map-set strategies strategy-id {
            name: name,
            contract-address: contract-address,
            risk-level: risk-level,
            expected-apy: expected-apy,
            current-tvl: u0,
            max-tvl: max-tvl,
            is-active: true,
            created-at: current-block,
            last-updated: current-block,
        })
        (map-set strategy-performance strategy-id {
            actual-apy: u0,
            total-yield-generated: u0,
            total-deposits: u0,
            total-withdrawals: u0,
            performance-score: u50,
        })
        (var-set next-strategy-id (+ strategy-id u1))
        (var-set total-strategies (+ (var-get total-strategies) u1))
        (ok strategy-id)
    )
)

(define-public (update-strategy-status
        (strategy-id uint)
        (is-active bool)
    )
    (let ((strategy (unwrap! (map-get? strategies strategy-id) ERR_STRATEGY_NOT_FOUND)))
        (asserts! (is-eq tx-sender contract-owner) ERR_NOT_AUTHORIZED)
        (map-set strategies strategy-id
            (merge strategy {
                is-active: is-active,
                last-updated: (- stacks-block-height u0),
            })
        )
        (ok true)
    )
)

;; User portfolio functions
(define-public (deposit-to-strategy
        (strategy-id uint)
        (amount uint)
        (target-percentage uint)
    )
    (let (
            (strategy (unwrap! (map-get? strategies strategy-id) ERR_STRATEGY_NOT_FOUND))
            (user-portfolio (default-to {
                total-deposited: u0,
                total-locked: u0,
                last-rebalance: u0,
                emergency-exit-time: none,
                strategies-count: u0,
            }
                (map-get? user-portfolios tx-sender)
            ))
            (current-allocation (default-to {
                amount: u0,
                allocated-at: u0,
                last-yield-claim: u0,
                target-percentage: u0,
            }
                (map-get? user-strategy-allocations {
                    user: tx-sender,
                    strategy-id: strategy-id,
                })
            ))
            (current-block (- stacks-block-height u0))
        )
        (asserts! (not (var-get emergency-mode)) ERR_NOT_AUTHORIZED)
        (asserts! (get is-active strategy) ERR_STRATEGY_INACTIVE)
        (asserts! (>= amount min-deposit-amount) ERR_INVALID_AMOUNT)
        (asserts! (<= target-percentage max-allocation-percentage)
            ERR_INVALID_PERCENTAGE
        )
        (asserts!
            (<= (+ (get current-tvl strategy) amount) (get max-tvl strategy))
            ERR_ALLOCATION_EXCEEDED
        )
        ;; Lock sBTC tokens
        (try! (contract-call? sbtc-token-contract protocol-lock amount tx-sender
            yield-manager-role
        ))
        ;; Update strategy TVL
        (map-set strategies strategy-id
            (merge strategy {
                current-tvl: (+ (get current-tvl strategy) amount),
                last-updated: current-block,
            })
        )
        ;; Update user portfolio
        (map-set user-portfolios tx-sender
            (merge user-portfolio {
                total-deposited: (+ (get total-deposited user-portfolio) amount),
                total-locked: (+ (get total-locked user-portfolio) amount),
                strategies-count: (if (is-eq (get amount current-allocation) u0)
                    (+ (get strategies-count user-portfolio) u1)
                    (get strategies-count user-portfolio)
                ),
            })
        )
        ;; Update user strategy allocation
        (map-set user-strategy-allocations {
            user: tx-sender,
            strategy-id: strategy-id,
        } {
            amount: (+ (get amount current-allocation) amount),
            allocated-at: current-block,
            last-yield-claim: (get last-yield-claim current-allocation),
            target-percentage: target-percentage,
        })
        ;; Update strategy performance
        (let ((perf (unwrap! (map-get? strategy-performance strategy-id)
                ERR_STRATEGY_NOT_FOUND
            )))
            (map-set strategy-performance strategy-id
                (merge perf { total-deposits: (+ (get total-deposits perf) amount) })
            )
        )
        (var-set total-tvl (+ (var-get total-tvl) amount))
        (ok true)
    )
)

(define-public (withdraw-from-strategy
        (strategy-id uint)
        (amount uint)
    )
    (let (
            (strategy (unwrap! (map-get? strategies strategy-id) ERR_STRATEGY_NOT_FOUND))
            (user-portfolio (unwrap! (map-get? user-portfolios tx-sender)
                ERR_INSUFFICIENT_BALANCE
            ))
            (current-allocation (unwrap!
                (map-get? user-strategy-allocations {
                    user: tx-sender,
                    strategy-id: strategy-id,
                })
                ERR_INSUFFICIENT_BALANCE
            ))
            (current-block (- stacks-block-height u0))
        )
        (asserts! (<= amount (get amount current-allocation))
            ERR_INSUFFICIENT_BALANCE
        )
        (asserts! (> amount u0) ERR_INVALID_AMOUNT)
        ;; Check emergency exit cooldown
        (match (get emergency-exit-time user-portfolio)
            exit-time (asserts! (>= current-block (+ exit-time emergency-cooldown))
                ERR_EMERGENCY_COOLDOWN
            )
            true
        )
        ;; Unlock sBTC tokens
        (try! (contract-call? sbtc-token-contract protocol-unlock amount tx-sender
            yield-manager-role
        ))
        ;; Update strategy TVL
        (map-set strategies strategy-id
            (merge strategy {
                current-tvl: (- (get current-tvl strategy) amount),
                last-updated: current-block,
            })
        )
        ;; Update user portfolio
        (map-set user-portfolios tx-sender
            (merge user-portfolio {
                total-locked: (- (get total-locked user-portfolio) amount),
                strategies-count: (if (is-eq (- (get amount current-allocation) amount) u0)
                    (- (get strategies-count user-portfolio) u1)
                    (get strategies-count user-portfolio)
                ),
            })
        )
        ;; Update user strategy allocation
        (let ((new-amount (- (get amount current-allocation) amount)))
            (if (is-eq new-amount u0)
                (map-delete user-strategy-allocations {
                    user: tx-sender,
                    strategy-id: strategy-id,
                })
                (map-set user-strategy-allocations {
                    user: tx-sender,
                    strategy-id: strategy-id,
                }
                    (merge current-allocation { amount: new-amount })
                )
            )
        )
        ;; Update strategy performance
        (let ((perf (unwrap! (map-get? strategy-performance strategy-id)
                ERR_STRATEGY_NOT_FOUND
            )))
            (map-set strategy-performance strategy-id
                (merge perf { total-withdrawals: (+ (get total-withdrawals perf) amount) })
            )
        )
        (var-set total-tvl (- (var-get total-tvl) amount))
        (ok true)
    )
)

(define-public (emergency-withdraw)
    (let (
            (user-portfolio (unwrap! (map-get? user-portfolios tx-sender)
                ERR_INSUFFICIENT_BALANCE
            ))
            (total-locked (get total-locked user-portfolio))
            (current-block (- stacks-block-height u0))
        )
        (asserts! (> total-locked u0) ERR_INSUFFICIENT_BALANCE)
        ;; Unlock all sBTC tokens
        (try! (contract-call? sbtc-token-contract protocol-unlock total-locked
            tx-sender yield-manager-role
        ))
        ;; Update user portfolio with emergency exit timestamp
        (map-set user-portfolios tx-sender
            (merge user-portfolio {
                total-locked: u0,
                emergency-exit-time: (some current-block),
                strategies-count: u0,
            })
        )
        (var-set total-tvl (- (var-get total-tvl) total-locked))
        (ok total-locked)
    )
)

(define-public (rebalance-portfolio (target-allocations (list 50 {
    strategy-id: uint,
    target-percentage: uint,
})))
    (let (
            (user-portfolio (unwrap! (map-get? user-portfolios tx-sender)
                ERR_INSUFFICIENT_BALANCE
            ))
            (current-block (- stacks-block-height u0))
            (last-rebalance (get last-rebalance user-portfolio))
        )
        (asserts! (var-get rebalance-enabled) ERR_NOT_AUTHORIZED)
        (asserts! (not (var-get emergency-mode)) ERR_NOT_AUTHORIZED)
        (asserts! (> (get total-locked user-portfolio) u0)
            ERR_INSUFFICIENT_BALANCE
        )
        ;; Check if rebalance is needed (at least 6 hours since last rebalance)
        (asserts! (>= (- current-block last-rebalance) u36)
            ERR_REBALANCE_NOT_NEEDED
        )
        ;; Validate total allocation percentages
        (asserts!
            (is-eq (fold + (map get-target-percentage target-allocations) u0)
                max-allocation-percentage
            )
            ERR_INVALID_PERCENTAGE
        )
        ;; Update last rebalance time
        (map-set user-portfolios tx-sender
            (merge user-portfolio { last-rebalance: current-block })
        )
        (ok true)
    )
)

;; Helper functions
(define-private (get-target-percentage (allocation {
    strategy-id: uint,
    target-percentage: uint,
}))
    (get target-percentage allocation)
)

;; Read-only functions
(define-read-only (get-strategy (strategy-id uint))
    (map-get? strategies strategy-id)
)

(define-read-only (get-user-portfolio (user principal))
    (map-get? user-portfolios user)
)

(define-read-only (get-user-strategy-allocation
        (user principal)
        (strategy-id uint)
    )
    (map-get? user-strategy-allocations {
        user: user,
        strategy-id: strategy-id,
    })
)

(define-read-only (get-strategy-performance (strategy-id uint))
    (map-get? strategy-performance strategy-id)
)

(define-read-only (calculate-yields (user principal))
    (let ((user-portfolio (map-get? user-portfolios user)))
        (match user-portfolio
            portfolio (ok (get total-locked portfolio))
            (ok u0)
        )
    )
)

(define-read-only (get-total-tvl)
    (var-get total-tvl)
)

(define-read-only (get-protocol-stats)
    {
        total-strategies: (var-get total-strategies),
        total-tvl: (var-get total-tvl),
        protocol-fee: (var-get protocol-fee),
        emergency-mode: (var-get emergency-mode),
        rebalance-enabled: (var-get rebalance-enabled),
    }
)

(define-read-only (is-strategy-active (strategy-id uint))
    (match (map-get? strategies strategy-id)
        strategy (get is-active strategy)
        false
    )
)

(define-read-only (get-available-strategies)
    (var-get total-strategies)
)
