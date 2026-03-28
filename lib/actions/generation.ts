"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { createGenerationSchema, type CreateGenerationInput } from "@/lib/schemas/generation";
import { buildSystemPrompt } from "@/lib/services/context-builder";
import { callDeepSeek, DeepSeekError } from "@/lib/services/deepseek";
import { computeStats } from "@/lib/utils/stats";

/** Résultat typé de la Server Action. */
export type GenerationActionResult =
  | { success: true; generation: GenerationData }
  | { success: false; error: string };

/** Réglages Suno "More Options". */
export interface SunoSettings {
  vocalGender: "Male" | "Female";
  weirdness: number;
  styleInfluence: number;
}

/** Données renvoyées au client après génération. */
export interface GenerationData {
  id: string;
  title: string;
  lyrics: string;
  positivePrompt: string;
  negativePrompt: string | null;
  sunoSettings: SunoSettings;
  systemPrompt: string | null;
  audioUrl: string | null;
  wordCount: number;
  characterCount: number;
  sectionCount: number;
  estimatedDuration: string;
  // Paramètres de composition (pour restaurer le formulaire)
  genre: string;
  mood: string | null;
  style: string;
  tempo: string | null;
  language: string;
  vocalStyle: string | null;
  songLength: string | null;
  atmosphere: string | null;
  userPrompt: string;
}

/**
 * Server Action — Génère des lyrics et prompts Suno via DeepSeek.
 * Flux : Validation → Context Builder → DeepSeek API → Stats → BDD → Revalidate
 */
export async function createGeneration(
  input: CreateGenerationInput
): Promise<GenerationActionResult> {
  // 1. Validation Zod
  const parsed = createGenerationSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues.map((i) => i.message).join(", "),
    };
  }
  const params = parsed.data;

  try {
    // 2. Construction du contexte IA + calcul des réglages
    const { systemPrompt, calculatedSettings } = buildSystemPrompt(params);

    // 3. Appel DeepSeek
    const response = await callDeepSeek(systemPrompt, params.userPrompt);

    // 4. Assemblage des sunoSettings (vocalGender de DeepSeek + valeurs calculées)
    const sunoSettings: SunoSettings = {
      vocalGender: response.sunoSettings.vocalGender,
      weirdness: calculatedSettings.weirdness,
      styleInfluence: calculatedSettings.styleInfluence,
    };

    // 5. Calcul des statistiques
    const stats = computeStats(response.lyrics);

    // 6. Sérialisation sunoSettings
    const serializedSettings = JSON.stringify(sunoSettings);

    // 7. Sauvegarde en BDD
    const generation = await db.generation.create({
      data: {
        title: response.title,
        userPrompt: params.userPrompt,
        genre: params.genres.join(","),
        subGenre: params.subGenre ?? null,
        mood: params.mood ?? null,
        style: params.style,
        tempo: params.tempo ?? null,
        language: params.languages.join(","),
        vocalStyle: params.vocalStyle ?? null,
        songStructure: params.songStructure ?? null,
        songLength: params.songLength,
        atmosphere: params.atmosphere ?? null,
        lyrics: response.lyrics,
        positivePrompt: response.positivePrompt,
        negativePrompt: response.negativePrompt ?? null,
        advancedSettings: serializedSettings,
        systemPrompt,
        wordCount: stats.wordCount,
        characterCount: stats.characterCount,
        sectionCount: stats.sectionCount,
        estimatedDuration: stats.estimatedDuration,
        detectedLanguage: params.languages[0],
      },
    });

    // 8. Revalidation
    revalidatePath("/(dashboard)");

    // 9. Réponse au client
    return {
      success: true,
      generation: {
        id: generation.id,
        title: response.title,
        lyrics: generation.lyrics,
        positivePrompt: generation.positivePrompt,
        negativePrompt: generation.negativePrompt,
        sunoSettings,
        systemPrompt,
        audioUrl: null,
        wordCount: stats.wordCount,
        characterCount: stats.characterCount,
        sectionCount: stats.sectionCount,
        estimatedDuration: stats.estimatedDuration,
        genre: params.genres.join(","),
        mood: params.mood ?? null,
        style: params.style,
        tempo: params.tempo ?? null,
        language: params.languages.join(","),
        vocalStyle: params.vocalStyle ?? null,
        songLength: params.songLength ?? null,
        atmosphere: params.atmosphere ?? null,
        userPrompt: params.userPrompt,
      },
    };
  } catch (error) {
    console.error("[createGeneration] Error:", error);
    if (error instanceof DeepSeekError) {
      return {
        success: false,
        error: `Erreur de génération IA : ${error.message}`,
      };
    }
    const message = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: `Erreur inattendue : ${message}`,
    };
  }
}

