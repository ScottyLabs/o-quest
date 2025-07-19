import type { UserProfile } from "@/lib/types";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Camera, ChevronRight, Gift } from "lucide-react";
import { useEffect, useState } from "react";
import CategoryProgressBar from "../components/category-progress-bar";
import Stamps from "../components/stamps";
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
                    {
                        id: "1",
                        title: "Sample Image",
                        src: "/images/onboarding-images/placeholder.svg",
                        alt: "Sample placeholder image",
                    },
                    {
                        id: "2",
                        title: "Sample Image 1",
                        src: "/images/onboarding-images/placeholder.svg",
                        alt: "Sample placeholder image",
                    },
                ],
                prizes: [
                    // Placeholder images
                    {
                        id: "1",
                        title: "Sample Image",
                        src: "/images/onboarding-images/placeholder.svg",
                        alt: "Sample placeholder image",
                    },
                    {
                        id: "2",
                        title: "Sample Image 1",
                        src: "/images/onboarding-images/placeholder.svg",
                        alt: "Sample placeholder image",
                    },
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
        <div className="bg-[#F3E9D2] min-h-screen pb-20 max-w-md mx-auto p-4 flex flex-col">
            {/* Profile Card */}
            <Card className="rounded-4xl shadow-[0_3px_0_#bbb] p-4 mb-4 mt-4 relative overflow-visible">
                {/* Decorative SVG at the top */}
                <div
                    className="w-full flex justify-center -mt-8 mb-2"
                    style={{ position: "relative", zIndex: 1 }}
                >
                    <img
                        src="/images/sticky-note-top.svg"
                        alt="Sticky Note Top"
                        style={{ width: "60%" }}
                    />
                </div>
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
                            <span className="font-bold">Name:</span> {data.name}
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
                        Completed Quests:
                    </div>
                    <div className="w-full h-4 bg-gray-700 rounded-full mt-1 mb-2 relative">
                        <div
                            className="h-4 bg-blue-500 rounded-full absolute top-0 left-0"
                            style={{
                                width: `${(data.challengesCompleted / data.totalChallenges) * 100}%`,
                            }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                            {data.challengesCompleted}/{data.totalChallenges}
                        </span>
                    </div>
                    {/* Category Progress Bars */}
                    <CategoryProgressBar
                        categories={[
                            { name: "The Essentials", percentage: 75 },
                            {
                                name: "Cool Corners of Carnegie",
                                percentage: 25,
                            },
                            { name: "Campus of Bridges", percentage: 50 },
                            { name: "Let's Eat", percentage: 25 },
                            { name: "Minor-Major General", percentage: 55 },
                            { name: "Off-Campus Adventures", percentage: 25 },
                            { name: "Campus of Bridges", percentage: 90 },
                        ]}
                    />
                </div>
            </Card>

            {/* Leaderboard Card */}
            <div className="relative mb-2">
                <div className="bg-red-700 rounded-2xl shadow-[0_7px_0_#bbb] flex items-center px-4 py-4 mb-4 text-white z-10 relative">
                    <div className="font-bold mr-8">
                        {data.leaderboard.place}
                    </div>
                    <div className="flex-1">
                        <div className="font-semibold">
                            {data.leaderboard.name}
                        </div>
                        <div className="text-md">
                            {data.leaderboard.andrewId}
                        </div>
                    </div>
                    <div className="text-lg font-bold">
                        {data.leaderboard.points} ScottyCoins
                    </div>
                    <Link to="/leaderboard" className="text-white ml-6">
                        <ChevronRight />
                    </Link>
                </div>
            </div>

            <Stamps week={[true, false, false, false, false, false, false]} />

            {/* Prizes */}
            <div className="mb-2 flex items-center gap-2">
                <Gift className="w-6 h-6 text-red-700" />
                <span className="font-semibold text-lg">Prizes</span>
            </div>
            <div className="flex-1 overflow-x-auto mb-4">
                <div className="flex gap-2 h-64">
                    {data.prizes.map((img) => (
                        <img
                            key={img.id}
                            src={img.src}
                            alt={img.alt}
                            className="w-80 h-64 object-cover rounded-xl border flex-shrink-0"
                        />
                    ))}
                </div>
            </div>

            {/* Gallery */}
            <div className="mb-2 flex items-center gap-2">
                <Camera className="w-6 h-6 text-red-700" />
                <span className="font-semibold text-lg">Gallery</span>
            </div>
            <div className="flex-1 overflow-x-auto">
                <div className="flex gap-2 h-64">
                    {data.gallery.map((img) => (
                        <img
                            key={img.id}
                            src={img.src}
                            alt={img.alt}
                            className="w-80 h-64 object-cover rounded-xl border flex-shrink-0"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
