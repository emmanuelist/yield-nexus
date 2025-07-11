"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Bitcoin,
    TrendingUp,
    PieChart,
    BarChart3,
    Wallet,
    RefreshCw,
    Plus,
    Settings,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Target,
    Shield,
    Zap
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
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

interface Strategy {
    id: number;
    name: string;
    allocation: number;
    apy: number;
    risk: "Low" | "Medium" | "High";
    value: number;
    change24h: number;
    status: "Active" | "Paused" | "Pending";
}

interface AllocationTarget {
    id: number;
    name: string;
    current: number;
    target: number;
    risk: "Low" | "Medium" | "High";
}

const PortfolioOverview: React.FC = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showRebalanceModal, setShowRebalanceModal] = useState(false);
    const { toast } = useToast();

    // Mock portfolio data
    const portfolioStats = {
        totalValue: 1.2456,
        totalDeposited: 1.1500,
        unrealizedGains: 0.0956,
        realizedGains: 0.0340,
        apy: 8.2,
        change24h: 2.3
    };

    const strategies: Strategy[] = [
        {
            id: 1,
            name: "Balanced Yield Strategy",
            allocation: 45,
            apy: 8.2,
            risk: "Medium",
            value: 0.5605,
            change24h: 1.8,
            status: "Active"
        },
        {
            id: 2,
            name: "Conservative Staking",
            allocation: 30,
            apy: 5.8,
            risk: "Low",
            value: 0.3737,
            change24h: 0.9,
            status: "Active"
        },
        {
            id: 3,
            name: "High Yield DeFi",
            allocation: 20,
            apy: 12.4,
            risk: "High",
            value: 0.2491,
            change24h: 4.2,
            status: "Active"
        },
        {
            id: 4,
            name: "Liquid Staking",
            allocation: 5,
            apy: 6.1,
            risk: "Low",
            value: 0.0623,
            change24h: 1.1,
            status: "Pending"
        }
    ];

    const allocationTargets: AllocationTarget[] = [
        { id: 1, name: "Balanced Yield", current: 45, target: 50, risk: "Medium" },
        { id: 2, name: "Conservative", current: 30, target: 25, risk: "Low" },
        { id: 3, name: "High Yield", current: 20, target: 20, risk: "High" },
        { id: 4, name: "Liquid Staking", current: 5, target: 5, risk: "Low" }
    ];

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case "Low": return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
            case "Medium": return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800";
            case "High": return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
            default: return "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
            case "Paused": return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20";
            case "Pending": return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20";
            default: return "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20";
        }
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsRefreshing(false);
        toast({
            title: "Portfolio updated",
            description: "Your portfolio data has been refreshed.",
        });
    };

    const handleRebalance = () => {
        setShowRebalanceModal(true);
        toast({
            title: "Rebalance initiated",
            description: "Portfolio rebalancing has been started.",
        });
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Portfolio Overview</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Monitor your sBTC yield strategies and performance
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="h-9"
                    >
                        <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
                        Refresh
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleRebalance}
                        className="h-9 bg-gradient-to-r from-[#F7931A] to-amber-600 hover:from-[#F7931A]/90 hover:to-amber-700 text-white border-none"
                    >
                        <Target className="h-4 w-4 mr-2" />
                        Rebalance
                    </Button>
                </div>
            </motion.div>

            {/* Portfolio Summary Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Value</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{portfolioStats.totalValue} sBTC</p>
                                <div className="flex items-center mt-1">
                                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">+{portfolioStats.change24h}%</span>
                                </div>
                            </div>
                            <div className="p-2 rounded-lg bg-[#F7931A]/10">
                                <Wallet className="h-5 w-5 text-[#F7931A]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Deposited</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{portfolioStats.totalDeposited} sBTC</p>
                                <div className="flex items-center mt-1">
                                    <Plus className="h-3 w-3 text-blue-500 mr-1" />
                                    <span className="text-sm text-slate-500 dark:text-slate-400">Principal amount</span>
                                </div>
                            </div>
                            <div className="p-2 rounded-lg bg-blue-500/10">
                                <Bitcoin className="h-5 w-5 text-blue-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Gains</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">+{(portfolioStats.unrealizedGains + portfolioStats.realizedGains).toFixed(4)} sBTC</p>
                                <div className="flex items-center mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                                        {(((portfolioStats.unrealizedGains + portfolioStats.realizedGains) / portfolioStats.totalDeposited) * 100).toFixed(1)}% ROI
                                    </span>
                                </div>
                            </div>
                            <div className="p-2 rounded-lg bg-green-500/10">
                                <TrendingUp className="h-5 w-5 text-green-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Avg APY</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{portfolioStats.apy}%</p>
                                <div className="flex items-center mt-1">
                                    <Zap className="h-3 w-3 text-purple-500 mr-1" />
                                    <span className="text-sm text-slate-500 dark:text-slate-400">Weighted average</span>
                                </div>
                            </div>
                            <div className="p-2 rounded-lg bg-purple-500/10">
                                <Zap className="h-5 w-5 text-purple-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Active Strategies */}
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <Card className="border border-slate-200/60 dark:border-slate-800/60">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60 pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg text-slate-900 dark:text-white">Active Strategies</CardTitle>
                                    <CardDescription className="text-slate-500 dark:text-slate-400">
                                        Your current yield strategy allocations
                                    </CardDescription>
                                </div>
                                <Button variant="outline" size="sm" className="h-8">
                                    <Settings className="h-4 w-4 mr-1.5" />
                                    Manage
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-200 dark:divide-slate-800">
                                {strategies.map((strategy) => (
                                    <div key={strategy.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 rounded-lg bg-[#F7931A]/10">
                                                    <PieChart className="h-4 w-4 text-[#F7931A]" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-slate-900 dark:text-white">{strategy.name}</h3>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <Badge variant="outline" className={cn("text-xs", getRiskColor(strategy.risk))}>
                                                            {strategy.risk} Risk
                                                        </Badge>
                                                        <Badge className={cn("text-xs", getStatusColor(strategy.status))}>
                                                            {strategy.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-slate-900 dark:text-white">{strategy.value} sBTC</div>
                                                <div className="flex items-center justify-end space-x-2">
                                                    <span className="text-sm font-medium text-[#F7931A]">{strategy.apy}% APY</span>
                                                    <div className="flex items-center">
                                                        {strategy.change24h > 0 ? (
                                                            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                                                        ) : (
                                                            <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                                                        )}
                                                        <span className={cn(
                                                            "text-xs font-medium",
                                                            strategy.change24h > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                                        )}>
                                                            {strategy.change24h > 0 ? "+" : ""}{strategy.change24h}%
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                    {strategy.allocation}% allocation
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Allocation Analysis */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <Card className="border border-slate-200/60 dark:border-slate-800/60">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60 pb-3">
                            <CardTitle className="text-lg text-slate-900 dark:text-white">Allocation vs Target</CardTitle>
                            <CardDescription className="text-slate-500 dark:text-slate-400">
                                Current vs target allocations
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            {allocationTargets.map((target) => (
                                <div key={target.id}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{target.name}</span>
                                        <span className="text-sm text-slate-500 dark:text-slate-400">{target.current}% / {target.target}%</span>
                                    </div>
                                    <div className="space-y-1">
                                        <Progress value={target.current} className="h-2" />
                                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                                            <span>Current: {target.current}%</span>
                                            <span>Target: {target.target}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="border border-slate-200/60 dark:border-slate-800/60">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60 pb-3">
                            <CardTitle className="text-lg text-slate-900 dark:text-white">Risk Distribution</CardTitle>
                            <CardDescription className="text-slate-500 dark:text-slate-400">
                                Portfolio risk breakdown
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        <span className="text-sm text-slate-700 dark:text-slate-300">Low Risk</span>
                                    </div>
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">35%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                        <span className="text-sm text-slate-700 dark:text-slate-300">Medium Risk</span>
                                    </div>
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">45%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <span className="text-sm text-slate-700 dark:text-slate-300">High Risk</span>
                                    </div>
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">20%</span>
                                </div>
                            </div>
                            <div className="mt-4 p-3 rounded-lg bg-[#F7931A]/5 border border-[#F7931A]/20">
                                <div className="flex items-center space-x-2">
                                    <Shield className="h-4 w-4 text-[#F7931A]" />
                                    <span className="text-sm font-medium text-[#F7931A]">Well Balanced</span>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                    Your portfolio has a good risk distribution for stable returns.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default PortfolioOverview;