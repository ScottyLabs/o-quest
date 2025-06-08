#!/usr/bin/env bun

import { existsSync, readdirSync } from "node:fs";
import { homedir, platform } from "node:os";
import { join } from "node:path";
import { spawn } from "bun";

// Platform-specific defaults
const home = homedir();
let ANDROID_HOME: string;

if (platform() === "darwin") {
    ANDROID_HOME = join(home, "Library", "Android", "sdk");
} else if (platform() === "linux") {
    ANDROID_HOME = join(home, "Android", "Sdk");
} else if (platform() === "win32") {
    const localAppData = process.env.LOCALAPPDATA;
    if (!localAppData) {
        console.error(
            "LOCALAPPDATA environment variable is not set. Cannot locate Android SDK.",
        );
        process.exit(1);
    }

    ANDROID_HOME = join(localAppData, "Android", "Sdk");
} else {
    console.error("Unsupported OS:", platform());
    process.exit(1);
}

const ndkBase = join(ANDROID_HOME, "ndk");
if (!existsSync(ndkBase)) {
    console.error("NDK directory not found:", ndkBase);
    process.exit(1);
}

// Take the latest NDK version
// NDK versions are typically in the format "x.y.z" (e.g. "29.0.13113456")
const versions = readdirSync(ndkBase).filter((v) => /^\d+\.\d+\.\d+/.test(v));
if (versions.length === 0) {
    console.error("No NDK versions found in:", ndkBase);
    process.exit(1);
}

versions.sort((a, b) => (a > b ? -1 : 1));

const latestVersion = versions[0] as string;
const NDK_HOME = join(ndkBase, latestVersion);

console.log("Resolved Android environment:");
console.log(" ANDROID_HOME =", ANDROID_HOME);
console.log(" NDK_HOME     =", NDK_HOME);

// If on macOS, set JAVA_HOME to the JBR provided by Android Studio
if (platform() === "darwin") {
    console.log(
        " JAVA_HOME    = /Applications/Android Studio.app/Contents/jbr/Contents/Home",
    );
}

const proc = spawn({
    cmd: ["bun", "tauri", "android", "dev"],
    cwd: process.cwd(),
    env: Object.fromEntries(
        Object.entries({
            ...process.env,
            ANDROID_HOME,
            NDK_HOME,
            ...(platform() === "darwin" && {
                JAVA_HOME:
                    "/Applications/Android Studio.app/Contents/jbr/Contents/Home",
            }),
        }).map(([k, v]) => [k, String(v)]),
    ),
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
});

const exitCode = await proc.exited;
process.exit(exitCode);
