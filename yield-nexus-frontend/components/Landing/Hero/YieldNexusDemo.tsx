// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//     Check,
//     TrendingUp,
//     RefreshCw,
//     Hourglass,
//     ShieldCheck,
//     Clock,
//     ArrowRight,
//     Bitcoin,
//     Zap,
//     BarChart3,
//     Target,
//     Sparkles,
//     Layers,
//     Globe
// } from "lucide-react";

// type DemoStrategy = "multi-chain" | "auto-compound" | "portfolio";

// interface StrategyConfig {
//     id: DemoStrategy;
//     icon: React.ReactNode;
//     name: string;
//     title: string;
//     description: string;
//     primaryColor: string;
//     secondaryColor: string;
//     action: string;
//     metrics: Array<{ label: string; value: string; trend?: string; }>;
//     success: string;
//     gradient: string;
//     chains: string[];
//     protocols: string[];
// }

// const YieldNexusDemo: React.FC = () => {
//     const [activeStrategy, setActiveStrategy] = useState<number>(0);
//     const [demoPhase, setDemoPhase] = useState<"ready" | "executing" | "completed">("ready");
//     const [progress, setProgress] = useState<number>(0);
//     const timeoutRef = useRef<NodeJS.Timeout | null>(null);
//     const intervalRef = useRef<NodeJS.Timeout | null>(null);

//     const strategies: StrategyConfig[] = [
//         {
//             id: "multi-chain",
//             icon: <Layers className="h-5 w-5" />,
//             name: "Multi-Chain",
//             title: "Cross-Chain Yield Optimization",
//             description: "Deploy capital across multiple blockchains including Bitcoin/Stacks, Ethereum, and more",
//             primaryColor: "text-[#F7931A]",
//             secondaryColor: "text-amber-500",
//             action: "Optimizing yield distribution across 7 blockchains",
//             metrics: [
//                 { label: "Target APY", value: "14.2%", trend: "+2.8%" },
//                 { label: "Active Chains", value: "7 networks" },
//                 { label: "Total Protocols", value: "15 active", trend: "+4" },
//                 { label: "Risk Score", value: "Balanced" }
//             ],
//             success: "Successfully deployed across 7 chains with optimized yield distribution",
//             gradient: "from-[#F7931A] to-amber-500",
//             chains: ["Bitcoin/Stacks", "Ethereum", "Polygon", "Avalanche", "Arbitrum", "Optimism", "BSC"],
//             protocols: ["sBTC Yield", "Stacking", "Aave", "Compound", "Uniswap V3", "TraderJoe"]
//         },
//         {
//             id: "auto-compound",
//             icon: <Zap className="h-5 w-5" />,
//             name: "Auto-Compound",
//             title: "Automated Multi-Chain Compounding",
//             description: "Automatically reinvest earned yields across all chains with gas-optimized strategies",
//             primaryColor: "text-emerald-500",
//             secondaryColor: "text-green-400",
//             action: "Compounding rewards across all connected chains",
//             metrics: [
//                 { label: "Compound Freq.", value: "Every 6hrs" },
//                 { label: "APY Boost", value: "+3.7%", trend: "↗️" },
//                 { label: "Gas Saved", value: "71%", trend: "↓️" },
//                 { label: "Cross-Chain", value: "Enabled" }
//             ],
//             success: "Auto-compound activated across all chains with 3.7% APY boost",
//             gradient: "from-emerald-500 to-green-400",
//             chains: ["Bitcoin/Stacks", "Ethereum", "Polygon", "Avalanche", "Arbitrum"],
//             protocols: ["Multi-Protocol", "Cross-Chain Bridges", "Gas Optimization"]
//         },
//         {
//             id: "portfolio",
//             icon: <BarChart3 className="h-5 w-5" />,
//             name: "Portfolio",
//             title: "Multi-Chain Portfolio Analytics",
//             description: "Comprehensive tracking of yields across Bitcoin, Ethereum, and all supported chains",
//             primaryColor: "text-blue-500",
//             secondaryColor: "text-indigo-400",
//             action: "Analyzing multi-chain portfolio performance",
//             metrics: [
//                 { label: "Total Value", value: "$187,350", trend: "+$12,480" },
//                 { label: "30d Yield", value: "$5,247", trend: "+18.7%" },
//                 { label: "Best Chain", value: "Bitcoin/Stacks", trend: "12.3% APY" },
//                 { label: "Health Score", value: "98/100" }
//             ],
//             success: "Multi-chain portfolio analysis complete - all positions optimized",
//             gradient: "from-blue-500 to-indigo-500",
//             chains: ["Bitcoin/Stacks", "Ethereum", "Polygon", "Avalanche", "Arbitrum", "Optimism", "BSC"],
//             protocols: ["Cross-Chain Analytics", "Risk Assessment", "Performance Tracking"]
//         }
//     ];

