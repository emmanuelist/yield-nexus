"use client";

import React from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SecurityFeature {
    name: string;
    status: string | React.ReactNode;
    isActive: boolean;
}

interface SecurityStatusCardProps {
    className?: string;
    securityFeatures?: SecurityFeature[];
}

const SecurityStatusCard: React.FC<SecurityStatusCardProps> = ({
    className,
    securityFeatures = [
        {
            name: "Non-custodial",
            status: "Active",
            isActive: true
        },
        {
            name: "Multi-signature",
            status: "2/3",
            isActive: true
        },
        {
            name: "Last Audit",
            status: "14 days ago",
            isActive: true
        },
        {
            name: "Nexus Status",
            status: "Healthy",
            isActive: true
        }
    ]
}) => {
    return (
        <Card className={cn(
            "overflow-hidden border border-slate-200/60 dark:border-slate-800/60 shadow-md",
            className
        )}>
            {/* Card Header with gradient */}
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl text-slate-900 dark:text-white">Security Status</CardTitle>
                        <CardDescription className="text-slate-500 dark:text-slate-400 mt-1">
                            Your vault security and status
                        </CardDescription>
                    </div>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-none">
                        Secure
                    </Badge>
                </div>
            </CardHeader>

            {/* Security Features List */}
            <CardContent className="p-4">
                <div className="space-y-4">
                    {securityFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <ShieldCheck className={cn(
                                    "h-5 w-5 mr-2",
                                    feature.isActive ? "text-green-500" : "text-amber-500"
                                )} />
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {feature.name}
                                </span>
                            </div>

                            {typeof feature.status === 'string' ? (
                                feature.name === "Last Audit" ? (
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        {feature.status}
                                    </span>
                                ) : (
                                    <Badge variant="outline" className={cn(
                                        "bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800/50"
                                    )}>
                                        {feature.status}
                                    </Badge>
                                )
                            ) : (
                                feature.status
                            )}
                        </div>
                    ))}
                </div>

                {/* Animated security indicator */}
                <div className="mt-6 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 rounded-lg border border-green-200 dark:border-green-800/40">
                    <div className="flex items-center mb-2">
                        <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">Nexus Health: Excellent</span>
                    </div>

                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                            style={{
                                width: '94%',
                                animation: 'pulse 2s infinite'
                            }}
                        />
                    </div>

                    <style jsx>{`
                        @keyframes pulse {
                            0% { opacity: 0.8; }
                            50% { opacity: 1; }
                            100% { opacity: 0.8; }
                        }
                    `}</style>
                </div>
            </CardContent>

            {/* Card Footer */}
            <CardFooter className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-t border-slate-200 dark:border-slate-800/60 py-3 flex justify-center">
                <Button
                    variant="link"
                    className="p-0 h-auto text-sm text-[#F7931A] hover:text-[#F7931A]/80 font-medium"
                >
                    View Security Details
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default SecurityStatusCard;