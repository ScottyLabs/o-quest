import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { client } from "@/lib/client";
import { app } from "~/index";

// Set up the Elysia app for testing
let server: Awaited<ReturnType<typeof app.listen>>;

beforeAll(() => {
    server = app.listen(3000);
});

afterAll(() => {
    server.stop();
});

describe("eden treaty client", () => {
    it("calls /health and returns expected response", async () => {
        const res = await client.health.get();

        expect(res.status).toBe(200);
        expect(res.data).toEqual("OK");
    });
});
