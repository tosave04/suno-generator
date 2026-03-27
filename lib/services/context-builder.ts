/**
 * Context Builder — Assemble le contexte IA à partir des paramètres utilisateur
 * et du corpus de données musicales en dur.
 */

import { GENRES } from "@/lib/data/genres";
import { MOODS } from "@/lib/data/moods";
import { WRITING_STYLES } from "@/lib/data/styles";
import { SUNO_TAGS } from "@/lib/data/suno-tags";
import { MUSIC_RULES } from "@/lib/data/music-rules";
import { ATMOSPHERES } from "@/lib/data/atmospheres";
import type { CreateGenerationInput } from "@/lib/schemas/generation";

/** Construit le prompt système complet pour DeepSeek. */
export function buildSystemPrompt(params: CreateGenerationInput): string {
  const genreData = GENRES.find((g) => g.id === params.genre);
  const moodData = MOODS.find((m) => m.id === params.mood);
  const styleData = WRITING_STYLES.find((s) => s.id === params.style);
  const atmosphereData = params.atmosphere
    ? ATMOSPHERES.find((a) => a.id === params.atmosphere)
    : undefined;

  const sections: string[] = [];

  // --- Rôle ---
  sections.push(
    `You are an expert songwriter and music producer specializing in creating lyrics and prompts for Suno AI music generation (2026 format). You produce professional, creative, and emotionally resonant content.`
  );

  // --- Genre ---
  if (genreData) {
    sections.push(buildGenreContext(genreData));
  }

  // --- Mood ---
  if (moodData) {
    sections.push(buildMoodContext(moodData));
  }

  // --- Style d'écriture ---
  if (styleData) {
    sections.push(buildStyleContext(styleData));
  }

  // --- Tempo ---
  if (params.tempo) {
    sections.push(`TEMPO: Target tempo is "${params.tempo}". Adapt syllable density and rhythmic flow accordingly.`);
  }

  // --- Langue ---
  sections.push(buildLanguageContext(params.language));

  // --- Style vocal ---
  if (params.vocalStyle) {
    sections.push(`VOCAL STYLE: Write lyrics suited for a "${params.vocalStyle}" vocal delivery. Adapt phrasing, register, and breathing patterns accordingly.`);
  }

  // --- Ambiance culturelle ---
  if (atmosphereData) {
    sections.push(buildAtmosphereContext(atmosphereData));
  }

  // --- Tags Suno ---
  sections.push(buildSunoTagsContext());

  // --- Règles musicales ---
  sections.push(buildMusicRulesContext(params.genre));

  // --- Format de sortie ---
  sections.push(buildOutputFormat());

  return sections.join("\n\n");
}

function buildGenreContext(genre: (typeof GENRES)[number]): string {
  return [
    `GENRE: ${genre.name}`,
    `Description: ${genre.description}`,
    `Sub-genres available: ${genre.subGenres.join(", ")}`,
    `Typical BPM: ${genre.typicalBpm.min}-${genre.typicalBpm.max}`,
    `Typical structure: ${genre.typicalStructure.join(" → ")}`,
    `Key instruments: ${genre.keyInstruments.join(", ")}`,
    `Vocal characteristics: ${genre.vocalCharacteristics.join(", ")}`,
    `Historical context: ${genre.historicalContext}`,
    `Effective Suno tags: ${genre.sunoTags.join(", ")}`,
    `Prompt keywords to use: ${genre.promptKeywords.join(", ")}`,
    `Keywords to AVOID: ${genre.avoidKeywords.join(", ")}`,
  ].join("\n");
}

function buildMoodContext(mood: (typeof MOODS)[number]): string {
  return [
    `MOOD: ${mood.name}`,
    `Description: ${mood.description}`,
    `Lexical fields to draw from: ${mood.lexicalFields.join(", ")}`,
    `Musical characteristics: ${mood.musicalCharacteristics.join(", ")}`,
    `Prompt modifiers: ${mood.promptModifiers.join(", ")}`,
  ].join("\n");
}

function buildStyleContext(style: (typeof WRITING_STYLES)[number]): string {
  return [
    `WRITING STYLE: ${style.name}`,
    `Description: ${style.description}`,
    `Rules:\n${style.rules.map((r) => `- ${r}`).join("\n")}`,
    `Example patterns:\n${style.examples.map((e) => `  "${e}"`).join("\n")}`,
    `Suno formatting tips:\n${style.sunoFormatting.map((f) => `- ${f}`).join("\n")}`,
  ].join("\n");
}

