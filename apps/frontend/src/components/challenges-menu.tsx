import { useChallengeData } from "@/lib/hooks/use-challenge-data";
import type { ChallengeCategoryData } from "@/lib/types";
import { Flag, X } from "lucide-react";

interface ChallengesMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ChallengesMenu({ isOpen, onClose }: ChallengesMenuProps) {
    const { data, loading, error } = useChallengeData();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-[#2A2A2A] rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <h2 className="text-white text-xl font-bold">Challenges</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
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
                            <div className="bg-[#8B7355] rounded-xl p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Flag size={20} fill="#D7263D" />
                                    <span className="text-black font-semibold">
                                        {data.totalCompleted}/
                                        {data.totalChallenges}
                                    </span>
                                </div>
                                <span className="text-[#8B7355] font-semibold">
                                    Challenges
                                </span>
                            </div>

                            {/* Category Rows */}
                            {data.categories.map(
                                (category: ChallengeCategoryData) => (
                                    <div
                                        key={category.name}
                                        className="bg-[#2A2A2A] rounded-xl p-4 flex items-center justify-between hover:bg-[#3A3A3A] transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Flag
                                                size={20}
                                                fill={category.flagColor}
                                            />
                                            <span className="text-white font-semibold">
                                                {category.completed}/
                                                {category.total}
                                            </span>
                                        </div>
                                        <span className="text-white">
                                            {category.name}
                                        </span>
                                    </div>
                                ),
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
