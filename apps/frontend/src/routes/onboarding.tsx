import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding")({
    component: Onboarding,
});

function Onboarding() {
    return (
        <div>
            <p>Hello onboarding!</p>
        </div>
    );
}
