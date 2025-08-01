import { useChallengeData } from "@/lib/hooks/use-challenge-data";
import { Link } from "@tanstack/react-router";
import { Flag } from "lucide-react";
import type React from "react";
import headerArc from "/images/header-arc.svg";
import scottyCoin from "/images/scotty-coin.svg";
import { ChallengesMenu } from "./challenges-menu";

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
    textColor = "#C8102E",
    leftComponent,
    rightComponent,
}: PageHeaderProps) {
    const { data: challengeData } = useChallengeData();

    // Use real data if available, fallback to dummy data
    const challengesCompleted = challengeData?.totalCompleted ?? 1;
    const totalChallenges = challengeData?.totalChallenges ?? 15;
    const scottyCoins = 260;

    return (
        <div
            className="relative flex flex-col items-center justify-center w-full"
            style={{ background: bgColor }}
        >
            {/* Top stats row */}
            <div className="w-full flex flex-row justify-between items-center px-6 pt-8 z-1">
                {/* All Challenges Stat */}
                <ChallengesMenu />
                {/* ScottyCoins Stat */}
                <Link
                    to="/terrier-trade"
                    className="flex items-center bg-white rounded-full px-3 py-2 shadow text-sm font-bold gap-1"
                    aria-label="View Coins"
                >
                    <img
                        src={scottyCoin}
                        alt="Scotty Coin"
                        className="w-5 h-5"
                    />
                    <span>{scottyCoins}</span>
                </Link>
            </div>
            {/* Main icon row */}
            <div className="relative flex flex-row items-center justify-center w-full mt-2">
                {/* Center icon */}
                <div className="flex flex-col items-center">
                    <div
                        className="bg-white rounded-full p-3 border-4 border-white shadow"
                        style={{ marginBottom: "-12px", zIndex: 1 }}
                    >
                        {icon}
                    </div>
                </div>
            </div>
            {/* Decorative arc with title inside */}
            <div
                className="w-full overflow-hidden relative"
                style={{ marginTop: "-100px", marginBottom: "-0.75px" }}
            >
                <img
                    src={headerArc}
                    alt="Decorative arc separator"
                    className="w-full h-full block"
                    style={{ width: "calc(120vw)"}}
                />
                {/* Title and components positioned inside the arc, below the icon */}
                <div className="absolute inset-0 flex justify-between items-end px-6 pb-1">
                    {/* Left optional component */}
                    <div className="flex items-center">{leftComponent}</div>
                    {/* Title */}
                    <span
                        className="font-extrabold text-2xl text-center select-none"
                        style={{ color: textColor }}
                    >
                        {title}
                    </span>
                    {/* Right optional component */}
                    <div className="flex items-center">{rightComponent}</div>
                </div>
            </div>
        </div>
    );
}
