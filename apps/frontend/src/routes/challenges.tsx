import { CategoryTabs } from "@/components/category-tabs";
import { ChallengeList } from "@/components/challenge-card";
import { PageHeader } from "@/components/page-header";
import type { Challenge } from "@/lib/types";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
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
                    category: "Off-Campus",
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
                    category: "Members of Carnegie",
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
                    category: "Minor-Major General",
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
                    category: "Off-Campus",
                },
                {
                    id: 4,
                    name: "Future Challenge",
                    description: "This challenge is locked for now",
                    completed: false,
                    unlocked: false,
                    unlock_date: "2024-01-25",
                    coins_earned_for_completion: 200,
                    category: "Members of Carnegie",
                },
                {
                    id: 5,
                    name: "Campus Explorer",
                    description: "Visit all the main buildings on campus",
                    completed: false,
                    unlocked: true,
                    unlock_date: "2024-01-18",
                    coins_earned_for_completion: 125,
                    category: "Minor-Major General",
                },
            ]);
        }, 500);
    }, []);
    return data;
}

export const Route = createFileRoute("/challenges")({
    component: Challenges,
    validateSearch: (search: Record<string, unknown>) => ({
        category: (search.category as string) || "all",
    }),
});

function Challenges() {
    const challenges = useChallengesData();
    const { category } = useSearch({ from: "/challenges" });

    if (!challenges) {
        return (
            <div className="flex justify-center items-center h-full">
                Loading...
            </div>
        );
    }

    // Filter challenges based on selected category
    const filteredChallenges =
        category === "all"
            ? challenges
            : challenges.filter((challenge) => challenge.category === category);

    // Get unique categories from challenges
    const categories = [
        "all",
        ...Array.from(new Set(challenges.map((c) => c.category))),
    ];

    return (
        <div>
            <PageHeader
                title="Challenges"
                icon={<Trophy size={40} color="#C8102E" />}
            />
            <div className="p-4 max-w-xl mx-auto">
                <CategoryTabs
                    categories={categories}
                    selectedCategory={category}
                />
                <ChallengeList challenges={filteredChallenges} />
            </div>
        </div>
    );
}
