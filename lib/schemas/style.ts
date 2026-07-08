import { z } from "zod";

/**
 * Schéma Zod — Entrée pour la génération de réglages Suno à partir
 * d'un nom de morceau connu ou d'un nom d'artiste.
 */
export const createStyleSchema = z.object({
  reference: z
    .string()
    .min(2, "Indique au moins 2 caractères (artiste ou titre)")
    .max(200, "200 caractères maximum"),
});

export type CreateStyleInput = z.infer<typeof createStyleSchema>;

/**
 * Schéma Zod — Réponse structurée attendue du LLM.
 *
 * Strictement aligné sur l'interface Suno "Custom Mode" :
 *   - positivePrompt → "Style of Music"
 *   - negativePrompt → "Exclude from Song"
 *   - sunoSettings   → "More Options" (Vocal Gender + Weirdness + Style Influence)
 *
 * Pas de lyrics, pas de titre : on ne dérive QUE les réglages.
 */
export const styleResponseSchema = z.object({
  detectedGenre: z.string().min(1, "Le genre détecté est requis"),
  detectedMood: z.string().nullable(),
  rationale: z
    .string()
    .min(1, "Une courte explication des choix est requise")
    .max(800, "Explication trop longue (800 caractères max)"),
  positivePrompt: z.string().min(1, "Le prompt positif est requis"),
  negativePrompt: z.string().nullable(),
  sunoSettings: z.object({
    vocalGender: z.enum(["Male", "Female"]).catch("Male"),
    weirdness: z.number().int().min(0).max(100),
    styleInfluence: z.number().int().min(0).max(100),
  }),
});

export type StyleResponse = z.infer<typeof styleResponseSchema>;
