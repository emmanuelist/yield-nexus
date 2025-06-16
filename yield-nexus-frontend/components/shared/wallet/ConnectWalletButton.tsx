

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Check, ChevronDown, Bitcoin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import WalletConnectModal from "./WalletModal";

interface ConnectWalletButtonProps {
    buttonClass?: string;
    textStyle?: string;
    iconClass?: string;
    className?: string;
    onOpenModal?: () => void;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
    buttonClass,
    textStyle = "mr-3 text-sm",
    iconClass,
    className,
    onOpenModal
}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [address, setAddress] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [hasSBTC, setHasSBTC] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Amount of sBTC for demo purposes
    const sbtcAmount = "0.25678";

    // Format address to show only the first and last 4 characters
    const formatAddress = (addr: string) => {
        if (!addr || addr.length <= 10) return addr;
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    };

    // Handle wallet connection
    const handleWalletConnected = (walletAddress: string, hasSBTC: boolean) => {
        setAddress(walletAddress);
        setIsConnected(true);
        setHasSBTC(hasSBTC);
        setShowModal(false);
    };

    // Handle disconnect
    const handleDisconnect = () => {
        setAddress(null);
        setIsConnected(false);
        setHasSBTC(false);
        setShowDropdown(false);
    };

    // Handle click outside to close the dropdown
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

    // Handle opening the modal
    const handleOpenModal = () => {
        setShowModal(true);
        if (onOpenModal) onOpenModal();
    };

    // Button style based on theme
    const buttonStyle = "from-[#0c1e5c]/95 to-[#192559]/95 hover:from-[#192559]/95 hover:to-[#0c1e5c]/95 text-white"
    // : "from-blue-50 to-indigo-100 hover:from-blue-100 hover:to-indigo-200 text-indigo-700";

    // Icon style based on theme
    const iconStyle = isDark
        ? "bg-[#3b4795] text-[#F7931A]"
        : "bg-indigo-200 text-[#F7931A]";

    // Accent color based on theme
    const accentColor = isDark ? "text-[#F7931A]" : "text-[#F7931A]";

    return (
        <>
            <div className={cn("relative inline-flex", className)} ref={dropdownRef}>
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex"
                >
                    {isConnected ? (
                        <div className="flex">
                            {/* Balance pill - only on larger screens */}
                            {hasSBTC && (
                                <div className={cn(
                                    "hidden sm:flex mr-2 items-center rounded-full px-2.5 py-1 border",
                                    isDark
                                        ? "bg-gradient-to-r from-[#0c1e5c]/80 to-[#192559]/80 text-indigo-300 border-[#F7931A]/20"
                                        : "bg-blue-50 text-indigo-700 border-[#F7931A]/20"
                                )}>
                                    <Bitcoin className={cn("h-3.5 w-3.5 mr-1", "text-[#F7931A]")} />
                                    <span className="font-medium text-xs">{sbtcAmount} sBTC</span>
                                </div>
                            )}

                            {/* Connected wallet button */}
                            <div className="relative group overflow-hidden">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className={cn(
                                        `relative flex items-center justify-between bg-gradient-to-r ${buttonStyle} rounded-full pl-4 pr-3 py-2 font-medium tracking-wide border border-[#F7931A]/20 ${buttonClass}`
                                    )}
                                >
                                    <Check className={cn("mr-1.5 h-3.5 w-3.5", "text-[#F7931A]")} />
                                    <span className="text-sm">{formatAddress(address || "")}</span>
                                    <ChevronDown className={cn("ml-1.5 h-3 w-3 transition-transform duration-200", accentColor, showDropdown ? "rotate-180" : "")} />

                                    {/* Subtle gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-[#F7931A]/10 opacity-40 rounded-full pointer-events-none"></div>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="relative group overflow-hidden">
                            <button
                                onClick={handleOpenModal}
                                className={cn(
                                    `relative flex items-center justify-between bg-gradient-to-r ${buttonStyle} rounded-full pl-5 pr-3 py-2 font-medium tracking-wide border border-[#F7931A]/20 ${buttonClass}`
                                )}
                            >
                                <span className={`${textStyle} `}>Connect Wallet</span>

                                {/* Circle with wallet icon */}
                                <div className={cn(`flex items-center justify-center rounded-full ${iconClass} h-7 w-7 border border-[#F7931A]/30`, iconStyle)}>
                                    <motion.div
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 1 }}
                                        className="group-hover:translate-x-0.5 transition-transform duration-300"
                                    >
                                        <Wallet className="h-3.5 w-3.5" />
                                    </motion.div>
                                </div>

                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-[#F7931A]/10 opacity-40 rounded-full pointer-events-none"></div>
                            </button>
                        </div>
                    )}
                </motion.div>

                {/* Dropdown menu when wallet is connected */}
                <AnimatePresence>
                    {showDropdown && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className={cn(
                                "absolute right-0 top-12 w-60 rounded-xl shadow-xl border z-50 p-2 overflow-hidden",
                                isDark
                                    ? "bg-[#0F1729] border-slate-700/30"
                                    : "bg-white border-slate-200"
                            )}
                        >
                            {/* Mobile-only balance display */}
                            {hasSBTC && (
                                <div className={cn(
                                    "flex sm:hidden items-center p-2.5 mb-1 rounded-lg border",
                                    isDark
                                        ? "bg-gradient-to-r from-[#0c1e5c]/80 to-[#192559]/80 text-indigo-300 border-[#F7931A]/20"
                                        : "bg-blue-50 text-indigo-700 border-[#F7931A]/20"
                                )}>
                                    <Bitcoin className={cn("h-4 w-4 mr-2", "text-[#F7931A]")} />
                                    <div>
                                        <div className="font-semibold text-sm">{sbtcAmount} sBTC</div>
                                        <div className={cn("text-xs", isDark ? "text-[#F7931A]/90" : "text-[#F7931A]/80")}>Available Balance</div>
                                    </div>
                                </div>
                            )}

                            {/* Dropdown options */}
                            <div className="space-y-0.5">
                                <button
                                    className={cn(
                                        "w-full flex items-center justify-between p-2 text-left text-sm rounded-lg transition-colors",
                                        isDark
                                            ? "hover:bg-slate-800/50 text-slate-200"
                                            : "hover:bg-slate-100 text-slate-700"
                                    )}
                                    onClick={() => {
                                        setShowDropdown(false);
                                        // Add navigation logic here
                                    }}
                                >
                                    <span className="flex items-center">
                                        <Bitcoin className={cn("mr-2 h-3.5 w-3.5", "text-[#F7931A]")} />
                                        Vault Dashboard
                                    </span>
                                </button>

                                <button
                                    className={cn(
                                        "w-full flex items-center justify-between p-2 text-left text-sm rounded-lg transition-colors",
                                        isDark
                                            ? "hover:bg-slate-800/50 text-slate-200"
                                            : "hover:bg-slate-100 text-slate-700"
                                    )}
                                    onClick={() => {
                                        // Add copy address logic here
                                        navigator.clipboard.writeText(address || "");
                                        setShowDropdown(false);
                                    }}
                                >
                                    <span className="flex items-center">
                                        <svg className={cn("mr-2 h-3.5 w-3.5", "text-[#F7931A]")} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                        </svg>
                                        Copy Address
                                    </span>
                                </button>

                                <button
                                    className={cn(
                                        "w-full flex items-center p-2 text-left text-sm text-red-400 rounded-lg transition-colors",
                                        isDark ? "hover:bg-red-900/20" : "hover:bg-red-50"
                                    )}
                                    onClick={handleDisconnect}
                                >
                                    <svg className="mr-2 h-3.5 w-3.5" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                    </svg>
                                    Disconnect
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <WalletConnectModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onWalletConnected={handleWalletConnected}
            />
        </>
    );
};

export default ConnectWalletButton;