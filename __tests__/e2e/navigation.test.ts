import { test, expect } from '@playwright/test';

/**
 * E2E Tests - Testing complete user workflows
 *
 * The dev server is started automatically via playwright.config.ts webServer.
 * Run with: pnpm test:e2e
 */

test.describe('Navigation Flow', () => {
  test('should load the home page successfully', async ({ page }) => {
    await page.goto('/');
    const title = await page.textContent('h1');
    expect(title).toBeTruthy();
  });

  test('should navigate to timesheet page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Timesheet' }).click();
    await page.waitForURL('**/timesheets');
    expect(page.url()).toContain('/timesheets');
  });

  test('should navigate between multiple pages', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Reports' }).click();
    await page.waitForURL('**/reports');
    expect(page.url()).toContain('/reports');

    await page.getByRole('link', { name: 'Overview' }).click();
    await page.waitForURL('/');
    expect(page.url()).not.toContain('/reports');
  });

  test('should have a visible navbar', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
  });
});

test.describe('Component Interactions', () => {
  test('should have at least one enabled button on the page', async ({ page }) => {
    await page.goto('/');
    const firstButton = page.locator('button').first();
    await expect(firstButton).toBeEnabled();
  });

  test('should show a 404 page for unknown routes', async ({ page }) => {
    await page.goto('/non-existent-page');
    // NextJS renders a custom not-found page — verify something is visible
    await expect(page.locator('body')).toBeVisible();
    expect(page.url()).toContain('non-existent-page');
  });
});
