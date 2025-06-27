import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
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
                className="absolute left-0 right-0 mx-auto font-bold text-xl text-center select-none pointer-events-none"
                style={{ color: textColor }}
            >
                {title}
            </span>
            <div className="ml-auto z-10">
                <Dialog>
                    <DialogTrigger asChild>
                        <button
                            type="button"
                            aria-label="Show info"
                            className="p-0 flex items-center bg-transparent hover:bg-transparent focus:bg-transparent w-12 h-12"
                            style={{ color: iconColor }}
                        >
                            <Info color={iconColor} size={24} />
                        </button>
                    </DialogTrigger>
                    <DialogContent
                        className="rounded-xl max-w-[90vw] min-w-[250px] text-center"
                        style={{ background: "#fff", color: "#222" }}
                    >
                        <VisuallyHidden asChild>
                            <DialogTitle>{title}</DialogTitle>
                        </VisuallyHidden>
                        <VisuallyHidden asChild>
                            <DialogDescription>{infoText}</DialogDescription>
                        </VisuallyHidden>
                        <div className="mb-4">{infoText}</div>
                        <DialogClose asChild>
                            <Button
                                className="mt-2 font-semibold rounded-md px-6 py-2"
                                style={{
                                    background: bgColor,
                                    color: textColor,
                                }}
                            >
                                Close
                            </Button>
                        </DialogClose>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
