"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from "recharts";
import {
    TrendingUp,
    TrendingDown,
    Calendar,
    BarChart3,
    Activity,
    Target,
    Download,
    Filter,
    Zap,
    Shield,
    AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

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

interface PerformanceData {
    date: string;
    value: number;
    gains: number;
    apy: number;
}

interface StrategyPerformance {
    name: string;
    value: number;
    change: number;
    color: string;
}

const PortfolioPerformance: React.FC = () => {
    const [timeRange, setTimeRange] = useState("7d");
    const [selectedMetric, setSelectedMetric] = useState("value");

    // Mock performance data
    const performanceData: PerformanceData[] = [
        { date: "Jan 1", value: 1.0000, gains: 0.0000, apy: 0.0 },
        { date: "Jan 8", value: 1.0156, gains: 0.0156, apy: 8.1 },
        { date: "Jan 15", value: 1.0298, gains: 0.0298, apy: 7.8 },
        { date: "Jan 22", value: 1.0445, gains: 0.0445, apy: 8.3 },
        { date: "Jan 29", value: 1.0587, gains: 0.0587, apy: 8.0 },
        { date: "Feb 5", value: 1.0734, gains: 0.0734, apy: 8.5 },
        { date: "Feb 12", value: 1.0879, gains: 0.0879, apy: 8.2 },
        { date: "Feb 19", value: 1.1025, gains: 0.1025, apy: 8.1 },
        { date: "Feb 26", value: 1.1178, gains: 0.1178, apy: 8.4 },
        { date: "Mar 5", value: 1.1334, gains: 0.1334, apy: 8.2 },
        { date: "Mar 12", value: 1.1489, gains: 0.1489, apy: 8.3 },
        { date: "Today", value: 1.1645, gains: 0.1645, apy: 8.2 }
    ];

    const strategyPerformance: StrategyPerformance[] = [
        { name: "Balanced Yield", value: 45, change: 2.3, color: "#F7931A" },
        { name: "Conservative", value: 30, change: 1.8, color: "#10B981" },
        { name: "High Yield", value: 20, change: 4.2, color: "#EF4444" },
        { name: "Liquid Staking", value: 5, change: 1.1, color: "#3B82F6" }
    ];

    const COLORS = ["#F7931A", "#10B981", "#EF4444", "#3B82F6"];

    const metrics = {
        totalReturn: { value: "16.45%", change: "+2.3%", trend: "up" },
        sharpeRatio: { value: "1.24", change: "+0.12", trend: "up" },
        maxDrawdown: { value: "-2.1%", change: "+0.5%", trend: "up" },
        volatility: { value: "8.3%", change: "-0.7%", trend: "down" }
    };

    const formatTooltipValue = (value: number, name: string) => {
        if (name === "apy") return [`${value.toFixed(1)}%`, "APY"];
        if (name === "gains") return [`${value.toFixed(4)} sBTC`, "Gains"];
        return [`${value.toFixed(4)} sBTC`, "Value"];
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
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Portfolio Performance</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Detailed analytics and performance metrics
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-32 h-9">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1d">1 Day</SelectItem>
                            <SelectItem value="7d">7 Days</SelectItem>
                            <SelectItem value="30d">30 Days</SelectItem>
                            <SelectItem value="90d">90 Days</SelectItem>
                            <SelectItem value="1y">1 Year</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="h-9">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>
            </motion.div>

            {/* Performance Metrics */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Return</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{metrics.totalReturn.value}</p>
                                <div className="flex items-center mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">{metrics.totalReturn.change}</span>
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
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Sharpe Ratio</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{metrics.sharpeRatio.value}</p>
                                <div className="flex items-center mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">{metrics.sharpeRatio.change}</span>
                                </div>
                            </div>
                            <div className="p-2 rounded-lg bg-blue-500/10">
                                <BarChart3 className="h-5 w-5 text-blue-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Max Drawdown</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{metrics.maxDrawdown.value}</p>
                                <div className="flex items-center mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">{metrics.maxDrawdown.change}</span>
                                </div>
                            </div>
                            <div className="p-2 rounded-lg bg-red-500/10">
                                <TrendingDown className="h-5 w-5 text-red-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Volatility</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{metrics.volatility.value}</p>
                                <div className="flex items-center mt-1">
                                    <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">{metrics.volatility.change}</span>
                                </div>
                            </div>
                            <div className="p-2 rounded-lg bg-purple-500/10">
                                <Activity className="h-5 w-5 text-purple-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Performance Chart */}
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <Card className="border border-slate-200/60 dark:border-slate-800/60">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60 pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg text-slate-900 dark:text-white">Performance Chart</CardTitle>
                                    <CardDescription className="text-slate-500 dark:text-slate-400">
                                        Portfolio value over time
                                    </CardDescription>
                                </div>
                                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                                    <SelectTrigger className="w-32 h-8">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="value">Value</SelectItem>
                                        <SelectItem value="gains">Gains</SelectItem>
                                        <SelectItem value="apy">APY</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={performanceData}>
                                        <defs>
                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#F7931A" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#F7931A" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis 
                                            dataKey="date" 
                                            stroke="#64748b"
                                            fontSize={12}
                                        />
                                        <YAxis 
                                            stroke="#64748b"
                                            fontSize={12}
                                            tickFormatter={(value) => selectedMetric === "apy" ? `${value}%` : `${value.toFixed(3)}`}
                                        />
                                        <Tooltip 
                                            formatter={formatTooltipValue}
                                            labelStyle={{ color: '#1e293b' }}
                                            contentStyle={{
                                                backgroundColor: '#f8fafc',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey={selectedMetric}
                                            stroke="#F7931A"
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorValue)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Strategy Distribution */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <Card className="border border-slate-200/60 dark:border-slate-800/60">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60 pb-3">
                            <CardTitle className="text-lg text-slate-900 dark:text-white">Strategy Performance</CardTitle>
                            <CardDescription className="text-slate-500 dark:text-slate-400">
                                Individual strategy returns
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="h-48 mb-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={strategyPerformance}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {strategyPerformance.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-3">
                                {strategyPerformance.map((strategy, index) => (
                                    <div key={strategy.name} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div 
                                                className="w-3 h-3 rounded-full" 
                                                style={{ backgroundColor: COLORS[index] }}
                                            ></div>
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{strategy.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">{strategy.value}%</div>
                                            <div className={cn(
                                                "text-xs font-medium",
                                                strategy.change > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                            )}>
                                                {strategy.change > 0 ? "+" : ""}{strategy.change}%
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-slate-200/60 dark:border-slate-800/60">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60 pb-3">
                            <CardTitle className="text-lg text-slate-900 dark:text-white">Risk Analysis</CardTitle>
                            <CardDescription className="text-slate-500 dark:text-slate-400">
                                Portfolio risk metrics
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Shield className="h-4 w-4 text-green-500" />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Risk Score</span>
                                </div>
                                <Badge className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
                                    Low
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Target className="h-4 w-4 text-blue-500" />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Beta</span>
                                </div>
                                <span className="text-sm font-medium text-slate-900 dark:text-white">0.85</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">VaR (95%)</span>
                                </div>
                                <span className="text-sm font-medium text-slate-900 dark:text-white">-3.2%</span>
                            </div>
                            <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-center space-x-2">
                                    <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Optimization Tip</span>
                                </div>
                                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                    Consider rebalancing to reduce exposure to high-risk strategies.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Detailed Analytics Tabs */}
            <motion.div variants={itemVariants}>
                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60 pb-3">
                        <CardTitle className="text-lg text-slate-900 dark:text-white">Detailed Analytics</CardTitle>
                        <CardDescription className="text-slate-500 dark:text-slate-400">
                            Advanced performance metrics and comparisons
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Tabs defaultValue="returns" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <TabsTrigger value="returns" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">Returns</TabsTrigger>
                                <TabsTrigger value="drawdown" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">Drawdown</TabsTrigger>
                                <TabsTrigger value="correlation" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">Correlation</TabsTrigger>
                                <TabsTrigger value="benchmarks" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">Benchmarks</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="returns" className="p-4">
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={performanceData.slice(-6)}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                            <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                                            <YAxis stroke="#64748b" fontSize={12} />
                                            <Tooltip />
                                            <Bar dataKey="gains" fill="#F7931A" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="drawdown" className="p-4">
                                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                    <TrendingDown className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>Drawdown analysis will be displayed here</p>
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="correlation" className="p-4">
                                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>Strategy correlation matrix will be displayed here</p>
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="benchmarks" className="p-4">
                                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                    <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>Benchmark comparison will be displayed here</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default PortfolioPerformance;