"use client";

import React from "react";
import { motion } from "framer-motion";
import YieldNexusBackground from "./YieldNexusBackground";
import YieldNexusDemo from "./YieldNexusDemo";
import GetItNowButton from "./GetItNowButton";
import ConnectWalletButton from "@/components/shared/wallet/ConnectWalletButton";

const YieldNexusHero: React.FC = () => {
    // Elegant animated gradient consistent with navbar
    const AnimatedGradient = () => (
        <div className="absolute top-0 -right-[35%] w-full h-full z-0 opacity-15 overflow-hidden pointer-events-none">
            <div
                className="absolute top-[8%] right-[8%] w-[60%] h-[70%] rounded-full dark:bg-gradient-to-br dark:from-[#F7931A]/15 dark:to-amber-600/5 bg-gradient-to-br from-[#F7931A]/8 to-amber-600/3 blur-3xl"
                style={{
                    animation: "pulse-slow 16s ease-in-out infinite alternate",
                    transformOrigin: "center"
                }}
            />
            <div
                className="absolute top-[15%] right-[3%] w-[45%] h-[55%] rounded-full dark:bg-gradient-to-br dark:from-blue-500/12 dark:to-indigo-600/4 bg-gradient-to-br from-blue-500/6 to-indigo-600/2 blur-3xl"
                style={{
                    animation: "pulse-slow 20s ease-in-out infinite alternate-reverse",
                    transformOrigin: "center"
                }}
            />
        </div>
    );

    return (
        <div className="relative min-h-screen pt-20 md:pt-0 overflow-hidden dark:bg-gradient-to-br dark:from-[#060f38] dark:to-[#0A0E1F] bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Sophisticated Background */}
            <YieldNexusBackground />

            {/* Enhanced gradient overlay with multi-chain theme */}
            <AnimatedGradient />

            {/* Premium grid overlay consistent with navbar */}
            <div className="absolute inset-0 dark:bg-grid-slate-900/[0.02] bg-grid-slate-700/[0.02] bg-[size:35px_35px] mix-blend-overlay opacity-25"></div>

            {/* Light-mode decorative elements with Stacks/Bitcoin colors */}
            <div className="absolute inset-0 dark:opacity-0 opacity-100 pointer-events-none">
                <div className="absolute top-[12%] left-[8%] w-64 h-64 rounded-full bg-[#F7931A]/5 blur-3xl"></div>
                <div className="absolute top-[20%] right-[12%] w-56 h-56 rounded-full bg-blue-500/3 blur-3xl"></div>
                <div className="absolute bottom-[15%] right-[4%] w-72 h-72 rounded-full bg-indigo-500/4 blur-3xl"></div>
                <div className="absolute bottom-[25%] left-[6%] w-48 h-48 rounded-full bg-purple-500/3 blur-3xl"></div>
            </div>

            {/* Main Content Container - More Relaxed Mobile Spacing */}
            <div className="container relative z-10 mx-auto px-4 py-8 md:py-16 lg:py-20 min-h-screen flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-8 lg:gap-6 items-center">
                    {/* Left Column - Stacks-Focused Content */}
                    <div className="flex flex-col gap-6 md:gap-5 md:justify-start justify-center lg:col-span-6 pr-0 lg:pr-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold tracking-tight dark:text-white text-slate-800 leading-[1.2] md:leading-[1.1]">
                                Born from <span className="font-serif italic text-[#F7931A]">Stacks.</span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                    Scaled Multi-Chain.
                                </span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-base sm:text-lg md:text-lg dark:text-gray-300 text-slate-600 max-w-lg leading-relaxed"
                        >
                            Starting with <span className="font-semibold text-[#F7931A]">Stacks and sBTC</span> as our foundation,
                            Yield Nexus becomes the premier multi-chain yield platform across
                            <span className="font-semibold dark:text-white text-slate-800"> Ethereum, Polygon, Avalanche</span> and beyond.
                        </motion.p>

                        {/* Compact Platform Evolution Map - Left Side */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="p-3 rounded-lg border dark:border-slate-700/30 border-slate-200/50 dark:bg-slate-800/20 bg-slate-50/40 backdrop-blur-sm max-w-lg"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold dark:text-slate-300 text-slate-700">Platform Evolution</span>
                                <span className="text-xs dark:text-slate-400 text-slate-500">Multi-Chain →</span>
                            </div>
                            <div className="flex space-x-1.5">
                                {["Stacks", "Ethereum", "L2s", "Universal"].map((phase, i) => (
                                    <div
                                        key={phase}
                                        className={`px-2 py-1 rounded text-xs font-medium ${i === 0
                                            ? "bg-[#F7931A] text-white"
                                            : "dark:bg-slate-700/50 bg-slate-200/50 dark:text-slate-400 text-slate-600"
                                            }`}
                                    >
                                        {phase}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex mt-4 md:mt-3 gap-3 md:gap-4"
                        >
                            <ConnectWalletButton buttonClass="px-3 py-1 gap-2 uppercase  md:px-5 md:py-1.5" textStyle="md:!text-sm text-[0.7rem]" iconClass="!h-6 !w-6 md:!h-7 md:!w-7" />
                            <GetItNowButton />
                        </motion.div>

                        {/* Stacks-Focused Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex flex-wrap items-center gap-4 md:gap-5 pt-4 md:pt-3 text-[0.6rem] md:text-sm dark:text-slate-400 text-slate-500"
                        >
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full bg-[#F7931A]/20 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#F7931A]"></div>
                                </div>
                                <span>Bitcoin Secured</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                </div>
                                <span>Stacks Native</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                </div>
                                <span>Multi-Chain Vision</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Compact Demo */}
                    <div className="lg:col-span-6 relative mt-8 lg:mt-0">
                        {/* Sophisticated ring elements - more compact */}
                        <div className="absolute inset-0 -m-8 pointer-events-none">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[110%] w-[110%] rounded-full border dark:border-[#F7931A]/6 border-[#F7931A]/10"
                                style={{ animation: 'pulse-subtle 7s ease-in-out infinite' }} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120%] w-[120%] rounded-full border dark:border-blue-500/5 border-blue-500/7"
                                style={{ animation: 'pulse-subtle 9s ease-in-out infinite reverse' }} />
                        </div>

                        {/* Demo Container with enhanced styling */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, rotateX: 8 }}
                            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                            transition={{
                                duration: 1,
                                delay: 0.3,
                                type: "spring",
                                stiffness: 120,
                                damping: 25
                            }}
                            className="relative transform transition-all duration-500 z-10"
                        >
                            {/* Enhanced Demo Component */}
                            <div className="relative">
                                <YieldNexusDemo />

                                {/* Subtle glow effect around demo with Stacks colors */}
                                <div className="absolute -inset-3 bg-gradient-to-r from-[#F7931A]/4 via-purple-500/3 to-blue-500/4 rounded-3xl blur-xl -z-10 opacity-50"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Enhanced CSS animations consistent with navbar */}
            <style jsx global>{`
                @keyframes pulse-slow {
                    0%, 100% {
                        opacity: 0.12;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.2;
                        transform: scale(1.02);
                    }
                }
                
                @keyframes pulse-subtle {
                    0%, 100% {
                        opacity: 0.25;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    50% {
                        opacity: 0.12;
                        transform: translate(-50%, -50%) scale(1.01);
                    }
                }

                /* Enhanced grid pattern consistent with navbar */
                .bg-grid-slate-900\\/\\[0\\.02\\] {
                    background-image: linear-gradient(rgba(15, 23, 42, 0.02) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(15, 23, 42, 0.02) 1px, transparent 1px);
                }
                
                .bg-grid-slate-700\\/\\[0\\.02\\] {
                    background-image: linear-gradient(rgba(51, 65, 85, 0.02) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(51, 65, 85, 0.02) 1px, transparent 1px);
                }

                /* Smooth hover transitions */
                .hover\\:scale-102:hover {
                    transform: scale(1.02);
                }
            `}</style>
        </div>
    );
};

export default YieldNexusHero;