import { client } from "@/bucket";

const BUCKET_NAME = "o-quest";

export async function ensureBucket() {
    try {
        const exists = await client.bucketExists(BUCKET_NAME);
        if (!exists) {
            await client.makeBucket(BUCKET_NAME);

            // Set bucket policy to allow read access for photos
            const policy = {
                Version: "2012-10-17",
                Statement: [
                    {
                        Effect: "Allow",
                        Principal: { AWS: ["*"] },
                        Action: ["s3:GetObject"],
                        Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`],
                    },
                ],
            };

            await client.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
        }
    } catch (error) {
        console.error("Error ensuring bucket:", error);
        throw error;
    }
}

export async function uploadPhoto(
    userId: string,
    challengeName: string,
    base64Data: string,
): Promise<string> {
    try {
        // Remove data URL prefix if present
        const base64Content = base64Data.replace(
            /^data:image\/[a-z]+;base64,/,
            "",
        );
        const buffer = Buffer.from(base64Content, "base64");

        // Generate unique object key
        const timestamp = Date.now();
        const objectKey = `photos/${userId}/${challengeName}/${timestamp}.jpg`;

        // Upload to MinIO
        await client.putObject(BUCKET_NAME, objectKey, buffer, buffer.length, {
            "Content-Type": "image/jpeg",
            "Cache-Control": "max-age=31536000", // 1 year cache
        });

        return objectKey;
    } catch (error) {
        console.error("Error uploading photo:", error);
        throw new Error("Failed to upload photo");
    }
}

export async function getPhotoUrl(
    objectKey: string,
    expirySeconds = 3600,
): Promise<string> {
    try {
        return await client.presignedGetObject(
            BUCKET_NAME,
            objectKey,
            expirySeconds,
        );
    } catch (error) {
        console.error("Error getting photo URL:", error);
        throw new Error("Failed to generate photo URL");
    }
}

export async function deletePhoto(objectKey: string): Promise<void> {
    try {
        await client.removeObject(BUCKET_NAME, objectKey);
    } catch (error) {
        console.error("Error deleting photo:", error);
        throw new Error("Failed to delete photo");
    }
}

// Initialize bucket on startup
ensureBucket().catch(console.error);
