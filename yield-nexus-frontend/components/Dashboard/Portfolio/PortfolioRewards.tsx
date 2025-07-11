"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Zap,
    Gift,
    Calendar,
    Clock,
    TrendingUp,
    Coins,
    Award,
    Star,
    Target,
    RefreshCw,
    Download,
    Settings,
    Plus,
    ArrowUpRight,
    Copy,
    ExternalLink
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }
    }
};

interface RewardEntry {
    id: string;
    date: string;
    type: "Strategy Reward" | "Compound Interest" | "Referral Bonus" | "Loyalty Reward";
    amount: number;
    strategy: string;
    status: "Claimed" | "Pending" | "Available";
    txHash?: string;
}

interface Milestone {
    id: string;
    title: string;
    description: string;
    target: number;
    current: number;
    reward: string;
    completed: boolean;
}

const PortfolioRewards: React.FC = () => {
    const [autoCompound, setAutoCompound] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { toast } = useToast();

    const rewardsStats = {
        totalEarned: 0.0847,
        pendingRewards: 0.0129,
        claimableRewards: 0.0056,
        nextRewardDate: "2 days",
        compoundingEnabled: true,
        totalCompounded: 0.0234
    };

    const rewardHistory: RewardEntry[] = [
        {
            id: "1",
            date: "2025-01-10",
            type: "Strategy Reward",
            amount: 0.0023,
            strategy: "Balanced Yield",
            status: "Available",
        },
        {
            id: "2",
            date: "2025-01-09",
            type: "Compound Interest",
            amount: 0.0018,
            strategy: "Auto Compound",
            status: "Claimed",
            txHash: "0x1234...5678"
        },
        {
            id: "3",
            date: "2025-01-08",
            type: "Strategy Reward",
            amount: 0.0031,
            strategy: "High Yield DeFi",
            status: "Claimed",
            txHash: "0x2345...6789"
        },
        {
            id: "4",
            date: "2025-01-07",
            type: "Referral Bonus",
            amount: 0.0012,
            strategy: "Referral Program",
            status: "Claimed",
            txHash: "0x3456...7890"
        },
        {
            id: "5",
            date: "2025-01-06",
            type: "Loyalty Reward",
            amount: 0.0025,
            strategy: "Platform Loyalty",
            status: "Claimed",
            txHash: "0x4567...8901"
        }
    ];

    const milestones: Milestone[] = [
        {
            id: "1",
            title: "First Deposit",
            description: "Make your first sBTC deposit",
            target: 1,
            current: 1,
            reward: "0.001 sBTC",
            completed: true
        },
        {
            id: "2",
            title: "Steady Holder",
            description: "Hold for 30 consecutive days",
            target: 30,
            current: 23,
            reward: "0.005 sBTC",
            completed: false
        },
        {
            id: "3",
            title: "Portfolio Builder",
            description: "Reach 1 sBTC total value",
            target: 1.0,
            current: 0.75,
            reward: "0.01 sBTC",
            completed: false
        },
        {
            id: "4",
            title: "Strategy Master",
            description: "Use 3 different strategies",
            target: 3,
            current: 3,
            reward: "0.008 sBTC",
            completed: true
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Available": return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
            case "Pending": return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20";
            case "Claimed": return "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20";
            default: return "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20";
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "Strategy Reward": return <Zap className="h-4 w-4" />;
            case "Compound Interest": return <TrendingUp className="h-4 w-4" />;
            case "Referral Bonus": return <Gift className="h-4 w-4" />;
            case "Loyalty Reward": return <Award className="h-4 w-4" />;
            default: return <Coins className="h-4 w-4" />;
        }
    };

    const handleClaimRewards = async () => {
        setIsRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsRefreshing(false);
        toast({
            title: "Rewards claimed!",
            description: `Successfully claimed ${rewardsStats.claimableRewards} sBTC`,
        });
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsRefreshing(false);
        toast({
            title: "Rewards updated",
            description: "Your rewards data has been refreshed.",
        });
    };

    const handleCopyReferralCode = () => {
        navigator.clipboard.writeText("YN-A7X9M2");
        toast({
            title: "Copied!",
            description: "Referral code copied to clipboard",
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
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Portfolio Rewards</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Track and manage your yield rewards and bonuses
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
                        onClick={handleClaimRewards}
                        disabled={rewardsStats.claimableRewards === 0}
                        className="h-9 bg-gradient-to-r from-[#F7931A] to-amber-600 hover:from-[#F7931A]/90 hover:to-amber-700 text-white border-none"
                    >
                        <Gift className="h-4 w-4 mr-2" />
                        Claim All
                    </Button>
                </div>
            </motion.div>

            {/* Rewards Overview Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Earned</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{rewardsStats.totalEarned} sBTC</p>
                                <div className="flex items-center mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">All time</span>
                                </div>
                            </div>
                            <div className="p-2 rounded-lg bg-[#F7931A]/10">
                                <Award className="h-5 w-5 text-[#F7931A]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Claimable</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{rewardsStats.claimableRewards} sBTC</p>
                                <div className="flex items-center mt-1">
                                    <Gift className="h-3 w-3 text-green-500 mr-1" />
                                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">Ready now</span>
                                </div>
                            </div>
                            <div className="p-2 rounded-lg bg-green-500/10">
                                <Gift className="h-5 w-5 text-green-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Pending</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{rewardsStats.pendingRewards} sBTC</p>
                                <div className="flex items-center mt-1">
                                    <Clock className="h-3 w-3 text-amber-500 mr-1" />
                                    <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">In {rewardsStats.nextRewardDate}</span>
                                </div>
                            </div>
                            <div className="p-2 rounded-lg bg-amber-500/10">
                                <Clock className="h-5 w-5 text-amber-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Compounded</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{rewardsStats.totalCompounded} sBTC</p>
                                <div className="flex items-center mt-1">
                                    <Zap className="h-3 w-3 text-purple-500 mr-1" />
                                    <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">Auto reinvested</span>
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
                {/* Rewards Management */}
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <Card className="border border-slate-200/60 dark:border-slate-800/60">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60 pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg text-slate-900 dark:text-white">Reward History</CardTitle>
                                    <CardDescription className="text-slate-500 dark:text-slate-400">
                                        Your recent reward transactions
                                    </CardDescription>
                                </div>
                                <Button variant="outline" size="sm" className="h-8">
                                    <Download className="h-4 w-4 mr-1.5" />
                                    Export
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Tabs defaultValue="all" className="w-full">
                                <TabsList className="grid w-full grid-cols-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                    <TabsTrigger value="all" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">All</TabsTrigger>
                                    <TabsTrigger value="available" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">Available</TabsTrigger>
                                    <TabsTrigger value="pending" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">Pending</TabsTrigger>
                                    <TabsTrigger value="claimed" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">Claimed</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="all" className="p-0">
                                    <div className="divide-y divide-slate-200 dark:divide-slate-800">
                                        {rewardHistory.map((reward) => (
                                            <div key={reward.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="p-2 rounded-lg bg-[#F7931A]/10">
                                                            {getTypeIcon(reward.type)}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium text-slate-900 dark:text-white">{reward.type}</h3>
                                                            <div className="flex items-center space-x-2 mt-1">
                                                                <span className="text-sm text-slate-500 dark:text-slate-400">{reward.strategy}</span>
                                                                <Badge className={cn("text-xs", getStatusColor(reward.status))}>
                                                                    {reward.status}
                                                                </Badge>
                                                            </div>
                                                            {reward.txHash && (
                                                                <div className="flex items-center space-x-1 mt-1">
                                                                    <span className="text-xs text-slate-400">Tx: {reward.txHash}</span>
                                                                    <ExternalLink className="h-3 w-3 text-slate-400" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-lg font-bold text-[#F7931A]">+{reward.amount} sBTC</div>
                                                        <div className="text-xs text-slate-500 dark:text-slate-400">{reward.date}</div>
                                                        {reward.status === "Available" && (
                                                            <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                                                                Claim
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                                
                                <TabsContent value="available" className="p-6">
                                    <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                        <Gift className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>Available rewards will be displayed here</p>
                                    </div>
                                </TabsContent>
                                
                                <TabsContent value="pending" className="p-6">
                                    <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                        <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>Pending rewards will be displayed here</p>
                                    </div>
                                </TabsContent>
                                
                                <TabsContent value="claimed" className="p-6">
                                    <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                        <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>Claimed rewards will be displayed here</p>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Settings & Milestones */}
                <motion.div variants={itemVariants} className="space-y-4">
                    {/* Auto-Compound Settings */}
                    <Card className="border border-slate-200/60 dark:border-slate-800/60">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60 pb-3">
                            <CardTitle className="text-lg text-slate-900 dark:text-white">Reward Settings</CardTitle>
                            <CardDescription className="text-slate-500 dark:text-slate-400">
                                Configure your reward preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-slate-900 dark:text-white">Auto-Compound</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Automatically reinvest rewards</p>
                                </div>
                                <Switch checked={autoCompound} onCheckedChange={setAutoCompound} />
                            </div>
                            
                            {autoCompound && (
                                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                                    <div className="flex items-center space-x-2">
                                        <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
                                        <span className="text-sm font-medium text-green-700 dark:text-green-300">Auto-Compound Active</span>
                                    </div>
                                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                                        Rewards will be automatically reinvested for compound growth.
                                    </p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Button variant="outline" className="w-full justify-start" size="sm">
                                    <Settings className="h-4 w-4 mr-2" />
                                    Advanced Settings
                                </Button>
                                <Button variant="outline" className="w-full justify-start" size="sm">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Schedule Claims
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Achievement Milestones */}
                    <Card className="border border-slate-200/60 dark:border-slate-800/60">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60 pb-3">
                            <CardTitle className="text-lg text-slate-900 dark:text-white">Achievement Milestones</CardTitle>
                            <CardDescription className="text-slate-500 dark:text-slate-400">
                                Unlock rewards by reaching milestones
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            {milestones.map((milestone) => (
                                <div key={milestone.id} className={cn(
                                    "p-3 rounded-lg border transition-colors",
                                    milestone.completed 
                                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                                        : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                                )}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <h4 className="font-medium text-slate-900 dark:text-white">{milestone.title}</h4>
                                                {milestone.completed && (
                                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{milestone.description}</p>
                                            
                                            {!milestone.completed && (
                                                <div className="mt-2">
                                                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                                                        <span>Progress</span>
                                                        <span>{milestone.current}/{milestone.target}</span>
                                                    </div>
                                                    <Progress value={(milestone.current / milestone.target) * 100} className="h-1.5" />
                                                </div>
                                            )}
                                        </div>
                                        <Badge className={cn(
                                            "ml-3 text-xs",
                                            milestone.completed 
                                                ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                                                : "bg-[#F7931A]/10 text-[#F7931A] border-[#F7931A]/20"
                                        )}>
                                            {milestone.reward}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Referral Program */}
            <motion.div variants={itemVariants}>
                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60 pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg text-slate-900 dark:text-white">Referral Program</CardTitle>
                                <CardDescription className="text-slate-500 dark:text-slate-400">
                                    Earn bonus rewards by referring friends
                                </CardDescription>
                            </div>
                            <Button variant="outline" size="sm" className="h-8">
                                <ArrowUpRight className="h-4 w-4 mr-1.5" />
                                Learn More
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 inline-block mb-2">
                                    <Gift className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="font-medium text-slate-900 dark:text-white">5% Bonus</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">For every successful referral</p>
                            </div>
                            <div className="text-center">
                                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 inline-block mb-2">
                                    <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="font-medium text-slate-900 dark:text-white">2 Referrals</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Current active referrals</p>
                            </div>
                            <div className="text-center">
                                <div className="p-3 rounded-lg bg-[#F7931A]/10 inline-block mb-2">
                                    <Coins className="h-6 w-6 text-[#F7931A]" />
                                </div>
                                <h3 className="font-medium text-slate-900 dark:text-white">0.0045 sBTC</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Total referral earnings</p>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-gradient-to-r from-[#F7931A]/5 to-amber-600/5 border border-[#F7931A]/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">Your Referral Code</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Share this code with friends</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <code className="px-3 py-1 bg-white dark:bg-slate-800 rounded border text-sm font-mono">YN-A7X9M2</code>
                                    <Button size="sm" variant="outline" className="h-8" onClick={handleCopyReferralCode}>
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default PortfolioRewards;