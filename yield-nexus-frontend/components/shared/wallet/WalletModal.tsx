// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { createPortal } from "react-dom";
// import { X, Bitcoin, ShieldCheck } from "lucide-react";
// import { useTheme } from "next-themes";
// import { useWallet } from "@/context/WalletContext";
// import YieldNexusLogo from "../YieldNexusLogo";

// interface WalletOption {
//   id: string;
//   name: string;
//   logo: React.ReactNode;
//   description: string;
// }

// interface WalletConnectModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   const { connectWallet } = useWallet();
//   const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string>("");
//   const modalRef = useRef<HTMLDivElement>(null);
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   const walletOptions: WalletOption[] = [
//     {
//       id: "hiro",
//       name: "Hiro Wallet",
//       logo: <Bitcoin className="h-6 w-6 text-[#F7931A]" />,
//       description: "The recommended wallet for Stacks applications"
//     },
//     {
//       id: "leather",
//       name: "Leather",
//       logo: <div className="bg-amber-600 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-sm">L</div>,
//       description: "Successor to Xverse Bitcoin wallet"
//     },
//     {
//       id: "xverse",
//       name: "Xverse",
//       logo: <div className="bg-blue-600 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-sm">X</div>,
//       description: "Modern wallet for Bitcoin and Stacks"
//     }
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   const handleSelectWallet = async (wallet: WalletOption) => {
//     setSelectedWallet(wallet);
//     try {
//       await connectWallet();
//       onClose();
//     } catch (error) {
//       setErrorMessage(error instanceof Error ? error.message : "Failed to connect wallet");
//     }
//   };

//   const handleClose = () => {
//     onClose();
//     setSelectedWallet(null);
//     setErrorMessage("");
//   };

//   if (!isOpen) return null;

//   const bgColor = isDark ? "bg-[#0A0E1F]" : "bg-white";
//   const borderColor = isDark ? "border-slate-700/30" : "border-slate-200/50";
//   const textColor = isDark ? "text-white" : "text-slate-800";
//   const subtextColor = isDark ? "text-slate-300" : "text-slate-600";
//   const walletItemBg = isDark ? "bg-slate-800/20 hover:bg-slate-800/30" : "bg-slate-100/40 hover:bg-slate-100/80";
//   const walletItemBorder = isDark ? "border-slate-700/40" : "border-slate-200/70";

//   return createPortal(
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         <motion.div
//           ref={modalRef}
//           className={`relative w-full max-w-md ${bgColor} rounded-xl overflow-hidden shadow-2xl border ${borderColor}`}
//           initial={{ scale: 0.95, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.95, opacity: 0 }}
//           transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         >
//           {/* Modal Header */}
//           <div className={`p-4 flex justify-between items-center border-b ${borderColor}`}>
//             <div className="flex items-center">
//               <YieldNexusLogo iconOnly className="mr-8 h-4 w-4" />
//               <h2 className={`${textColor} text-lg font-medium`}>Connect Wallet</h2>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={handleClose}
//               className="h-7 w-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/30 transition-colors"
//             >
//               <X className="h-4 w-4" />
//             </motion.button>
//           </div>

//           {/* Modal Content */}
//           <div className="p-4">
//             <p className={`${subtextColor} text-xs mb-4`}>
//               Connect your wallet to access the Yield Nexus and start earning yield on your Bitcoin.
//             </p>

//             <div className="space-y-2 mb-4">
//               {walletOptions.map((wallet) => (
//                 <motion.button
//                   key={wallet.id}
//                   onClick={() => handleSelectWallet(wallet)}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className={`w-full p-3 border ${walletItemBorder} rounded-lg ${walletItemBg} flex items-center transition-colors`}
//                 >
//                   <div className={`h-9 w-9 rounded-md ${isDark ? 'bg-slate-800/80' : 'bg-white'} border ${walletItemBorder} flex items-center justify-center mr-3 shrink-0`}>
//                     {wallet.logo}
//                   </div>
//                   <div className="text-left">
//                     <span className={`${textColor} text-sm font-medium`}>{wallet.name}</span>
//                     <p className="text-slate-400 text-xs">{wallet.description}</p>
//                   </div>
//                 </motion.button>
//               ))}
//             </div>

//             {errorMessage && (
//               <div className={`p-2 mb-4 text-red-500 text-sm rounded-lg ${isDark ? 'bg-red-900/20' : 'bg-red-50'}`}>
//                 {errorMessage}
//               </div>
//             )}

//             <div className={`p-2.5 ${isDark ? 'bg-slate-800/30' : 'bg-blue-50/50'} rounded-lg border ${isDark ? 'border-slate-700/30' : 'border-blue-200/50'}`}>
//               <div className="flex items-center mb-1">
//                 <ShieldCheck className="h-3.5 w-3.5 text-green-500 mr-1.5" />
//                 <h4 className="text-green-600 dark:text-green-400 text-xs font-medium">Secure Connection</h4>
//               </div>
//               <p className="text-xs text-slate-500 dark:text-slate-400">
//                 We never have access to your private keys or funds.
//               </p>
//             </div>

//             <div className={`p-3 border-t ${borderColor} ${isDark ? 'bg-slate-900/30' : 'bg-slate-50'} text-center`}>
//               <p className="text-xs text-slate-500">
//                 By connecting a wallet, you agree to the Yield Nexus Terms of Service and Privacy Policy.
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>,
//     document.body
//   );
// };

// export default WalletConnectModal;


"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, Bitcoin, ShieldCheck, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useWallet } from "@/context/WalletContext";
import YieldNexusLogo from "../YieldNexusLogo";

interface WalletOption {
  id: string;
  name: string;
  logo: React.ReactNode;
  description: string;
}

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { connectWallet, isConnected } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const walletOptions: WalletOption[] = [
    {
      id: "hiro",
      name: "Hiro Wallet",
      logo: <Bitcoin className="h-6 w-6 text-[#F7931A]" />,
      description: "The recommended wallet for Stacks applications"
    },
    {
      id: "leather",
      name: "Leather",
      logo: <div className="bg-amber-600 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-sm">L</div>,
      description: "Successor to Xverse Bitcoin wallet"
    },
    {
      id: "xverse",
      name: "Xverse",
      logo: <div className="bg-blue-600 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-sm">X</div>,
      description: "Modern wallet for Bitcoin and Stacks"
    }
  ];

  // Close modal when wallet is successfully connected
  useEffect(() => {
    if (isConnected && isOpen) {
      // Clear any existing timeout
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
      
      // Small delay to ensure the connection state is fully updated
      const timer = setTimeout(() => {
        handleClose();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isConnected, isOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        if (!isConnecting) {
          handleClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isConnecting]);

  const handleSelectWallet = async (wallet: WalletOption) => {
    if (isConnecting) return;
    
    setSelectedWallet(wallet);
    setIsConnecting(true);
    setErrorMessage("");
    
    try {
      // Set a timeout to handle cases where wallet connection takes too long
      // or user cancels the wallet popup
      connectionTimeoutRef.current = setTimeout(() => {
        if (isConnecting && !isConnected) {
          setIsConnecting(false);
          setSelectedWallet(null);
          setErrorMessage("Connection timed out. Please try again.");
        }
      }, 30000); // 30 seconds timeout

      await connectWallet();
      
      // Clear timeout on successful connection
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
      
      // If we reach here and wallet is not connected, it might be because
      // user canceled the wallet popup
      if (!isConnected) {
        setIsConnecting(false);
        setSelectedWallet(null);
        // Don't show error for user cancellation, just reset state
      }
      
    } catch (error) {
      // Clear timeout on error
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
      
      console.error("Wallet connection error:", error);
      
      let errorMsg = "Failed to connect wallet";
      if (error instanceof Error) {
        // Handle specific error messages
        if (error.message.includes("User denied")) {
          errorMsg = "Connection cancelled by user";
        } else if (error.message.includes("No wallet")) {
          errorMsg = `${wallet.name} not found. Please install the wallet extension.`;
        } else {
          errorMsg = error.message;
        }
      }
      
      setErrorMessage(errorMsg);
      setIsConnecting(false);
      setSelectedWallet(null);
    }
  };

  const handleClose = () => {
    if (isConnecting) {
      // If user tries to close while connecting, we can allow it
      // but clear the connecting state
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
    }
    
    // Reset all states
    setSelectedWallet(null);
    setErrorMessage("");
    setIsConnecting(false);
    onClose();
  };

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedWallet(null);
      setErrorMessage("");
      setIsConnecting(false);
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const bgColor = isDark ? "bg-[#0A0E1F]" : "bg-white";
  const borderColor = isDark ? "border-slate-700/30" : "border-slate-200/50";
  const textColor = isDark ? "text-white" : "text-slate-800";
  const subtextColor = isDark ? "text-slate-300" : "text-slate-600";
  const walletItemBg = isDark ? "bg-slate-800/20 hover:bg-slate-800/30" : "bg-slate-100/40 hover:bg-slate-100/80";
  const walletItemBorder = isDark ? "border-slate-700/40" : "border-slate-200/70";

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={modalRef}
          className={`relative w-full max-w-md ${bgColor} rounded-xl overflow-hidden shadow-2xl border ${borderColor}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Modal Header */}
          <div className={`p-4 flex justify-between items-center border-b ${borderColor}`}>
            <div className="flex items-center">
              <YieldNexusLogo iconOnly className="mr-8 h-4 w-4" />
              <h2 className={`${textColor} text-lg font-medium`}>
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="h-7 w-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/30 transition-colors"
            >
              <X className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Modal Content */}
          <div className="p-4">
            {!isConnecting && (
              <p className={`${subtextColor} text-xs mb-4`}>
                Connect your wallet to access the Yield Nexus and start earning yield on your Bitcoin.
              </p>
            )}

            {isConnecting && selectedWallet && (
              <div className="flex items-center justify-center py-4 mb-4">
                <Loader2 className="h-6 w-6 animate-spin text-[#F7931A] mr-3" />
                <div className="text-left">
                  <p className={`${textColor} text-sm font-medium`}>
                    Connecting to {selectedWallet.name}...
                  </p>
                  <p className={`${subtextColor} text-xs mt-1`}>
                    Check your wallet extension or app
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2 mb-4">
              {walletOptions.map((wallet) => (
                <motion.button
                  key={wallet.id}
                  onClick={() => handleSelectWallet(wallet)}
                  disabled={isConnecting}
                  whileHover={!isConnecting ? { scale: 1.02 } : {}}
                  whileTap={!isConnecting ? { scale: 0.98 } : {}}
                  className={`w-full p-3 border ${walletItemBorder} rounded-lg ${walletItemBg} flex items-center transition-colors relative ${
                    isConnecting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  } ${selectedWallet?.id === wallet.id && isConnecting ? 'ring-2 ring-[#F7931A]/50' : ''}`}
                >
                  <div className={`h-9 w-9 rounded-md ${isDark ? 'bg-slate-800/80' : 'bg-white'} border ${walletItemBorder} flex items-center justify-center mr-3 shrink-0`}>
                    {wallet.logo}
                  </div>
                  <div className="text-left flex-1">
                    <span className={`${textColor} text-sm font-medium`}>{wallet.name}</span>
                    <p className="text-slate-400 text-xs">{wallet.description}</p>
                  </div>
                  {selectedWallet?.id === wallet.id && isConnecting && (
                    <Loader2 className="h-4 w-4 animate-spin text-[#F7931A]" />
                  )}
                </motion.button>
              ))}
            </div>

            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 mb-4 text-red-500 text-sm rounded-lg border ${isDark ? 'bg-red-900/20 border-red-800/50' : 'bg-red-50 border-red-200'}`}
              >
                <div className="flex items-center">
                  <X className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              </motion.div>
            )}

            <div className={`p-2.5 ${isDark ? 'bg-slate-800/30' : 'bg-blue-50/50'} rounded-lg border ${isDark ? 'border-slate-700/30' : 'border-blue-200/50'}`}>
              <div className="flex items-center mb-1">
                <ShieldCheck className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                <h4 className="text-green-600 dark:text-green-400 text-xs font-medium">Secure Connection</h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                We never have access to your private keys or funds.
              </p>
            </div>

            <div className={`p-3 border-t ${borderColor} ${isDark ? 'bg-slate-900/30' : 'bg-slate-50'} text-center mt-4`}>
              <p className="text-xs text-slate-500">
                By connecting a wallet, you agree to the Yield Nexus Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default WalletConnectModal;