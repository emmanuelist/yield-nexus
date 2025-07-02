"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    LineChart,
    Wallet,
    BarChart3,
    History,
    Settings,
    HelpCircle,
    LogOut,
    Plus,
    ChevronDown,
    Bitcoin,
    TrendingUp,
    ShieldCheck,
    ArrowRight,
    Zap,
    BookOpen,
    PieChart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import YieldNexusLogo from "@/components/shared/YieldNexusLogo";

interface NavItem {
    name: string;
    href: string;
    icon: React.ReactNode;
    onClick?: () => void;
    badge?: {
        text: string;
        variant: "default" | "destructive" | "secondary" | "outline";
    };
    subItems?: {
        name: string;
        href: string;
        icon?: React.ReactNode;
    }[];
    isNew?: boolean;
}

interface YieldNexusSidebarProps {
    isCollapsed: boolean;
    isMobile: boolean;
    onToggle: () => void;
}

const YieldNexusSidebar: React.FC<YieldNexusSidebarProps> = ({
    isCollapsed,
    isMobile,
    onToggle,
}) => {
    const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
    const pathname = usePathname();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Navigation groups
    const mainNavItems: NavItem[] = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: <Home className="h-5 w-5" />,
        },
        {
            name: "Portfolio",
            href: "#",
            icon: <PieChart className="h-5 w-5" />,
            subItems: [
                {
                    name: "Overview",
                    href: "/dashboard/portfolio/overview",
                    icon: <BarChart3 className="h-4 w-4" />,
                },
                {
                    name: "Performance",
                    href: "/dashboard/portfolio/performance",
                    icon: <LineChart className="h-4 w-4" />,
                },
                {
                    name: "Rewards",
                    href: "/dashboard/portfolio/rewards",
                    icon: <Bitcoin className="h-4 w-4" />,
                }
            ],
        },
        {
            name: "Deposit",
            href: "/dashboard/deposit",
            icon: <Plus className="h-5 w-5" />,
            isNew: true,
        },
    ];

    const yieldStrategiesItems: NavItem[] = [
        {
            name: "Active Strategies",
            href: "/dashboard/strategies/active",
            icon: <TrendingUp className="h-5 w-5" />,
            badge: {
                text: "3",
                variant: "secondary",
            },
        },
        {
            name: "Automated Yield",
            href: "/dashboard/strategies/automated",
            icon: <Zap className="h-5 w-5" />,
        },
        {
            name: "Strategy Builder",
            href: "/dashboard/strategies/builder",
            icon: <PieChart className="h-5 w-5" />,
            isNew: true,
        }
    ];

    const miscNavItems: NavItem[] = [
        {
            name: "Transaction History",
            href: "/dashboard/history",
            icon: <History className="h-5 w-5" />,
        },
        {
            name: "Wallet",
            href: "/dashboard/wallet",
            icon: <Wallet className="h-5 w-5" />,
        },
        {
            name: "Security",
            href: "/dashboard/security",
            icon: <ShieldCheck className="h-5 w-5" />,
        },
        {
            name: "Settings",
            href: "/dashboard/settings",
            icon: <Settings className="h-5 w-5" />,
        },
        {
            name: "Documentation",
            href: "/dashboard/docs",
            icon: <BookOpen className="h-5 w-5" />,
        },
        {
            name: "Help",
            href: "/dashboard/help",
            icon: <HelpCircle className="h-5 w-5" />,
        },
    ];

    // Function to toggle subgroup expansion
    const toggleGroup = (groupName: string) => {
        setExpandedGroup(expandedGroup === groupName ? null : groupName);
    };

    // Check if a nav item is active
    const isActiveLink = (href: string) => {
        if (href === "/dashboard" && pathname === "/dashboard") {
            return true;
        }
        return pathname.startsWith(href) && href !== "/dashboard";
    };

    // Render a navigation item
    const renderNavItem = (item: NavItem, index: number, groupName: string) => {
        const active = isActiveLink(item.href);
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isExpanded = expandedGroup === groupName + "-" + item.name;

        return (
            <div key={item.name + index} className="w-full">
                {hasSubItems ? (
                    <div className="w-full">
                        <Button
                            variant="ghost"
                            className={cn(
                                "relative w-full justify-start gap-x-3 rounded-lg p-2",
                                active
                                    ? "bg-gradient-to-r from-[#F7931A]/20 to-amber-600/10 text-[#F7931A] border border-[#F7931A]/20"
                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60",
                                isCollapsed && "justify-center px-0",
                                hasSubItems && isExpanded && "bg-slate-100 dark:bg-slate-800/50"
                            )}
                            onClick={() => toggleGroup(groupName + "-" + item.name)}
                        >
                            <span className="flex min-w-0 items-center justify-center">
                                {item.icon}
                            </span>
                            {!isCollapsed && (
                                <>
                                    <span className="text-sm font-medium">{item.name}</span>
                                    {item.badge && (
                                        <Badge
                                            variant={item.badge.variant}
                                            className="ml-auto text-xs bg-[#F7931A]/20 text-[#F7931A] border border-[#F7931A]/20 hover:bg-[#F7931A]/30"
                                        >
                                            {item.badge.text}
                                        </Badge>
                                    )}
                                    {item.isNew && (
                                        <Badge
                                            variant="secondary"
                                            className="ml-auto text-xs px-1 py-0 h-5 bg-[#F7931A]/20 text-[#F7931A] border border-[#F7931A]/20"
                                        >
                                            New
                                        </Badge>
                                    )}
                                    <ChevronDown
                                        className={cn(
                                            "h-4 w-4 ml-auto transition-transform",
                                            isExpanded ? "transform rotate-180" : ""
                                        )}
                                    />
                                </>
                            )}
                        </Button>
                        {hasSubItems && !isCollapsed && (
                            <AnimatePresence initial={false}>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pl-10 pr-2 py-1 space-y-1">
                                            {item.subItems?.map((subItem, i) => {
                                                const subActive = pathname === subItem.href;
                                                return (
                                                    <Link
                                                        key={i}
                                                        href={subItem.href}
                                                        className={cn(
                                                            "flex items-center gap-x-2 rounded-md px-3 py-2 text-sm",
                                                            subActive
                                                                ? "bg-gradient-to-r from-[#F7931A]/10 to-amber-600/5 text-[#F7931A]"
                                                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                                                        )}
                                                    >
                                                        {subItem.icon && <span>{subItem.icon}</span>}
                                                        <span className="truncate">{subItem.name}</span>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </div>
                ) : (
                    <TooltipProvider delayDuration={isCollapsed ? 100 : 0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={item.href}
                                    onClick={(e) => {
                                        if (item.onClick) {
                                            e.preventDefault();
                                            item.onClick();
                                        }
                                    }}
                                    className={cn(
                                        "flex h-10 w-full items-center gap-x-3 rounded-lg px-3 text-sm font-medium",
                                        active
                                            ? "bg-gradient-to-r from-[#F7931A]/20 to-amber-600/10 text-[#F7931A] border border-[#F7931A]/20"
                                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60",
                                        isCollapsed && "justify-center px-0"
                                    )}
                                >
                                    <span className={cn(
                                        "flex min-w-0 items-center justify-center",
                                        active ? "text-[#F7931A]" : "text-inherit"
                                    )}>
                                        {item.icon}
                                    </span>
                                    {!isCollapsed && (
                                        <>
                                            <span className="truncate">{item.name}</span>
                                            {item.badge && (
                                                <Badge
                                                    variant={item.badge.variant}
                                                    className="ml-auto text-xs bg-[#F7931A]/20 text-[#F7931A] border border-[#F7931A]/20 hover:bg-[#F7931A]/30"
                                                >
                                                    {item.badge.text}
                                                </Badge>
                                            )}
                                            {item.isNew && (
                                                <Badge
                                                    variant="secondary"
                                                    className="ml-auto text-xs px-1 py-0 h-5 bg-[#F7931A]/20 text-[#F7931A] border border-[#F7931A]/20"
                                                >
                                                    New
                                                </Badge>
                                            )}
                                        </>
                                    )}
                                </Link>
                            </TooltipTrigger>
                            {isCollapsed && (
                                <TooltipContent side="right" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{item.name}</span>
                                        {item.badge && (
                                            <span className="text-xs text-[#F7931A] opacity-80 mt-0.5">
                                                {item.badge.text} items
                                            </span>
                                        )}
                                        {item.isNew && (
                                            <span className="text-xs text-[#F7931A] opacity-80 mt-0.5">
                                                New feature
                                            </span>
                                        )}
                                    </div>
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>
        );
    };

    // Render a navigation group
    const renderNavGroup = (
        title: string,
        items: NavItem[],
        groupName: string
    ) => (
        <div className="space-y-1">
            {!isCollapsed && (
                <h3 className="px-3 text-xs font-semibold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
                    {title}
                </h3>
            )}
            {items.map((item, i) => renderNavItem(item, i, groupName))}
        </div>
    );

    // Background styles based on theme
    const sidebarBackground = "bg-gradient-to-br dark:from-slate-900 dark:to-[#0A0E1F] from-slate-50 to-slate-100 border-y dark:border-slate-800/50 border-slate-200/70"
    // const sidebarBackground = isDark
    //     ? "bg-gradient-to-b from-[#040d36] to-[#0A0E1F] border-r border-slate-800/50"
    //     : "bg-gradient-to-b from-slate-50 to-white border-r border-slate-200/50";

    return (
        <div
            className={cn(
                "h-full flex flex-col overflow-hidden transition-all duration-300",
                sidebarBackground,
                isCollapsed && !isMobile ? "items-center" : "items-stretch"
            )}
        >
            {/* Sidebar Header with Logo */}
            <div
                className={cn(
                    "flex shrink-0 items-center border-b dark:border-slate-800/50 border-slate-200/70 h-16 px-4",
                    isCollapsed && !isMobile ? "justify-center" : "justify-between"
                )}
            >
                {!isCollapsed || isMobile ? (
                    <div className="flex items-center">
                        <YieldNexusLogo className="w-32 !text-sm" />
                    </div>
                ) : (
                    <div className="flex items-center justify-center py-2">
                        <YieldNexusLogo iconOnly className="w-8 h-8" />
                    </div>
                )}
                {isMobile && (
                    <Button variant="ghost" size="icon" onClick={onToggle} className="text-slate-600 dark:text-slate-300">
                        <ArrowRight className="h-5 w-5" />
                    </Button>
                )}
            </div>

            {/* Navigation Items */}
            <div
                className={cn(
                    "flex-1 flex flex-col overflow-y-auto px-3 py-4 space-y-6",
                    isCollapsed && !isMobile ? "items-center px-2" : ""
                )}
            >
                {/* Main Menu */}
                {renderNavGroup("Main Menu", mainNavItems, "main")}

                {/* Yield Strategies */}
                {renderNavGroup("Yield Strategies", yieldStrategiesItems, "yield")}

                {/* Utilities */}
                {renderNavGroup("Utilities", miscNavItems, "misc")}
            </div>

            {/* Sidebar Footer with Stats */}
            <div className={cn(
                "mt-auto border-t dark:border-slate-800/50 border-slate-200/70 p-3",
                isCollapsed && !isMobile ? "items-center px-2" : ""
            )}>
                {!isCollapsed && (
                    <div className="px-3 mb-3">
                        <div className="p-3 rounded-lg bg-gradient-to-r from-[#F7931A]/10 to-amber-600/5 border border-[#F7931A]/20">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Current APY</span>
                                <span className="text-sm font-bold text-[#F7931A]">8.2%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#F7931A] to-amber-500 rounded-full"
                                    style={{ width: '82%' }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}

                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-start gap-x-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-700 dark:hover:text-red-300",
                        isCollapsed && !isMobile ? "justify-center p-2" : ""
                    )}
                >
                    <LogOut className="h-5 w-5" />
                    {!isCollapsed && <span className="text-sm font-medium">Log Out</span>}
                </Button>
            </div>
        </div>
    );
};

export default YieldNexusSidebar;