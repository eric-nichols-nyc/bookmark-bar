import { expect, test } from '@playwright/test';
// Don't use the default user agent to avoid the requests to be blocked by Clerk middleware.
// test.use({ userAgent: '' });
test.describe('Add a new bookmark', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/bookmark/66197beb75de3122905b20e4');
  });
  test('Form should be visible', async ({ page }) => {
    // the add form should be visible
    await expect(page.locator('form')).toBeVisible();
   //the form should have a url input
    await expect(page.locator('input[name="url"]')).toBeVisible();
    // the form should have a category input
    await expect(page.locator('select[name="category"]')).toBeVisible();
    // the form should have a submit button
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    // the form should submit the data
    await page.fill('input[name="url"]', 'https://www.example.com');
    await page.selectOption('select[name="category"]', { label: 'general' });
    await page.click('button[type="submit"]');
    // expect a new bookmark item to be added
    await expect(page.locator('div[data-testid="bookmark-item"]')).toBeVisible();
  });
});
