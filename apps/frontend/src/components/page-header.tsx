import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Flag } from "lucide-react";
import type React from "react";
import scottyCoin from "/images/scotty-coin.svg";

interface PageHeaderProps {
    title: string;
    icon: React.ReactNode;
    bgColor?: string;
    textColor?: string;
    leftComponent?: React.ReactNode;
    rightComponent?: React.ReactNode;
}

export function PageHeader({
    title,
    icon,
    bgColor = "#C8102E", // CMU red as default
    textColor = "#fff",
    leftComponent,
    rightComponent,
}: PageHeaderProps) {
    // Dummy data for stats
    const challengesCompleted = 1;
    const totalChallenges = 15;
    const scottyCoins = 260;

    return (
        <div>
            <div
                className="relative flex flex-col items-center justify-center pb-4"
                style={{ background: bgColor }}
            >
                {/* Top stats row */}
                <div className="w-full flex flex-row justify-between items-center px-6 pt-2">
                    {/* All Challenges Stat */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <button
                                type="button"
                                className="flex items-center bg-white rounded-full px-2 py-1 shadow text-xs font-bold gap-1"
                                aria-label="View Challenges"
                            >
                                <Flag size={16} className="text-red-600" />
                                <span>
                                    {challengesCompleted}/{totalChallenges}
                                </span>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="rounded-xl max-w-[90vw] min-w-[150px] text-center">
                            Go to Challenges (dummy)
                        </PopoverContent>
                    </Popover>
                    {/* ScottyCoins Stat */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <button
                                type="button"
                                className="flex items-center bg-white rounded-full px-2 py-1 shadow text-xs font-bold gap-1"
                                aria-label="View Coins"
                            >
                                <img
                                    src={scottyCoin}
                                    alt="Scotty Coin"
                                    className="w-4 h-4"
                                />
                                <span>{scottyCoins}</span>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="rounded-xl max-w-[90vw] min-w-[150px] text-center">
                            View Coins (dummy)
                        </PopoverContent>
                    </Popover>
                </div>
                {/* Main icon row */}
                <div className="relative flex flex-row items-center justify-center w-full mt-2">
                    {/* Left optional component */}
                    <div className="absolute left-6 flex items-center">
                        {leftComponent}
                    </div>
                    {/* Center icon */}
                    <div className="flex flex-col items-center">
                        <div
                            className="bg-white rounded-full p-3 border-4 border-white shadow"
                            style={{ marginBottom: "-12px", zIndex: 1 }}
                        >
                            {icon}
                        </div>
                    </div>
                    {/* Right optional component */}
                    <div className="absolute right-6 flex items-center">
                        {rightComponent}
                    </div>
                </div>
                {/* Decorative arc at the bottom */}
                <div
                    className="w-full overflow-hidden"
                    style={{ lineHeight: 0, marginTop: "-20px" }}
                >
                    <svg
                        viewBox="0 0 375 60"
                        width="100%"
                        height="60"
                        preserveAspectRatio="none"
                        style={{ display: "block" }}
                        role="img"
                        aria-label="Decorative arc separator"
                    >
                        <title>Decorative arc separator</title>
                        <path
                            d="M0,60 Q187.5,10 375,60 L375,60 L0,60 Z"
                            fill="#f5e6e8"
                        />
                    </svg>
                </div>
            </div>
            {/* Title below the arc */}
            <div
                className="flex justify-center items-center py-2"
                style={{ background: "#f5e6e8" }}
            >
                <span
                    className="font-extrabold text-2xl text-center select-none"
                    style={{ color: textColor }}
                >
                    {title}
                </span>
            </div>
        </div>
    );
}
