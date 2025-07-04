import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Card } from "./ui/card";

interface LeaderboardCardProps {
    place: number;
    name: string;
    andrewId: string;
    points: number;
    highlight?: boolean;
}

export function LeaderboardCard({
    place,
    name,
    andrewId,
    points,
    highlight = false,
}: LeaderboardCardProps) {
    return (
        <Card
            className={cn(
                "flex flex-row items-center px-4 py-3 border-b last:border-b-0 transition-colors",
                highlight ? "bg-red-600 text-white" : "bg-white text-black",
            )}
        >
            {/* Place */}
            <div className="w-8 text-center font-medium text-base shrink-0 mr-2">
                {place}
            </div>
            {/* User Info */}
            <div className="flex-1 min-w-0">
                <span className="font-semibold text-base leading-tight truncate block">
                    {name}
                </span>
                <span
                    className={cn(
                        "text-xs leading-tight text-muted-foreground block",
                        highlight && "text-white/80",
                    )}
                >
                    #{andrewId}
                </span>
            </div>
            {/* Points & Right Arrow */}
            <div className="flex items-center gap-2 ml-2">
                <span className="font-semibold text-base">{points} Pts</span>
                {/* Right Arrow Icon */}
                <ChevronRight className="w-5 h-5 opacity-60" />
            </div>
        </Card>
    );
}
