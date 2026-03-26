import { describe, it, expect } from "vitest";
import {
  uploadAudioSchema,
  deleteAudioSchema,
  MAX_FILE_SIZE,
  ACCEPTED_EXTENSIONS,
} from "@/lib/schemas/upload";

// ============================================================
// Schéma Zod — uploadAudioSchema
// ============================================================
describe("uploadAudioSchema", () => {
  const validInput = {
    generationId: "clx1234567890",
    fileName: "my-song.mp3",
    fileSize: 1024 * 1024, // 1 Mo
    fileType: "audio/mpeg",
  };

  it("valide un fichier MP3 correct", () => {
    const result = uploadAudioSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("valide un fichier WAV correct", () => {
    const result = uploadAudioSchema.safeParse({
      ...validInput,
      fileName: "track.wav",
      fileType: "audio/wav",
    });
    expect(result.success).toBe(true);
  });

  it("valide audio/wave comme type MIME", () => {
    const result = uploadAudioSchema.safeParse({
      ...validInput,
      fileName: "track.wav",
      fileType: "audio/wave",
    });
    expect(result.success).toBe(true);
  });

  it("rejette un fichier trop volumineux (>20 Mo)", () => {
    const result = uploadAudioSchema.safeParse({
      ...validInput,
      fileSize: MAX_FILE_SIZE + 1,
    });
    expect(result.success).toBe(false);
  });

  it("rejette un fichier vide (0 octets)", () => {
    const result = uploadAudioSchema.safeParse({
      ...validInput,
      fileSize: 0,
    });
    expect(result.success).toBe(false);
  });

  it("rejette un format audio non supporté (OGG)", () => {
    const result = uploadAudioSchema.safeParse({
      ...validInput,
      fileName: "track.ogg",
      fileType: "audio/ogg",
    });
    expect(result.success).toBe(false);
  });

  it("rejette une extension invalide (.pdf)", () => {
    const result = uploadAudioSchema.safeParse({
      ...validInput,
      fileName: "document.pdf",
      fileType: "application/pdf",
    });
    expect(result.success).toBe(false);
  });

  it("rejette un generationId vide", () => {
    const result = uploadAudioSchema.safeParse({
      ...validInput,
      generationId: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejette un nom de fichier vide", () => {
    const result = uploadAudioSchema.safeParse({
      ...validInput,
      fileName: "",
    });
    expect(result.success).toBe(false);
  });

  it("accepte un fichier à la taille limite exacte (20 Mo)", () => {
    const result = uploadAudioSchema.safeParse({
      ...validInput,
      fileSize: MAX_FILE_SIZE,
    });
    expect(result.success).toBe(true);
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
  it("MAX_FILE_SIZE vaut 20 Mo", () => {
    expect(MAX_FILE_SIZE).toBe(20 * 1024 * 1024);
  });

  it("ACCEPTED_EXTENSIONS contient .mp3 et .wav", () => {
    expect(ACCEPTED_EXTENSIONS).toContain(".mp3");
    expect(ACCEPTED_EXTENSIONS).toContain(".wav");
  });
});