/** Données minimales d'une génération pour la sidebar. */
export interface GenerationSummary {
  id: string;
  title: string | null;
  userPrompt: string;
  genre: string;
  mood: string | null;
  isFavorite: boolean;
  audioUrl: string | null;
  createdAt: Date;
}

/** Filtres pour la liste des générations. */
export interface GenerationFilters {
  search?: string;
  genre?: string;
  favoritesOnly?: boolean;
  withAudio?: boolean;
  sortOrder?: "recent" | "oldest";
}

/**
 * Server Action — Récupère la liste des générations avec filtres.
 */
export async function getGenerations(
  filters: GenerationFilters = {}
): Promise<GenerationSummary[]> {
  const where: Record<string, unknown> = {};

  if (filters.favoritesOnly) {
    where.isFavorite = true;
  }

  if (filters.genre) {
    // Match exact du genre dans un champ comma-separated (max 2 genres)
    where.AND = [
      {
        OR: [
          { genre: filters.genre },
          { genre: { startsWith: `${filters.genre},` } },
          { genre: { endsWith: `,${filters.genre}` } },
        ],
      },
    ];
  }

  if (filters.withAudio) {
    where.audioUrl = { not: null };
  }

  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search } },
      { userPrompt: { contains: filters.search } },
    ];
  }

  return db.generation.findMany({
    where,
    select: {
      id: true,
      title: true,
      userPrompt: true,
      genre: true,
      mood: true,
      isFavorite: true,
      audioUrl: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: filters.sortOrder === "oldest" ? "asc" : "desc",
    },
  });
}

const deleteGenerationSchema = z.object({
  id: z.string().min(1, "L'identifiant est requis"),
});

export type DeleteActionResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Server Action — Supprime une génération.
 */
export async function deleteGeneration(
  input: z.infer<typeof deleteGenerationSchema>
): Promise<DeleteActionResult> {
  const parsed = deleteGenerationSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues.map((i) => i.message).join(", "),
    };
  }

  try {
    const generation = await db.generation.findUnique({
      where: { id: parsed.data.id },
      select: { id: true },
    });

    if (!generation) {
      return { success: false, error: "Génération introuvable" };
    }

    await db.generation.delete({ where: { id: parsed.data.id } });

    revalidatePath("/(dashboard)");

    return { success: true };
  } catch (error) {
    console.error("[deleteGeneration] Error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: `Erreur inattendue : ${message}` };
  }
}

/**
 * Server Action — Récupère une génération complète par son ID.
 */
export async function getGenerationById(
  id: string
): Promise<GenerationData | null> {
  const generation = await db.generation.findUnique({
    where: { id },
  });

  if (!generation) return null;

  const sunoSettings: SunoSettings = generation.advancedSettings
    ? JSON.parse(generation.advancedSettings)
    : { vocalGender: "Male", weirdness: 50, styleInfluence: 50 };

  return {
    id: generation.id,
    title: generation.title ?? "Sans titre",
    lyrics: generation.lyrics,
    positivePrompt: generation.positivePrompt,
    negativePrompt: generation.negativePrompt,
    sunoSettings,
    systemPrompt: generation.systemPrompt ?? null,
    audioUrl: generation.audioUrl ?? null,
    wordCount: generation.wordCount ?? 0,
    characterCount: generation.characterCount ?? 0,
    sectionCount: generation.sectionCount ?? 0,
    estimatedDuration: generation.estimatedDuration ?? "—",
    genre: generation.genre,
    mood: generation.mood ?? null,
    style: generation.style,
    tempo: generation.tempo ?? null,
    language: generation.language,
    vocalStyle: generation.vocalStyle ?? null,
    songLength: generation.songLength ?? null,
    atmosphere: generation.atmosphere ?? null,
    userPrompt: generation.userPrompt,
  };
}
