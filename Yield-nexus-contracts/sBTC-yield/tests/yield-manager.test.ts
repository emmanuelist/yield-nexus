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