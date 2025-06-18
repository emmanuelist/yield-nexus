import { FC } from "react";


interface BackgroundElementsProps {
    animationProgress: number
}
// Animated background elements
export const BackgroundElements: FC<BackgroundElementsProps> = ({ animationProgress }) => (
    <div className="absolute inset-0 overflow-hidden">
        {/* Dot pattern */}
        <div className="absolute inset-0 bg-grid-slate-900/[0.03] dark:bg-grid-slate-900/[0.03] bg-grid-slate-900/[0.02] bg-[size:20px_20px] opacity-30"></div>

        {/* Top-right gradient blob */}
        <div
            className="absolute -right-40 -top-20 w-96 h-96 rounded-full bg-gradient-to-br dark:from-[#F7931A]/10 dark:to-indigo-600/5 from-[#F7931A]/5 to-indigo-600/5 blur-3xl"
            style={{
                transform: `translate(${Math.sin(animationProgress / 100 * Math.PI) * 10}px, ${Math.cos(animationProgress / 100 * Math.PI) * 10}px)`
            }}
        ></div>

        {/* Bottom-left gradient blob */}
        <div
            className="absolute -left-40 top-2/3 w-80 h-80 rounded-full dark:bg-[#5546FF]/5 bg-[#5546FF]/3 blur-3xl"
            style={{
                transform: `translate(${Math.cos(animationProgress / 100 * Math.PI) * 10}px, ${Math.sin(animationProgress / 100 * Math.PI) * 10}px)`
            }}
        ></div>

        {/* Center gradient accent */}
        <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-16 bg-gradient-to-r from-transparent dark:via-[#F7931A]/5 via-[#F7931A]/3 to-transparent blur-2xl"
            style={{ transform: `rotate(${animationProgress / 100 * 20}deg)` }}
        ></div>
    </div>
);