import { LeaderboardCard } from "@/components/leaderboard-card";
import { PageHeader } from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/leaderboard")({
    component: Leaderboard,
});

// Fake leaderboard data
type User = {
    place: number;
    name: string;
    andrewId: string;
    points: number;
};

const top10: User[] = [
    { place: 1, name: "Jeffrey Wang", andrewId: "andrewid1", points: 100 },
    { place: 2, name: "Alice Smith", andrewId: "asmith", points: 99 },
    { place: 3, name: "Bob Lee", andrewId: "blee", points: 97 },
    { place: 4, name: "Carol Kim", andrewId: "ckim", points: 94 },
    { place: 5, name: "David Park", andrewId: "dpark", points: 93 },
    { place: 6, name: "Eve Lin", andrewId: "elin", points: 82 },
    { place: 7, name: "Frank Zhao", andrewId: "fzhao", points: 76 },
    { place: 8, name: "Grace Chen", andrewId: "gchen", points: 70 },
    { place: 9, name: "Henry Wu", andrewId: "hwu", points: 65 },
    { place: 10, name: "Ivy Xu", andrewId: "ixu", points: 60 },
];

// Simulate current user (change this to test different scenarios)
const currentUser: User = {
    place: 210,
    name: "Jeffrey Wang",
    andrewId: "andrewid",
    points: 33,
};
const beforeCurrent: User = {
    place: 209,
    name: "Sam Lee",
    andrewId: "slee",
    points: 34,
};
const afterCurrent: User = {
    place: 211,
    name: "Tina Ho",
    andrewId: "tho",
    points: 32,
};

function isCurrentUserInTop10() {
    return top10.some((u) => u.andrewId === currentUser.andrewId);
}

function Leaderboard() {
    const inTop10 = isCurrentUserInTop10();
    return (
        <div className="max-w-md mx-auto">
            <PageHeader
                title="Leaderboard"
                infoText="This page shows the students with the most points."
            />
            <div className="bg-white rounded-xl shadow divide-y mt-6 overflow-hidden">
                {inTop10 ? (
                    top10.map((user) => (
                        <LeaderboardCard
                            key={user.andrewId}
                            {...user}
                            highlight={user.andrewId === currentUser.andrewId}
                        />
                    ))
                ) : (
                    <>
                        {top10.map((user) => (
                            <LeaderboardCard key={user.andrewId} {...user} />
                        ))}
                        {/* Dots separator */}
                        <div className="flex items-center justify-center py-2 bg-white text-gray-400 select-none">
                            •••
                        </div>
                        {/* Before current user */}
                        <LeaderboardCard {...beforeCurrent} />
                        {/* Current user (highlighted) */}
                        <LeaderboardCard {...currentUser} highlight />
                        {/* After current user */}
                        <LeaderboardCard {...afterCurrent} />
                    </>
                )}
            </div>
        </div>
    );
}
