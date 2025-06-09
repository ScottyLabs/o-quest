import {
    integer,
    pgTable,
    primaryKey,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    userId: text("userId").primaryKey(),
    dorm: text("dorm").notNull(),
});

export const reward = pgTable("reward", {
    name: text("name").primaryKey().notNull(),
    slug: text("slug").notNull(),
    cost: integer("cost").notNull(),
    stock: integer("stock").notNull(),
    tradeLimit: integer("tradeLimit").notNull(),
});

export const challenges = pgTable("challenges", {
    name: text("name").primaryKey().notNull(),
    category: text("category").notNull(),
    location: text("location").notNull(),
    scottyCoins: integer("scottyCoins").notNull(),
    mapsLink: text("mapsLink").notNull(),
    tagline: text("tagline").notNull(),
    description: text("description").notNull(),
    moreInfoLink: text("moreInfoLink"), // optional
    unlockTimestamp: timestamp("unlockTimestamp").notNull(),
});

export const completion = pgTable(
    "completion",
    {
        userId: text("userId")
            .notNull()
            .references(() => user.userId, { onDelete: "cascade" }),
        challengeName: text("challengeName")
            .notNull()
            .references(() => challenges.name, { onDelete: "cascade" }),
        timestamp: timestamp("timestamp").notNull(),
        s3Link: text("s3Link"), // optional
        note: text("note"), // optional
    },
    (table) => [primaryKey({ columns: [table.userId, table.challengeName] })],
);

export const trade = pgTable(
    "trade",
    {
        userId: text("userId")
            .notNull()
            .references(() => user.userId, { onDelete: "cascade" }),
        rewardName: text("rewardName")
            .notNull()
            .references(() => reward.name, { onDelete: "cascade" }),
        timestamp: timestamp("timestamp").notNull(),
        count: integer("count").notNull(),
    },
    (table) => [primaryKey({ columns: [table.userId, table.rewardName] })],
);
