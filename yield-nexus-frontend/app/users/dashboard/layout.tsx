"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    ChevronRight,
    ChevronLeft,
    Bitcoin,
    Sun,
    Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import NotificationsDropdown from "@/components/Dashboard/Notifications/NotificationsDropdown";
import UserProfileDropdown from "@/components/Dashboard/Profile/UserProfileDropdown";
import YieldNexusSidebar from "@/components/Dashboard/Layout/YieldNexusSidebar";
import ThemeToggle from "@/components/shared/ThemeToggle";



interface DashboardLayoutProps {
    children: React.ReactNode;
}

const YieldVaultDashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [navScrolled, setNavScrolled] = useState(false);
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    // Handle window resize to detect mobile view
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (mobile) setSidebarOpen(false);
            else setSidebarOpen(true);
        };

        // Initial check
        handleResize();

        // Listen for window resize
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Handle scroll for navbar shadow
    useEffect(() => {
        const handleScroll = () => {
            setNavScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Layout animations
    const sidebarVariants = {
        open: {
            width: isMobile ? "280px" : "280px",
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as any }
        },
        closed: {
            width: isMobile ? "0" : "80px",
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as any }
        }
    };

    const contentVariants = {
        open: {
            marginLeft: isMobile ? "0" : "280px",
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as any  }
        },
        closed: {
            marginLeft: isMobile ? "0" : "80px",
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as any}
        }
    };

    const navbarVariants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        },
        hidden: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.3 }
        }
    };

    // Generate a dynamic background based on theme
    const gradientBackground = theme === 'dark'
        ? "bg-gradient-to-br from-[#050e2d]/60 to-[#071236]/70"
        : "bg-gradient-to-br from-slate-50 to-slate-100";



    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar backdrop for mobile */}
            <AnimatePresence>
                {isMobile && sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.div
                variants={sidebarVariants}
                initial={false}
                animate={sidebarOpen ? "open" : "closed"}
                className={cn(
                    "fixed top-0 left-0 h-full z-50 overflow-hidden",
                    isMobile ? (sidebarOpen ? "w-[280px]" : "w-0") : "w-auto"
                )}
            >
                <YieldNexusSidebar
                    isCollapsed={!sidebarOpen}
                    isMobile={isMobile}
                    onToggle={() => setSidebarOpen(!sidebarOpen)}
                />
            </motion.div>

            {/* Main Content */}
            <motion.div
                variants={contentVariants}
                initial={false}
                animate={sidebarOpen ? "open" : "closed"}
                className={cn(
                    "flex-1 flex flex-col h-screen w-full",
                    isMobile ? "ml-0" : (sidebarOpen ? "ml-[280px]" : "ml-[80px]"),
                    gradientBackground
                )}
            >
                {/* Top Navigation */}
                <motion.header
                    initial="visible"
                    animate="visible"
                    variants={navbarVariants}
                    className={cn(
                        `sticky top-0 z-30 w-full transition-all duration-300 h-16
                        bg-gradient-to-br dark:from-slate-900 dark:to-[#0A0E1F] from-slate-50 to-slate-100 border-y dark:border-slate-800/50 border-slate-200/70`,

                    )}
                >
                    <div className="h-full px-4 flex items-center justify-between">
                        {/* Left Side */}
                        <div className="flex items-center gap-2">
                            {/* Mobile menu toggle */}
                            {isMobile && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="flex lg:hidden text-slate-600 dark:text-slate-300"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            )}

                            {/* Desktop sidebar toggle */}
                            {!isMobile && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                                className="hidden lg:flex text-slate-600 dark:text-slate-300"
                                            >
                                                {sidebarOpen ? (
                                                    <ChevronLeft className="h-5 w-5" />
                                                ) : (
                                                    <ChevronRight className="h-5 w-5" />
                                                )}
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}

                            {/* sBTC Stats */}
                            <div className="hidden md:flex items-center ml-2">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2 text-[#F7931A]">
                                        <Bitcoin className="h-4 w-4" />
                                        <span className="text-xs font-medium">sBTC: $35,240.61</span>
                                    </div>
                                    <div className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium">
                                        +5.23%
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side - actions */}
                        <div className="flex items-center gap-3">
                            {/* Theme toggle */}
                            <ThemeToggle />

                            {/* Notifications */}
                            <NotificationsDropdown />

                            {/* User Profile */}
                            <UserProfileDropdown />
                        </div>
                    </div>
                </motion.header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto">
                    <div className="container mx-auto py-6 px-4 md:px-6">
                        {children}
                    </div>
                </div>

                {/* Subtle gradient at bottom */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#F7931A]/30 to-transparent opacity-40"></div>
            </motion.div>
        </div>
    );
};

export default YieldVaultDashboardLayout;