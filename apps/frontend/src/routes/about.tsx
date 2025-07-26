import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

interface Contributor {
    firstName: string;
    lastName: string;
    role: string;
    isPastContributor?: boolean;
}

const contributors: Contributor[] = [
    { firstName: "Jane", lastName: "Doe", role: "Developer" },
    { firstName: "John", lastName: "Smith", role: "Designer" },
    {
        firstName: "Alice",
        lastName: "Brown",
        role: "Writer",
        isPastContributor: true,
    },
    {
        firstName: "Bob",
        lastName: "Green",
        role: "Illustrator",
        isPastContributor: true,
    },
];

export const Route = createFileRoute("/about")({
    component: About,
});

function About() {
    const navigate = useNavigate();

    const currentTeam = contributors
        .filter((c) => !c.isPastContributor)
        .sort((a, b) => a.lastName.localeCompare(b.lastName));

    const pastContributors = contributors
        .filter((c) => c.isPastContributor)
        .sort((a, b) => a.lastName.localeCompare(b.lastName));

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

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mb-4 px-4 py-2 bg-red-700 text-white rounded-full font-bold">
                        Credits
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[90vw] max-w-md max-h-[90vh] overflow-y-auto mx-auto">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl font-bold">
                            Credits
                        </DialogTitle>
                    </DialogHeader>

                    {/* Current Team */}
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold text-center mb-2">
                            2025 Team
                        </h2>
                        <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
                            <span className="text-center">Name</span>
                            <span className="text-center">Role</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {currentTeam.map((c) => (
                                <div
                                    key={`${c.firstName}-${c.lastName}-${c.role}`}
                                    className="contents"
                                >
                                    <div className="text-center">{`${c.firstName} ${c.lastName}`}</div>
                                    <div className="text-center">{c.role}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Previous Contributors */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-center mb-2">
                            Previous Contributors
                        </h2>
                        <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
                            <span className="text-center">Name</span>
                            <span className="text-center">Role</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {pastContributors.map((c) => (
                                <div
                                    key={`${c.firstName}-${c.lastName}-${c.role}`}
                                    className="contents"
                                >
                                    <div className="text-center">{`${c.firstName} ${c.lastName}`}</div>
                                    <div className="text-center">{`${c.role}`}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
