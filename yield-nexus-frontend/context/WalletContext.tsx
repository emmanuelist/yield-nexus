"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { connect, disconnect, isConnected, getLocalStorage} from '@stacks/connect';
import { SbtcApiClientMainnet, SbtcApiClientTestnet } from 'sbtc';

interface TokenBalance {
  stx: string;
  sbtc: string;
  btc: string;
}

interface WalletAddresses {
  stx: string;
  btc: string;
  sbtc?: string;
}

interface WalletContextType {
  isConnected: boolean;
  addresses: WalletAddresses | null;
  balances: TokenBalance;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  refreshBalances: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addresses, setAddresses] = useState<WalletAddresses | null>(null);
  const [balances, setBalances] = useState<TokenBalance>({
    stx: '0',
    sbtc: '0',
    btc: '0'
  });

  const sbtcClient = process.env.NEXT_PUBLIC_NETWORK === 'mainnet' 
    ? new SbtcApiClientTestnet() 
    : new SbtcApiClientMainnet();

  // Helper to safely access wallet response
  const getWalletAddresses = (response: any) => {
    return {
      stx: response?.addresses?.stx?.[0]?.address,
      btc: response?.addresses?.btc?.[0]?.address
    };
  };

  // Initialize from localStorage if available
  useEffect(() => {
    const initWallet = async () => {
      if (isConnected()) {
        const userData = getLocalStorage();

        console.log("User Data:", userData);
        const { stx, btc } = getWalletAddresses(userData);
        
        if (stx && btc) {
          setAddresses({
            stx,
            btc,
            sbtc: stx
          });
          setTimeout(() => {
            fetchAllBalances(stx, btc);
          }, 2000);
        }
      }
    };
    initWallet();
  }, []);

  

  const fetchSTXBalance = async (stxAddress: string): Promise<string> => {
    try {
      const balanceResponse = await fetch(`https://api.hiro.so/extended/v2/addresses/${stxAddress}/balances/stx?include_mempool=false`);
      const balanceData = await balanceResponse.json();
      console.log("STX Balance Response:", balanceData);
      
      // Convert microSTX to STX (divide by 1,000,000)
      const microStxBalance = balanceData.balance;
      console.log("Micro STX Balance:", microStxBalance);
      const stxBalance = (parseInt(microStxBalance) / 1000000).toString();
      return stxBalance;
    } catch (error) {
      console.error("Error fetching STX balance:", error);
      return '0';
    }
  };

  const fetchSBTCBalance = async (stxAddress: string): Promise<string> => {
    try {
      const balance = await sbtcClient.fetchSbtcBalance(stxAddress);
      console.log("sBTC Balance:", balance);
      return balance.toString() || '0';
    } catch (error) {
      console.error("Error fetching sBTC balance:", error);
      return '0';
    }
  };

  const fetchBTCBalance = async (btcAddress: string): Promise<string> => {
    try {
      const utxos = await sbtcClient.fetchUtxos(btcAddress);
        console.log("BTC UTXOs:", utxos);
      const balance = utxos.reduce((sum: number, utxo: any) => sum + utxo.value, 0);
      return (balance / 100000000).toString();
    } catch (error) {
      console.error("Error fetching BTC balance:", error);
      return '0';
    }
  };

  const fetchAllBalances = async (stxAddress: string, btcAddress: string) => {
  try {
    const [stxBalance, sbtcBalance, btcBalance] = await Promise.all([
      fetchSTXBalance(stxAddress),
      fetchSBTCBalance(stxAddress),
      fetchBTCBalance(btcAddress)
    ]);
    
    // Only update if we got valid data
    setBalances({
      stx: stxBalance,
      sbtc: sbtcBalance,
      btc: btcBalance
    });
  } catch (error) {
    console.error("Error fetching balances:", error);
    // Don't update balances on error - keep existing values
  }
};

  const connectWallet = async () => {
    try {
      console.log("Starting wallet connection...");
      const response = await connect();
      console.log("Wallet connection response:", response);

      const userData = getLocalStorage();
      
      const { stx, btc } = getWalletAddresses(userData);

      console.log("Extracted addresses:", { stx, btc });
      
      if (stx && btc) {
        const newAddresses = {
          stx,
          btc,
          sbtc: stx
        };
        
        console.log("Setting addresses:", newAddresses);
        setAddresses(newAddresses);
        
        // Fetch balances in background but don't wait for them
        fetchAllBalances(stx, btc).catch(error => {
          console.error("Error fetching balances:", error);
        });
      } else {
        throw new Error("Failed to retrieve wallet addresses");
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
      throw error;
    }
  };

  const disconnectWallet = () => {
    console.log("Disconnecting wallet...");
    disconnect();
    setAddresses(null);
    setBalances({
      stx: '0',
      sbtc: '0',
      btc: '0'
    });
  };

  const refreshBalances = async () => {
    if (addresses) {
      await fetchAllBalances(addresses.stx, addresses.btc);
    }
  };

  // Computed isConnected based on addresses state
  const walletConnected = !!addresses;

  return (
    <WalletContext.Provider
      value={{
        isConnected: walletConnected,
        addresses,
        balances,
        connectWallet,
        disconnectWallet,
        refreshBalances,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};