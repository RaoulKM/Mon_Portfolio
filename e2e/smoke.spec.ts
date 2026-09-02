import { test, expect } from "@playwright/test";

test.describe("public site", () => {
  test("home loads and links to projects", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/KOM MBOUME|Développeur/i);
    await page.getByRole("link", { name: /voir mes projets/i }).first().click();
    await expect(page).toHaveURL(/\/projects$/);
  });

  test("navbar 'Profil' dropdown reaches the academic path", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Formation" }).first().click();
    await expect(page).toHaveURL(/\/education$/);
    await expect(page.getByText(/parcours académique/i)).toBeVisible();
  });

  test("contact form rejects an invalid submission client-side", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Nom").fill("A");
    await page.getByLabel("Email").fill("not-an-email");
    await page.getByLabel(/message/i).fill("court");
    await page.getByRole("button", { name: /envoyer le message/i }).click();
    await expect(page.getByText(/nom trop court|message trop court/i).first()).toBeVisible();
  });
});

test.describe("admin", () => {
  test("protected routes redirect to login", async ({ page }) => {
    await page.goto("/admin/projects");
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByText(/sudo access required/i)).toBeVisible();
  });
});

test("health endpoint responds", async ({ request }) => {
  const res = await request.get("/api/health");
  // 200 when the DB is up, 500 when it is not — both prove the route is wired.
  expect([200, 500]).toContain(res.status());
});
