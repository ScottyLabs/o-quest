export type User = {
    name: string;
    andrewId: string;
    points: number;
};

export type LeaderboardUser = User & {
    place: number;
};

export type House = {
    name: string;
    dorm: string;
};

export type ImageInfo = {
    id: string;
    title: string;
    src: string;
    alt: string;
};

export type UserProfile = {
    avatarUrl: string;
    name: string;
    andrewId: string;
    house: House;
    currentScottyCoins: number;
    totalScottyCoins: number;
    challengesCompleted: number;
    totalChallenges: number;
    leaderboard: LeaderboardUser;
    gallery: ImageInfo[];
    prizes: ImageInfo[];
};

export type Challenge = {
    id: number;
    name: string;
    description: string;
    coins_earned_for_completion: number;
    completed: boolean;
    unlocked: boolean;
    unlock_date: string;
};
