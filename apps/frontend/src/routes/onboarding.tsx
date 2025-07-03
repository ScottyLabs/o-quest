import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/onboarding")({
    component: Onboarding,
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
            "Even more cool subheading which will not be read by the user",
        image: "/images/onboarding-images/placeholder.svg",
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
        image: "/images/onboarding-images/placeholder.svg",
        button: "Log In",
        action: "login",
    },
];

function Onboarding() {
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();

    // Check if user has completed onboarding on component mount
    useEffect(() => {
        const hasCompletedOnboarding = localStorage.getItem(
            "onboardingCompleted",
        );
        if (hasCompletedOnboarding === "true") {
            navigate({ to: "/" });
        }
    }, [navigate]);

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
            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-8">
                {/* Image */}
                <img
                    src={image}
                    alt={title}
                    className="w-37 h-37 object-contain mb-8"
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

            {/* Buttons */}
            <div className="px-8 pb-8 shrink-0">
                <Button
                    onClick={handleStepAction}
                    className="w-full h-12 bg-red-700 text-white rounded-3xl text-lg font-medium font-bold mb-2 transition hover:bg-red-800"
                    type="button"
                >
                    {button}
                </Button>
                {currentStep > 0 && (
                    <Button
                        onClick={prevStep}
                        variant="ghost"
                        className="w-full py-2 text-gray-500 text-base font-normal transition hover:bg-gray-100"
                        type="button"
                    >
                        Back
                    </Button>
                )}
            </div>
        </div>
    );
}
