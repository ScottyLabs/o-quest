import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/challenges")({
    component: Challenges,
});

function Challenges() {
    return (
        <div>
            <p>Hello challenges!</p>
        </div>
    );
}
