import { describe, it, expect } from "vitest";
import {
  computeStats,
  countWords,
  countCharacters,
  countSections,
  estimateDuration,
} from "@/lib/utils/stats";

describe("Stats — computeStats", () => {
  const sampleLyrics = `[Verse 1]
Walking through the city lights
Feeling like a star tonight
I'm shining, I'm glowing

[Chorus]
We are the dreamers
We are the believers
Nothing can stop us now

[Verse 2]
Dancing in the moonlight glow
Everywhere we want to go

[Bridge]
(Instrumental break)

[Outro]
One last time…`;

  it("countWords exclut les tags Suno", () => {
    expect(countWords(sampleLyrics)).toBeGreaterThan(0);
    // Les tags [Verse 1], [Chorus], etc. ne comptent pas
    expect(countWords("[Verse 1]\nHello world")).toBe(2);
  });

  it("countWords retourne 0 pour un texte vide", () => {
    expect(countWords("")).toBe(0);
    expect(countWords("[Intro]")).toBe(0);
  });

  it("countCharacters exclut les tags et newlines", () => {
    expect(countCharacters("[Tag]\nHello")).toBe(5);
  });

  it("countSections compte uniquement les tags [...]", () => {
    expect(countSections(sampleLyrics)).toBe(5);
    expect(countSections("No tags here")).toBe(0);
  });

  it("estimateDuration retourne un format mm:ss", () => {
    const result = estimateDuration(5);
    expect(result).toMatch(/^\d+:\d{2}$/);
  });

  it("estimateDuration adapte au BPM rapide", () => {
    const fast = estimateDuration(4, 160);
    const slow = estimateDuration(4, 60);
    // BPM rapide = sections plus courtes
    expect(fast.localeCompare(slow)).toBeLessThanOrEqual(0);
  });

  it("computeStats retourne toutes les métriques", () => {
    const stats = computeStats(sampleLyrics, 120);
    expect(stats.wordCount).toBeGreaterThan(20);
    expect(stats.characterCount).toBeGreaterThan(50);
    expect(stats.sectionCount).toBe(5);
    expect(stats.estimatedDuration).toMatch(/^\d+:\d{2}$/);
  });

  it("computeStats gère les lyrics vides", () => {
    const stats = computeStats("");
    expect(stats.wordCount).toBe(0);
    expect(stats.characterCount).toBe(0);
    expect(stats.sectionCount).toBe(0);
  });

  it("exclut les tags inline (...) du comptage de mots", () => {
    expect(countWords("(whispered)\nHello world")).toBe(2);
  });
});
