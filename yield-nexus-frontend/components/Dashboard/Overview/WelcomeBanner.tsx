"use client";

import React from "react";
import { Bitcoin, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WelcomeBannerProps {
    userName?: string;
    className?: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
    userName = "",
    className
}) => {
    const displayName = userName || "to Yield Nexus";

    return (
        <Card className={cn(
            "overflow-hidden border-0 shadow-lg mb-6 relative",
            className
        )}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c1e5c]/95 to-[#192559]/95 dark:from-[#05102f]/95 dark:to-[#0d1431]/95" />

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
            </div>

            {/* Background glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F7931A]/20 rounded-full blur-[100px] -translate-y-3/4 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>

            <CardContent className="relative z-10 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div className="mb-4 sm:mb-0">
                        <div className="flex items-center">
                            <Bitcoin className="h-6 w-6 mr-3 text-[#F7931A]" />
                            <h1 className="text-2xl font-bold text-white">
                                Welcome {displayName}
                            </h1>
                        </div>
                        <p className="mt-2 text-indigo-200">
                            Your secure, non-custodial Bitcoin yield generation platform - currently earning <span className="font-semibold text-[#F7931A]">8.2% APY</span>
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            variant="outline"
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                            View Documentation
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button
                            className="bg-[#F7931A] hover:bg-[#F7931A]/90 text-white border-none"
                        >
                            Deposit sBTC
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default WelcomeBanner;