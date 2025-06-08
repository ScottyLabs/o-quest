import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terrier-trade")({
    component: TerrierTrade,
});

function TerrierTrade() {
    return (
        <div>
            <p>Hello terrier trade!</p>
        </div>
    );
}
