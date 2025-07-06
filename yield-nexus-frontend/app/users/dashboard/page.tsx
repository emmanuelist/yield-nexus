"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Bitcoin,
    TrendingUp,
    Clock,
    Zap,
    RefreshCw,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WelcomeBanner from "@/components/Dashboard/Overview/WelcomeBanner";
import VaultPerformanceChart from "@/components/Dashboard/Overview/VaultPerformanceChart";
import StatisticCard from "@/components/Dashboard/Overview/StatisticCard";
import PortfolioOverviewCard from "@/components/Dashboard/Overview/PortfolioOverviewCard";
import TransactionsHistoryCard from "@/components/Dashboard/Overview/TransactionsHistoryCard";
import QuickActionsCard from "@/components/Dashboard/Overview/QuickActionsCard";
import SecurityStatusCard from "@/components/Dashboard/Overview/SecurityStatusCard";
import MarketInfoCard from "@/components/Dashboard/Overview/MarketInfoCard";
import { useToast } from "@/hooks/use-toast";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as any
        }
    }
};

// Main Dashboard Overview component
const page: React.FC = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { toast } = useToast();

    // Mock data for dashboard
    const portfolioStats = {
        totalDeposited: 0.3542,
        currentValue: 0.3621,
        pendingRewards: 0.0079,
        apy: 8.2,
    };

    const strategies = [
        {
            id: 1,
            name: "Balanced Yield",
            apy: 8.2,
            risk: "Medium" as const,
            allocation: 65,
        },
        {
            id: 2,
            name: "Stable Returns",
            apy: 5.8,
            risk: "Low" as const,
            allocation: 25,
        },
        {
            id: 3,
            name: "High Yield",
            apy: 12.4,
            risk: "High" as const,
            allocation: 10,
        },
    ];

    const recentTransactions = [
        {
            id: 1,
            type: "Deposit" as const,
            amount: 0.125,
            timestamp: "2 days ago",
            status: "Confirmed",
        },
        {
            id: 2,
            type: "Reward Claim" as const,
            amount: 0.0045,
            timestamp: "5 days ago",
            status: "Confirmed",
        },
        {
            id: 3,
            type: "Compound" as const,
            amount: 0.0021,
            timestamp: "1 week ago",
            status: "Confirmed",
        },
    ];

    // Handlers for various actions
    const handleRefresh = () => {
        setIsRefreshing(true);

        // Simulate API call
        setTimeout(() => {
            setIsRefreshing(false);
            toast({
                title: "Dashboard refreshed",
                description: "Your dashboard data has been updated.",
            });
        }, 1500);
    };

    const handleDeposit = () => {
        // Would open deposit modal in real implementation
        toast({
            title: "Deposit sBTC",
            description: "The deposit feature would open in a modal.",
        });
    };

    const handleWithdraw = () => {
        // Would open withdraw modal in real implementation
        toast({
            title: "Withdraw sBTC",
            description: "The withdraw feature would open in a modal.",
        });
    };

    const handleClaimRewards = () => {
        // Would handle claiming rewards in real implementation
        toast({
            title: "Claim Rewards",
            description: "The reward claiming process would start.",
        });
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Dashboard Header with Welcome Banner */}
            <motion.div variants={itemVariants}>
                <WelcomeBanner />
            </motion.div>

            {/* Portfolio Performance Chart */}
            <motion.div variants={itemVariants}>
                <VaultPerformanceChart />
            </motion.div>

            {/* Action Bar */}
            <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2"
            >
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center">
                    <span className="mr-2">Portfolio Overview</span>
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full bg-[#F7931A]/10 text-[#F7931A] border border-[#F7931A]/20">
                        Live
                    </span>
                </h2>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="h-9 bg-gradient-to-r from-[#05102f]/95 to-[#0d1431]/95 hover:from-[#0d1431]/95 hover:to-[#05102f]/95 text-white border-none"
                    >
                        <RefreshCw className={cn(
                            "h-4 w-4 mr-2",
                            isRefreshing && "animate-spin"
                        )} />
                        <span>Refresh</span>
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleDeposit}
                        className="h-9 bg-gradient-to-r from-[#F7931A] to-amber-600 hover:from-[#F7931A]/90 hover:to-amber-700 text-white border-none"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        <span>Deposit sBTC</span>
                    </Button>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
                <StatisticCard
                    title="Total Deposited"
                    value={`${portfolioStats.totalDeposited} sBTC`}
                    icon={<Bitcoin className="text-[#F7931A]" />}
                    trend={{
                        value: "+0.125",
                        label: "since last month",
                        positive: true,
                    }}
                    bgGradient="from-[#05102f]/95 to-[#0d1431]/95"
                    iconBg="bg-[#F7931A]/10"
                />
                <StatisticCard
                    title="Current Value"
                    value={`${portfolioStats.currentValue} sBTC`}
                    icon={<TrendingUp className="text-green-500" />}
                    trend={{
                        value: "+2.23%",
                        label: "growth rate",
                        positive: true,
                    }}
                    bgGradient="from-[#05102f]/95 to-[#0d1431]/95"
                    iconBg="bg-green-500/10"
                />
                <StatisticCard
                    title="Pending Rewards"
                    value={`${portfolioStats.pendingRewards} sBTC`}
                    icon={<Clock className="text-blue-500" />}
                    trend={{
                        value: "Next reward in 2 days",
                        label: "",
                        positive: true,
                    }}
                    bgGradient="from-[#05102f]/95 to-[#0d1431]/95"
                    iconBg="bg-blue-500/10"
                />
                <StatisticCard
                    title="Current APY"
                    value={`${portfolioStats.apy}%`}
                    icon={<Zap className="text-purple-500" />}
                    trend={{
                        value: "+0.7%",
                        label: "since last week",
                        positive: true,
                    }}
                    bgGradient="from-[#05102f]/95 to-[#0d1431]/95"
                    iconBg="bg-purple-500/10"
                />
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Portfolio Summary + Transaction History */}
                <motion.div
                    variants={itemVariants}
                    className="lg:col-span-2 space-y-6"
                >
                    {/* Portfolio Overview */}
                    <PortfolioOverviewCard strategies={strategies} />

                    {/* Transactions History */}
                    <TransactionsHistoryCard transactions={recentTransactions} />
                </motion.div>

                {/* Right Column: Quick Actions + Security Status + Market Info */}
                <motion.div
                    variants={itemVariants}
                    className="space-y-6"
                >
                    {/* Quick Actions */}
                    <QuickActionsCard
                        onDeposit={handleDeposit}
                        onWithdraw={handleWithdraw}
                        onClaimRewards={handleClaimRewards}
                    />

                    {/* Security Status */}
                    <SecurityStatusCard />

                    {/* Market Info */}
                    <MarketInfoCard />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default page;

