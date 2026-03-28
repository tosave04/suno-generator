"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { audioUrlSchema, deleteAudioSchema } from "@/lib/schemas/upload";

export type AudioUrlResult =
  | { success: true; audioUrl: string }
  | { success: false; error: string };

export type DeleteAudioResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Server Action — Associe un lien audio (Suno / YouTube) à une génération.
 */
export async function saveAudioUrl(input: {
  generationId: string;
  audioUrl: string;
}): Promise<AudioUrlResult> {
  const parsed = audioUrlSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues.map((i) => i.message).join(", "),
    };
  }

  try {
    const generation = await db.generation.findUnique({
      where: { id: parsed.data.generationId },
      select: { id: true },
    });

    if (!generation) {
      return { success: false, error: "Génération introuvable" };
    }

    await db.generation.update({
      where: { id: generation.id },
      data: { audioUrl: parsed.data.audioUrl },
    });

    revalidatePath("/(dashboard)");

    return { success: true, audioUrl: parsed.data.audioUrl };
  } catch (error) {
    console.error("[saveAudioUrl] Error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: `Erreur inattendue : ${message}` };
  }
}

/**
 * Server Action — Supprime le lien audio associé à une génération.
 */
export async function deleteAudio(
  input: { generationId: string }
): Promise<DeleteAudioResult> {
  const parsed = deleteAudioSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues.map((i) => i.message).join(", "),
    };
  }

  try {
    const generation = await db.generation.findUnique({
      where: { id: parsed.data.generationId },
      select: { id: true, audioUrl: true },
    });

    if (!generation) {
      return { success: false, error: "Génération introuvable" };
    }

    if (!generation.audioUrl) {
      return { success: false, error: "Aucun lien audio à supprimer" };
    }

    await db.generation.update({
      where: { id: generation.id },
      data: { audioUrl: null },
    });

    revalidatePath("/(dashboard)");

    return { success: true };
  } catch (error) {
    console.error("[deleteAudio] Error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: `Erreur inattendue : ${message}` };
  }
}
