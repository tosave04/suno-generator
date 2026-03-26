"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import {
  uploadAudioSchema,
  deleteAudioSchema,
  MAX_FILE_SIZE,
  ACCEPTED_AUDIO_FORMATS,
} from "@/lib/schemas/upload";

export type UploadActionResult =
  | { success: true; audioFile: string; audioFormat: string }
  | { success: false; error: string };

export type DeleteAudioResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Server Action — Upload un fichier audio et l'associe à une génération.
 * Flux : Validation FormData → Validation Zod → Écriture fichier → MAJ BDD → Revalidate
 */
export async function uploadAudio(formData: FormData): Promise<UploadActionResult> {
  const file = formData.get("file");
  const generationId = formData.get("generationId");

  if (!(file instanceof File)) {
    return { success: false, error: "Aucun fichier fourni" };
  }

  if (typeof generationId !== "string") {
    return { success: false, error: "Identifiant de génération manquant" };
  }

  // 1. Validation Zod des métadonnées
  const parsed = uploadAudioSchema.safeParse({
    generationId,
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues.map((i) => i.message).join(", "),
    };
  }

  // Double vérification taille (défense en profondeur)
  if (file.size > MAX_FILE_SIZE) {
    return { success: false, error: "Le fichier ne doit pas dépasser 20 Mo" };
  }

  // Double vérification type MIME
  if (!(ACCEPTED_AUDIO_FORMATS as readonly string[]).includes(file.type)) {
    return { success: false, error: "Format audio non supporté" };
  }

  try {
    // 2. Vérifier que la génération existe
    const generation = await db.generation.findUnique({
      where: { id: parsed.data.generationId },
      select: { id: true, audioFile: true },
    });

    if (!generation) {
      return { success: false, error: "Génération introuvable" };
    }

    // 3. Supprimer l'ancien fichier audio si existant
    if (generation.audioFile) {
      await deleteFileFromDisk(generation.audioFile);
    }

    // 4. Déterminer le format et le nom de fichier sécurisé
    const extension = file.name.toLowerCase().endsWith(".wav") ? "wav" : "mp3";
    const safeFileName = `${generation.id}.${extension}`;
    const relativePath = `uploads/${safeFileName}`;

    // 5. Écriture du fichier sur disque
    const { writeFile, mkdir } = await import("fs/promises");
    const path = await import("path");
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    const fullPath = path.join(uploadDir, safeFileName);
    await writeFile(fullPath, buffer);

    // 6. Mise à jour BDD
    await db.generation.update({
      where: { id: generation.id },
      data: {
        audioFile: relativePath,
        audioFormat: extension,
      },
    });

    // 7. Revalidation
    revalidatePath("/(dashboard)");

    return {
      success: true,
      audioFile: relativePath,
      audioFormat: extension,
    };
  } catch (error) {
    console.error("[uploadAudio] Error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: `Erreur inattendue : ${message}` };
  }
}

/**
 * Server Action — Supprime le fichier audio associé à une génération.
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
      select: { id: true, audioFile: true },
    });

    if (!generation) {
      return { success: false, error: "Génération introuvable" };
    }

    if (!generation.audioFile) {
      return { success: false, error: "Aucun fichier audio à supprimer" };
    }

    // Suppression du fichier disque
    await deleteFileFromDisk(generation.audioFile);

    // MAJ BDD
    await db.generation.update({
      where: { id: generation.id },
      data: {
        audioFile: null,
        audioFormat: null,
      },
    });

    revalidatePath("/(dashboard)");

    return { success: true };
  } catch (error) {
    console.error("[deleteAudio] Error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: `Erreur inattendue : ${message}` };
  }
}

/** Supprime un fichier du disque sans erreur si le fichier n'existe pas. */
async function deleteFileFromDisk(relativePath: string): Promise<void> {
  const { unlink } = await import("fs/promises");
  const path = await import("path");
  const fullPath = path.join(process.cwd(), "public", relativePath);
  try {
    await unlink(fullPath);
  } catch {
    // Fichier déjà supprimé ou introuvable
  }
}
