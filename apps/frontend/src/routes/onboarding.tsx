import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

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
        image: "/path/to/image1.png",
        button: "Next",
        action: "next",
    },
    {
        title: "Collect Coins",
        description: "Scotty Coins can be earned through completing tasks",
        image: "/path/to/image2.png",
        button: "Next",
        action: "next",
    },
    {
        title: "Reap Rewards",
        description:
            "Trade Scotty Coin at the Terrier Trade to earn swag, rewards, and more",
        image: "/path/to/image3.png",
        button: "Log In",
        action: "login",
    },
];

function Onboarding() {
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();

    const nextStep = () =>
        setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

    const handleStepAction = () => {
        const currentStepData = steps[currentStep];
        if (currentStepData?.action === "login") {
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
                <div className="w-28 h-28 rounded-xl bg-gray-100 flex items-center justify-center mb-8">
                    <img
                        src={image}
                        alt={title}
                        className="w-20 h-20 object-contain"
                    />
                </div>
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