//     // Demo lifecycle management
//     useEffect(() => {
//         const runDemo = () => {
//             setDemoPhase("executing");
//             setProgress(0);

//             // Animate progress
//             intervalRef.current = setInterval(() => {
//                 setProgress(prev => {
//                     if (prev >= 100) {
//                         if (intervalRef.current) clearInterval(intervalRef.current);
//                         return 100;
//                     }
//                     return prev + Math.random() * 12 + 8;
//                 });
//             }, 250);

//             // Complete execution after 3.5 seconds
//             timeoutRef.current = setTimeout(() => {
//                 if (intervalRef.current) clearInterval(intervalRef.current);
//                 setProgress(100);
//                 setDemoPhase("completed");

//                 // Return to ready state after showing success
//                 timeoutRef.current = setTimeout(() => {
//                     setDemoPhase("ready");
//                     setActiveStrategy(prev => (prev + 1) % strategies.length);

//                     // Start next cycle
//                     timeoutRef.current = setTimeout(runDemo, 2200);
//                 }, 4000);
//             }, 3500);
//         };

//         // Initial delay before starting
//         timeoutRef.current = setTimeout(runDemo, 2800);

//         return () => {
//             if (timeoutRef.current) clearTimeout(timeoutRef.current);
//             if (intervalRef.current) clearInterval(intervalRef.current);
//         };
//     }, [activeStrategy, strategies.length]);

//     const currentStrategy = strategies[activeStrategy];

//     return (
//         <div className="relative backdrop-blur-xl dark:bg-slate-900/90 bg-white/90 border dark:border-slate-700/50 border-slate-200/50 rounded-2xl shadow-2xl overflow-hidden">
//             {/* Header Section */}
//             <div className="relative px-6 py-5 border-b dark:border-slate-700/40 border-slate-200/40">
//                 {/* Background Pattern */}
//                 <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-slate-800/60 dark:to-slate-900/60 bg-gradient-to-r from-slate-50/60 to-white/60"></div>
//                 <div className="absolute inset-0 bg-grid-slate-700/[0.05] dark:bg-grid-slate-600/[0.03] bg-[size:20px_20px] opacity-50"></div>

//                 <div className="relative flex items-center justify-between">
//                     <div className="flex items-center">
//                         <div className="w-11 h-11 rounded-xl dark:bg-slate-800/50 bg-slate-100 flex items-center justify-center mr-4 text-[#F7931A] border dark:border-slate-700/30 border-slate-200/70 shadow-sm">
//                             <Globe className="h-6 w-6" />
//                         </div>
//                         <div>
//                             <h3 className="text-lg font-semibold dark:text-white text-slate-800">Yield Nexus</h3>
//                             <p className="text-xs dark:text-slate-400 text-slate-500">Multi-Chain Yield Platform</p>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full dark:bg-green-950/30 bg-green-50 dark:text-green-400 text-green-600 dark:border-green-800/30 border-green-200/70 border">
//                         <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
//                         <span className="font-medium">7 Chains Active</span>
//                     </div>
//                 </div>
//             </div>

//             <div className="p-6">
//                 {/* Strategy selector */}
//                 <div className="flex justify-around mb-6 pb-5 border-b dark:border-slate-700/30 border-slate-200/70">
//                     {strategies.map((s, idx) => (
//                         <div
//                             key={s.id}
//                             className={`relative flex flex-col items-center px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${idx === activeStrategy
//                                     ? `${s.primaryColor} dark:bg-slate-800/40 bg-slate-100/70 scale-105`
//                                     : 'dark:text-slate-400 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:scale-102'
//                                 }`}
//                         >
//                             <div className="mb-2">
//                                 {s.icon}
//                             </div>
//                             <span className="text-xs font-semibold text-center">{s.name}</span>
//                             {idx === activeStrategy && (
//                                 <motion.div
//                                     layoutId="activeStrategyIndicator"
//                                     className={`absolute -bottom-5 w-12 h-0.5 rounded-full bg-gradient-to-r ${s.gradient}`}
//                                     initial={{ opacity: 0, scale: 0.8 }}
//                                     animate={{ opacity: 1, scale: 1 }}
//                                     transition={{ duration: 0.3 }}
//                                 />
//                             )}
//                         </div>
//                     ))}
//                 </div>

