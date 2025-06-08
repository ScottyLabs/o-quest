import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

const PORT = 3000;

export const app = new Elysia()
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
