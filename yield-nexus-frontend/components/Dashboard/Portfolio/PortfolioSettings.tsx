"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    AlertTriangle,
    Save,
    RotateCcw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const PortfolioSettings: React.FC = () => {
    const [autoRebalance, setAutoRebalance] = useState(true);
    const [autoCompound, setAutoCompound] = useState(true);
    const [riskTolerance, setRiskTolerance] = useState([65]);
    const [rebalanceThreshold, setRebalanceThreshold] = useState([5]);
    const [maxAllocation, setMaxAllocation] = useState([40]);
    const [emergencyMode, setEmergencyMode] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const { toast } = useToast();

    const handleSaveSettings = () => {
        setHasUnsavedChanges(false);
        toast({
            title: "Portfolio settings saved",
            description: "Your portfolio configuration has been updated successfully.",
        });
    };

    const handleResetSettings = () => {
        setAutoRebalance(true);
        setAutoCompound(true);
        setRiskTolerance([65]);
        setRebalanceThreshold([5]);
        setMaxAllocation([40]);
        setEmergencyMode(false);
        setHasUnsavedChanges(false);
        toast({
            title: "Settings reset",
            description: "All portfolio settings have been reset to default values.",
        });
    };

    const markUnsaved = () => {
        setHasUnsavedChanges(true);
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
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Portfolio Settings</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Configure your portfolio automation and risk management
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {hasUnsavedChanges && (
                        <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                            Unsaved Changes
                        </Badge>
                    )}
                    <Button variant="outline" size="sm" onClick={handleResetSettings} className="h-9">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                    </Button>
                    <Button size="sm" onClick={handleSaveSettings} className="h-9 bg-gradient-to-r from-[#F7931A] to-amber-600 hover:from-[#F7931A]/90 hover:to-amber-700 text-white border-none">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </Button>
                </div>
            </motion.div>

            {/* Settings Tabs */}
            <motion.div variants={itemVariants}>
                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-0">
                        <Tabs defaultValue="automation" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <TabsTrigger value="automation" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">Automation</TabsTrigger>
                                <TabsTrigger value="risk" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">Risk Management</TabsTrigger>
                                <TabsTrigger value="notifications" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">Notifications</TabsTrigger>
                            </TabsList>
                            
                            {/* Automation Settings */}
                            <TabsContent value="automation" className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Portfolio Automation</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <Label className="text-base font-medium text-slate-900 dark:text-white">Auto-Rebalancing</Label>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                                    Automatically rebalance portfolio when allocations drift from targets
                                                </p>
                                            </div>
                                            <Switch 
                                                checked={autoRebalance} 
                                                onCheckedChange={(checked) => {
                                                    setAutoRebalance(checked);
                                                    markUnsaved();
                                                }}
                                            />
                                        </div>

                                        {autoRebalance && (
                                            <div className="ml-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Rebalance Threshold</Label>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                                                    Trigger rebalancing when allocation drifts by this percentage
                                                </p>
                                                <div className="space-y-2">
                                                    <Slider
                                                        value={rebalanceThreshold}
                                                        onValueChange={(value) => {
                                                            setRebalanceThreshold(value);
                                                            markUnsaved();
                                                        }}
                                                        max={20}
                                                        min={1}
                                                        step={1}
                                                        className="w-full"
                                                    />
                                                    <div className="flex justify-between text-xs text-slate-500">
                                                        <span>1%</span>
                                                        <span className="font-medium text-[#F7931A]">{rebalanceThreshold[0]}%</span>
                                                        <span>20%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <Label className="text-base font-medium text-slate-900 dark:text-white">Auto-Compound Rewards</Label>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                                    Automatically reinvest rewards back into strategies
                                                </p>
                                            </div>
                                            <Switch 
                                                checked={autoCompound} 
                                                onCheckedChange={(checked) => {
                                                    setAutoCompound(checked);
                                                    markUnsaved();
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Strategy Allocation Rules</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-base font-medium text-slate-900 dark:text-white">Maximum Single Strategy Allocation</Label>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                                                Limit maximum percentage allocated to any single strategy
                                            </p>
                                            <div className="space-y-2">
                                                <Slider
                                                    value={maxAllocation}
                                                    onValueChange={(value) => {
                                                        setMaxAllocation(value);
                                                        markUnsaved();
                                                    }}
                                                    max={100}
                                                    min={10}
                                                    step={5}
                                                    className="w-full"
                                                />
                                                <div className="flex justify-between text-xs text-slate-500">
                                                    <span>10%</span>
                                                    <span className="font-medium text-[#F7931A]">{maxAllocation[0]}%</span>
                                                    <span>100%</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Minimum Strategy Allocation</Label>
                                                <Input type="number" placeholder="5" className="mt-2" />
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Minimum percentage per strategy</p>
                                            </div>
                                            <div>
                                                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Maximum Active Strategies</Label>
                                                <Input type="number" placeholder="5" className="mt-2" />
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Maximum number of strategies</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Display Preferences</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Currency Display</Label>
                                            <Select defaultValue="sbtc">
                                                <SelectTrigger className="w-full mt-2">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="sbtc">sBTC</SelectItem>
                                                    <SelectItem value="usd">USD</SelectItem>
                                                    <SelectItem value="both">Both</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Decimal Precision</Label>
                                            <Select defaultValue="6">
                                                <SelectTrigger className="w-full mt-2">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="4">4 decimals</SelectItem>
                                                    <SelectItem value="6">6 decimals</SelectItem>
                                                    <SelectItem value="8">8 decimals</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            
                            {/* Risk Management */}
                            <TabsContent value="risk" className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Risk Parameters</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <Label className="text-base font-medium text-slate-900 dark:text-white">Risk Tolerance</Label>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                                                Adjust your overall risk appetite (higher = more aggressive strategies)
                                            </p>
                                            <div className="space-y-2">
                                                <Slider
                                                    value={riskTolerance}
                                                    onValueChange={(value) => {
                                                        setRiskTolerance(value);
                                                        markUnsaved();
                                                    }}
                                                    max={100}
                                                    min={0}
                                                    step={5}
                                                    className="w-full"
                                                />
                                                <div className="flex justify-between text-xs text-slate-500">
                                                    <span>Conservative</span>
                                                    <span className="font-medium text-[#F7931A]">{riskTolerance[0]}%</span>
                                                    <span>Aggressive</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Stop Loss Threshold</Label>
                                                <Input type="number" placeholder="10" className="mt-2" />
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Percentage loss to trigger stop loss</p>
                                            </div>
                                            <div>
                                                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Take Profit Threshold</Label>
                                                <Input type="number" placeholder="25" className="mt-2" />
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Percentage gain to trigger profit taking</p>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="flex items-center space-x-2">
                                                        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                                                        <Label className="text-base font-medium text-red-800 dark:text-red-200">Emergency Mode</Label>
                                                    </div>
                                                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                                        Pause all automated actions and require manual approval
                                                    </p>
                                                </div>
                                                <Switch 
                                                    checked={emergencyMode} 
                                                    onCheckedChange={(checked) => {
                                                        setEmergencyMode(checked);
                                                        markUnsaved();
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Portfolio Limits</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Daily Transaction Limit</Label>
                                            <Input type="number" placeholder="10" className="mt-2" />
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Maximum transactions per day</p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Daily Volume Limit</Label>
                                            <Input type="number" placeholder="1.0" className="mt-2" />
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Maximum sBTC volume per day</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Risk Monitoring</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-base font-medium text-slate-900 dark:text-white">Real-time Risk Alerts</Label>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Monitor portfolio risk in real-time</p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-base font-medium text-slate-900 dark:text-white">Volatility Tracking</Label>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Track portfolio volatility changes</p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-base font-medium text-slate-900 dark:text-white">Correlation Monitoring</Label>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Monitor strategy correlation changes</p>
                                            </div>
                                            <Switch />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            
                            {/* Portfolio Notifications */}
                            <TabsContent value="notifications" className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Portfolio Notifications</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-base font-medium text-slate-900 dark:text-white">Rebalance Notifications</Label>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Get notified when portfolio is rebalanced</p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-base font-medium text-slate-900 dark:text-white">Strategy Change Alerts</Label>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Notifications when strategies are modified</p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-base font-medium text-slate-900 dark:text-white">Performance Alerts</Label>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Alerts for significant performance changes</p>
                                            </div>
                                            <Switch />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-base font-medium text-slate-900 dark:text-white">Risk Threshold Alerts</Label>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Notifications when risk limits are approached</p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-base font-medium text-slate-900 dark:text-white">Reward Notifications</Label>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Alerts when new rewards are available</p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Reporting Preferences</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Performance Reporting Frequency</Label>
                                            <Select defaultValue="weekly">
                                                <SelectTrigger className="w-full mt-2">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="daily">Daily</SelectItem>
                                                    <SelectItem value="weekly">Weekly</SelectItem>
                                                    <SelectItem value="monthly">Monthly</SelectItem>
                                                    <SelectItem value="never">Never</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Chart Time Range Default</Label>
                                            <Select defaultValue="30d">
                                                <SelectTrigger className="w-full mt-2">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="7d">7 Days</SelectItem>
                                                    <SelectItem value="30d">30 Days</SelectItem>
                                                    <SelectItem value="90d">90 Days</SelectItem>
                                                    <SelectItem value="1y">1 Year</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Alert Thresholds</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Performance Change Alert</Label>
                                            <Input type="number" placeholder="5" className="mt-2" />
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Alert when performance changes by this %</p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Risk Level Alert</Label>
                                            <Input type="number" placeholder="80" className="mt-2" />
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Alert when risk level exceeds this %</p>
                                        </div>
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

export default PortfolioSettings;