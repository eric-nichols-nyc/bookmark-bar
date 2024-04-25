import { expect, test } from "@playwright/test";

// test("should show a login log user in", async ({ page }) => {
//   // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
//   await page.goto('http://localhost:3000/');
//find button with text "Sign in"
  //await page.locator('#signin').click();
  // click the button and go to the login page
  // The new URL should be "/signin" (baseURL is used there)
  // The new page should contain an h1 with "Sign in"
//   await expect(page).toHaveURL("http://localhost:3000/signin");
//   await page.getByLabel('Email').click();
//   await page.getByLabel('Email').fill('ebn646@gmail.com');
//   await page.getByLabel('Password', { exact: true }).click();
//   await page.getByLabel('Password', { exact: true }).fill('TilTuesday1967!');
//   await page.click("text=Sign In");
//   await page.waitForLoadState("networkidle");

//   await expect(page).toHaveURL("http://localhost:3000/bookmarks");
// });

test("should log user out", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/bookmarks');
  await page.waitForLoadState("networkidle");

  // find the logout button and cllck it
  await expect(page.locator('[data-testid="navbar-logout"]')).toBeVisible();

  await page.getByRole('button', { name: 'Sign Out' }).click();
  // new page should be the index page
 await expect(page).toHaveURL("http://localhost:3000/?redirect=false");
} );


// test("should navigate to a new page with no bookmarks", async ({ page }) => {
//   // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
//   await page.goto('http://localhost:3000/');
//   // Find an element with the text 'About' and click on it

//   // extect the new folder to be added
//   await expect(page.locator("a").last()).toContainText("New Folder");
//   // click on last item to navigate to the new page
//   await page.locator("a").last().click();
//   // The new page should contain an h1 with "New Folder"
//   await expect(page.locator("h1").last()).toContainText("No Bookmarks Found");
// } );

