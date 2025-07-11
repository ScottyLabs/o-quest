import type { UserProfile } from "@/lib/types";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Camera, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "../components/ui/card";

// Mock function to simulate backend data fetching
function useProfileData(): UserProfile | null {
    const [data, setData] = useState<UserProfile | null>(null);
    useEffect(() => {
        setTimeout(() => {
            setData({
                avatarUrl: "/images/sample-profile-pic.svg",
                name: "Jeffrey Wang",
                andrewId: "jw8",
                house: {
                    name: "Yellow Faction",
                    dorm: "Morewood Garden",
                },
                currentScottyCoins: 210,
                totalScottyCoins: 243,
                challengesCompleted: 6,
                totalChallenges: 12,
                leaderboard: {
                    place: 210,
                    name: "Jeffrey Wang",
                    andrewId: "jw8",
                    points: 33,
                },
                gallery: [
                    // Placeholder images
                    "/images/onboarding-images/placeholder.svg",
                ],
            });
        }, 500);
    }, []);
    return data;
}

export const Route = createFileRoute("/profile")({
    component: Profile,
});

function Profile() {
    const data = useProfileData();
    if (!data)
        return (
            <div className="flex justify-center items-center h-full">
                Loading...
            </div>
        );

    return (
        <div className="bg-[#F3E9D2] min-h-screen pb-20">
            <div className="max-w-md mx-auto p-4">
                {/* Profile Card */}
                <Card className="rounded-3xl shadow-md p-4 mb-4 relative">
                    <div className="flex flex-row gap-4 items-center">
                        <div className="flex flex-col items-center">
                            <img
                                src={data.avatarUrl}
                                alt="avatar"
                                className="w-40 h-50 rounded-2xl object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="mb-1">
                                <span className="font-bold">Name:</span>{" "}
                                {data.name}
                            </div>
                            <div className="mb-1">
                                <span className="font-bold">Andrew ID:</span>{" "}
                                {data.andrewId}
                            </div>
                            <div className="mb-1">{data.house.dorm}</div>
                            <div className="flex items-center gap-2 mb-1">
                                <span>{data.house.name}</span>
                            </div>
                        </div>
                    </div>
                    {/* Progress Bars */}
                    <div className="mt-1">
                        <div className="font-semibold text-md">
                            Task Completed:
                        </div>
                        <div className="w-full h-4 bg-gray-700 rounded-full mt-1 mb-2 relative">
                            <div
                                className="h-4 bg-blue-500 rounded-full absolute top-0 left-0"
                                style={{
                                    width: `${(data.challengesCompleted / data.totalChallenges) * 100}%`,
                                }}
                            />
                            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                                {data.challengesCompleted}/
                                {data.totalChallenges}
                            </span>
                        </div>
                        <div className="font-semibold text-md">
                            Task Completed:
                        </div>
                        <div className="w-full h-4 bg-gray-700 rounded-full mt-1 mb-2 relative">
                            <div
                                className="h-4 bg-green-500 rounded-full absolute top-0 left-0"
                                style={{
                                    width: `${(data.challengesCompleted / data.totalChallenges) * 100}%`,
                                }}
                            />
                            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                                {data.challengesCompleted}/
                                {data.totalChallenges}
                            </span>
                        </div>
                    </div>
                </Card>

                {/* Leaderboard Card */}
                <div className="bg-red-600 rounded-2xl shadow-md flex items-center px-4 py-3 mb-4 text-white relative">
                    <div className="text-2xl font-bold mr-4">
                        {data.leaderboard.place}
                    </div>
                    <div className="flex-1">
                        <div className="font-semibold">
                            {data.leaderboard.name}
                        </div>
                        <div className="text-xs">
                            {data.leaderboard.andrewId}
                        </div>
                    </div>
                    <div className="text-lg font-bold">
                        {data.leaderboard.points} Pts
                    </div>
                    <Link
                        to="/leaderboard"
                        className="ml-2 bg-red-700 hover:bg-red-800 text-white rounded-full px-3 py-1 inline-flex items-center justify-center"
                    >
                        <ChevronRight />
                    </Link>
                </div>

                {/* Gallery */}
                <div className="mb-2 flex items-center gap-2">
                    <Camera className="w-6 h-6 text-gray-700" />
                    <span className="font-semibold text-lg">Gallery</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-8">
                    {data.gallery.map((img: string) => (
                        <img
                            key={img}
                            src={img}
                            alt={img}
                            className="w-full h-32 object-cover rounded-xl border"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
