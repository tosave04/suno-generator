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
import { calculateSunoSettings, type CalculatedSettings } from "@/lib/services/settings-calculator";
import type { CreateGenerationInput } from "@/lib/schemas/generation";

/** Résultat du buildSystemPrompt : prompt + réglages calculés. */
export interface BuildResult {
  systemPrompt: string;
  calculatedSettings: CalculatedSettings;
}

/** Construit le prompt système complet pour DeepSeek + calcule les réglages Suno. */
export function buildSystemPrompt(params: CreateGenerationInput): BuildResult {
  const genresData = params.genres
    .map((id) => GENRES.find((g) => g.id === id))
    .filter((g): g is (typeof GENRES)[number] => g !== undefined);
  const moodData = params.mood ? MOODS.find((m) => m.id === params.mood) : undefined;
  const styleData = WRITING_STYLES.find((s) => s.id === params.style);
  const atmosphereData = params.atmosphere
    ? ATMOSPHERES.find((a) => a.id === params.atmosphere)
    : undefined;

  const sections: string[] = [];

  // --- Rôle ---
  sections.push(
    `You are an expert songwriter and music producer specializing in creating lyrics and prompts for Suno AI music generation (2026 format). You produce professional, creative, and emotionally resonant content.`
  );

  // --- Genre(s) ---
  const isMultiGenre = genresData.length === 2;
  for (let i = 0; i < genresData.length; i++) {
    const role = isMultiGenre ? (i === 0 ? "primary" : "secondary") : "single";
    sections.push(buildGenreContext(genresData[i], params.songLength, role));
  }
  if (isMultiGenre) {
    sections.push(
      `GENRE MIX: ${genresData[0].name} is the DOMINANT genre — the overall structure, BPM, song form, and sonic identity must follow it. ${genresData[1].name} acts as a secondary flavor/influence: weave its characteristic instruments and textures into the mix without overriding the primary foundation. In the positivePrompt, list ${genresData[0].name} first, then ${genresData[1].name} as a secondary descriptor (e.g. "${genresData[0].name}, ${genresData[1].name} influences").`
    );
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
    sections.push(buildTempoContext(params.tempo));
  }

  // --- Langue(s) ---
  sections.push(buildLanguageContext(params.languages));

  // --- Style vocal ---
  if (params.vocalStyle) {
    sections.push(buildVocalStyleContext(params.vocalStyle));
  }

  // --- Ambiance culturelle ---
  if (atmosphereData) {
    sections.push(buildAtmosphereContext(atmosphereData));
  }

  // --- Song length ---
  if (params.songLength === "short") {
    sections.push(`SONG LENGTH: Short song. Keep it concise: 100-150 words max. Use the short structure provided. Aim for 1-2 minutes.`);
  } else if (params.songLength === "radio") {
    sections.push(`SONG LENGTH: Radio edit. Go straight to the essentials: 150-200 words. Use the radio structure provided (no intro). Aim for ~3 minutes.`);
  } else if (params.songLength === "long") {
    sections.push(`SONG LENGTH: Long song. Develop the themes fully: 350-450 words. Use the long structure provided with extended sections. Aim for 5-6 minutes.`);
  }

  // --- Tags Suno ---
  sections.push(buildSunoTagsContext());

  // --- Règles musicales ---
  sections.push(buildMusicRulesContext(params.genres[0]));

  // --- Calcul des réglages Suno ---
  const calculatedSettings = calculateSunoSettings(
    params.genres,
    params.mood ?? undefined,
    params.style,
  );

  // --- Format de sortie (avec réglages pré-calculés) ---
  sections.push(buildOutputFormat(calculatedSettings));

  return {
    systemPrompt: sections.join("\n\n"),
    calculatedSettings,
  };
}

/** Picks n random items from an array without repetition. */
function pickRandom<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, Math.min(n, arr.length));
}

