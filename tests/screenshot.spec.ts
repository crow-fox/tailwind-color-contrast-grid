import test, { expect } from "@playwright/test";

test("screenshot[/]", async ({ page }) => {
  await page.goto("/");

  // ページの読み込みを待つ
  await page.getByRole("heading", {
    level: 1,
  });

  // スクリーンショットを撮る
  await expect(page).toHaveScreenshot({ fullPage: true });

  // ColorGridを一色クリックした後のスクリーンショットを撮る
  await page.getByRole("button", { name: "#f8fafc" }).click();
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("screenshot[reference]", async ({ page }) => {
  await page.goto("reference");

  await page.getByRole("heading", {
    level: 1,
  });

  await expect(page).toHaveScreenshot({ fullPage: true });
});
