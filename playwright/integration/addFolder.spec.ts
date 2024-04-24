import { expect, test } from '@playwright/test';

test('Form should add annew folder', async ({ page }) => {
    await page.goto('http://localhost:3000/bookmark/661718ddd896f0252077e150');
    await page.locator('[id="cardoptions"]').first().click();
    await page.getByRole('menuitem', { name: 'Edit' }).click();
    await page.locator('input[name="title"]').click();
  
    await page.locator('input[name="title"]').fill('Test');
    await page.locator('textarea[name="description"]').click();
    await page.locator('textarea[name="description"]').fill('This is an AI project for Next JS');
    await page.getByTestId('edit').click();
    await page.getByRole('img').nth(1).click();
    
    // expect testid editform to not be visible
  });
  