function buildGenreContext(
  genre: (typeof GENRES)[number],
  songLength: "short" | "radio" | "standard" | "long",
  role: "single" | "primary" | "secondary" = "single",
): string {
  const maxItems = role === "secondary" ? 2 : 3;

  if (role === "secondary") {
    return [
      `SECONDARY GENRE (flavor/influence only): ${genre.name}`,
      `Key instruments to incorporate: ${pickRandom(genre.keyInstruments, maxItems).join(", ")}`,
      `Vocal flavors: ${pickRandom(genre.vocalCharacteristics, maxItems).join(", ")}`,
      `Effective Suno tags: ${pickRandom(genre.sunoTags, maxItems).join(", ")}`,
      `Prompt keywords to weave in: ${pickRandom(genre.promptKeywords, maxItems).join(", ")}`,
      `Keywords to AVOID: ${pickRandom(genre.avoidKeywords, maxItems).join(", ")}`,
    ].join("\n");
  }

  const label = role === "primary" ? "PRIMARY GENRE" : "GENRE";
  const structureMap = {
    short: genre.shortStructure,
    radio: genre.radioStructure,
    standard: genre.typicalStructure,
    long: genre.longStructure,
  };
  const structure = structureMap[songLength];

  return [
    `${label}: ${genre.name}`,
    `Description: ${genre.description}`,
    `Sub-genres available: ${pickRandom(genre.subGenres, maxItems).join(", ")}`,
    `Typical BPM: ${genre.typicalBpm.min}-${genre.typicalBpm.max}`,
    `Song structure to follow: ${structure.join(" → ")}`,
    `Key instruments: ${pickRandom(genre.keyInstruments, maxItems).join(", ")}`,
    `Vocal characteristics: ${pickRandom(genre.vocalCharacteristics, maxItems).join(", ")}`,
    `Historical context: ${genre.historicalContext}`,
    `Effective Suno tags: ${pickRandom(genre.sunoTags, maxItems).join(", ")}`,
    `Prompt keywords to use: ${pickRandom(genre.promptKeywords, maxItems).join(", ")}`,
    `Keywords to AVOID: ${pickRandom(genre.avoidKeywords, maxItems).join(", ")}`,
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

function buildLanguageContext(languages: string[]): string {
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
    qya: "Elvish (Quenya)",
  };
  const langNames = languages.map((l) => LANGUAGE_MAP[l] ?? "English");

  if (languages.includes("qya")) {
    const otherLangs = langNames.filter((n) => n !== "Elvish (Quenya)");
    const elvishNote = `Quenya is an Elvish language created by J.R.R. Tolkien, phonetically very close to Finnish. Use Finnish-inspired phonology: soft vowels (a, e, i, o, u), liquid consonants (l, r, n, m), diphthongs. Avoid harsh consonants. Words should sound ethereal and flowing.`;
    if (otherLangs.length > 0) {
      return `LANGUAGE: Write lyrics mixing ${otherLangs.join(" and ")} with Elvish (Quenya) passages. ${elvishNote} The positive and negative prompts MUST always be in English (Suno requirement).`;
    }
    return `LANGUAGE: Write all lyrics in Elvish (Quenya). ${elvishNote} The positive and negative prompts MUST always be in English (Suno requirement).`;
  }

  if (langNames.length === 2) {
    return `LANGUAGE: Write lyrics mixing ${langNames[0]} and ${langNames[1]}. Alternate naturally between the two languages (e.g., verses in one, chorus in the other, or mixed within sections). The positive and negative prompts MUST always be in English (Suno requirement).`;
  }
  return `LANGUAGE: Write all lyrics in ${langNames[0]}. The positive and negative prompts MUST always be in English (Suno requirement).`;
}

function buildVocalStyleContext(vocalStyle: string): string {
  if (vocalStyle === "Robotic") {
    return [
      `VOCAL STYLE: Robotic / Synthetic voice.`,
      `Write lyrics suited for a robotic, synthesized vocal delivery.`,
      `- Use short, clipped phrases and repetitive patterns`,
      `- Favor mechanical rhythm over natural prosody`,
      `- Include vocoder/auto-tune-friendly syllables (sustained vowels, simple consonants)`,
      `- Lyrics can reference technology, circuits, binary, digital themes (but not mandatory)`,
      `IMPORTANT for positivePrompt: MUST include "vocoder, robotic voice, synthesized vocals, auto-tune" descriptors.`,
      `IMPORTANT for negativePrompt: include "no natural vocals, no acoustic voice".`,
    ].join("\n");
  }
  return `VOCAL STYLE: Write lyrics suited for a "${vocalStyle}" vocal delivery. Adapt phrasing, register, and breathing patterns accordingly.`;
}

function buildTempoContext(tempo: string): string {
  const tempoDetails: Record<string, string> = {
    "Very Slow": "50-70 BPM. Extremely slow and deliberate. Long sustained notes, spacious phrasing. Include 'slow tempo, 60 BPM' in positivePrompt.",
    "Slow": "70-90 BPM. Relaxed pace, breathing room. Ballad-friendly. Include 'slow tempo, 80 BPM' in positivePrompt.",
    "Medium": "90-120 BPM. Standard comfortable pace. Include 'mid-tempo, 110 BPM' in positivePrompt.",
    "Fast": "120-150 BPM. Energetic, driving rhythm. Include 'uptempo, 135 BPM' in positivePrompt.",
    "Very Fast": "150+ BPM. High energy, rapid delivery. Include 'fast tempo, 160 BPM' in positivePrompt.",
  };
  const detail = tempoDetails[tempo] ?? `Target tempo: ${tempo}.`;
  return `TEMPO: ${detail}\nIMPORTANT: Always include the specific BPM value in the positivePrompt to ensure Suno respects the tempo. Adapt syllable density and rhythmic flow accordingly.`;
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

function buildOutputFormat(settings: CalculatedSettings): string {
  return `OUTPUT FORMAT:
You MUST respond with ONLY a valid JSON object, no markdown, no explanation, no text before or after.
The JSON must have this exact structure:
{
  "title": "Creative, original song title that reflects the lyrics theme and musical style",
  "lyrics": "Full lyrics with Suno tags ([Verse 1], [Chorus], etc.), newlines as \\n",
  "positivePrompt": "Suno 'Style of Music' field. Comma-separated, STRICT PRIORITY ORDER: (1) genre+subgenre, (2) vocal type ('male voice'/'female singer'), (3) mood/ambiance, (4) key instruments with SPECIFICITY ('fingerpicked acoustic guitar' not 'guitar'), (5) BPM value (e.g. '120 BPM'), (6) production style ('lo-fi'/'studio quality'/'raw'). Most important terms FIRST. CRITICAL: MAX 200 CHARS — Suno silently truncates beyond this limit. Always in English.",
  "negativePrompt": "Suno 'Exclude from Song' field. EVERY element MUST be prefixed with 'no'. Example: 'no autotune, no screaming, no heavy bass'. MAX 5 ITEMS — too many exclusions produce a hollow, unbalanced mix. Always in English. Max 120 chars. null if not needed.",
  "sunoSettings": {
    "vocalGender": "Male"
  }
}

FIELD RULES:
- title: Original, evocative, representative of the lyrics and mood. Not generic.
- lyrics: Use proper Suno tags for EVERY section. Target 200-300 words (Suno 2-4 min).
- positivePrompt: Suno's "Style of Music" field. STRICT PRIORITY ORDER (Suno weights left-to-right — first terms dominate): genre → vocal type → mood → specific instruments → BPM → production quality. Use precise vocabulary: "Rhodes electric piano" > "piano", "fingerpicked acoustic guitar" > "guitar", "808 bass" > "bass". HARD LIMIT: 200 chars — Suno silently ignores anything beyond. Do NOT reference artist names (Suno blocks them; use style descriptions instead, e.g. "crooner 50s style" instead of an artist name).
- negativePrompt: Suno's "Exclude from Song" field. EVERY single element MUST start with "no" (e.g., "no autotune, no screaming"). Limit to ≤5 items — too many destabilize the mix. Prefer describing what you want positively rather than adding more exclusions.
- sunoSettings.vocalGender: MUST be exactly "Male" or "Female" — no other value is accepted. For duets, choirs, or mixed vocals, pick the dominant or lead vocal gender. Default to "Male" if unsure.

NOTE: weirdness and styleInfluence are pre-calculated by the system. Do NOT include them in your response.
Pre-calculated values: weirdness=${settings.weirdness}, styleInfluence=${settings.styleInfluence}.
Adapt your creative approach accordingly:
- Weirdness ${settings.weirdness}: ${settings.weirdness <= 25 ? "Stay conventional and safe." : settings.weirdness <= 50 ? "Balanced creativity, some surprises welcome." : settings.weirdness <= 70 ? "Be experimental, unexpected arrangements." : "Go wild — chaotic, avant-garde, unpredictable."}
- Style Influence ${settings.styleInfluence}: ${settings.styleInfluence <= 30 ? "Interpret the style loosely, take creative liberties." : settings.styleInfluence <= 60 ? "Follow the style description moderately." : "Follow the style description closely and faithfully."}

SUNO BEST PRACTICES:
- positivePrompt priority order: genre+subgenre first, then vocal type, mood, instruments, BPM, production — critical terms at the start
- Use specific musical vocabulary: "fingerpicked acoustic guitar" > "guitar", "Rhodes electric piano" > "piano", "808 bass" > "bass"
- Always include an explicit BPM value for reliable tempo control (e.g. "120 BPM")
- Include production descriptors: "lo-fi", "polished", "raw", "warm analog", "studio quality"
- negativePrompt: "no X" prefix required on EVERY item — "no guitar solo" not "avoid guitar solos"
- negativePrompt: max 5 items — beyond that, the mix becomes hollow and unbalanced
- Never reference artist names (copyright enforcement) — describe the style instead
- Prefer adding positive descriptors over multiplying exclusions

Do NOT include any text outside the JSON object`;
}
