import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useChallengeData } from "@/lib/hooks/use-challenge-data";
import type { ChallengeCategoryData } from "@/lib/types";
import { Flag } from "lucide-react";
import { createPortal } from "react-dom";

export function ChallengesMenu() {
    const { data, loading, error } = useChallengeData();

    return (
        <NavigationMenu className="relative">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="flex items-center bg-white rounded-full px-3 py-2 shadow text-sm font-bold gap-1">
                        <Flag size={18} className="text-red-600" />
                        <span>
                            {data?.totalCompleted ?? 0}/
                            {data?.totalChallenges ?? 0}
                        </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        {createPortal(
                            <div className="fixed inset-0 bg-[#2A2A2A] z-[99999] isolate">
                                <div className="absolute top-4 left-4 max-w-md">
                                    <div className="p-6">
                                        {loading && (
                                            <div className="text-white text-center py-8">
                                                Loading challenges...
                                            </div>
                                        )}

                                        {error && (
                                            <div className="text-red-400 text-center py-8">
                                                {error}
                                            </div>
                                        )}

                                        {data && (
                                            <div className="space-y-3">
                                                {/* All Challenges Row (Highlighted) */}
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-[#8B7355] rounded-full px-4 py-2 flex items-center gap-2 border border-purple-200">
                                                        <Flag
                                                            size={16}
                                                            fill="#D7263D"
                                                        />
                                                        <span className="text-black font-semibold text-sm">
                                                            {
                                                                data.totalCompleted
                                                            }
                                                            /
                                                            {
                                                                data.totalChallenges
                                                            }
                                                        </span>
                                                    </div>
                                                    <span className="text-[#8B7355] font-semibold">
                                                        Challenges
                                                    </span>
                                                </div>

                                                {/* Category Rows */}
                                                {data.categories.map(
                                                    (
                                                        category: ChallengeCategoryData,
                                                    ) => (
                                                        <div
                                                            key={category.name}
                                                            className="flex items-center gap-3"
                                                        >
                                                            <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2 border border-purple-200">
                                                                <Flag
                                                                    size={16}
                                                                    fill={
                                                                        category.flagColor
                                                                    }
                                                                />
                                                                <span className="text-black font-semibold text-sm">
                                                                    {
                                                                        category.completed
                                                                    }
                                                                    /
                                                                    {
                                                                        category.total
                                                                    }
                                                                </span>
                                                            </div>
                                                            <span className="text-white font-semibold">
                                                                {category.name}
                                                            </span>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>,
                            document.body,
                        )}
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
