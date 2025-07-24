import "dotenv/config";

import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { oauth2ResourceServer } from "elysia-oauth2-resource-server";

import {
    getAllChallenges,
    getAllChallenges_temp,
    getCompletedChallenges,
} from "@/handlers/challenges";
import { getUserCoins } from "@/handlers/coins";
import {
    completeChallenge,
    getAllJournalEntries,
    getJournalEntry,
} from "@/handlers/completion";
import { getLeaderboard } from "@/handlers/leaderboard";
import { getUserTrades, makeTrade } from "@/handlers/trades";

const PORT = Number.parseInt(process.env.PORT || "3000");

const JWKS_URI = process.env.JWKS_URI;
const ISSUER = process.env.ISSUER;
const AUDIENCE = process.env.AUDIENCE;

if (!JWKS_URI || !ISSUER || !AUDIENCE) {
    throw new Error(
        "Environment variables JWKS_URI, ISSUER, and AUDIENCE are required",
    );
}

export const app = new Elysia()
    .use(swagger())
    .get("/", () => "OK", {
        detail: {
            summary: "Health check",
            description: "Health check endpoint to verify the API is running",
            tags: ["System"],
        },
    })

    // Public API routes
    .group("/api", (app) =>
        app
            .get("/challenges", getAllChallenges, {
                detail: {
                    summary: "Get all challenges",
                    description:
                        "Retrieve all challenges with unlock status. Locked challenges return limited information",
                    tags: ["Challenges"],
                },
            })
            .get("/challenges-temp", getAllChallenges_temp, {
                detail: {
                    summary: "Get all challenges (temporary)",
                    description:
                        "Retrieve all challenges without unlock filtering for development/testing",
                    tags: ["Challenges"],
                },
            })
            .get("/leaderboard", getLeaderboard, {
                detail: {
                    summary: "Get leaderboard",
                    description:
                        "Retrieve paginated leaderboard showing users ranked by total coins",
                    tags: ["Leaderboard"],
                    parameters: [
                        {
                            name: "page",
                            in: "query",
                            required: false,
                            schema: { type: "integer", default: 1 },
                            description: "Page number for pagination",
                        },
                    ],
                },
            }),
    )

    // Private API routes
    .group("/api", (app) =>
        app
            .use(
                oauth2ResourceServer({
                    jwksUri: JWKS_URI,
                    issuer: ISSUER,
                    audience: AUDIENCE,
                    requiredScopes: ["openid", "profile", "email"],
                }),
            )
            .get("/coins", getUserCoins, {
                detail: {
                    summary: "Get user's ScottyCoins",
                    description:
                        "Retrieve the authenticated user's coin balance, earned, and spent amounts",
                    tags: ["Coins"],
                },
            })
            .get("/completed", getCompletedChallenges, {
                detail: {
                    summary: "Get completed challenges",
                    description:
                        "Retrieve list of challenges completed by the authenticated user",
                    tags: ["Challenges"],
                },
            })
            .get("/trades", getUserTrades, {
                detail: {
                    summary: "Get user's trades",
                    description:
                        "Retrieve all trades/purchases made by the authenticated user",
                    tags: ["Trades"],
                },
            })
            .post("/trades/:rewardId", makeTrade, {
                detail: {
                    summary: "Make a trade",
                    description: "Purchase a reward using ScottyCoins",
                    tags: ["Trades"],
                    parameters: [
                        {
                            name: "rewardId",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                            description: "The ID of the reward to purchase",
                        },
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["count"],
                                    properties: {
                                        count: {
                                            type: "integer",
                                            minimum: 1,
                                            description:
                                                "Number of items to purchase",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            })
            .post("/complete", completeChallenge, {
                detail: {
                    summary: "Complete a challenge",
                    description:
                        "Mark a challenge as completed with optional photo and note",
                    tags: ["Challenges"],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["challengeId", "verification"],
                                    properties: {
                                        challengeId: {
                                            type: "string",
                                            description:
                                                "The ID of the challenge to complete",
                                        },
                                        photoBlob: {
                                            type: "string",
                                            description: "Base64 encoded image",
                                        },
                                        note: {
                                            type: "string",
                                            description:
                                                "Personal note about the challenge",
                                        },
                                        verification: {
                                            type: "string",
                                            description: "Verification string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            })
            .get("/journal/:challengeId", getJournalEntry, {
                detail: {
                    summary: "Get journal entry for a specific challenge",
                    description:
                        "Retrieve photo and note for a completed challenge",
                    tags: ["Journal"],
                    parameters: [
                        {
                            name: "challengeId",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                        },
                    ],
                },
            })
            .get("/journal", getAllJournalEntries, {
                detail: {
                    summary: "Get all journal entries",
                    description:
                        "Retrieve all completed challenges for the user",
                    tags: ["Journal"],
                },
            }),
    );

if (import.meta.main) {
    app.listen(PORT);
    console.log(
        `O-Quest backend running at http://${app.server?.hostname}:${app.server?.port}`,
    );
}

export type App = typeof app;
