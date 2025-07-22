import type { Context } from "elysia";
import type { JWTPayload } from "jose";

interface AuthenticatedContext extends Context {
    auth: JWTPayload;
}
