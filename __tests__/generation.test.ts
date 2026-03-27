import { describe, it, expect } from "vitest";
import {
  createGenerationSchema,
  generationResponseSchema,
} from "@/lib/schemas/generation";
import { buildSystemPrompt } from "@/lib/services/context-builder";
import {
  countWords,
  countCharacters,
  countSections,
  estimateDuration,
  computeStats,
} from "@/lib/utils/stats";

// ============================================================
// Schéma Zod — createGenerationSchema
// ============================================================
describe("createGenerationSchema", () => {
  it("valide un input complet correct", () => {
    const input = {
      userPrompt: "A sad love song about rainy nights",
      genres: ["pop"],
      mood: "melancholic",
      style: "poetic",
      tempo: "Slow",
      languages: ["en"],
      vocalStyle: "Female",
    };
    const result = createGenerationSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("valide un input minimal (champs optionnels absents)", () => {
    const input = {
      userPrompt: "An upbeat dance track",
      genres: ["electronic"],
      style: "direct",
      languages: ["en"],
    };
    const result = createGenerationSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejette un userPrompt trop court", () => {
    const input = {
      userPrompt: "Short",
      genres: ["pop"],
      mood: "joyful",
      style: "direct",
      languages: ["en"],
    };
    const result = createGenerationSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejette un genres vide", () => {
    const input = {
      userPrompt: "A beautiful love song",
      genres: [],
      mood: "romantic",
      style: "poetic",
      languages: ["en"],
    };
    const result = createGenerationSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejette un titre trop long", () => {
    const input = {
      userPrompt: "A song about the ocean",
      genres: ["ambient"],
      mood: "calm",
      style: "poetic",
      languages: ["en"],
      title: "A".repeat(101),
    };
    const result = createGenerationSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// ============================================================
// Schéma Zod — generationResponseSchema
// ============================================================
describe("generationResponseSchema", () => {
  it("valide une réponse complète", () => {
    const response = {
      title: "Midnight Echoes",
      lyrics: "[Verse 1]\nHello world\n\n[Chorus]\nSing along",
      positivePrompt: "pop, catchy, upbeat, female vocals, 120 BPM, C Major",
      negativePrompt: "no screaming, no autotune",
      sunoSettings: {
        vocalGender: "Female",
        weirdness: 30,
        styleInfluence: 70,
      },
    };
    const result = generationResponseSchema.safeParse(response);
    expect(result.success).toBe(true);
  });

  it("valide une réponse avec negativePrompt null", () => {
    const response = {
      title: "Sunset Drive",
      lyrics: "[Verse]\nTest lyrics",
      positivePrompt: "rock, guitar",
      negativePrompt: null,
      sunoSettings: {
        vocalGender: "Male",
        weirdness: 50,
        styleInfluence: 60,
      },
    };
    const result = generationResponseSchema.safeParse(response);
    expect(result.success).toBe(true);
  });

  it("rejette des lyrics vides", () => {
    const response = {
      title: "Test",
      lyrics: "",
      positivePrompt: "pop",
      negativePrompt: null,
      sunoSettings: {
        vocalGender: "Male",
        weirdness: 50,
        styleInfluence: 50,
      },
    };
    const result = generationResponseSchema.safeParse(response);
    expect(result.success).toBe(false);
  });

  it("rejette un weirdness hors range (>100)", () => {
    const response = {
      title: "Test",
      lyrics: "[Verse]\nHello",
      positivePrompt: "pop",
      negativePrompt: null,
      sunoSettings: { vocalGender: "Male", weirdness: 150, styleInfluence: 50 },
    };
    expect(generationResponseSchema.safeParse(response).success).toBe(false);
  });

  it("fallback vocalGender invalide vers Male", () => {
    const response = {
      title: "Test",
      lyrics: "[Verse]\nHello",
      positivePrompt: "pop",
      negativePrompt: null,
      sunoSettings: { vocalGender: "Robot", weirdness: 50, styleInfluence: 50 },
    };
    const result = generationResponseSchema.safeParse(response);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.sunoSettings.vocalGender).toBe("Male");
    }
  });

  it("rejette une réponse sans titre", () => {
    const response = {
      lyrics: "[Verse]\nHello",
      positivePrompt: "pop",
      negativePrompt: null,
      sunoSettings: { vocalGender: "Male", weirdness: 50, styleInfluence: 50 },
    };
    expect(generationResponseSchema.safeParse(response).success).toBe(false);
  });
});

// ============================================================
// Context Builder
// ============================================================
describe("buildSystemPrompt", () => {
  it("inclut le genre dans le contexte", () => {
    const prompt = buildSystemPrompt({
      userPrompt: "A happy pop song",
      genres: ["pop"],
      mood: "joyful",
      style: "direct",
      languages: ["en"],
      songLength: "standard",
    });
    expect(prompt).toContain("GENRE: Pop");
    expect(prompt).toContain("catchy");
  });

  it("inclut le mood dans le contexte", () => {
    const prompt = buildSystemPrompt({
      userPrompt: "A sad ballad",
      genres: ["rock"],
      mood: "melancholic",
      style: "poetic",
      languages: ["en"],
      songLength: "standard",
    });
    expect(prompt).toContain("MOOD: Melancholic");
  });

  it("inclut les instructions de langue", () => {
    const prompt = buildSystemPrompt({
      userPrompt: "Une chanson française",
      genres: ["pop"],
      mood: "joyful",
      style: "poetic",
      languages: ["fr"],
      songLength: "standard",
    });
    expect(prompt).toContain("French");
  });

  it("inclut le style vocal si spécifié", () => {
    const prompt = buildSystemPrompt({
      userPrompt: "Opera song",
      genres: ["classical"],
      mood: "epic",
      style: "poetic",
      languages: ["en"],
      vocalStyle: "Opera",
      songLength: "standard",
    });
    expect(prompt).toContain("Opera");
  });

  it("inclut le format de sortie JSON", () => {
    const prompt = buildSystemPrompt({
      userPrompt: "Any song",
      genres: ["pop"],
      mood: "joyful",
      style: "direct",
      languages: ["en"],
      songLength: "standard",
    });
    expect(prompt).toContain("OUTPUT FORMAT");
    expect(prompt).toContain("JSON");
  });

  it("inclut les tags Suno", () => {
    const prompt = buildSystemPrompt({
      userPrompt: "Test",
      genres: ["pop"],
      mood: "joyful",
      style: "direct",
      languages: ["en"],
      songLength: "standard",
    });
    expect(prompt).toContain("SUNO TAGS REFERENCE");
    expect(prompt).toContain("[Chorus]");
  });

  it("inclut les instructions Suno Settings dans le format", () => {
    const prompt = buildSystemPrompt({
      userPrompt: "Test",
      genres: ["pop"],
      mood: "joyful",
      style: "direct",
      languages: ["en"],
      songLength: "standard",
    });
    expect(prompt).toContain("sunoSettings");
    expect(prompt).toContain("vocalGender");
    expect(prompt).toContain("weirdness");
    expect(prompt).toContain("styleInfluence");
    expect(prompt).toContain("Exclude from Song");
    expect(prompt).toContain("title");
  });
});

// ============================================================
// Stats
// ============================================================
describe("countWords", () => {
  it("compte les mots hors tags", () => {
    const lyrics = "[Verse 1]\nHello beautiful world\n\n[Chorus]\nSing it loud";
    expect(countWords(lyrics)).toBe(6);
  });

  it("retourne 0 pour des lyrics vides", () => {
    expect(countWords("")).toBe(0);
  });

  it("ignore les tags inline", () => {
    const lyrics = "[Verse]\nHello\n(instrumental)\nWorld";
    expect(countWords(lyrics)).toBe(2);
  });
});

describe("countCharacters", () => {
  it("compte les caractères hors tags et sauts de ligne", () => {
    const lyrics = "[Verse]\nHello\nWorld";
    expect(countCharacters(lyrics)).toBe(10); // "HelloWorld"
  });
});

describe("countSections", () => {
  it("compte les sections [...]", () => {
    const lyrics = "[Intro]\n(instrumental)\n\n[Verse 1]\nHello\n\n[Chorus]\nYeah";
    expect(countSections(lyrics)).toBe(3);
  });

  it("ne compte pas les tags inline (...)", () => {
    const lyrics = "[Verse]\nHello\n(whisper)\nWorld";
    expect(countSections(lyrics)).toBe(1);
  });
});

describe("estimateDuration", () => {
  it("estime la durée pour un tempo normal", () => {
    const duration = estimateDuration(8, 120);
    expect(duration).toBe("3:12");
  });

  it("estime une durée plus longue pour un tempo lent", () => {
    const duration = estimateDuration(8, 70);
    expect(duration).toBe("4:00");
  });

  it("gère l'absence de BPM", () => {
    const duration = estimateDuration(6);
    expect(duration).toBe("2:24");
  });
});

describe("computeStats", () => {
  it("calcule toutes les stats d'un coup", () => {
    const lyrics = "[Verse 1]\nHello beautiful world\n\n[Chorus]\nSing it loud\n\n[Outro]\nGoodbye";
    const stats = computeStats(lyrics, 120);
    expect(stats.wordCount).toBe(7);
    expect(stats.sectionCount).toBe(3);
    expect(stats.estimatedDuration).toBe("1:12");
    expect(stats.characterCount).toBeGreaterThan(0);
  });
});
