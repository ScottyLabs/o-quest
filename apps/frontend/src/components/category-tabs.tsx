import { useNavigate } from "@tanstack/react-router";

interface CategoryTabsProps {
    categories: string[];
    selectedCategory: string;
}

export function CategoryTabs({
    categories,
    selectedCategory,
}: CategoryTabsProps) {
    const navigate = useNavigate();

    const handleCategoryClick = (cat: string) => {
        navigate({
            to: "/challenges",
            search: { category: cat },
        });
    };

    return (
        <div className="mb-6 bg-blue-600 rounded-lg p-2">
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        type="button"
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                            selectedCategory === cat
                                ? "bg-blue-400 text-white"
                                : "text-white hover:bg-blue-500"
                        }`}
                    >
                        {cat === "all" ? "All" : cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