//                 <AnimatePresence mode="wait">
//                     {demoPhase === "ready" && (
//                         <motion.div
//                             key="ready"
//                             initial={{ opacity: 0, y: 15 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -15 }}
//                             transition={{ duration: 0.4 }}
//                             className="rounded-xl border dark:border-slate-700/30 border-slate-200/70 dark:bg-slate-800/20 bg-slate-50/50 p-6"
//                         >
//                             <div className="flex items-start mb-6">
//                                 <div className={`w-12 h-12 rounded-xl dark:bg-slate-800/80 bg-white flex items-center justify-center mr-4 ${currentStrategy.primaryColor} border dark:border-slate-700/30 border-slate-200/70 shadow-sm`}>
//                                     {currentStrategy.icon}
//                                 </div>
//                                 <div className="flex-1 min-w-0">
//                                     <h4 className={`font-semibold ${currentStrategy.primaryColor} mb-2 text-lg`}>
//                                         {currentStrategy.title}
//                                     </h4>
//                                     <p className="text-sm dark:text-slate-300 text-slate-600 mb-4 leading-relaxed">
//                                         {currentStrategy.description}
//                                     </p>

//                                     {/* Supported Chains */}
//                                     <div className="mb-4">
//                                         <h5 className="text-xs font-semibold dark:text-slate-400 text-slate-500 mb-2">Supported Chains:</h5>
//                                         <div className="flex flex-wrap gap-2">
//                                             {currentStrategy.chains.map((chain, i) => (
//                                                 <span
//                                                     key={i}
//                                                     className={`px-2 py-1 rounded-lg text-xs font-medium border ${chain === "Bitcoin/Stacks"
//                                                             ? "bg-[#F7931A]/10 text-[#F7931A] border-[#F7931A]/20"
//                                                             : "dark:bg-slate-800/50 bg-white/70 dark:text-slate-300 text-slate-600 dark:border-slate-700/30 border-slate-200/70"
//                                                         }`}
//                                                 >
//                                                     {chain}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     <div className="grid grid-cols-2 gap-4 p-4 mb-5 rounded-xl dark:bg-slate-800/50 bg-white/70 dark:border-slate-700/20 border-slate-200/70 border">
//                                         {currentStrategy.metrics.map((metric, i) => (
//                                             <div key={i} className="flex flex-col">
//                                                 <span className="text-xs dark:text-slate-400 text-slate-500 font-medium mb-1">{metric.label}</span>
//                                                 <div className="flex items-center gap-2">
//                                                     <span className="text-sm dark:text-white text-slate-800 font-semibold">{metric.value}</span>
//                                                     {metric.trend && (
//                                                         <span className="text-xs text-green-500 font-medium">{metric.trend}</span>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="flex items-center justify-between text-sm dark:text-slate-400 text-slate-500 mb-4 px-1">
//                                 <span className="font-medium">Multi-Chain Status</span>
//                                 <span className={`${currentStrategy.primaryColor} font-semibold`}>Ready to deploy</span>
//                             </div>

//                             <div className="w-full h-2 rounded-full dark:bg-slate-700/40 bg-slate-200/70 overflow-hidden mb-6">
//                                 <motion.div
//                                     className={`h-full bg-gradient-to-r ${currentStrategy.gradient}`}
//                                     initial={{ width: 0 }}
//                                     animate={{ width: "100%" }}
//                                     transition={{ duration: 1.8, ease: "easeInOut" }}
//                                 />
//                             </div>

//                             <motion.button
//                                 className={`w-full py-3 flex justify-center items-center rounded-xl border dark:border-slate-700/40 border-slate-200/70 dark:bg-slate-800/40 bg-white/70 text-sm ${currentStrategy.primaryColor} font-semibold transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:scale-[1.01] active:scale-[0.99]`}
//                                 whileHover={{ y: -1 }}
//                                 whileTap={{ scale: 0.98 }}
//                             >
//                                 <ArrowRight className="h-4 w-4 mr-2" />
//                                 <span>Connect wallet to start</span>
//                             </motion.button>
//                         </motion.div>
//                     )}

