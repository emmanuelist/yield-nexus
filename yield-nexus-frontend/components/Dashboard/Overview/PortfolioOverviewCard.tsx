"use client";

import React from "react";
import { Bitcoin, ArrowRight, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Strategy {
    id: number;
    name: string;
    apy: number;
    risk: "Low" | "Medium" | "High";
    allocation: number;
}

interface PortfolioOverviewCardProps {
    strategies: Strategy[];
    className?: string;
}

const PortfolioOverviewCard: React.FC<PortfolioOverviewCardProps> = ({
    strategies,
    className
}) => {
    // Calculate combined APY
    const combinedAPY = parseFloat(
        (strategies.reduce((sum, strategy) => sum + (strategy.apy * strategy.allocation / 100), 0)).toFixed(1)
    );

    return (
        <Card className={cn(
            "overflow-hidden border border-slate-200/60 dark:border-slate-800/60 shadow-md",
            className
        )}>
            {/* Card Header with gradient */}
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60 pb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl text-slate-900 dark:text-white">Portfolio Overview</CardTitle>
                        <CardDescription className="text-slate-500 dark:text-slate-400 mt-1">
                            Your active Bitcoin yield strategies
                        </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="h-9 bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700">
                        <PieChart className="h-4 w-4 mr-1.5 text-slate-600 dark:text-slate-400" />
                        <span className="text-sm">Details</span>
                    </Button>
                </div>
            </CardHeader>

            {/* Strategy list */}
            <CardContent className="p-0">
                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                    {strategies.map((strategy) => (
                        <div
                            key={strategy.id}
                            className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                            <div className="flex items-center">
                                <div className="relative mr-3 h-10 w-10 rounded-full flex items-center justify-center">
                                    {/* Background gradient for icon */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F7931A]/5 to-[#F7931A]/20 dark:from-[#F7931A]/10 dark:to-[#F7931A]/30"></div>

                                    {/* Icon */}
                                    <Bitcoin className="h-5 w-5 text-[#F7931A] relative z-10" />
                                </div>

                                <div>
                                    <h3 className="font-medium text-slate-900 dark:text-slate-100">
                                        {strategy.name}
                                    </h3>
                                    <div className="flex items-center mt-1">
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                "text-xs mr-2 border-opacity-60 dark:border-opacity-60",
                                                strategy.risk === "Low"
                                                    ? "border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                                                    : strategy.risk === "Medium"
                                                        ? "border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20"
                                                        : "border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20"
                                            )}
                                        >
                                            {strategy.risk} Risk
                                        </Badge>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                            {strategy.allocation}% allocation
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-lg font-bold text-[#F7931A]">
                                    {strategy.apy}%
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                    Current APY
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>

            {/* Card Footer */}
            <CardFooter className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-t border-slate-200 dark:border-slate-800/60 py-3 flex justify-between items-center">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                    Combined APY: <span className="font-bold text-[#F7931A]">{combinedAPY}%</span>
                </div>
                <Button
                    variant="link"
                    className="p-0 h-auto text-sm text-[#F7931A] hover:text-[#F7931A]/80 font-medium"
                >
                    Adjust Allocations
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default PortfolioOverviewCard;