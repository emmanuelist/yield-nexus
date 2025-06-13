"use client"


import { ArrowRight, BarChart3, Layers, LineChart, Trophy, Zap } from "lucide-react";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";

export function LayoutContent({ children }: { children: React.ReactNode }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState<string | null>(null);

    // Navigation links (move this from Navbar)
    const navLinks = [
        { name: "Dashboard", href: "/dashboard", icon: <BarChart3 className="w-4 h-4 mr-2" /> },
        {
            name: "Strategies",
            href: "#strategies",
            icon: <Layers className="w-4 h-4 mr-2" />,
            subItems: [
                {
                    title: "Bitcoin Yield",
                    href: "/strategies/bitcoin",
                    icon: <Zap className="w-4 h-4 mr-2" />,
                    description: "Earn yield on Bitcoin holdings"
                },
                {
                    title: "Ethereum Strategies",
                    href: "/strategies/ethereum",
                    icon: <Layers className="w-4 h-4 mr-2" />,
                    description: "Multi-DeFi protocol strategies"
                },
                {
                    title: "Cross-Chain",
                    href: "/strategies/cross-chain",
                    icon: <ArrowRight className="w-4 h-4 mr-2" />,
                    description: "Bridge yield opportunities"
                },
                {
                    title: "Auto-Compound",
                    href: "/strategies/auto-compound",
                    icon: <Trophy className="w-4 h-4 mr-2" />,
                    description: "Automated reinvestment"
                },
            ]
        },
        {
            name: "Portfolio",
            href: "#portfolio",
            icon: <Trophy className="w-4 h-4 mr-2" />,
            subItems: [
                {
                    title: "My Positions",
                    href: "/portfolio/positions",
                    icon: <BarChart3 className="w-4 h-4 mr-2" />,
                    description: "View active positions"
                },
                {
                    title: "Rewards",
                    href: "/portfolio/rewards",
                    icon: <Trophy className="w-4 h-4 mr-2" />,
                    description: "Claim earned rewards"
                },
                {
                    title: "History",
                    href: "/portfolio/history",
                    icon: <LineChart className="w-4 h-4 mr-2" />,
                    description: "Transaction history"
                },
            ]
        },
        { name: "Analytics", href: "/analytics", icon: <LineChart className="w-4 h-4 mr-2" /> },
    ];

    return (
        <>
            <Navbar
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                activeLink={activeLink}
                setActiveLink={setActiveLink}
                navLinks={navLinks}
            />
            {children}
            <Footer />

            {/* Mobile Menu - Rendered at body level */}
            <MobileMenu
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                activeLink={activeLink}
                navLinks={navLinks}
            />
        </>
    );
}
