import { db } from "@/db";
import { challenges, completion, reward, trade, user } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import type { Context } from "elysia";

export const getLeaderboard = async ({ query }: Context) => {
    const page = Number.parseInt(query.page ?? "1");
    const limit = 20;
    const offset = (page - 1) * limit;

    const leaderboard = await db
        .select({
            userId: user.userId,
            dorm: user.dorm,
            totalCoins: sql<number>`
        COALESCE(
          (SELECT SUM(${challenges.scottyCoins})
           FROM ${completion}
           INNER JOIN ${challenges} ON ${completion.challengeName} = ${challenges.name}
           WHERE ${completion.userId} = ${user.userId}), 0
        ) -
        COALESCE(
          (SELECT SUM(${reward.cost} * ${trade.count})
           FROM ${trade}
           INNER JOIN ${reward} ON ${trade.rewardName} = ${reward.name}
           WHERE ${trade.userId} = ${user.userId}), 0
        )
      `,
        })
        .from(user)
        .orderBy(desc(sql`totalCoins`))
        .limit(limit)
        .offset(offset);

    return leaderboard;
};
