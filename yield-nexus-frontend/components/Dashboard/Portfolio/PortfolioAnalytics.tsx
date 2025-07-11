"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ComposedChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from "recharts";
import {
    Download,
    Target,
    AlertTriangle,
    Shield,
    TrendingDown
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

interface AnalyticsData {
    date: string;
    portfolioValue: number;
    benchmark: number;
    volatility: number;
    sharpe: number;
}

interface RiskMetric {
    metric: string;
    value: number;
    fullMark: number;
}

const PortfolioAnalytics: React.FC = () => {
    const [timeRange, setTimeRange] = useState("30d");
    const [analysisType, setAnalysisType] = useState("performance");

    const analyticsData: AnalyticsData[] = [
        { date: "Week 1", portfolioValue: 100, benchmark: 100, volatility: 5.2, sharpe: 1.1 },
        { date: "Week 2", portfolioValue: 102.3, benchmark: 101.1, volatility: 6.1, sharpe: 1.15 },
        { date: "Week 3", portfolioValue: 105.7, benchmark: 102.8, volatility: 7.3, sharpe: 1.22 },
        { date: "Week 4", portfolioValue: 108.2, benchmark: 104.2, volatility: 6.8, sharpe: 1.28 },
        { date: "Week 5", portfolioValue: 111.5, benchmark: 105.9, volatility: 8.1, sharpe: 1.24 },
        { date: "Week 6", portfolioValue: 114.3, benchmark: 107.3, volatility: 7.6, sharpe: 1.31 },
        { date: "Week 7", portfolioValue: 116.8, benchmark: 108.7, volatility: 6.9, sharpe: 1.35 },
        { date: "Week 8", portfolioValue: 119.4, benchmark: 110.2, volatility: 7.4, sharpe: 1.38 }
    ];

    const riskMetrics: RiskMetric[] = [
        { metric: "Volatility", value: 7.4, fullMark: 20 },
        { metric: "Sharpe Ratio", value: 13.8, fullMark: 20 },
        { metric: "Max Drawdown", value: 17.2, fullMark: 20 },
        { metric: "Beta", value: 8.5, fullMark: 20 },
        { metric: "Alpha", value: 12.3, fullMark: 20 },
        { metric: "Information Ratio", value: 11.7, fullMark: 20 }
    ];

    const performanceMetrics = {
        totalReturn: "19.4%",
        annualizedReturn: "24.8%",
        sharpeRatio: "1.38",
        sortinoRatio: "1.52",
        maxDrawdown: "-2.1%",
        calmarRatio: "11.8",
        beta: "0.85",
        alpha: "4.2%",
        volatility: "7.4%",
        winRate: "68.5%"
    };

    const strategyAllocation = [
        { name: "Balanced Yield", value: 45, color: "#F7931A" },
        { name: "Conservative", value: 30, color: "#10B981" },
        { name: "High Yield", value: 20, color: "#EF4444" },
        { name: "Liquid Staking", value: 5, color: "#3B82F6" }
    ];

    const correlationData = [
        { strategy: "Balanced", balanced: 1.0, conservative: 0.72, highYield: 0.45, liquid: 0.68 },
        { strategy: "Conservative", balanced: 0.72, conservative: 1.0, highYield: 0.23, liquid: 0.89 },
        { strategy: "High Yield", balanced: 0.45, conservative: 0.23, highYield: 1.0, liquid: 0.31 },
        { strategy: "Liquid", balanced: 0.68, conservative: 0.89, highYield: 0.31, liquid: 1.0 }
    ];

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
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Portfolio Analytics</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Advanced performance analysis and risk metrics
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
                            <SelectItem value="1y">1 Year</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="h-9">
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                    </Button>
                </div>
            </motion.div>

            {/* Performance Summary Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="text-center">
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Return</p>
                            <p className="text-xl font-bold text-green-600 dark:text-green-400">{performanceMetrics.totalReturn}</p>
                            <Badge className="mt-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
                                Outperforming
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="text-center">
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Sharpe Ratio</p>
                            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{performanceMetrics.sharpeRatio}</p>
                            <Badge className="mt-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                                Excellent
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="text-center">
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Max Drawdown</p>
                            <p className="text-xl font-bold text-red-600 dark:text-red-400">{performanceMetrics.maxDrawdown}</p>
                            <Badge className="mt-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
                                Low Risk
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="text-center">
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Volatility</p>
                            <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{performanceMetrics.volatility}</p>
                            <Badge className="mt-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                                Moderate
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-4">
                        <div className="text-center">
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Win Rate</p>
                            <p className="text-xl font-bold text-[#F7931A]">{performanceMetrics.winRate}</p>
                            <Badge className="mt-2 bg-[#F7931A]/10 text-[#F7931A] border-[#F7931A]/20">
                                Strong
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Performance vs Benchmark */}
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <Card className="border border-slate-200/60 dark:border-slate-800/60">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60 pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg text-slate-900 dark:text-white">Performance vs Benchmark</CardTitle>
                                    <CardDescription className="text-slate-500 dark:text-slate-400">
                                        Portfolio performance compared to market benchmark
                                    </CardDescription>
                                </div>
                                <Select value={analysisType} onValueChange={setAnalysisType}>
                                    <SelectTrigger className="w-36 h-8">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="performance">Performance</SelectItem>
                                        <SelectItem value="volatility">Volatility</SelectItem>
                                        <SelectItem value="risk-adjusted">Risk Adjusted</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={analyticsData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis 
                                            dataKey="date" 
                                            stroke="#64748b"
                                            fontSize={12}
                                        />
                                        <YAxis 
                                            stroke="#64748b"
                                            fontSize={12}
                                        />
                                        <Tooltip 
                                            labelStyle={{ color: '#1e293b' }}
                                            contentStyle={{
                                                backgroundColor: '#f8fafc',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="portfolioValue"
                                            stroke="#F7931A"
                                            strokeWidth={2}
                                            fill="#F7931A"
                                            fillOpacity={0.1}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="benchmark"
                                            stroke="#64748b"
                                            strokeWidth={2}
                                            strokeDasharray="5 5"
                                            dot={false}
                                        />
                                        {analysisType === "volatility" && (
                                            <Bar
                                                dataKey="volatility"
                                                fill="#8B5CF6"
                                                opacity={0.6}
                                                radius={[2, 2, 0, 0]}
                                            />
                                        )}
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Risk Analysis */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <Card className="border border-slate-200/60 dark:border-slate-800/60">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60 pb-3">
                            <CardTitle className="text-lg text-slate-900 dark:text-white">Risk Profile</CardTitle>
                            <CardDescription className="text-slate-500 dark:text-slate-400">
                                Portfolio risk metrics analysis
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart data={riskMetrics}>
                                        <PolarGrid stroke="#e2e8f0" />
                                        <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10 }} />
                                        <PolarRadiusAxis 
                                            angle={90} 
                                            domain={[0, 20]} 
                                            tick={{ fontSize: 8 }}
                                        />
                                        <Radar
                                            name="Risk Score"
                                            dataKey="value"
                                            stroke="#F7931A"
                                            fill="#F7931A"
                                            fillOpacity={0.2}
                                            strokeWidth={2}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 space-y-3">
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
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-slate-200/60 dark:border-slate-800/60">
                        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60 pb-3">
                            <CardTitle className="text-lg text-slate-900 dark:text-white">Strategy Distribution</CardTitle>
                            <CardDescription className="text-slate-500 dark:text-slate-400">
                                Current allocation breakdown
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="h-32 mb-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={strategyAllocation}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={30}
                                            outerRadius={60}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {strategyAllocation.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-2">
                                {strategyAllocation.map((strategy, index) => (
                                    <div key={strategy.name} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div 
                                                className="w-3 h-3 rounded-full" 
                                                style={{ backgroundColor: strategy.color }}
                                            ></div>
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{strategy.name}</span>
                                        </div>
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">{strategy.value}%</span>
                                    </div>
                                ))}
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
                                        <AreaChart data={analyticsData.slice(-6)}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                            <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                                            <YAxis stroke="#64748b" fontSize={12} />
                                            <Tooltip />
                                            <Area
                                                type="monotone"
                                                dataKey="portfolioValue"
                                                stroke="#F7931A"
                                                fill="#F7931A"
                                                fillOpacity={0.3}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="drawdown" className="p-4">
                                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                    <TrendingDown className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p className="text-lg font-medium mb-2">Drawdown Analysis</p>
                                    <p className="text-sm">Maximum drawdown: -2.1% | Recovery time: 5 days</p>
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="correlation" className="p-4">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left p-2">Strategy</th>
                                                <th className="text-center p-2">Balanced</th>
                                                <th className="text-center p-2">Conservative</th>
                                                <th className="text-center p-2">High Yield</th>
                                                <th className="text-center p-2">Liquid</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {correlationData.map((row, i) => (
                                                <tr key={i} className="border-b">
                                                    <td className="p-2 font-medium">{row.strategy}</td>
                                                    <td className="text-center p-2">{row.balanced.toFixed(2)}</td>
                                                    <td className="text-center p-2">{row.conservative.toFixed(2)}</td>
                                                    <td className="text-center p-2">{row.highYield.toFixed(2)}</td>
                                                    <td className="text-center p-2">{row.liquid.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="benchmarks" className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 border rounded-lg">
                                        <h3 className="font-medium text-slate-900 dark:text-white">vs Bitcoin HODLing</h3>
                                        <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">+8.2%</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Outperformance</p>
                                    </div>
                                    <div className="text-center p-4 border rounded-lg">
                                        <h3 className="font-medium text-slate-900 dark:text-white">vs DeFi Index</h3>
                                        <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">+3.7%</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Outperformance</p>
                                    </div>
                                    <div className="text-center p-4 border rounded-lg">
                                        <h3 className="font-medium text-slate-900 dark:text-white">vs sBTC Staking</h3>
                                        <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">+12.1%</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Outperformance</p>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default PortfolioAnalytics;