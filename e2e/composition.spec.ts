import { test, expect } from "@playwright/test";

test.describe("Parcours critique — Composition", () => {
  test("la page /compose se charge avec les sélecteurs", async ({ page }) => {
    await page.goto("/compose");

    // Header visible
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByText("Suno Generator")).toBeVisible();

    // Navigation links
    await expect(page.getByRole("link", { name: "Composer" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Stats/ })).toBeVisible();

    // Sélecteurs de composition visibles
    await expect(page.getByText("Genre musical")).toBeVisible();
    await expect(page.getByText("Mood / Atmosphère")).toBeVisible();
    await expect(page.getByText("Style d'écriture")).toBeVisible();

    // Bouton Générer désactivé (rien sélectionné)
    const generateBtn = page.getByRole("button", { name: /Générer/ });
    await expect(generateBtn).toBeVisible();
    await expect(generateBtn).toBeDisabled();
  });

  test("sélection des paramètres active le bouton Générer", async ({ page }) => {
    await page.goto("/compose");

    // Sélectionner un genre
    await page.getByRole("button", { name: /Pop/ }).first().click();

    // Sélectionner un mood
    await page.getByRole("button", { name: /Joyful|😊/ }).first().click();

    // Sélectionner un style
    await page.getByText("Poetic").first().click();

    // Entrer un prompt (>= 10 car)
    await page.getByPlaceholder(/Décrivez|thème|sujet/).fill("A happy summer song about freedom and love");

    // Le bouton Générer est maintenant activé
    const generateBtn = page.getByRole("button", { name: /Générer/ });
    await expect(generateBtn).toBeEnabled();
  });

  test("la page /stats se charge", async ({ page }) => {
    await page.goto("/stats");

    await expect(page.getByText("Statistiques")).toBeVisible();
    await expect(page.getByText("Générations")).toBeVisible();
    await expect(page.getByText("Favoris")).toBeVisible();
  });

  test("navigation entre Composer et Stats", async ({ page }) => {
    await page.goto("/compose");

    // Naviguer vers Stats
    await page.getByRole("link", { name: /Stats/ }).click();
    await expect(page).toHaveURL(/\/stats/);
    await expect(page.getByText("Statistiques")).toBeVisible();

    // Retour vers Composer
    await page.getByRole("link", { name: "Composer" }).click();
    await expect(page).toHaveURL(/\/compose/);
    await expect(page.getByText("Genre musical")).toBeVisible();
  });
});
