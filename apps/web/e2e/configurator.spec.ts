import { test, expect } from "@playwright/test";

test.describe("Service Configurator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/configurator");
  });

  test("should display step 1 — category selection", async ({ page }) => {
    await expect(page.locator("text=Выберите направление")).toBeVisible();
    await expect(page.locator("text=Маркетинг")).toBeVisible();
    await expect(page.locator("text=Веб-разработка")).toBeVisible();
    await expect(page.locator("text=Дизайн")).toBeVisible();
  });

  test("should navigate to step 2 on category click", async ({ page }) => {
    await page.click("text=Маркетинг");
    await expect(page.locator("text=Выберите услуги")).toBeVisible();
  });

  test("should select services and see suggestions", async ({ page }) => {
    await page.click("text=Веб-разработка");
    await expect(page.locator("text=Выберите услуги")).toBeVisible();

    // Select a service
    await page.click("text=Лендинг");

    // Should show "often purchased together" suggestions
    await expect(page.locator("text=Часто заказывают вместе")).toBeVisible();
  });

  test("should proceed to cart and show selected services", async ({ page }) => {
    await page.click("text=Маркетинг");

    // Select Yandex Direct
    await page.click("text=Яндекс Директ");

    // Click Next
    await page.click("text=Далее");

    // Should be on cart step
    await expect(page.locator("text=Ваш набор услуг")).toBeVisible();
    await expect(page.locator("text=Яндекс Директ")).toBeVisible();
    await expect(page.locator("text=Предварительная стоимость")).toBeVisible();
  });

  test("full flow: select → cart → brief → submit", async ({ page }) => {
    // Step 1: Select category
    await page.click("text=Дизайн");

    // Step 2: Select service
    await page.click("text=UI/UX дизайн");
    await page.click("text=Далее");

    // Step 3: Cart — click proceed to brief
    await expect(page.locator("text=Ваш набор услуг")).toBeVisible();
    await page.click("text=Обсудить бриф");

    // Step 4: Fill brief
    await expect(page.locator("text=Расскажите о себе")).toBeVisible();
    await page.fill('input[id="brief-name"]', "Тест Конфигуратор");
    await page.fill('input[id="brief-phone"]', "+79998887766");

    // Submit
    await page.click("text=Отправить бриф");

    // Should show success
    await expect(page.locator("text=Заявка отправлена")).toBeVisible({
      timeout: 10000,
    });
  });

  test("should allow removing services from cart", async ({ page }) => {
    await page.click("text=Маркетинг");

    // Select multiple services
    await page.click("text=Яндекс Директ");
    await page.click("text=SEO-продвижение");
    await page.click("text=Далее");

    // Cart should show 2 items
    await expect(page.locator("text=Ваш набор услуг")).toBeVisible();

    // Remove one service
    const removeButtons = page.locator("text=Убрать");
    await removeButtons.first().click();

    // Should still have one item in cart
    await expect(page.locator("text=Предварительная стоимость")).toBeVisible();
  });
});
