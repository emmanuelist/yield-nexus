"use client";

import { useWallet } from "@/context/WalletContext";
import { useEffect } from "react";

const Test = () => {
  // Add some debugging
  useEffect(() => {
    console.log("Test component mounted");
  }, []);

  let walletData;
  
  try {
    walletData = useWallet();
    console.log("useWallet data:", walletData);
  } catch (error) {
    console.error("useWallet error:", error);
    return (
      <div>
        <h1>Wallet Context Error</h1>
        <p>Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
        <p>Make sure this component is wrapped in WalletProvider</p>
      </div>
    );
  }

  const { 
    isConnected, 
    addresses, 
    balances, 
    connectWallet, 
    disconnectWallet,
    refreshBalances
  } = walletData;

  // Format balances for display
  const formatBalance = (balance: string, decimals: number = 6) => {
    const num = parseFloat(balance);
    return num.toFixed(decimals);
  };

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const handleRefreshBalances = async () => {
    try {
      await refreshBalances();
    } catch (error) {
      console.error("Failed to refresh balances:", error);
    }
  };

  return (
    <div className="p-6 py-24 min-h-screen max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Wallet Test</h1>
      
      {isConnected ? (
        <div className="space-y-2">
          <div>
            <strong>STX Address:</strong> 
            <p className="text-sm break-all">{addresses?.stx}</p>
          </div>
          <div>
            <strong>BTC Address:</strong> 
            <p className="text-sm break-all">{addresses?.btc}</p>
          </div>
          <div>
            <strong>STX Balance:</strong> {formatBalance(balances.stx)}
          </div>
          <div>
            <strong>sBTC Balance:</strong> {formatBalance(balances.sbtc)}
          </div>
          <div>
            <strong>BTC Balance:</strong> {formatBalance(balances.btc)} BTC
          </div>
          
          <div className="flex gap-2 mt-4">
            <button 
              onClick={disconnectWallet}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Disconnect
            </button>
            <button 
              onClick={handleRefreshBalances}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh Balances
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-4">No wallet connected</p>
          <button 
            onClick={handleConnectWallet}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default Test;