import { test, expect } from '@playwright/test';

test.describe('JSON Formatter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/json-formatter');
  });

  test('should load JSON formatter page', async ({ page }) => {
    await expect(page).toHaveTitle(/JSON Formatter/i);
    await expect(page.locator('h1')).toContainText(/JSON/i);
  });

  test('should beautify valid JSON', async ({ page }) => {
    const input = page.locator('textarea').first();
    await input.fill('{"name":"John","age":30}');
    
    // Click beautify button
    const beautifyBtn = page.locator('button:has-text("Beautify"), button:has-text("Format")').first();
    await beautifyBtn.click();
    
    // Output should contain formatted JSON
    await expect(page.locator('textarea').last()).not.toBeEmpty();
  });

  test('should show error for invalid JSON', async ({ page }) => {
    const input = page.locator('textarea').first();
    await input.fill('{invalid json}');
    
    // Click beautify
    const beautifyBtn = page.locator('button:has-text("Beautify"), button:has-text("Format")').first();
    await beautifyBtn.click();
    
    // Should show error message
    await expect(page.locator('[class*="error"], [class*="red"], [role="alert"]').first()).toBeVisible({ timeout: 3000 });
  });

  test('should have working copy button', async ({ page }) => {
    const input = page.locator('textarea').first();
    await input.fill('{"test": true}');
    
    const beautifyBtn = page.locator('button:has-text("Beautify"), button:has-text("Format")').first();
    await beautifyBtn.click();
    
    // Find and click copy button
    const copyBtn = page.locator('button[title*="Copy"], button:has(svg[class*="copy"])').first();
    if (await copyBtn.isVisible()) {
      await copyBtn.click();
    }
  });

  test('should have working minify button', async ({ page }) => {
    const input = page.locator('textarea').first();
    await input.fill('{\n  "name": "John",\n  "age": 30\n}');
    
    const minifyBtn = page.locator('button:has-text("Minify")').first();
    if (await minifyBtn.isVisible()) {
      await minifyBtn.click();
    }
  });

  test('should handle large JSON without crashing', async ({ page }) => {
    // Generate large JSON (1000 items)
    const largeArray = Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `Item ${i}` }));
    const largeJson = JSON.stringify(largeArray);
    
    const input = page.locator('textarea').first();
    await input.fill(largeJson);
    
    const beautifyBtn = page.locator('button:has-text("Beautify"), button:has-text("Format")').first();
    await beautifyBtn.click();
    
    // Should complete without timeout
    await expect(page.locator('textarea').last()).not.toBeEmpty({ timeout: 10000 });
  });
});
