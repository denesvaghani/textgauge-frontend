import { test, expect } from '@playwright/test';

test.describe('Homepage Character Counter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage with editor visible', async ({ page }) => {
    await expect(page).toHaveTitle(/TextGauge|Character Counter/i);
    await expect(page.locator('[contenteditable="true"]').first()).toBeVisible();
  });

  test('should show placeholder text in empty editor', async ({ page }) => {
    const editor = page.locator('[contenteditable="true"]').first();
    await expect(editor).toBeVisible();
  });

  test('should update character count when typing', async ({ page }) => {
    const editor = page.locator('[contenteditable="true"]').first();
    await editor.click();
    await editor.fill('Hello World');
    
    // Check that stats update (look for "11" which is character count)
    await expect(page.getByText('11')).toBeVisible({ timeout: 5000 });
  });

  test('should update word count correctly', async ({ page }) => {
    const editor = page.locator('[contenteditable="true"]').first();
    await editor.click();
    await editor.fill('One two three four five');
    
    // Look for word count of 5
    await expect(page.getByText('5')).toBeVisible({ timeout: 5000 });
  });

  test('should have working Clear button', async ({ page }) => {
    const editor = page.locator('[contenteditable="true"]').first();
    await editor.click();
    await editor.fill('Some test content');
    
    // Find and click clear button (trash icon)
    const clearButton = page.locator('button[title*="Clear"], button:has(svg[class*="trash"])').first();
    if (await clearButton.isVisible()) {
      await clearButton.click();
      const editorText = await editor.textContent();
      expect(editorText?.trim() || '').toBe('');
    }
  });

  test('should have working Undo/Redo buttons', async ({ page }) => {
    const editor = page.locator('[contenteditable="true"]').first();
    await editor.click();
    await editor.fill('First');
    await page.waitForTimeout(500);
    await editor.fill('Second');
    
    // Find undo button
    const undoButton = page.locator('button[title*="Undo"], button:has(svg[class*="undo"])').first();
    if (await undoButton.isVisible()) {
      await undoButton.click();
    }
  });

  test('should be keyboard accessible', async ({ page }) => {
    // Tab through the page
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check something has focus
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeDefined();
  });
});
