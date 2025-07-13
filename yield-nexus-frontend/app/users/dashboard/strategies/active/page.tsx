"use client";

import React, { useState, useEffect } from "react";
import { Zap, Plus, Settings } from "lucide-react";
import YieldStrategyCard from "@/components/Dashboard/YieldStrategies/YieldStrategyCard";
import NewStrategyModal from "@/components/Dashboard/YieldStrategies/NewStrategyModal";



// Define strategy types
type StrategyType = 'conservative' | 'balanced' | 'aggressive';

interface Strategy {
  id: string;
  name: string;
  description: string;
  type: StrategyType;
  targetApy: string;
  riskLevel: number;
  rebalance: string;
}

interface Protocol {
  id: string;
  name: string;
  symbol: string;
  apy: number;
  riskLevel: number;
}

export const StrategiesPage: React.FC = () => {
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState<boolean>(false);

  // Available protocols data
  const protocols: Protocol[] = [
    {
      id: "apy-1",
      name: "ALEX",
      symbol: "A",
      apy: 11.2,
      riskLevel: 3,
    },
    {
      id: "apy-2",
      name: "Bitflow",
      symbol: "B",
      apy: 9.8,
      riskLevel: 4,
    },
    {
      id: "apy-3",
      name: "VELAR",
      symbol: "V",
      apy: 7.6,
      riskLevel: 2,
    },
  ];

  // Load strategies from localStorage on component mount
  const [strategies, setStrategies] = useState<Strategy[]>(() => {
    if (typeof window !== 'undefined') {
      const savedStrategies = localStorage.getItem("sbtc-yield-strategies");
      return savedStrategies
        ? JSON.parse(savedStrategies)
        : [
            {
              id: "strat-1",
              name: "Balanced Growth",
              description:
                "Optimized for medium risk tolerance with auto-rebalancing across top protocols.",
              type: "balanced",
              targetApy: "7-9%",
              riskLevel: 3,
              rebalance: "Weekly",
            },
            {
              id: "strat-2",
              name: "Conservative",
              description:
                "Capital preservation focus with steady returns and minimal risk exposure.",
              type: "conservative",
              targetApy: "4-6%",
              riskLevel: 2,
              rebalance: "Monthly",
            },
            {
              id: "strat-3",
              name: "Aggressive Growth",
              description:
                "Maximum yield optimization with leverage and higher volatility tolerance.",
              type: "aggressive",
              targetApy: "10-12%",
              riskLevel: 5,
              rebalance: "Daily",
            },
          ];
    }
    return [];
  });

  // Save strategies to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("sbtc-yield-strategies", JSON.stringify(strategies));
    }
  }, [strategies]);

  // Load the active strategy ID from localStorage on component mount
  const [activeStrategyId, setActiveStrategyId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("sbtc-active-strategy") || "strat-1";
    }
    return "strat-1";
  });

  const handleNewStrategy = (strategy: any) => {
    const updatedStrategies = [...strategies, strategy];
    setStrategies(updatedStrategies);
    setActiveStrategyId(strategy.id);
    console.log("New strategy created and saved:", strategy);
  };

  const handleActivateStrategy = (id: string) => {
    setActiveStrategyId(id);

    const updatedStrategies = strategies.map((strategy) => ({
      ...strategy,
      active: strategy.id === id,
    }));

    setStrategies(updatedStrategies);

    if (typeof window !== 'undefined') {
      localStorage.setItem("sbtc-active-strategy", id);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 from-gray-50 via-indigo-50/10 to-white pb-12">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Gradient overlay */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] dark:from-indigo-900/30 dark:via-indigo-800/20 dark:to-transparent from-indigo-300 via-indigo-200/40 to-transparent"></div>

        {/* Pattern background */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15L30 0zm-5.98 10l-15 8.66v17.32l15 8.66 15-8.66V18.66l-15-8.66z' fill='%234f46e5' fill-opacity='0.6' fill-rule='evenodd'/%3E%3C/svg%3E\")",
            backgroundSize: "60px 60px",
          }}
        ></div>

        {/* Accent lines */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent dark:via-indigo-400/30 via-indigo-500/30 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl pt-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold dark:text-white text-gray-900">
              <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400 bg-clip-text text-transparent">
                sBTC Yield Strategies
              </span>
            </h1>
            <p className="dark:text-slate-400 text-gray-600 text-sm md:text-base mt-1">
              Manage and optimize your sBTC yield strategies across multiple protocols
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button className="px-4 py-2 bg-gradient-to-r dark:from-slate-700 dark:to-slate-600 from-indigo-50 to-violet-50 dark:text-slate-300 text-indigo-700 rounded-lg text-sm font-medium border dark:border-slate-600 border-indigo-100 shadow-sm flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
            <button
              onClick={() => setIsStrategyModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg text-sm font-medium shadow-md shadow-indigo-300/30 flex items-center transition-all hover:translate-y-[-2px]"
            >
              <Zap className="w-4 h-4 mr-2" />
              New Strategy
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border dark:border-slate-700/50 border-indigo-100 rounded-xl shadow-md dark:shadow-slate-900/20 shadow-indigo-100/20 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold dark:text-white text-gray-900 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-indigo-600" />
              Yield Strategies
            </h2>
            <button
              onClick={() => setIsStrategyModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg text-sm font-medium shadow-md shadow-indigo-300/30 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Strategy
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Map through strategies and render YieldStrategyCard components */}
            {strategies.map((strategy) => (
              <YieldStrategyCard
                key={strategy.id}
                strategy={strategy}
                isActive={strategy.id === activeStrategyId}
                onActivate={handleActivateStrategy}
              />
            ))}

            {/* Create Custom Strategy Card */}
            <div className="border border-dashed dark:border-slate-600/50 border-indigo-200 rounded-lg dark:bg-slate-700/30 bg-indigo-50/30 p-5 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full dark:bg-slate-600 bg-indigo-100 flex items-center justify-center mb-3">
                <Plus className="w-6 h-6 dark:text-slate-300 text-indigo-600" />
              </div>

              <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2">
                Create Custom Strategy
              </h3>

              <p className="text-sm dark:text-slate-400 text-gray-600 mb-4">
                Build a personalized yield strategy tailored to your
                specific requirements.
              </p>

              <button
                onClick={() => setIsStrategyModalOpen(true)}
                className="text-sm px-4 py-2 dark:bg-slate-600 dark:border-slate-500 dark:text-slate-300 dark:hover:bg-slate-500 bg-white border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50"
              >
                Start Building
              </button>
            </div>
          </div>
        </div>
      </div>

      <NewStrategyModal
        isOpen={isStrategyModalOpen}
        onClose={() => setIsStrategyModalOpen(false)}
        onSave={handleNewStrategy}
        availableProtocols={protocols.map((protocol) => ({
          id: protocol.id,
          name: protocol.name,
          symbol: protocol.symbol,
          apy: protocol.apy,
          riskLevel: protocol.riskLevel,
        }))}
      />
    </div>
  );
};

export default StrategiesPage;