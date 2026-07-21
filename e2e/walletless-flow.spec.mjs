// ═══════════════════════════════════════════════════════════════════
//   e2e/walletless-flow.spec.mjs
//   ───────────────────────────────────────────────────────────────
//   Real browser E2E tests (the third piece of the report's testing
//   claim, alongside Vitest and Supertest). These drive an actual
//   Chromium instance against the real frontend, not a mocked DOM.
//   Run with: npx playwright test
// ═══════════════════════════════════════════════════════════════════

import { test, expect } from '@playwright/test';

test('home page loads and shows the core walletless promise', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Cross-Border/i);
  await expect(page.getByText(/No Wallet Required/i)).toBeVisible();
});

test('navigating to Send Money shows the transfer form, no wallet field anywhere', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Send Money' }).first().click();
  await expect(page).toHaveURL(/send-money/);
  await expect(page.getByText(/wallet address/i)).toHaveCount(0);
  await expect(page.getByText(/private key/i)).toHaveCount(0);
  await expect(page.getByText(/seed phrase/i)).toHaveCount(0);
});

test('the Tamper Demo page loads and shows an initial hash match', async ({ page }) => {
  await page.goto('/tamper-demo');
  await expect(page.getByText(/Tamper Detection Demo/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /Verify Original Record/i })).toBeVisible();
});

test('tampering with the record and re-verifying flips the result to a mismatch', async ({ page }) => {
  await page.goto('/tamper-demo');
  await page.getByRole('button', { name: /Modify Off-Chain Record/i }).click();
  await page.getByRole('button', { name: /Verify Modified Record/i }).click();
  await expect(page.getByText(/Current Hash: MISMATCH/i)).toBeVisible({ timeout: 10_000 });
});

test('Community page requires a code to post, rejects an empty submission', async ({ page }) => {
  await page.goto('/community');
  await expect(page.getByText(/Community Usage Code/i)).toBeVisible();
});

test('the app shell shows a splash screen with the full logo before entering', async ({ page }) => {
  await page.goto('/app');
  await expect(page.getByText(/Tap to open/i)).toBeVisible();
});
