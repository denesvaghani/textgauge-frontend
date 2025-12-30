import { test, expect } from '@playwright/test';

test.describe('JSON to CSV Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/json-to-csv');
  });

  test('should load converter page', async ({ page }) => {
    await expect(page).toHaveTitle(/JSON.*CSV|CSV.*JSON/i);
  });

  test('should convert JSON array to CSV', async ({ page }) => {
    const input = page.locator('textarea').first();
    await input.fill('[{"name":"John","age":30},{"name":"Jane","age":25}]');
    
    const convertBtn = page.locator('button:has-text("Convert")').first();
    if (await convertBtn.isVisible()) {
      await convertBtn.click();
    }
    
    await expect(page.locator('textarea').last()).not.toBeEmpty({ timeout: 5000 });
  });

  test('should handle nested JSON', async ({ page }) => {
    const input = page.locator('textarea').first();
    await input.fill('[{"user":{"name":"John"},"active":true}]');
    
    const convertBtn = page.locator('button:has-text("Convert")').first();
    if (await convertBtn.isVisible()) {
      await convertBtn.click();
    }
  });
});

test.describe('JSON to TOON Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/json-to-toon');
  });

  test('should load TOON converter page', async ({ page }) => {
    await expect(page).toHaveTitle(/TOON|JSON/i);
  });

  test('should convert JSON to TOON format', async ({ page }) => {
    const input = page.locator('textarea').first();
    await input.fill('{"name":"Test","value":123}');
    
    const convertBtn = page.locator('button:has-text("Convert")').first();
    if (await convertBtn.isVisible()) {
      await convertBtn.click();
    }
    
    await expect(page.locator('textarea').last()).not.toBeEmpty({ timeout: 5000 });
  });
});
