import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
    component: About,
});

function About() {
    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-screen max-w-md mx-auto p-4 flex flex-col items-center text-[15px] leading-snug">
            {/* How to Play button */}
            <Button
                className="mb-4 px-4 py-2 bg-red-700 text-white rounded-full font-bold"
                onClick={() =>
                    navigate({ to: "/onboarding", search: { from: "about" } })
                }
            >
                How to Play
            </Button>

            {/* Credits button, TODO show credits */}
            <Button
                className="mb-4 px-4 py-2 bg-red-700 text-white rounded-full font-bold"
                onClick={() =>
                    navigate({ to: "/onboarding", search: { from: "about" } })
                }
            >
                Credits
            </Button>
        </div>
    );
}
