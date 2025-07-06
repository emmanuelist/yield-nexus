"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatisticCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    trend: {
        value: string;
        label?: string;
        positive: boolean;
    };
    bgGradient?: string;
    iconBg?: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
    title,
    value,
    icon,
    trend,
    bgGradient = "dark:from-slate-900/50 dark:to-slate-800/50",
    iconBg = "bg-slate-100 dark:bg-slate-800"
}) => {
    return (
        <Card className={cn(
            "border border-slate-200/60 dark:border-slate-800/60 shadow-sm overflow-hidden",
            "backdrop-blur-sm hover:shadow-md transition-all duration-300 relative"
        )}>
            <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 dark:opacity-80",
                bgGradient
            )} />

            <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</h3>
                    <div className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center",
                        iconBg
                    )}>
                        {icon}
                    </div>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {value}
                </div>
                <div className={cn(
                    "text-xs font-medium flex items-center",
                    trend.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}>
                    {trend.positive ? '↑' : '↓'} {trend.value}
                    {trend.label && (
                        <span className="text-slate-500 dark:text-slate-400 ml-1">{trend.label}</span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default StatisticCard;