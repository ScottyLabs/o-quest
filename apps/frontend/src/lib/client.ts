import { treaty } from "@elysiajs/eden";
import type { App } from "~/index";

export const client = treaty<App>("localhost:3000");
