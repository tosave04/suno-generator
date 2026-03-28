import { MOODS } from "@/lib/data/moods";
import { ATMOSPHERES } from "@/lib/data/atmospheres";
import { SAMPLES } from "@/lib/data/samples";

/** Probabilité de sélectionner 2 genres au lieu d'1 */
const GENRE_DOUBLE_CHANCE = 0.2;

/** Poids de sélection par genre (popularité globale estimée) */
const GENRE_WEIGHTS: [string, number][] = [
  ["pop", 10], ["rock", 8], ["hiphop", 8], ["electronic", 7],
  ["rnb", 5], ["latin", 5], ["indie", 5], ["kpop", 4],
  ["jazz", 3], ["country", 3], ["metal", 3], ["folk", 3],
  ["reggae", 3], ["blues", 3], ["funk", 3], ["soul", 3], ["disco", 3],
  ["classical", 2], ["punk", 2], ["ambient", 2],
  ["celtic", 1], ["afroworld", 1], ["16bit", 1],
  ["middleeastern", 1], ["indian", 1], ["japanese", 1],
];

/** Poids de sélection par tempo */
const TEMPO_WEIGHTS: [string, number][] = [
  ["Very Slow", 1], ["Slow", 2], ["Medium", 4], ["Fast", 4], ["Very Fast", 1],
];

/** Poids de sélection par langue */
const LANGUAGE_WEIGHTS: [string, number][] = [
  ["en", 10], ["fr", 10], ["es", 2], ["pt", 1], ["ja", 2], ["ko", 2],
  ["de", 1], ["it", 1], ["ru", 1], ["hi", 1], ["ar", 1], ["zh", 2], ["qya", 0.5],
];

/** Probabilité de sélectionner 2 langues au lieu d'1 */
const LANGUAGE_DOUBLE_CHANCE = 0.2;

/** Poids de sélection par style d'écriture */
const STYLE_WEIGHTS: [string, number][] = [
  ["poetic", 4], ["storytelling", 4], ["direct", 1], ["abstract", 1],
  ["conversational", 1], ["anthem", 1],
];

/** Styles vocaux disponibles (équiprobables) */
const VOCAL_STYLE_VALUES = ["Male", "Female", "Duet", "Choir", "Whisper", "Rap", "Opera", "Robotic"];

/** Probabilité qu'aucun style vocal ne soit sélectionné */
const VOCAL_STYLE_NONE_CHANCE = 0.4;

/** Probabilité qu'aucun mood ne soit sélectionné */
const MOOD_NONE_CHANCE = 0.25;

/** Probabilité qu'aucune ambiance ne soit sélectionnée */
const ATMOSPHERE_NONE_CHANCE = 0.25;

/** Probabilité de durée par type */
const SONG_LENGTH_WEIGHTS: ["short" | "radio" | "standard" | "long", number][] = [
  ["short", 2], ["radio", 8], ["standard", 4], ["long", 1],
];

export function pickRandom<T>(arr: readonly T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function pickWeighted<V>(weights: [V, number][]): V {
  const total = weights.reduce((s, [, w]) => s + w, 0);
  let r = Math.random() * total;
  for (const [value, weight] of weights) {
    r -= weight;
    if (r <= 0) return value;
  }
  return weights[weights.length - 1][0];
}

function pickWeightedMultiple<V>(weights: [V, number][], count: number): V[] {
  const result: V[] = [];
  let remaining = [...weights];
  for (let i = 0; i < count && remaining.length > 0; i++) {
    const pick = pickWeighted(remaining);
    result.push(pick);
    remaining = remaining.filter(([v]) => v !== pick);
  }
  return result;
}

export interface RandomComposition {
  genres: string[];
  style: string;
  mood: string | null;
  tempo: string;
  languages: string[];
  vocalStyle: string | null;
  atmosphere: string | null;
  songLength: "short" | "radio" | "standard" | "long";
  userPrompt: string;
}

export function generateRandomComposition(): RandomComposition {
  const genreCount = Math.random() < GENRE_DOUBLE_CHANCE ? 2 : 1;
  const langCount = Math.random() < LANGUAGE_DOUBLE_CHANCE ? 2 : 1;

  return {
    genres: pickWeightedMultiple(GENRE_WEIGHTS, genreCount),
    style: pickWeighted(STYLE_WEIGHTS),
    mood: Math.random() < MOOD_NONE_CHANCE ? null : pickRandom(MOODS, 1)[0].id,
    tempo: pickWeighted(TEMPO_WEIGHTS),
    languages: pickWeightedMultiple(LANGUAGE_WEIGHTS, langCount),
    vocalStyle: Math.random() < VOCAL_STYLE_NONE_CHANCE ? null : pickRandom(VOCAL_STYLE_VALUES, 1)[0],
    atmosphere: Math.random() < ATMOSPHERE_NONE_CHANCE ? null : pickRandom(ATMOSPHERES, 1)[0].id,
    songLength: pickWeighted(SONG_LENGTH_WEIGHTS),
    userPrompt: pickRandom(SAMPLES, 1)[0],
  };
}
