import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

interface CategoryTabsProps {
    categories: string[];
    selectedCategory: string;
    selectedCategoryColor?: string;
}

export function CategoryTabs({
    categories,
    selectedCategory,
    selectedCategoryColor = "#C8102E", // Default to CMU red
}: CategoryTabsProps) {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);

    const handleCategoryClick = (cat: string) => {
        navigate({
            to: "/challenges",
            search: { category: cat },
        });
    };

    // Convert hex color to rgba with 40% opacity
    const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const backgroundColor = hexToRgba(selectedCategoryColor, 0.4);

    // Scroll to center the selected tab
    useEffect(() => {
        if (!containerRef.current) return;

        const selectedIndex = categories.indexOf(selectedCategory);
        const isAtStart = selectedIndex === 0;
        const isAtEnd = selectedIndex === categories.length - 1;

        // Only scroll if not at start or end
        if (!isAtStart && !isAtEnd) {
            const container = containerRef.current;
            const buttons = container.querySelectorAll('button');
            const selectedButton = buttons[selectedIndex] as HTMLElement;
            
            if (selectedButton) {
                const containerWidth = container.offsetWidth;
                const buttonLeft = selectedButton.offsetLeft;
                const buttonWidth = selectedButton.offsetWidth;
                const scrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
                
                container.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            }
        }
    }, [selectedCategory, categories]);

    return (
        <div 
            ref={containerRef}
            className="mb-6 rounded-lg p-2 overflow-x-auto"
            style={{ backgroundColor }}
        >
            <div className="flex gap-2 min-w-max">
                {categories.map((cat) => (
                    <button
                        type="button"
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                            selectedCategory === cat
                                ? "bg-white text-gray-900"
                                : "text-white hover:bg-white hover:text-gray-900"
                        }`}
                    >
                        {cat === "all" ? "All" : cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
