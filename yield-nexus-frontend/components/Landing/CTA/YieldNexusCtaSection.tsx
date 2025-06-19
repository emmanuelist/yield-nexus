"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bitcoin, TrendingUp, Layers } from 'lucide-react';
import ConnectWalletButton from '@/components/shared/wallet/ConnectWalletButton';
import GetItNowButton from '../Hero/GetItNowButton';


const YieldNexusCtaSection: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);

    // Track mouse position for subtle hover effects
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Enhanced metrics reflecting Yield Nexus vision
    const metrics = [
        {
            icon: <TrendingUp className="w-5 h-5" />,
            value: "$143.7M",
            label: "Total Value Locked",
            change: "+12.4% this month"
        },
        {
            icon: <Bitcoin className="w-5 h-5" />,
            value: "8.2%",
            label: "Current sBTC APY",
            change: "Stacks foundation, multi-chain future"
        },
        {
            icon: <Layers className="w-5 h-5" />,
            value: "5+",
            label: "Chains in Roadmap",
            change: "Starting with Stacks, scaling beyond"
        }
    ];

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Sophisticated Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-[#060f38]/95 dark:to-[#0A0E1F] dark:opacity-95 bg-gradient-to-b from-slate-50 to-slate-100"></div>

                {/* Premium Pattern Overlay */}
                <div className="absolute inset-0 dark:bg-grid-slate-700/[0.03] bg-grid-slate-300/[0.07] bg-[size:20px_20px] opacity-30"></div>

                {/* Enhanced gradient blobs with multi-chain colors */}
                <div
                    className="absolute left-1/4 top-0 w-96 h-96 rounded-full dark:bg-[#F7931A]/5 bg-[#F7931A]/3 blur-3xl"
                    style={{
                        transform: `translate(${Math.sin(scrollY * 0.005) * 20}px, ${Math.cos(scrollY * 0.005) * 20}px)`
                    }}
                ></div>

                <div
                    className="absolute right-1/4 bottom-0 w-80 h-80 rounded-full dark:bg-purple-600/5 bg-purple-600/3 blur-3xl"
                    style={{
                        transform: `translate(${Math.cos(scrollY * 0.005) * 20}px, ${Math.sin(scrollY * 0.005) * 20}px)`
                    }}
                ></div>
            </div>

            {/* Top Curved Border */}
            <div className="absolute top-0 inset-x-0 h-4 overflow-hidden">
                <svg viewBox="0 0 1440 24" fill="none" preserveAspectRatio="none" className="absolute w-full h-24 translate-y-[-83%]">
                    <path
                        d="M0,0 C480,40 960,40 1440,0 L1440,24 L0,24 Z"
                        className="dark:fill-[#040d36] fill-slate-100"
                    />
                </svg>
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F7931A]/20 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Refined Compact Content */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="relative z-10"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-slate-800 mb-6 leading-tight">
                                Ready to Join the
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F7931A] via-purple-500 to-blue-500 ml-2">Yield Nexus?</span>
                            </h2>

                            <p className="dark:text-slate-300 text-slate-600 text-lg max-w-lg mb-8 leading-relaxed">
                                Start with <span className="font-semibold text-[#F7931A]">Stacks and sBTC</span> today.
                                Be part of our multi-chain expansion journey across
                                <span className="font-semibold dark:text-white text-slate-800"> Ethereum, Polygon, and beyond</span>
                                with full custody of your assets.
                            </p>


                            <div className="mb-12 space-y-3">
                                {metrics.map((metric, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                                        className="flex items-center space-x-4 group"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center dark:bg-slate-800/70 bg-white dark:border-slate-700/30 border-slate-200 border shadow-sm">
                                            <span className="text-[#F7931A]">{metric.icon}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-baseline">
                                                <span className="text-xl font-bold dark:text-white text-slate-800">{metric.value}</span>
                                                <span className="ml-2 text-sm dark:text-[#F7931A]/80 text-[#F7931A] font-medium">{metric.change}</span>
                                            </div>
                                            <span className="text-sm dark:text-slate-400 text-slate-500">{metric.label}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex flex-row gap-4">
                                <ConnectWalletButton />
                                <GetItNowButton />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Professional Yield Nexus Showcase */}
                    <div className="flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative w-full max-w-lg"
                        >
                            {/* Enhanced Background Elements */}
                            <div className="absolute inset-0 -z-10">
                                {/* Multi-chain orbital rings */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]">
                                    <motion.div
                                        className="absolute inset-0 rounded-full border border-[#F7931A]/10"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                        style={{ borderStyle: 'dashed' }}
                                    />
                                    <motion.div
                                        className="absolute inset-4 rounded-full border border-purple-500/8"
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                        style={{ borderStyle: 'dotted' }}
                                    />
                                    <motion.div
                                        className="absolute inset-8 rounded-full border border-blue-500/6"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                                        style={{ borderStyle: 'dashed' }}
                                    />
                                </div>

                                {/* Ambient glow effect */}
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-radial from-[#F7931A]/5 via-purple-500/3 to-transparent blur-3xl"
                                    style={{
                                        transform: `translate(-50%, -50%) translate(${(mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth : 1920) / 2) * 0.02}px, ${(mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight : 1080) / 2) * 0.02}px)`
                                    }}
                                />
                            </div>

                            {/* Central Yield Nexus Logo Showcase */}
                            <div className="relative flex items-center justify-center">
                                <div
                                    className="relative w-80 h-80 rounded-full flex items-center justify-center backdrop-blur-sm"
                                    style={{
                                        background: `radial-gradient(circle, rgba(247, 147, 26, 0.04) 0%, rgba(139, 92, 246, 0.02) 50%, transparent 70%)`
                                    }}
                                >
                                    {/* Professional Yield Nexus Logo - Scaled up */}
                                    <motion.div
                                        className="relative z-20"
                                        style={{
                                            transform: `translate(${(mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth : 1920) / 2) * 0.008}px, ${(mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight : 1080) / 2) * 0.008}px)`
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    >
                                        <svg
                                            width="200"
                                            height="200"
                                            viewBox="0 0 60 60"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="drop-shadow-2xl"
                                        >
                                            <defs>
                                                {/* Enhanced gradients for professional look */}
                                                <linearGradient id="bitcoinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#F7931A" />
                                                    <stop offset="100%" stopColor="#E3A046" />
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

                                            {/* Animated orbital rings */}
                                            <motion.circle
                                                cx="30" cy="30" r="26"
                                                stroke="url(#yieldFlowGradient)"
                                                strokeWidth="0.5"
                                                strokeDasharray="2 3"
                                                fill="none"
                                                className="opacity-40"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                            />
                                            <motion.circle
                                                cx="30" cy="30" r="22"
                                                stroke="url(#yieldFlowGradient)"
                                                strokeWidth="0.3"
                                                strokeDasharray="1 2"
                                                fill="none"
                                                className="opacity-30"
                                                animate={{ rotate: -360 }}
                                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                            />

                                            {/* Blockchain Network Nodes */}
                                            <g filter="url(#softGlow)">
                                                {/* Phase 1: Bitcoin/Stacks (Current) */}
                                                <motion.circle
                                                    cx="30" cy="12" r="2.5"
                                                    fill="#F7931A"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 3, repeat: Infinity }}
                                                />
                                                <circle cx="30" cy="12" r="1.5" fill="#0B0D17" />
                                                <text x="30" y="16" textAnchor="middle" className="text-[4px] fill-white font-bold">BTC</text>

                                                {/* Phase 2: Ethereum */}
                                                <motion.circle
                                                    cx="45" cy="22" r="2"
                                                    fill="#627EEA"
                                                    animate={{ scale: [1, 1.15, 1] }}
                                                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                                />
                                                <circle cx="45" cy="22" r="1.2" fill="#0B0D17" />
                                                <text x="45" y="26" textAnchor="middle" className="text-[4px] fill-white font-bold">ETH</text>

                                                {/* Phase 3: Solana */}
                                                <motion.circle
                                                    cx="45" cy="38" r="2"
                                                    fill="#9945FF"
                                                    animate={{ scale: [1, 1.15, 1] }}
                                                    transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                                                />
                                                <circle cx="45" cy="38" r="1.2" fill="#0B0D17" />
                                                <text x="45" y="42" textAnchor="middle" className="text-[4px] fill-white font-bold">SOL</text>

                                                {/* Future chains */}
                                                <motion.circle
                                                    cx="30" cy="48" r="1.8"
                                                    fill="#14F195"
                                                    animate={{ scale: [1, 1.1, 1] }}
                                                    transition={{ duration: 3, repeat: Infinity, delay: 3 }}
                                                />
                                                <circle cx="30" cy="48" r="1.1" fill="#0B0D17" />
                                                <text x="30" y="52" textAnchor="middle" className="text-[4px] fill-white font-bold">+</text>

                                                <motion.circle
                                                    cx="15" cy="38" r="1.8"
                                                    fill="#00D4AA"
                                                    animate={{ scale: [1, 1.1, 1] }}
                                                    transition={{ duration: 3, repeat: Infinity, delay: 4 }}
                                                />
                                                <circle cx="15" cy="38" r="1.1" fill="#0B0D17" />

                                                <motion.circle
                                                    cx="15" cy="22" r="1.8"
                                                    fill="#E84142"
                                                    animate={{ scale: [1, 1.1, 1] }}
                                                    transition={{ duration: 3, repeat: Infinity, delay: 5 }}
                                                />
                                                <circle cx="15" cy="22" r="1.1" fill="#0B0D17" />
                                            </g>

                                            {/* Central Nexus Hub */}
                                            <g filter="url(#glow)">
                                                <path
                                                    d="M30 18L37.3205 22V30L30 34L22.6795 30V22L30 18Z"
                                                    fill="#0B0D17"
                                                    stroke="url(#yieldFlowGradient)"
                                                    strokeWidth="1.2"
                                                />
                                                <motion.circle
                                                    cx="30" cy="26" r="1.5"
                                                    fill="url(#yieldFlowGradient)"
                                                    animate={{ scale: [1, 1.3, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                                <circle cx="30" cy="26" r="1" fill="#0B0D17" />
                                                <circle cx="30" cy="26" r="0.5" fill="url(#yieldFlowGradient)" />
                                                <path
                                                    d="M27 26L30 23L33 26M27 26L30 29L33 26"
                                                    stroke="url(#yieldFlowGradient)"
                                                    strokeWidth="0.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="none"
                                                />
                                            </g>

                                            {/* Connection Network */}
                                            <g opacity="0.6">
                                                <motion.path
                                                    d="M30 18L30 12"
                                                    stroke="#F7931A"
                                                    strokeWidth="1.5"
                                                    strokeDasharray="1 1"
                                                    animate={{ strokeDashoffset: [0, 4] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                                <motion.path
                                                    d="M37.3 22L45 22"
                                                    stroke="#627EEA"
                                                    strokeWidth="1.2"
                                                    strokeDasharray="1 1"
                                                    animate={{ strokeDashoffset: [0, 4] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                                />
                                                <motion.path
                                                    d="M37.3 30L45 38"
                                                    stroke="#9945FF"
                                                    strokeWidth="1.2"
                                                    strokeDasharray="1 1"
                                                    animate={{ strokeDashoffset: [0, 4] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                                                />
                                                <motion.path
                                                    d="M30 34L30 48"
                                                    stroke="#14F195"
                                                    strokeWidth="1.2"
                                                    strokeDasharray="1 1"
                                                    animate={{ strokeDashoffset: [0, 4] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: 3 }}
                                                />
                                                <motion.path
                                                    d="M22.7 30L15 38"
                                                    stroke="#00D4AA"
                                                    strokeWidth="1"
                                                    strokeDasharray="1 1"
                                                    animate={{ strokeDashoffset: [0, 4] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: 4 }}
                                                />
                                                <motion.path
                                                    d="M22.7 22L15 22"
                                                    stroke="#E84142"
                                                    strokeWidth="1"
                                                    strokeDasharray="1 1"
                                                    animate={{ strokeDashoffset: [0, 4] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: 5 }}
                                                />
                                            </g>

                                            {/* Yield Energy Pulses */}
                                            <motion.circle
                                                cx="30" cy="26" r="8"
                                                stroke="url(#yieldFlowGradient)"
                                                strokeWidth="0.3"
                                                strokeDasharray="1 2"
                                                className="opacity-30"
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 4, repeat: Infinity }}
                                            />
                                            <motion.circle
                                                cx="30" cy="26" r="12"
                                                stroke="url(#yieldFlowGradient)"
                                                strokeWidth="0.2"
                                                strokeDasharray="1 3"
                                                className="opacity-20"
                                                animate={{ scale: [1, 1.15, 1] }}
                                                transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                                            />
                                            <motion.circle
                                                cx="30" cy="26" r="16"
                                                stroke="url(#yieldFlowGradient)"
                                                strokeWidth="0.1"
                                                strokeDasharray="1 4"
                                                className="opacity-10"
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ duration: 4, repeat: Infinity, delay: 3 }}
                                            />
                                        </svg>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Professional Benefit Cards - Outside the circle */}
                            <div className="absolute inset-0 pointer-events-none">
                                {[
                                    {
                                        text: "Stacks Native",
                                        detail: "Built on Bitcoin",
                                        position: "top-0 left-8",
                                        color: "#F7931A",
                                        delay: 0.5
                                    },
                                    {
                                        text: "Multi-Chain Vision",
                                        detail: "Expanding beyond",
                                        position: "top-0 right-8",
                                        color: "#8B5CF6",
                                        delay: 0.7
                                    },
                                    {
                                        text: "8.2% APY",
                                        detail: "Optimized yields",
                                        position: "bottom-0 left-8",
                                        color: "#10B981",
                                        delay: 0.9
                                    },
                                    {
                                        text: "Full Custody",
                                        detail: "Your keys, your assets",
                                        position: "bottom-0 right-8",
                                        color: "#6366F1",
                                        delay: 1.1
                                    }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: item.delay, duration: 0.5 }}
                                        className={`absolute ${item.position} pointer-events-auto`}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-slate-200/50 dark:border-slate-700/50 min-w-[120px]"
                                        >
                                            <div className="text-center">
                                                <div
                                                    className="text-sm font-bold mb-1"
                                                    style={{ color: item.color }}
                                                >
                                                    {item.text}
                                                </div>
                                                <div className="text-xs text-slate-600 dark:text-slate-400">
                                                    {item.detail}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom Curved Border */}
            <div className="absolute bottom-0 inset-x-0 h-4 overflow-hidden">
                <svg viewBox="0 0 1440 24" fill="none" preserveAspectRatio="none" className="absolute w-full h-24 translate-y-[30%]">
                    <path
                        d="M0,24 C480,0 960,0 1440,24 L1440,0 L0,0 Z"
                        className="dark:fill-[#040d36] fill-slate-100"
                    />
                </svg>
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F7931A]/20 to-transparent"></div>
            </div>
        </section>
    );
};

export default YieldNexusCtaSection;

