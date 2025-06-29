import { PageHeader } from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/leaderboard")({
    component: Leaderboard,
});

function Leaderboard() {
    return (
        <div>
            <PageHeader
                title="Leaderboard"
                infoText="This page shows the students with the most points."
            />
            <p>Hello leaderboard!</p>
        </div>
    );
}
