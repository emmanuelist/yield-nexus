"use client";

import React from "react";
import { ArrowDown, ArrowRight, BarChart3, Wallet, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Transaction {
    id: number;
    type: "Deposit" | "Reward Claim" | "Compound" | "Withdrawal";
    amount: number;
    timestamp: string;
    status: string;
}

interface TransactionsHistoryCardProps {
    transactions: Transaction[];
    className?: string;
    maxItems?: number;
}

const TransactionsHistoryCard: React.FC<TransactionsHistoryCardProps> = ({
    transactions,
    className,
    maxItems = 4
}) => {
    // Price of sBTC in USD for calculation
    const sBTCPrice = 35240.61;

    // Only display up to maxItems
    const displayTransactions = transactions.slice(0, maxItems);

    // Function to get the appropriate icon based on transaction type
    const getTransactionIcon = (type: Transaction['type']) => {
        switch (type) {
            case "Deposit":
                return <ArrowDown className="h-5 w-5" />;
            case "Reward Claim":
                return <Wallet className="h-5 w-5" />;
            case "Compound":
                return <Zap className="h-5 w-5" />;
            case "Withdrawal":
                return <ArrowDown className="h-5 w-5 transform rotate-180" />;
            default:
                return <Wallet className="h-5 w-5" />;
        }
    };

    // Function to get the appropriate background color based on transaction type
    const getIconBackground = (type: Transaction['type']) => {
        switch (type) {
            case "Deposit":
                return "bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-900/10 text-green-600 dark:text-green-400";
            case "Reward Claim":
                return "bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10 text-blue-600 dark:text-blue-400";
            case "Compound":
                return "bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-900/10 text-purple-600 dark:text-purple-400";
            case "Withdrawal":
                return "bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-900/10 text-amber-600 dark:text-amber-400";
            default:
                return "bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900/80 text-slate-600 dark:text-slate-400";
        }
    };

    return (
        <Card className={cn(
            "overflow-hidden border border-slate-200/60 dark:border-slate-800/60 shadow-md",
            className
        )}>
            {/* Card Header with gradient */}
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60 pb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl text-slate-900 dark:text-white">Recent Transactions</CardTitle>
                        <CardDescription className="text-slate-500 dark:text-slate-400 mt-1">
                            Your latest deposit and yield activities
                        </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="h-9 bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700">
                        <BarChart3 className="h-4 w-4 mr-1.5 text-slate-600 dark:text-slate-400" />
                        <span className="text-sm">View All</span>
                    </Button>
                </div>
            </CardHeader>

            {/* Transaction list */}
            <CardContent className="p-0">
                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                    {displayTransactions.map((tx) => (
                        <div
                            key={tx.id}
                            className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                            <div className="flex items-center">
                                <div className={cn(
                                    "mr-3 h-10 w-10 rounded-full flex items-center justify-center",
                                    getIconBackground(tx.type)
                                )}>
                                    {getTransactionIcon(tx.type)}
                                </div>
                                <div>
                                    <h3 className="font-medium text-slate-900 dark:text-slate-100">
                                        {tx.type}
                                    </h3>
                                    <div className="flex items-center mt-1">
                                        <Badge
                                            variant="outline"
                                            className="text-xs mr-2 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                                        >
                                            {tx.status}
                                        </Badge>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                            {tx.timestamp}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-slate-900 dark:text-white">
                                    {tx.amount} sBTC
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                    ≈ ${(tx.amount * sBTCPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>

            {/* Card Footer */}
            <CardFooter className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-t border-slate-200 dark:border-slate-800/60 py-3 flex justify-center">
                <Button
                    variant="link"
                    className="p-0 h-auto text-sm text-[#F7931A] hover:text-[#F7931A]/80 font-medium"
                >
                    View All Transactions
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default TransactionsHistoryCard;