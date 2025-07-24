import { db } from "@/db";
import { challenges, completion } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { AuthenticatedContext } from "../../context";

export const getAllChallenges_temp = () =>
    db
        .select({
            name: challenges.name,
            category: challenges.category,
            location: challenges.location,
            scottyCoins: challenges.scottyCoins,
            mapsLink: challenges.mapsLink,
            tagline: challenges.tagline,
            description: challenges.description,
            moreInfoLink: challenges.moreInfoLink,
            unlockTimestamp: challenges.unlockTimestamp,
            // exclude secret from public API
        })
        .from(challenges);

export const getAllChallenges = async () => {
    const allChallenges = await getAllChallenges_temp();
    const now = new Date();

    return allChallenges.map((challenge) => {
        const isUnlocked = challenge.unlockTimestamp <= now;

        if (isUnlocked) {
            // Return full data for unlocked challenges
            return challenge;
        }

        // Return limited data for locked challenges
        return {
            unlockTimestamp: challenge.unlockTimestamp,
            category: challenge.category,
            nameLength: challenge.name.length,
        };
    });
};

export const getCompletedChallenges = async ({
    auth,
}: AuthenticatedContext) => {
    const userId = auth.sub;

    if (!userId) {
        throw new Error("User ID not found in token");
    }

    const completedChallenges = await db
        .select({
            challengeName: completion.challengeName,
        })
        .from(completion)
        .where(eq(completion.userId, userId));

    return completedChallenges.map((c) => c.challengeName);
};
