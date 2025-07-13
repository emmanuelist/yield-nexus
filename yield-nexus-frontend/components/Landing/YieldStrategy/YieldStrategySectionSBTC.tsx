"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Shield,
  Zap,
  TrendingUp,
  BarChart3,
  ArrowRight,
  Info,
  Clock,
  DollarSign,
  CheckCircle,
  Bitcoin,
  Layers,
  Target,
  Activity,
  PieChart,
  Globe,
  Lock,
  Coins
} from "lucide-react";

// Strategy data focused on sBTC
const SBTC_STRATEGIES = [
  {
    id: "conservative",
    name: "sBTC Conservative",
    description: "Capital preservation with steady Bitcoin-backed returns",
    risk: 1,
    apy: "4-6%",
    icon: <Shield className="h-5 w-5" />,
    color: "text-emerald-600",
    gradient: "from-emerald-50 to-green-50",
    darkGradient: "from-emerald-900/20 to-green-900/20",
    border: "border-emerald-200 dark:border-emerald-800/30",
    protocols: ["ALEX Stable Pools", "VELAR Treasury", "Zest Protocol"],
    recommended: "New sBTC holders focused on safety and Bitcoin security",
    benefits: [
      "Bitcoin-secured smart contracts on Stacks",
      "Lower volatility with consistent yields",
      "Native sBTC integration with top protocols"
    ]
  },
  {
    id: "balanced",
    name: "sBTC Balanced Growth", 
    description: "Optimal risk-adjusted returns across Stacks DeFi",
    risk: 3,
    apy: "7-10%",
    icon: <TrendingUp className="h-5 w-5" />,
    color: "text-[#F7931A]",
    gradient: "from-orange-50 to-amber-50",
    darkGradient: "from-orange-900/20 to-amber-900/20",
    border: "border-[#F7931A]/20 dark:border-[#F7931A]/30",
    protocols: ["Bitflow Yield Farms", "ALEX LP", "VELAR Vaults", "StackSwap"],
    recommended: "Most sBTC investors seeking optimal Bitcoin yield",
    benefits: [
      "Diversified across multiple Stacks protocols",
      "Auto-rebalancing for optimal allocation",
      "Bitcoin's security with DeFi yields"
    ]
  },
  {
    id: "aggressive",
    name: "sBTC Maximum Yield",
    description: "Maximum yield optimization with advanced strategies",
    risk: 5,
    apy: "10-15%",
    icon: <Zap className="h-5 w-5" />,
    color: "text-purple-600",
    gradient: "from-purple-50 to-violet-50", 
    darkGradient: "from-purple-900/20 to-violet-900/20",
    border: "border-purple-200 dark:border-purple-800/30",
    protocols: ["StackSwap Advanced", "Bitflow Leverage", "ALEX Options", "Yield Aggregators"],
    recommended: "Experienced sBTC users comfortable with higher risk",
    benefits: [
      "Advanced yield farming strategies",
      "Leverage and options integration",
      "Maximum Bitcoin-backed returns"
    ]
  }
];

const SBTC_PROTOCOLS = [
  {
    id: "alex",
    name: "ALEX",
    apy: "8.4%",
    tvl: "$42.8M",
    risk: 3,
    logo: "🔷",
    description: "Leading Stacks DeFi protocol for sBTC yield farming and AMM",
    category: "AMM & Yield"
  },
  {
    id: "bitflow",
    name: "Bitflow",
    apy: "9.2%", 
    tvl: "$38.1M",
    risk: 4,
    logo: "⚡",
    description: "Advanced sBTC yield aggregator with automated strategies",
    category: "Yield Aggregator"
  },
  {
    id: "velar",
    name: "VELAR",
    apy: "6.8%",
    tvl: "$29.7M", 
    risk: 2,
    logo: "🛡️",
    description: "Secure sBTC lending and borrowing with treasury management",
    category: "Lending"
  },
  {
    id: "zest",
    name: "Zest Protocol",
    apy: "7.5%",
    tvl: "$15.3M",
    risk: 2,
    logo: "🌿",
    description: "Bitcoin-native lending protocol supporting sBTC",
    category: "Bitcoin Lending"
  }
];

interface YieldStrategySectionProps {
  onOpenWizard?: () => void;
}

