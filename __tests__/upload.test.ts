import { describe, it, expect } from "vitest";
import {
  audioUrlSchema,
  deleteAudioSchema,
  ACCEPTED_URL_PREFIXES,
} from "@/lib/schemas/upload";

// ============================================================
// Schéma Zod — audioUrlSchema
// ============================================================
describe("audioUrlSchema", () => {
  const validSunoInput = {
    generationId: "clx1234567890",
    audioUrl: "https://suno.com/s/abc123",
  };

  it("valide un lien Suno correct", () => {
    const result = audioUrlSchema.safeParse(validSunoInput);
    expect(result.success).toBe(true);
  });

  it("valide un lien YouTube (watch) correct", () => {
    const result = audioUrlSchema.safeParse({
      ...validSunoInput,
      audioUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    });
    expect(result.success).toBe(true);
  });

  it("valide un lien YouTube (youtu.be) correct", () => {
    const result = audioUrlSchema.safeParse({
      ...validSunoInput,
      audioUrl: "https://youtu.be/dQw4w9WgXcQ",
    });
    expect(result.success).toBe(true);
  });

  it("rejette un lien Spotify", () => {
    const result = audioUrlSchema.safeParse({
      ...validSunoInput,
      audioUrl: "https://open.spotify.com/track/123",
    });
    expect(result.success).toBe(false);
  });

  it("rejette un lien HTTP (non HTTPS)", () => {
    const result = audioUrlSchema.safeParse({
      ...validSunoInput,
      audioUrl: "http://suno.com/s/abc123",
    });
    expect(result.success).toBe(false);
  });

  it("rejette un lien vide", () => {
    const result = audioUrlSchema.safeParse({
      ...validSunoInput,
      audioUrl: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejette un URL quelconque", () => {
    const result = audioUrlSchema.safeParse({
      ...validSunoInput,
      audioUrl: "https://example.com/audio.mp3",
    });
    expect(result.success).toBe(false);
  });

  it("rejette un generationId vide", () => {
    const result = audioUrlSchema.safeParse({
      ...validSunoInput,
      generationId: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejette un lien YouTube mobile (m.youtube.com)", () => {
    const result = audioUrlSchema.safeParse({
      ...validSunoInput,
      audioUrl: "https://m.youtube.com/watch?v=dQw4w9WgXcQ",
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================
// Schéma Zod — deleteAudioSchema
// ============================================================
describe("deleteAudioSchema", () => {
  it("valide un input correct", () => {
    const result = deleteAudioSchema.safeParse({
      generationId: "clx1234567890",
    });
    expect(result.success).toBe(true);
  });

  it("rejette un generationId vide", () => {
    const result = deleteAudioSchema.safeParse({
      generationId: "",
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================
// Constantes
// ============================================================
describe("upload constants", () => {
  it("ACCEPTED_URL_PREFIXES contient les 3 préfixes autorisés", () => {
    expect(ACCEPTED_URL_PREFIXES).toContain("https://suno.com/s/");
    expect(ACCEPTED_URL_PREFIXES).toContain("https://www.youtube.com/watch?v=");
    expect(ACCEPTED_URL_PREFIXES).toContain("https://youtu.be/");
    expect(ACCEPTED_URL_PREFIXES).toHaveLength(3);
  });
});
