import { PageHeader } from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terrier-trade")({
    component: TerrierTrade,
});

function TerrierTrade() {
    return (
        <div>
            <PageHeader
                title="Terrier Trade"
                infoText="This page lets you trade your points in for prizes."
            />
            <p>Hello terrier trade!</p>
        </div>
    );
}
