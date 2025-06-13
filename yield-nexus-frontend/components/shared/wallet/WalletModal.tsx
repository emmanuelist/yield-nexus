"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import {
    X,
    Check,
    Loader2,
    AlertTriangle,
    ArrowRight,
    Bitcoin,
    ShieldCheck,
    ExternalLink
} from "lucide-react";

import { useTheme } from "next-themes";
import YieldNexusLogo from "../YieldNexusLogo";

interface WalletOption {
    id: string;
    name: string;
    logo: string | React.ReactNode;
    description: string;
    popular?: boolean;
}

interface WalletConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onWalletConnected: (address: string, hasSBTC: boolean) => void;
}

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
    isOpen,
    onClose,
    onWalletConnected
}) => {
    const [connectionStep, setConnectionStep] = useState<"select" | "connecting" | "connected" | "error">("select");
    const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const modalRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Available wallet options
    const walletOptions: WalletOption[] = [
        {
            id: "hiro",
            name: "Hiro Wallet",
            logo: <Bitcoin className="h-6 w-6 text-[#F7931A]" />,
            description: "The recommended wallet for Stacks applications",
            popular: true
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
        },
        {
            id: "metamask",
            name: "MetaMask",
            logo: "🦊",
            description: "Popular web3 wallet with Stacks support"
        }
    ];

    // Add click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node) &&
                !(event.target as Element).closest('[data-modal-container="true"]')) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Handler for wallet selection
    const handleSelectWallet = (wallet: WalletOption) => {
        setSelectedWallet(wallet);
        setConnectionStep("connecting");

        // Simulate wallet connection process
        setTimeout(() => {
            if (wallet.id === "metamask") {
                // Simulate an error with MetaMask for demonstration
                setConnectionStep("error");
                setErrorMessage("MetaMask extension not detected. Please install MetaMask to continue.");
            } else {
                // Simulate successful connection
                setConnectionStep("connected");

                // After a brief delay, close modal and notify parent
                setTimeout(() => {
                    const hasSBTC = Math.random() > 0.3; // Randomly determine if user has sBTC for demo
                    onWalletConnected(`0x71${wallet.id.substring(0, 2)}...9e3f`, hasSBTC);
                }, 1500);
            }
        }, 2000);
    };

    // Reset modal state when closed
    const handleClose = () => {
        onClose();
        // Reset state after animation completes
        setTimeout(() => {
            setConnectionStep("select");
            setSelectedWallet(null);
            setErrorMessage("");
        }, 300);
    };

    // Don't render on server side or if not open
    if (typeof window === 'undefined' || !isOpen) return null;

    // Set styles based on theme
    const bgColor = isDark ? "bg-[#0A0E1F]" : "bg-white";
    const borderColor = isDark ? "border-slate-700/30" : "border-slate-200/50";
    const headerBg = isDark ? "from-[#0A0E1F] to-[#131B31]" : "from-gray-50 to-slate-100";
    const textColor = isDark ? "text-white" : "text-slate-800";
    const subtextColor = isDark ? "text-slate-300" : "text-slate-600";
    const walletItemBg = isDark ? "bg-slate-800/20 hover:bg-slate-800/30" : "bg-slate-100/40 hover:bg-slate-100/80";
    const walletItemBorder = isDark ? "border-slate-700/40" : "border-slate-200/70";
    const secureBoxBg = isDark ? "bg-slate-800/30" : "bg-blue-50/50";
    const secureBoxBorder = isDark ? "border-slate-700/30" : "border-blue-200/50";
    const footerBg = isDark ? "bg-slate-900/30" : "bg-slate-50";

    const modalContent = (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                data-modal-container="true"
            >
                <motion.div
                    className={`relative w-full max-w-md ${bgColor} rounded-xl overflow-hidden shadow-2xl border ${borderColor}`}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ maxHeight: 'calc(100vh - 40px)', overflowY: 'auto' }}
                    ref={modalRef}
                >
                    {/* Modal Header */}
                    <div className={`border-b ${borderColor} p-4 flex justify-between items-center bg-gradient-to-r ${headerBg}`}>
                        <div className="flex items-center">
                            <YieldNexusLogo iconOnly className="mr-8 h-4 w-4" />
                            <h2 className={`${textColor} text-lg font-medium`}>Connect Wallet</h2>
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
                        <AnimatePresence mode="wait">
                            {connectionStep === "select" && (
                                <motion.div
                                    key="select-wallet"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p className={`${subtextColor} text-xs mb-4`}>
                                        Connect your wallet to access the Yield Nexus and start earning yield on your Bitcoin.
                                    </p>

                                    <div className="space-y-2 mb-4">
                                        {walletOptions.map((wallet) => (
                                            <motion.button
                                                key={wallet.id}
                                                onClick={() => handleSelectWallet(wallet)}
                                                whileHover={{ scale: 1.02, backgroundColor: isDark ? "rgba(30, 41, 59, 0.5)" : "rgba(241, 245, 249, 0.8)" }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`w-full p-3 border ${walletItemBorder} rounded-lg ${walletItemBg} flex items-center transition-colors group`}
                                            >
                                                <div className={`h-9 w-9 rounded-md ${isDark ? 'bg-slate-800/80' : 'bg-white'} border ${walletItemBorder} flex items-center justify-center mr-3 shrink-0`}>
                                                    {typeof wallet.logo === "string" ? (
                                                        <span className="text-lg">{wallet.logo}</span>
                                                    ) : (
                                                        wallet.logo
                                                    )}
                                                </div>
                                                <div className="text-left">
                                                    <div className="flex items-center">
                                                        <span className={`${textColor} text-sm font-medium`}>{wallet.name}</span>
                                                        {wallet.popular && (
                                                            <span className={`ml-2 text-xs ${isDark ? 'bg-indigo-900/40 text-indigo-300 border-indigo-800/30' : 'bg-indigo-100 text-indigo-700 border-indigo-200'} px-2 py-0.5 rounded-full border`}>
                                                                Popular
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-slate-400 text-xs">{wallet.description}</span>
                                                </div>
                                                <div className={`ml-auto flex items-center justify-center h-5 w-5 rounded-full ${isDark ? 'bg-indigo-900/30 text-indigo-400 group-hover:bg-indigo-900/50' : 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200'} transition-colors`}>
                                                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>

                                    <div className={`p-2.5 ${secureBoxBg} rounded-lg border ${secureBoxBorder}`}>
                                        <div className="flex items-center mb-1">
                                            <ShieldCheck className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                                            <h4 className="text-green-600 dark:text-green-400 text-xs font-medium">Secure Connection</h4>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            We never have access to your private keys or funds. All transactions
                                            require your explicit approval.
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {connectionStep === "connecting" && selectedWallet && (
                                <motion.div
                                    key="connecting"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col items-center py-5"
                                >
                                    <div className="mb-5 relative">
                                        <div className={`h-14 w-14 rounded-full ${isDark ? 'bg-slate-800/80' : 'bg-slate-100'} border ${walletItemBorder} flex items-center justify-center`}>
                                            {typeof selectedWallet.logo === "string" ? (
                                                <span className="text-2xl">{selectedWallet.logo}</span>
                                            ) : (
                                                React.cloneElement(selectedWallet.logo as React.ReactElement, {
                                                    className: "h-7 w-7"
                                                })
                                            )}
                                        </div>
                                        <div className={`absolute -right-1 -bottom-1 h-7 w-7 rounded-full ${isDark ? 'bg-slate-800' : 'bg-white'} border ${walletItemBorder} flex items-center justify-center`}>
                                            <Loader2 className="h-4 w-4 text-indigo-500 animate-spin" />
                                        </div>
                                    </div>

                                    <h3 className={`text-lg font-semibold ${textColor} mb-2`}>Connecting to {selectedWallet.name}</h3>
                                    <p className={`${subtextColor} text-xs text-center mb-5`}>
                                        Please confirm the connection request in your {selectedWallet.name} extension or app.
                                    </p>

                                    <div className="flex flex-col items-center justify-center space-y-2 w-full">
                                        <div className={`h-1.5 w-full max-w-xs ${isDark ? 'bg-slate-700/50' : 'bg-slate-200'} rounded-full overflow-hidden`}>
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-indigo-500 to-blue-500"
                                                initial={{ width: "5%" }}
                                                animate={{ width: "60%" }}
                                                transition={{ duration: 2 }}
                                            />
                                        </div>
                                        <span className="text-slate-400 text-xs">Connecting...</span>
                                    </div>
                                </motion.div>
                            )}

                            {connectionStep === "connected" && selectedWallet && (
                                <motion.div
                                    key="connected"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col items-center py-5"
                                >
                                    <motion.div
                                        className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700/30 flex items-center justify-center mb-5"
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20
                                        }}
                                    >
                                        <Check className="h-7 w-7 text-green-500 dark:text-green-400" />
                                    </motion.div>

                                    <h3 className={`text-lg font-semibold ${textColor} mb-2`}>Connected Successfully!</h3>
                                    <p className={`${subtextColor} text-xs text-center mb-5`}>
                                        Your wallet is now connected to the Yield Nexus.
                                    </p>

                                    <div className={`w-full max-w-xs ${isDark ? 'bg-slate-800/50' : 'bg-slate-100'} rounded-lg border ${borderColor} p-3 mb-3`}>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500 dark:text-slate-400 text-xs">Wallet</span>
                                            <span className={`${textColor} text-sm font-medium`}>{selectedWallet.name}</span>
                                        </div>
                                    </div>

                                    <motion.div
                                        className="w-full max-w-xs bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-700/30 p-3 flex items-center justify-center"
                                        animate={{
                                            boxShadow: ['0 0 0px rgba(74, 222, 128, 0)', '0 0 15px rgba(74, 222, 128, 0.2)', '0 0 0px rgba(74, 222, 128, 0)']
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity
                                        }}
                                    >
                                        <span className="text-green-600 dark:text-green-400 text-xs">Redirecting to dashboard...</span>
                                    </motion.div>
                                </motion.div>
                            )}

                            {connectionStep === "error" && (
                                <motion.div
                                    key="error"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col items-center py-5"
                                >
                                    <motion.div
                                        className="h-14 w-14 rounded-full bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700/30 flex items-center justify-center mb-5"
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20
                                        }}
                                    >
                                        <AlertTriangle className="h-7 w-7 text-red-500 dark:text-red-400" />
                                    </motion.div>

                                    <h3 className={`text-lg font-semibold ${textColor} mb-2`}>Connection Error</h3>
                                    <p className={`${subtextColor} text-xs text-center mb-5`}>
                                        {errorMessage}
                                    </p>

                                    <div className="space-y-3 w-full max-w-xs">
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-medium flex items-center justify-center"
                                            onClick={() => setConnectionStep("select")}
                                        >
                                            Try Another Wallet
                                        </motion.button>

                                        {selectedWallet && selectedWallet.id === "metamask" && (
                                            <motion.a
                                                href="https://metamask.io/download/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                className={`w-full py-2 rounded-lg border ${borderColor} ${textColor} text-sm flex items-center justify-center`}
                                            >
                                                Install MetaMask <ExternalLink className="ml-2 h-3.5 w-3.5" />
                                            </motion.a>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Modal Footer */}
                    {connectionStep === "select" && (
                        <div className={`p-3 border-t ${borderColor} ${footerBg} text-center`}>
                            <p className="text-xs text-slate-500">
                                By connecting a wallet, you agree to the Yield Nexus Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );

    // Use createPortal to render at document.body level
    return createPortal(modalContent, document.body);
};

export default WalletConnectModal;
