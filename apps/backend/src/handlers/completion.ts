import { getPhotoUrl, uploadPhoto } from "@/bucket/operations";
import { db } from "@/db";
import { challenges, completion, user } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import type { AuthenticatedContext } from "../../context";

interface CompleteRequest {
    challengeId: string;
    photoBlob?: string; // base64 encoded image
    note?: string;
    verification: string; // currently unused
}

interface CompleteContext extends AuthenticatedContext {
    body: CompleteRequest;
}

export const completeChallenge = async ({ auth, body }: CompleteContext) => {
    const userId = auth.sub;
    const { challengeId, photoBlob, note, verification } = body;

    if (!userId) {
        throw new Error("User ID not found in token");
    }

    // Verify challenge exists
    const challenge = await db
        .select()
        .from(challenges)
        .where(eq(challenges.name, challengeId))
        .limit(1);

    if (challenge.length === 0) {
        throw new Error("Challenge not found");
    }

    // Check if challenge is unlocked (current time >= unlock time)
    const now = new Date();
    if (challenge[0].unlockTimestamp > now) {
        throw new Error("Challenge not yet unlocked");
    }

    // Check if user exists
    const existingUser = await db
        .select()
        .from(user)
        .where(eq(user.userId, userId))
        .limit(1);

    if (existingUser.length === 0) {
        throw new Error("User not found");
    }

    // Check if already completed
    const existingCompletion = await db
        .select()
        .from(completion)
        .where(
            and(
                eq(completion.userId, userId),
                eq(completion.challengeName, challengeId),
            ),
        )
        .limit(1);

    if (existingCompletion.length > 0) {
        throw new Error("Challenge already completed");
    }

    let s3Link: string | null = null;

    // Upload photo if provided
    if (photoBlob) {
        try {
            const objectKey = await uploadPhoto(userId, challengeId, photoBlob);
            s3Link = objectKey;
        } catch (error) {
            console.error("Photo upload failed:", error);
            throw new Error("Failed to upload photo");
        }
    }

    // Insert completion record
    await db.insert(completion).values({
        userId,
        challengeName: challengeId,
        timestamp: new Date(),
        s3Link,
        note: note || null,
    });

    return {
        success: true,
        message: "Challenge completed successfully",
        scottyCoins: challenge[0].scottyCoins,
        photoUploaded: !!photoBlob,
    };
};

interface JournalResponse {
    photoBlob?: string; // base64 encoded image
    photoUrl?: string; // presigned URL
    note?: string;
    challengeName: string;
    completedAt: Date;
    scottyCoins: number;
}

export const getJournalEntry = async ({
    auth,
    params,
}: AuthenticatedContext & {
    params: { challengeId: string };
}): Promise<JournalResponse> => {
    const userId = auth.sub;
    const { challengeId } = params;

    if (!userId) {
        throw new Error("User ID not found in token");
    }

    // Get completion record with challenge details
    const completionRecord = await db
        .select({
            s3Link: completion.s3Link,
            note: completion.note,
            timestamp: completion.timestamp,
            challengeName: challenges.name,
            scottyCoins: challenges.scottyCoins,
        })
        .from(completion)
        .innerJoin(challenges, eq(completion.challengeName, challenges.name))
        .where(
            and(
                eq(completion.userId, userId),
                eq(completion.challengeName, challengeId),
            ),
        )
        .limit(1);

    if (completionRecord.length === 0) {
        throw new Error("Journal entry not found");
    }

    const record = completionRecord[0];

    let photoUrl: string | undefined;

    // Get photo if exists
    if (record.s3Link) {
        try {
            // Return presigned URL
            photoUrl = await getPhotoUrl(record.s3Link);
        } catch (error) {
            console.error("Failed to retrieve photo:", error);
            // Continue without photo rather than failing completely
        }
    }

    return {
        photoUrl,
        note: record.note || undefined,
        challengeName: record.challengeName,
        completedAt: record.timestamp,
        scottyCoins: record.scottyCoins,
    };
};

export const getAllJournalEntries = async ({ auth }: AuthenticatedContext) => {
    const userId = auth.sub;

    if (!userId) {
        throw new Error("User ID not found in token");
    }

    const entries = await db
        .select({
            challengeName: challenges.name,
            category: challenges.category,
            location: challenges.location,
            tagline: challenges.tagline,
            timestamp: completion.timestamp,
            scottyCoins: challenges.scottyCoins,
            hasPhoto: completion.s3Link,
            hasNote: completion.note,
        })
        .from(completion)
        .innerJoin(challenges, eq(completion.challengeName, challenges.name))
        .where(eq(completion.userId, userId))
        .orderBy(completion.timestamp);

    return entries.map((entry) => ({
        ...entry,
        hasPhoto: !!entry.hasPhoto,
        hasNote: !!entry.hasNote,
    }));
};
