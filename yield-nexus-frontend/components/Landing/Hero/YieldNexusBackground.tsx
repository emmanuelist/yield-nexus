"use client";

import React from "react";

const YieldNexusBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Multi-chain network visualization */}
            <div className="absolute inset-0">
                <svg width="100%" height="100%" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        {/* Yield Nexus brand gradients */}
                        <linearGradient id="nexusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F7931A" stopOpacity="0.4" />
                            <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#D97706" stopOpacity="0.2" />
                        </linearGradient>

                        <linearGradient id="secondaryNexusGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
                            <stop offset="50%" stopColor="#6366F1" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.08" />
                        </linearGradient>

                        {/* Dark mode depth gradient */}
                        <linearGradient id="depthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#060f38" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#0A0E1F" stopOpacity="0.9" />
                        </linearGradient>

                        {/* Light mode depth gradient */}
                        <linearGradient id="lightDepthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F8FAFC" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#F1F5F9" stopOpacity="0.95" />
                        </linearGradient>

                        <filter id="nexusGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Base layers - responsive to theme */}
                    <rect className="dark:opacity-100 opacity-0" x="0" y="0" width="100%" height="100%" fill="url(#depthGradient)" />
                    <rect className="dark:opacity-0 opacity-100" x="0" y="0" width="100%" height="100%" fill="url(#lightDepthGradient)" />

                    {/* Multi-chain network visualization - central nexus hub */}
                    <g className="dark:opacity-20 opacity-30">
                        {/* Central Yield Nexus hub */}
                        <circle cx="720" cy="400" r="120" fill="none" stroke="#F7931A" strokeWidth="0.5" />
                        <circle cx="720" cy="400" r="80" fill="none" stroke="#FBBF24" strokeWidth="0.4" />
                        <circle cx="720" cy="400" r="40" fill="none" stroke="#F7931A" strokeWidth="0.3" />

                        {/* Multi-chain network nodes */}
                        <g transform="translate(200, 200)">
                            <circle cx="0" cy="0" r="60" fill="none" stroke="#3B82F6" strokeWidth="0.4" />
                            <polygon points="0,-30 26,15 -26,15" fill="none" stroke="#3B82F6" strokeWidth="0.3" />
                            <text x="0" y="80" textAnchor="middle" fontSize="10" fill="#3B82F6" opacity="0.6">ETH</text>
                        </g>

                        <g transform="translate(1200, 200)">
                            <circle cx="0" cy="0" r="60" fill="none" stroke="#6366F1" strokeWidth="0.4" />
                            <rect x="-20" y="-20" width="40" height="40" fill="none" stroke="#6366F1" strokeWidth="0.3" />
                            <text x="0" y="80" textAnchor="middle" fontSize="10" fill="#6366F1" opacity="0.6">AVAX</text>
                        </g>

                        <g transform="translate(200, 600)">
                            <circle cx="0" cy="0" r="60" fill="none" stroke="#8B5CF6" strokeWidth="0.4" />
                            <circle cx="0" cy="0" r="25" fill="none" stroke="#8B5CF6" strokeWidth="0.3" />
                            <text x="0" y="80" textAnchor="middle" fontSize="10" fill="#8B5CF6" opacity="0.6">MATIC</text>
                        </g>

                        <g transform="translate(1200, 600)">
                            <circle cx="0" cy="0" r="60" fill="none" stroke="#10B981" strokeWidth="0.4" />
                            <path d="M-20,-10 L20,-10 L10,20 L-10,20 Z" fill="none" stroke="#10B981" strokeWidth="0.3" />
                            <text x="0" y="80" textAnchor="middle" fontSize="10" fill="#10B981" opacity="0.6">ARB</text>
                        </g>

                        {/* Additional chain nodes */}
                        <g transform="translate(720, 120)">
                            <circle cx="0" cy="0" r="50" fill="none" stroke="#EF4444" strokeWidth="0.4" />
                            <path d="M-15,0 L0,-25 L15,0 L0,25 Z" fill="none" stroke="#EF4444" strokeWidth="0.3" />
                            <text x="0" y="70" textAnchor="middle" fontSize="10" fill="#EF4444" opacity="0.6">OP</text>
                        </g>

                        <g transform="translate(720, 680)">
                            <circle cx="0" cy="0" r="50" fill="none" stroke="#F59E0B" strokeWidth="0.4" />
                            <polygon points="0,-20 18,10 -18,10" fill="none" stroke="#F59E0B" strokeWidth="0.3" />
                            <text x="0" y="70" textAnchor="middle" fontSize="10" fill="#F59E0B" opacity="0.6">BSC</text>
                        </g>
                    </g>

                    {/* Yield flow connections - sophisticated pattern */}
                    <g className="dark:opacity-15 opacity-10">
                        <path d="M 260,200 C 450,300 550,350 720,400" fill="none" stroke="#F7931A" strokeWidth="1" strokeDasharray="2,8" />
                        <path d="M 1140,200 C 950,300 850,350 720,400" fill="none" stroke="#F7931A" strokeWidth="1" strokeDasharray="2,8" />
                        <path d="M 260,600 C 450,500 550,450 720,400" fill="none" stroke="#F7931A" strokeWidth="1" strokeDasharray="2,8" />
                        <path d="M 1140,600 C 950,500 850,450 720,400" fill="none" stroke="#F7931A" strokeWidth="1" strokeDasharray="2,8" />
                        <path d="M 720,170 C 720,250 720,300 720,350" fill="none" stroke="#F7931A" strokeWidth="1" strokeDasharray="2,8" />
                        <path d="M 720,630 C 720,550 720,500 720,450" fill="none" stroke="#F7931A" strokeWidth="1" strokeDasharray="2,8" />
                    </g>

                    {/* Data nodes with sophisticated glow */}
                    <g filter="url(#nexusGlow)">
                        <circle cx="720" cy="400" r="4" fill="#F7931A" />
                        <circle cx="200" cy="200" r="3" fill="#3B82F6" />
                        <circle cx="1200" cy="200" r="3" fill="#6366F1" />
                        <circle cx="200" cy="600" r="3" fill="#8B5CF6" />
                        <circle cx="1200" cy="600" r="3" fill="#10B981" />
                        <circle cx="720" cy="120" r="2.5" fill="#EF4444" />
                        <circle cx="720" cy="680" r="2.5" fill="#F59E0B" />

                        {/* Connection points */}
                        <circle cx="450" cy="250" r="2" fill="#F7931A" />
                        <circle cx="950" cy="250" r="2" fill="#F7931A" />
                        <circle cx="450" cy="550" r="2" fill="#F7931A" />
                        <circle cx="950" cy="550" r="2" fill="#F7931A" />
                        <circle cx="720" cy="260" r="1.5" fill="#F7931A" />
                        <circle cx="720" cy="540" r="1.5" fill="#F7931A" />
                    </g>

                    {/* Pulse rings - elegant animation */}
                    <circle cx="720" cy="400" r="25" fill="none" stroke="#F7931A" strokeWidth="0.5" className="dark:opacity-30 opacity-20 pulse-ring" />
                    <circle cx="720" cy="400" r="45" fill="none" stroke="#F7931A" strokeWidth="0.3" className="dark:opacity-20 opacity-15 pulse-ring delay-1" />
                    <circle cx="720" cy="400" r="65" fill="none" stroke="#F7931A" strokeWidth="0.2" className="dark:opacity-10 opacity-8 pulse-ring delay-2" />

                    {/* Chain-specific pulse rings */}
                    <circle cx="200" cy="200" r="15" fill="none" stroke="#3B82F6" strokeWidth="0.3" className="dark:opacity-20 opacity-15 pulse-ring delay-3" />
                    <circle cx="1200" cy="200" r="15" fill="none" stroke="#6366F1" strokeWidth="0.3" className="dark:opacity-20 opacity-15 pulse-ring delay-4" />
                    <circle cx="200" cy="600" r="15" fill="none" stroke="#8B5CF6" strokeWidth="0.3" className="dark:opacity-20 opacity-15 pulse-ring delay-5" />
                    <circle cx="1200" cy="600" r="15" fill="none" stroke="#10B981" strokeWidth="0.3" className="dark:opacity-20 opacity-15 pulse-ring delay-6" />
                </svg>
            </div>

            {/* Refined bottom technology wave - multi-chain theme */}
            <div className="absolute bottom-0 left-0 right-0 h-64 dark:opacity-10 opacity-8">
                <svg width="100%" height="100%" viewBox="0 0 1440 200" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="enhancedNexusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F7931A" stopOpacity="0.5" />
                            <stop offset="33%" stopColor="#3B82F6" stopOpacity="0.4" />
                            <stop offset="66%" stopColor="#6366F1" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                        </linearGradient>

                        <linearGradient id="lightNexusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F7931A" stopOpacity="0.3" />
                            <stop offset="33%" stopColor="#3B82F6" stopOpacity="0.25" />
                            <stop offset="66%" stopColor="#6366F1" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.15" />
                        </linearGradient>
                    </defs>

                    {/* Wave backgrounds - dark mode */}
                    <path
                        className="wave-animation-slow dark:opacity-100 opacity-0"
                        d="M0,100 C240,160 480,180 720,130 C960,80 1200,140 1440,160 L1440,200 L0,200 Z"
                        fill="url(#enhancedNexusGradient)"
                    />

                    {/* Wave backgrounds - light mode */}
                    <path
                        className="wave-animation-slow dark:opacity-0 opacity-100"
                        d="M0,100 C240,160 480,180 720,130 C960,80 1200,140 1440,160 L1440,200 L0,200 Z"
                        fill="url(#lightNexusGradient)"
                    />

                    {/* Multi-chain data points */}
                    {Array.from({ length: 20 }).map((_, i) => (
                        <circle
                            key={`nexus-dot-${i}`}
                            cx={72 + (i * 70)}
                            cy={130 + (Math.sin(i * 0.6) * 25)}
                            r={0.8 + (i % 5) * 0.3}
                            fill={i % 4 === 0 ? "#F7931A" : i % 4 === 1 ? "#3B82F6" : i % 4 === 2 ? "#6366F1" : "#8B5CF6"}
                            className={`dark:opacity-40 opacity-25 data-point-pulse delay-${i % 8}`}
                        />
                    ))}

                    {/* Multi-chain connection paths */}
                    <path
                        d="M0,135 C300,115 600,155 900,125 C1100,105 1300,130 1440,140"
                        fill="none"
                        stroke="#F7931A"
                        strokeWidth="0.4"
                        strokeDasharray="3,12"
                        className="dark:opacity-25 opacity-15 path-animation"
                    />

                    <path
                        d="M0,120 C360,140 720,110 1080,130 C1260,140 1350,135 1440,125"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="0.4"
                        strokeDasharray="3,12"
                        className="dark:opacity-20 opacity-12 path-animation-reverse"
                    />
                </svg>
            </div>

            {/* CSS animations for sophisticated effects */}
            <style jsx>{`
                .pulse-ring {
                    animation: nexusPulse 6s infinite;
                    transform-origin: center;
                }
                
                .delay-1 { animation-delay: 1s; }
                .delay-2 { animation-delay: 2s; }
                .delay-3 { animation-delay: 3s; }
                .delay-4 { animation-delay: 4s; }
                .delay-5 { animation-delay: 5s; }
                .delay-6 { animation-delay: 0.5s; }
                
                @keyframes nexusPulse {
                    0% { transform: scale(0.95); opacity: 0.3; }
                    50% { transform: scale(1.05); opacity: 0.1; }
                    100% { transform: scale(0.95); opacity: 0.3; }
                }

                .wave-animation-slow {
                    animation: waveMove 30s infinite alternate ease-in-out;
                }
                
                .data-point-pulse {
                    animation: dataPulse 5s infinite;
                    transform-origin: center;
                }
                
                .path-animation {
                    animation: pathGlow 10s infinite;
                }
                
                .path-animation-reverse {
                    animation: pathGlow 10s infinite reverse;
                }
                
                .delay-0 { animation-delay: 0s; }
                .delay-1 { animation-delay: 0.6s; }
                .delay-2 { animation-delay: 1.2s; }
                .delay-3 { animation-delay: 1.8s; }
                .delay-4 { animation-delay: 2.4s; }
                .delay-5 { animation-delay: 3s; }
                .delay-6 { animation-delay: 3.6s; }
                .delay-7 { animation-delay: 4.2s; }
                
                @keyframes waveMove {
                    0% { transform: translateX(-15px); }
                    100% { transform: translateX(15px); }
                }
                
                @keyframes dataPulse {
                    0% { transform: scale(0.8); opacity: 0.3; }
                    50% { transform: scale(1.5); opacity: 0.6; }
                    100% { transform: scale(0.8); opacity: 0.3; }
                }
                
                @keyframes pathGlow {
                    0% { opacity: 0.1; stroke-width: 0.3; }
                    50% { opacity: 0.4; stroke-width: 0.6; }
                    100% { opacity: 0.1; stroke-width: 0.3; }
                }
            `}</style>
        </div>
    );
};

export default YieldNexusBackground;