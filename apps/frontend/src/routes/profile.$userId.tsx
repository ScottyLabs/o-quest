import { getCategoriesWithPercentages } from "@/lib/challenge-data";
import { useChallengeData } from "@/lib/hooks/use-challenge-data";
import type { UserProfile } from "@/lib/types";
import { createFileRoute } from "@tanstack/react-router";
import { Camera, ChevronRight, Gift } from "lucide-react";
import { useEffect, useState } from "react";
import CategoryProgressBar from "../components/category-progress-bar";
import Stamps from "../components/stamps";
import { Card } from "../components/ui/card";

// Mock function to simulate backend data fetching
function useProfileData(userId: string): UserProfile | null {
    const [data, setData] = useState<UserProfile | null>(null);
    useEffect(() => {
        setTimeout(() => {
            // Mock data based on userId - in real app this would fetch from API
            setData({
                avatarUrl: "/images/sample-profile-pic.svg",
                name: "default name",
                andrewId: userId,
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
                    andrewId: userId,
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
    }, [userId]);
    return data;
}

export const Route = createFileRoute("/profile/$userId")({
    component: UserProfile,
});

function UserProfile() {
    const { userId } = Route.useParams();
    const data = useProfileData(userId);
    const { data: challengeData, loading: challengeLoading } =
        useChallengeData();

    if (!data)
        return (
            <div className="flex justify-center items-center h-full">
                Loading...
            </div>
        );

    return (
        <div className="bg-[#F3E9D2] pb-20 p-4 flex flex-col">
            {/* Profile Card */}
            <Card className="rounded-4xl shadow-[0_7px_0_#bbb] p-4 mb-6 mt-4 relative overflow-visible">
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

                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-6">
                    {/* Avatar */}
                    <div className="relative">
                        <img
                            src={data.avatarUrl}
                            alt="Profile"
                            className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                        />
                        <button className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1.5 shadow-lg">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">
                            {data.name}
                        </h1>
                        <p className="text-gray-600 text-lg">#{data.andrewId}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm text-gray-500">
                                {data.house.name}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-500">
                                {data.house.dorm}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            {data.currentScottyCoins}
                        </div>
                        <div className="text-sm text-gray-600">Current Coins</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {data.totalScottyCoins}
                        </div>
                        <div className="text-sm text-gray-600">Total Earned</div>
                    </div>
                </div>

                {/* Challenge Progress */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold text-gray-800">
                            Challenges
                        </span>
                        <span className="text-sm text-gray-600">
                            {data.challengesCompleted}/{data.totalChallenges}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                                width: `${(data.challengesCompleted / data.totalChallenges) * 100}%`,
                            }}
                        ></div>
                    </div>
                </div>

                {/* Leaderboard Position */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-lg font-semibold text-gray-800">
                                Leaderboard Position
                            </div>
                            <div className="text-3xl font-bold text-blue-600">
                                #{data.leaderboard.place}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-yellow-600">
                                {data.leaderboard.points}
                            </div>
                            <div className="text-sm text-gray-600">Points</div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Categories Section */}
            {!challengeLoading && challengeData && (
                <Card className="rounded-4xl shadow-[0_7px_0_#bbb] p-4 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Challenge Categories
                    </h2>
                    <CategoryProgressBar
                        categories={getCategoriesWithPercentages(challengeData.categories)}
                    />
                </Card>
            )}

            {/* Stamps Section */}
            <Card className="rounded-4xl shadow-[0_7px_0_#bbb] p-4 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Achievement Stamps
                </h2>
                <Stamps week={[true, true, false, true, false, true, false]} />
            </Card>

            {/* Gallery Section */}
            <Card className="rounded-4xl shadow-[0_7px_0_#bbb] p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Gallery</h2>
                    <span className="text-blue-600 text-sm font-medium flex items-center gap-1">
                        View All
                        <ChevronRight className="w-4 h-4" />
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {data.gallery.slice(0, 4).map((image) => (
                        <div
                            key={image.id}
                            className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </Card>

            {/* Prizes Section */}
            <Card className="rounded-4xl shadow-[0_7px_0_#bbb] p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Prizes</h2>
                    <span className="text-blue-600 text-sm font-medium flex items-center gap-1">
                        View All
                        <ChevronRight className="w-4 h-4" />
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {data.prizes.slice(0, 4).map((prize) => (
                        <div
                            key={prize.id}
                            className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative"
                        >
                            <img
                                src={prize.src}
                                alt={prize.alt}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-yellow-500 text-white rounded-full p-1">
                                <Gift className="w-4 h-4" />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
} 
