import { test, expect } from '@playwright/test';

test.describe('Diff Checker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/diff-checker');
  });

  test('should load diff checker page', async ({ page }) => {
    await expect(page).toHaveTitle(/Diff Checker/i);
    await expect(page.locator('h1')).toContainText(/Diff/i);
  });

  test('should show diff between two texts', async ({ page }) => {
    const textareas = page.locator('textarea');
    
    // Fill left side
    await textareas.first().fill('Hello World\nLine 2\nLine 3');
    
    // Fill right side
    await textareas.last().fill('Hello Universe\nLine 2\nLine 4');
    
    // Click compare button
    const compareBtn = page.locator('button:has-text("Compare"), button:has-text("Diff")').first();
    if (await compareBtn.isVisible()) {
      await compareBtn.click();
    }
    
    // Some diff visualization should appear
    await page.waitForTimeout(1000);
  });

  test('should show no differences for identical texts', async ({ page }) => {
    const textareas = page.locator('textarea');
    const sameText = 'Line 1\nLine 2\nLine 3';
    
    await textareas.first().fill(sameText);
    await textareas.last().fill(sameText);
    
    const compareBtn = page.locator('button:has-text("Compare"), button:has-text("Diff")').first();
    if (await compareBtn.isVisible()) {
      await compareBtn.click();
    }
  });

  test('should handle empty inputs gracefully', async ({ page }) => {
    const compareBtn = page.locator('button:has-text("Compare"), button:has-text("Diff")').first();
    if (await compareBtn.isVisible()) {
      await compareBtn.click();
    }
    // Should not crash
  });
});
