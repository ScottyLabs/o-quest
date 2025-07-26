import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

interface Contributor {
    firstName: string;
    lastName: string;
    role: string;
    major: string;
    grad_year: number;
    contribution_year: number;
}

const contributors: Contributor[] = [
    {
        firstName: "Kenechukwu",
        lastName: "Echezona",
        role: "Developer",
        major: "SCS",
        grad_year: 2026,
        contribution_year: 2025,
    },
    {
        firstName: "Yuxiang",
        lastName: "Huang",
        role: "Developer",
        major: "IS",
        grad_year: 2027,
        contribution_year: 2025,
    },
    {
        firstName: "Xavier",
        lastName: "Lien",
        role: "Developer",
        major: "SCS",
        grad_year: 2027,
        contribution_year: 2025,
    },
    {
        firstName: "Anish",
        lastName: "Pallati",
        role: "Developer",
        major: "MCS",
        grad_year: 2028,
        contribution_year: 2025,
    },
    {
        firstName: "Autumn",
        lastName: "Qiu",
        role: "Developer",
        major: "IS",
        grad_year: 2027,
        contribution_year: 2025,
    },
    {
        firstName: "Theo",
        lastName: "Urban",
        role: "Developer",
        major: "SCS",
        grad_year: 2026,
        contribution_year: 2025,
    },
    {
        firstName: "Jeffery",
        lastName: "Wang",
        role: "Developer",
        major: "BXA",
        grad_year: 2027,
        contribution_year: 2025,
    },
    {
        firstName: "Eric",
        lastName: "Xu",
        role: "Developer",
        major: "SCS",
        grad_year: 2027,
        contribution_year: 2025,
    },
];

export const Route = createFileRoute("/about")({
    component: About,
});

function About() {
    const navigate = useNavigate();

    const currentYear = new Date().getFullYear();

    const currentTeam = contributors
        .filter((c) => c.contribution_year === currentYear)
        .sort((a, b) => a.lastName.localeCompare(b.lastName));

    const pastContributors = contributors
        .filter((c) => c.contribution_year < currentYear)
        .sort((a, b) => a.lastName.localeCompare(b.lastName));

    // Group past contributors by contribution year
    const groupByContributionYear = (contributors: Contributor[]) => {
        const grouped: { [key: number]: Contributor[] } = {};
        for (const c of contributors) {
            if (!grouped[c.contribution_year]) {
                grouped[c.contribution_year] = [];
            }
            grouped[c.contribution_year]?.push(c);
        }
        return grouped;
    };

    const pastContributorsByYear = groupByContributionYear(pastContributors);

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
                        <DialogDescription className="text-center">
                            Meet the people behind O-Quest
                        </DialogDescription>
                    </DialogHeader>

                    {/* Current Team */}
                    <div className="mt-2">
                        <h2 className="text-xl font-semibold text-center mb-2">
                            {currentYear} Team
                        </h2>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {currentTeam.map((c) => (
                                <div
                                    key={`${c.firstName}-${c.lastName}-${c.role}`}
                                    className="contents"
                                >
                                    <div className="text-center">{`${c.firstName} ${c.lastName} (${c.major} '${c.grad_year.toString().slice(-2)})`}</div>
                                    <div className="text-center">{c.role}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Previous Contributors */}
                    {Object.keys(pastContributorsByYear).length > 0 && (
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold text-center mb-2">
                                Previous Contributors
                            </h2>
                            {Object.entries(pastContributorsByYear)
                                .sort(
                                    ([a], [b]) =>
                                        Number.parseInt(b) - Number.parseInt(a),
                                )
                                .map(
                                    ([year, teamMembers]: [
                                        string,
                                        Contributor[],
                                    ]) => (
                                        <div key={year} className="mb-4">
                                            <h3 className="text-lg font-semibold text-center mb-2">
                                                {year} Team
                                            </h3>
                                            <div className="grid grid-cols-2 gap-2 mt-2">
                                                {teamMembers.map((c) => (
                                                    <div
                                                        key={`${c.firstName}-${c.lastName}-${c.role}`}
                                                        className="contents"
                                                    >
                                                        <div className="text-center">{`${c.firstName} ${c.lastName} (${c.major} '${c.grad_year.toString().slice(-2)})`}</div>
                                                        <div className="text-center">
                                                            {c.role}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ),
                                )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
