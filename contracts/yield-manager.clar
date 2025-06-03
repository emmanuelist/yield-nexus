;; Yield Strategy Manager Contract

;; A secure, compliant yield strategy management system for sBTC on Stacks
;; 
;; This contract serves as the central orchestration layer for managing 
;; multiple yield-generating strategies for Bitcoin held in the Stacks ecosystem.
;; It enables users to allocate their sBTC across various risk-adjusted strategies,
;; monitor performance, and optimize returns while maintaining security
;; and regulatory compliance.

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