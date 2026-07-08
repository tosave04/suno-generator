import { describe, it, expect } from "vitest";
import {
  createStyleSchema,
  styleResponseSchema,
} from "@/lib/schemas/style";
import {
  buildStyleSystemPrompt,
  buildStyleUserMessage,
} from "@/lib/services/style-prompt-builder";

// ============================================================
// Schéma Zod — createStyleSchema
// ============================================================
describe("createStyleSchema", () => {
  it("valide une référence correcte", () => {
    const result = createStyleSchema.safeParse({ reference: "Daft Punk" });
    expect(result.success).toBe(true);
  });

  it("rejette une référence trop courte", () => {
    const result = createStyleSchema.safeParse({ reference: "a" });
    expect(result.success).toBe(false);
  });

  it("rejette une référence trop longue", () => {
    const result = createStyleSchema.safeParse({
      reference: "a".repeat(201),
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================
// Schéma Zod — styleResponseSchema
// ============================================================
describe("styleResponseSchema", () => {
  it("valide une réponse complète bien formée", () => {
    const result = styleResponseSchema.safeParse({
      detectedGenre: "electronic",
      detectedMood: "energetic",
      rationale: "French electronic duo with iconic vocoder-driven house grooves.",
      positivePrompt:
        "French house, electronic, vocoder vocals, funky bassline, 120 BPM, polished production",
      negativePrompt: "no acoustic, no folk, no country twang",
      sunoSettings: {
        vocalGender: "Male",
        weirdness: 42,
        styleInfluence: 70,
      },
    });
    expect(result.success).toBe(true);
  });

  it("rejette weirdness hors plage", () => {
    const result = styleResponseSchema.safeParse({
      detectedGenre: "pop",
      detectedMood: null,
      rationale: "Reason",
      positivePrompt: "pop, 120 BPM",
      negativePrompt: null,
      sunoSettings: {
        vocalGender: "Female",
        weirdness: 150,
        styleInfluence: 50,
      },
    });
    expect(result.success).toBe(false);
  });

  it("normalise un vocalGender invalide via catch -> Male", () => {
    const result = styleResponseSchema.safeParse({
      detectedGenre: "pop",
      detectedMood: null,
      rationale: "Reason",
      positivePrompt: "pop, 120 BPM",
      negativePrompt: null,
      sunoSettings: {
        vocalGender: "Robot",
        weirdness: 30,
        styleInfluence: 50,
      },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.sunoSettings.vocalGender).toBe("Male");
    }
  });
});

// ============================================================
// Prompt builder
// ============================================================
describe("buildStyleSystemPrompt", () => {
  it("inclut le corpus llms-full.txt en intégralité (non tronqué)", () => {
    const prompt = buildStyleSystemPrompt();
    // Sentinelles présentes dans llms-full.txt
    expect(prompt).toContain("SECTION 1 — PARAMÈTRES D'ENTRÉE");
    expect(prompt).toContain("SECTION 5.1 — GENRES");
    expect(prompt).toContain("----- BEGIN llms-full.txt -----");
    expect(prompt).toContain("----- END llms-full.txt -----");
  });

  it("contient les instructions OUTPUT FORMAT JSON", () => {
    const prompt = buildStyleSystemPrompt();
    expect(prompt).toContain("OUTPUT FORMAT:");
    expect(prompt).toContain("detectedGenre");
    expect(prompt).toContain("positivePrompt");
    expect(prompt).toContain("sunoSettings");
    expect(prompt).toContain("weirdness");
    expect(prompt).toContain("styleInfluence");
  });
});

describe("buildStyleUserMessage", () => {
  it("inclut la référence saisie", () => {
    const msg = buildStyleUserMessage("Bohemian Rhapsody");
    expect(msg).toContain("Bohemian Rhapsody");
    expect(msg).toContain("JSON");
  });

  it("trim la référence", () => {
    const msg = buildStyleUserMessage("   Queen   ");
    expect(msg).toContain('"Queen"');
  });
});
