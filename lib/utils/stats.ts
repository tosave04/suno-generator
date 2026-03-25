/**
 * Calcul automatique des statistiques d'une génération.
 * Appelé après chaque génération IA avant sauvegarde en BDD.
 */

const TAG_REGEX = /^\[.+\]$/;
const INLINE_TAG_REGEX = /^\(.+\)$/;

/** Supprime les tags Suno pour ne garder que le texte pur des lyrics. */
function stripTags(lyrics: string): string {
  return lyrics
    .split("\n")
    .filter((line) => !TAG_REGEX.test(line.trim()) && !INLINE_TAG_REGEX.test(line.trim()))
    .join("\n");
}

/** Compte le nombre de mots dans les lyrics (hors tags). */
export function countWords(lyrics: string): number {
  const text = stripTags(lyrics).trim();
  if (!text) return 0;
  return text.split(/\s+/).length;
}

/** Compte le nombre de caractères dans les lyrics (hors tags). */
export function countCharacters(lyrics: string): number {
  return stripTags(lyrics).replace(/\n/g, "").length;
}

/** Compte le nombre de sections (tags `[...]`) dans les lyrics. */
export function countSections(lyrics: string): number {
  return lyrics.split("\n").filter((line) => TAG_REGEX.test(line.trim())).length;
}

/**
 * Estime la durée en fonction du BPM et du nombre de sections.
 * Heuristique : ~20s par section instrumentale, ~25s par section vocale.
 */
export function estimateDuration(sectionCount: number, bpm?: number): string {
  const avgSecondsPerSection = bpm && bpm > 140 ? 18 : bpm && bpm < 80 ? 30 : 24;
  const totalSeconds = sectionCount * avgSecondsPerSection;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/** Calcule toutes les stats d'une génération. */
export function computeStats(lyrics: string, bpm?: number) {
  const wordCount = countWords(lyrics);
  const characterCount = countCharacters(lyrics);
  const sectionCount = countSections(lyrics);
  const estimatedDuration = estimateDuration(sectionCount, bpm);

  return { wordCount, characterCount, sectionCount, estimatedDuration };
}
