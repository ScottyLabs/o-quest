import { Link } from "@tanstack/react-router";
import type React from "react";
import headerArc from "/images/header-arc.svg";
import scottyCoin from "/images/scotty-coin.svg";
import { ChallengesMenu } from "./challenges-menu";
import { Filter, Info } from "lucide-react";
import { useState } from "react";
import { FilterCard, type FilterOption } from "./filter-card";
import { InfoPopup } from "./info-popup";

interface PageHeaderProps {
    title: string;
    icon: React.ReactNode;
    bgColor?: string;
    textColor?: string;
    leftComponent?: React.ReactNode;
    rightComponent?: React.ReactNode;
    showFilter?: boolean;
    showInfo?: boolean;
    onFilterChange?: (filter: FilterOption) => void;
    selectedFilter?: FilterOption;
    category?: string;
}

export function PageHeader({
    title,
    icon,
    bgColor = "#C8102E", // CMU red as default
    textColor = "#C8102E",
    leftComponent,
    rightComponent,
    showFilter = false,
    showInfo = false,
    onFilterChange,
    selectedFilter = "all",
    category = "all",
}: PageHeaderProps) {
    // Use real data if available, fallback to dummy data
    const scottyCoins = 260;
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const handleFilterClick = () => {
        setIsFilterOpen(true);
    };

    const handleFilterClose = () => {
        setIsFilterOpen(false);
    };

    const handleFilterChange = (filter: FilterOption) => {
        onFilterChange?.(filter);
    };

    const handleInfoClick = () => {
        setIsInfoOpen(true);
    };

    const handleInfoClose = () => {
        setIsInfoOpen(false);
    };

    // Default left component (filter icon)
    const defaultLeftComponent = showFilter ? (
        <button
            onClick={handleFilterClick}
            className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Filter challenges"
        >
            <Filter size={20} style={{ color: textColor }} />
        </button>
    ) : leftComponent;

    // Default right component (info icon)
    const defaultRightComponent = showInfo ? (
        <button
            onClick={handleInfoClick}
            className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Information"
        >
            <Info size={20} style={{ color: textColor }} />
        </button>
    ) : rightComponent;

    return (
        <div
            className="relative flex flex-col items-center justify-center w-full"
            style={{ background: bgColor }}
        >
            {/* Top stats row */}
            <div className="w-full flex flex-row justify-between items-center px-6 pt-8 z-1">
                {/* All Challenges Stat */}
                <ChallengesMenu />
                {/* ScottyCoins Stat */}
                <Link
                    to="/terrier-trade"
                    className="flex items-center bg-white rounded-full px-3 py-2 shadow text-sm font-bold gap-1"
                    aria-label="View Coins"
                >
                    <img
                        src={scottyCoin}
                        alt="Scotty Coin"
                        className="w-5 h-5"
                    />
                    <span>{scottyCoins}</span>
                </Link>
            </div>
            {/* Main icon row */}
            <div className="relative flex flex-row items-center justify-center w-full mt-2">
                {/* Center icon */}
                <div className="flex flex-col items-center">
                    <div
                        className="bg-white rounded-full p-3 border-4 border-white shadow"
                        style={{ marginBottom: "-12px", zIndex: 1 }}
                    >
                        {icon}
                    </div>
                </div>
            </div>
            {/* Decorative arc with title inside */}
            <div
                className="w-full overflow-hidden relative"
                style={{ marginTop: "-100px", marginBottom: "-0.75px" }}
            >
                <img
                    src={headerArc}
                    alt="Decorative arc separator"
                    className="w-full h-full block"
                    style={{ width: "calc(120vw)"}}
                />
                {/* Title and components positioned inside the arc, below the icon */}
                <div className="absolute inset-0 flex justify-between items-end px-6 pb-1">
                    {/* Left optional component */}
                    <div className="flex items-center">{defaultLeftComponent}</div>
                    {/* Title */}
                    <span
                        className="font-extrabold text-2xl text-center select-none"
                        style={{ color: textColor }}
                    >
                        {title}
                    </span>
                    {/* Right optional component */}
                    <div className="flex items-center">{defaultRightComponent}</div>
                </div>
            </div>
            
            {/* Filter Card */}
            <FilterCard
                isOpen={isFilterOpen}
                onClose={handleFilterClose}
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterChange}
            />
            
            {/* Info Popup */}
            <InfoPopup
                isOpen={isInfoOpen}
                onClose={handleInfoClose}
                category={category}
            />
        </div>
    );
}
