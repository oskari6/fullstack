import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

const baseURL = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" });
}

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  reporter: "html",

  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120_000,
    env: {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL!,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
    },
  },
});
