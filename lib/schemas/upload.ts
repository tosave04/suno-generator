import { z } from "zod";

/** Préfixes d'URL acceptés pour le lien audio. */
export const ACCEPTED_URL_PREFIXES = [
  "https://suno.com/s/",
  "https://www.youtube.com/watch?v=",
  "https://youtu.be/",
] as const;

/** Vérifie qu'une URL audio est valide. */
function isValidAudioUrl(url: string): boolean {
  return ACCEPTED_URL_PREFIXES.some((prefix) => url.startsWith(prefix));
}

/**
 * Schéma de validation pour l'ajout d'un lien audio.
 */
export const audioUrlSchema = z.object({
  generationId: z.string().min(1, "L'identifiant de la génération est requis"),
  audioUrl: z
    .string()
    .min(1, "Le lien est requis")
    .refine(isValidAudioUrl, "Lien incorrect — Seuls les liens Suno ou YouTube sont acceptés"),
});

export type AudioUrlInput = z.infer<typeof audioUrlSchema>;

/** Schéma de validation pour la suppression d'un lien audio. */
export const deleteAudioSchema = z.object({
  generationId: z.string().min(1, "L'identifiant de la génération est requis"),
});

export type DeleteAudioInput = z.infer<typeof deleteAudioSchema>;
