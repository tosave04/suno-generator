"use server";

import {
  createStyleSchema,
  styleResponseSchema,
  type CreateStyleInput,
  type StyleResponse,
} from "@/lib/schemas/style";
import {
  buildStyleSystemPrompt,
  buildStyleUserMessage,
} from "@/lib/services/style-prompt-builder";
import { callDeepSeekStructured, DeepSeekError } from "@/lib/services/deepseek";

export type StyleActionResult =
  | { success: true; data: StyleResponse }
  | { success: false; error: string };

/**
 * Server Action — Dérive les réglages Suno (Style of Music, Exclude from Song,
 * More Options) à partir d'un nom d'artiste ou d'un titre de morceau connu.
 * Pas de persistance BDD : la sortie est purement informative.
 */
export async function createStyleSettings(
  input: CreateStyleInput
): Promise<StyleActionResult> {
  const parsed = createStyleSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues.map((i) => i.message).join(", "),
    };
  }

  try {
    const systemPrompt = buildStyleSystemPrompt();
    const userMessage = buildStyleUserMessage(parsed.data.reference);

    const data = await callDeepSeekStructured(
      systemPrompt,
      userMessage,
      styleResponseSchema
    );

    return { success: true, data };
  } catch (error) {
    console.error("[createStyleSettings] Error:", error);
    if (error instanceof DeepSeekError) {
      return {
        success: false,
        error: `Erreur de génération IA : ${error.message}`,
      };
    }
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: `Erreur inattendue : ${message}` };
  }
}
