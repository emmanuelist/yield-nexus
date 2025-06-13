"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface YieldNexusLogoProps {
    className?: string;
    iconOnly?: boolean;
    extra_text?: boolean;
}

const YieldNexusLogo: React.FC<YieldNexusLogoProps> = ({ className = "", iconOnly, extra_text }) => {
    return (
        <Link href="/" className={`flex items-center ${className}`}>
            <motion.div
                className="relative flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 md:w-10 md:h-10"
                >
                    <defs>
                        {/* Multi-chain gradients */}
                        <linearGradient id="bitcoinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F7931A" />
                            <stop offset="100%" stopColor="#E3A046" />
                        </linearGradient>

                        <linearGradient id="ethereumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#627EEA" />
                            <stop offset="100%" stopColor="#5546FF" />
                        </linearGradient>

                        <linearGradient id="solanaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#9945FF" />
                            <stop offset="100%" stopColor="#14F195" />
                        </linearGradient>

                        <linearGradient id="nexusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F7931A" stopOpacity="0.3" />
                            <stop offset="33%" stopColor="#627EEA" stopOpacity="0.3" />
                            <stop offset="66%" stopColor="#9945FF" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#14F195" stopOpacity="0.3" />
                        </linearGradient>

                        <linearGradient id="yieldFlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F7931A" />
                            <stop offset="25%" stopColor="#627EEA" />
                            <stop offset="50%" stopColor="#9945FF" />
                            <stop offset="75%" stopColor="#14F195" />
                            <stop offset="100%" stopColor="#F7931A" />
                        </linearGradient>

                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>

                        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur stdDeviation="1.5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Base Circle - Dark cosmic background */}
                    <circle cx="30" cy="30" r="30" fill="#0B0D17" />
                    <circle cx="30" cy="30" r="28" fill="url(#nexusGradient)" fillOpacity="0.15" />

                    {/* Outer orbital rings representing different blockchain ecosystems */}
                    <circle
                        cx="30" cy="30" r="26"
                        stroke="url(#yieldFlowGradient)"
                        strokeWidth="0.5"
                        strokeDasharray="2 3"
                        fill="none"
                        className="animate-spin-slow opacity-40"
                    />
                    <circle
                        cx="30" cy="30" r="22"
                        stroke="url(#yieldFlowGradient)"
                        strokeWidth="0.3"
                        strokeDasharray="1 2"
                        fill="none"
                        className="animate-spin-reverse opacity-30"
                    />

                    {/* Blockchain Network Nodes - Phase representation */}
                    <g filter="url(#softGlow)">
                        {/* Phase 1: Bitcoin/Stacks (Current) - Larger, more prominent */}
                        <circle cx="30" cy="12" r="2.5" fill="#F7931A" className="animate-pulse-slow" />
                        <circle cx="30" cy="12" r="1.5" fill="#0B0D17" />
                        <text x="30" y="16" textAnchor="middle" className="text-[4px] fill-white font-bold">BTC</text>

                        {/* Phase 2: Ethereum (Planned) */}
                        <circle cx="45" cy="22" r="2" fill="#627EEA" className="animate-pulse-slow" style={{ animationDelay: "1s" }} />
                        <circle cx="45" cy="22" r="1.2" fill="#0B0D17" />
                        <text x="45" y="26" textAnchor="middle" className="text-[4px] fill-white font-bold">ETH</text>

                        {/* Phase 3: Solana (Planned) */}
                        <circle cx="45" cy="38" r="2" fill="#9945FF" className="animate-pulse-slow" style={{ animationDelay: "2s" }} />
                        <circle cx="45" cy="38" r="1.2" fill="#0B0D17" />
                        <text x="45" y="42" textAnchor="middle" className="text-[4px] fill-white font-bold">SOL</text>

                        {/* Phase 4: Multi-chain (Vision) */}
                        <circle cx="30" cy="48" r="1.8" fill="#14F195" className="animate-pulse-slow" style={{ animationDelay: "3s" }} />
                        <circle cx="30" cy="48" r="1.1" fill="#0B0D17" />
                        <text x="30" y="52" textAnchor="middle" className="text-[4px] fill-white font-bold">+</text>

                        <circle cx="15" cy="38" r="1.8" fill="#00D4AA" className="animate-pulse-slow" style={{ animationDelay: "4s" }} />
                        <circle cx="15" cy="38" r="1.1" fill="#0B0D17" />

                        <circle cx="15" cy="22" r="1.8" fill="#E84142" className="animate-pulse-slow" style={{ animationDelay: "5s" }} />
                        <circle cx="15" cy="22" r="1.1" fill="#0B0D17" />
                    </g>

                    {/* Central Nexus Hub - The core connection point */}
                    <g filter="url(#glow)">
                        {/* Hexagonal nexus core */}
                        <path
                            d="M30 18L37.3205 22V30L30 34L22.6795 30V22L30 18Z"
                            fill="#0B0D17"
                            stroke="url(#yieldFlowGradient)"
                            strokeWidth="1.2"
                        />

                        {/* Inner yield symbol - abstract interconnected design */}
                        <circle cx="30" cy="26" r="1.5" fill="url(#yieldFlowGradient)" />
                        <circle cx="30" cy="26" r="1" fill="#0B0D17" />
                        <circle cx="30" cy="26" r="0.5" fill="url(#yieldFlowGradient)" />

                        {/* Yield flow indicators */}
                        <path
                            d="M27 26L30 23L33 26M27 26L30 29L33 26"
                            stroke="url(#yieldFlowGradient)"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                    </g>

                    {/* Connection Network - Yield flows between chains */}
                    <g opacity="0.6">
                        {/* Primary connections from nexus to main chains */}
                        <path d="M30 18L30 12" stroke="#F7931A" strokeWidth="1.5" strokeDasharray="1 1" className="animate-pulse-slow" />
                        <path d="M37.3 22L45 22" stroke="#627EEA" strokeWidth="1.2" strokeDasharray="1 1" className="animate-pulse-slow" style={{ animationDelay: "1s" }} />
                        <path d="M37.3 30L45 38" stroke="#9945FF" strokeWidth="1.2" strokeDasharray="1 1" className="animate-pulse-slow" style={{ animationDelay: "2s" }} />
                        <path d="M30 34L30 48" stroke="#14F195" strokeWidth="1.2" strokeDasharray="1 1" className="animate-pulse-slow" style={{ animationDelay: "3s" }} />
                        <path d="M22.7 30L15 38" stroke="#00D4AA" strokeWidth="1" strokeDasharray="1 1" className="animate-pulse-slow" style={{ animationDelay: "4s" }} />
                        <path d="M22.7 22L15 22" stroke="#E84142" strokeWidth="1" strokeDasharray="1 1" className="animate-pulse-slow" style={{ animationDelay: "5s" }} />

                        {/* Secondary interconnections */}
                        <path d="M45 22L45 38" stroke="url(#yieldFlowGradient)" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.4" />
                        <path d="M15 22L15 38" stroke="url(#yieldFlowGradient)" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.4" />
                        <path d="M30 12L45 22" stroke="url(#yieldFlowGradient)" strokeWidth="0.3" strokeDasharray="1 3" opacity="0.3" />
                        <path d="M45 38L30 48" stroke="url(#yieldFlowGradient)" strokeWidth="0.3" strokeDasharray="1 3" opacity="0.3" />
                        <path d="M30 48L15 38" stroke="url(#yieldFlowGradient)" strokeWidth="0.3" strokeDasharray="1 3" opacity="0.3" />
                        <path d="M15 22L30 12" stroke="url(#yieldFlowGradient)" strokeWidth="0.3" strokeDasharray="1 3" opacity="0.3" />
                    </g>

                    {/* Yield Energy Pulses - Animated rings */}
                    <circle cx="30" cy="26" r="8" stroke="url(#yieldFlowGradient)" strokeWidth="0.3" strokeDasharray="1 2" className="animate-pulse-slow opacity-30" />
                    <circle cx="30" cy="26" r="12" stroke="url(#yieldFlowGradient)" strokeWidth="0.2" strokeDasharray="1 3" className="animate-pulse-slow opacity-20" style={{ animationDelay: "1.5s" }} />
                    <circle cx="30" cy="26" r="16" stroke="url(#yieldFlowGradient)" strokeWidth="0.1" strokeDasharray="1 4" className="animate-pulse-slow opacity-10" style={{ animationDelay: "3s" }} />
                </svg>

                {!iconOnly && (
                    <div className="ml-2.5 flex flex-col items-start">
                        <span className="font-bold text-xl md:text-2xl dark:text-white text-gray-900 leading-tight">
                            <span className="bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                                Yield
                            </span>
                            <span className="text-slate-700 dark:text-slate-300 ml-1">Nexus</span>
                        </span>
                        {extra_text && (
                            <span className="text-[9px] tracking-wider uppercase text-slate-500 dark:text-slate-400 -mt-1">
                                Multi-Chain Yield Platform
                            </span>
                        )}
                    </div>
                )}
            </motion.div>
        </Link>
    );
};

// Enhanced CSS animations for the multi-chain logo
const styles = `
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s infinite;
}

.animate-spin-slow {
  animation: spin-slow 30s linear infinite;
}

.animate-spin-reverse {
  animation: spin-reverse 40s linear infinite;
}
`;

// Add the styles to the document
if (typeof document !== "undefined") {
    const existingStyle = document.getElementById("yield-nexus-styles");
    if (!existingStyle) {
        const styleElement = document.createElement("style");
        styleElement.id = "yield-nexus-styles";
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);
    }
}

export default YieldNexusLogo;