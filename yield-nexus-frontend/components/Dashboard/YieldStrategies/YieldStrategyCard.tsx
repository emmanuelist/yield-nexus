import React from 'react';
import { Zap, Shield, TrendingUp } from 'lucide-react';

// Define strategy types
type StrategyType = 'conservative' | 'balanced' | 'aggressive';

// Define the Strategy interface
interface Strategy {
    id: string;
    name: string;
    description: string;
    type: StrategyType;
    targetApy: string;
    riskLevel: number;
    rebalance: string;
}

// Define props interface
interface YieldStrategyCardProps {
    strategy: Strategy;
    isActive: boolean;
    onActivate: (id: string) => void;
}

const YieldStrategyCard: React.FC<YieldStrategyCardProps> = ({ strategy, isActive, onActivate }) => {
    const getStrategyIcon = (type: StrategyType) => {
        switch (type) {
            case 'conservative':
                return <Shield className="w-6 h-6 text-emerald-500 mr-2" />;
            case 'aggressive':
                return <TrendingUp className="w-6 h-6 text-orange-500 mr-2" />;
            case 'balanced':
            default:
                return <Zap className="w-6 h-6 text-amber-500 mr-2" />;
        }
    };

    const getBorderColor = (type: StrategyType): string => {
        if (isActive) return 'border-amber-200 dark:border-amber-600';

        switch (type) {
            case 'conservative':
                return 'border-emerald-100 dark:border-emerald-800';
            case 'aggressive':
                return 'border-orange-100 dark:border-orange-800';
            case 'balanced':
            default:
                return 'border-amber-100 dark:border-amber-800';
        }
    };

    const getBackgroundColor = (type: StrategyType): string => {
        if (isActive) return 'bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30';
        return 'bg-white dark:bg-slate-800/50';
    };

    return (
        <div className={`border rounded-lg p-5 relative ${getBorderColor(strategy.type)} ${getBackgroundColor(strategy.type)}`}>
            {isActive && (
                <div className="absolute top-0 right-0 mt-4 mr-4">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400 text-xs rounded-full font-medium">
                        Active
                    </span>
                </div>
            )}

            <div className="flex items-center mb-4">
                {getStrategyIcon(strategy.type)}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{strategy.name}</h3>
            </div>

            <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
                {strategy.description}
            </p>

            <div className="space-y-3 mb-5">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-slate-500">Target APY</span>
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">{strategy.targetApy}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-slate-500">Risk Level</span>
                    <div className="flex space-x-0.5">
                        {Array.from({ length: 5 }).map((_, i) => {
                            const getColor = () => {
                                if (strategy.type === 'conservative') return i < strategy.riskLevel ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-slate-600';
                                if (strategy.type === 'aggressive') return i < strategy.riskLevel ? 'bg-orange-500' : 'bg-gray-200 dark:bg-slate-600';
                                return i < strategy.riskLevel ? 'bg-amber-500' : 'bg-gray-200 dark:bg-slate-600';
                            };
                            
                            return (
                                <div
                                    key={i}
                                    className={`w-4 h-1.5 rounded-full ${getColor()}`}
                                ></div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-slate-500">Auto-Rebalance</span>
                    <span className="text-xs font-medium text-gray-700 dark:text-slate-300">{strategy.rebalance}</span>
                </div>
            </div>

            {isActive ? (
                <div className="grid grid-cols-2 gap-2">
                    <button className="text-xs px-3 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-600">
                        Edit
                    </button>
                    <button className="text-xs px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
                        View Details
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => onActivate(strategy.id)}
                    className="w-full text-xs px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    Activate Strategy
                </button>
            )}
        </div>
    );
};

export default YieldStrategyCard;