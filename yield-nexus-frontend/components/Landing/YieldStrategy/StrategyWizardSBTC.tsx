"use client"

import React, { useState } from "react";
import {
  Check,
  ChevronRight,
  HelpCircle,
  Info,
  X,
  Sparkles,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Bitcoin,
  TrendingUp,
  Target,
  Clock,
  DollarSign,
  Lock,
  Layers,
  Globe
} from "lucide-react";

interface StrategyWizardProps {
  onClose: () => void;
}

export const StrategyWizardSBTC: React.FC<StrategyWizardProps> = ({ onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [strategyType, setStrategyType] = useState<string>("preset");
  const [riskLevel, setRiskLevel] = useState<number>(3);
  const [rebalanceFrequency, setRebalanceFrequency] = useState<string>("weekly");
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>(["alex", "velar"]);
  const [investment, setInvestment] = useState<number>(0.5);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);

  // sBTC-specific protocols on Stacks
  const sbtcProtocols = [
    {
      id: "alex",
      name: "ALEX",
      apy: "8.4%",
      risk: 3,
      icon: "🔷",
      description: "Leading Stacks DeFi protocol for sBTC yield farming and automated market making",
      category: "AMM & Yield Farming"
    },
    {
      id: "bitflow",
      name: "Bitflow",
      apy: "9.2%",
      risk: 4,
      icon: "⚡",
      description: "Advanced sBTC yield aggregator with automated strategies and leverage",
      category: "Yield Aggregator"
    },
    {
      id: "velar",
      name: "VELAR",
      apy: "6.8%",
      risk: 2,
      icon: "🛡️",
      description: "Secure sBTC lending and borrowing with treasury management on Stacks",
      category: "Lending & Borrowing"
    },
    {
      id: "zest",
      name: "Zest Protocol",
      apy: "7.5%",
      risk: 2,
      icon: "🌿",
      description: "Bitcoin-native lending protocol with full sBTC integration",
      category: "Bitcoin Lending"
    },
    {
      id: "stackswap",
      name: "StackSwap",
      apy: "10.1%",
      risk: 4,
      icon: "🔥",
      description: "Native Stacks DEX with innovative sBTC liquidity pools",
      category: "DEX & Liquidity"
    }
  ];

  // sBTC-focused preset strategies
  const presetStrategies = [
    {
      id: "conservative",
      name: "sBTC Conservative",
      description: "Capital preservation with steady Bitcoin-backed returns",
      apy: "4-6%",
      risk: 1,
      detail: "Focuses on secure sBTC protocols with strong Bitcoin collateralization and proven track records",
      icon: <Shield className="h-5 w-5 text-emerald-600" />,
      protocols: ["VELAR", "Zest Protocol"],
      color: "emerald"
    },
    {
      id: "balanced",
      name: "sBTC Balanced Growth",
      description: "Optimal risk-adjusted returns across Stacks DeFi",
      apy: "6-9%",
      risk: 3,
      detail: "Diversified sBTC allocation across multiple Stacks protocols for balanced exposure",
      icon: <TrendingUp className="h-5 w-5 text-[#F7931A]" />,
      protocols: ["ALEX", "VELAR", "Bitflow"],
      color: "orange"
    },
    {
      id: "aggressive",
      name: "sBTC Maximum Yield",
      description: "Maximum yield potential with advanced sBTC strategies",
      apy: "9-12%",
      risk: 5,
      detail: "Utilizes leverage, yield farming, and concentrated sBTC positions for maximum returns",
      icon: <Zap className="h-5 w-5 text-purple-600" />,
      protocols: ["Bitflow", "StackSwap", "ALEX"],
      color: "purple"
    }
  ];

  const handleProtocolToggle = (protocolId: string) => {
    if (selectedProtocols.includes(protocolId)) {
      setSelectedProtocols(selectedProtocols.filter((id) => id !== protocolId));
    } else {
      setSelectedProtocols([...selectedProtocols, protocolId]);
    }
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      onClose();
    }, 2000);
  };

  const getEstimatedApy = () => {
    if (strategyType === "preset") {
      const strategy = presetStrategies.find((s) => s.risk === riskLevel);
      return strategy ? strategy.apy : "6-9%";
    } else {
      const selectedProtocolList = sbtcProtocols.filter((p) =>
        selectedProtocols.includes(p.id)
      );
      if (selectedProtocolList.length === 0) return "0%";

      const avgApy =
        selectedProtocolList.reduce(
          (sum, p) => sum + parseFloat(p.apy.replace("%", "")),
          0
        ) / selectedProtocolList.length;
      return `${(avgApy - 1).toFixed(1)}-${(avgApy + 1).toFixed(1)}%`;
    }
  };

  return (
    <div className="sm:max-w-4xl bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 from-white to-slate-50 border dark:border-slate-700/50 border-slate-200 shadow-2xl shadow-[#F7931A]/10 p-0 max-h-[90vh] overflow-hidden rounded-2xl">
      <div className="max-h-[90vh] overflow-y-auto overflow-x-hidden p-6 scrollbar-thin scrollbar-thumb-[#F7931A]/20 scrollbar-track-slate-100 dark:scrollbar-track-slate-800">
        
        {/* Header */}
        <div className="border-b dark:border-slate-700/30 border-slate-200/50 pb-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F7931A] to-orange-600 flex items-center justify-center mr-4 shadow-lg shadow-[#F7931A]/20">
                <Bitcoin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold dark:text-white text-slate-800 flex items-center">
                  sBTC Strategy Wizard
                </h2>
                <p className="dark:text-slate-400 text-slate-600 text-sm">
                  Create professional sBTC yield strategies on Stacks
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="dark:text-slate-400 text-slate-500 hover:text-[#F7931A] dark:hover:text-[#F7931A] transition-colors p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="relative mt-6 mb-10">
          <div className="absolute inset-0 -z-10">
            <div className="absolute h-0.5 w-full dark:bg-slate-700 bg-slate-200 top-6 rounded-full"></div>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute w-16 h-16 rounded-full dark:bg-[#F7931A]/5 bg-[#F7931A]/10"
                style={{
                  left: `calc(${i * 50}% - 32px)`,
                  top: "-2px",
                  transform: "translateX(-50%)",
                  opacity: step > i + 1 ? 0.8 : 0.3,
                  transition: "opacity 0.5s ease-in-out",
                }}
              ></div>
            ))}
          </div>

          <div className="flex justify-between relative z-10">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="relative">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    stepNumber === step
                      ? "bg-gradient-to-br from-[#F7931A] to-orange-600 text-white ring-4 ring-[#F7931A]/20 shadow-lg"
                      : stepNumber < step
                      ? "bg-emerald-500 text-white shadow-md"
                      : "dark:bg-slate-700 bg-slate-200 dark:text-slate-400 text-slate-500"
                  }`}
                >
                  {stepNumber < step ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    stepNumber
                  )}

                  {stepNumber === step && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-[#F7931A]/20"></span>
                  )}
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap dark:text-slate-300 text-slate-700">
                  {stepNumber === 1
                    ? "sBTC Strategy"
                    : stepNumber === 2
                    ? "Parameters"
                    : "Deploy"}
                </div>
              </div>
            ))}
          </div>

          <div
            className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-[#F7931A] to-orange-500 rounded-full transition-all duration-500 z-5"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>
        </div>

        {/* Step 1: sBTC Strategy Selection */}
        {step === 1 && (
          <div className="mt-8">
            <div className="w-full mb-6">
              <div className="flex rounded-lg dark:bg-slate-800 bg-slate-100 p-1 shadow-inner">
                <button
                  onClick={() => setStrategyType("preset")}
                  className={`flex-1 py-2 px-4 rounded-md transition-all text-sm font-medium ${
                    strategyType === "preset"
                      ? "bg-gradient-to-r from-[#F7931A] to-orange-600 text-white shadow-md"
                      : "dark:text-slate-400 text-slate-600 hover:text-[#F7931A]"
                  }`}
                >
                  Preset sBTC Strategies
                </button>
                <button
                  onClick={() => setStrategyType("custom")}
                  className={`flex-1 py-2 px-4 rounded-md transition-all text-sm font-medium ${
                    strategyType === "custom"
                      ? "bg-gradient-to-r from-[#F7931A] to-orange-600 text-white shadow-md"
                      : "dark:text-slate-400 text-slate-600 hover:text-[#F7931A]"
                  }`}
                >
                  Custom Strategy
                </button>
              </div>
            </div>

            {strategyType === "preset" ? (
              <div className="space-y-4">
                {presetStrategies.map((strategy) => (
                  <div
                    key={strategy.id}
                    className="relative p-6 border dark:border-slate-700/50 border-slate-200 hover:border-[#F7931A]/30 dark:hover:border-[#F7931A]/30 rounded-xl cursor-pointer transition-all duration-300 dark:bg-slate-800/30 bg-white/70 backdrop-blur-sm shadow-sm overflow-hidden group"
                    onClick={() => {
                      setRiskLevel(strategy.risk);
                      setSelectedProtocols(strategy.protocols.map(p => 
                        sbtcProtocols.find(sp => sp.name === p || p.includes(sp.name))?.id || ""
                      ).filter(Boolean));
                      nextStep();
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F7931A]/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="flex justify-between items-start relative z-10">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 rounded-xl dark:bg-slate-700 bg-slate-100 flex items-center justify-center">
                            {strategy.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold dark:text-white text-slate-800">
                              {strategy.name}
                            </h3>
                            <p className="dark:text-slate-400 text-slate-600 text-sm">
                              {strategy.description}
                            </p>
                          </div>
                        </div>
                        <p className="dark:text-slate-300 text-slate-600 text-sm mb-4 leading-relaxed">
                          {strategy.detail}
                        </p>
                        
                        {/* Protocol tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {strategy.protocols.map((protocol, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full text-xs font-medium dark:bg-slate-700 bg-slate-100 dark:text-slate-300 text-slate-600 border dark:border-slate-600 border-slate-200"
                            >
                              {protocol}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="text-xs dark:text-slate-400 text-slate-500 mb-1">Expected APY</div>
                        <div className="text-emerald-600 font-bold text-xl mb-3">{strategy.apy}</div>
                        <div className="text-xs dark:text-slate-400 text-slate-500 mb-2">Risk Level</div>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`w-3 h-3 rounded-full ${
                                level <= strategy.risk
                                  ? level <= 2
                                    ? "bg-emerald-500"
                                    : level <= 4
                                    ? "bg-[#F7931A]"
                                    : "bg-purple-500"
                                  : "dark:bg-slate-600 bg-slate-300"
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-[#F7931A]/10 rounded-full p-2">
                        <ArrowRight className="h-4 w-4 text-[#F7931A]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="dark:bg-slate-800/50 bg-blue-50/50 border dark:border-[#F7931A]/20 border-[#F7931A]/30 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Bitcoin className="h-5 w-5 text-[#F7931A] mt-0.5" />
                    <div>
                      <h4 className="font-medium dark:text-white text-slate-800 mb-1">Custom sBTC Strategy</h4>
                      <p className="dark:text-slate-300 text-slate-600 text-sm">
                        Design your own sBTC yield strategy by selecting Stacks protocols you want to include in your portfolio.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {sbtcProtocols.map((protocol) => (
                    <div
                      key={protocol.id}
                      className={`p-4 border rounded-xl transition-all duration-300 cursor-pointer ${
                        selectedProtocols.includes(protocol.id)
                          ? "border-[#F7931A]/50 dark:bg-[#F7931A]/5 bg-[#F7931A]/10 shadow-md shadow-[#F7931A]/10"
                          : "dark:border-slate-700/50 border-slate-200 hover:border-[#F7931A]/30 dark:bg-slate-800/30 bg-white/70"
                      }`}
                      onClick={() => handleProtocolToggle(protocol.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                            selectedProtocols.includes(protocol.id)
                              ? "border-[#F7931A] bg-[#F7931A]"
                              : "dark:border-slate-600 border-slate-300"
                          }`}>
                            {selectedProtocols.includes(protocol.id) && (
                              <Check className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <div className="flex items-center">
                            <span className="text-xl mr-3">{protocol.icon}</span>
                            <div>
                              <div className="font-medium dark:text-white text-slate-800">{protocol.name}</div>
                              <div className="text-xs dark:text-slate-400 text-slate-500">{protocol.category}</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-emerald-600 font-bold">{protocol.apy}</div>
                          <div className="text-xs dark:text-slate-400 text-slate-500">Current APY</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 pl-10">
                        <p className="text-sm dark:text-slate-300 text-slate-600 mb-2">{protocol.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-xs dark:text-slate-400 text-slate-500 mr-2">Risk Level:</span>
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <div
                                  key={level}
                                  className={`w-2 h-2 rounded-full ${
                                    level <= protocol.risk
                                      ? level <= 2
                                        ? "bg-emerald-500"
                                        : level <= 4
                                        ? "bg-[#F7931A]"
                                        : "bg-purple-500"
                                      : "dark:bg-slate-600 bg-slate-300"
                                  }`}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Parameters */}
        {step === 2 && (
          <div className="mt-8 space-y-8">
            {/* Risk Level */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h3 className="text-base font-medium dark:text-white text-slate-800">Maximum Risk Level</h3>
                  <div className="ml-2 group relative">
                    <HelpCircle className="h-4 w-4 dark:text-slate-400 text-slate-500 cursor-help" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Higher risk may yield higher returns but with increased volatility
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#F7931A]/10 border border-[#F7931A]/20 rounded-full text-sm font-medium text-[#F7931A]">
                  {riskLevel}/5
                </span>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={riskLevel}
                  onChange={(e) => setRiskLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #F7931A 0%, #F7931A ${((riskLevel - 1) / 4) * 100}%, rgb(203 213 225) ${((riskLevel - 1) / 4) * 100}%, rgb(203 213 225) 100%)`
                  }}
                />
                <div className="flex justify-between text-xs dark:text-slate-400 text-slate-500 mt-2">
                  <span>Conservative</span>
                  <span>Aggressive</span>
                </div>
              </div>
            </div>

            {/* Rebalance Frequency */}
            <div className="space-y-4">
              <h3 className="text-base font-medium dark:text-white text-slate-800">
                Rebalance Frequency
              </h3>
              <div className="space-y-3">
                {[
                  { id: "daily", label: "Daily Rebalancing", desc: "Most responsive to market changes, higher transaction costs", icon: <Clock className="h-4 w-4" /> },
                  { id: "weekly", label: "Weekly Rebalancing", desc: "Balanced approach between responsiveness and efficiency", icon: <Target className="h-4 w-4" /> },
                  { id: "monthly", label: "Monthly Rebalancing", desc: "Lower transaction fees, less frequent updates", icon: <DollarSign className="h-4 w-4" /> }
                ].map((option) => (
                  <div
                    key={option.id}
                    className={`flex items-center p-4 space-x-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                      rebalanceFrequency === option.id
                        ? "border-[#F7931A]/50 dark:bg-[#F7931A]/5 bg-[#F7931A]/10 shadow-md"
                        : "dark:border-slate-700/50 border-slate-200 hover:border-[#F7931A]/30 dark:bg-slate-800/30 bg-white/70"
                    }`}
                    onClick={() => setRebalanceFrequency(option.id)}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      rebalanceFrequency === option.id
                        ? "border-[#F7931A] bg-[#F7931A]"
                        : "dark:border-slate-600 border-slate-300"
                    }`}>
                      {rebalanceFrequency === option.id && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <div className="text-[#F7931A]">{option.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium dark:text-white text-slate-800">{option.label}</div>
                      <div className="text-xs dark:text-slate-400 text-slate-500 mt-1">{option.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Amount */}
            <div className="space-y-4">
              <h3 className="text-base font-medium dark:text-white text-slate-800">
                sBTC Investment Amount
              </h3>
              <div className="flex space-x-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={investment}
                    onChange={(e) => setInvestment(parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    className="w-full px-4 py-3 rounded-lg dark:bg-slate-800 bg-white border dark:border-slate-600 border-slate-300 dark:text-white text-slate-800 focus:ring-2 focus:ring-[#F7931A]/50 focus:border-[#F7931A] pr-16"
                  />
                  <span className="absolute right-3 top-3 text-sm text-[#F7931A] font-medium">sBTC</span>
                </div>
                <button className="shrink-0 px-4 py-3 border dark:border-slate-600 border-slate-300 hover:bg-[#F7931A]/10 hover:border-[#F7931A]/30 dark:text-slate-300 text-slate-600 rounded-lg transition-colors">
                  Max
                </button>
              </div>
              <div className="flex items-center text-sm dark:text-slate-400 text-slate-500">
                <Info className="h-4 w-4 mr-2 text-[#F7931A]" />
                Available sBTC Balance: <span className="dark:text-white text-slate-800 ml-1 font-medium">2.847 sBTC</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review & Deploy */}
        {step === 3 && (
          <div className="mt-8 space-y-6">
            {/* Strategy Summary */}
            <div className="dark:bg-slate-800/50 bg-white/80 border dark:border-slate-700/50 border-slate-200 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-medium dark:text-white text-slate-800 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-[#F7931A]" />
                sBTC Strategy Summary
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Strategy Type", value: strategyType === "preset" ? "Preset sBTC Strategy" : "Custom sBTC Strategy" },
                  { label: "Risk Level", value: `${riskLevel}/5` },
                  { label: "Rebalance Frequency", value: rebalanceFrequency.charAt(0).toUpperCase() + rebalanceFrequency.slice(1) },
                  { label: "Estimated APY", value: getEstimatedApy() },
                  { label: "sBTC Investment", value: `${investment.toFixed(3)} sBTC` }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-2 border-b dark:border-slate-700/30 border-slate-200/50 last:border-0">
                    <span className="dark:text-slate-400 text-slate-600">{item.label}:</span>
                    <span className="dark:text-white text-slate-800 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Protocols */}
            <div className="dark:bg-slate-800/50 bg-white/80 border dark:border-slate-700/50 border-slate-200 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-medium dark:text-white text-slate-800 mb-4 flex items-center">
                <Layers className="w-5 h-5 mr-2 text-[#F7931A]" />
                Selected Stacks Protocols
              </h3>
              <div className="space-y-3">
                {selectedProtocols.map((id) => {
                  const protocol = sbtcProtocols.find((p) => p.id === id);
                  return protocol ? (
                    <div key={id} className="flex justify-between items-center py-3 px-3 rounded-lg dark:bg-slate-700/30 bg-slate-50 border dark:border-slate-600/30 border-slate-200">
                      <div className="flex items-center">
                        <span className="text-lg mr-3">{protocol.icon}</span>
                        <div>
                          <div className="font-medium dark:text-white text-slate-800">{protocol.name}</div>
                          <div className="text-xs dark:text-slate-400 text-slate-500">{protocol.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-600 font-bold">{protocol.apy}</div>
                        <div className="text-xs dark:text-slate-400 text-slate-500">Current APY</div>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Security & Bitcoin Integration Notice */}
            <div className="dark:bg-gradient-to-r dark:from-[#F7931A]/10 dark:to-orange-900/10 bg-gradient-to-r from-[#F7931A]/5 to-orange-100/50 rounded-xl p-6 border dark:border-[#F7931A]/20 border-[#F7931A]/30">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#F7931A]/20 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-[#F7931A]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold dark:text-white text-slate-800 mb-2 flex items-center">
                    Bitcoin Security & Non-Custodial Design
                    <Bitcoin className="w-4 h-4 ml-2 text-[#F7931A]" />
                  </h4>
                  <p className="dark:text-slate-300 text-slate-600 text-sm leading-relaxed mb-3">
                    Your sBTC strategy is secured by Bitcoin's proof-of-work consensus and deployed on Stacks smart contracts. 
                    All assets remain under your control with complete transparency and the ability to withdraw at any time.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="text-sm dark:text-slate-300 text-slate-600">Bitcoin Secured</span>
                    </div>
                    <div className="flex items-center">
                      <Lock className="w-4 h-4 text-[#F7931A] mr-2" />
                      <span className="text-sm dark:text-slate-300 text-slate-600">Non-Custodial</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 text-purple-500 mr-2" />
                      <span className="text-sm dark:text-slate-300 text-slate-600">Stacks Native</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Performance Chart */}
            <div className="dark:bg-slate-800/50 bg-white/80 border dark:border-slate-700/50 border-slate-200 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-medium dark:text-white text-slate-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-[#F7931A]" />
                sBTC Strategy Performance Projection
              </h3>
              
              {/* Simple visualization */}
              <div className="h-48 dark:bg-slate-700/30 bg-slate-50 rounded-lg flex items-center justify-center border dark:border-slate-600/30 border-slate-200 relative overflow-hidden">
                {/* Background chart pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                      d="M0,80 L10,75 L20,70 L30,65 L40,55 L50,45 L60,40 L70,35 L80,25 L90,20 L100,15"
                      fill="none"
                      stroke="#F7931A"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
                
                <div className="text-center z-10">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    +{(((investment * 1.08) - investment) / investment * 100).toFixed(1)}%
                  </div>
                  <div className="dark:text-slate-300 text-slate-600 text-sm mb-1">
                    Projected 12-Month Return
                  </div>
                  <div className="dark:text-slate-400 text-slate-500 text-xs">
                    {investment.toFixed(3)} sBTC → {(investment * 1.08).toFixed(3)} sBTC
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-xs dark:text-slate-400 text-slate-500 flex items-center">
                <Info className="h-3.5 w-3.5 mr-2 text-[#F7931A]" />
                Projections are estimates based on current market conditions and protocol performance
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t dark:border-slate-700/30 border-slate-200/50">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="flex items-center px-6 py-3 border dark:border-slate-600 border-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-slate-300 text-slate-600 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
              Back
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center px-6 py-3 border dark:border-slate-600 border-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-slate-300 text-slate-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={nextStep}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-[#F7931A] to-orange-600 hover:from-[#E8851E] hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-[#F7931A]/20"
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold rounded-lg transition-all duration-200 shadow-lg shadow-emerald-600/20 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed min-w-[160px]"
            >
              {isDeploying ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Deploying...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Deploy sBTC Strategy
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Custom styles for slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #F7931A;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(247, 147, 26, 0.3);
          border: 2px solid white;
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #F7931A;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(247, 147, 26, 0.3);
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};

export default StrategyWizardSBTC;