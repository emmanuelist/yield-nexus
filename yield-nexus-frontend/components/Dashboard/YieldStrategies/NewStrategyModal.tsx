"use client";

import React, { useState } from 'react';
import {
    Zap,
    Shield,
    TrendingUp,
    X,
    Info,
    AlertTriangle,
    ChevronRight,
    RefreshCw,
} from 'lucide-react';

// Define strategy types
type StrategyType = 'conservative' | 'balanced' | 'aggressive';

// Define rebalance frequency types
type RebalanceFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly';

// Risk tolerance slider options
type RiskTolerance = 1 | 2 | 3 | 4 | 5;

interface ProtocolAllocation {
    id: string;
    name: string;
    symbol: string;
    percentage: number;
    apy: number;
    riskLevel: number;
}

interface NewStrategyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (strategy: any) => void;
    availableProtocols: Array<{
        id: string;
        name: string;
        symbol: string;
        apy: number;
        riskLevel: number;
    }>;
}

const NewStrategyModal: React.FC<NewStrategyModalProps> = ({
    isOpen,
    onClose,
    onSave,
    availableProtocols
}) => {
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
    const [strategyName, setStrategyName] = useState<string>('');
    const [strategyType, setStrategyType] = useState<StrategyType>('balanced');
    const [riskTolerance, setRiskTolerance] = useState<RiskTolerance>(3);
    const [rebalanceFrequency, setRebalanceFrequency] = useState<RebalanceFrequency>('weekly');
    const [autoRebalance, setAutoRebalance] = useState<boolean>(true);
    const [autoCompound, setAutoCompound] = useState<boolean>(true);
    const [targetApy, setTargetApy] = useState<number>(8);
    const [allocations, setAllocations] = useState<ProtocolAllocation[]>([]);
    const [customAllocation, setCustomAllocation] = useState<boolean>(false);

    // Reset form when modal is opened
    React.useEffect(() => {
        if (isOpen) {
            setCurrentStep(1);
            setStrategyName('');
            setStrategyType('balanced');
            setRiskTolerance(3);
            setRebalanceFrequency('weekly');
            setAutoRebalance(true);
            setAutoCompound(true);
            setTargetApy(8);
            setAllocations([]);
            setCustomAllocation(false);
        }
    }, [isOpen]);

    // Generate suggested allocations based on strategy type and risk tolerance
    React.useEffect(() => {
        if (!customAllocation) {
            const suggestedAllocations = generateSuggestedAllocations();
            setAllocations(suggestedAllocations);
        }
    }, [strategyType, riskTolerance, customAllocation]);

    const generateSuggestedAllocations = (): ProtocolAllocation[] => {
        // Filter protocols based on risk tolerance
        let suitableProtocols = [...availableProtocols];

        if (strategyType === 'conservative') {
            suitableProtocols = suitableProtocols.filter(p => p.riskLevel <= 3);
        } else if (strategyType === 'aggressive') {
            suitableProtocols = suitableProtocols.sort((a, b) => b.apy - a.apy);
        }

        // Limit to top 3-4 protocols
        suitableProtocols = suitableProtocols.slice(0, 4);

        // Assign percentages based on strategy type
        const allocations: ProtocolAllocation[] = [];
        let remainingPercentage = 100;

        suitableProtocols.forEach((protocol, index) => {
            let percentage = 0;

            if (strategyType === 'conservative') {
                // Conservative: More evenly distributed
                percentage = index === 0 ? 40 : (remainingPercentage / (suitableProtocols.length - index));
            } else if (strategyType === 'balanced') {
                // Balanced: Moderate concentration
                percentage = index === 0 ? 45 : (remainingPercentage / (suitableProtocols.length - index));
            } else {
                // Aggressive: Higher concentration in top protocols
                percentage = index === 0 ? 60 : (remainingPercentage / (suitableProtocols.length - index));
            }

            percentage = Math.round(percentage);
            remainingPercentage -= percentage;

            allocations.push({
                id: protocol.id,
                name: protocol.name,
                symbol: protocol.symbol,
                percentage,
                apy: protocol.apy,
                riskLevel: protocol.riskLevel
            });
        });

        // Make sure percentages add up to 100%
        const totalPercentage = allocations.reduce((sum, item) => sum + item.percentage, 0);
        if (totalPercentage !== 100 && allocations.length > 0) {
            allocations[0].percentage += (100 - totalPercentage);
        }

        return allocations;
    };

    const updateAllocation = (id: string, percentage: number) => {
        setCustomAllocation(true);

        const updatedAllocations = allocations.map(a =>
            a.id === id ? { ...a, percentage } : a
        );

        // Calculate how much we're over/under 100%
        const totalPercentage = updatedAllocations.reduce((sum, item) => sum + item.percentage, 0);
        const diff = 100 - totalPercentage;

        if (diff !== 0 && updatedAllocations.length > 1) {
            // Distribute the difference proportionally among other allocations
            const remainingAllocations = updatedAllocations.filter(a => a.id !== id);
            const remainingTotal = remainingAllocations.reduce((sum, item) => sum + item.percentage, 0);

            if (remainingTotal > 0) {
                updatedAllocations.forEach(allocation => {
                    if (allocation.id !== id) {
                        const share = allocation.percentage / remainingTotal;
                        allocation.percentage = Math.max(0, Math.round(allocation.percentage + diff * share));
                    }
                });
            }
        }

        setAllocations(updatedAllocations);
    };

    const estimatedApy = React.useMemo(() => {
        if (allocations.length === 0) return 0;

        return allocations.reduce((sum, allocation) => {
            return sum + (allocation.apy * (allocation.percentage / 100));
        }, 0).toFixed(2);
    }, [allocations]);

    const estimatedRiskLevel = React.useMemo(() => {
        if (allocations.length === 0) return 1;

        const weightedRisk = allocations.reduce((sum, allocation) => {
            return sum + (allocation.riskLevel * (allocation.percentage / 100));
        }, 0);

        return Math.round(weightedRisk);
    }, [allocations]);

    const getStrategyIcon = (type: StrategyType) => {
        switch (type) {
            case 'conservative':
                return <Shield className="w-5 h-5 text-emerald-500" />;
            case 'aggressive':
                return <TrendingUp className="w-5 h-5 text-orange-500" />;
            case 'balanced':
            default:
                return <Zap className="w-5 h-5 text-amber-500" />;
        }
    };

    const handleNextStep = () => {
        if (currentStep < 3) {
            setCurrentStep((prev) => (prev === 1 ? 2 : 3) as 1 | 2 | 3);
        } else {
            handleSave();
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => (prev === 3 ? 2 : 1) as 1 | 2 | 3);
        }
    };

    const handleSave = () => {
        const newStrategy = {
            id: `strategy-${Date.now()}`,
            name: strategyName || `${strategyType.charAt(0).toUpperCase() + strategyType.slice(1)} Strategy`,
            type: strategyType,
            riskLevel: riskTolerance,
            rebalanceFrequency,
            autoRebalance,
            autoCompound,
            targetApy,
            allocations,
            estimatedApy: typeof estimatedApy === 'string' ? parseFloat(estimatedApy) : estimatedApy,
            createdAt: new Date().toISOString(),
            active: false
        };

        onSave(newStrategy);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div className="fixed inset-0 transition-opacity bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75" onClick={onClose}></div>

                {/* Modal panel */}
                <div className="inline-block w-full max-w-3xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white dark:bg-slate-900 rounded-lg shadow-xl sm:my-8 sm:align-middle sm:p-6">
                    <div className="absolute top-0 right-0 pt-4 pr-4">
                        <button
                            type="button"
                            className="text-gray-400 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-md hover:text-gray-500 dark:hover:text-slate-300 focus:outline-none"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close</span>
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="sm:flex sm:items-start">
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-900/30 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                            <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                Create New Yield Strategy
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                                Design a custom sBTC yield strategy that matches your risk tolerance and goals.
                            </p>
                        </div>
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-5 mb-8">
                        <div className="flex justify-between">
                            <span className={`text-xs font-medium ${currentStep >= 1 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-slate-500'}`}>Strategy Type</span>
                            <span className={`text-xs font-medium ${currentStep >= 2 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-slate-500'}`}>Allocation</span>
                            <span className={`text-xs font-medium ${currentStep >= 3 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-slate-500'}`}>Review & Save</span>
                        </div>
                        <div className="w-full h-2 mt-2 bg-gray-200 dark:bg-slate-700 rounded-full">
                            <div
                                className="h-2 bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-300"
                                style={{ width: `${(currentStep / 3) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Step 1: Strategy Type */}
                    {currentStep === 1 && (
                        <div className="mt-5">
                            <div className="mb-6">
                                <label htmlFor="strategy-name" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                                    Strategy Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="strategy-name"
                                    className="block w-full px-3 py-2 mt-1 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="My Custom Strategy"
                                    value={strategyName}
                                    onChange={(e) => setStrategyName(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                                    Strategy Type
                                </label>
                                <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-3">
                                    <div
                                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${strategyType === 'conservative'
                                            ? 'border-emerald-300 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                                            : 'border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800'
                                            }`}
                                        onClick={() => setStrategyType('conservative')}
                                    >
                                        <div className="flex items-center mb-2">
                                            <Shield className="w-5 h-5 text-emerald-500 mr-2" />
                                            <h4 className="text-base font-medium text-gray-900 dark:text-white">Conservative</h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-slate-400">
                                            Prioritizes capital preservation with stable but modest yields. Lower risk exposure.
                                        </p>
                                        <div className="mt-3 flex justify-between items-center">
                                            <div className="flex space-x-0.5">
                                                <div className="w-4 h-1.5 rounded-full bg-emerald-500"></div>
                                                <div className="w-4 h-1.5 rounded-full bg-emerald-500"></div>
                                                <div className="w-4 h-1.5 rounded-full bg-gray-200 dark:bg-slate-600"></div>
                                                <div className="w-4 h-1.5 rounded-full bg-gray-200 dark:bg-slate-600"></div>
                                                <div className="w-4 h-1.5 rounded-full bg-gray-200 dark:bg-slate-600"></div>
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-slate-400">4-6% APY</span>
                                        </div>
                                    </div>

                                    <div
                                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${strategyType === 'balanced'
                                            ? 'border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20'
                                            : 'border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800'
                                            }`}
                                        onClick={() => setStrategyType('balanced')}
                                    >
                                        <div className="flex items-center mb-2">
                                            <Zap className="w-5 h-5 text-amber-500 mr-2" />
                                            <h4 className="text-base font-medium text-gray-900 dark:text-white">Balanced</h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-slate-400">
                                            Balanced approach with moderate yield and risk. Good for most investors.
                                        </p>
                                        <div className="mt-3 flex justify-between items-center">
                                            <div className="flex space-x-0.5">
                                                <div className="w-4 h-1.5 rounded-full bg-amber-500"></div>
                                                <div className="w-4 h-1.5 rounded-full bg-amber-500"></div>
                                                <div className="w-4 h-1.5 rounded-full bg-amber-500"></div>
                                                <div className="w-4 h-1.5 rounded-full bg-gray-200 dark:bg-slate-600"></div>
                                                <div className="w-4 h-1.5 rounded-full bg-gray-200 dark:bg-slate-600"></div>
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-slate-400">7-9% APY</span>
                                        </div>
                                    </div>

                                    <div
                                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${strategyType === 'aggressive'
                                            ? 'border-orange-300 dark:border-orange-600 bg-orange-50 dark:bg-orange-900/20'
                                            : 'border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800'
                                            }`}
                                        onClick={() => setStrategyType('aggressive')}
                                    >
                                        <div className="flex items-center mb-2">
                                            <TrendingUp className="w-5 h-5 text-orange-500 mr-2" />
                                            <h4 className="text-base font-medium text-gray-900 dark:text-white">Aggressive</h4>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-slate-400">
                                            Maximizes yield potential with higher risk tolerance. May use leverage.
                                        </p>
                                        <div className="mt-3 flex justify-between items-center">
                                            <div className="flex space-x-0.5">
                                                <div className="w-4 h-1.5 rounded-full bg-orange-500"></div>
                                                <div className="w-4 h-1.5 rounded-full bg-orange-500"></div>
                                                <div className="w-4 h-1.5 rounded-full bg-orange-500"></div>
                                                <div className="w-4 h-1.5 rounded-full bg-orange-500"></div>
                                                <div className="w-4 h-1.5 rounded-full bg-orange-500"></div>
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-slate-400">10-12%+ APY</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                                    Risk Tolerance
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        step="1"
                                        value={riskTolerance}
                                        onChange={(e) => setRiskTolerance(parseInt(e.target.value) as RiskTolerance)}
                                        className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-slate-400">
                                        <span>Low Risk</span>
                                        <span>Medium Risk</span>
                                        <span>High Risk</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                                    Auto-Rebalance Frequency
                                </label>
                                <div className="grid grid-cols-2 gap-3 mt-2 sm:grid-cols-4">
                                    {(['daily', 'weekly', 'monthly', 'quarterly'] as RebalanceFrequency[]).map((frequency) => (
                                        <button
                                            key={frequency}
                                            type="button"
                                            className={`px-3 py-2 text-sm font-medium rounded-md ${rebalanceFrequency === frequency
                                                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                                                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700'
                                                }`}
                                            onClick={() => setRebalanceFrequency(frequency)}
                                        >
                                            {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6 flex flex-col space-y-4">
                                <div className="flex items-center">
                                    <input
                                        id="auto-rebalance"
                                        type="checkbox"
                                        className="w-4 h-4 text-indigo-600 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded focus:ring-indigo-500"
                                        checked={autoRebalance}
                                        onChange={(e) => setAutoRebalance(e.target.checked)}
                                    />
                                    <label htmlFor="auto-rebalance" className="ml-2 block text-sm text-gray-900 dark:text-white">
                                        Auto-Rebalance to maintain desired allocation
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="auto-compound"
                                        type="checkbox"
                                        className="w-4 h-4 text-indigo-600 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded focus:ring-indigo-500"
                                        checked={autoCompound}
                                        onChange={(e) => setAutoCompound(e.target.checked)}
                                    />
                                    <label htmlFor="auto-compound" className="ml-2 block text-sm text-gray-900 dark:text-white">
                                        Auto-Compound rewards to maximize returns
                                    </label>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                                    Target APY (%)
                                </label>
                                <div className="mt-2 flex items-center">
                                    <input
                                        type="number"
                                        min="1"
                                        max="20"
                                        className="block w-20 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={targetApy}
                                        onChange={(e) => setTargetApy(parseFloat(e.target.value))}
                                    />
                                    <span className="ml-2 text-sm text-gray-500 dark:text-slate-400">%</span>
                                </div>
                                <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                                    Note: This is a target only. Actual returns may vary based on market conditions.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Protocol Allocation */}
                    {currentStep === 2 && (
                        <div className="mt-5">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-base font-medium text-gray-900 dark:text-white">Protocol Allocation</h4>
                                <button
                                    type="button"
                                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
                                    onClick={() => setCustomAllocation(!customAllocation)}
                                >
                                    {customAllocation ? 'Reset to Suggested' : 'Customize Allocation'}
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </button>
                            </div>

                            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 rounded-lg p-4 mb-6">
                                <div className="flex items-start">
                                    <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 mr-2" />
                                    <div>
                                        <p className="text-sm text-gray-700 dark:text-slate-300">
                                            {customAllocation
                                                ? 'Customize your allocation by adjusting the sliders. Total allocation must equal 100%.'
                                                : 'We\'ve suggested an allocation based on your strategy type and risk tolerance. You can customize this if needed.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 space-y-4">
                                {allocations.map((allocation) => (
                                    <div key={allocation.id} className="p-4 border border-gray-200 dark:border-slate-600 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mr-3">
                                                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{allocation.symbol}</span>
                                                </div>
                                                <div>
                                                    <h5 className="text-sm font-medium text-gray-900 dark:text-white">{allocation.name}</h5>
                                                    <div className="flex items-center text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                                                        <span className="text-green-600 dark:text-green-400 mr-2">{allocation.apy}% APY</span>
                                                        <span className="flex items-center">
                                                            Risk: {allocation.riskLevel}/5
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-base font-semibold text-gray-900 dark:text-white">{allocation.percentage}%</div>
                                            </div>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="1"
                                            value={allocation.percentage}
                                            onChange={(e) => updateAllocation(allocation.id, parseInt(e.target.value))}
                                            className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                            disabled={!customAllocation}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Estimated Strategy Performance</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Estimated APY</p>
                                        <p className="text-xl font-bold text-green-600 dark:text-green-400">{estimatedApy}%</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Overall Risk Level</p>
                                        <div className="flex items-center">
                                            <div className="flex space-x-1 mr-2">
                                                {[1, 2, 3, 4, 5].map((level) => (
                                                    <div
                                                       key={level}
                                                       className={`w-5 h-2 rounded-full ${level <= estimatedRiskLevel ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-gray-200 dark:bg-slate-600'
                                                           }`}
                                                   ></div>
                                               ))}
                                           </div>
                                           <span className="text-sm text-gray-700 dark:text-slate-300">{estimatedRiskLevel}/5</span>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   )}

                   {/* Step 3: Review & Save */}
                   {currentStep === 3 && (
                       <div className="mt-5">
                           <div className="mb-6">
                               <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">Strategy Summary</h4>
                               <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 rounded-lg p-5">
                                   <div className="flex items-center mb-4">
                                       {getStrategyIcon(strategyType)}
                                       <h5 className="text-lg font-semibold text-gray-900 dark:text-white ml-2">
                                           {strategyName || `${strategyType.charAt(0).toUpperCase() + strategyType.slice(1)} Strategy`}
                                       </h5>
                                   </div>

                                   <div className="grid grid-cols-2 gap-4 mb-4">
                                       <div>
                                           <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Strategy Type</p>
                                           <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{strategyType}</p>
                                       </div>
                                       <div>
                                           <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Risk Level</p>
                                           <div className="flex items-center">
                                               <div className="flex space-x-0.5 mr-1.5">
                                                   {[1, 2, 3, 4, 5].map((level) => (
                                                       <div
                                                           key={level}
                                                           className={`w-4 h-1.5 rounded-full ${level <= estimatedRiskLevel ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-gray-200 dark:bg-slate-600'
                                                               }`}
                                                       ></div>
                                                   ))}
                                               </div>
                                               <span className="text-xs text-gray-700 dark:text-slate-300">{estimatedRiskLevel}/5</span>
                                           </div>
                                       </div>
                                       <div>
                                           <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Estimated APY</p>
                                           <p className="text-sm font-medium text-green-600 dark:text-green-400">{estimatedApy}%</p>
                                       </div>
                                       <div>
                                           <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Rebalance</p>
                                           <p className="text-sm font-medium text-gray-900 dark:text-white capitalize flex items-center">
                                               {rebalanceFrequency}
                                               {autoRebalance && <RefreshCw className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 ml-1.5" />}
                                           </p>
                                       </div>
                                   </div>

                                   <div className="mb-4">
                                       <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">Protocol Allocation</p>
                                       <div className="flex h-4 rounded-full overflow-hidden">
                                           {allocations.map((allocation, idx) => (
                                               <div
                                                   key={allocation.id}
                                                   className={`h-full ${idx % 4 === 0 ? 'bg-indigo-500' :
                                                       idx % 4 === 1 ? 'bg-violet-500' :
                                                           idx % 4 === 2 ? 'bg-amber-500' :
                                                               'bg-emerald-500'
                                                       }`}
                                                   style={{ width: `${allocation.percentage}%` }}
                                               ></div>
                                           ))}
                                       </div>
                                       <div className="mt-2 grid grid-cols-2 gap-2">
                                           {allocations.map((allocation) => (
                                               <div key={allocation.id} className="flex items-center text-xs">
                                                   <div className={`w-2 h-2 rounded-full mr-1 ${allocations.indexOf(allocation) % 4 === 0 ? 'bg-indigo-500' :
                                                       allocations.indexOf(allocation) % 4 === 1 ? 'bg-violet-500' :
                                                           allocations.indexOf(allocation) % 4 === 2 ? 'bg-amber-500' :
                                                               'bg-emerald-500'
                                                       }`}></div>
                                                   <span className="text-gray-700 dark:text-slate-300 mr-1">{allocation.name}:</span>
                                                   <span className="font-medium text-gray-900 dark:text-white">{allocation.percentage}%</span>
                                               </div>
                                           ))}
                                       </div>
                                   </div>

                                   <div className="flex items-center">
                                       <div className="flex items-center mr-4">
                                           <div className={`w-4 h-4 rounded flex items-center justify-center ${autoCompound ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-gray-200 dark:bg-slate-600'
                                               }`}>
                                               {autoCompound && (
                                                   <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                   </svg>
                                               )}
                                           </div>
                                           <span className="ml-2 text-xs text-gray-700 dark:text-slate-300">Auto-Compound</span>
                                       </div>
                                       <div className="flex items-center">
                                           <div className={`w-4 h-4 rounded flex items-center justify-center ${autoRebalance ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-gray-200 dark:bg-slate-600'
                                               }`}>
                                               {autoRebalance && (
                                                   <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                   </svg>
                                               )}
                                           </div>
                                           <span className="ml-2 text-xs text-gray-700 dark:text-slate-300">Auto-Rebalance</span>
                                       </div>
                                   </div>
                               </div>
                           </div>

                           <div className="mb-6">
                               <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/60 rounded-lg p-4">
                                   <div className="flex items-start">
                                       <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 mr-2" />
                                       <div>
                                           <p className="text-sm font-medium text-gray-900 dark:text-white">Important Notice</p>
                                           <p className="text-xs text-gray-700 dark:text-slate-300 mt-1">
                                               Past performance is not indicative of future results. Yields can fluctuate based on market conditions.
                                               Higher returns typically come with increased risk. Make sure this strategy aligns with your investment goals.
                                           </p>
                                       </div>
                                   </div>
                               </div>
                           </div>

                           <div className="flex items-start mb-6">
                               <input
                                   id="confirm-strategy"
                                   type="checkbox"
                                   className="w-4 h-4 text-indigo-600 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded focus:ring-indigo-500 mt-1"
                               />
                               <label htmlFor="confirm-strategy" className="ml-2 block text-sm text-gray-700 dark:text-slate-300">
                                   I understand that this strategy will allocate my sBTC according to the specified percentages,
                                   and that all DeFi investments carry inherent risks. I've reviewed the allocation and settings.
                               </label>
                           </div>
                       </div>
                   )}

                   <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                       <button
                           type="button"
                           className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                           onClick={handleNextStep}
                       >
                           {currentStep < 3 ? 'Continue' : 'Create Strategy'}
                       </button>
                       {currentStep > 1 && (
                           <button
                               type="button"
                               className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-slate-600 shadow-sm px-4 py-2 bg-white dark:bg-slate-800 text-base font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                               onClick={handlePrevStep}
                           >
                               Back
                           </button>
                       )}
                       <button
                           type="button"
                           className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-slate-600 shadow-sm px-4 py-2 bg-white dark:bg-slate-800 text-base font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                           onClick={onClose}
                       >
                           Cancel
                       </button>
                   </div>
               </div>
           </div>
       </div>
   );
};

export default NewStrategyModal;