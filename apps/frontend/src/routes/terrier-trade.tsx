import { PageHeader } from "@/components/page-header";
import { PrizeCard } from "@/components/prize-card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terrier-trade")({
    component: TerrierTrade,
});

function TerrierTrade() {
    const prizes = [
        {
            name: "Terrier Plushie",
            cost: 100,
            claimed: 1,
            allowedToClaim: 1,
            remaining: 3,
            total: 10,
            imageUrl:
                "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=256&h=256&q=80",
        },
        {
            name: "Scotty Mug",
            cost: 50,
            claimed: 0,
            allowedToClaim: 2,
            remaining: 5,
            total: 7,
            imageUrl:
                "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=256&h=256&q=80",
        },
    ];
    return (
        <div>
            <PageHeader
                title="Terrier Trade"
                infoText="This page lets you trade your points in for prizes."
            />
            <div className="p-4 max-w-xl mx-auto flex flex-col gap-8">
                {prizes.map((prize) => (
                    <PrizeCard key={prize.name} prize={prize} />
                ))}
            </div>
        </div>
    );
}
