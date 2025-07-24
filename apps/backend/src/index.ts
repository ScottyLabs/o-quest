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
    .use(
        swagger({
            documentation: {
                info: {
                    title: "O-Quest API",
                    version: "1.0.0",
                    description: "O-Quest backend API",
                },
                components: {
                    securitySchemes: {
                        BearerAuth: {
                            type: "http",
                            scheme: "bearer",
                            bearerFormat: "JWT",
                            description: "Enter your JWT Bearer token ",
                        },
                    },
                },
            },
        }),
    )
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
                    security: [],
                },
            })
            .get("/challenges-temp", getAllChallenges_temp, {
                detail: {
                    summary: "Get all challenges (temporary)",
                    description:
                        "Retrieve all challenges without unlock filtering for development/testing",
                    tags: ["Challenges"],
                    security: [],
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
                    security: [],
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
                    security: [{ BearerAuth: [] }],
                    responses: {
                        200: {
                            description:
                                "User's coin information retrieved successfully",
                        },
                        401: {
                            description:
                                "Unauthorized - Missing or invalid JWT token",
                        },
                        403: {
                            description: "Forbidden - Insufficient scopes",
                        },
                    },
                },
            })
            .get("/completed", getCompletedChallenges, {
                detail: {
                    summary: "Get completed challenges",
                    description:
                        "Retrieve list of challenges completed by the authenticated user",
                    tags: ["Challenges"],
                    security: [{ BearerAuth: [] }],
                    responses: {
                        200: {
                            description:
                                "Completed challenges retrieved successfully",
                        },
                        401: {
                            description:
                                "Unauthorized - Missing or invalid JWT token",
                        },
                        403: {
                            description: "Forbidden - Insufficient scopes",
                        },
                    },
                },
            })
            .get("/trades", getUserTrades, {
                detail: {
                    summary: "Get user's trades",
                    description:
                        "Retrieve all trades/purchases made by the authenticated user",
                    tags: ["Trades"],
                    security: [{ BearerAuth: [] }],
                    responses: {
                        200: {
                            description: "User's trades retrieved successfully",
                        },
                        401: {
                            description:
                                "Unauthorized - Missing or invalid JWT token",
                        },
                        403: {
                            description: "Forbidden - Insufficient scopes",
                        },
                    },
                },
            })
            .post("/trades/:rewardId", makeTrade, {
                detail: {
                    summary: "Make a trade",
                    description: "Purchase a reward using ScottyCoins",
                    tags: ["Trades"],
                    security: [{ BearerAuth: [] }],
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
                    responses: {
                        200: {
                            description: "Trade completed successfully",
                        },
                        400: {
                            description:
                                "Bad request - Invalid parameters or insufficient coins",
                        },
                        401: {
                            description:
                                "Unauthorized - Missing or invalid JWT token",
                        },
                        403: {
                            description: "Forbidden - Insufficient scopes",
                        },
                        404: {
                            description: "Reward not found",
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
                    security: [{ BearerAuth: [] }],
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
                    responses: {
                        200: {
                            description: "Challenge completed successfully",
                        },
                        400: {
                            description:
                                "Bad request - Invalid challenge or verification",
                        },
                        401: {
                            description:
                                "Unauthorized - Missing or invalid JWT token",
                        },
                        403: {
                            description: "Forbidden - Insufficient scopes",
                        },
                        409: {
                            description:
                                "Conflict - Challenge already completed",
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
                    security: [{ BearerAuth: [] }],
                    parameters: [
                        {
                            name: "challengeId",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Journal entry retrieved successfully",
                        },
                        401: {
                            description:
                                "Unauthorized - Missing or invalid JWT token",
                        },
                        403: {
                            description: "Forbidden - Insufficient scopes",
                        },
                        404: {
                            description:
                                "Journal entry not found or challenge not completed",
                        },
                    },
                },
            })
            .get("/journal", getAllJournalEntries, {
                detail: {
                    summary: "Get all journal entries",
                    description:
                        "Retrieve all completed challenges for the user",
                    tags: ["Journal"],
                    security: [{ BearerAuth: [] }],
                    responses: {
                        200: {
                            description:
                                "All journal entries retrieved successfully",
                        },
                        401: {
                            description:
                                "Unauthorized - Missing or invalid JWT token",
                        },
                        403: {
                            description: "Forbidden - Insufficient scopes",
                        },
                    },
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
