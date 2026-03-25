"use server";

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
  wordCount: number;
  characterCount: number;
  sectionCount: number;
  estimatedDuration: string;
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
    // 2. Construction du contexte IA
    const systemPrompt = buildSystemPrompt(params);

    // 3. Appel DeepSeek
    const response = await callDeepSeek(systemPrompt, params.userPrompt);

    // 4. Calcul des statistiques
    const stats = computeStats(response.lyrics);

    // 5. Sérialisation sunoSettings
    const serializedSettings = JSON.stringify(response.sunoSettings);

    // 6. Sauvegarde en BDD
    const generation = await db.generation.create({
      data: {
        title: response.title,
        userPrompt: params.userPrompt,
        genre: params.genre,
        subGenre: params.subGenre ?? null,
        mood: params.mood,
        style: params.style,
        tempo: params.tempo ?? null,
        language: params.language,
        vocalStyle: response.sunoSettings.vocalGender,
        songStructure: params.songStructure ?? null,
        lyrics: response.lyrics,
        positivePrompt: response.positivePrompt,
        negativePrompt: response.negativePrompt ?? null,
        advancedSettings: serializedSettings,
        wordCount: stats.wordCount,
        characterCount: stats.characterCount,
        sectionCount: stats.sectionCount,
        estimatedDuration: stats.estimatedDuration,
        detectedLanguage: params.language,
      },
    });

    // 7. Revalidation
    revalidatePath("/(dashboard)");

    // 8. Réponse au client
    return {
      success: true,
      generation: {
        id: generation.id,
        title: response.title,
        lyrics: generation.lyrics,
        positivePrompt: generation.positivePrompt,
        negativePrompt: generation.negativePrompt,
        sunoSettings: response.sunoSettings,
        wordCount: stats.wordCount,
        characterCount: stats.characterCount,
        sectionCount: stats.sectionCount,
        estimatedDuration: stats.estimatedDuration,
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
