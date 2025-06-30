import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";

interface PageHeaderProps {
    title: string;
    infoText: string;
    bgColor?: string;
    textColor?: string;
    iconColor?: string;
}

export function PageHeader({
    title,
    infoText,
    bgColor = "#fff3cd",
    textColor = "#b8860b",
    iconColor = "#b8860b",
}: PageHeaderProps) {
    return (
        <div
            className="relative flex items-center justify-center py-4 px-6"
            style={{ background: bgColor }}
        >
            <span
                className="absolute left-0 right-0 mx-auto font-extrabold text-3xl text-center select-none pointer-events-none"
                style={{ color: textColor }}
            >
                {title}
            </span>
            <div className="ml-auto z-10">
                <Popover>
                    <PopoverTrigger asChild>
                        <Info
                            color={iconColor}
                            size={32}
                            className="cursor-pointer"
                            aria-label="Show info"
                        />
                    </PopoverTrigger>
                    <PopoverContent
                        className="rounded-xl max-w-[90vw] min-w-[250px] text-center"
                        style={{ background: "#fff", color: "#222" }}
                    >
                        {infoText}
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
