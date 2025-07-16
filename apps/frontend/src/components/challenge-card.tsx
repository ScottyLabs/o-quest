import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Check, Lock } from "lucide-react";
import type { Challenge } from "../lib/types";

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
    const {
        name,
        description,
        coins_earned_for_completion,
        completed,
        unlocked,
        unlock_date,
    } = challenge;
    // Locked state
    if (!unlocked) {
        return (
            <Card className="bg-[#172126] rounded-2xl w-full max-w-lg shadow-md">
                <CardContent className="flex items-center min-h-0">
                    <div className="w-10 h-10 rounded-lg bg-black mr-4 -rotate-6" />
                    <div className="flex-1">
                        <div className="font-bold text-white text-base">
                            {name}
                        </div>
                        <div className="text-gray-200 text-xs">
                            Unlocks on {unlock_date}
                        </div>
                    </div>
                    <div className="ml-2">
                        <div className="relative">
                            <div className="absolute top-7 w-11 h-3 rounded-b-md bg-gray-400 z-0" />
                            <div className="w-11 h-9 rounded-md bg-white flex items-center justify-center relative z-10">
                                <Lock size={20} color="#222" strokeWidth={2} />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }
    // Completed state
    if (completed) {
        return (
            <Card className="bg-green-100 rounded-2xl w-full max-w-lg">
                <CardContent className="flex items-center min-h-0">
                    <div className="w-10 h-10 mr-4 flex items-center justify-center -rotate-6">
                        <BadgeCheck size={40} color="#fff" fill="#4CAF50" />
                    </div>
                    <div className="flex-1 font-bold text-green-700 text-base">
                        {name}
                    </div>
                </CardContent>
            </Card>
        );
    }
    // Unlocked but not completed
    return (
        <Card className="bg-white rounded-2xl w-full max-w-lg shadow-md">
            <CardContent className="flex items-center min-h-0">
                <div className="w-10 h-10 rounded-lg bg-[#E74C3C] mr-4 -rotate-6" />
                <div className="flex-1">
                    <div className="font-bold text-black text-base">{name}</div>
                    <div className="text-gray-500 text-xs">{description}</div>
                </div>
                <div className="flex items-center gap-1 ml-1">
                    <span className="font-bold text-black text-sm">
                        {coins_earned_for_completion}
                    </span>
                    <img
                        src="/images/about-page-scotty.svg"
                        alt="Scotty Coin"
                        className="w-4 h-4"
                    />
                    <div className="relative">
                        <div className="absolute top-7 w-11 h-3 rounded-b-md bg-gray-300 z-0" />
                        <Button className="w-11 h-9 rounded-md bg-gray-100 flex items-center justify-center relative z-10">
                            <Check size={40} color="#4CAF50" strokeWidth={3} />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// export function OldChallengeCard({ challenge }: { challenge: Challenge }) {
//     const [scanned, setScanned] = useState(false);
//     const isUnlocked = challenge.unlocked;
//     const isCompleted = challenge.completed || scanned;

//     return (
//         <Card
//             className={`flex flex-row items-center justify-between border-2 py-0 ${
//                 isUnlocked ? "border-black" : "border-gray-700 bg-gray-700"
//             }`}
//         >
//             <div className="flex flex-col flex-1">
//                 <CardHeader className="pb-2">
//                     <CardTitle
//                         className={`text-2xl font-bold wrap-anywhere ${
//                             isUnlocked ? "text-black" : "text-white"
//                         }`}
//                     >
//                         {isUnlocked ? challenge.name : "????"}
//                     </CardTitle>
//                 </CardHeader>
//                 <CardContent className="flex flex-col gap-1">
//                     {isUnlocked ? (
//                         <>
//                             <p className="text-gray-600 font-medium">
//                                 {challenge.description}
//                             </p>
//                         </>
//                     ) : (
//                         <p className="text-gray-200 font-medium">
//                             Unlocks on {challenge.unlock_date}
//                         </p>
//                     )}
//                 </CardContent>
//             </div>
//             {isUnlocked ? (
//                 <div className="p-4 flex flex-col items-center">
//                     <Button
//                         className={
//                             isCompleted
//                                 ? "w-16 h-16 rounded-md bg-green-500 text-white"
//                                 : "w-16 h-16 rounded-md bg-gray-200 border border-gray-400"
//                         }
//                         onClick={() => setScanned(true)}
//                         disabled={isCompleted}
//                     />
//                     <span className="mt-2 text-xs font-semibold text-gray-500">
//                         {isCompleted ? "Completed!" : "Tap to scan!"}
//                     </span>
//                 </div>
//             ) : (
//                 <div className="p-8 flex items-center">
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={1.5}
//                         stroke="currentColor"
//                         className="w-12 h-12 text-yellow-400"
//                         role="img"
//                         aria-label="Locked"
//                     >
//                         <title>Locked</title>
//                         <rect
//                             x="5"
//                             y="10"
//                             width="14"
//                             height="9"
//                             rx="2"
//                             fill="currentColor"
//                             stroke="black"
//                             strokeWidth="1.5"
//                         />
//                         <path
//                             d="M8 10V7a4 4 0 1 1 8 0v3"
//                             stroke="black"
//                             strokeWidth="1.5"
//                             fill="none"
//                         />
//                         <circle cx="12" cy="15" r="1.5" fill="black" />
//                     </svg>
//                 </div>
//             )}
//         </Card>
//     );
// }
