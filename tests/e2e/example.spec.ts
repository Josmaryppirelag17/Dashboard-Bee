import { test, expect } from "@playwright/test";

test.describe("App", () => {
  test("renderiza la pagina principal", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });
});
