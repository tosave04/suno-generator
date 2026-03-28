import { describe, it, expect } from "vitest";
import { calculateSunoSettings } from "@/lib/services/settings-calculator";

describe("calculateSunoSettings", () => {
  it("retourne des valeurs dans la plage 0-100", () => {
    for (let i = 0; i < 50; i++) {
      const result = calculateSunoSettings(["pop"], "joyful", "direct");
      expect(result.weirdness).toBeGreaterThanOrEqual(0);
      expect(result.weirdness).toBeLessThanOrEqual(100);
      expect(result.styleInfluence).toBeGreaterThanOrEqual(0);
      expect(result.styleInfluence).toBeLessThanOrEqual(100);
    }
  });

  it("retourne des entiers", () => {
    const result = calculateSunoSettings(["rock"], "energetic", "anthem");
    expect(Number.isInteger(result.weirdness)).toBe(true);
    expect(Number.isInteger(result.styleInfluence)).toBe(true);
  });

  it("genre pop = weirdness plutôt bas", () => {
    const results = Array.from({ length: 30 }, () =>
      calculateSunoSettings(["pop"], undefined, "direct"),
    );
    const avg = results.reduce((s, r) => s + r.weirdness, 0) / results.length;
    expect(avg).toBeLessThan(40);
  });

  it("genre ambient = weirdness plus élevé que pop", () => {
    const popResults = Array.from({ length: 30 }, () =>
      calculateSunoSettings(["pop"], undefined, "direct"),
    );
    const ambientResults = Array.from({ length: 30 }, () =>
      calculateSunoSettings(["ambient"], undefined, "direct"),
    );
    const popAvg = popResults.reduce((s, r) => s + r.weirdness, 0) / popResults.length;
    const ambientAvg = ambientResults.reduce((s, r) => s + r.weirdness, 0) / ambientResults.length;
    expect(ambientAvg).toBeGreaterThan(popAvg);
  });

  it("mood chaos augmente fortement le weirdness", () => {
    const normalResults = Array.from({ length: 30 }, () =>
      calculateSunoSettings(["rock"], undefined, "poetic"),
    );
    const chaosResults = Array.from({ length: 30 }, () =>
      calculateSunoSettings(["rock"], "chaos", "poetic"),
    );
    const normalAvg = normalResults.reduce((s, r) => s + r.weirdness, 0) / normalResults.length;
    const chaosAvg = chaosResults.reduce((s, r) => s + r.weirdness, 0) / chaosResults.length;
    expect(chaosAvg).toBeGreaterThan(normalAvg + 20);
  });

  it("mood chaos diminue le styleInfluence", () => {
    const normalResults = Array.from({ length: 30 }, () =>
      calculateSunoSettings(["rock"], undefined, "poetic"),
    );
    const chaosResults = Array.from({ length: 30 }, () =>
      calculateSunoSettings(["rock"], "chaos", "poetic"),
    );
    const normalAvg = normalResults.reduce((s, r) => s + r.styleInfluence, 0) / normalResults.length;
    const chaosAvg = chaosResults.reduce((s, r) => s + r.styleInfluence, 0) / chaosResults.length;
    expect(chaosAvg).toBeLessThan(normalAvg - 15);
  });

  it("style abstract augmente le weirdness", () => {
    const directResults = Array.from({ length: 30 }, () =>
      calculateSunoSettings(["pop"], "joyful", "direct"),
    );
    const abstractResults = Array.from({ length: 30 }, () =>
      calculateSunoSettings(["pop"], "joyful", "abstract"),
    );
    const directAvg = directResults.reduce((s, r) => s + r.weirdness, 0) / directResults.length;
    const abstractAvg = abstractResults.reduce((s, r) => s + r.weirdness, 0) / abstractResults.length;
    expect(abstractAvg).toBeGreaterThan(directAvg);
  });

  it("deux genres = moyenne des bases", () => {
    const popOnly = Array.from({ length: 50 }, () =>
      calculateSunoSettings(["pop"], undefined, "direct"),
    );
    const ambientOnly = Array.from({ length: 50 }, () =>
      calculateSunoSettings(["ambient"], undefined, "direct"),
    );
    const mixed = Array.from({ length: 50 }, () =>
      calculateSunoSettings(["pop", "ambient"], undefined, "direct"),
    );
    const popAvg = popOnly.reduce((s, r) => s + r.weirdness, 0) / popOnly.length;
    const ambientAvg = ambientOnly.reduce((s, r) => s + r.weirdness, 0) / ambientOnly.length;
    const mixedAvg = mixed.reduce((s, r) => s + r.weirdness, 0) / mixed.length;
    // Mixed should be between the two (with some tolerance for random variance)
    expect(mixedAvg).toBeGreaterThan(popAvg - 5);
    expect(mixedAvg).toBeLessThan(ambientAvg + 5);
  });

  it("genre inconnu utilise les valeurs par défaut", () => {
    const result = calculateSunoSettings(["unknown_genre"], undefined, "direct");
    expect(result.weirdness).toBeGreaterThanOrEqual(0);
    expect(result.weirdness).toBeLessThanOrEqual(100);
    expect(result.styleInfluence).toBeGreaterThanOrEqual(0);
    expect(result.styleInfluence).toBeLessThanOrEqual(100);
  });
});
