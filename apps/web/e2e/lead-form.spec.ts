import { test, expect } from "@playwright/test";

test.describe("Lead Form — Contact Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contacts");
  });

  test("should display the contact form", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Контакты");
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('textarea[name="comment"]')).toBeVisible();
  });

  test("should show validation errors on empty submit", async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator("text=Минимум")).toBeVisible();
  });

  test("should submit form successfully", async ({ page }) => {
    await page.fill('input[name="name"]', "Тест Тестов");
    await page.fill('input[name="phone"]', "+79991234567");
    await page.fill('textarea[name="comment"]', "Тестовая заявка из E2E теста");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=Заявка отправлена")).toBeVisible({
      timeout: 10000,
    });
  });

  test("should submit form with all fields", async ({ page }) => {
    await page.fill('input[name="name"]', "Иван Петров");
    await page.fill('input[name="phone"]', "+79001112233");
    await page.fill('input[name="telegram"]', "@ivanpetrov");
    await page.fill('input[name="budget"]', "от 200 000 ₽");
    await page.fill('textarea[name="comment"]', "Нужен корпоративный сайт для строительной компании");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=Заявка отправлена")).toBeVisible({
      timeout: 10000,
    });
  });
});
