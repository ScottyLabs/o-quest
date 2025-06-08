import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/leaderboard")({
    component: Leaderboard,
});

function Leaderboard() {
    return (
        <div>
            <p>Hello leaderboard!</p>
        </div>
    );
}
