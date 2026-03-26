"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

const toggleFavoriteSchema = z.object({
  id: z.string().min(1, "L'identifiant est requis"),
});

export type FavoriteActionResult =
  | { success: true; isFavorite: boolean }
  | { success: false; error: string };

/**
 * Server Action — Toggle le statut favori d'une génération.
 */
export async function toggleFavorite(
  input: z.infer<typeof toggleFavoriteSchema>
): Promise<FavoriteActionResult> {
  const parsed = toggleFavoriteSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues.map((i) => i.message).join(", "),
    };
  }

  try {
    const generation = await db.generation.findUnique({
      where: { id: parsed.data.id },
      select: { isFavorite: true },
    });

    if (!generation) {
      return { success: false, error: "Génération introuvable" };
    }

    const updated = await db.generation.update({
      where: { id: parsed.data.id },
      data: { isFavorite: !generation.isFavorite },
      select: { isFavorite: true },
    });

    revalidatePath("/(dashboard)");

    return { success: true, isFavorite: updated.isFavorite };
  } catch (error) {
    console.error("[toggleFavorite] Error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: `Erreur inattendue : ${message}` };
  }
}
