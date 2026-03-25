/**
 * Client API DeepSeek — Envoie le contexte enrichi et la demande utilisateur
 * à l'API DeepSeek pour générer lyrics et prompts.
 */

import {
  generationResponseSchema,
  type GenerationResponse,
} from "@/lib/schemas/generation";

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";

interface DeepSeekMessage {
  role: "system" | "user";
  content: string;
}

interface DeepSeekChoice {
  message: { content: string; reasoning_content?: string };
}

interface DeepSeekApiResponse {
  choices: DeepSeekChoice[];
}

/** Erreur typée pour les appels DeepSeek. */
export class DeepSeekError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number
  ) {
    super(message);
    this.name = "DeepSeekError";
  }
}

function getConfig() {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new DeepSeekError("DEEPSEEK_API_KEY is not configured");
  }
  return {
    apiKey,
    model: process.env.DEEPSEEK_MODEL ?? "deepseek-chat",
  };
}

/**
 * Appelle l'API DeepSeek et retourne la réponse parsée.
 * Gère automatiquement les différences entre deepseek-chat et deepseek-reasoner.
 */
export async function callDeepSeek(
  systemPrompt: string,
  userMessage: string
): Promise<GenerationResponse> {
  const { apiKey, model } = getConfig();
  const isReasoner = model.includes("reasoner");

  // deepseek-reasoner ne supporte pas le rôle system ni temperature
  const messages: DeepSeekMessage[] = isReasoner
    ? [{ role: "user", content: `${systemPrompt}\n\n---\n\nUser request:\n${userMessage}` }]
    : [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ];

  const body: Record<string, unknown> = {
    model,
    messages,
    max_tokens: 4096,
  };

  // deepseek-reasoner ne supporte pas temperature
  if (!isReasoner) {
    body.temperature = 0.8;
  }

  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new DeepSeekError(
      `DeepSeek API error: ${response.status} — ${errorText}`,
      response.status
    );
  }

  const data = (await response.json()) as DeepSeekApiResponse;

  // deepseek-reasoner peut mettre le contenu dans reasoning_content ou content
  const choice = data.choices?.[0]?.message;
  const rawContent = choice?.content || choice?.reasoning_content;
  if (!rawContent) {
    throw new DeepSeekError("DeepSeek returned an empty response");
  }

  return parseResponse(rawContent);
}

/**
 * Parse la réponse brute de DeepSeek en objet typé.
 * Gère les cas où le modèle entoure le JSON de markdown.
 */
function parseResponse(raw: string): GenerationResponse {
  // Nettoyer le markdown éventuel (```json ... ```)
  let cleaned = raw.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new DeepSeekError(
      `Failed to parse DeepSeek response as JSON: ${cleaned.slice(0, 200)}`
    );
  }

  const result = generationResponseSchema.safeParse(parsed);
  if (!result.success) {
    throw new DeepSeekError(
      `Invalid response structure: ${result.error.issues.map((i) => i.message).join(", ")}`
    );
  }

  return result.data;
}
