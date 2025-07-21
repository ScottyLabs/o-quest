import { readFileSync } from "node:fs";
import path from "node:path";
import { db } from "@/db";
import { challenges } from "@/db/schema";
import { parse } from "csv-parse";

interface CSVChallenge {
    Category: string;
    Location: string;
    "Challenge Name": string;
    Tagline: string;
    Description: string;
    "More Info Link": string | null;
    "Unlocks/Revealed On": string;
}

function parseDate(input: string) {
    const [datePart, timePart, meridian] = input.split(/[\s]+/);
    const [month, day, year] = datePart.split("/").map(Number);
    let [hour, minute] = timePart.split(":").map(Number);

    if (meridian === "PM" && hour !== 12) hour += 12;
    if (meridian === "AM" && hour === 12) hour = 0;

    return new Date(year, month - 1, day, hour, minute);
}

async function seed() {
    console.log("Seeding challenges");

    try {
        // Read the CSV file
        const csvPath = path.join(process.cwd(), "data", "challenges.csv");
        const csvContent = readFileSync(csvPath, "utf-8");

        // Parse CSV
        const records = await new Promise<CSVChallenge[]>((resolve, reject) => {
            parse(
                csvContent,
                {
                    columns: true,
                    skip_empty_lines: true,
                    trim: true,
                },
                (err, records) => {
                    if (err) reject(err);
                    else resolve(records);
                },
            );
        });

        // Transform and insert challenges
        const challengeData = records.map((record) => {
            const unlockDate = parseDate(record["Unlocks/Revealed On"]);

            return {
                name: record["Challenge Name"],
                category: record.Category,
                location: record.Location,
                scottyCoins: 100, // Default value
                mapsLink: "https://cmumaps.com", // Default value
                tagline: record.Tagline,
                description: record.Description,
                moreInfoLink: record["More Info Link"],
                unlockTimestamp: unlockDate,
            };
        });

        await db.insert(challenges).values(challengeData);
        console.log(`Inserting ${challengeData.length} challenges`);
    } catch (error) {
        console.error("Error seeding challenges:", error);
        throw error;
    }
}

if (import.meta.main) {
    await seed();
    console.log("Done seeding challenges");
}
