import React from 'react';
import { Activity } from 'lucide-react';

// Define TypeScript interfaces
interface Position {
    id: string;
    name: string;
    symbol: string;
    type: string;
    status: string;
    deposited: number;
    apy: number;
    rewards: number;
    timeInPosition: string;
    color: 'indigo' | 'violet' | 'amber' | 'emerald'; // Limit to valid Tailwind color names
}

interface ActivePositionsProps {
    positions: Position[];
}

const ActivePositions: React.FC<ActivePositionsProps> = ({ positions }) => {
    return (
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border dark:border-slate-700/50 border-indigo-100 rounded-xl shadow-md dark:shadow-slate-900/20 shadow-indigo-100/20 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold dark:text-white text-gray-900 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-indigo-600" />
                    Active Positions
                </h2>
                <div className="flex space-x-2">
                    <button className="px-3 py-1.5 dark:bg-slate-700 dark:text-slate-300 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">
                        Sort by APY
                    </button>
                    <button className="px-3 py-1.5 border dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50">
                        Filter
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {positions.map((position) => (
                    <div
                        key={position.id}
                        className={`border border-${position.color}-100 dark:border-${position.color}-800/50 rounded-lg p-4 bg-gradient-to-r from-${position.color}-50/50 dark:from-${position.color}-900/20 to-white dark:to-slate-800`}
                    >
                        <div className="flex items-center mb-3">
                            <div className={`w-8 h-8 rounded-full bg-${position.color}-100 dark:bg-${position.color}-900/50 flex items-center justify-center mr-2`}>
                                <span className={`text-xs font-bold text-${position.color}-600 dark:text-${position.color}-400`}>{position.symbol}</span>
                            </div>
                            <div>
                                <h3 className="font-medium dark:text-white text-gray-900">{position.name}</h3>
                                <p className="text-xs dark:text-slate-400 text-gray-500">{position.type}</p>
                            </div>
                            <span className="ml-auto px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400 text-xs rounded-full">
                                {position.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div>
                                <p className="text-xs dark:text-slate-400 text-gray-500 mb-1">Deposited</p>
                                <p className="text-sm font-medium dark:text-white text-gray-900">{position.deposited} sBTC</p>
                            </div>
                            <div>
                                <p className="text-xs dark:text-slate-400 text-gray-500 mb-1">Current APY</p>
                                <p className="text-sm font-medium text-green-600 dark:text-green-400">{position.apy}%</p>
                            </div>
                            <div>
                                <p className="text-xs dark:text-slate-400 text-gray-500 mb-1">Rewards</p>
                                <p className="text-sm font-medium dark:text-white text-gray-900">{position.rewards} sBTC</p>
                            </div>
                            <div>
                                <p className="text-xs dark:text-slate-400 text-gray-500 mb-1">Time in Position</p>
                                <p className="text-sm font-medium dark:text-white text-gray-900">{position.timeInPosition}</p>
                            </div>
                        </div>

                        <div className="pt-3 border-t dark:border-slate-600/50 border-gray-100 flex space-x-2">
                            <button className={`flex-1 px-3 py-1.5 bg-${position.color}-600 text-white rounded-lg text-xs font-medium hover:bg-${position.color}-700`}>
                                Manage
                            </button>
                            <button className={`px-3 py-1.5 border border-${position.color}-200 dark:border-${position.color}-700 text-${position.color}-700 dark:text-${position.color}-400 rounded-lg text-xs font-medium hover:bg-${position.color}-50 dark:hover:bg-${position.color}-900/30`}>
                                Harvest
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {positions.length === 0 && (
                <div className="dark:bg-slate-700/30 dark:border-slate-600/50 bg-indigo-50/30 border border-dashed border-indigo-200 rounded-lg p-6 text-center">
                    <p className="dark:text-slate-400 text-gray-600">You don't have any active positions yet.</p>
                    <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium">
                        Explore Opportunities
                    </button>
                </div>
            )}

            {positions.length > 0 && (
                <div className="mt-6 text-center">
                    <button className="px-4 py-2 border dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 border-indigo-200 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-50">
                        View All Positions
                    </button>
                </div>
            )}
        </div>
    );
};

export default ActivePositions;