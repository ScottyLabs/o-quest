import "dotenv/config";
import {
    getAllChallenges,
    getCompletedChallenges,
} from "@/handlers/challenges";
import { getUserCoins } from "@/handlers/coins";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { oauth2ResourceServer } from "elysia-oauth2-resource-server";

const PORT = 3000;

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
    .get("/", () => "Hello Elysia")

    // Public API routes
    .group("/api", (app) => app.get("/challenges", getAllChallenges))

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
            .get("/completed", getCompletedChallenges),
    );

if (import.meta.main) {
    app.listen(PORT);
    console.log(
        `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
    );
}

export type App = typeof app;
