import { expect, test } from '@playwright/test';
// Don't use the default user agent to avoid the requests to be blocked by Clerk middleware.
// test.use({ userAgent: '' });


test('Form should edit an existing bookmark', async ({ page }) => {
  await page.goto('http://localhost:3000/bookmark/65ef9be7de3439f8b60d2baf/youtube');
await page.locator('[id="cardoptions"]').first().click();
await page.getByRole('menuitem', { name: 'Edit' }).click();
await page.locator('input[name="title"]').click();

await page.locator('input[name="title"]').fill('Test');
await page.locator('textarea[name="description"]').click();
await page.locator('textarea[name="description"]').fill('Here is my new description');
await page.getByLabel('Edit Bookmark').click();
});
