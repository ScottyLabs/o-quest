import { useState } from "react";
import { Filter, X, Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export type FilterOption = "all" | "uncomplete" | "complete" | "locked";

interface FilterCardProps {
    isOpen: boolean;
    onClose: () => void;
    selectedFilter: FilterOption;
    onFilterChange: (filter: FilterOption) => void;
}

export function FilterCard({ isOpen, onClose, selectedFilter, onFilterChange }: FilterCardProps) {
    if (!isOpen) return null;

    const filterOptions: { value: FilterOption; label: string; icon: React.ReactNode }[] = [
        { 
            value: "all", 
            label: "All",
            icon: <Filter size={16} color="#666" />
        },
        { 
            value: "uncomplete", 
            label: "Uncomplete",
            icon: <img src="/images/scotty-coin.svg" alt="Scotty Coin" className="w-4 h-4" />
        },
        { 
            value: "complete", 
            label: "Complete",
            icon: <Check size={16} color="#4CAF50" strokeWidth={3} />
        },
        { 
            value: "locked", 
            label: "Locked",
            icon: <Lock size={16} color="#666" strokeWidth={2} />
        },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Filter size={20} color="#C8102E" />
                        <h3 className="font-bold text-lg text-gray-900">Filter Challenges</h3>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <X size={20} />
                    </Button>
                </div>
                
                <div className="space-y-2">
                    {filterOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                onFilterChange(option.value);
                                onClose();
                            }}
                            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${
                                selectedFilter === option.value
                                    ? "bg-gray-700 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            <div className="flex items-center justify-center w-5 h-5">
                                {option.icon}
                            </div>
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
} 
