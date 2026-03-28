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
  pop: 32,
  rock: 40,
  hiphop: 35,
  jazz: 55,
  electronic: 50,
  rnb: 35,
  country: 27,
  classical: 30,
  metal: 45,
  folk: 27,
  indie: 48,
  latin: 35,
  reggae: 32,
  blues: 35,
  punk: 45,
  ambient: 62,
  funk: 38,
  soul: 32,
  disco: 30,
  kpop: 32,
  celtic: 30,
  afroworld: 40,
  "16bit": 55,
  middleeastern: 40,
  indian: 40,
  japanese: 45,
};

const DEFAULT_WEIRDNESS_BASE = 40;

// ---------------------------------------------------------------------------
// StyleInfluence : base par genre (fidélité au prompt typique du genre)
// ---------------------------------------------------------------------------

const GENRE_STYLE_INFLUENCE_BASE: Record<string, number> = {
  pop: 65,
  rock: 55,
  hiphop: 50,
  jazz: 40,
  electronic: 45,
  rnb: 55,
  country: 70,
  classical: 75,
  metal: 60,
  folk: 67,
  indie: 45,
  latin: 55,
  reggae: 60,
  blues: 55,
  punk: 50,
  ambient: 35,
  funk: 50,
  soul: 57,
  disco: 60,
  kpop: 65,
  celtic: 65,
  afroworld: 50,
  "16bit": 45,
  middleeastern: 55,
  indian: 55,
  japanese: 50,
};

const DEFAULT_STYLE_INFLUENCE_BASE = 50;

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

const RANDOM_VARIANCE = 6;

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
