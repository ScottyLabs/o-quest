import "dotenv/config";

import { Elysia } from "elysia";
import { oauth2ResourceServer } from "elysia-oauth2-resource-server";

import {
    getAllChallenges,
    getAllChallenges_temp,
    getCompletedChallenges,
} from "@/handlers/challenges";
import { getUserCoins } from "@/handlers/coins";
import { getLeaderboard } from "@/handlers/leaderboard";
import { getUserTrades, makeTrade } from "@/handlers/trades";
import { swagger } from "@elysiajs/swagger";

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
    .get("/health", () => "OK")
    .get("/", () => "Hello world")

    // Public API routes
    .group("/api", (app) =>
        app
            .get("/challenges", getAllChallenges)
            .get("/challenges-temp", getAllChallenges_temp),
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
            .get("/coins", getUserCoins)
            .get("/completed", getCompletedChallenges)
            .get("/leaderboard", getLeaderboard)
            .get("/trades", getUserTrades)
            .post("/trades/:rewardId", makeTrade),
    );

if (import.meta.main) {
    app.listen(PORT);
    console.log(
        `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
    );
}

export type App = typeof app;
