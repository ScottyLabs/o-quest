import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InfoPopupProps {
    isOpen: boolean;
    onClose: () => void;
    category: string;
}

export function InfoPopup({ isOpen, onClose, category }: InfoPopupProps) {
    if (!isOpen) return null;

    // Category-specific information
    const getCategoryInfo = (category: string) => {
        switch (category) {
            case "The Essentials":
                return {
                    title: "The Essentials",
                    description: "Core challenges that every CMU student should complete. These fundamental experiences will help you navigate campus life and build essential skills.",
                    tips: [
                        "Complete these early in your semester",
                        "They provide foundational knowledge",
                        "Many are prerequisites for other challenges"
                    ]
                };
            case "Let's Eat":
                return {
                    title: "Let's Eat",
                    description: "Discover the best dining spots around campus and learn about different meal options available to students.",
                    tips: [
                        "Try different dining halls",
                        "Explore off-campus restaurants",
                        "Learn about meal plan options"
                    ]
                };
            case "Corners of Carnegie":
                return {
                    title: "Corners of Carnegie",
                    description: "Explore the hidden gems and interesting spots throughout Carnegie Mellon's campus that most students never discover.",
                    tips: [
                        "Look for hidden study spots",
                        "Discover unique campus art",
                        "Find quiet corners for reflection"
                    ]
                };
            case "Campus of Bridges":
                return {
                    title: "Campus of Bridges",
                    description: "Navigate the unique bridge system that connects different parts of campus and learn about the history behind these architectural features.",
                    tips: [
                        "Learn the bridge shortcuts",
                        "Discover the best views",
                        "Understand campus geography"
                    ]
                };
            case "Minor-Major Generals":
                return {
                    title: "Minor-Major Generals",
                    description: "Academic challenges that help you explore different fields of study and understand the interdisciplinary nature of CMU education.",
                    tips: [
                        "Attend department events",
                        "Talk to professors",
                        "Explore different majors"
                    ]
                };
            case "Off-Campus":
                return {
                    title: "Off-Campus",
                    description: "Venture beyond campus boundaries to experience Pittsburgh and discover what the city has to offer CMU students.",
                    tips: [
                        "Use public transportation",
                        "Explore different neighborhoods",
                        "Find student discounts"
                    ]
                };
            default:
                return {
                    title: "Challenges",
                    description: "Complete challenges to earn ScottyCoins and unlock new experiences. Each category offers unique opportunities to explore and learn.",
                    tips: [
                        "Start with The Essentials",
                        "Complete challenges to earn coins",
                        "Unlock new categories as you progress"
                    ]
                };
        }
    };

    const info = getCategoryInfo(category);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-xl text-gray-900">{info.title}</h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <X size={20} />
                    </Button>
                </div>
                
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                        {info.description}
                    </p>
                    
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Tips:</h4>
                        <ul className="space-y-1">
                            {info.tips.map((tip, index) => (
                                <li key={index} className="text-gray-600 text-sm flex items-start gap-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
} 
