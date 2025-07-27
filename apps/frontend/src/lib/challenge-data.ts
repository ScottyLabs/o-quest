import type { ChallengeCategoryData, ChallengeData } from "./types";

// Mock data - this will eventually be fetched from the backend
const MOCK_CATEGORIES: ChallengeCategoryData[] = [
    {
        name: "The Essentials",
        completed: 7,
        total: 105,
        color: "#D7263D", // red
        flagColor: "#D7263D",
    },
    {
        name: "Let's Eat",
        completed: 7,
        total: 105,
        color: "#F9A602", // yellow
        flagColor: "#F9A602",
    },
    {
        name: "Corners of Carnegie",
        completed: 7,
        total: 105,
        color: "#1FAA59", // green
        flagColor: "#1FAA59",
    },
    {
        name: "Campus of Bridges",
        completed: 7,
        total: 105,
        color: "#119DA4", // teal
        flagColor: "#119DA4",
    },
    {
        name: "Minor-Major Generals",
        completed: 7,
        total: 105,
        color: "#0C356A", // dark blue
        flagColor: "#0C356A",
    },
    {
        name: "Off-Campus",
        completed: 7,
        total: 105,
        color: "#6C2EB7", // purple
        flagColor: "#6C2EB7",
    },
];

// Simulate API call with loading state
export async function fetchChallengeData(): Promise<ChallengeData> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const totalCompleted = MOCK_CATEGORIES.reduce(
        (sum, cat) => sum + cat.completed,
        0,
    );
    const totalChallenges = MOCK_CATEGORIES.reduce(
        (sum, cat) => sum + cat.total,
        0,
    );

    return {
        categories: MOCK_CATEGORIES,
        totalCompleted,
        totalChallenges,
    };
}

// Helper function to get percentage for CategoryProgressBar
export function getCategoryPercentage(category: ChallengeCategoryData): number {
    return Math.round((category.completed / category.total) * 100);
}

// Helper function to get categories with percentages for CategoryProgressBar
export function getCategoriesWithPercentages(
    categories: ChallengeCategoryData[],
) {
    return categories.map((category) => ({
        name: category.name,
        percentage: getCategoryPercentage(category),
    }));
}
