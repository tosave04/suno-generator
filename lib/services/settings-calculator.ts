/**
 * Calculateur de weirdness et styleInfluence pour Suno.
 *
 * Stratégie :
 * 1. Weirdness : base déterminée par le genre (moyenne si 2 genres),
 *    modifiée par le mood (±%) et le style d'écriture (±%), avec variance aléatoire.
 * 2. StyleInfluence : base déterminée par un "objectif musical" déduit du genre,
 *    modifiée par le mood (±%) et le style d'écriture (±%), avec variance aléatoire.
 *
 * Source : docs/suno/03-SETTINGS-ADVANCED.md
 */

/** Résultat du calcul des réglages Suno. */
export interface CalculatedSettings {
  weirdness: number;
  styleInfluence: number;
}

// ---------------------------------------------------------------------------
// Weirdness : base par genre (milieu de la plage recommandée dans 03-SETTINGS)
// ---------------------------------------------------------------------------

const GENRE_WEIRDNESS_BASE: Record<string, number> = {
  pop: 34,
  rock: 43,
  hiphop: 38,
  jazz: 60,
  electronic: 55,
  rnb: 37,
  country: 30,
  classical: 33,
  metal: 50,
  folk: 30,
  indie: 53,
  latin: 38,
  reggae: 35,
  blues: 38,
  punk: 50,
  ambient: 67,
  funk: 43,
  soul: 34,
  disco: 33,
  kpop: 34,
  celtic: 33,
  afroworld: 45,
  "16bit": 60,
  middleeastern: 45,
  indian: 45,
  japanese: 50,
};

const DEFAULT_WEIRDNESS_BASE = 42;

// ---------------------------------------------------------------------------
// StyleInfluence : base par genre (fidélité au prompt typique du genre)
// ---------------------------------------------------------------------------

const GENRE_STYLE_INFLUENCE_BASE: Record<string, number> = {
  pop: 68,
  rock: 58,
  hiphop: 53,
  jazz: 43,
  electronic: 48,
  rnb: 58,
  country: 73,
  classical: 78,
  metal: 63,
  folk: 70,
  indie: 48,
  latin: 58,
  reggae: 63,
  blues: 58,
  punk: 53,
  ambient: 38,
  funk: 53,
  soul: 60,
  disco: 63,
  kpop: 68,
  celtic: 68,
  afroworld: 53,
  "16bit": 48,
  middleeastern: 58,
  indian: 58,
  japanese: 53,
};

const DEFAULT_STYLE_INFLUENCE_BASE = 53;

// ---------------------------------------------------------------------------
// Mood modifiers (ajout/retrait en points absolus sur la base)
// ---------------------------------------------------------------------------

const MOOD_WEIRDNESS_MOD: Record<string, number> = {
  joyful: -12,
  melancholic: -8,
  energetic: 12,
  calm: -18,
  aggressive: 16,
  romantic: -10,
  dark: 18,
  uplifting: -8,
  nostalgic: -14,
  epic: 8,
  chaos: 40,
};

const MOOD_STYLE_INFLUENCE_MOD: Record<string, number> = {
  joyful: 12,
  melancholic: 8,
  energetic: -6,
  calm: 15,
  aggressive: -16,
  romantic: 18,
  dark: -12,
  uplifting: 10,
  nostalgic: 16,
  epic: 14,
  chaos: -30,
};

// ---------------------------------------------------------------------------
// Writing style modifiers (ajout/retrait en points absolus)
// ---------------------------------------------------------------------------

const STYLE_WEIRDNESS_MOD: Record<string, number> = {
  poetic: -5,
  storytelling: -5,
  direct: -10,
  abstract: 15,
  conversational: -5,
  anthem: 0,
};

const STYLE_INFLUENCE_MOD: Record<string, number> = {
  poetic: 5,
  storytelling: 10,
  direct: 5,
  abstract: -15,
  conversational: 0,
  anthem: 10,
};

// ---------------------------------------------------------------------------
// Variance aléatoire
// ---------------------------------------------------------------------------

const RANDOM_VARIANCE = 9;

/** Retourne un entier aléatoire dans [-range, +range]. */
function randomVariance(range: number): number {
  return Math.floor(Math.random() * (range * 2 + 1)) - range;
}

/** Clamp une valeur entre 0 et 100. */
function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

// ---------------------------------------------------------------------------
// Calcul principal
// ---------------------------------------------------------------------------

/**
 * Calcule weirdness et styleInfluence à partir des paramètres de composition.
 *
 * @param genres  - IDs des genres sélectionnés (1 ou 2)
 * @param mood    - ID du mood sélectionné (optionnel)
 * @param style   - ID du style d'écriture
 */
export function calculateSunoSettings(
  genres: string[],
  mood: string | undefined,
  style: string,
): CalculatedSettings {
  // --- Weirdness ---
  const weirdnessBases = genres.map(
    (g) => GENRE_WEIRDNESS_BASE[g] ?? DEFAULT_WEIRDNESS_BASE,
  );
  let weirdness =
    weirdnessBases.reduce((a, b) => a + b, 0) / weirdnessBases.length;

  if (mood) {
    weirdness += MOOD_WEIRDNESS_MOD[mood] ?? 0;
  }
  weirdness += STYLE_WEIRDNESS_MOD[style] ?? 0;
  weirdness += randomVariance(RANDOM_VARIANCE);

  // --- StyleInfluence ---
  const styleBases = genres.map(
    (g) => GENRE_STYLE_INFLUENCE_BASE[g] ?? DEFAULT_STYLE_INFLUENCE_BASE,
  );
  let styleInfluence =
    styleBases.reduce((a, b) => a + b, 0) / styleBases.length;

  if (mood) {
    styleInfluence += MOOD_STYLE_INFLUENCE_MOD[mood] ?? 0;
  }
  styleInfluence += STYLE_INFLUENCE_MOD[style] ?? 0;
  styleInfluence += randomVariance(RANDOM_VARIANCE);

  return {
    weirdness: clamp(weirdness),
    styleInfluence: clamp(styleInfluence),
  };
}
