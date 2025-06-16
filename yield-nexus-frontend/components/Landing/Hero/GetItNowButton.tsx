"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const GetItNowButton: React.FC = () => {
    return (
        <motion.div
            className="relative"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
        >
            <button className="relative group overflow-hidden flex items-center justify-between bg-gradient-to-r from-slate-900/95 to-slate-800/95 hover:from-slate-800/95 hover:to-slate-700/95 dark:from-slate-800/90 dark:to-slate-700/90 dark:hover:from-slate-700/90 dark:hover:to-slate-600/90 rounded-full pl-5 pr-2 py-1 text-white font-medium tracking-wide shadow-xl border border-slate-700/50 dark:border-slate-600/50 backdrop-blur-sm">
                <span className="text-[0.7rem] md:text-sm uppercase mr-4 font-semibold">Learn More</span>

                {/* Circle with arrow - Yield Nexus branded */}
                <div className="flex items-center justify-center bg-gradient-to-r from-[#F7931A] to-amber-500 rounded-full h-6 w-6 md:h-8 md:w-8 shadow-inner">
                    <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 2 }}
                        className="group-hover:translate-x-0.5 transition-transform duration-300"
                    >
                        <ArrowRight className="h-4 w-4 text-white" />
                    </motion.div>
                </div>

                {/* Sophisticated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#F7931A]/5 to-amber-500/10 opacity-60 rounded-full pointer-events-none"></div>

                {/* Premium glow effect - matches Yield Nexus theme */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F7931A]/20 to-amber-500/20 opacity-0 group-hover:opacity-100 rounded-full blur-sm transition-opacity duration-300 pointer-events-none"></div>

                {/* Subtle inner highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
            </button>
        </motion.div>
    );
};

export default GetItNowButton;