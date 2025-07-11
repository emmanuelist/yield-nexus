"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    History,
    ArrowUpRight,
    ArrowDownLeft,
    Download,
    Search,
    ExternalLink,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    TrendingUp,
    TrendingDown,
    Repeat,
    Plus,
    Minus
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

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

interface Transaction {
    id: string;
    type: "Deposit" | "Withdraw" | "Reward Claim" | "Compound" | "Rebalance" | "Strategy Change";
    amount: number;
    strategy?: string;
    status: "Completed" | "Pending" | "Failed";
    timestamp: string;
    txHash: string;
    gasUsed?: number;
    fee?: number;
}

const PortfolioHistory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [timeRange, setTimeRange] = useState("30d");

    const transactions: Transaction[] = [
        {
            id: "1",
            type: "Deposit",
            amount: 0.125,
            strategy: "Balanced Yield",
            status: "Completed",
            timestamp: "2025-01-10 14:30:22",
            txHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
            gasUsed: 142000,
            fee: 0.00012
        },
        {
            id: "2",
            type: "Reward Claim",
            amount: 0.0045,
            strategy: "High Yield DeFi",
            status: "Completed",
            timestamp: "2025-01-09 16:45:11",
            txHash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234",
            gasUsed: 98000,
            fee: 0.00008
        },
        {
            id: "3",
            type: "Compound",
            amount: 0.0021,
            strategy: "Auto Compound",
            status: "Completed",
            timestamp: "2025-01-08 09:15:33",
            txHash: "0x3c4d5e6f7890abcdef1234567890abcdef123456",
            gasUsed: 156000,
            fee: 0.00015
        },
        {
            id: "4",
            type: "Rebalance",
            amount: 0.0000,
            strategy: "Portfolio Rebalance",
            status: "Completed",
            timestamp: "2025-01-07 11:22:44",
            txHash: "0x4d5e6f7890abcdef1234567890abcdef12345678",
            gasUsed: 234000,
            fee: 0.00023
        },
        {
            id: "5",
            type: "Withdraw",
            amount: 0.05,
            strategy: "Conservative Staking",
            status: "Pending",
            timestamp: "2025-01-06 13:10:55",
            txHash: "0x5e6f7890abcdef1234567890abcdef1234567890",
            gasUsed: 118000,
            fee: 0.00011
        },
        {
            id: "6",
            type: "Strategy Change",
            amount: 0.0000,
            strategy: "High Yield → Balanced",
            status: "Failed",
            timestamp: "2025-01-05 18:33:12",
            txHash: "0x6f7890abcdef1234567890abcdef123456789012",
            gasUsed: 89000,
            fee: 0.00009
        },
        {
            id: "7",
            type: "Deposit",
            amount: 0.2,
            strategy: "Conservative Staking",
            status: "Completed",
            timestamp: "2025-01-04 10:45:21",
            txHash: "0x7890abcdef1234567890abcdef12345678901234",
            gasUsed: 145000,
            fee: 0.00014
        }
    ];

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case "Deposit": return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
            case "Withdraw": return <ArrowUpRight className="h-4 w-4 text-red-500" />;
            case "Reward Claim": return <TrendingUp className="h-4 w-4 text-[#F7931A]" />;
            case "Compound": return <Repeat className="h-4 w-4 text-purple-500" />;
            case "Rebalance": return <TrendingDown className="h-4 w-4 text-blue-500" />;
            case "Strategy Change": return <Plus className="h-4 w-4 text-indigo-500" />;
            default: return <History className="h-4 w-4 text-slate-500" />;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "Pending": return <Clock className="h-4 w-4 text-amber-500" />;
            case "Failed": return <XCircle className="h-4 w-4 text-red-500" />;
            default: return <AlertCircle className="h-4 w-4 text-slate-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed": return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
            case "Pending": return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800";
            case "Failed": return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
            default: return "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800";
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Deposit": return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
            case "Withdraw": return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20";
            case "Reward Claim": return "text-[#F7931A] bg-[#F7931A]/10";
            case "Compound": return "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20";
            case "Rebalance": return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20";
            case "Strategy Change": return "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20";
            default: return "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20";
        }
    };

    const filteredTransactions = transactions.filter(tx => {
        const matchesSearch = tx.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tx.strategy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tx.type.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "all" || tx.type === filterType;
        const matchesStatus = filterStatus === "all" || tx.status === filterStatus;
        return matchesSearch && matchesType && matchesStatus;
    });

    const summaryStats = {
        totalTransactions: transactions.length,
        totalVolume: transactions.reduce((sum, tx) => sum + tx.amount, 0),
        totalFees: transactions.reduce((sum, tx) => sum + (tx.fee || 0), 0),
        successRate: (transactions.filter(tx => tx.status === "Completed").length / transactions.length * 100).toFixed(1)
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
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Portfolio History</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Complete transaction history and portfolio activity
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-32 h-9">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7d">7 Days</SelectItem>
                            <SelectItem value="30d">30 Days</SelectItem>
                            <SelectItem value="90d">90 Days</SelectItem>
                            <SelectItem value="1y">All Time</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="h-9">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>
            </motion.div>

            {/* Summary Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Transactions</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{summaryStats.totalTransactions}</p>
                            </div>
                            <div className="p-2 rounded-lg bg-blue-500/10">
                                <History className="h-5 w-5 text-blue-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Volume</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{summaryStats.totalVolume.toFixed(4)} sBTC</p>
                            </div>
                            <div className="p-2 rounded-lg bg-[#F7931A]/10">
                                <TrendingUp className="h-5 w-5 text-[#F7931A]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Fees</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{summaryStats.totalFees.toFixed(6)} sBTC</p>
                            </div>
                            <div className="p-2 rounded-lg bg-purple-500/10">
                                <Minus className="h-5 w-5 text-purple-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Success Rate</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{summaryStats.successRate}%</p>
                            </div>
                            <div className="p-2 rounded-lg bg-green-500/10">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Filters and Search */}
            <motion.div variants={itemVariants}>
                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        placeholder="Search by transaction hash, strategy, or type..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Select value={filterType} onValueChange={setFilterType}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Filter by type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        <SelectItem value="Deposit">Deposits</SelectItem>
                                        <SelectItem value="Withdraw">Withdrawals</SelectItem>
                                        <SelectItem value="Reward Claim">Reward Claims</SelectItem>
                                        <SelectItem value="Compound">Compounds</SelectItem>
                                        <SelectItem value="Rebalance">Rebalances</SelectItem>
                                        <SelectItem value="Strategy Change">Strategy Changes</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={filterStatus} onValueChange={setFilterStatus}>
                                    <SelectTrigger className="w-36">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                        <SelectItem value="Failed">Failed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Transaction List */}
            <motion.div variants={itemVariants}>
                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60 pb-3">
                        <CardTitle className="text-lg text-slate-900 dark:text-white">Transaction History</CardTitle>
                        <CardDescription className="text-slate-500 dark:text-slate-400">
                            {filteredTransactions.length} transactions found
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Tabs defaultValue="list" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <TabsTrigger value="list" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">List View</TabsTrigger>
                                <TabsTrigger value="detailed" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">Detailed View</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="list" className="p-0">
                                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                                    {filteredTransactions.map((transaction) => (
                                        <div key={transaction.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                                                        {getTransactionIcon(transaction.type)}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center space-x-2">
                                                            <h3 className="font-medium text-slate-900 dark:text-white">{transaction.type}</h3>
                                                            <Badge className={cn("text-xs", getTypeColor(transaction.type))}>
                                                                {transaction.type}
                                                            </Badge>
                                                        </div>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            <span className="text-sm text-slate-500 dark:text-slate-400">{transaction.strategy}</span>
                                                            <span className="text-xs text-slate-400">•</span>
                                                            <span className="text-sm text-slate-500 dark:text-slate-400">{transaction.timestamp}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1 mt-1">
                                                            <span className="text-xs text-slate-400 font-mono">{transaction.txHash.slice(0, 10)}...{transaction.txHash.slice(-6)}</span>
                                                            <ExternalLink className="h-3 w-3 text-slate-400 cursor-pointer hover:text-[#F7931A]" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center space-x-2">
                                                        {getStatusIcon(transaction.status)}
                                                        <Badge className={cn("text-xs", getStatusColor(transaction.status))}>
                                                            {transaction.status}
                                                        </Badge>
                                                    </div>
                                                    {transaction.amount > 0 && (
                                                        <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                                                            {transaction.type === "Withdraw" ? "-" : "+"}{transaction.amount} sBTC
                                                        </div>
                                                    )}
                                                    {transaction.fee && (
                                                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                            Fee: {transaction.fee} sBTC
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="detailed" className="p-4">
                                <div className="space-y-4">
                                    {filteredTransactions.map((transaction) => (
                                        <Card key={transaction.id} className="border border-slate-200/60 dark:border-slate-800/60">
                                            <CardContent className="p-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h4 className="font-medium text-slate-900 dark:text-white mb-2">{transaction.type}</h4>
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex justify-between">
                                                                <span className="text-slate-500 dark:text-slate-400">Strategy:</span>
                                                                <span className="text-slate-900 dark:text-white">{transaction.strategy}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-slate-500 dark:text-slate-400">Amount:</span>
                                                                <span className="text-slate-900 dark:text-white font-medium">{transaction.amount} sBTC</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-slate-500 dark:text-slate-400">Status:</span>
                                                                <Badge className={cn("text-xs", getStatusColor(transaction.status))}>
                                                                    {transaction.status}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-slate-900 dark:text-white mb-2">Transaction Details</h4>
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex justify-between">
                                                                <span className="text-slate-500 dark:text-slate-400">Hash:</span>
                                                                <div className="flex items-center space-x-1">
                                                                    <span className="text-slate-900 dark:text-white font-mono text-xs">{transaction.txHash.slice(0, 8)}...{transaction.txHash.slice(-6)}</span>
                                                                    <ExternalLink className="h-3 w-3 text-slate-400 cursor-pointer hover:text-[#F7931A]" />
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-slate-500 dark:text-slate-400">Gas Used:</span>
                                                                <span className="text-slate-900 dark:text-white">{transaction.gasUsed?.toLocaleString()}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-slate-500 dark:text-slate-400">Fee:</span>
                                                                <span className="text-slate-900 dark:text-white">{transaction.fee} sBTC</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-slate-500 dark:text-slate-400">Timestamp:</span>
                                                                <span className="text-slate-900 dark:text-white">{transaction.timestamp}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default PortfolioHistory;