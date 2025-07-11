export type User = {
    name: string;
    andrewId: string;
    points: number;
};

export type LeaderboardUser = User & {
    place: number;
};

export type Profile = {
    avatarUrl: string;
    name: string;
    andrewId: string;
    house: {
        name: string;
        icon: string;
        dorm: string;
    };
    currentScottyCoins: number;
    totalScottyCoins: number;
    challengesCompleted: number;
    totalChallenges: number;
    leaderboard: LeaderboardUser;
    gallery: string[];
};
