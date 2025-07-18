import { ChallengeCard } from "@/components/challenge-card";
import type { Challenge } from "@/lib/types";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
    component: About,
});

function About() {
    return (
        <div className="bg-white min-h-screen max-w-md mx-auto p-4 flex flex-col items-center text-[15px] leading-snug">
            {/* Header */}
            <img
                src="/images/about-page-scotty.svg"
                alt="Scotty Mascot"
                className="w-40 mx-auto mb-2"
            />
            <div className="text-gray-700 text-sm mb-6 px-2 text-center">
                <span className="font-bold">Orientation Quest,</span> or{" "}
                <span className="font-bold">O-Quest</span>, is a scavenger hunt
                app and Alternate Reality Game (ARG), designed for Carnegie
                Mellon’s First-Year Orientation. This experience runs alongside
                First-Year Orientation, with the first-years able to complete
                objectives at their own pace.
            </div>

            {/* On-Boarding Section */}
            <div className="w-full mb-6">
                <div className="font-extrabold text-2xl text-red-700 mb-2">
                    On-Boarding
                </div>
                <ol className="list-decimal ml-6 text-gray-700 space-y-4">
                    <li>
                        <span className="font-bold">
                            Explore Campus and Earn ScottyCoins:
                        </span>
                        <br />
                        Scan QR Codes at various places on campus to complete
                        challenges and earn ScottyCoins!
                        <div className="flex flex-col gap-2 mt-2">
                            <ChallengeCard
                                challenge={{
                                    id: 1,
                                    name: "You have got Mail",
                                    description:
                                        "Visit the University Center mailroom",
                                    coins_earned_for_completion: 5,
                                    completed: false,
                                    unlocked: true,
                                    unlock_date: "2025-08-18",
                                }}
                            />
                            <ChallengeCard
                                challenge={{
                                    id: 2,
                                    name: "You have got Mail",
                                    description:
                                        "Visit the University Center mailroom",
                                    coins_earned_for_completion: 5,
                                    completed: true,
                                    unlocked: true,
                                    unlock_date: "2025-08-18",
                                }}
                            />
                        </div>
                        <div className="flex justify-center my-2">
                            <img
                                src="/images/about-page-scotty-coin.svg"
                                alt="Scotty Coin"
                                className="w-40"
                            />
                        </div>
                    </li>
                    <li>
                        <span className="font-bold">
                            Redeem Rewards at the Terrier Trade:
                        </span>
                        <br />
                        Exchange ScottyCoins during O-Week for CMU merchandise
                        and Carnegie Cup points!
                        {/* use terrier trade card instead */}
                        <div className="bg-white border rounded-lg px-3 py-2 shadow-sm flex items-center gap-2">
                            <div>
                                <div className="font-bold text-xs">
                                    Tartan T-Shirt
                                </div>
                                <div className="text-xs text-gray-600">
                                    Cost: 10 ScottyCoins
                                    <br />
                                    Claimed: 0/1
                                    <br />
                                    Stock: 10
                                </div>
                            </div>
                            <div className="w-12 h-8 bg-gradient-to-br from-blue-800 to-red-700 rounded-md ml-auto" />
                        </div>
                    </li>
                    <li>
                        <span className="font-bold">
                            Create Your Own Adventure:
                        </span>
                        <br />
                        Explore with your friends, learn about campus life, and
                        take fun photos!
                    </li>
                </ol>
            </div>

            {/* Terrier Trade Section */}
            <div className="w-full mb-6">
                <div className="font-extrabold text-2xl text-gray-700 mb-1">
                    Terrier Trade
                </div>
                <div className="text-gray-700 text-sm mb-2">
                    Cash in <span className="font-bold">Scotty Coins</span> at
                    the Terrier Trade for either
                    <span className="font-bold">Carnegie Cup Points</span>{" "}
                    (Points for their Dorm) or{" "}
                    <span className="font-bold">Merchandise</span>.
                    <br />
                    <span className="font-bold">
                        Merch Distribution can be picked up at a designated
                        University Center (UC) location everyday
                    </span>
                </div>
            </div>

            {/* Challenges Section */}
            <div className="w-full mb-6">
                <div className="font-extrabold text-2xl text-gray-700 mb-1">
                    Challenges
                </div>
                <div className="text-gray-700 text-sm font-bold mb-2">
                    <span className="text-red-700">“The Essentials”</span>{" "}
                    category teaches First-Year students about useful services
                    and utilities around campus, such as the UC Mailroom and the
                    CPDC.
                </div>
                <ul className="list-disc ml-6 text-gray-700 text-sm mb-2">
                    <li>UC Mailroom</li>
                    <li>The HUB</li>
                    <li>SLICE Office</li>
                    <li>The Center</li>
                    <li>Career and Professional Development Center (CPDC)</li>
                    <li>Student Academic Success Center (SASC)</li>
                    <li>PNC Bank</li>
                    <li>CAPS</li>
                    <li>Office of Disability Resources</li>
                    <li>
                        Highmark Center
                        <ul className="list-disc ml-6">
                            <li>Wellness Lab</li>
                            <li>Massage and Meditation Spaces</li>
                            <li>Spiritual Space</li>
                        </ul>
                    </li>
                    <li>
                        Wellness Vending Machines
                        <ul className="list-disc ml-6">
                            <li>Tepper</li>
                            <li>UC</li>
                        </ul>
                    </li>
                </ul>
                <div className="text-gray-700 text-sm font-bold mb-2">
                    The{" "}
                    <span className="text-green-700">
                        “Cool Corners of Carnegie”
                    </span>{" "}
                    category are common hangout and work spaces such as Hunt
                    Library, as well as lesser known but visually interesting
                    locations around campus such as the Number Garden.
                </div>
                <ul className="list-disc ml-6 text-gray-700 text-sm mb-2">
                    <li>The Fence</li>
                    <li>Hunt Library</li>
                    <li>
                        Sorrells Library
                        <ul className="list-disc ml-6">
                            <li>Color Printer</li>
                            <li>Number Garden</li>
                        </ul>
                    </li>
                    <li>Floor 1: DeAte</li>
                    <li>Floor 1: Color Printer</li>
                    <li>Floor 3: Power Banks</li>
                </ul>
                <div className="text-gray-700 text-sm font-bold mb-2">
                    The{" "}
                    <span className="text-blue-700">“Campus of Bridges”</span>{" "}
                    category is related to bridges and building connections
                    around campus, such as Pausch Bridge and the Wean-Doherty
                    hallways.
                </div>
                <ul className="list-disc ml-6 text-gray-700 text-sm mb-2">
                    <li>Doherty 4 &lt;—&gt; Wean 5</li>
                    <li>Doherty 1 &lt;—&gt; Wean 6</li>
                    <li>Doherty 2 &lt;—&gt; Wean 7</li>
                    <li>Wean 4 &lt;—&gt; NSH 4</li>
                    <li>NSH 4 &lt;—&gt; Gates 4</li>
                    <li>Scott Hall &lt;—&gt; Wean 4</li>
                    <li>Hamerschlag &lt;—&gt; Wean 4</li>
                    <li>Friends of Engineering Bridge</li>
                </ul>
                <div className="text-gray-700 text-sm font-bold mb-2">
                    The <span className="text-yellow-700">“Let’s Eat”</span>{" "}
                    category takes first-years to the dining locations on
                    campus.
                </div>
                <div className="text-gray-700 text-sm font-bold mb-2">
                    The{" "}
                    <span className="text-cyan-500">“Minor-Major General”</span>{" "}
                    category relates to school-specific buildings, and is
                    designed to get first-years to make friends outside of their
                    major.
                </div>
                <div className="text-gray-700 text-sm font-bold mb-2">
                    The{" "}
                    <span className="text-blue-700">
                        “Off-Campus Adventures”
                    </span>{" "}
                    category relates to activities and locations surrounding
                    campus, all of which come with first-years’ student IDs.
                </div>
                <ul className="list-disc ml-6 text-gray-700 text-sm mb-2">
                    <li>Bus Stops</li>
                    <li>Shuttles</li>
                    <li>Carnegie Museum</li>
                    <li>Squirrel Hill</li>
                </ul>
            </div>
        </div>
    );
}
