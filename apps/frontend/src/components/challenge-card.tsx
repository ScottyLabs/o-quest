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

    return (
        <Card className="flex flex-row items-center justify-between border-2 border-black py-0">
            <div className="flex flex-col flex-1">
                <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-bold wrap-anywhere">
                        {isUnlocked ? challenge.name : "???"}
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
                        <p className="text-gray-500 font-medium">
                            Unlocks on {challenge.unlock_date}
                        </p>
                    )}
                </CardContent>
            </div>
            <div className="p-4 flex flex-col items-center">
                <Button
                    className={
                        scanned
                            ? "w-16 h-16 rounded-md bg-green-500 text-white"
                            : "w-16 h-16 rounded-md bg-gray-200 border border-gray-400"
                    }
                    onClick={() => setScanned(true)}
                    disabled={!isUnlocked || scanned}
                />
                <span className="mt-2 text-xs font-semibold text-gray-500">
                    Tap to scan!
                </span>
            </div>
        </Card>
    );
}
