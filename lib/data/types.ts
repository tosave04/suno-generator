/**
 * Types TypeScript pour le corpus de données musicales.
 * Utilisés par le Context Builder pour assembler le contexte IA.
 */

/** Données complètes d'un genre musical */
export interface GenreData {
  id: string;
  name: string;
  description: string;
  subGenres: string[];
  typicalBpm: { min: number; max: number };
  typicalStructure: string[];
  keyInstruments: string[];
  vocalCharacteristics: string[];
  historicalContext: string;
  sunoTags: string[];
  promptKeywords: string[];
  avoidKeywords: string[];
}

/** Données d'un mood / atmosphère */
export interface MoodData {
  id: string;
  name: string;
  description: string;
  lexicalFields: string[];
  musicalCharacteristics: string[];
  compatibleGenres: string[];
  promptModifiers: string[];
}

/** Données d'un style d'écriture */
export interface WritingStyleData {
  id: string;
  name: string;
  description: string;
  rules: string[];
  examples: string[];
  sunoFormatting: string[];
}

/** Tag de structure Suno */
export interface SunoTag {
  tag: string;
  description: string;
  category: "structure" | "vocal" | "instrumental" | "delivery";
  usage: string;
}

/** Règle de théorie musicale transversale */
export interface MusicRule {
  id: string;
  category: string;
  title: string;
  description: string;
  applicableGenres: string[] | "all";
}