//                     {demoPhase === "executing" && (
//                         <motion.div
//                             key="executing"
//                             initial={{ opacity: 0, y: 15 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -15 }}
//                             transition={{ duration: 0.4 }}
//                             className="rounded-xl border dark:border-slate-700/30 border-slate-200/70 dark:bg-slate-800/20 bg-slate-50/50 p-6"
//                         >
//                             <div className="flex items-start mb-6">
//                                 <div className="relative w-12 h-12 rounded-xl dark:bg-slate-800/80 bg-white flex items-center justify-center mr-4 border dark:border-slate-700/30 border-slate-200/70 shadow-sm">
//                                     <motion.div
//                                         className="absolute inset-0 rounded-xl border-2 border-transparent"
//                                         style={{
//                                             borderTopColor: currentStrategy.gradient.includes('F7931A') ? "#F7931A" :
//                                                 currentStrategy.gradient.includes('emerald') ? "#10B981" : "#3B82F6",
//                                             borderRightColor: "transparent",
//                                             borderBottomColor: "transparent",
//                                             borderLeftColor: "transparent"
//                                         }}
//                                         animate={{ rotate: 360 }}
//                                         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//                                     />
//                                     <Hourglass className={`h-5 w-5 ${currentStrategy.primaryColor}`} />
//                                 </div>
//                                 <div>
//                                     <h4 className={`font-semibold ${currentStrategy.primaryColor} mb-2 text-lg`}>
//                                         Processing Multi-Chain Strategy
//                                     </h4>
//                                     <p className="text-sm dark:text-slate-300 text-slate-600">
//                                         {currentStrategy.action}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="space-y-4 p-5 rounded-xl dark:bg-slate-800/50 bg-white/70 dark:border-slate-700/20 border-slate-200/70 border mb-6">
//                                 <div className="flex justify-between items-center">
//                                     <span className="text-sm dark:text-slate-400 text-slate-500 font-medium">Cross-Chain Status:</span>
//                                     <div className="flex items-center">
//                                         <div className="h-2 w-2 rounded-full bg-amber-400 mr-2 animate-pulse"></div>
//                                         <span className="text-sm text-amber-500 font-semibold">Processing</span>
//                                     </div>
//                                 </div>

//                                 <div className="space-y-2">
//                                     {["Bitcoin/Stacks", "Ethereum", "Polygon", "Avalanche"].map((chain, i) => (
//                                         <div key={chain} className="flex items-center justify-between py-1.5 px-3 rounded-lg dark:bg-slate-800/60 bg-slate-100/60">
//                                             <div className="flex items-center space-x-2">
//                                                 <div className={`h-2 w-2 rounded-full ${i <= Math.floor(progress / 25) ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'
//                                                     }`}></div>
//                                                 <span className="text-xs dark:text-slate-300 text-slate-600 font-medium">{chain}</span>
//                                             </div>
//                                             <span className="text-xs dark:text-slate-400 text-slate-500">
//                                                 {i <= Math.floor(progress / 25) ? 'Connected' : 'Pending'}
//                                             </span>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <div className="flex items-center justify-between text-xs dark:text-slate-400 text-slate-500">
//                                     <div className="flex items-center space-x-2">
//                                         <ShieldCheck className="h-4 w-4" />
//                                         <span>Secure multi-chain deployment</span>
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                         <Clock className="h-4 w-4" />
//                                         <span>Est. time: 25s</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="relative w-full h-2 rounded-full dark:bg-slate-700/40 bg-slate-200/70 overflow-hidden">
//                                 <motion.div
//                                     className={`h-full bg-gradient-to-r ${currentStrategy.gradient}`}
//                                     style={{ width: `${progress}%` }}
//                                     transition={{ duration: 0.3 }}
//                                 />

//                                 {/* Animated glow effect */}
//                                 <motion.div
//                                     className="absolute top-0 h-full w-12 bg-white/20 blur-sm"
//                                     animate={{
//                                         left: [`${Math.max(0, progress - 12)}%`, `${Math.min(100, progress + 12)}%`]
//                                     }}
//                                     transition={{
//                                         duration: 2,
//                                         repeat: Infinity,
//                                         ease: "easeInOut"
//                                     }}
//                                 />
//                             </div>
//                         </motion.div>
//                     )}

//                     {demoPhase === "completed" && (
//                         <motion.div
//                             key="completed"
//                             initial={{ opacity: 0, y: 15 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -15 }}
//                             transition={{ duration: 0.4 }}
//                             className="rounded-xl border dark:border-slate-700/30 border-slate-200/70 dark:bg-slate-800/20 bg-slate-50/50 p-6"
//                         >
//                             <div className="flex items-start mb-6">
//                                 <motion.div
//                                     className="w-12 h-12 rounded-xl dark:bg-green-900/20 bg-green-50 dark:border-green-800/30 border-green-200/50 border flex items-center justify-center mr-4 text-green-500 shadow-sm"
//                                     initial={{ scale: 0.8, opacity: 0 }}
//                                     animate={{ scale: 1, opacity: 1 }}
//                                     transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
//                                 >
//                                     <Check className="h-6 w-6" />
//                                 </motion.div>
//                                 <div>
//                                     <motion.h4
//                                         className="font-semibold text-green-500 mb-2 text-lg"
//                                         initial={{ opacity: 0, x: -15 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         transition={{ duration: 0.4, delay: 0.1 }}
//                                     >
//                                         Multi-Chain Strategy Deployed
//                                     </motion.h4>
//                                     <motion.p
//                                         className="text-sm dark:text-slate-300 text-slate-600"
//                                         initial={{ opacity: 0, x: -15 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         transition={{ duration: 0.4, delay: 0.2 }}
//                                     >
//                                         {currentStrategy.success}
//                                     </motion.p>
//                                 </div>
//                             </div>

