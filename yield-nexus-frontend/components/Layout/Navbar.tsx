"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ChevronDown, ArrowRight, LineChart, Trophy, BarChart3, Layers, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";
import YieldNexusLogo from "../shared/YieldNexusLogo";
import ThemeToggle from "../shared/ThemeToggle";
import ConnectWalletButton from "../shared/wallet/ConnectWalletButton";

interface NavLink {
    name: string;
    href: string;
    icon?: React.ReactNode;
    subItems?: Array<{ title: string; href: string; icon?: React.ReactNode; description?: string }>;
}

interface NavbarProps {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    activeLink: string | null;
    setActiveLink: (link: string | null) => void;
    navLinks: NavLink[];
}

const Navbar: React.FC<NavbarProps> = ({
    mobileMenuOpen,
    setMobileMenuOpen,
    activeLink,
    setActiveLink,
    navLinks
}) => {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
    const [time, setTime] = useState(0);

    const { userState, connectWallet, disconnectWallet } = useUser();

    // Time-based animation for gradient blobs
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(Date.now() * 0.001);
        }, 16);

        return () => clearInterval(interval);
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = (): void => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        // Set active link based on scroll position
        const updateActiveLink = () => {
            const sections = document.querySelectorAll('section[id]');
            let found = false;

            sections.forEach((section) => {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionId = section.getAttribute('id');

                if (sectionTop < 100 && sectionTop > -100 && !found && sectionId) {
                    setActiveLink(`#${sectionId}`);
                    found = true;
                }
            });

            if (!found && window.scrollY <= 10) {
                setActiveLink(null);
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener('scroll', updateActiveLink);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener('scroll', updateActiveLink);
        };
    }, [scrolled, setActiveLink]);

    // Close mobile menu when screen size changes to desktop
    useEffect(() => {
        const handleResize = (): void => {
            if (window.innerWidth >= 768 && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [mobileMenuOpen, setMobileMenuOpen]);

    // Animation variants
    const navVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as any }
        }
    };

    const linkVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1] as any
            }
        })
    };

    const dropdownVariants = {
        hidden: { opacity: 0, y: -5, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as any,
                stiffness: 400,
                damping: 25
            }
        },
        exit: {
            opacity: 0,
            y: -5,
            scale: 0.95,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <motion.header
            initial="hidden"
            animate="visible"
            variants={navVariants}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 overflow-hidden",
                scrolled
                    ? "backdrop-blur-xl border-b border-white/20 dark:border-slate-700/50 shadow-lg shadow-black/5 dark:shadow-slate-900/20"
                    : "backdrop-blur-sm"
            )}
        >
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-white/95 to-slate-50/95 dark:from-[#060f38]/95 dark:to-[#0A0E1F]/95"></div>

                <div className="absolute inset-0 bg-grid-slate-200/30 dark:bg-grid-slate-700/[0.03] bg-[size:20px_20px] opacity-40 dark:opacity-30"></div>

                <div
                    className="absolute left-1/4 top-0 w-96 h-96 rounded-full bg-orange-300/20 dark:bg-[#F7931A]/5 blur-3xl"
                    style={{
                        transform: `translate(${Math.sin(time * 0.3) * 15}px, ${Math.cos(time * 0.3) * 15}px)`
                    }}
                ></div>

                <div
                    className="absolute right-1/4 bottom-0 w-80 h-80 rounded-full bg-blue-300/20 dark:bg-indigo-600/5 blur-3xl"
                    style={{
                        transform: `translate(${Math.cos(time * 0.4) * 20}px, ${Math.sin(time * 0.4) * 20}px)`
                    }}
                ></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex items-center justify-between h-16 md:h-18">
                    {/* Logo */}
                    <YieldNexusLogo extra_text />

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link, i) => (
                            link.subItems ? (
                                <div key={i} className="relative">
                                    <DropdownMenu
                                        open={dropdownOpen === i}
                                        onOpenChange={(open) => setDropdownOpen(open ? i : null)}
                                    >
                                        <motion.div custom={i} variants={linkVariants}>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className={cn(
                                                        "inline-flex items-center font-medium h-11 px-4 text-sm transition-all duration-200 relative group",
                                                        activeLink?.startsWith(link.href) || dropdownOpen === i
                                                            ? "text-orange-600 dark:text-orange-400 bg-transparent"
                                                            : "text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 bg-transparent hover:bg-transparent"
                                                    )}
                                                >
                                                    {link.icon}
                                                    {link.name}
                                                    <motion.div
                                                        animate={{ rotate: dropdownOpen === i ? 180 : 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <ChevronDown className="ml-1 w-4 h-4" />
                                                    </motion.div>

                                                    {/* Bottom border on hover and active */}
                                                    <div className={cn(
                                                        "absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-200",
                                                        activeLink?.startsWith(link.href) || dropdownOpen === i
                                                            ? "opacity-100 scale-x-100"
                                                            : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                                                    )} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                        </motion.div>
                                        <AnimatePresence>
                                            {dropdownOpen === i && (
                                                <DropdownMenuContent
                                                    align="center"
                                                    className="w-80 p-4 mt-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/98 dark:bg-slate-800/98 backdrop-blur-2xl shadow-2xl shadow-slate-900/10 dark:shadow-slate-900/40"
                                                    forceMount
                                                    asChild
                                                >
                                                    <motion.div
                                                        variants={dropdownVariants}
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit="exit"
                                                    >
                                                        <div className="grid gap-2">
                                                            {link.subItems.map((subItem, j) => (
                                                                <DropdownMenuItem key={j} asChild className="px-0 py-0 focus:bg-transparent">
                                                                    <Link
                                                                        href={subItem.href}
                                                                        className={cn(
                                                                            "flex items-start px-4 py-3 rounded-xl cursor-pointer w-full transition-all duration-200 group border",
                                                                            activeLink === subItem.href
                                                                                ? "bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/50 shadow-sm"
                                                                                : "hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 dark:hover:from-slate-700/50 dark:hover:to-slate-600/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border-transparent hover:border-slate-200 dark:hover:border-slate-600"
                                                                        )}
                                                                        onClick={() => setDropdownOpen(null)}
                                                                    >
                                                                        <div className="flex items-center mr-3 mt-0.5">
                                                                            {subItem.icon}
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <div className="flex items-center justify-between">
                                                                                <span className="font-semibold text-sm">{subItem.title}</span>
                                                                                <ArrowRight className={cn(
                                                                                    "w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200",
                                                                                    activeLink === subItem.href && "opacity-100 translate-x-0"
                                                                                )} />
                                                                            </div>
                                                                            {subItem.description && (
                                                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                                                                    {subItem.description}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                </DropdownMenuContent>
                                            )}
                                        </AnimatePresence>
                                    </DropdownMenu>
                                </div>
                            ) : (
                                <motion.div
                                    key={i}
                                    custom={i}
                                    variants={linkVariants}
                                    className="relative"
                                >
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "inline-flex items-center px-4 py-3 font-medium text-sm relative transition-all duration-200 group h-11",
                                            activeLink === link.href
                                                ? "text-orange-600 dark:text-orange-400"
                                                : "text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400"
                                        )}
                                    >
                                        {link.icon}
                                        {link.name}

                                        {/* Bottom border on hover and active */}
                                        <div className={cn(
                                            "absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-200",
                                            activeLink === link.href
                                                ? "opacity-100 scale-x-100"
                                                : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                                        )} />
                                    </Link>
                                </motion.div>
                            )
                        ))}
                    </nav>

                    {/* Right Side - Actions */}
                    <div className="flex items-center space-x-3">
                        <ThemeToggle />

                        {/* Connect Wallet Button - Desktop */}
                        <div className="hidden md:block">
                            <ConnectWalletButton
                                className="ml-2"
                                buttonClass="px-6 py-1 text-sm"
                            />
                        </div>

                        {/* Mobile Menu Trigger Only */}
                        <div className="md:hidden">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 bg-white/80 dark:bg-slate-800/80 rounded-xl backdrop-blur-sm"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Navbar;
