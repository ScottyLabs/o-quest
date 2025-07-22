import { db } from "@/db";
import { reward, trade } from "@/db/schema";
import { getCoinsForUser } from "@/handlers/coins";
import { and, eq } from "drizzle-orm";
import type { AuthenticatedContext } from "../../context";

interface TradeRequest {
    count: number;
}

interface TradeContext extends AuthenticatedContext {
    body: TradeRequest;
}

export const makeTrade = async ({ auth, body, params }: TradeContext) => {
    const userId = auth.sub;
    const { rewardId } = params;
    const { count } = body;

    if (!userId) {
        throw new Error("User ID not found in token");
    }

    // Get reward details
    const rewardDetails = await db
        .select()
        .from(reward)
        .where(eq(reward.name, rewardId))
        .limit(1);

    if (rewardDetails.length === 0) {
        throw new Error("Reward not found");
    }

    const rewardData = rewardDetails[0];
    const totalCost = rewardData.cost * count;

    // Get user's current coin balance
    const { coins } = await getCoinsForUser(userId);

    // Validate user has enough coins
    if (coins < totalCost) {
        throw new Error("Insufficient coins");
    }

    // Check stock availability
    if (rewardData.stock < count) {
        throw new Error("Insufficient stock");
    }

    // Check current purchases for trade limit
    const currentTrade = await db
        .select({ count: trade.count })
        .from(trade)
        .where(and(eq(trade.userId, userId), eq(trade.rewardName, rewardId)));

    const currentPurchased = currentTrade[0]?.count ?? 0;

    if (currentPurchased + count > rewardData.tradeLimit) {
        throw new Error("Trade limit exceeded");
    }

    // Insert or update the trade
    await db
        .insert(trade)
        .values({
            userId,
            rewardName: rewardId,
            timestamp: new Date(),
            count: currentPurchased + count,
        })
        .onConflictDoUpdate({
            target: [trade.userId, trade.rewardName],
            set: {
                count: currentPurchased + count,
                timestamp: new Date(),
            },
        });

    // Update stock
    await db
        .update(reward)
        .set({ stock: rewardData.stock - count })
        .where(eq(reward.name, rewardId));

    return {
        scottyCoins: coins - totalCost,
    };
};

export const getUserTrades = async ({ auth }: AuthenticatedContext) => {
    const userId = auth.sub;

    if (!userId) {
        throw new Error("User ID not found in token");
    }

    const userTrades = await db
        .select({
            rewardId: trade.rewardName,
            purchased: trade.count,
            name: reward.name,
            slug: reward.slug,
            cost: reward.cost,
            stock: reward.stock,
            tradeLimit: reward.tradeLimit,
        })
        .from(trade)
        .innerJoin(reward, eq(trade.rewardName, reward.name))
        .where(eq(trade.userId, userId));

    return userTrades;
};
