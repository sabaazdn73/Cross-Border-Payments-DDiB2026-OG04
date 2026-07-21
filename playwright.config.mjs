import { defineConfig } from '@playwright/test';
import { existsSync } from 'fs';

// This sandbox can't download Playwright's own browser binary (network
// egress restrictions on cdn.playwright.dev), but has one preinstalled
// at this path from an unrelated tool. Using it here ONLY if present,
// so this config doesn't break `npx playwright install && npx
// playwright test` on a real machine or in CI, where the normal
// Playwright-managed browser is what should be used instead.
const sandboxChromium = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:5173',
    headless: true,
    ...(existsSync(sandboxChromium) ? { launchOptions: { executablePath: sandboxChromium } } : {}),
  },
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: 'npm --prefix frontend run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: true,
        timeout: 30_000,
      },
});
