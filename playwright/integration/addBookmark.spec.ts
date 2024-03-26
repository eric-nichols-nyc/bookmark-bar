import { expect, test } from '@playwright/test';
// Don't use the default user agent to avoid the requests to be blocked by Clerk middleware.
// test.use({ userAgent: '' });

test('Form should submit and add a new bookmark', async ({ page }) => {
  await page.goto('http://localhost:3000/bookmark/65ef9be7de3439f8b60d2baf/youtube');
 // expect(page.locator('h1')).toContainText('Add a new bookmark');
  expect(page.getByRole('button', {name: 'Add bookmark'})).not.toBeNull();
  await page.getByTestId('addbookmark-button').click();
  await page.fill('input[name="url"]', 'https://example.com');
  await page.locator('[name="category"]').selectOption({label: 'youtube'});
  await page.click('button[type="submit"]');
  await page.waitForSelector('text=Bookmark added');
});
