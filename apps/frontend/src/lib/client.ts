import { treaty } from "@elysiajs/eden";
import type { App } from "~/index";

const BASE_URL = "https://auth.scottylabs.org";
const CLIENT = "quest";

const IS_DEV = import.meta.env.DEV;

export function createGatewayApi() {
    async function logout() {
        const logoutUrl = `${BASE_URL}/logout`;
        const form = document.createElement("form");
        form.method = "POST";
        form.action = logoutUrl;
        document.body.appendChild(form);
        form.submit();
    }

    async function login() {
        const loginUrl = `${BASE_URL}/oauth2/authorization/${CLIENT}?redirect_uri=${encodeURIComponent(window.location.href)}`;
        window.location.href = loginUrl;
    }

    const $api = treaty<App>(
        IS_DEV ? "http://localhost:3000" : "https://api.cmu.quest",
    );

    return {
        $api,
        logout,
        login,
    };
}
