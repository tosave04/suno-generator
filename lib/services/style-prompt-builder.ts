/**
 * Style Prompt Builder
 *
 * Construit le system prompt destiné au LLM pour produire les réglages Suno
 * (Style of Music, Exclude from Song, Vocal Gender, Weirdness, Style Influence)
 * à partir d'un simple nom d'artiste ou de morceau connu.
 *
 * La référence complète (genres, moods, styles, tags Suno, règles musicales,
 * algorithme de calcul des réglages, etc.) est lue intégralement depuis
 * `llms-full.txt` à la racine du projet. Aucun extrait n'est tronqué.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

let cachedReference: string | null = null;

function loadReference(): string {
  if (cachedReference !== null) return cachedReference;
  const path = join(process.cwd(), "llms-full.txt");
  cachedReference = readFileSync(path, "utf-8");
  return cachedReference;
}

const ROLE = `You are a senior music analyst and Suno AI prompt engineer (2026 format).
Given a single artist name OR a single famous song title (possibly with artist),
you must derive the Suno "Custom Mode" settings that would best recreate that
sound: the "Style of Music" prompt, the "Exclude from Song" prompt, and the
"More Options" controls (Vocal Gender, Weirdness, Style Influence).

You DO NOT write lyrics. You DO NOT invent a title. You only output the
settings, in strict JSON, using the reference corpus below as your single
source of truth for genres, moods, vocal styles, Suno tags, music rules,
and the algorithm for computing Weirdness and Style Influence.`;

const TASK_INSTRUCTIONS = `TASK:
1. Identify the reference (artist or song). If it is ambiguous, pick the most
   widely recognized interpretation. If the reference is unknown to you, make
   an honest best-guess from the name and clearly mention this in "rationale".
2. Determine the PRIMARY genre id from SECTION 5.1 of the reference corpus
   (use the exact id string, lowercase, e.g. "pop", "rock", "hiphop", ...).
3. Determine the dominant MOOD id from SECTION 5.2 if applicable, else null.
4. Decide the Vocal Gender ("Male" or "Female") that matches the typical
   lead vocal of that artist/song. If mixed or instrumental, default to "Male".
5. Compute Weirdness (0-100) and Style Influence (0-100) by applying the
   algorithm described in SECTION 3 of the reference corpus:
     - Start from the genre base values.
     - Apply the mood modifiers.
     - Apply the writing-style modifiers (pick the writing style id from
       SECTION 5.3 that best fits the artistic identity of the reference).
     - Add a small random-feeling variance in [-9, +9].
     - Clamp to [0, 100] and round to the nearest integer.
   Both values MUST be integers.
6. Build the positivePrompt ("Style of Music") following the STRICT priority
   order documented in SECTION 4 (genre+subgenre, vocal type, mood,
   instruments, BPM, production). Use the precise musical vocabulary from
   SECTION 5 (keyInstruments, vocalCharacteristics, sunoTags, promptKeywords).
   ALWAYS include an explicit BPM value drawn from the genre's typicalBpm.
   NEVER reference artist names verbatim — describe the style instead
   ("e.g. 90s alternative rock style" rather than the actual name).
7. Build the negativePrompt ("Exclude from Song"). Every item MUST start with
   "no " (e.g. "no autotune, no trap beat"). MAX 5 items. Use avoidKeywords
   from the chosen genre as a starting point.
8. Write a SHORT rationale (1-3 sentences, <= 800 chars) explaining the
   genre/mood/settings choices. No marketing fluff.`;

const OUTPUT_FORMAT = `OUTPUT FORMAT:
You MUST respond with ONLY a valid JSON object — no markdown, no code fences,
no explanation before or after.
The JSON must have EXACTLY this structure and field names:

{
  "detectedGenre": "<genre id from SECTION 5.1>",
  "detectedMood": "<mood id from SECTION 5.2 or null>",
  "rationale": "<short explanation of the choices>",
  "positivePrompt": "<Suno 'Style of Music' string>",
  "negativePrompt": "<Suno 'Exclude from Song' string, or null>",
  "sunoSettings": {
    "vocalGender": "Male" | "Female",
    "weirdness": <integer 0-100>,
    "styleInfluence": <integer 0-100>
  }
}

Rules:
- vocalGender MUST be exactly "Male" or "Female".
- weirdness and styleInfluence MUST be integers in [0, 100].
- negativePrompt items MUST each start with "no " (max 5 items, comma-separated).
- Do NOT include lyrics, title, systemPrompt, or any other field.
- Do NOT wrap the JSON in markdown.`;

/**
 * Construit le system prompt complet pour la génération de réglages Suno
 * à partir d'une référence musicale (artiste ou morceau).
 */
export function buildStyleSystemPrompt(): string {
  const reference = loadReference();
  return [
    ROLE,
    "REFERENCE CORPUS (authoritative — do not truncate, do not paraphrase):",
    "----- BEGIN llms-full.txt -----",
    reference,
    "----- END llms-full.txt -----",
    TASK_INSTRUCTIONS,
    OUTPUT_FORMAT,
  ].join("\n\n");
}

/**
 * Construit le message utilisateur transmis au LLM.
 */
export function buildStyleUserMessage(reference: string): string {
  return `Reference (artist name or famous song title): "${reference.trim()}"

Derive the Suno settings exactly as instructed. Respond with the JSON object only.`;
}
