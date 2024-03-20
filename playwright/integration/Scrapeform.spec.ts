import { expect, test } from '@playwright/test';
// Don't use the default user agent to avoid the requests to be blocked by Clerk middleware.
// test.use({ userAgent: '' });

test('Form should submit and add a new bookmark', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  expect(page.getByRole('button', {name: 'Add a new Bookmark'})).not.toBeNull();
  await page.getByTestId('addboomark-button').click();
  expect(page.locator('h1')).toContainText('Add bookmark');
  await page.fill('input[name="url"]', 'https://example.com');
  await page.locator('[name="category"]').selectOption({label: 'Youtube'});
  await page.click('button[type="submit"]');
  // await page.waitForSelector('text=Bookmark added');
});