//                             <motion.div
//                                 className="space-y-4 p-5 rounded-xl dark:bg-slate-800/50 bg-white/70 dark:border-slate-700/20 border-slate-200/70 border mb-5"
//                                 initial={{ opacity: 0, y: 15 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.4, delay: 0.3 }}
//                             >
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div className="flex items-center space-x-3">
//                                         <div className="w-8 h-8 rounded-lg dark:bg-slate-800/80 bg-slate-100 flex items-center justify-center">
//                                             <Bitcoin className="h-4 w-4 text-[#F7931A]" />
//                                         </div>
//                                         <div>
//                                             <span className="text-xs dark:text-slate-400 text-slate-500 font-medium">Bitcoin/Stacks</span>
//                                             <div className="text-sm font-semibold dark:text-slate-300 text-slate-600">Active</div>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-center space-x-3">
//                                         <div className="w-8 h-8 rounded-lg dark:bg-slate-800/80 bg-slate-100 flex items-center justify-center">
//                                             <Clock className="h-4 w-4 text-green-500" />
//                                         </div>
//                                         <div>
//                                             <span className="text-xs dark:text-slate-400 text-slate-500 font-medium">Duration</span>
//                                             <div className="text-sm font-semibold dark:text-slate-300 text-slate-600">23 seconds</div>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-center space-x-3">
//                                         <div className="w-8 h-8 rounded-lg dark:bg-slate-800/80 bg-slate-100 flex items-center justify-center">
//                                             <TrendingUp className="h-4 w-4 text-blue-500" />
//                                         </div>
//                                         <div>
//                                             <span className="text-xs dark:text-slate-400 text-slate-500 font-medium">Chains</span>
//                                             <div className="text-sm font-semibold dark:text-slate-300 text-slate-600">7 Active</div>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-center space-x-3">
//                                         <div className="w-8 h-8 rounded-lg dark:bg-slate-800/80 bg-slate-100 flex items-center justify-center">
//                                             <Sparkles className="h-4 w-4 text-purple-500" />
//                                         </div>
//                                         <div>
//                                             <span className="text-xs dark:text-slate-400 text-slate-500 font-medium">Status</span>
//                                             <div className="text-sm font-semibold dark:text-slate-300 text-slate-600">Optimized</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </motion.div>

//                             <motion.div
//                                 className="w-full h-2 rounded-full overflow-hidden bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 shadow-sm"
//                                 initial={{ width: 0, opacity: 0 }}
//                                 animate={{ width: "100%", opacity: 1 }}
//                                 transition={{ duration: 0.6, delay: 0.4 }}
//                             />
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>

//             <style jsx global>{`
//                 @keyframes spin {
//                     from { transform: rotate(0deg); }
//                     to { transform: rotate(360deg); }
//                 }

//                 .hover\\:scale-102:hover {
//                     transform: scale(1.02);
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default YieldNexusDemo;


"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check,
    TrendingUp,
    RefreshCw,
    Hourglass,
    ShieldCheck,
    Clock,
    ArrowRight,
    Bitcoin,
    Zap,
    BarChart3,
    Sparkles,
    Layers,
    Globe
} from "lucide-react";

type DemoStrategy = "multi-chain" | "auto-compound" | "portfolio";

interface StrategyConfig {
    id: DemoStrategy;
    icon: React.ReactNode;
    name: string;
    title: string;
    description: string;
    primaryColor: string;
    action: string;
    metrics: Array<{ label: string; value: string; trend?: string; }>;
    success: string;
    gradient: string;
    chains: string[];
}

