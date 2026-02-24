import { test, expect } from "@playwright/test";

test.describe("Admin Authentication", () => {
  test("should display login form", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("should show error on invalid credentials", async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill('input[type="email"]', "wrong@email.com");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.click('button[type="submit"]');

    await expect(
      page.locator("text=Неверный email или пароль").or(
        page.locator('[class*="red"]')
      )
    ).toBeVisible({ timeout: 5000 });
  });

  test("should redirect to admin on successful login", async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill('input[type="email"]', "admin@webkultura.ru");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');

    // Should redirect to admin dashboard
    await page.waitForURL(/\/admin/, { timeout: 10000 });
    await expect(page.locator("text=Заявки").or(page.locator("text=Лиды"))).toBeVisible({
      timeout: 5000,
    });
  });

  test("should redirect to login when accessing admin without auth", async ({
    page,
  }) => {
    await page.goto("/admin");
    // Should redirect to login page
    await page.waitForURL(/\/admin\/login/, { timeout: 10000 });
  });

  test("should logout successfully", async ({ page }) => {
    // Login first
    await page.goto("/admin/login");
    await page.fill('input[type="email"]', "admin@webkultura.ru");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');

    await page.waitForURL(/\/admin/, { timeout: 10000 });

    // Click logout
    await page.click("text=Выход");

    // Should be redirected to login
    await page.waitForURL(/\/admin\/login/, { timeout: 5000 });
  });
});
