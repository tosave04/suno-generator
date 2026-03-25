import { describe, it, expect } from "vitest";
import { GENRES } from "@/lib/data/genres";
import { MOODS } from "@/lib/data/moods";
import { WRITING_STYLES } from "@/lib/data/styles";
import { SUNO_TAGS } from "@/lib/data/suno-tags";
import { MUSIC_RULES } from "@/lib/data/music-rules";

describe("Genres musicaux", () => {
  it("contient au moins 15 genres", () => {
    expect(GENRES.length).toBeGreaterThanOrEqual(15);
  });

  it("chaque genre a un id unique", () => {
    const ids = GENRES.map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("chaque genre a les champs requis non vides", () => {
    for (const genre of GENRES) {
      expect(genre.id).toBeTruthy();
      expect(genre.name).toBeTruthy();
      expect(genre.description.length).toBeGreaterThan(10);
      expect(genre.subGenres.length).toBeGreaterThanOrEqual(1);
      expect(genre.typicalBpm.min).toBeLessThan(genre.typicalBpm.max);
      expect(genre.typicalStructure.length).toBeGreaterThanOrEqual(1);
      expect(genre.keyInstruments.length).toBeGreaterThanOrEqual(1);
      expect(genre.vocalCharacteristics.length).toBeGreaterThanOrEqual(1);
      expect(genre.historicalContext.length).toBeGreaterThan(10);
      expect(genre.sunoTags.length).toBeGreaterThanOrEqual(1);
      expect(genre.promptKeywords.length).toBeGreaterThanOrEqual(1);
      expect(genre.avoidKeywords.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("les BPM sont dans un range réaliste (30-300)", () => {
    for (const genre of GENRES) {
      expect(genre.typicalBpm.min).toBeGreaterThanOrEqual(30);
      expect(genre.typicalBpm.max).toBeLessThanOrEqual(300);
    }
  });
});

describe("Moods", () => {
  it("contient au moins 10 moods", () => {
    expect(MOODS.length).toBeGreaterThanOrEqual(10);
  });

  it("chaque mood a un id unique", () => {
    const ids = MOODS.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("chaque mood a les champs requis non vides", () => {
    for (const mood of MOODS) {
      expect(mood.id).toBeTruthy();
      expect(mood.name).toBeTruthy();
      expect(mood.description.length).toBeGreaterThan(10);
      expect(mood.lexicalFields.length).toBeGreaterThanOrEqual(5);
      expect(mood.musicalCharacteristics.length).toBeGreaterThanOrEqual(1);
      expect(mood.compatibleGenres.length).toBeGreaterThanOrEqual(1);
      expect(mood.promptModifiers.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("les genres compatibles référencent des genres existants", () => {
    const genreIds = new Set(GENRES.map((g) => g.id));
    for (const mood of MOODS) {
      for (const genreId of mood.compatibleGenres) {
        expect(genreIds.has(genreId)).toBe(true);
      }
    }
  });
});

describe("Styles d'écriture", () => {
  it("contient au moins 6 styles", () => {
    expect(WRITING_STYLES.length).toBeGreaterThanOrEqual(6);
  });

  it("chaque style a un id unique", () => {
    const ids = WRITING_STYLES.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("chaque style a les champs requis non vides", () => {
    for (const style of WRITING_STYLES) {
      expect(style.id).toBeTruthy();
      expect(style.name).toBeTruthy();
      expect(style.description.length).toBeGreaterThan(10);
      expect(style.rules.length).toBeGreaterThanOrEqual(3);
      expect(style.examples.length).toBeGreaterThanOrEqual(1);
      expect(style.sunoFormatting.length).toBeGreaterThanOrEqual(1);
    }
  });
});

describe("Suno Tags", () => {
  it("contient des tags de chaque catégorie", () => {
    const categories = new Set(SUNO_TAGS.map((t) => t.category));
    expect(categories.has("structure")).toBe(true);
    expect(categories.has("delivery")).toBe(true);
    expect(categories.has("instrumental")).toBe(true);
  });

  it("chaque tag a les champs requis", () => {
    for (const tag of SUNO_TAGS) {
      expect(tag.tag).toBeTruthy();
      expect(tag.description).toBeTruthy();
      expect(tag.category).toBeTruthy();
      expect(tag.usage).toBeTruthy();
    }
  });

  it("les tags essentiels sont présents", () => {
    const tags = SUNO_TAGS.map((t) => t.tag);
    expect(tags).toContain("[Verse]");
    expect(tags).toContain("[Chorus]");
    expect(tags).toContain("[Bridge]");
    expect(tags).toContain("[Intro]");
    expect(tags).toContain("[Outro]");
  });
});

describe("Règles musicales", () => {
  it("contient au moins 10 règles", () => {
    expect(MUSIC_RULES.length).toBeGreaterThanOrEqual(10);
  });

  it("chaque règle a un id unique", () => {
    const ids = MUSIC_RULES.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("les règles genre-specific référencent des genres existants", () => {
    const genreIds = new Set(GENRES.map((g) => g.id));
    for (const rule of MUSIC_RULES) {
      if (Array.isArray(rule.applicableGenres)) {
        for (const genreId of rule.applicableGenres) {
          expect(genreIds.has(genreId)).toBe(true);
        }
      }
    }
  });

  it("chaque règle a les champs requis non vides", () => {
    for (const rule of MUSIC_RULES) {
      expect(rule.id).toBeTruthy();
      expect(rule.category).toBeTruthy();
      expect(rule.title).toBeTruthy();
      expect(rule.description.length).toBeGreaterThan(10);
    }
  });
});
