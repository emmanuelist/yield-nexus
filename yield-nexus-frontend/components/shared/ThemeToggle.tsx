"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const ThemeToggle: React.FC = () => {
    const { setTheme, theme } = useTheme();

    return (
        <motion.div
            className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full p-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <button
                onClick={() => setTheme('light')}
                className={`p-1 rounded-full transition-all duration-300 ${theme === 'light'
                    ? 'bg-gradient-to-r from-[#0c1e5c]/95 to-[#192559]/95 hover:from-[#192559]/95 hover:to-[#0c1e5c]/95 text-white '
                    : 'bg-transparent text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800'
                    }`}
                aria-label="Light mode"
            >
                <Sun className="h-4 w-4" />
            </button>
            <button
                onClick={() => setTheme('dark')}
                className={`p-1 rounded-full transition-all duration-300 ${theme === 'dark'
                    ? "bg-gradient-to-r from-[#F7931A]/95 to-[#e87b15]/95 hover:from-[#e87b15]/95 hover:to-[#F7931A]/95 text-white"
                    : 'bg-transparent text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800'
                    }`}
                aria-label="Dark mode"
            >
                <Moon className="h-4 w-4" />
            </button>
        </motion.div>
    );
};

export default ThemeToggle;