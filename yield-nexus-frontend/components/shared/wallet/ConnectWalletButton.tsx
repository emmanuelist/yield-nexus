"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Check, ChevronDown, Bitcoin, Copy, LogOut, Loader2, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useWallet } from "@/context/WalletContext";
import { useRouter } from "next/navigation";

interface ConnectWalletButtonProps {
  buttonClass?: string;
  textStyle?: string;
  iconClass?: string;
  className?: string;
  enableDropdown?: boolean;
  onConnect?: () => void;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  buttonClass,
  textStyle = "mr-3 text-sm",
  iconClass,
  enableDropdown = true,
  className,
  onConnect
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { 
    isConnected, 
    addresses, 
    balances, 
    disconnectWallet,
    refreshBalances,
    connectWallet
  } = useWallet();
  const isDark = theme === "dark";

  const router = useRouter();


  // Refresh balances when wallet is connected
  useEffect(() => {
    if (isConnected && addresses?.stx) {
      refreshBalances();
    }
  }, [isConnected, addresses?.stx, refreshBalances]);

  const formatBalance = (balance: string, decimals: number = 6) => {
    const num = parseFloat(balance);
    return num > 0 ? num.toFixed(decimals) : "0.00";
  };

  const formatAddress = (addr: string) => {
    if (!addr || addr.length <= 10) return addr;
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const handleConnectWallet = async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    setConnectionError("");
    
    try {
      await connectWallet();
      
      // Wait a brief moment for the context to update
      setTimeout(() => {
        setIsConnecting(false);
      }, 100);
      
      if (onConnect) onConnect();
    } catch (error) {
      console.error("Wallet connection error:", error);
      
      let errorMsg = "Failed to connect wallet";
      if (error instanceof Error) {
        if (error.message.includes("User denied") || error.message.includes("User cancelled")) {
          errorMsg = "Connection cancelled by user";
        } else if (error.message.includes("No wallet") || error.message.includes("not found")) {
          errorMsg = "Wallet extension not found. Please install a Stacks wallet.";
        } else {
          errorMsg = error.message;
        }
      }
      
      setConnectionError(errorMsg);
      setIsConnecting(false);
      
      // Clear error after 5 seconds
      setTimeout(() => {
        setConnectionError("");
      }, 5000);
    }
  };

