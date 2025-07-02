import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Wallet, Zap } from "lucide-react";

interface QuickActionsCardProps {
    className?: string;
    onDeposit?: () => void;
    onWithdraw?: () => void;
    onClaimRewards?: () => void;
}

const QuickActionsCard: React.FC<QuickActionsCardProps> = ({
    className,
    onDeposit,
    onWithdraw,
    onClaimRewards
}) => {
    return (
        <Card className={cn(
            "overflow-hidden border border-slate-200/60 dark:border-slate-800/60 shadow-md",
            className
        )}>
            {/* Card Header with gradient */}
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 border-b border-slate-200 dark:border-slate-800/60">
                <CardTitle className="text-xl text-slate-900 dark:text-white">Quick Actions</CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400">
                    Manage your sBTC deposits and rewards
                </CardDescription>
            </CardHeader>

            {/* Actions */}
            <CardContent className="p-4 space-y-3">
                <Button
                    className="w-full bg-gradient-to-r from-[#F7931A] to-amber-600 hover:from-[#F7931A]/90 hover:to-amber-700 text-white border-none h-10 shadow-md shadow-amber-500/10"
                    onClick={onDeposit}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Deposit sBTC
                </Button>

                <Button
                    variant="outline"
                    className="w-full border-[#F7931A]/20 text-[#F7931A] hover:bg-[#F7931A]/5 h-10 shadow-sm"
                    onClick={onWithdraw}
                >
                    <Wallet className="h-4 w-4 mr-2" />
                    Withdraw
                </Button>

                <Button
                    variant="outline"
                    className="w-full text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/40 hover:bg-purple-50 dark:hover:bg-purple-900/20 h-10 shadow-sm"
                    onClick={onClaimRewards}
                >
                    <Zap className="h-4 w-4 mr-2 text-purple-500" />
                    Claim Rewards
                </Button>

                {/* Additional section showing potential earnings */}
                <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800/60">
                    <div className="rounded-lg bg-[#F7931A]/5 dark:bg-[#F7931A]/10 border border-[#F7931A]/20 p-3">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Current APY</span>
                            <span className="text-sm font-bold text-[#F7931A]">8.2%</span>
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                            Deposit 1 sBTC to earn <span className="font-semibold text-[#F7931A]">~0.00022 sBTC</span> daily
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default QuickActionsCard;