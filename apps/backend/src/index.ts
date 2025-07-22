import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { oauth2ResourceServer } from "elysia-oauth2-resource-server";

const PORT = 3000;

if (!process.env.JWKS_URI || !process.env.ISSUER || !process.env.AUDIENCE) {
    throw new Error(
        "Environment variables JWKS_URI, ISSUER, and AUDIENCE are required",
    );
}

export const app = new Elysia()
    .use(
        oauth2ResourceServer({
            jwksUri: process.env.JWKS_URI,
            issuer: process.env.ISSUER,
            audience: process.env.AUDIENCE,
            requiredScopes: ["openid", "profile", "email"],
        }),
    )
    .use(swagger())
    .get("/health", () => "OK")
    .get("/", () => "Hello Elysia");

if (import.meta.main) {
    app.listen(PORT);
    console.log(
        `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
    );
}

export type App = typeof app;
