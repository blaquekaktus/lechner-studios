import { defineConfig, devices } from "playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3100",
  },
  webServer: {
    // Dedicated port (3100) so tests don't collide with a developer's
    // already-running `next dev` on :3000. Uses `next start` against a
    // pre-built app so it can run in parallel with a `next dev` session
    // (Next refuses to start a second dev server in the same project dir).
    command: "npm run build && npx next start --port 3100",
    url: "http://localhost:3100/de",
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
    env: {
      // Force-disable maintenance mode so SEO contract tests hit real routes.
      // Local .env.local sets MAINTENANCE_MODE=1 by default.
      MAINTENANCE_MODE: "0",
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
