import { ChallengeList } from "@/components/challenge-card";
import { PageHeader } from "@/components/page-header";
import type { Challenge } from "@/lib/types";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

// Mock function to simulate backend data fetching
function useChallengesData(): Challenge[] | null {
    const [data, setData] = useState<Challenge[] | null>(null);
    useEffect(() => {
        setTimeout(() => {
            setData([
                {
                    id: 0,
                    name: "Find the Hidden Treasure",
                    description:
                        "Locate the secret treasure chest hidden somewhere on campus",
                    completed: false,
                    unlocked: true,
                    unlock_date: "2024-01-15",
                    coins_earned_for_completion: 50,
                },
                {
                    id: 1,
                    name: "Solve the Riddle",
                    description:
                        "Answer the ancient riddle to unlock the next challenge",
                    completed: false,
                    unlocked: true,
                    unlock_date: "2024-01-16",
                    coins_earned_for_completion: 75,
                },
                {
                    id: 2,
                    name: "Mystery Challenge",
                    description:
                        "A mysterious challenge that will be revealed soon",
                    completed: false,
                    unlocked: false,
                    unlock_date: "2024-01-20",
                    coins_earned_for_completion: 100,
                },
                {
                    id: 3,
                    name: "Photo Scavenger Hunt",
                    description:
                        "Take photos of 5 specific landmarks around the university",
                    completed: true,
                    unlocked: true,
                    unlock_date: "2024-01-17",
                    coins_earned_for_completion: 150,
                },
                {
                    id: 4,
                    name: "Future Challenge",
                    description: "This challenge is locked for now",
                    completed: false,
                    unlocked: false,
                    unlock_date: "2024-01-25",
                    coins_earned_for_completion: 200,
                },
            ]);
        }, 500);
    }, []);
    return data;
}

export const Route = createFileRoute("/challenges")({
    component: Challenges,
});

function Challenges() {
    const challenges = useChallengesData();

    if (!challenges) {
        return (
            <div className="flex justify-center items-center h-full">
                Loading...
            </div>
        );
    }

    return (
        <div>
            <PageHeader
                title="Challenges"
                infoText="This page shows you the challenges."
            />
            <div className="p-4 max-w-xl mx-auto">
                <ChallengeList challenges={challenges} />
            </div>
        </div>
    );
}
