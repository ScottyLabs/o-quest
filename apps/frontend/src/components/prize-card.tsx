import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Prize {
    name: string;
    cost: number;
    claimed: number;
    remaining: number;
    total: number;
    imageUrl: string;
}

export function PrizeCard({ prize }: { prize: Prize }) {
    return (
        <Card className="flex flex-row items-center justify-between p-4">
            <div className="flex flex-col">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        {prize.name}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-2">
                    <p>Cost: {prize.cost} points</p>
                    <p>Claimed: {prize.claimed}</p>
                    <p>
                        Remaining: {prize.remaining}/{prize.total}
                    </p>
                </CardContent>
            </div>
            <div>
                <img
                    src={prize.imageUrl}
                    alt={prize.name}
                    className="w-32 h-32 object-cover rounded-md"
                />
            </div>
        </Card>
    );
}