const YieldNexusDemo: React.FC = () => {
    const [activeStrategy, setActiveStrategy] = useState<number>(0);
    const [demoPhase, setDemoPhase] = useState<"ready" | "executing" | "completed">("ready");
    const [progress, setProgress] = useState<number>(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const strategies: StrategyConfig[] = [
        {
            id: "multi-chain",
            icon: <Layers className="h-4 w-4" />,
            name: "Multi-Chain",
            title: "Cross-Chain Yield Optimization",
            description: "Deploy capital across Bitcoin/Stacks, Ethereum, and 5+ other blockchains",
            primaryColor: "text-[#F7931A]",
            action: "Optimizing yield distribution across 7 blockchains",
            metrics: [
                { label: "Target APY", value: "14.2%", trend: "+2.8%" },
                { label: "Active Chains", value: "7 networks" },
                { label: "Protocols", value: "15 active" },
                { label: "Risk Score", value: "Balanced" }
            ],
            success: "Successfully deployed across 7 chains with optimized yield distribution",
            gradient: "from-[#F7931A] to-amber-500",
            chains: ["Bitcoin/Stacks", "Ethereum", "Polygon", "Avalanche", "Arbitrum", "Optimism", "BSC"]
        },
        {
            id: "auto-compound",
            icon: <Zap className="h-4 w-4" />,
            name: "Auto-Compound",
            title: "Automated Multi-Chain Compounding",
            description: "Automatically reinvest yields across all chains with gas optimization",
            primaryColor: "text-emerald-500",
            action: "Compounding rewards across all connected chains",
            metrics: [
                { label: "Frequency", value: "Every 6hrs" },
                { label: "APY Boost", value: "+3.7%" },
                { label: "Gas Saved", value: "71%" },
                { label: "Status", value: "Active" }
            ],
            success: "Auto-compound activated across all chains with 3.7% APY boost",
            gradient: "from-emerald-500 to-green-400",
            chains: ["Bitcoin/Stacks", "Ethereum", "Polygon", "Avalanche", "Arbitrum"]
        },
        {
            id: "portfolio",
            icon: <BarChart3 className="h-4 w-4" />,
            name: "Portfolio",
            title: "Multi-Chain Portfolio Analytics",
            description: "Comprehensive tracking across Bitcoin, Ethereum, and all supported chains",
            primaryColor: "text-blue-500",
            action: "Analyzing multi-chain portfolio performance",
            metrics: [
                { label: "Total Value", value: "$187,350" },
                { label: "30d Yield", value: "$5,247" },
                { label: "Best Chain", value: "Bitcoin/Stacks" },
                { label: "Health", value: "98/100" }
            ],
            success: "Multi-chain portfolio analysis complete - all positions optimized",
            gradient: "from-blue-500 to-indigo-500",
            chains: ["Bitcoin/Stacks", "Ethereum", "Polygon", "Avalanche", "Arbitrum", "Optimism", "BSC"]
        }
    ];

    // Demo lifecycle management
    useEffect(() => {
        const runDemo = () => {
            setDemoPhase("executing");
            setProgress(0);

            intervalRef.current = setInterval(() => {
                setProgress(prev => prev >= 100 ? 100 : prev + Math.random() * 15 + 10);
            }, 200);

            timeoutRef.current = setTimeout(() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setProgress(100);
                setDemoPhase("completed");

                timeoutRef.current = setTimeout(() => {
                    setDemoPhase("ready");
                    setActiveStrategy(prev => (prev + 1) % strategies.length);
                    timeoutRef.current = setTimeout(runDemo, 2000);
                }, 3000);
            }, 3000);
        };

        timeoutRef.current = setTimeout(runDemo, 2500);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [activeStrategy, strategies.length]);

    const currentStrategy = strategies[activeStrategy];

    return (
        <div className="relative backdrop-blur-xl dark:bg-slate-900/90 bg-white/90 border dark:border-slate-700/50 border-slate-200/50 rounded-2xl shadow-2xl overflow-hidden">
            {/* Compact Header */}
            <div className="relative px-5 py-4 border-b dark:border-slate-700/40 border-slate-200/40">
                <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-slate-800/60 dark:to-slate-900/60 bg-gradient-to-r from-slate-50/60 to-white/60"></div>
                <div className="absolute inset-0 bg-grid-slate-700/[0.05] dark:bg-grid-slate-600/[0.03] bg-[size:15px_15px] opacity-40"></div>

                <div className="relative flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-9 h-9 rounded-xl dark:bg-slate-800/50 bg-slate-100 flex items-center justify-center mr-3 text-[#F7931A] border dark:border-slate-700/30 border-slate-200/70">
                            <Globe className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold dark:text-white text-slate-800">Yield Nexus</h3>
                            <p className="text-xs dark:text-slate-400 text-slate-500">Multi-Chain Platform</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full dark:bg-green-950/30 bg-green-50 dark:text-green-400 text-green-600 dark:border-green-800/30 border-green-200/70 border">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="font-medium">7 Chains</span>
                    </div>
                </div>
            </div>

            <div className="p-5">
                {/* Compact Strategy Selector */}
                <div className="flex justify-around mb-5 pb-4 border-b dark:border-slate-700/30 border-slate-200/70">
                    {strategies.map((s, idx) => (
                        <div
                            key={s.id}
                            className={`relative flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-300 ${idx === activeStrategy
                                    ? `${s.primaryColor} dark:bg-slate-800/40 bg-slate-100/70 scale-105`
                                    : 'dark:text-slate-400 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            <div className="mb-1">{s.icon}</div>
                            <span className="text-xs font-semibold">{s.name}</span>
                            {idx === activeStrategy && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className={`absolute -bottom-4 w-8 h-0.5 rounded-full bg-gradient-to-r ${s.gradient}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {demoPhase === "ready" && (
                        <motion.div
                            key="ready"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-xl border dark:border-slate-700/30 border-slate-200/70 dark:bg-slate-800/20 bg-slate-50/50 p-5"
                        >
                            <div className="flex items-start mb-4">
                                <div className={`w-10 h-10 rounded-xl dark:bg-slate-800/80 bg-white flex items-center justify-center mr-3 ${currentStrategy.primaryColor} border dark:border-slate-700/30 border-slate-200/70`}>
                                    {currentStrategy.icon}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-semibold ${currentStrategy.primaryColor} mb-1 text-base`}>
                                        {currentStrategy.title}
                                    </h4>
                                    <p className="text-sm dark:text-slate-300 text-slate-600 mb-3">
                                        {currentStrategy.description}
                                    </p>

                                    {/* Compact Chains Display */}
                                    <div className="mb-3">
                                        <div className="flex flex-wrap gap-1.5">
                                            {currentStrategy.chains.slice(0, 4).map((chain, i) => (
                                                <span
                                                    key={i}
                                                    className={`px-2 py-0.5 rounded-md text-xs font-medium border ${chain === "Bitcoin/Stacks"
                                                            ? "bg-[#F7931A]/10 text-[#F7931A] border-[#F7931A]/20"
                                                            : "dark:bg-slate-800/50 bg-white/70 dark:text-slate-300 text-slate-600 dark:border-slate-700/30 border-slate-200/70"
                                                        }`}
                                                >
                                                    {chain}
                                                </span>
                                            ))}
                                            {currentStrategy.chains.length > 4 && (
                                                <span className="px-2 py-0.5 rounded-md text-xs font-medium dark:bg-slate-800/50 bg-white/70 dark:text-slate-400 text-slate-500">
                                                    +{currentStrategy.chains.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Compact Metrics Grid */}
                                    <div className="grid grid-cols-2 gap-3 p-3 mb-4 rounded-lg dark:bg-slate-800/50 bg-white/70 dark:border-slate-700/20 border-slate-200/70 border">
                                        {currentStrategy.metrics.map((metric, i) => (
                                            <div key={i} className="flex flex-col">
                                                <span className="text-xs dark:text-slate-400 text-slate-500 font-medium">{metric.label}</span>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm dark:text-white text-slate-800 font-semibold">{metric.value}</span>
                                                    {metric.trend && (
                                                        <span className="text-xs text-green-500 font-medium">{metric.trend}</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm dark:text-slate-400 text-slate-500 mb-3">
                                <span>Multi-Chain Status</span>
                                <span className={`${currentStrategy.primaryColor} font-semibold`}>Ready</span>
                            </div>

                            <div className="w-full h-1.5 rounded-full dark:bg-slate-700/40 bg-slate-200/70 overflow-hidden mb-4">
                                <motion.div
                                    className={`h-full bg-gradient-to-r ${currentStrategy.gradient}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.5 }}
                                />
                            </div>

                            <motion.button
                                className={`w-full py-2.5 flex justify-center items-center rounded-lg border dark:border-slate-700/40 border-slate-200/70 dark:bg-slate-800/40 bg-white/70 text-sm ${currentStrategy.primaryColor} font-semibold transition-all duration-200 hover:scale-[1.01]`}
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <ArrowRight className="h-4 w-4 mr-2" />
                                Connect wallet to start
                            </motion.button>
                        </motion.div>
                    )}

                    {demoPhase === "executing" && (
                        <motion.div
                            key="executing"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-xl border dark:border-slate-700/30 border-slate-200/70 dark:bg-slate-800/20 bg-slate-50/50 p-5"
                        >
                            <div className="flex items-start mb-4">
                                <div className="relative w-10 h-10 rounded-xl dark:bg-slate-800/80 bg-white flex items-center justify-center mr-3 border dark:border-slate-700/30 border-slate-200/70">
                                    <motion.div
                                        className="absolute inset-0 rounded-xl border-2 border-transparent"
                                        style={{
                                            borderTopColor: currentStrategy.gradient.includes('F7931A') ? "#F7931A" :
                                                currentStrategy.gradient.includes('emerald') ? "#10B981" : "#3B82F6",
                                        }}
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />
                                    <Hourglass className={`h-4 w-4 ${currentStrategy.primaryColor}`} />
                                </div>
                                <div>
                                    <h4 className={`font-semibold ${currentStrategy.primaryColor} mb-1 text-base`}>
                                        Processing Strategy
                                    </h4>
                                    <p className="text-sm dark:text-slate-300 text-slate-600">
                                        {currentStrategy.action}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 p-4 rounded-lg dark:bg-slate-800/50 bg-white/70 dark:border-slate-700/20 border-slate-200/70 border mb-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm dark:text-slate-400 text-slate-500">Cross-Chain Status:</span>
                                    <div className="flex items-center">
                                        <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mr-1.5 animate-pulse"></div>
                                        <span className="text-sm text-amber-500 font-medium">Processing</span>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    {["Bitcoin/Stacks", "Ethereum", "Polygon", "Avalanche"].map((chain, i) => (
                                        <div key={chain} className="flex items-center justify-between py-1 px-2.5 rounded-md dark:bg-slate-800/60 bg-slate-100/60">
                                            <div className="flex items-center space-x-2">
                                                <div className={`h-1.5 w-1.5 rounded-full ${i <= Math.floor(progress / 25) ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'
                                                    }`}></div>
                                                <span className="text-xs dark:text-slate-300 text-slate-600">{chain}</span>
                                            </div>
                                            <span className="text-xs dark:text-slate-400 text-slate-500">
                                                {i <= Math.floor(progress / 25) ? 'Connected' : 'Pending'}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between text-xs dark:text-slate-400 text-slate-500 pt-1">
                                    <div className="flex items-center space-x-1.5">
                                        <ShieldCheck className="h-3 w-3" />
                                        <span>Secure deployment</span>
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                        <Clock className="h-3 w-3" />
                                        <span>~20s</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative w-full h-1.5 rounded-full dark:bg-slate-700/40 bg-slate-200/70 overflow-hidden">
                                <motion.div
                                    className={`h-full bg-gradient-to-r ${currentStrategy.gradient}`}
                                    style={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </motion.div>
                    )}

                    {demoPhase === "completed" && (
                        <motion.div
                            key="completed"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-xl border dark:border-slate-700/30 border-slate-200/70 dark:bg-slate-800/20 bg-slate-50/50 p-5"
                        >
                            <div className="flex items-start mb-4">
                                <motion.div
                                    className="w-10 h-10 rounded-xl dark:bg-green-900/20 bg-green-50 dark:border-green-800/30 border-green-200/50 border flex items-center justify-center mr-3 text-green-500"
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3, type: "spring" }}
                                >
                                    <Check className="h-5 w-5" />
                                </motion.div>
                                <div>
                                    <motion.h4
                                        className="font-semibold text-green-500 mb-1 text-base"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                        Strategy Deployed
                                    </motion.h4>
                                    <motion.p
                                        className="text-sm dark:text-slate-300 text-slate-600"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                    >
                                        {currentStrategy.success}
                                    </motion.p>
                                </div>
                            </div>

                            <motion.div
                                className="grid grid-cols-2 gap-3 p-4 rounded-lg dark:bg-slate-800/50 bg-white/70 dark:border-slate-700/20 border-slate-200/70 border mb-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 }}
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 rounded-lg dark:bg-slate-800/80 bg-slate-100 flex items-center justify-center">
                                        <Bitcoin className="h-3 w-3 text-[#F7931A]" />
                                    </div>
                                    <div>
                                        <span className="text-xs dark:text-slate-400 text-slate-500">Bitcoin/Stacks</span>
                                        <div className="text-sm font-semibold dark:text-slate-300 text-slate-600">Active</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 rounded-lg dark:bg-slate-800/80 bg-slate-100 flex items-center justify-center">
                                        <Clock className="h-3 w-3 text-green-500" />
                                    </div>
                                    <div>
                                        <span className="text-xs dark:text-slate-400 text-slate-500">Duration</span>
                                        <div className="text-sm font-semibold dark:text-slate-300 text-slate-600">18s</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 rounded-lg dark:bg-slate-800/80 bg-slate-100 flex items-center justify-center">
                                        <TrendingUp className="h-3 w-3 text-blue-500" />
                                    </div>
                                    <div>
                                        <span className="text-xs dark:text-slate-400 text-slate-500">Chains</span>
                                        <div className="text-sm font-semibold dark:text-slate-300 text-slate-600">7 Active</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 rounded-lg dark:bg-slate-800/80 bg-slate-100 flex items-center justify-center">
                                        <Sparkles className="h-3 w-3 text-purple-500" />
                                    </div>
                                    <div>
                                        <span className="text-xs dark:text-slate-400 text-slate-500">Status</span>
                                        <div className="text-sm font-semibold dark:text-slate-300 text-slate-600">Optimized</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="w-full h-1.5 rounded-full overflow-hidden bg-gradient-to-r from-green-500 to-emerald-400"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default YieldNexusDemo;