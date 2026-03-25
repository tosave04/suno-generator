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
  genre: z.string().min(1, "Le genre est requis"),
  subGenre: z.string().optional(),
  mood: z.string().min(1, "Le mood est requis"),
  style: z.string().min(1, "Le style d'écriture est requis"),
  tempo: z.string().optional(),
  language: z.string().default("en"),
  vocalStyle: z.string().optional(),
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
 * - sunoSettings → "More Options" (Vocal Gender, Weirdness 0-100, Style Influence 0-100)
 * - title → "Song Title"
 */
export const generationResponseSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  lyrics: z.string().min(1, "Les lyrics ne peuvent pas être vides"),
  positivePrompt: z.string().min(1, "Le prompt positif est requis"),
  negativePrompt: z.string().nullable(),
  sunoSettings: z.object({
    vocalGender: z.enum(["Male", "Female"]),
    weirdness: z.number().min(0).max(100),
    styleInfluence: z.number().min(0).max(100),
  }),
});

export type GenerationResponse = z.infer<typeof generationResponseSchema>;
