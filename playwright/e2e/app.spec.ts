import { expect, test } from "@playwright/test";

test("should open a form", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/');
  // Find an element with the text 'About' and click on it
  await page.click("#new-folder");
  // The new URL should be "/about" (baseURL is used there)
  // The new page should contain an h1 with "About"
  await expect(page.locator("form")).toBeVisible();
});

test("should add a new folder", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/');
  // Find an element with the text 'About' and click on it
  await page.click("#new-folder");
  // The new URL should be "/about" (baseURL is used there)
  // The new page should contain an h1 with "About"
  await expect(page.locator("form")).toBeVisible();

  const newFolder = page.getByPlaceholder("Folder name");
  await newFolder.fill("New Folder");
  await page.click("button[type='submit']");

  // extect the new folder to be added
  await expect(page.locator("a").last()).toContainText("New Folder");
} );


test("should navigate to a new page with no bookmarks", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/');
  // Find an element with the text 'About' and click on it

  // extect the new folder to be added
  await expect(page.locator("a").last()).toContainText("New Folder");
  // click on last item to navigate to the new page
  await page.locator("a").last().click();
  // The new page should contain an h1 with "New Folder"
  await expect(page.locator("h1").last()).toContainText("No Bookmarks Found");
} );

