import { z } from "zod";

/**
 * Schéma Zod pour la création d'une génération musicale.
 * Valide les paramètres utilisateur avant envoi au Context Builder.
 */
export const createGenerationSchema = z.object({
  userPrompt: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(2000, "La description ne doit pas dépasser 2000 caractères"),
  genres: z
    .array(z.string().min(1))
    .min(1, "Au moins un genre est requis")
    .max(2, "Maximum 2 genres"),
  subGenre: z.string().optional(),
  mood: z.string().optional(),
  style: z.string().min(1, "Le style d'écriture est requis"),
  tempo: z.string().optional(),
  languages: z
    .array(z.string().min(1))
    .min(1, "Au moins une langue est requise")
    .max(2, "Maximum 2 langues"),
  vocalStyle: z.string().optional(),
  atmosphere: z.string().optional(),
  songLength: z.enum(["short", "radio", "standard", "long"]).default("standard"),
  songStructure: z.string().optional(),
  title: z.string().max(100, "Le titre ne doit pas dépasser 100 caractères").optional(),
});

export type CreateGenerationInput = z.infer<typeof createGenerationSchema>;

/**
 * Schéma de la réponse structurée attendue de DeepSeek.
 *
 * Aligné sur l'interface Suno Custom Mode :
 * - positivePrompt → champ "Style of Music" (genre, instruments, mood, tempo, tonalité, production, vocal)
 * - negativePrompt → champ "Exclude from Song" (chaque élément préfixé par "no")
 * - sunoSettings → "More Options" (Vocal Gender uniquement, weirdness/styleInfluence sont pré-calculés)
 * - title → "Song Title"
 */
export const generationResponseSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  lyrics: z.string().min(1, "Les lyrics ne peuvent pas être vides"),
  positivePrompt: z.string().min(1, "Le prompt positif est requis"),
  negativePrompt: z.string().nullable(),
  sunoSettings: z.object({
    vocalGender: z.enum(["Male", "Female"]).catch("Male"),
    weirdness: z.number().min(0).max(100).optional(),
    styleInfluence: z.number().min(0).max(100).optional(),
  }),
});

export type GenerationResponse = z.infer<typeof generationResponseSchema>;
