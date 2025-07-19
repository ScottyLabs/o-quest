import { Badge } from "lucide-react";

const days = ["S", "M", "T", "W", "T", "F", "S"];

export type StampsProps = {
    week: boolean[]; // 7 booleans, Sunday to Saturday
};

export default function Stamps({ week }: StampsProps) {
    return (
        <div className="rounded-3xl bg-[#B38156] shadow-[0_8px_0_#C2BBA7] px-6 py-4 flex flex-col gap-2 max-w-full mb-4">
            <div className="font-bold text-lg text-[#3B2600] mb-2">Stamps</div>
            <div className="flex flex-row gap-3 justify-center items-center">
                {days.map((d, i) => (
                    <div key={d} className="flex flex-col items-center">
                        <div
                            className={`relative rounded-full flex items-center justify-center ${
                                week[i]
                                    ? "bg-[#F3E9D2] shadow-[0_0_0_8px_#F3E9D2]"
                                    : "bg-transparent"
                            }`}
                            style={{ width: 40, height: 40 }}
                        >
                            <Badge
                                size={40}
                                color={week[i] ? "#B81C1C" : "#7A4E06"}
                                fill={week[i] ? "#B81C1C" : "#7A4E06"}
                                strokeWidth={2}
                            />
                            <span
                                className={`absolute text-base font-bold ${week[i] ? "text-white" : "text-[#F3E9D2]"}`}
                                style={{ pointerEvents: "none" }}
                            >
                                {d}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