function buildAtmosphereContext(atmosphere: (typeof ATMOSPHERES)[number]): string {
  return [
    `CULTURAL ATMOSPHERE: ${atmosphere.name}`,
    `Description: ${atmosphere.description}`,
    `Scales/modes to incorporate: ${atmosphere.scales.join(", ")}`,
    `Characteristic instruments: ${atmosphere.keyInstruments.join(", ")}`,
    `Sonic characteristics: ${atmosphere.characteristics.join(", ")}`,
    `Prompt keywords to weave in: ${atmosphere.promptKeywords.join(", ")}`,
    `Keywords to AVOID: ${atmosphere.avoidKeywords.join(", ")}`,
    `IMPORTANT: Blend this cultural atmosphere into the genre and mood. Include atmosphere-specific instruments and scales in the positivePrompt. The cultural color should enhance, not override, the chosen genre.`,
  ].join("\n");
}

function buildLanguageContext(language: string): string {
  const LANGUAGE_MAP: Record<string, string> = {
    en: "English",
    fr: "French",
    es: "Spanish",
    pt: "Portuguese",
    ja: "Japanese",
    ko: "Korean",
    de: "German",
    it: "Italian",
    ru: "Russian",
    hi: "Hindi",
    ar: "Arabic",
    zh: "Chinese",
  };
  const langName = LANGUAGE_MAP[language] ?? "English";
  return `LANGUAGE: Write all lyrics in ${langName}. The positive and negative prompts MUST always be in English (Suno requirement).`;
}

function buildSunoTagsContext(): string {
  const structureTags = SUNO_TAGS.filter((t) => t.category === "structure");
  const deliveryTags = SUNO_TAGS.filter(
    (t) => t.category === "delivery"
  );

  return [
    "SUNO TAGS REFERENCE:",
    "Structure tags (use these to organize lyrics):",
    ...structureTags.map((t) => `  ${t.tag} — ${t.usage}`),
    "Delivery/vocal tags (use inline where needed):",
    ...deliveryTags.map((t) => `  ${t.tag} — ${t.usage}`),
  ].join("\n");
}

function buildMusicRulesContext(genreId: string): string {
  const applicableRules = MUSIC_RULES.filter(
    (r) => r.applicableGenres === "all" || r.applicableGenres.includes(genreId)
  );
  const topRules = applicableRules.slice(0, 10);

  return [
    "MUSIC THEORY RULES TO FOLLOW:",
    ...topRules.map((r) => `- [${r.category}] ${r.title}: ${r.description}`),
  ].join("\n");
}

function buildOutputFormat(): string {
  return `OUTPUT FORMAT:
You MUST respond with ONLY a valid JSON object, no markdown, no explanation, no text before or after.
The JSON must have this exact structure:
{
  "title": "Creative, original song title that reflects the lyrics theme and musical style",
  "lyrics": "Full lyrics with Suno tags ([Verse 1], [Chorus], etc.), newlines as \\n",
  "positivePrompt": "Concise Suno 'Style of Music' descriptor. Comma-separated: genre, sub-genre, mood, vocal type, tempo/BPM, key/scale, instruments, production style, era/influences. Always in English. Max 200 chars.",
  "negativePrompt": "Suno 'Exclude from Song' field. EVERY element MUST be prefixed with 'no'. Example: 'no autotune, no screaming, no heavy bass'. Always in English. Max 120 chars. null if not needed.",
  "sunoSettings": {
    "vocalGender": "Male or Female — pick the best fit for the song",
    "weirdness": 30,
    "styleInfluence": 70
  }
}

FIELD RULES:
- title: Original, evocative, representative of the lyrics and mood. Not generic.
- lyrics: Use proper Suno tags for EVERY section. Target 200-300 words (Suno 2-4 min).
- positivePrompt: This goes into Suno's "Style of Music" field. Include BPM, key, instruments, vocal style, production quality — all as concise comma-separated descriptors. Do NOT repeat the genre if already obvious.
- negativePrompt: This goes into Suno's "Exclude from Song" field. EVERY single element MUST start with "no" (e.g., "no autotune, no screaming"). Never omit the "no" prefix.
- sunoSettings.vocalGender: "Male" or "Female" based on the vocalStyle or best match for the genre/mood.
- sunoSettings.weirdness: 0-100. Low (0-20) = conventional/safe. Medium (30-50) = balanced creativity. High (60-100) = experimental/avant-garde. Choose based on genre and mood.
- sunoSettings.styleInfluence: 0-100. Low (0-30) = loose interpretation. Medium (40-70) = balanced. High (80-100) = strictly follows style description. Higher for specific genres, lower for experimental.

SUNO BEST PRACTICES:
- Keep positivePrompt descriptive but concise — Suno works best with focused style descriptions
- Use specific musical terms: "fingerpicked acoustic guitar" > "guitar"
- Include production descriptors: "lo-fi", "polished", "raw", "studio quality"
- Negative prompt works best with clear, specific exclusions
- Weirdness >60 can produce unexpected results — use for experimental genres (ambient, avant-garde)
- Style Influence >80 gives more predictable results — good for traditional genres

Do NOT include any text outside the JSON object`;
}
