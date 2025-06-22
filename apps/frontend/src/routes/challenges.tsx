import { PageHeader } from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/challenges")({
    component: Challenges,
});

function Challenges() {
    return (
        <div>
            <PageHeader
                title="Challenges"
                infoText="This page shows you the challenges."
            />
            <p>Hello challenges!</p>
        </div>
    );
}
