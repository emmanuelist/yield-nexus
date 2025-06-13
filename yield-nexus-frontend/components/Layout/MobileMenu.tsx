"use client";

import React from "react";
import Link from "next/link";
import { Menu, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import YieldNexusLogo from "../shared/YieldNexusLogo";
import ThemeToggle from "../shared/ThemeToggle";
import ConnectWalletButton from "../shared/wallet/ConnectWalletButton";

interface NavLink {
    name: string;
    href: string;
    icon?: React.ReactNode;
    subItems?: Array<{ title: string; href: string; icon?: React.ReactNode; description?: string }>;
}

interface MobileMenuProps {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    activeLink: string | null;
    navLinks: NavLink[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
    mobileMenuOpen,
    setMobileMenuOpen,
    activeLink,
    navLinks
}) => {
    return (
        <div className="md:hidden">
            {/* Mobile Menu Trigger */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 bg-white/80 dark:bg-slate-800/80 rounded-xl backdrop-blur-sm"
            >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
            </Button>

            {/* Custom Mobile Sheet */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-[59] bg-black/50"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                            }}
                            className="fixed right-0 top-0 h-full w-4/5 max-w-sm z-[60] overflow-hidden"
                        >
                            {/* Background matching desktop navbar */}
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/95 to-slate-50/95 dark:from-[#060f38]/95 dark:to-[#0A0E1F]/95"></div>
                                <div className="absolute inset-0 bg-grid-slate-200/30 dark:bg-grid-slate-700/[0.03] bg-[size:20px_20px] opacity-40 dark:opacity-30"></div>

                                {/* Subtle gradient blobs */}
                                <div className="absolute right-1/4 top-1/4 w-48 h-48 rounded-full bg-orange-300/20 dark:bg-[#F7931A]/5 blur-3xl"></div>
                                <div className="absolute left-1/4 bottom-1/4 w-40 h-40 rounded-full bg-blue-300/20 dark:bg-indigo-600/5 blur-3xl"></div>
                            </div>

                            {/* Content */}
                            <motion.div
                                className="relative flex flex-col h-full backdrop-blur-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                            >
                                {/* Mobile menu header */}
                                <div className="flex items-center justify-between p-6 border-b border-slate-200/60 dark:border-slate-700/60">
                                    <YieldNexusLogo />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60"
                                    >
                                        <X className="h-5 w-5" />
                                        <span className="sr-only">Close menu</span>
                                    </Button>
                                </div>

                                {/* Mobile menu links */}
                                <div className="px-6 py-6 flex-1 overflow-auto">
                                    <nav className="flex flex-col space-y-4">
                                        {navLinks.map((link, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 + 0.2 }}
                                            >
                                                {link.subItems ? (
                                                    <div className="space-y-3">
                                                        <div className="font-semibold text-lg text-slate-800 dark:text-slate-200 flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200/60 dark:border-slate-600/60">
                                                            {link.icon}
                                                            {link.name}
                                                        </div>
                                                        <div className="pl-6 flex flex-col space-y-2 border-l-2 border-gradient-to-b from-orange-400 via-amber-400 to-yellow-400">
                                                            {link.subItems.map((subItem, j) => (
                                                                <Link
                                                                    key={j}
                                                                    href={subItem.href}
                                                                    className={cn(
                                                                        "group flex items-start px-4 py-3 rounded-xl transition-all duration-200 border",
                                                                        activeLink === subItem.href
                                                                            ? "text-orange-600 dark:text-orange-400 font-semibold bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 border-orange-200 dark:border-orange-800/50"
                                                                            : "text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 dark:hover:from-slate-800 dark:hover:to-slate-700 border-transparent hover:border-slate-200 dark:hover:border-slate-600"
                                                                    )}
                                                                    onClick={() => setMobileMenuOpen(false)}
                                                                >
                                                                    <div className="flex items-center mr-3 mt-0.5">
                                                                        {subItem.icon}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex items-center justify-between">
                                                                            <span className="text-sm font-medium">{subItem.title}</span>
                                                                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                                        </div>
                                                                        {subItem.description && (
                                                                            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 leading-relaxed">
                                                                                {subItem.description}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href={link.href}
                                                        className={cn(
                                                            "font-semibold text-lg flex items-center justify-between group px-4 py-3 rounded-xl transition-all duration-200 border",
                                                            activeLink === link.href
                                                                ? "text-orange-600 dark:text-orange-400 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 border-orange-200 dark:border-orange-800/50"
                                                                : "text-slate-800 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 dark:hover:from-slate-800 dark:hover:to-slate-700 border-transparent hover:border-slate-200 dark:hover:border-slate-600"
                                                        )}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        <span className="flex items-center">
                                                            {link.icon}
                                                            {link.name}
                                                        </span>
                                                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                    </Link>
                                                )}
                                            </motion.div>
                                        ))}
                                    </nav>
                                </div>

                                {/* Mobile WalletConnect */}
                                <div className="px-6 py-4 border-t border-slate-200/60 dark:border-slate-700/60">
                                    <ConnectWalletButton
                                        className="w-full"
                                        buttonClass="w-full px-4 py-1 text-sm"
                                    />
                                </div>

                                {/* Mobile menu footer */}
                                <div className="p-6 border-t border-slate-200/60 dark:border-slate-700/60 mt-auto">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-slate-700 dark:text-slate-300">Theme</span>
                                        <ThemeToggle />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileMenu;