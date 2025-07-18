import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Check, Circle, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Challenge } from "../lib/types";

// Circular icons for each state using Lucide icons
const CompletedIcon = () => (
    <div className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center border-4 border-white shadow">
        <Check size={20} color="white" strokeWidth={3} />
    </div>
);

const UnlockedIcon = () => (
    <div className="w-10 h-10 rounded-full bg-[#E74C3C] flex items-center justify-center border-4 border-white shadow">
        {/* <Circle size={16} color="#E74C3C" fill="none" strokeWidth={2} /> */}
    </div>
);

const LockedIcon = () => (
    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border-4 border-white shadow">
        <Lock size={16} color="white" strokeWidth={2} />
    </div>
);

// Wrapper component that adds icon and line
export function ChallengeCardWithIcon({ challenge }: { challenge: Challenge }) {
    const { unlocked, completed } = challenge;

    let Icon = null;
    if (!unlocked) Icon = LockedIcon;
    else if (completed) Icon = CompletedIcon;
    else Icon = UnlockedIcon;

    return (
        <div className="flex flex-row items-center w-full">
            {" "}
            {/* Icon */}
            <div className="flex flex-col justify-center items-center mr-4 h-full z-10 challenge-icon">
                <Icon />
            </div>
            {/* Card content */}
            <div className="flex-1">
                <ChallengeCard challenge={challenge} />
            </div>
        </div>
    );
}

// Main wrapper
export function ChallengeCard({ challenge }: { challenge: Challenge }) {
    const {
        name,
        description,
        coins_earned_for_completion,
        completed,
        unlocked,
        unlock_date,
    } = challenge;
    // Locked state
    if (!unlocked) {
        return (
            <Card className="bg-[#172126] rounded-2xl w-full max-w-lg shadow-md">
                <CardContent className="flex items-center min-h-0">
                    <div className="w-12 h-12 rounded-lg bg-black mr-4 -rotate-6" />
                    <div className="flex-1">
                        <div className="font-bold text-white text-base">
                            {name}
                        </div>
                        <div className="text-gray-200 text-xs">
                            Unlocks on {unlock_date}
                        </div>
                    </div>
                    <div className="ml-2">
                        <div className="relative">
                            <div className="absolute top-7 w-11 h-3 rounded-b-md bg-gray-400 z-0" />
                            <div className="w-11 h-9 rounded-md bg-white flex items-center justify-center relative z-10">
                                <Lock size={20} color="#222" strokeWidth={2} />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }
    // Completed state
    if (completed) {
        return (
            <Card className="bg-green-100 rounded-2xl w-full max-w-lg shadow-md">
                <CardContent className="flex items-center min-h-0">
                    <div className="w-12 h-12 mr-4 flex items-center justify-center -rotate-6">
                        <BadgeCheck size={48} color="#fff" fill="#4CAF50" />
                    </div>
                    <div className="flex-1 font-bold text-[#4CAF50] text-base line-through">
                        {name}
                    </div>
                </CardContent>
            </Card>
        );
    }
    // Unlocked but not completed
    return (
        <Card className="bg-white rounded-2xl w-full max-w-lg shadow-md">
            <CardContent className="flex items-center min-h-0">
                <div className="w-12 h-12 rounded-lg bg-[#E74C3C] mr-4 -rotate-6" />
                <div className="flex-1">
                    <div className="font-bold text-black text-base">{name}</div>
                    <div className="text-gray-500 text-xs">{description}</div>
                </div>
                <div className="flex items-center gap-1 ml-1">
                    <span className="font-bold text-black text-sm">
                        {coins_earned_for_completion}
                    </span>
                    <img
                        src="/images/scotty-coin.svg"
                        alt="Scotty Coin"
                        className="w-6 h-6 mt-1"
                    />
                    <div className="relative">
                        <div className="absolute top-7 w-11 h-3 rounded-b-md bg-gray-300 z-0" />
                        <Button className="w-11 h-9 rounded-md bg-gray-100 flex items-center justify-center relative z-10">
                            <Check size={40} color="#4CAF50" strokeWidth={3} />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function ChallengeList({ challenges }: { challenges: Challenge[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [lineStyle, setLineStyle] = useState({ top: 0, height: 0 });

    useEffect(() => {
        if (!containerRef.current) return;
        const icons = containerRef.current.querySelectorAll(".challenge-icon");
        if (icons.length < 2) return;

        const first = icons[0] as HTMLElement;
        const last = icons[icons.length - 1] as HTMLElement;

        const containerRect = containerRef.current.getBoundingClientRect();
        const firstRect = first.getBoundingClientRect();
        const lastRect = last.getBoundingClientRect();

        // Calculate top relative to container, and height between centers
        const top = firstRect.top - containerRect.top + firstRect.height / 2;
        const bottom = lastRect.top - containerRect.top + lastRect.height / 2;
        setLineStyle({
            top,
            height: bottom - top,
        });
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative flex flex-col items-start w-full gap-3"
        >
            {/* Vertical line */}
            <div
                className="absolute left-5 w-px border-l-2 border-dashed border-gray-300 z-0"
                style={{
                    top: lineStyle.top,
                    height: lineStyle.height,
                }}
            />
            {challenges.map((challenge) => (
                <ChallengeCardWithIcon
                    key={challenge.id}
                    challenge={challenge}
                />
            ))}
        </div>
    );
}
