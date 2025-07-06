"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
    Legend
} from "recharts";

// Data type for chart
interface ChartDataPoint {
    date: string;
    value: number;
    cumulativeYield: number;
    btcPrice?: number;
}

interface VaultPerformanceChartProps {
    className?: string;
    title?: string;
    description?: string;
    timeframes?: string[];
    data?: ChartDataPoint[];
}

const VaultPerformanceChart: React.FC<VaultPerformanceChartProps> = ({
    className,
    title = "Nexus Performance",
    description = "Track your sBTC Nexus performance over time",
    timeframes = ["1W", "1M", "3M", "6M", "1Y", "ALL"],
    data = generateMockData()
}) => {
    const [activeTimeframe, setActiveTimeframe] = useState(timeframes[1]); // Default to 1M
    const [chartData, setChartData] = useState(data);

    // Update data when timeframe changes
    const handleTimeframeChange = (timeframe: string) => {
        setActiveTimeframe(timeframe);
        // In a real app, you would fetch or filter data based on timeframe
        // For this demo, we'll just use the same data
    };

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
                    <p className="font-medium text-sm text-slate-900 dark:text-white mb-1">{label}</p>
                    <p className="text-xs text-[#F7931A] font-medium">
                        Value: {payload[0].value.toFixed(4)} sBTC
                    </p>
                    <p className="text-xs text-blue-500 font-medium">
                        Yield: {payload[1].value.toFixed(4)} sBTC
                    </p>
                    {payload[2] && (
                        <p className="text-xs text-green-500 font-medium">
                            BTC: ${payload[2].value.toLocaleString()}
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <Card className={cn(
            "overflow-hidden border border-slate-200/60 dark:border-slate-800/60 shadow-md",
            className
        )}>
            {/* Card Header with gradient */}
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <CardTitle className="text-xl text-slate-900 dark:text-white">{title}</CardTitle>
                        <CardDescription className="text-slate-500 dark:text-slate-400 mt-1">
                            {description}
                        </CardDescription>
                    </div>

                    {/* Timeframe selector */}
                    <div className="flex gap-1">
                        {timeframes.map((timeframe) => (
                            <Button
                                key={timeframe}
                                variant={activeTimeframe === timeframe ? "default" : "outline"}
                                size="sm"
                                className={cn(
                                    "text-xs px-2 min-w-[36px] h-8",
                                    activeTimeframe === timeframe
                                        ? "bg-[#F7931A] hover:bg-[#F7931A]/90 text-white"
                                        : "text-slate-600 dark:text-slate-400"
                                )}
                                onClick={() => handleTimeframeChange(timeframe)}
                            >
                                {timeframe}
                            </Button>
                        ))}
                    </div>
                </div>
            </CardHeader>

            {/* Chart */}
            <CardContent className="p-1 sm:p-2 md:p-4 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F7931A" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#F7931A" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.15} />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            axisLine={{ stroke: '#e2e8f0', strokeOpacity: 0.3 }}
                            stroke="#888"
                            strokeOpacity={0.3}
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            axisLine={{ stroke: '#e2e8f0', strokeOpacity: 0.3 }}
                            stroke="#888"
                            strokeOpacity={0.3}
                            domain={[(dataMin: number) => dataMin * 0.99, (dataMax: number) => dataMax * 1.01]}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            iconType="circle"
                            iconSize={8}
                            margin={{ top: 0, left: 0, right: 0, bottom: 10 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#F7931A"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            name="Vault Value"
                        />
                        <Area
                            type="monotone"
                            dataKey="cumulativeYield"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorYield)"
                            name="Cumulative Yield"
                        />
                        <Line
                            type="monotone"
                            dataKey="btcPrice"
                            stroke="#10b981"
                            strokeWidth={1.5}
                            dot={false}
                            activeDot={false}
                            name="BTC Price (scaled)"
                        />
                    </AreaChart>
                </ResponsiveContainer>

                {/* Summary stats below chart */}
                <div className="grid grid-cols-3 gap-4 mt-4 px-2">
                    <div className="text-center">
                        <div className="text-xs text-slate-500 dark:text-slate-400">Total Value</div>
                        <div className="font-bold text-slate-900 dark:text-white">0.3621 sBTC</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs text-slate-500 dark:text-slate-400">Total Yield</div>
                        <div className="font-bold text-[#F7931A]">0.0079 sBTC</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs text-slate-500 dark:text-slate-400">Daily Avg Yield</div>
                        <div className="font-bold text-green-600 dark:text-green-400">0.00022 sBTC</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

// Helper to generate mock chart data
function generateMockData(): ChartDataPoint[] {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const result: ChartDataPoint[] = [];
    const baseValue = 0.35; // starting value in sBTC
    const yieldPerDay = 0.00022; // daily yield in sBTC

    // Generate data for the past 30 days
    for (let i = 0; i < 30; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - (29 - i));

        const monthStr = months[date.getMonth()];
        const dayStr = date.getDate().toString();
        const dateStr = `${monthStr} ${dayStr}`;

        // Daily yield accumulates
        const cumulativeYield = yieldPerDay * (i + 1);
        // Value grows with the yield
        const value = baseValue + cumulativeYield;

        // Add some randomization to BTC price around $35000
        const btcPrice = 35000 + Math.random() * 2000 - 1000;

        result.push({
            date: dateStr,
            value,
            cumulativeYield,
            btcPrice: btcPrice / 10000 // Scaled down to fit with other values
        });
    }

    return result;
}

export default VaultPerformanceChart;