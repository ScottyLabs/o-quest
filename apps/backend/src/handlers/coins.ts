import { db } from "@/db";
import { challenges, completion, reward, trade } from "@/db/schema";
import { eq, sum } from "drizzle-orm";
import type { AuthenticatedContext } from "../../context";

export const getUserCoins = async ({ auth }: AuthenticatedContext) => {
    const userId = auth.sub;

    if (!userId) {
        throw new Error("User ID not found in authentication context");
    }

    // Calculate total coins earned from completed challenges
    const coinsEarned = await db
        .select({
            total: sum(challenges.scottyCoins),
        })
        .from(completion)
        .innerJoin(challenges, eq(completion.challengeName, challenges.name))
        .where(eq(completion.userId, userId));

    // Calculate total coins spent on trades
    const coinsSpent = await db
        .select({
            total: sum(reward.cost),
        })
        .from(trade)
        .innerJoin(reward, eq(trade.rewardName, reward.name))
        .where(eq(trade.userId, userId));

    const totalEarned = Number.parseInt(coinsEarned[0]?.total ?? "0");
    const totalSpent = Number.parseInt(coinsSpent[0]?.total ?? "0");
    const currentBalance = totalEarned - totalSpent;

    return {
        coins: currentBalance,
        earned: totalEarned,
        spent: totalSpent,
    };
};