  const handleCopyAddress = async () => {
    if (addresses?.stx) {
      try {
        await navigator.clipboard.writeText(addresses.stx);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        setShowDropdown(false);
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setShowDropdown(false);
    setConnectionError("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when wallet disconnects
  useEffect(() => {
    if (!isConnected) {
      setShowDropdown(false);
    }
  }, [isConnected]);

  // Add debug logging to track state changes
  useEffect(() => {
    console.log('Wallet state changed:', { isConnected, addresses, isConnecting });
  }, [isConnected, addresses, isConnecting]);

  return (
    <div className={cn("relative inline-flex flex-col", className)} ref={dropdownRef}>
      <motion.div
        whileHover={{ scale: isConnecting ? 1 : 1.03 }}
        whileTap={{ scale: isConnecting ? 1 : 0.97 }}
        className="inline-flex"
      >
        {isConnected ? (
          <div className="flex">
            {/* Balance Display - Desktop Only */}
            {parseFloat(balances.stx || "0") > 0 && (
              <div className={cn(
                "hidden sm:flex mr-2 items-center rounded-full px-2.5 py-1 border",
                isDark
                  ? "bg-gradient-to-r from-[#0c1e5c]/80 to-[#192559]/80 text-indigo-300 border-[#F7931A]/20"
                  : "bg-blue-50 text-indigo-700 border-[#F7931A]/20"
              )}>
                <Bitcoin className={cn("h-3.5 w-3.5 mr-1", "text-[#F7931A]")} />
                <span className="font-medium text-xs">{formatBalance(balances.stx)} sBTC</span>
              </div>
            )}

            
            {/* Connected Wallet Button */}
            <div className="relative group overflow-hidden">
              <button
                onClick={() => enableDropdown ? setShowDropdown(!showDropdown) : router.push("/users/dashboard")}
                className={cn(
                  `relative flex items-center justify-between text-white rounded-full pl-4 pr-3 py-2 font-medium tracking-wide border transition-all duration-300 ${buttonClass}`,
                  enableDropdown 
                    ? "bg-gradient-to-r from-[#0c1e5c]/95 to-[#192559]/95 hover:from-[#192559]/95 hover:to-[#0c1e5c]/95 border-[#F7931A]/20"
                    : isDark
                      ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 border-indigo-400/50 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-400/50 hover:scale-105"
                      : "bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 border-indigo-400/50 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-400/50 hover:scale-105"
                )}
              >
                {enableDropdown ? (
                  <>
                    <Check className={cn("mr-1.5 h-3.5 w-3.5", "text-[#F7931A]")} />
                    <span className="text-sm">{formatAddress(addresses?.stx || "")}</span>
                    <ChevronDown className={cn("ml-1.5 h-3 w-3 transition-transform duration-200", "text-[#F7931A]", showDropdown ? "rotate-180" : "")} />
                  </>
                ) : (
                  <>
                    <BarChart3 className="mr-1.5 h-4 w-4 text-white drop-shadow-sm" />
                    <span className="text-sm font-bold tracking-wide">Dashboard</span>
                    <div className={cn(
                      "ml-1.5 h-4 w-4 rounded-full flex items-center justify-center",
                      isDark ? "bg-yellow-400/30" : "bg-white/30"
                    )}>
                      <div className={cn(
                        "h-2 w-2 rounded-full animate-pulse",
                        isDark ? "bg-yellow-400" : "bg-white"
                      )}></div>
                    </div>
                  </>
                )}
                
                {/* Enhanced overlay effects */}
                <div className={cn(
                  "absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300",
                  enableDropdown 
                    ? "bg-gradient-to-r from-indigo-500/5 to-[#F7931A]/10 opacity-40"
                    : isDark
                      ? "bg-gradient-to-r from-white/10 via-transparent to-yellow-300/20 opacity-0 group-hover:opacity-100"
                      : "bg-gradient-to-r from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100"
                )}></div>
                
                {/* Animated border glow */}
                {!enableDropdown && (
                  <div className={cn(
                    "absolute inset-0 rounded-full transition-all duration-300",
                    isDark 
                      ? "ring-2 ring-indigo-400/0 group-hover:ring-indigo-400/60"
                      : "ring-2 ring-indigo-400/0 group-hover:ring-indigo-400/60"
                  )}></div>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Connect Wallet Button */
          <div className="relative group overflow-hidden">
            <button
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className={cn(
                `relative flex items-center justify-between bg-gradient-to-r from-[#0c1e5c]/95 to-[#192559]/95 hover:from-[#192559]/95 hover:to-[#0c1e5c]/95 text-white rounded-full pl-5 pr-3 py-2 font-medium tracking-wide border border-[#F7931A]/20 transition-all duration-200 ${buttonClass}`,
                isConnecting ? "opacity-80 cursor-not-allowed" : "cursor-pointer"
              )}
            >
              <span className={`${textStyle}`}>
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </span>
              <div className={cn(`flex items-center justify-center rounded-full ${iconClass} h-7 w-7 border border-[#F7931A]/30`, isDark ? "bg-[#3b4795] text-[#F7931A]" : "bg-indigo-200 text-[#F7931A]")}>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={!isConnecting ? { x: 1 } : {}}
                  className={cn("transition-transform duration-300", !isConnecting && "group-hover:translate-x-0.5")}
                >
                  {isConnecting ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Wallet className="h-3.5 w-3.5" />
                  )}
                </motion.div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-[#F7931A]/10 opacity-40 rounded-full pointer-events-none"></div>
            </button>
          </div>
        )}
      </motion.div>

      {/* Connection Error Display */}
      <AnimatePresence>
        {connectionError && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-full mt-2 left-0 right-0 p-3 rounded-lg shadow-lg border text-sm z-50",
              isDark
                ? "bg-red-900/20 border-red-800/50 text-red-400"
                : "bg-red-50 border-red-200 text-red-600"
            )}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 w-1 h-1 bg-red-500 rounded-full mt-2 mr-2"></div>
              <span className="flex-1">{connectionError}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {showDropdown && isConnected &&  enableDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute right-0 top-12 w-60 rounded-xl shadow-xl border z-[99999] p-2 overflow-hidden",
              isDark
                ? "bg-[#0F1729] border-slate-700/30"
                : "bg-white border-slate-200"
            )}
           
          >
            {/* Balance Display - Mobile Only */}
            {parseFloat(balances.sbtc || "0") > 0 && (
              <div className={cn(
                "flex sm:hidden items-center p-2.5 mb-1 rounded-lg border",
                isDark
                  ? "bg-gradient-to-r from-[#0c1e5c]/80 to-[#192559]/80 text-indigo-300 border-[#F7931A]/20"
                  : "bg-blue-50 text-indigo-700 border-[#F7931A]/20"
              )}>
                <Bitcoin className={cn("h-4 w-4 mr-2", "text-[#F7931A]")} />
                <div>
                  <div className="font-semibold text-sm">{formatBalance(balances.sbtc)} sBTC</div>
                  <div className={cn("text-xs", isDark ? "text-[#F7931A]/90" : "text-[#F7931A]/80")}>Available Balance</div>
                </div>
              </div>
            )}

            <div className="space-y-0.5">
              {/* Vault Dashboard */}
              <button
                onClick={() => router.push("/users/dashboard")}
                className={cn(
                  "w-full flex items-center justify-between p-2 text-left text-sm rounded-lg transition-colors",
                  isDark
                    ? "hover:bg-slate-800/50 text-slate-200"
                    : "hover:bg-slate-100 text-slate-700"
                )}
              >
                <span className="flex items-center">
                  <BarChart3 className={cn("mr-2 h-3.5 w-3.5", "text-[#F7931A]")} />
                  Nexus Dashboard
                </span>
              </button>

              {/* Copy Address */}
              <button
                className={cn(
                  "w-full flex items-center justify-between p-2 text-left text-sm rounded-lg transition-colors",
                  isDark
                    ? "hover:bg-slate-800/50 text-slate-200"
                    : "hover:bg-slate-100 text-slate-700"
                )}
                onClick={handleCopyAddress}
              >
                <span className="flex items-center">
                  <Copy className={cn("mr-2 h-3.5 w-3.5", copySuccess ? "text-green-500" : "text-[#F7931A]")} />
                  {copySuccess ? "Copied!" : "Copy Address"}
                </span>
              </button>

              {/* Disconnect */}
              <button
                className={cn(
                  "w-full flex items-center p-2 text-left text-sm text-red-400 rounded-lg transition-colors",
                  isDark ? "hover:bg-red-900/20" : "hover:bg-red-50"
                )}
                onClick={handleDisconnect}
              >
                <LogOut className="mr-2 h-3.5 w-3.5" />
                Disconnect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConnectWalletButton;