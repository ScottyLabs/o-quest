import { Client } from "minio";

const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT;
const MINIO_PORT = Number.parseInt(process.env.MINIO_PORT || "9000");
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY;
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY;

if (!MINIO_ENDPOINT || !MINIO_ACCESS_KEY || !MINIO_SECRET_KEY) {
    throw new Error(
        "Environment variables MINIO_ENDPOINT, MINIO_ACCESS_KEY, and MINIO_SECRET_KEY are required",
    );
}

export const client = new Client({
    endPoint: MINIO_ENDPOINT,
    port: MINIO_PORT,
    useSSL: false,
    accessKey: MINIO_ACCESS_KEY,
    secretKey: MINIO_SECRET_KEY,
});
