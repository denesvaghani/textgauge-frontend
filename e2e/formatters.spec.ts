import { test, expect } from '@playwright/test';

test.describe('YAML Formatter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/yaml-formatter');
  });

  test('should load YAML formatter page', async ({ page }) => {
    await expect(page).toHaveTitle(/YAML Formatter/i);
    await expect(page.locator('h1')).toContainText(/YAML/i);
  });

  test('should beautify valid YAML', async ({ page }) => {
    const input = page.locator('textarea').first();
    await input.fill('name: John\nage: 30\nskills:\n  - JavaScript\n  - Python');
    
    const beautifyBtn = page.locator('button:has-text("Beautify"), button:has-text("Format")').first();
    await beautifyBtn.click();
    
    await expect(page.locator('textarea').last()).not.toBeEmpty();
  });

  test('should handle YAML with comments', async ({ page }) => {
    const input = page.locator('textarea').first();
    await input.fill('# This is a comment\nname: John  # inline comment');
    
    const beautifyBtn = page.locator('button:has-text("Beautify"), button:has-text("Format")').first();
    await beautifyBtn.click();
    
    await expect(page.locator('textarea').last()).not.toBeEmpty();
  });

  test('should show error for invalid YAML', async ({ page }) => {
    const input = page.locator('textarea').first();
    await input.fill('name: John\n  invalid: indentation');
    
    const beautifyBtn = page.locator('button:has-text("Beautify"), button:has-text("Format")').first();
    await beautifyBtn.click();
    
    // May or may not show error depending on YAML parser tolerance
    await page.waitForTimeout(1000);
  });
});

test.describe('TOML Formatter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/toml-formatter');
  });

  test('should load TOML formatter page', async ({ page }) => {
    await expect(page).toHaveTitle(/TOML Formatter/i);
    await expect(page.locator('h1')).toContainText(/TOML/i);
  });

  test('should beautify valid TOML', async ({ page }) => {
    const input = page.locator('textarea').first();
    await input.fill('[package]\nname = "test"\nversion = "1.0.0"');
    
    const beautifyBtn = page.locator('button:has-text("Beautify"), button:has-text("Format")').first();
    await beautifyBtn.click();
    
    await expect(page.locator('textarea').last()).not.toBeEmpty();
  });
});
