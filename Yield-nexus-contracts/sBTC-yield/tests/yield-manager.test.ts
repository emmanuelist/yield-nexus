import { describe, expect, it, beforeEach } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const contractOwner = accounts.get("deployer")!;
const user1 = accounts.get("wallet_1")!;
const user2 = accounts.get("wallet_2")!;
const strategyContract = accounts.get("wallet_3")!; // Mock strategy contract

const contractName = "yield-manager";

describe("Yield Strategy Manager Contract", () => {
  beforeEach(() => {
    // Reset simnet state for each test
    simnet.mineEmptyBlocks(1);
  });

  describe("Contract Initialization", () => {
    it("should initialize with correct default values", () => {
      const stats = simnet.callReadOnlyFn(
        contractName,
        "get-protocol-stats",
        [],
        contractOwner
      );
      
      expect(stats.result).toBeOk(
        Cl.tuple({
          "total-strategies": Cl.uint(0),
          "total-tvl": Cl.uint(0),
          "protocol-fee": Cl.uint(100),
          "emergency-mode": Cl.bool(false),
          "rebalance-enabled": Cl.bool(true)
        })
      );
    });

    it("should return 0 for total TVL initially", () => {
      const { result } = simnet.callReadOnlyFn(
        contractName,
        "get-total-tvl",
        [],
        contractOwner
      );
      
      expect(result).toBeUint(0);
    });
  });

  describe("Admin Functions", () => {
    it("should allow owner to set protocol fee", () => {
      const newFee = 250; // 2.5%
      const { result } = simnet.callPublicFn(
        contractName,
        "set-protocol-fee",
        [Cl.uint(newFee)],
        contractOwner
      );
      
      expect(result).toBeOk(Cl.bool(true));
      
      // Verify fee was updated
      const stats = simnet.callReadOnlyFn(
        contractName,
        "get-protocol-stats",
        [],
        contractOwner
      );
      
      expect(stats.result).toBeOk(
        Cl.tuple({
          "total-strategies": Cl.uint(0),
          "total-tvl": Cl.uint(0),
          "protocol-fee": Cl.uint(newFee),
          "emergency-mode": Cl.bool(false),
          "rebalance-enabled": Cl.bool(true)
        })
      );
    });

    it("should reject protocol fee above 10%", () => {
      const { result } = simnet.callPublicFn(
        contractName,
        "set-protocol-fee",
        [Cl.uint(1001)], // 10.01%
        contractOwner
      );
      
      expect(result).toBeErr(Cl.uint(409)); // ERR_INVALID_PERCENTAGE
    });

    it("should not allow non-owner to set protocol fee", () => {
      const { result } = simnet.callPublicFn(
        contractName,
        "set-protocol-fee",
        [Cl.uint(200)],
        user1
      );
      
      expect(result).toBeErr(Cl.uint(401)); // ERR_NOT_AUTHORIZED
      });

    it("should allow owner to toggle emergency mode", () => {
      const { result } = simnet.callPublicFn(
        contractName,
        "toggle-emergency-mode",
        [],
        contractOwner
      );
      
      expect(result).toBeOk(Cl.bool(true));
      
      // Verify emergency mode was toggled
      const stats = simnet.callReadOnlyFn(
        contractName,
        "get-protocol-stats",
        [],
        contractOwner
      );
      
      const statsObj = stats.result as any;
      expect(statsObj.data["emergency-mode"]).toStrictEqual(Cl.bool(true));
    });

    it("should allow owner to toggle rebalance", () => {
      const { result } = simnet.callPublicFn(
        contractName,
        "toggle-rebalance",
        [],
        contractOwner
      );
      
      expect(result).toBeOk(Cl.bool(true));
      
      // Verify rebalance was toggled
      const stats = simnet.callReadOnlyFn(
        contractName,
        "get-protocol-stats",
        [],
        contractOwner
      );
      
      const statsObj = stats.result as any;
      expect(statsObj.data["rebalance-enabled"]).toStrictEqual(Cl.bool(false));
    });
  });

  describe("Strategy Management", () => {
    it("should allow owner to register a new strategy", () => {
      const { result } = simnet.callPublicFn(
        contractName,
        "register-strategy",
        [
          Cl.stringAscii("Test Strategy"),
          Cl.principal(strategyContract),
          Cl.uint(3), // Medium risk
          Cl.uint(1000), // 10% APY
          Cl.uint(1000000) // Max TVL
        ],
        contractOwner
      );
      
      expect(result).toBeOk(Cl.uint(1)); // First strategy ID
    });

    it("should reject strategy registration with invalid risk level", () => {
      const { result } = simnet.callPublicFn(
        contractName,
        "register-strategy",
        [
          Cl.stringAscii("Invalid Strategy"),
          Cl.principal(strategyContract),
          Cl.uint(6), // Invalid risk level
          Cl.uint(1000),
          Cl.uint(1000000)
        ],
        contractOwner
      );
      
      expect(result).toBeErr(Cl.uint(409)); // ERR_INVALID_PERCENTAGE
    });

    it("should reject strategy registration with empty name", () => {
      const { result } = simnet.callPublicFn(
        contractName,
        "register-strategy",
        [
          Cl.stringAscii(""),
          Cl.principal(strategyContract),
          Cl.uint(3),
          Cl.uint(1000),
          Cl.uint(1000000)
        ],
        contractOwner
      );
      
      expect(result).toBeErr(Cl.uint(414)); // ERR_INVALID_NAME
    });

    it("should reject strategy registration with excessive APY", () => {
      const { result } = simnet.callPublicFn(
        contractName,
        "register-strategy",
        [
          Cl.stringAscii("High APY Strategy"),
          Cl.principal(strategyContract),
          Cl.uint(3),
          Cl.uint(50001), // Above max APY
          Cl.uint(1000000)
        ],
        contractOwner
      );
      
      expect(result).toBeErr(Cl.uint(409)); // ERR_INVALID_PERCENTAGE
    });

    it("should not allow non-owner to register strategy", () => {
      const { result } = simnet.callPublicFn(
        contractName,
        "register-strategy",
        [
          Cl.stringAscii("Unauthorized Strategy"),
          Cl.principal(strategyContract),
          Cl.uint(3),
          Cl.uint(1000),
          Cl.uint(1000000)
        ],
        user1
      );
      
      expect(result).toBeErr(Cl.uint(401)); // ERR_NOT_AUTHORIZED
    });

    it("should allow owner to update strategy status", () => {
      // First register a strategy
      simnet.callPublicFn(
        contractName,
        "register-strategy",
        [
          Cl.stringAscii("Test Strategy"),
          Cl.principal(strategyContract),
          Cl.uint(3),
          Cl.uint(1000),
          Cl.uint(1000000)
        ],
        contractOwner
      );

      // Then update its status
      const { result } = simnet.callPublicFn(
        contractName,
        "update-strategy-status",
        [Cl.uint(1), Cl.bool(false)],
        contractOwner
      );
      
      expect(result).toBeOk(Cl.bool(true));
    });

    it("should reject strategy status update for non-existent strategy", () => {
      const { result } = simnet.callPublicFn(
        contractName,
        "update-strategy-status",
        [Cl.uint(999), Cl.bool(false)],
        contractOwner
      );
      
      expect(result).toBeErr(Cl.uint(402)); // ERR_STRATEGY_NOT_FOUND
    });
  });

  describe("Read-Only Functions", () => {
    beforeEach(() => {
      // Register a test strategy for read tests
      simnet.callPublicFn(
        contractName,
        "register-strategy",
        [
          Cl.stringAscii("Read Test Strategy"),
          Cl.principal(strategyContract),
          Cl.uint(2),
          Cl.uint(800),
          Cl.uint(500000)
        ],
        contractOwner
      );
    });

    it("should return strategy details", () => {
      const { result } = simnet.callReadOnlyFn(
        contractName,
        "get-strategy",
        [Cl.uint(1)],
        user1
      );
      
      expect(result).toBeSome(
        Cl.tuple({
          name: Cl.stringAscii("Read Test Strategy"),
          "contract-address": Cl.principal(strategyContract),
          "risk-level": Cl.uint(2),
          "expected-apy": Cl.uint(800),
          "current-tvl": Cl.uint(0),
          "max-tvl": Cl.uint(500000),
          "is-active": Cl.bool(true),
          "created-at": Cl.uint(simnet.blockHeight),
          "last-updated": Cl.uint(simnet.blockHeight)
        })
      );
    });