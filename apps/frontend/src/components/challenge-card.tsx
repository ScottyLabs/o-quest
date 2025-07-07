import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface Challenge {
    name: string;
    description: string;
    completed: boolean;
    unlocked: boolean;
    unlock_date: string;
}

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
    const [scanned, setScanned] = useState(false);
    const isUnlocked = challenge.unlocked;
    const isCompleted = challenge.completed || scanned;

    return (
        <Card
            className={`flex flex-row items-center justify-between border-2 py-0 ${
                isUnlocked ? "border-black" : "border-gray-700 bg-gray-700"
            }`}
        >
            <div className="flex flex-col flex-1">
                <CardHeader className="pb-2">
                    <CardTitle
                        className={`text-2xl font-bold wrap-anywhere ${
                            isUnlocked ? "text-black" : "text-white"
                        }`}
                    >
                        {isUnlocked ? challenge.name : "????"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                    {isUnlocked ? (
                        <>
                            <p className="text-gray-600 font-medium">
                                {challenge.description}
                            </p>
                        </>
                    ) : (
                        <p className="text-gray-200 font-medium">
                            Unlocks on {challenge.unlock_date}
                        </p>
                    )}
                </CardContent>
            </div>
            {isUnlocked ? (
                <div className="p-4 flex flex-col items-center">
                    <Button
                        className={
                            isCompleted
                                ? "w-16 h-16 rounded-md bg-green-500 text-white"
                                : "w-16 h-16 rounded-md bg-gray-200 border border-gray-400"
                        }
                        onClick={() => setScanned(true)}
                        disabled={isCompleted}
                    />
                    <span className="mt-2 text-xs font-semibold text-gray-500">
                        {isCompleted ? "Completed!" : "Tap to scan!"}
                    </span>
                </div>
            ) : (
                <div className="p-8 flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-12 h-12 text-yellow-400"
                        role="img"
                        aria-label="Locked"
                    >
                        <title>Locked</title>
                        <rect
                            x="5"
                            y="10"
                            width="14"
                            height="9"
                            rx="2"
                            fill="currentColor"
                            stroke="black"
                            strokeWidth="1.5"
                        />
                        <path
                            d="M8 10V7a4 4 0 1 1 8 0v3"
                            stroke="black"
                            strokeWidth="1.5"
                            fill="none"
                        />
                        <circle cx="12" cy="15" r="1.5" fill="black" />
                    </svg>
                </div>
            )}
        </Card>
    );
}