export const YieldStrategySectionSBTC: React.FC<YieldStrategySectionProps> = ({ onOpenWizard }) => {
  const [activeStrategy, setActiveStrategy] = useState("balanced");
  const [investment, setInvestment] = useState(0.5);
  const [projectedReturns, setProjectedReturns] = useState<number[]>([]);
  const [holdReturns, setHoldReturns] = useState<number[]>([]);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Generate simulated returns data
  useEffect(() => {
    const strategy = SBTC_STRATEGIES.find(s => s.id === activeStrategy);
    const baseApy = strategy ? strategy.risk * 2 + Math.random() * 2 : 6;

    const newProjectedReturns = [investment];
    const newHoldReturns = [investment];

    for (let i = 1; i <= 12; i++) {
      const monthlyApy = (baseApy + (Math.random() * 2 - 1)) / 100 / 12;
      const lastMonth = newProjectedReturns[i - 1];
      newProjectedReturns.push(lastMonth * (1 + monthlyApy));

      const holdApy = (3 + (Math.random() * 6 - 3)) / 100 / 12;
      const lastHoldMonth = newHoldReturns[i - 1];
      newHoldReturns.push(lastHoldMonth * (1 + holdApy));
    }

    setProjectedReturns(newProjectedReturns);
    setHoldReturns(newHoldReturns);
  }, [activeStrategy, investment]);

  // Enhanced chart drawing
  useEffect(() => {
    if (!chartRef.current || projectedReturns.length === 0) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const canvas = chartRef.current;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    const maxValue = Math.max(...projectedReturns, ...holdReturns) * 1.1;

    // Draw sophisticated grid
    ctx.strokeStyle = "rgba(156, 163, 175, 0.15)";
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= 4; i++) {
      const y = height - (height * (i / 4));
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    for (let i = 0; i <= 12; i += 3) {
      const x = (width / 12) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw area fill for projected returns
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "rgba(247, 147, 26, 0.15)");
    gradient.addColorStop(1, "rgba(247, 147, 26, 0.02)");

    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, height - (projectedReturns[0] / maxValue) * height);

    for (let i = 1; i < projectedReturns.length; i++) {
      const x = (width / 12) * i;
      const y = height - (projectedReturns[i] / maxValue) * height;
      ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw hold line (dashed)
    ctx.beginPath();
    for (let i = 0; i < holdReturns.length; i++) {
      const x = (width / 12) * i;
      const y = height - (holdReturns[i] / maxValue) * height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "rgba(156, 163, 175, 0.6)";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw main strategy line
    ctx.beginPath();
    for (let i = 0; i < projectedReturns.length; i++) {
      const x = (width / 12) * i;
      const y = height - (projectedReturns[i] / maxValue) * height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "#F7931A";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Add data points
    for (let i = 0; i < projectedReturns.length; i += 3) {
      const x = (width / 12) * i;
      const y = height - (projectedReturns[i] / maxValue) * height;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#F7931A";
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }
  }, [projectedReturns, holdReturns]);

  const selectedStrategy = SBTC_STRATEGIES.find(s => s.id === activeStrategy);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-b dark:from-slate-900 dark:to-[#0A0E1F] from-white to-slate-50"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-br dark:from-[#F7931A]/5 dark:via-purple-500/3 dark:to-transparent from-[#F7931A]/3 via-purple-500/2 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr dark:from-blue-500/5 dark:via-indigo-500/3 dark:to-transparent from-blue-500/3 via-indigo-500/2 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 dark:bg-grid-slate-700/[0.02] bg-grid-slate-300/[0.04] bg-[size:30px_30px] opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-4 py-2 mb-4 rounded-full bg-gradient-to-r dark:from-[#F7931A]/10 dark:to-orange-500/10 from-[#F7931A]/5 to-orange-500/5 border dark:border-[#F7931A]/20 border-[#F7931A]/30"
            >
              <Bitcoin className="w-4 h-4 text-[#F7931A] mr-2" />
              <span className="text-[#F7931A] font-medium text-sm">sBTC Yield Strategies</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold dark:text-white text-slate-800 mb-4"
            >
              Maximize Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F7931A] to-purple-600">
                sBTC Returns
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg dark:text-slate-300 text-slate-600 max-w-3xl mx-auto"
            >
              Choose from professionally managed sBTC strategies built on Stacks. 
              From conservative Bitcoin-secured yields to aggressive DeFi opportunities—all backed by Bitcoin's security.
            </motion.p>
          </div>

          {/* Strategy Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {SBTC_STRATEGIES.map((strategy, index) => (
              <motion.div
                key={strategy.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  activeStrategy === strategy.id
                    ? `bg-gradient-to-br ${strategy.darkGradient} dark:bg-gradient-to-br ${strategy.gradient} shadow-xl shadow-${strategy.color.split('-')[1]}-500/20 ${strategy.border} border-2`
                    : "dark:bg-slate-800/50 bg-white/70 dark:border-slate-700/50 border-slate-200/50 border hover:border-[#F7931A]/30 dark:hover:border-[#F7931A]/30 shadow-lg"
                }`}
                onClick={() => setActiveStrategy(strategy.id)}
              >
                {/* Strategy header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      activeStrategy === strategy.id ? "bg-white/20 dark:bg-slate-800/30" : "dark:bg-slate-700/50 bg-slate-100"
                    }`}>
                      <span className={activeStrategy === strategy.id ? strategy.color : "dark:text-slate-400 text-slate-500"}>
                        {strategy.icon}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs dark:text-slate-400 text-slate-500 mb-1">Expected APY</div>
                      <div className={`font-bold text-lg ${activeStrategy === strategy.id ? strategy.color : "text-emerald-600"}`}>
                        {strategy.apy}
                      </div>
                    </div>
                  </div>

                  <h3 className={`font-bold text-lg mb-2 ${
                    activeStrategy === strategy.id ? strategy.color : "dark:text-white text-slate-800"
                  }`}>
                    {strategy.name}
                  </h3>
                  
                  <p className="dark:text-slate-300 text-slate-600 text-sm mb-4 leading-relaxed">
                    {strategy.description}
                  </p>

                  {/* Risk indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs dark:text-slate-400 text-slate-500">Risk Level:</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-4 h-1.5 rounded-full transition-colors ${
                            level <= strategy.risk
                              ? level <= 2
                                ? "bg-emerald-500"
                                : level <= 4
                                ? "bg-[#F7931A]"
                                : "bg-purple-500"
                              : "dark:bg-slate-600 bg-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Protocols preview */}
                  <div className="mb-4">
                    <div className="text-xs dark:text-slate-400 text-slate-500 mb-2">Key Protocols:</div>
                    <div className="flex flex-wrap gap-1">
                      {strategy.protocols.slice(0, 2).map((protocol, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-md text-xs font-medium dark:bg-slate-700/50 bg-slate-100 dark:text-slate-300 text-slate-600"
                        >
                          {protocol}
                        </span>
                      ))}
                      {strategy.protocols.length > 2 && (
                        <span className="px-2 py-1 rounded-md text-xs font-medium dark:bg-slate-700/50 bg-slate-100 dark:text-slate-400 text-slate-500">
                          +{strategy.protocols.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Benefits preview */}
                  <div className="space-y-2">
                    {strategy.benefits.slice(0, 2).map((benefit, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle className="h-3 w-3 text-[#F7931A] mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-xs dark:text-slate-300 text-slate-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selection indicator */}
                {activeStrategy === strategy.id && (
                  <motion.div
                    layoutId="selectedStrategy"
                    className="absolute inset-0 border-2 border-[#F7931A]/50 rounded-2xl pointer-events-none"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Strategy Details & Simulator */}
          <AnimatePresence mode="wait">
            {selectedStrategy && (
              <motion.div
                key={activeStrategy}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="dark:bg-slate-800/40 bg-white/80 backdrop-blur-sm rounded-2xl border dark:border-slate-700/50 border-slate-200/50 p-8 shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Strategy Details */}
                  <div className="lg:col-span-5">
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${selectedStrategy.color} bg-opacity-10`}>
                        {selectedStrategy.icon}
                      </div>
                      <div>
                        <h3 className={`font-bold text-xl ${selectedStrategy.color}`}>
                          {selectedStrategy.name}
                        </h3>
                        <p className="dark:text-slate-400 text-slate-500 text-sm">
                          Target APY: <span className="font-semibold text-emerald-600">{selectedStrategy.apy}</span>
                        </p>
                      </div>
                    </div>

                    <p className="dark:text-slate-300 text-slate-600 mb-6 leading-relaxed">
                      {selectedStrategy.description}
                    </p>

                    {/* Full protocol list */}
                    <div className="mb-6">
                      <h4 className="font-semibold dark:text-white text-slate-800 mb-3 flex items-center">
                        <Target className="w-4 h-4 mr-2 text-[#F7931A]" />
                        Included Protocols
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedStrategy.protocols.map((protocol, i) => {
                          const protocolData = SBTC_PROTOCOLS.find(p => p.name === protocol || protocol.includes(p.name));
                          return (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg dark:bg-slate-700/30 bg-slate-50 border dark:border-slate-600/30 border-slate-200">
                              <div className="flex items-center">
                                <span className="text-lg mr-3">{protocolData?.logo || "🔸"}</span>
                                <div>
                                  <div className="font-medium dark:text-white text-slate-800">{protocol}</div>
                                  {protocolData && (
                                    <div className="text-xs dark:text-slate-400 text-slate-500">
                                      {protocolData.category} • TVL: {protocolData.tvl}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {protocolData && (
                                <div className="text-right">
                                  <div className="font-semibold text-emerald-600">{protocolData.apy}</div>
                                  <div className="text-xs dark:text-slate-400 text-slate-500">Current APY</div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Key Benefits */}
                    <div>
                      <h4 className="font-semibold dark:text-white text-slate-800 mb-3 flex items-center">
                        <Sparkles className="w-4 h-4 mr-2 text-[#F7931A]" />
                        Key Benefits
                      </h4>
                      <div className="space-y-3">
                        {selectedStrategy.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-[#F7931A] mr-3 mt-0.5 flex-shrink-0" />
                            <span className="dark:text-slate-300 text-slate-600">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Returns Simulator */}
                  <div className="lg:col-span-7">
                    <div className="dark:bg-slate-900/50 bg-slate-50/50 rounded-xl p-6 border dark:border-slate-700/30 border-slate-200/30">
                      <h4 className="font-semibold dark:text-white text-slate-800 mb-4 flex items-center">
                        <Activity className="w-4 h-4 mr-2 text-[#F7931A]" />
                        sBTC Returns Simulator
                      </h4>

                      {/* Investment input */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium dark:text-slate-300 text-slate-700 mb-2">
                          Investment Amount (sBTC)
                        </label>
                        <div className="flex items-center space-x-3">
                          <div className="relative flex-1">
                            <input
                              type="number"
                              value={investment}
                              onChange={(e) => setInvestment(parseFloat(e.target.value) || 0)}
                              step="0.1"
                              min="0.1"
                              max="10"
                              className="w-full px-4 py-2 rounded-lg dark:bg-slate-800 bg-white border dark:border-slate-600 border-slate-300 dark:text-white text-slate-800 focus:ring-2 focus:ring-[#F7931A]/50 focus:border-[#F7931A]"
                            />
                            <span className="absolute right-3 top-2 text-sm text-[#F7931A] font-medium">sBTC</span>
                          </div>
                          <button className="px-4 py-2 rounded-lg border dark:border-slate-600 border-slate-300 dark:text-slate-300 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            Max
                          </button>
                        </div>
                        <p className="text-xs dark:text-slate-400 text-slate-500 mt-1 flex items-center">
                          <Info className="w-3 h-3 mr-1" />
                          Available Balance: <span className="font-medium ml-1">2.847 sBTC</span>
                        </p>
                      </div>

                      {/* Chart */}
                      <div className="h-64 dark:bg-slate-800/50 bg-white rounded-lg border dark:border-slate-700/30 border-slate-200 mb-4 relative overflow-hidden">
                        <canvas ref={chartRef} className="w-full h-full" />
                        
                        {/* Chart legend */}
                        <div className="absolute top-4 left-4 space-y-2">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-[#F7931A] rounded-full mr-2"></div>
                            <span className="text-xs dark:text-slate-300 text-slate-600 font-medium">Strategy Returns</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-1 bg-slate-400 rounded-full mr-2" style={{ borderStyle: 'dashed' }}></div>
                            <span className="text-xs dark:text-slate-400 text-slate-500">HODL sBTC</span>
                          </div>
                        </div>
                      </div>

                      {/* Performance metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-emerald-600">
                            {projectedReturns.length > 0 ? `+${(((projectedReturns[projectedReturns.length - 1] - investment) / investment) * 100).toFixed(1)}%` : "--"}
                          </div>
                          <div className="text-xs dark:text-slate-400 text-slate-500">12-Month Gain</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold dark:text-white text-slate-800">
                            {projectedReturns.length > 0 ? `${projectedReturns[projectedReturns.length - 1].toFixed(3)}` : "--"}
                          </div>
                          <div className="text-xs dark:text-slate-400 text-slate-500">Final sBTC</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#F7931A]">
                            {selectedStrategy.apy}
                          </div>
                          <div className="text-xs dark:text-slate-400 text-slate-500">Target APY</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">
                            {selectedStrategy.risk}/5
                          </div>
                          <div className="text-xs dark:text-slate-400 text-slate-500">Risk Level</div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={onOpenWizard}
                          className="flex-1 bg-gradient-to-r from-[#F7931A] to-orange-600 hover:from-[#E8851E] hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center group"
                        >
                          <Target className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          Explore Strategy Details
                        </button>
                        <button className="flex-1 border border-[#F7931A]/30 hover:border-[#F7931A]/50 dark:text-[#F7931A] text-[#F7931A] font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center group hover:bg-[#F7931A]/5">
                          <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                          Start with sBTC
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* sBTC Ecosystem Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 dark:bg-slate-800/30 bg-white/60 backdrop-blur-sm rounded-2xl border dark:border-slate-700/50 border-slate-200/50 p-8"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold dark:text-white text-slate-800 mb-3 flex items-center justify-center">
                <Layers className="w-6 h-6 mr-3 text-[#F7931A]" />
                sBTC Ecosystem on Stacks
              </h3>
              <p className="dark:text-slate-300 text-slate-600 max-w-2xl mx-auto">
                Built on the foundation of Bitcoin security with Stacks smart contracts. 
                Your sBTC strategies leverage the most trusted blockchain while accessing innovative DeFi yields.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {SBTC_PROTOCOLS.map((protocol, index) => (
                <motion.div
                  key={protocol.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -3 }}
                  className="dark:bg-slate-700/30 bg-white/70 rounded-xl p-4 border dark:border-slate-600/30 border-slate-200 hover:border-[#F7931A]/30 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-2xl">{protocol.logo}</div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-600">{protocol.apy}</div>
                      <div className="text-xs dark:text-slate-400 text-slate-500">APY</div>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold dark:text-white text-slate-800 mb-1">{protocol.name}</h4>
                  <p className="text-xs dark:text-slate-400 text-slate-500 mb-2">{protocol.category}</p>
                  <p className="text-xs dark:text-slate-300 text-slate-600 leading-relaxed mb-3">
                    {protocol.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="dark:text-slate-400 text-slate-500">TVL: {protocol.tvl}</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-2 h-2 rounded-full ${
                            level <= protocol.risk
                              ? level <= 2 ? "bg-emerald-500" : level <= 4 ? "bg-[#F7931A]" : "bg-purple-500"
                              : "dark:bg-slate-600 bg-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* sBTC Foundation Message */}
            <div className="dark:bg-gradient-to-r dark:from-[#F7931A]/10 dark:to-orange-900/10 bg-gradient-to-r from-[#F7931A]/5 to-orange-100/50 rounded-xl p-6 border dark:border-[#F7931A]/20 border-[#F7931A]/30">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#F7931A]/20 flex items-center justify-center flex-shrink-0">
                  <Bitcoin className="w-6 h-6 text-[#F7931A]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold dark:text-white text-slate-800 mb-2 flex items-center">
                    Bitcoin Security, DeFi Innovation
                    <Lock className="w-4 h-4 ml-2 text-[#F7931A]" />
                  </h4>
                  <p className="dark:text-slate-300 text-slate-600 text-sm leading-relaxed mb-4">
                    Every sBTC strategy is secured by Bitcoin's proof-of-work consensus while leveraging 
                    Stacks' smart contract capabilities. Your assets remain non-custodial with full transparency 
                    on-chain, providing the perfect bridge between Bitcoin's security and DeFi's innovation.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="text-sm dark:text-slate-300 text-slate-600">Bitcoin Secured</span>
                    </div>
                    <div className="flex items-center">
                      <Coins className="w-4 h-4 text-[#F7931A] mr-2" />
                      <span className="text-sm dark:text-slate-300 text-slate-600">Non-Custodial</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 text-purple-500 mr-2" />
                      <span className="text-sm dark:text-slate-300 text-slate-600">Multi-Chain Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold dark:text-white text-slate-800 mb-4">
                Ready to Maximize Your sBTC?
              </h3>
              <p className="dark:text-slate-300 text-slate-600 mb-8 text-lg">
                Join thousands of Bitcoin holders earning yield on Stacks. 
                Start with any amount and watch your sBTC grow with Bitcoin's security.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={onOpenWizard}
                  className="bg-gradient-to-r from-[#F7931A] to-orange-600 hover:from-[#E8851E] hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center group shadow-lg shadow-[#F7931A]/20"
                >
                  <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Build My sBTC Strategy
                </button>
                <button className="border-2 border-[#F7931A]/30 hover:border-[#F7931A]/50 dark:text-[#F7931A] text-[#F7931A] font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center group hover:bg-[#F7931A]/5">
                  <PieChart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  View All Protocols
                </button>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm dark:text-slate-400 text-slate-500">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                  <span>$142M+ Total Value Locked</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#F7931A] mr-2"></div>
                  <span>Bitcoin Security</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span>Multi-Chain Vision</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default YieldStrategySectionSBTC;