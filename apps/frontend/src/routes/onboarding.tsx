import { Button } from "@/components/ui/button";
import {
    createFileRoute,
    useNavigate,
    useSearch,
} from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/onboarding")({
    component: Onboarding,
    validateSearch: (search) => ({
        from: search.from as string | undefined,
    }),
});

interface Step {
    title: string;
    description: string;
    image: string;
    button: string;
    action: "next" | "login";
}

const steps: Step[] = [
    {
        title: "Explore Campus",
        description:
            "Create Your Own Adventure: Explore with your friends, learn about campus life, and take fun photos!",
        image: "/images/onboarding-images/cmu-logo.svg",
        button: "Next",
        action: "next",
    },
    {
        title: "Collect Coins",
        description: "Scotty Coins can be earned through completing tasks",
        image: "/images/onboarding-images/collect-coins.svg",
        button: "Next",
        action: "next",
    },
    {
        title: "Reap Rewards",
        description:
            "Trade Scotty Coin at the Terrier Trade to earn swag, rewards, and more",
        image: "/images/onboarding-images/terrier-trade-card-placeholder.svg",
        button: "Log In",
        action: "login",
    },
];

function Onboarding() {
    const { from } = useSearch({ from: "/onboarding" });
    const isFromAbout = from === "about";

    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();
    const [imgSize, setImgSize] = useState<{
        width: number;
        height: number;
    } | null>(null);

    // Check if user has completed onboarding on component mount
    useEffect(() => {
        if (!isFromAbout) {
            const hasCompletedOnboarding = localStorage.getItem(
                "onboardingCompleted",
            );
            if (hasCompletedOnboarding === "true") {
                navigate({ to: "/" });
            }
        }
    }, [navigate, isFromAbout]);

    const nextStep = () =>
        setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

    const handleStepAction = () => {
        const currentStepData = steps[currentStep];
        if (currentStepData?.action === "login") {
            // Mark onboarding as completed when user clicks "Log In"
            localStorage.setItem("onboardingCompleted", "true");
            navigate({ to: "/" });
        } else {
            nextStep();
        }
    };

    const step = steps[currentStep];
    if (!step) return null;

    const { title, description, image, button } = step;

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Top bar with Back and Skip */}
            <div className="flex items-center justify-between px-4 pt-6 pb-2">
                {/* Back button (only show if not first step) */}
                {currentStep > 0 ? (
                    <button
                        onClick={prevStep}
                        className="flex items-center text-gray-700 hover:bg-gray-100 rounded-full p-2 transition"
                        aria-label="Back"
                        type="button"
                    >
                        <ChevronLeft size={24} />
                    </button>
                ) : (
                    <div style={{ width: 40 }} />
                )}
                {/* Skip button */}
                <button
                    onClick={() => {
                        localStorage.setItem("onboardingCompleted", "true");
                        navigate({ to: "/" });
                    }}
                    className="text-gray-500 hover:text-red-700 font-medium transition px-2 py-1"
                    type="button"
                >
                    Skip
                </button>
            </div>
            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-8">
                {/* Image */}
                <img
                    src={image}
                    alt={title}
                    style={
                        imgSize
                            ? {
                                  width: imgSize.width,
                                  height: imgSize.height,
                                  objectFit: "contain",
                                  marginBottom: "2rem",
                              }
                            : {
                                  maxWidth: 300,
                                  maxHeight: 240,
                                  objectFit: "contain",
                                  marginBottom: "2rem",
                              }
                    }
                    onLoad={(e) => {
                        const { naturalWidth, naturalHeight } = e.currentTarget;
                        setImgSize({
                            width: naturalWidth,
                            height: naturalHeight,
                        });
                    }}
                />
                {/* Title */}
                <h2 className="text-2xl font-medium mb-2 text-center">
                    {title}
                </h2>
                {/* Description */}
                <p className="text-gray-600 text-base text-center mb-8">
                    {description}
                </p>
                {/* Dots */}
                <div className="flex gap-2 mb-8">
                    {steps.map((step, i) => (
                        <span
                            key={step.title}
                            className={`w-2.5 h-2.5 rounded-full ${i === currentStep ? "bg-red-700" : "bg-gray-300"}`}
                        />
                    ))}
                </div>
            </div>

            {/* Next button */}
            <div className="px-8 pb-8 shrink-0">
                <Button
                    onClick={handleStepAction}
                    className="w-full h-12 bg-red-700 text-white rounded-3xl text-lg font-medium font-bold mb-2 transition hover:bg-red-800"
                    type="button"
                >
                    {isFromAbout && currentStep === steps.length - 1
                        ? "End Tutorial"
                        : button}
                </Button>
            </div>
        </div>
    );
}
