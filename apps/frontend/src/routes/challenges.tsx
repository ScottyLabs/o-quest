import { CategoryTabs } from "@/components/category-tabs";
import { ChallengeList } from "@/components/challenge-card";
import { PageHeader } from "@/components/page-header";
import type { Challenge, ChallengeCategoryData } from "@/lib/types";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Trophy, Utensils, MapPin, GraduationCap, Car, BookOpen, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { MOCK_CATEGORIES } from "@/lib/challenge-data";

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
                    category: "Minor-Major Generals",
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
                    category: "Minor-Major Generals",
                },
                {
                    id: 5,
                    name: "Campus Explorer",
                    description: "Visit all the main buildings on campus",
                    completed: false,
                    unlocked: true,
                    unlock_date: "2024-01-18",
                    coins_earned_for_completion: 125,
                    category: "Minor-Major Generals",
                },
                {
                    id: 6,
                    name: "New Category Challenge",
                    description: "This is a challenge in a new category",
                    completed: false,
                    unlocked: true,
                    unlock_date: "2024-01-19",
                    coins_earned_for_completion: 80,
                    category: "The Essentials",
                },
                {
                    id: 7,
                    name: "New Category Challenge",
                    description: "This is a challenge in a new category",
                    completed: false,
                    unlocked: true,
                    unlock_date: "2024-01-19",
                    coins_earned_for_completion: 80,
                    category: "Corners of Carnegie",
                },
                {
                    id: 8,
                    name: "New Category Challenge",
                    description: "This is a challenge in a new category",
                    completed: false,
                    unlocked: true,
                    unlock_date: "2024-01-19",
                    coins_earned_for_completion: 80,
                    category: "Campus of Bridges",
                },
                {
                    id: 9,
                    name: "New Category Challenge",
                    description: "This is a challenge in a new category",
                    completed: false,
                    unlocked: true,
                    unlock_date: "2024-01-19",
                    coins_earned_for_completion: 80,
                    category: "Let's Eat",
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
    const challengesData = useChallengesData();
    const { category } = useSearch({ from: "/challenges" });
    const [challenges, setChallenges] = useState<Challenge[]>([]);

    // Update challenges when data is loaded
    useEffect(() => {
        if (challengesData) {
            setChallenges(challengesData);
        }
    }, [challengesData]);

    const handleComplete = (challengeId: number) => {
        setChallenges(prevChallenges =>
            prevChallenges.map(challenge =>
                challenge.id === challengeId
                    ? { ...challenge, completed: true }
                    : challenge
            )
        );
    };

    const handleUnlock = (challengeId: number) => {
        setChallenges(prevChallenges =>
            prevChallenges.map(challenge =>
                challenge.id === challengeId
                    ? { ...challenge, unlocked: true }
                    : challenge
            )
        );
    };

    if (!challengesData) {
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
        // ...MOCK_CATEGORIES.map((cat) => cat.name),
    ];

    // Get the color for the selected category
    const selectedCategoryData = MOCK_CATEGORIES.find(
        (cat: ChallengeCategoryData) => cat.name === category
    );
    const headerColor = selectedCategoryData?.color || "#C8102E"; // Default to CMU red
    const headerTitle = category === "all" ? "Challenges" : category;

    // Get the appropriate icon for the selected category
    const getHeaderIcon = (category: string) => {
        switch (category) {
            case "The Essentials":
                return <BookOpen size={40} color={headerColor} />;
            case "Let's Eat":
                return <Utensils size={40} color={headerColor} />;
            case "Corners of Carnegie":
                return <MapPin size={40} color={headerColor} />;
            case "Campus of Bridges":
                return <Building2 size={40} color={headerColor} />;
            case "Minor-Major Generals":
                return <GraduationCap size={40} color={headerColor} />;
            case "Off-Campus":
                return <Car size={40} color={headerColor} />;
            default:
                return <Trophy size={40} color={headerColor} />;
        }
    };

    return (
        <div>
            <PageHeader
                title={headerTitle}
                icon={getHeaderIcon(category)}
                bgColor={headerColor}
                textColor={headerColor}
            />
            <div className="p-4 max-w-xl mx-auto">
                <CategoryTabs
                    categories={categories}
                    selectedCategory={category}
                    selectedCategoryColor={headerColor}
                />
                <ChallengeList 
                    challenges={filteredChallenges} 
                    onComplete={handleComplete}
                    onUnlock={handleUnlock}
                />
            </div>
        </div>
    );
}
