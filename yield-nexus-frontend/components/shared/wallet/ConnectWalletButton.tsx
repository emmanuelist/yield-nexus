// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Wallet, Check, ChevronDown, Bitcoin } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useTheme } from "next-themes";
// import WalletConnectModal from "./WalletModal";
// import { useWallet } from "@/context/WalletContext";

// interface ConnectWalletButtonProps {
//   buttonClass?: string;
//   textStyle?: string;
//   iconClass?: string;
//   className?: string;
//   onOpenModal?: () => void;
// }

// const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
//   buttonClass,
//   textStyle = "mr-3 text-sm",
//   iconClass,
//   className,
//   onOpenModal
// }) => {
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [showDropdown, setShowDropdown] = useState<boolean>(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const { theme } = useTheme();
//   const { 
//     isConnected, 
//     addresses, 
//     balances, 
//     disconnectWallet,
//     refreshBalances
//   } = useWallet();
//   const isDark = theme === "dark";


//   const formatBalance = (balance: string, decimals: number = 6) => {
//     const num = parseFloat(balance);
//     console.log("Formatting balance:", num, "with decimals:", decimals);
//     return num.toFixed(decimals);
//   };

//   const formatAddress = (addr: string) => {
//     if (!addr || addr.length <= 10) return addr;
//     return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
//   };

//   const handleOpenModal = () => {
//     setShowModal(true);
//     if (onOpenModal) onOpenModal();
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <>
//       <div className={cn("relative inline-flex", className)} ref={dropdownRef}>
//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.97 }}
//           className="inline-flex"
//         >
//           {isConnected ? (
//             <div className="flex">
//               {parseFloat(balances.stx) > 0 && (
//                 <div className={cn(
//                   "hidden sm:flex mr-2 items-center rounded-full px-2.5 py-1 border",
//                   isDark
//                     ? "bg-gradient-to-r from-[#0c1e5c]/80 to-[#192559]/80 text-indigo-300 border-[#F7931A]/20"
//                     : "bg-blue-50 text-indigo-700 border-[#F7931A]/20"
//                 )}>
//                   <Bitcoin className={cn("h-3.5 w-3.5 mr-1", "text-[#F7931A]")} />
//                   <span className="font-medium text-xs">{formatBalance(balances.stx)} sBTC</span>
//                 </div>
//               )}

//               <div className="relative group overflow-hidden">
//                 <button
//                   onClick={() => setShowDropdown(!showDropdown)}
//                   className={cn(
//                     `relative flex items-center justify-between bg-gradient-to-r from-[#0c1e5c]/95 to-[#192559]/95 hover:from-[#192559]/95 hover:to-[#0c1e5c]/95 text-white rounded-full pl-4 pr-3 py-2 font-medium tracking-wide border border-[#F7931A]/20 ${buttonClass}`
//                   )}
//                 >
//                   <Check className={cn("mr-1.5 h-3.5 w-3.5", "text-[#F7931A]")} />
//                   <span className="text-sm">{formatAddress(addresses?.stx || "")}</span>
//                   <ChevronDown className={cn("ml-1.5 h-3 w-3 transition-transform duration-200", "text-[#F7931A]", showDropdown ? "rotate-180" : "")} />
//                   <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-[#F7931A]/10 opacity-40 rounded-full pointer-events-none"></div>
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="relative group overflow-hidden">
//               <button
//                 onClick={handleOpenModal}
//                 className={cn(
//                   `relative flex items-center justify-between bg-gradient-to-r from-[#0c1e5c]/95 to-[#192559]/95 hover:from-[#192559]/95 hover:to-[#0c1e5c]/95 text-white rounded-full pl-5 pr-3 py-2 font-medium tracking-wide border border-[#F7931A]/20 ${buttonClass}`
//                 )}
//               >
//                 <span className={`${textStyle}`}>Connect Wallet</span>
//                 <div className={cn(`flex items-center justify-center rounded-full ${iconClass} h-7 w-7 border border-[#F7931A]/30`, isDark ? "bg-[#3b4795] text-[#F7931A]" : "bg-indigo-200 text-[#F7931A]")}>
//                   <motion.div
//                     initial={{ x: 0 }}
//                     whileHover={{ x: 1 }}
//                     className="group-hover:translate-x-0.5 transition-transform duration-300"
//                   >
//                     <Wallet className="h-3.5 w-3.5" />
//                   </motion.div>
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-[#F7931A]/10 opacity-40 rounded-full pointer-events-none"></div>
//               </button>
//             </div>
//           )}
//         </motion.div>

//         <AnimatePresence>
//           {showDropdown && (
//             <motion.div
//               initial={{ opacity: 0, y: 10, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 10, scale: 0.95 }}
//               transition={{ duration: 0.2 }}
//               className={cn(
//                 "absolute right-0 top-12 w-60 rounded-xl shadow-xl border z-50 p-2 overflow-hidden",
//                 isDark
//                   ? "bg-[#0F1729] border-slate-700/30"
//                   : "bg-white border-slate-200"
//               )}
//             >
//               {parseFloat(balances.sbtc) > 0 && (
//                 <div className={cn(
//                   "flex sm:hidden items-center p-2.5 mb-1 rounded-lg border",
//                   isDark
//                     ? "bg-gradient-to-r from-[#0c1e5c]/80 to-[#192559]/80 text-indigo-300 border-[#F7931A]/20"
//                     : "bg-blue-50 text-indigo-700 border-[#F7931A]/20"
//                 )}>
//                   <Bitcoin className={cn("h-4 w-4 mr-2", "text-[#F7931A]")} />
//                   <div>
//                     <div className="font-semibold text-sm">{formatBalance(balances.sbtc)} sBTC</div>
//                     <div className={cn("text-xs", isDark ? "text-[#F7931A]/90" : "text-[#F7931A]/80")}>Available Balance</div>
//                   </div>
//                 </div>
//               )}

//               <div className="space-y-0.5">
//                 <button
//                   className={cn(
//                     "w-full flex items-center justify-between p-2 text-left text-sm rounded-lg transition-colors",
//                     isDark
//                       ? "hover:bg-slate-800/50 text-slate-200"
//                       : "hover:bg-slate-100 text-slate-700"
//                   )}
//                 >
//                   <span className="flex items-center">
//                     <Bitcoin className={cn("mr-2 h-3.5 w-3.5", "text-[#F7931A]")} />
//                     Vault Dashboard
//                   </span>
//                 </button>

//                 <button
//                   className={cn(
//                     "w-full flex items-center justify-between p-2 text-left text-sm rounded-lg transition-colors",
//                     isDark
//                       ? "hover:bg-slate-800/50 text-slate-200"
//                       : "hover:bg-slate-100 text-slate-700"
//                   )}
//                   onClick={() => {
//                     navigator.clipboard.writeText(addresses?.stx || "");
//                     setShowDropdown(false);
//                   }}
//                 >
//                   <span className="flex items-center">
//                     <svg className={cn("mr-2 h-3.5 w-3.5", "text-[#F7931A]")} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
//                     </svg>
//                     Copy Address
//                   </span>
//                 </button>

//                 <button
//                   className={cn(
//                     "w-full flex items-center p-2 text-left text-sm text-red-400 rounded-lg transition-colors",
//                     isDark ? "hover:bg-red-900/20" : "hover:bg-red-50"
//                   )}
//                   onClick={() => {
//                     disconnectWallet();
//                     setShowDropdown(false);
//                   }}
//                 >
//                   <svg className="mr-2 h-3.5 w-3.5" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
//                   </svg>
//                   Disconnect
//                 </button>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       <WalletConnectModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//       />
//     </>
//   );
// };

// export default ConnectWalletButton;

"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Check, ChevronDown, Bitcoin, Copy, LogOut, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useWallet } from "@/context/WalletContext";

interface ConnectWalletButtonProps {
  buttonClass?: string;
  textStyle?: string;
  iconClass?: string;
  className?: string;
  onConnect?: () => void;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  buttonClass,
  textStyle = "mr-3 text-sm",
  iconClass,
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
            {parseFloat(balances.sbtc || "0") > 0 && (
              <div className={cn(
                "hidden sm:flex mr-2 items-center rounded-full px-2.5 py-1 border",
                isDark
                  ? "bg-gradient-to-r from-[#0c1e5c]/80 to-[#192559]/80 text-indigo-300 border-[#F7931A]/20"
                  : "bg-blue-50 text-indigo-700 border-[#F7931A]/20"
              )}>
                <Bitcoin className={cn("h-3.5 w-3.5 mr-1", "text-[#F7931A]")} />
                <span className="font-medium text-xs">{formatBalance(balances.sbtc)} sBTC</span>
              </div>
            )}

            {/* Connected Wallet Button */}
            <div className="relative group overflow-hidden">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={cn(
                  `relative flex items-center justify-between bg-gradient-to-r from-[#0c1e5c]/95 to-[#192559]/95 hover:from-[#192559]/95 hover:to-[#0c1e5c]/95 text-white rounded-full pl-4 pr-3 py-2 font-medium tracking-wide border border-[#F7931A]/20 ${buttonClass}`
                )}
              >
                <Check className={cn("mr-1.5 h-3.5 w-3.5", "text-[#F7931A]")} />
                <span className="text-sm">{formatAddress(addresses?.stx || "")}</span>
                <ChevronDown className={cn("ml-1.5 h-3 w-3 transition-transform duration-200", "text-[#F7931A]", showDropdown ? "rotate-180" : "")} />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-[#F7931A]/10 opacity-40 rounded-full pointer-events-none"></div>
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
        {showDropdown && isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute right-0 top-12 w-60 rounded-xl shadow-xl border z-[9999] p-2 overflow-hidden",
              isDark
                ? "bg-[#0F1729] border-slate-700/30"
                : "bg-white border-slate-200"
            )}
            style={{ 
              position: 'absolute',
              zIndex: 9999,
              top: '100%',
              marginTop: '8px'
            }}
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
                className={cn(
                  "w-full flex items-center justify-between p-2 text-left text-sm rounded-lg transition-colors",
                  isDark
                    ? "hover:bg-slate-800/50 text-slate-200"
                    : "hover:bg-slate-100 text-slate-700"
                )}
              >
                <span className="flex items-center">
                  <Bitcoin className={cn("mr-2 h-3.5 w-3.5", "text-[#F7931A]")} />
                  Vault Dashboard
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