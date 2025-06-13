"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranchPlus, Twitter } from 'lucide-react';
import YieldNexusLogo from '../shared/YieldNexusLogo';

const Footer: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollProgress, setScrollProgress] = useState(0);

    // Track mouse position for subtle hover effects
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Track scroll for parallax effects
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const documentHeight = document.body.scrollHeight - window.innerHeight;
            const progress = Math.min(scrollY / documentHeight, 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const footerLinks = [
        {
            title: "Protocol",
            links: [
                { label: "Documentation", href: "#docs" },
                { label: "Security", href: "#security" },
                { label: "Governance", href: "#governance" },
                { label: "Audit Reports", href: "#audits" },
                { label: "Statistics", href: "#stats" }
            ]
        },
        {
            title: "Resources",
            links: [
                { label: "Blog", href: "#blog" },
                { label: "Help Center", href: "#help" },
                { label: "Community", href: "#community" },
                { label: "Developers", href: "#developers" },
                { label: "API", href: "#api" }
            ]
        },
        {
            title: "Company",
            links: [
                { label: "About", href: "#about" },
                { label: "Careers", href: "#careers" },
                { label: "Terms of Service", href: "#terms" },
                { label: "Privacy Policy", href: "#privacy" },
                { label: "Contact", href: "#contact" }
            ]
        }
    ];

    return (
        <footer className="relative py-10 overflow-hidden isolate">
            {/* Sophisticated Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b dark:from-slate-900 dark:to-[#050816] from-slate-50 to-slate-100"></div>

                {/* Premium Pattern Overlay */}
                <div className="absolute inset-0 dark:bg-grid-slate-700/[0.03] bg-grid-slate-300/[0.08] bg-[size:20px_20px] opacity-40"></div>

                {/* Animated Gradient Blob */}
                <div
                    className="absolute -right-40 -top-40 w-96 h-96 rounded-full dark:bg-[#F7931A]/5 bg-[#F7931A]/3 blur-3xl"
                    style={{
                        transform: `translate(${Math.sin(scrollProgress * Math.PI) * 20}px, ${Math.cos(scrollProgress * Math.PI) * 20}px)`
                    }}
                ></div>

                <div
                    className="absolute -left-40 top-1/2 w-80 h-80 rounded-full dark:bg-indigo-600/5 bg-indigo-600/3 blur-3xl"
                    style={{
                        transform: `translate(${Math.cos(scrollProgress * Math.PI) * 20}px, ${Math.sin(scrollProgress * Math.PI) * 20}px)`
                    }}
                ></div>

                {/* Subtle Light Beam */}
                <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-24 bg-gradient-to-r from-transparent dark:via-[#F7931A]/3 via-[#F7931A]/2 to-transparent blur-2xl"
                    style={{ transform: `rotate(${scrollProgress * 30}deg)` }}
                ></div>

                {/* Radial Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-radial-gradient"></div>
            </div>

            {/* Stylized Top Border with Curve */}
            <div className="absolute top-0 inset-x-0">
                <div className="h-px bg-gradient-to-r from-transparent via-[#F7931A]/30 to-transparent"></div>
                <svg viewBox="0 0 1440 12" fill="none" preserveAspectRatio="none" className="w-full h-3">
                    <path
                        d="M0,0 L1440,0 C1296,12 144,12 0,0 Z"
                        className="dark:fill-slate-800/30 fill-slate-300/30"
                    />
                </svg>
            </div>

            {/* Main Content Container */}
            <div className="container mx-auto px-4 relative z-10">


                <div className="grid grid-cols-12 gap-6">
                    {/* Logo Column - Increased width */}
                    <div className="col-span-12 md:col-span-4 lg:col-span-4 mb-6 md:mb-0">
                        <div className="flex flex-col">
                            <div className="mb-2.5">
                                <YieldNexusLogo extra_text />
                            </div>
                            <p className="text-xs dark:text-slate-400 text-slate-600 max-w-xs pr-4">
                                The premier multi-chain yield aggregation platform. Generate optimized DeFi returns across multiple blockchains without sacrificing security or control.
                            </p>

                            {/* Social Icons with Community Stats - Horizontal Layout */}
                            <div className="mt-4 flex items-center space-x-3">
                                {[
                                    { icon: <Twitter className="w-3.5 h-3.5" />, color: "#1DA1F2", href: "#twitter" },
                                    { icon: <GitBranchPlus className="w-3.5 h-3.5" />, color: "#333", href: "#github" },
                                    {
                                        icon: <div className="w-3.5 h-3.5 flex items-center justify-center">
                                            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                                                <path d="M12 1L1 7l11 6 11-6-11-6z"></path>
                                                <path d="M1 17l11 6 11-6"></path>
                                                <path d="M1 12l11 6 11-6"></path>
                                            </svg>
                                        </div>, color: "#5865F2", href: "#discord"
                                    }
                                ].map((social, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={social.href}
                                        className="w-7 h-7 rounded-full dark:bg-slate-800/80 bg-white/80 dark:text-slate-300 text-slate-700 dark:border-slate-700/60 border-slate-200/60 border flex items-center justify-center shadow-sm"
                                        whileHover={{
                                            y: -2,
                                            backgroundColor: social.color,
                                            color: "#FFFFFF",
                                            borderColor: social.color,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}

                                {/* Stats Badge */}
                                <div className="ml-1 text-[0.65rem] px-2 py-0.5 rounded-full dark:bg-slate-800/70 bg-white/70 dark:border-slate-700/40 border-slate-200/60 border shadow-sm dark:text-[#F7931A] text-[#F7931A]">
                                    <span className="font-medium">28.4K</span>
                                    <span className="dark:text-slate-400 text-slate-500 ml-0.5">Multi-Chain Users</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Links Grid - Reduced width and moved to the right */}
                    <div className="col-span-12 md:col-span-8 lg:col-span-8">
                        <div className="grid grid-cols-3 gap-6">
                            {/* Links Columns */}
                            {footerLinks.map((column, idx) => (
                                <div key={idx} className="col-span-1">
                                    <h3 className="text-sm font-semibold dark:text-white text-slate-800 mb-3 flex items-center">
                                        <span className="w-1 h-4 bg-gradient-to-b from-[#F7931A] to-amber-600/50 rounded-full mr-2"></span>
                                        {column.title}
                                    </h3>
                                    <ul className="space-y-1.5">
                                        {column.links.map((link, linkIdx) => (
                                            <li key={linkIdx}>
                                                <motion.a
                                                    href={link.href}
                                                    className="text-xs dark:text-slate-400 text-slate-600 hover:text-[#F7931A] dark:hover:text-[#F7931A] transition-colors flex items-center group"
                                                    whileHover={{ x: 2 }}
                                                >
                                                    <span className="w-0 group-hover:w-1 h-0 group-hover:h-2 bg-[#F7931A]/70 rounded-full mr-0 group-hover:mr-1.5 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                                                    {link.label}
                                                </motion.a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full h-10 mt-6 mb-4 relative">
                    <svg viewBox="0 0 1440 20" fill="none" preserveAspectRatio="none" className="w-full h-full">
                        <path
                            d="M0,20 C360,0 1080,0 1440,20"
                            stroke="url(#footerDivider)"
                            strokeWidth="1"
                            fill="none"
                            className="dark:opacity-30 opacity-20"
                        />
                        <defs>
                            <linearGradient id="footerDivider" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="#F7931A" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                            whileHover={{ y: -2 }}
                            className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#F7931A]/10 to-amber-600/10 dark:text-[#F7931A] text-[#F7931A] border border-[#F7931A]/20 text-[0.65rem] font-medium shadow-sm"
                        >
                            v1.2.0 Nexus
                        </motion.div>
                    </div>
                </div>

                <div className="flex flex-row justify-between items-center pt-2 border-t dark:border-slate-800/50 border-slate-200/50">
                    <p className="text-[0.65rem] dark:text-slate-500 text-slate-500">
                        © {new Date().getFullYear()} Yield Nexus. All rights reserved.
                    </p>

                    <div className="flex items-center space-x-6 text-[0.65rem]">
                        <a href="#terms" className="dark:text-slate-500 text-slate-500 hover:text-[#F7931A] dark:hover:text-[#F7931A] transition-colors">Terms</a>
                        <a href="#privacy" className="dark:text-slate-500 text-slate-500 hover:text-[#F7931A] dark:hover:text-[#F7931A] transition-colors">Privacy</a>
                        <a href="#security" className="dark:text-slate-500 text-slate-500 hover:text-[#F7931A] dark:hover:text-[#F7931A] transition-colors">Security</a>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .bg-radial-gradient {
          background-image: radial-gradient(circle at 50% 80%, rgba(247, 147, 26, 0.03), transparent 60%);
        }
      `}</style>
        </footer>
    );
};

export default Footer;
