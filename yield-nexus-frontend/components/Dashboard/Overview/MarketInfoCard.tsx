"use client";

import React from "react";
import { Bitcoin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MarketData {
    price: number;
    priceChange: number;
    volume: string;
    marketCap: string;
    dominance: string;
}

interface MarketInfoCardProps {
    className?: string;
    marketData?: MarketData;
}

const MarketInfoCard: React.FC<MarketInfoCardProps> = ({
    className,
    marketData = {
        price: 35240.61,
        priceChange: 5.23,
        volume: "$42.3B",
        marketCap: "$689.5B",
        dominance: "52.1%"
    }
}) => {
    return (
        <Card className={cn(
            "overflow-hidden border border-slate-200/60 dark:border-slate-800/60 shadow-md",
            className
        )}>
            {/* Card Header with gradient */}
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60">
                <div className="flex items-center">
                    <Bitcoin className="h-5 w-5 mr-2 text-[#F7931A]" />
                    <div>
                        <CardTitle className="text-xl text-slate-900 dark:text-white">Bitcoin Market</CardTitle>
                        <CardDescription className="text-slate-500 dark:text-slate-400 mt-1">
                            Current BTC market information
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            {/* Market Info List */}
            <CardContent className="p-4">
                <div className="space-y-4">
                    {/* BTC Price */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">BTC Price</span>
                        <div className="text-right">
                            <div className="font-bold text-slate-900 dark:text-white">${marketData.price.toLocaleString()}</div>
                            <div className={cn(
                                "text-xs",
                                marketData.priceChange >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                            )}>
                                {marketData.priceChange >= 0 ? "+" : ""}{marketData.priceChange}%
                            </div>
                        </div>
                    </div>

                    {/* 24h Volume */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">24h Volume</span>
                        <div className="font-medium text-slate-900 dark:text-white">{marketData.volume}</div>
                    </div>

                    {/* Market Cap */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Market Cap</span>
                        <div className="font-medium text-slate-900 dark:text-white">{marketData.marketCap}</div>
                    </div>

                    {/* Dominance */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Dominance</span>
                        <div className="font-medium text-slate-900 dark:text-white">{marketData.dominance}</div>
                    </div>
                </div>

                {/* Price Chart Preview */}
                <div className="mt-6 p-3 bg-gradient-to-r from-[#F7931A]/5 to-amber-50 dark:from-[#F7931A]/10 dark:to-amber-900/5 rounded-lg border border-[#F7931A]/20 dark:border-[#F7931A]/30">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">BTC/USD 24h</span>
                        <Button
                            variant="link"
                            size="sm"
                            className="h-6 p-0 text-xs text-[#F7931A] hover:text-[#F7931A]/80"
                        >
                            View Chart
                            <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                    </div>

                    {/* Simple sparkline visualization */}
                    <div className="h-10 w-full relative">
                        <div className="absolute inset-0 flex items-end">
                            {Array.from({ length: 40 }).map((_, i) => {
                                // Generate a simple sin wave for the sparkline
                                const height = 15 + Math.sin(i / 3) * 6 + Math.random() * 4;
                                return (
                                    <div
                                        key={i}
                                        className={cn(
                                            "w-full h-full mx-[0.5px]",
                                            marketData.priceChange >= 0 ? "bg-green-500/50" : "bg-red-500/50"
                                        )}
                                        style={{ height: `${height}px` }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MarketInfoCard;