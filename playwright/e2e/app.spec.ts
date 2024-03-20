import { test, expect } from "@playwright/test";

test("should open a form", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/');
  // Find an element with the text 'About' and click on it
  await page.click("#addboomark-button");
  // The new URL should be "/about" (baseURL is used there)
  // The new page should contain an h1 with "About"
  await expect(page.locator("h1")).toContainText("Add a new bookmark");
});
