"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    User,
    Settings,
    HelpCircle,
    LogOut,
    CreditCard,
    History,
    Shield,
    ExternalLink,
    ChevronRight,
    Bitcoin
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// This is a placeholder component. In a real implementation, you would connect 
// this to your wallet and user state management system.

const UserProfileDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    // Placeholder user data - in a real implementation, this would come from your auth/wallet state
    const user = {
        name: "Alex Johnson",
        email: "alex@example.com",
        walletAddress: "0x71A2...9e3f",
        avatarUrl: "",
        isPremium: true,
        joinDate: new Date("2023-07-15"),
        sbtcBalance: "0.25678"
    };

    // Helper to truncate ETH addresses
    const truncateAddress = (address: string): string => {
        if (!address || address.length <= 10) return address;
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const copyAddressToClipboard = () => {
        navigator.clipboard.writeText(user.walletAddress);
        setCopied(true);

        // Reset the copied state after 2 seconds
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full border border-slate-200 dark:border-slate-700"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback className="bg-[#F7931A]/20 text-[#F7931A] dark:bg-[#F7931A]/30 dark:text-[#F7931A]">
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    {user.isPremium && (
                        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-[#F7931A] to-amber-600 border-2 border-white dark:border-[#040d36]"></span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-72 p-0 shadow-lg"
                forceMount
            >
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="dark:bg-slate-900/90 bg-white border-slate-200 dark:border-slate-800"
                >
                    {/* User info header */}
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={user.avatarUrl} alt={user.name} />
                                <AvatarFallback className="text-lg bg-[#F7931A]/20 text-[#F7931A] dark:bg-[#F7931A]/30 dark:text-[#F7931A]">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center">
                                    <p className="font-medium text-slate-900 dark:text-slate-100 truncate mr-2">
                                        {user.name}
                                    </p>
                                    {user.isPremium && (
                                        <Badge className="h-5 px-1.5 bg-gradient-to-r from-[#F7931A] to-amber-600 text-white">
                                            Pro
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        {/* sBTC balance */}
                        <div className="mt-3 px-3 py-2 rounded-md bg-[#F7931A]/10 dark:bg-[#F7931A]/20 border border-[#F7931A]/20 flex items-center justify-between">
                            <div className="flex items-center">
                                <Bitcoin className="h-4 w-4 mr-2 text-[#F7931A]" />
                                <span className="text-sm font-medium text-[#F7931A]">{user.sbtcBalance} sBTC</span>
                            </div>
                            <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50 text-[#F7931A] border-[#F7931A]/20 text-xs">
                                Earning 8.2% APY
                            </Badge>
                        </div>

                        {/* Wallet address */}
                        <div
                            className={cn(
                                "mt-3 flex items-center rounded-md px-3 py-1.5 cursor-pointer transition-colors",
                                copied
                                    ? "bg-green-100 dark:bg-green-900/30"
                                    : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/70"
                            )}
                            onClick={copyAddressToClipboard}
                        >
                            <p className="text-xs font-mono tracking-tight text-slate-700 dark:text-slate-300">
                                {truncateAddress(user.walletAddress)}
                            </p>
                            <Badge
                                variant="outline"
                                className={cn(
                                    "ml-auto text-[10px] h-4 px-1 transition-all",
                                    copied
                                        ? "border-green-300 dark:border-green-700 text-green-600 dark:text-green-400"
                                        : "border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400"
                                )}
                            >
                                {copied ? "Copied!" : "Click to copy"}
                            </Badge>
                        </div>
                    </div>

                    {/* Menu items */}
                    <DropdownMenuGroup className="p-2">
                        <DropdownMenuItem asChild className="h-9 cursor-pointer">
                            <Link href="/dashboard/profile" className="flex items-center">
                                <User className="mr-2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                                <span>Profile</span>
                                <ChevronRight className="ml-auto h-4 w-4 text-slate-500 dark:text-slate-400" />
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="h-9 cursor-pointer">
                            <Link href="/dashboard/security" className="flex items-center">
                                <Shield className="mr-2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                                <span>Security</span>
                                <ChevronRight className="ml-auto h-4 w-4 text-slate-500 dark:text-slate-400" />
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="h-9 cursor-pointer">
                            <Link href="/dashboard/history" className="flex items-center">
                                <History className="mr-2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                                <span>Transaction History</span>
                                <ChevronRight className="ml-auto h-4 w-4 text-slate-500 dark:text-slate-400" />
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="h-9 cursor-pointer">
                            <Link href="/dashboard/billing" className="flex items-center">
                                <CreditCard className="mr-2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                                <span>Billing & Plans</span>
                                <Badge className="ml-auto text-xs bg-[#F7931A]/20 text-[#F7931A] border border-[#F7931A]/20">
                                    Pro
                                </Badge>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup className="p-2">
                        <DropdownMenuItem asChild className="h-9 cursor-pointer">
                            <Link href="/dashboard/settings" className="flex items-center">
                                <Settings className="mr-2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                                <span>Settings</span>
                                <ChevronRight className="ml-auto h-4 w-4 text-slate-500 dark:text-slate-400" />
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="h-9 cursor-pointer">
                            <Link href="/dashboard/help" className="flex items-center">
                                <HelpCircle className="mr-2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                                <span>Help & Support</span>
                                <ChevronRight className="ml-auto h-4 w-4 text-slate-500 dark:text-slate-400" />
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="h-9 cursor-pointer">
                            <a
                                href="/docs"
                                className="flex items-center"
                            >
                                <ExternalLink className="mr-2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                                <span>Documentation</span>
                                <ExternalLink className="ml-auto h-3 w-3 text-slate-500 dark:text-slate-400" />
                            </a>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    {/* Logout */}
                    <div className="p-2">
                        <Button
                            variant="ghost"
                            className="w-full justify-start h-9 px-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-700 dark:hover:text-red-300"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log Out</span>
                        </Button>
                    </div>
                </motion.div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserProfileDropdown;