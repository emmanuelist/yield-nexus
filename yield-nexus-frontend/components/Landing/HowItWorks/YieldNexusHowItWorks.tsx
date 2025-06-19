"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bitcoin, LockIcon, BarChart3, Wallet, Zap, Layers } from 'lucide-react';

const YieldNexusHowItWorks: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const stepsCount = 4;

    // Process steps data - subtly adapted for Yield Nexus
    const steps = [
        {
            id: 'deposit',
            title: 'Secure sBTC Deposit',
            description: 'Connect your Stacks wallet and deposit your sBTC into our non-custodial platform. Your assets remain fully sovereign while benefiting from institutional-grade security across our expanding ecosystem.',
            icon: <Wallet size={28} />,
            color: '#F7931A',
            gradient: 'from-[#F7931A]/20 to-amber-700/10',
            accent: 'border-[#F7931A]/30',
            animation: (
                <div className="relative w-full h-full">
                    {/* Bitcoin flow animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="100%" height="100%" viewBox="0 0 300 180" className="overflow-visible">
                            <defs>
                                <linearGradient id="depositGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#F7931A" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#F7931A" stopOpacity="0" />
                                </linearGradient>
                                <filter id="depositBlur" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="2" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* Wallet */}
                            <rect x="30" y="60" width="70" height="60" rx="4" className="dark:fill-slate-700 fill-slate-200 dark:stroke-slate-600 stroke-slate-300" strokeWidth="1.5" />
                            <rect x="35" y="56" width="60" height="10" rx="2" className="dark:fill-slate-600 fill-slate-300 dark:stroke-slate-500 stroke-slate-400" strokeWidth="1" />

                            {/* Yield Nexus Platform */}
                            <rect x="200" y="50" width="70" height="80" rx="6" className="dark:fill-slate-800 fill-slate-100 dark:stroke-slate-600 stroke-slate-300" strokeWidth="2" />
                            <circle cx="235" cy="70" r="10" className="dark:fill-slate-700 fill-slate-200 dark:stroke-[#F7931A] stroke-[#F7931A]" strokeWidth="1.5" />
                            <rect x="225" y="85" width="20" height="30" rx="2" className="dark:fill-slate-700 fill-slate-200 dark:stroke-slate-600 stroke-slate-300" strokeWidth="1.5" />
                            <circle cx="235" cy="100" r="3" className="dark:fill-slate-500 fill-slate-400" />

                            {/* Bitcoin movement animation */}
                            {[0, 1, 2, 3].map((i) => (
                                <g key={`bitcoin-${i}`} className={`bitcoin-deposit-${i}`}>
                                    <circle cx="65" cy="90" r="12" className="fill-[#F7931A]/20" />
                                    <path d="M71 86c0-2-1.5-3-3.5-3.2V80h-2v2.8h-1.6V80h-2v2.8H59v2h1.4c.7 0 1 .3 1 .8v6.8c0 .4-.2.8-.9.8H59V96h3v3h2v-3h1.6v3h2v-3.1c2.5-.3 4-1.3 4-3.4 0-1.7-.9-2.8-2.7-3.2 1.2-.4 1.9-1.3 1.9-2.7zm-3.4 5.3c0 1-.7 1.7-2.3 1.7h-3.5v-3.4H65c1.4 0 2.2.6 2.2 1.7zm-.8-4.5c0 1-.6 1.5-2 1.5h-3v-3h3c1.3 0 2 .5 2 1.5z" className="fill-[#F7931A]" />
                                </g>
                            ))}

                            {/* Arrow path */}
                            <path d="M120 90 H 180" stroke="#F7931A" strokeWidth="1.5" strokeDasharray="5,3" className="dark:opacity-70 opacity-50" />
                            <polygon points="180,85 190,90 180,95" fill="#F7931A" className="dark:opacity-70 opacity-50" />
                        </svg>
                    </div>
                </div>
            ),
        },
        {
            id: 'strategy',
            title: 'Multi-Chain Strategy Allocation',
            description: 'Your assets are automatically allocated across diversified strategies starting with Stacks DeFi, expanding to Ethereum, Polygon and beyond as we scale our multi-chain platform.',
            icon: <BarChart3 size={28} />,
            color: '#6366F1',
            gradient: 'from-indigo-500/20 to-indigo-700/10',
            accent: 'border-indigo-500/30',
            animation: (
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="100%" height="100%" viewBox="0 0 300 180" className="overflow-visible">
                            <defs>
                                <linearGradient id="strategyGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                                </linearGradient>
                                <filter id="strategyBlur" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* Central nexus circle */}
                            <circle cx="150" cy="90" r="35" className="dark:fill-slate-800 fill-slate-100 dark:stroke-slate-700 stroke-slate-300" strokeWidth="2" />
                            <circle cx="150" cy="90" r="30" className="dark:fill-slate-800 fill-slate-100 dark:stroke-slate-700 stroke-slate-300" strokeWidth="1" />
                            <text x="150" y="87" textAnchor="middle" className="dark:fill-[#F7931A] fill-[#F7931A] font-bold text-[9px]">Yield</text>
                            <text x="150" y="97" textAnchor="middle" className="dark:fill-[#F7931A] fill-[#F7931A] font-bold text-[9px]">Nexus</text>

                            {/* Strategy platforms with chain labels */}
                            {[
                                { label: 'Stacks', color: '#F7931A' },
                                { label: 'ETH', color: '#627EEA' },
                                { label: 'Polygon', color: '#8247E5' },
                                { label: 'Avalanche', color: '#E84142' },
                                { label: 'Future', color: '#10B981' }
                            ].map((chain, index) => {
                                const angle = (index * Math.PI * 2) / 5;
                                const x = 150 + Math.cos(angle) * 80;
                                const y = 90 + Math.sin(angle) * 60;

                                return (
                                    <g key={`strategy-${index}`}>
                                        <circle cx={x} cy={y} r="18" className="dark:fill-slate-800 fill-slate-100 dark:stroke-slate-700 stroke-slate-300" strokeWidth="1.5" />
                                        <circle cx={x} cy={y} r="14" className={`dark:fill-slate-900/80 fill-slate-50/80 strategy-platform-${index}`} filter="url(#strategyBlur)" />
                                        <text x={x} y={y + 3} textAnchor="middle" className="dark:fill-slate-400 fill-slate-600 text-[7px] font-medium">{chain.label}</text>

                                        {/* Connection line */}
                                        <line x1="150" y1="90" x2={x} y2={y} stroke="#6366F1" strokeWidth="1" strokeDasharray="2,2" className="dark:opacity-60 opacity-40 strategy-line" />

                                        {/* Animated flow particle */}
                                        <circle className={`strategy-particle-${index}`} r="2" fill={chain.color} filter="url(#strategyBlur)" />
                                    </g>
                                );
                            })}

                            {/* Percentage allocations */}
                            {[0, 1, 2, 3, 4].map((i, index) => {
                                const angle = (index * Math.PI * 2) / 5;
                                const x = 150 + Math.cos(angle) * 55;
                                const y = 90 + Math.sin(angle) * 40;
                                const percentage = [40, 25, 20, 10, 5][index]; // Stacks gets highest allocation

                                return (
                                    <g key={`allocation-${i}`} className={`allocation-${i}`}>
                                        <text x={x} y={y + 3} textAnchor="middle" className="dark:fill-slate-300 fill-slate-700 font-medium text-[9px]">{percentage}%</text>
                                    </g>
                                );
                            })}
                        </svg>
                    </div>
                </div>
            )
        },
        {
            id: 'compound',
            title: 'Cross-Chain Compounding',
            description: 'Earned yield is automatically reinvested across our multi-chain ecosystem to maximize returns through compounding, optimizing opportunities across Stacks, Ethereum and beyond.',
            icon: <Zap size={28} />,
            color: '#10B981',
            gradient: 'from-emerald-500/20 to-emerald-700/10',
            accent: 'border-emerald-500/30',
            animation: (
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="100%" height="100%" viewBox="0 0 300 180" className="overflow-visible">
                            <defs>
                                <linearGradient id="compoundGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                                </linearGradient>
                                <filter id="compoundBlur" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* Nexus compound container */}
                            <rect x="100" y="40" width="100" height="100" rx="8" className="dark:fill-slate-800 fill-slate-100 dark:stroke-slate-700 stroke-slate-300" strokeWidth="2" />

                            {/* Bitcoin stacks that grow */}
                            {[0, 1, 2].map((i) => (
                                <g key={`stack-${i}`} className={`compound-stack-${i}`}>
                                    <circle cx={120 + i * 30} cy={120 - i * 3} r="12" className="fill-[#F7931A]/15" />
                                    <path
                                        d={`M${126 + i * 30} ${116 - i * 3}c0-2-1.5-3-3.5-3.2V${110 - i * 3}h-2v2.8h-1.6V${110 - i * 3}h-2v2.8H${114 + i * 30}v2h1.4c.7 0 1 .3 1 .8v6.8c0 .4-.2.8-.9.8H${114 + i * 30}V${126 - i * 3}h3v3h2v-3h1.6v3h2v-3.1c2.5-.3 4-1.3 4-3.4 0-1.7-.9-2.8-2.7-3.2 1.2-.4 1.9-1.3 1.9-2.7zm-3.4 5.3c0 1-.7 1.7-2.3 1.7h-3.5v-3.4H${122.6 + i * 30}c1.4 0 2.2.6 2.2 1.7zm-.8-4.5c0 1-.6 1.5-2 1.5h-3v-3h3c1.3 0 2 .5 2 1.5z`}
                                        className="fill-[#F7931A]"
                                    />
                                </g>
                            ))}

                            {/* Growth arrows/indicators */}
                            <path d="M150 100 Q 170 80 190 100" stroke="#10B981" strokeWidth="1.5" fill="none" className="growth-arrow" />
                            <polygon points="186,96 190,100 186,104" fill="#10B981" className="growth-arrow-head" />

                            {/* Multi-chain sparkles with different colors */}
                            {[
                                { color: '#F7931A', delay: 0 },
                                { color: '#8B5CF6', delay: 0.5 },
                                { color: '#627EEA', delay: 1 },
                                { color: '#10B981', delay: 1.5 }
                            ].map((sparkle, i) => (
                                <g key={`sparkle-${i}`} className={`compound-sparkle-${i}`}>
                                    <circle
                                        cx={120 + Math.random() * 60}
                                        cy={60 + Math.random() * 40}
                                        r="1.5"
                                        fill={sparkle.color}
                                        filter="url(#compoundBlur)"
                                    />
                                </g>
                            ))}

                            {/* APY indicator */}
                            <g className="compound-apy">
                                <rect x="130" y="50" width="40" height="16" rx="8" className="dark:fill-slate-700 fill-slate-200" />
                                <text x="150" y="62" textAnchor="middle" className="fill-[#10B981] font-bold text-[10px]">+8.2% APY</text>
                            </g>

                            {/* Time indicators */}
                            {[0, 1, 2].map((i) => (
                                <g key={`time-${i}`} className={`time-indicator-${i}`}>
                                    <text x={120 + i * 30} y="150" textAnchor="middle" className="dark:fill-slate-400 fill-slate-600 text-[8px]">Month {i + 1}</text>
                                </g>
                            ))}
                        </svg>
                    </div>
                </div>
            )
        },
        {
            id: 'withdraw',
            title: 'Flexible Access',
            description: 'Access your assets and earned yield at any time with no lock periods. Withdraw directly to your wallet with complete control, whether from Stacks or any supported chain.',
            icon: <LockIcon size={28} />,
            color: '#8B5CF6',
            gradient: 'from-purple-500/20 to-purple-700/10',
            accent: 'border-purple-500/30',
            animation: (
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="100%" height="100%" viewBox="0 0 300 180" className="overflow-visible">
                            <defs>
                                <linearGradient id="withdrawGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                                </linearGradient>
                                <filter id="withdrawBlur" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="2" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* Nexus Platform */}
                            <rect x="30" y="50" width="70" height="80" rx="6" className="dark:fill-slate-800 fill-slate-100 dark:stroke-slate-600 stroke-slate-300" strokeWidth="2" />
                            <circle cx="65" cy="70" r="10" className="dark:fill-slate-700 fill-slate-200 dark:stroke-[#F7931A] stroke-[#F7931A]" strokeWidth="1.5" />
                            <rect x="55" y="85" width="20" height="30" rx="2" className="dark:fill-slate-700 fill-slate-200 dark:stroke-slate-600 stroke-slate-300" strokeWidth="1.5" />
                            <circle cx="65" cy="100" r="3" className="dark:fill-slate-500 fill-slate-400" />

                            {/* Wallet */}
                            <rect x="200" y="60" width="70" height="60" rx="4" className="dark:fill-slate-700 fill-slate-200 dark:stroke-slate-600 stroke-slate-300" strokeWidth="1.5" />
                            <rect x="205" y="56" width="60" height="10" rx="2" className="dark:fill-slate-600 fill-slate-300 dark:stroke-slate-500 stroke-slate-400" strokeWidth="1" />

                            {/* Bitcoin movement animation */}
                            {[0, 1, 2, 3].map((i) => (
                                <g key={`bitcoin-withdraw-${i}`} className={`bitcoin-withdraw-${i}`}>
                                    <circle cx="65" cy="90" r="12" className="fill-[#F7931A]/20" />
                                    <path d="M71 86c0-2-1.5-3-3.5-3.2V80h-2v2.8h-1.6V80h-2v2.8H59v2h1.4c.7 0 1 .3 1 .8v6.8c0 .4-.2.8-.9.8H59V96h3v3h2v-3h1.6v3h2v-3.1c2.5-.3 4-1.3 4-3.4 0-1.7-.9-2.8-2.7-3.2 1.2-.4 1.9-1.3 1.9-2.7zm-3.4 5.3c0 1-.7 1.7-2.3 1.7h-3.5v-3.4H65c1.4 0 2.2.6 2.2 1.7zm-.8-4.5c0 1-.6 1.5-2 1.5h-3v-3h3c1.3 0 2 .5 2 1.5z" className="fill-[#F7931A]" />
                                </g>
                            ))}

                            {/* Arrow path */}
                            <path d="M120 90 H 180" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="5,3" className="dark:opacity-70 opacity-50" />
                            <polygon points="180,85 190,90 180,95" fill="#8B5CF6" className="dark:opacity-70 opacity-50" />

                            {/* Enhanced yield indicator showing multi-chain growth */}
                            <g className="withdraw-yield">
                                <rect x="115" y="65" width="70" height="16" rx="8" className="dark:fill-slate-700/80 fill-slate-200/80" />
                                <text x="150" y="77" textAnchor="middle" className="fill-[#F7931A] font-bold text-[9px]">+0.00482 sBTC</text>
                            </g>

                            {/* No lock indicator */}
                            <g className="no-lock" transform="translate(150, 120)">
                                <circle r="12" className="dark:fill-slate-700/60 fill-slate-200/60" />
                                <g transform="scale(0.03) translate(-350, -350)">
                                    <path d="M375.58,375.58a16,16,0,0,1,22.63,0L480,457.37l81.79-81.79a16,16,0,0,1,22.63,22.63L502.63,480l81.79,81.79a16,16,0,0,1-22.63,22.63L480,502.63l-81.79,81.79a16,16,0,0,1-22.63-22.63L457.37,480l-81.79-81.79A16,16,0,0,1,375.58,375.58Z" className="fill-purple-500 dark:opacity-80 opacity-60" />
                                    <path d="M256,96a17,17,0,0,1,17,17V208a17,17,0,0,1-34,0V113A17,17,0,0,1,256,96Z" className="fill-purple-500 dark:opacity-80 opacity-60" />
                                    <path d="M256,48C141.31,48,48,141.31,48,256c0,71.11,36.81,136.48,95.72,174.08l-35.63,35.63a16,16,0,1,0,22.63,22.63L170.56,448.5c25.3,16.43,54.81,27.17,86.27,30.57A60,60,0,0,0,316,480a16,16,0,0,0-32,0,28,28,0,1,1-28-28,16,16,0,0,0,0-32,59.85,59.85,0,0,0-34.13,10.7c-23.86-3.43-46.83-11.8-67.1-24.44l226.86-226.86a8,8,0,0,0-11.32-11.32l-254,254C49.59,385.7,16,323.27,16,256,16,123.71,123.71,16,256,16a238.92,238.92,0,0,1,74.43,11.83,8,8,0,0,0,5.07-15.17A273.81,273.81,0,0,0,256,0C114.84,0,0,114.84,0,256S114.84,512,256,512a256.34,256.34,0,0,0,34.13-2.28A60,60,0,1,0,316,384a16,16,0,0,0,0,32,28,28,0,0,1,0,56,223.59,223.59,0,0,1-25.8-1.48A222.47,222.47,0,0,0,320,256c0-27.59-5.35-54.56-15.87-79.91a8,8,0,1,0-14.87,5.95A206.52,206.52,0,0,1,304,256A207.52,207.52,0,0,1,275.74,367.2a59.94,59.94,0,0,0-19.74-3.2,16,16,0,0,0,0,32,28,28,0,0,1,0,56c-114.69,0-208-93.31-208-208S141.31,48,256,48Z" className="fill-purple-500 dark:opacity-80 opacity-60" />
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
            )
        }
    ];

    // Handle auto-play functionality
    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(() => {
                setActiveStep((prev) => (prev + 1) % stepsCount);
            }, 5000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isPlaying, stepsCount]);

    // Handle pause/play on hover
    const handleMouseEnter = () => setIsPlaying(false);
    const handleMouseLeave = () => setIsPlaying(true);

    return (
        <section
            id="how-it-works"
            className="py-12 relative overflow-hidden dark:bg-slate-900/60 bg-slate-50/60 border-y dark:border-slate-800/50 border-slate-200/70"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Subtle background elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Dot pattern */}
                <div className="absolute inset-0 dark:bg-grid-slate-700/[0.03] bg-grid-slate-300/[0.07] bg-[size:20px_20px] opacity-40"></div>

                {/* Animated gradient blobs */}
                <div
                    className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 rounded-full dark:bg-purple-500/5 bg-purple-500/3 blur-3xl"
                    style={{
                        transform: `translate(${Math.sin(activeStep * 0.5) * 10 + 25}%, -${Math.cos(activeStep * 0.5) * 10 + 50}%)`
                    }}
                ></div>
                <div
                    className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-96 h-96 rounded-full dark:bg-[#F7931A]/5 bg-[#F7931A]/3 blur-3xl"
                    style={{
                        transform: `translate(-${Math.cos(activeStep * 0.5) * 10 + 25}%, ${Math.sin(activeStep * 0.5) * 10 + 33}%)`
                    }}
                ></div>

                {/* Animated light beam */}
                <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-16 bg-gradient-to-r from-transparent dark:via-[#F7931A]/3 via-[#F7931A]/2 to-transparent blur-2xl"
                    style={{ transform: `rotate(${activeStep * 22.5}deg)` }}
                ></div>
            </div>

            {/* Stylized border decorations */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F7931A]/20 to-transparent"></div>
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F7931A]/20 to-transparent"></div>

            {/* Corner accents - top left */}
            <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-0 left-0 w-px h-8 bg-gradient-to-b from-transparent to-[#F7931A]/30"></div>
                <div className="absolute top-0 left-0 h-px w-8 bg-gradient-to-r from-transparent to-[#F7931A]/30"></div>
            </div>

            {/* Corner accents - top right */}
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-transparent to-[#F7931A]/30"></div>
                <div className="absolute top-0 right-0 h-px w-8 bg-gradient-to-l from-transparent to-[#F7931A]/30"></div>
            </div>

            {/* Corner accents - bottom left */}
            <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-px h-8 bg-gradient-to-t from-transparent to-[#F7931A]/30"></div>
                <div className="absolute bottom-0 left-0 h-px w-8 bg-gradient-to-r from-transparent to-[#F7931A]/30"></div>
            </div>

            {/* Corner accents - bottom right */}
            <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-px h-8 bg-gradient-to-t from-transparent to-[#F7931A]/30"></div>
                <div className="absolute bottom-0 right-0 h-px w-8 bg-gradient-to-l from-transparent to-[#F7931A]/30"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 dark:text-white text-slate-800 group">
                        How <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F7931A] to-purple-500">Yield Nexus</span> Works
                        <span className="inline-block w-12 h-1 ml-1 bg-gradient-to-r from-[#F7931A] to-[#5546FF] rounded-full transform translate-y-1"></span>
                    </h2>
                    <p className="dark:text-slate-300 text-slate-600 text-sm md:text-base">
                        Generate optimized yield starting with Stacks, expanding across chains—no technical knowledge required.
                    </p>
                </div>

                {/* Main content */}
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mt-6">
                    {/* Steps Navigation - Enhanced styling */}
                    <div className="lg:col-span-3 flex flex-col">
                        {steps.map((step, index) => (
                            <motion.button
                                key={step.id}
                                onClick={() => setActiveStep(index)}
                                className={`relative mb-4 text-left flex items-start px-4 py-3.5 rounded-xl transition-all duration-300 overflow-hidden ${activeStep === index
                                    ? `bg-gradient-to-r ${step.gradient} ${step.accent} dark:bg-opacity-20 bg-opacity-90 shadow-lg`
                                    : 'dark:bg-slate-800/40 dark:hover:bg-slate-800/60 dark:border-slate-700/50 bg-white/70 hover:bg-white/90 border-slate-200/70 hover:border-slate-300/70 border'
                                    }`}
                                whileHover={{ x: 4, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Subtle animated highlight for active step */}
                                {activeStep === index && (
                                    <div className="absolute inset-0 overflow-hidden">
                                        <div className="absolute -top-full -left-full w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-full transition-all duration-700 animate-rotate-slow"></div>
                                    </div>
                                )}

                                <div className="flex-shrink-0 mt-0.5 relative z-10">
                                    <div
                                        className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all ${activeStep === index
                                            ? 'bg-gradient-to-br from-white/20 to-white/5 shadow-inner'
                                            : 'dark:bg-slate-700/80 bg-slate-100/80 backdrop-blur-sm'
                                            }`}
                                        style={{ color: activeStep === index ? step.color : '' }}
                                    >
                                        {activeStep === index ? (
                                            <span className="text-white dark:text-white">{step.icon}</span>
                                        ) : (
                                            <span className="dark:text-slate-400 text-slate-500">{index + 1}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="ml-3 flex-1 relative z-10">
                                    <h3
                                        className={`font-semibold text-base ${activeStep === index
                                            ? 'dark:text-white text-slate-800'
                                            : 'dark:text-slate-300 text-slate-700'
                                            }`}
                                    >
                                        {step.title}
                                    </h3>
                                    <p
                                        className={`text-xs mt-1 line-clamp-2 ${activeStep === index
                                            ? 'dark:text-slate-200 text-slate-700'
                                            : 'dark:text-slate-400 text-slate-500'
                                            }`}
                                    >
                                        {step.description}
                                    </p>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Visualization Area */}
                    <div className="lg:col-span-7">
                        <div className="relative h-96 rounded-xl overflow-hidden border dark:border-slate-800 border-slate-200 dark:bg-slate-800/50 bg-white/50 backdrop-blur-sm">
                            {/* Animation progress bar */}
                            <div className="absolute inset-0 rounded-xl z-0 p-[1px]">
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#F7931A]/30 via-purple-500/20 to-[#F7931A]/30 animate-gradient-slow"></div>
                            </div>

                            {/* Inner container with glassy effect */}
                            <div className="absolute inset-[1px] rounded-xl bg-gradient-to-br dark:from-slate-800/80 dark:to-slate-900/80 from-white/90 to-slate-50/90 backdrop-blur-md"></div>

                            {/* Animation progress bar - enhanced */}
                            <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden rounded-t-xl">
                                <div className="absolute inset-0 dark:bg-slate-700/60 bg-slate-200/60"></div>
                                <motion.div
                                    className="h-full relative"
                                    style={{ background: steps[activeStep].color }}
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    key={activeStep}
                                    transition={{ duration: 5, ease: 'linear' }}
                                >
                                    <div className="absolute top-0 right-0 h-full w-10 bg-gradient-to-r from-transparent to-white/20 animate-pulse-slow"></div>
                                </motion.div>
                            </div>

                            {/* Step animation area */}
                            <div className="absolute inset-0 p-4 pt-6">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`step-${activeStep}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.4 }}
                                        className="h-full"
                                    >
                                        <div className="h-full flex flex-col">
                                            {/* Step title */}
                                            <div className="mb-3 flex items-center">
                                                <span
                                                    className="mr-2 p-1.5 rounded-lg"
                                                    style={{ color: steps[activeStep].color }}
                                                >
                                                    {steps[activeStep].icon}
                                                </span>
                                                <h3 className="text-lg font-semibold dark:text-white text-slate-800">
                                                    {steps[activeStep].title}
                                                </h3>
                                            </div>

                                            {/* Animated illustration */}
                                            <div className="flex-1 rounded-lg border dark:border-slate-700/50 border-slate-200/70 dark:bg-slate-800/30 bg-white/30 p-3 overflow-hidden relative">
                                                {steps[activeStep].animation}
                                            </div>

                                            {/* Description */}
                                            <div className="mt-3">
                                                <p className="dark:text-slate-300 text-slate-600 text-sm">
                                                    {steps[activeStep].description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Controls */}
                            <div className="absolute bottom-4 right-4 flex space-x-2">
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="h-8 w-8 rounded-full dark:bg-slate-700 bg-white/80 dark:border-slate-600 border-slate-200 border flex items-center justify-center dark:text-slate-300 text-slate-600 hover:text-slate-900 dark:hover:text-white transition-colors"
                                >
                                    {isPlaying ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="6" y="4" width="4" height="16"></rect>
                                            <rect x="14" y="4" width="4" height="16"></rect>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                        </svg>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveStep((activeStep - 1 + stepsCount) % stepsCount)}
                                    className="h-8 w-8 rounded-full dark:bg-slate-700 bg-white/80 dark:border-slate-600 border-slate-200 border flex items-center justify-center dark:text-slate-300 text-slate-600 hover:text-slate-900 dark:hover:text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setActiveStep((activeStep + 1) % stepsCount)}
                                    className="h-8 w-8 rounded-full dark:bg-slate-700 bg-white/80 dark:border-slate-600 border-slate-200 border flex items-center justify-center dark:text-slate-300 text-slate-600 hover:text-slate-900 dark:hover:text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Step indicators */}
                        <div className="flex justify-center mt-4 space-x-1.5">
                            {steps.map((_, index) => (
                                <button
                                    key={`indicator-${index}`}
                                    onClick={() => setActiveStep(index)}
                                    className="focus:outline-none"
                                    aria-label={`View step ${index + 1}`}
                                >
                                    <div
                                        className={`h-1.5 rounded-full transition-all duration-300 ${activeStep === index
                                            ? 'w-8'
                                            : 'w-4 dark:bg-slate-700 bg-slate-300'
                                            }`}
                                        style={{
                                            background: activeStep === index ? steps[activeStep].color : ''
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 text-center">
                    <motion.a
                        href="#nexus"
                        whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(247, 147, 26, 0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#F7931A] to-purple-600 text-white font-medium shadow-lg shadow-[#F7931A]/20 transition-all text-sm"
                    >
                        <Bitcoin className="mr-2 h-4 w-4" />
                        Join Yield Nexus Now
                    </motion.a>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
        /* Bitcoin deposit animations */
        .bitcoin-deposit-0 {
          animation: moveToVault 3s infinite;
          animation-delay: 0s;
        }
        .bitcoin-deposit-1 {
          animation: moveToVault 3s infinite;
          animation-delay: 0.7s;
        }
        .bitcoin-deposit-2 {
          animation: moveToVault 3s infinite;
          animation-delay: 1.4s;
        }
        .bitcoin-deposit-3 {
          animation: moveToVault 3s infinite;
          animation-delay: 2.1s;
        }
        
        @keyframes moveToVault {
          0% { transform: translate(0, 0); opacity: 1; }
          50% { transform: translate(170px, 0); opacity: 1; }
          51% { opacity: 0; }
          100% { transform: translate(170px, 0); opacity: 0; }
        }

        /* Strategy animations */
        .strategy-platform-0 {
          animation: pulse 3s infinite;
        }
        .strategy-platform-1 {
          animation: pulse 3.4s infinite;
          animation-delay: 0.7s;
        }
        .strategy-platform-2 {
          animation: pulse 3.6s infinite;
          animation-delay: 1.4s;
        }
        .strategy-platform-3 {
          animation: pulse 3.2s infinite;
          animation-delay: 0.3s;
        }
        .strategy-platform-4 {
          animation: pulse 3.7s infinite;
          animation-delay: 1s;
        }
        
        .strategy-line {
          animation: dash 3s infinite;
        }
        
        .strategy-particle-0 {
          animation: moveAlongLine0 4s infinite;
        }
        .strategy-particle-1 {
          animation: moveAlongLine1 4s infinite;
          animation-delay: 0.8s;
        }
        .strategy-particle-2 {
          animation: moveAlongLine2 4s infinite;
          animation-delay: 1.6s;
        }
        .strategy-particle-3 {
          animation: moveAlongLine3 4s infinite;
          animation-delay: 0.4s;
        }
        .strategy-particle-4 {
          animation: moveAlongLine4 4s infinite;
          animation-delay: 1.2s;
        }
        
        @keyframes moveAlongLine0 {
          0% { transform: translate(150px, 90px); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translate(230px, 30px); opacity: 1; }
          90% { opacity: 0; }
          100% { transform: translate(230px, 30px); opacity: 0; }
        }
        
        @keyframes moveAlongLine1 {
          0% { transform: translate(150px, 90px); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translate(230px, 150px); opacity: 1; }
          90% { opacity: 0; }
          100% { transform: translate(230px, 150px); opacity: 0; }
        }
        
        @keyframes moveAlongLine2 {
          0% { transform: translate(150px, 90px); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translate(70px, 150px); opacity: 1; }
          90% { opacity: 0; }
          100% { transform: translate(70px, 150px); opacity: 0; }
        }
        
        @keyframes moveAlongLine3 {
          0% { transform: translate(150px, 90px); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translate(70px, 30px); opacity: 1; }
          90% { opacity: 0; }
          100% { transform: translate(70px, 30px); opacity: 0; }
        }
        
        @keyframes moveAlongLine4 {
          0% { transform: translate(150px, 90px); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translate(190px, 90px); opacity: 1; }
          90% { opacity: 0; }
          100% { transform: translate(190px, 90px); opacity: 0; }
        }

        .allocation-0, .allocation-1, .allocation-2, .allocation-3, .allocation-4 {
          animation: fadeInOut 4s infinite;
        }
        .allocation-1 { animation-delay: 0.8s; }
        .allocation-2 { animation-delay: 1.6s; }
        .allocation-3 { animation-delay: 2.4s; }
        .allocation-4 { animation-delay: 3.2s; }
        
        @keyframes fadeInOut {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        
        /* Compound animations */
        .compound-stack-0 {
          animation: growStack 5s infinite;
          animation-delay: 0s;
        }
        .compound-stack-1 {
          animation: growStack 5s infinite;
          animation-delay: 1.6s;
        }
        .compound-stack-2 {
          animation: growStack 5s infinite;
          animation-delay: 3.3s;
        }
        
        @keyframes growStack {
          0% { transform: translateY(30px); opacity: 0; }
          20% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .compound-sparkle-0, .compound-sparkle-1, .compound-sparkle-2, .compound-sparkle-3 {
          animation: sparkle 2s infinite;
        }
        .compound-sparkle-1 { animation-delay: 0.5s; }
        .compound-sparkle-2 { animation-delay: 1s; }
        .compound-sparkle-3 { animation-delay: 1.5s; }
        
        @keyframes sparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }

        .compound-apy {
          animation: fadeInUp 1s ease-out forwards, float 3s ease-in-out infinite;
          animation-delay: 0.5s, 1.5s;
          opacity: 0;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes fadeInUp {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .growth-arrow, .growth-arrow-head {
          animation: drawArrow 3s infinite;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }
        
        @keyframes drawArrow {
          0% { stroke-dashoffset: 100; opacity: 0.3; }
          50% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.3; }
        }
        
        /* Withdraw animations */
        .bitcoin-withdraw-0 {
          animation: moveFromVault 3s infinite;
          animation-delay: 0s;
        }
        .bitcoin-withdraw-1 {
          animation: moveFromVault 3s infinite;
          animation-delay: 0.7s;
        }
        .bitcoin-withdraw-2 {
          animation: moveFromVault 3s infinite;
          animation-delay: 1.4s;
        }
        .bitcoin-withdraw-3 {
          animation: moveFromVault 3s infinite;
          animation-delay: 2.1s;
        }
        
        @keyframes moveFromVault {
          0% { transform: translate(0, 0); opacity: 1; }
          50% { transform: translate(170px, 0); opacity: 1; }
          51% { opacity: 0; }
          100% { transform: translate(170px, 0); opacity: 0; }
        }
        
        .withdraw-yield {
          animation: fadeIn 1s ease-out forwards;
          animation-delay: 1s;
          opacity: 0;
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .no-lock {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.7; }
        }
        
        @keyframes dash {
          to {
            stroke-dashoffset: 24;
          }
        }

        @keyframes rotate-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes gradient-slow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes pulse-slow {
    0% { opacity: 0.3; }
    50% { opacity: 0.8; }
    100% { opacity: 0.3; }
  }
  
  .animate-rotate-slow {
    animation: rotate-slow 12s linear infinite;
  }
  
  .animate-gradient-slow {
    animation: gradient-slow 8s ease infinite;
    background-size: 200% 200%;
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 2s ease-in-out infinite;
  }
      `}</style>
        </section>
    );
};

export default YieldNexusHowItWorks;