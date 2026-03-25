import type { MusicRule } from "./types";

/**
 * Règles transversales de théorie musicale et de bonnes pratiques
 * de composition pour Suno. Utilisées par le Context Builder.
 */
export const MUSIC_RULES: MusicRule[] = [
  // --- Structure & Format ---
  {
    id: "structure-standard",
    category: "structure",
    title: "Structure standard de chanson",
    description:
      "La structure la plus courante est Intro → Verse → Chorus → Verse → Chorus → Bridge → Chorus → Outro. Adapter selon le genre : le hip-hop utilise Hook au lieu de Chorus, le jazz utilise Head-Solo-Head.",
    applicableGenres: "all",
  },
  {
    id: "section-length",
    category: "structure",
    title: "Longueur des sections",
    description:
      "Couplets : 4-8 lignes. Refrains : 4-6 lignes. Pre-Chorus : 2-4 lignes. Bridge : 4-6 lignes. Les sections trop longues diluent l'impact.",
    applicableGenres: "all",
  },
  {
    id: "song-length",
    category: "structure",
    title: "Durée cible Suno",
    description:
      "Suno génère des morceaux de 2 à 4 minutes. Viser environ 200-300 mots de lyrics. Au-delà, le résultat risque d'être tronqué ou bâclé.",
    applicableGenres: "all",
  },
  {
    id: "repetition-balance",
    category: "structure",
    title: "Équilibre répétition vs variété",
    description:
      "Le refrain doit être quasi-identique à chaque répétition (reconnaissance). Les couplets doivent varier (progression). Trop de répétition ennuie, trop de variété désoriente.",
    applicableGenres: "all",
  },

  // --- Mélodie & Harmonie ---
  {
    id: "key-mood-major",
    category: "harmony",
    title: "Tonalités majeures = émotions positives",
    description:
      "Les tonalités majeures (C, G, D, A, E) évoquent la joie, l'espoir et l'énergie. Utiliser pour les moods Joyful, Uplifting et Energetic.",
    applicableGenres: "all",
  },
  {
    id: "key-mood-minor",
    category: "harmony",
    title: "Tonalités mineures = émotions sombres",
    description:
      "Les tonalités mineures (Am, Em, Dm, Bm) évoquent la tristesse, la tension et le mystère. Utiliser pour les moods Melancholic, Dark et Aggressive.",
    applicableGenres: "all",
  },
  {
    id: "chord-progressions",
    category: "harmony",
    title: "Progressions d'accords courantes",
    description:
      "Pop/Rock : I-V-vi-IV (la plus universelle). Blues : I-I-I-I-IV-IV-I-I-V-IV-I-V (12 mesures). Jazz : ii-V-I. Triste : vi-IV-I-V. Épique : I-III-IV-iv.",
    applicableGenres: "all",
  },

  // --- Rythme & Tempo ---
  {
    id: "tempo-syllable-density",
    category: "rhythm",
    title: "Tempo et densité de syllabes",
    description:
      "Tempo lent (60-80 BPM) : peu de syllabes par mesure, mots longs. Tempo rapide (140+ BPM) : syllabes courtes, flow rapide, mots percussifs. Adapter la densité du texte au BPM.",
    applicableGenres: "all",
  },
  {
    id: "groove-feel",
    category: "rhythm",
    title: "Straight vs Swing feel",
    description:
      "Straight feel (rock, pop, electronic) : croches égales. Swing feel (jazz, blues, soul) : croches inégales (longue-courte). Préciser dans le prompt pour guider Suno.",
    applicableGenres: "all",
  },

  // --- Lyrics & Écriture ---
  {
    id: "show-dont-tell",
    category: "lyrics",
    title: "Montrer plutôt que dire",
    description:
      "Au lieu de 'I'm sad', écrire 'Rain taps the window where you used to sit'. Les images concrètes sont plus percutantes que les déclarations abstraites.",
    applicableGenres: "all",
  },
  {
    id: "rhyme-schemes",
    category: "lyrics",
    title: "Schémas de rimes",
    description:
      "AABB (couplets rimés), ABAB (rimes croisées), ABCB (seuls lignes 2 et 4 riment). Les rimes internes et les near-rhymes ajoutent de la texture sans forcer.",
    applicableGenres: "all",
  },
  {
    id: "hook-first",
    category: "lyrics",
    title: "Le hook en premier",
    description:
      "Commencer par écrire le refrain/hook, puis construire les couplets autour. Le hook est le cœur de la chanson, tout le reste le supporte.",
    applicableGenres: "all",
  },
  {
    id: "singability",
    category: "lyrics",
    title: "Chantabilité des mots",
    description:
      "Favoriser les voyelles ouvertes (ah, oh, ee) sur les notes tenues. Éviter les consonnes clusters (strengths, twelfths) en fin de phrase. Les mots doivent couler naturellement.",
    applicableGenres: "all",
  },

  // --- Production & Prompt Suno ---
  {
    id: "prompt-specificity",
    category: "production",
    title: "Spécificité du prompt Suno",
    description:
      "Les prompts Suno les plus efficaces combinent : genre + adjectifs de mood + instruments clés + BPM + caractéristique vocale. Exemple : 'Indie rock, dreamy, jangly guitars, soft male vocals, 120 BPM'.",
    applicableGenres: "all",
  },
  {
    id: "negative-prompt-usage",
    category: "production",
    title: "Usage du prompt négatif",
    description:
      "Garder le prompt négatif court (3-5 éléments max). Exclure uniquement ce qui risque d'apparaître par défaut. Exemple : 'no autotune, no heavy bass, no screaming'.",
    applicableGenres: "all",
  },
  {
    id: "genre-mixing",
    category: "production",
    title: "Mélange de genres dans le prompt",
    description:
      "Suno gère bien les fusions de 2-3 genres. Préciser un genre principal et un sous-genre ou influence. Exemple : 'Jazz-hop, lo-fi hip-hop with smooth jazz elements'. Au-delà de 3, le résultat devient imprévisible.",
    applicableGenres: "all",
  },
  {
    id: "prompt-max-length",
    category: "production",
    title: "Longueur max du positive prompt",
    description:
      "Le champ 'Style of Music' ne doit pas dépasser ~200 caractères. Au-delà, Suno dilue l'interprétation et le résultat perd en cohérence.",
    applicableGenres: "all",
  },
  {
    id: "negative-prompt-max-length",
    category: "production",
    title: "Longueur max du negative prompt",
    description:
      "Le champ 'Exclude from Song' doit rester sous ~120 caractères. 3-5 éléments max, chacun préfixé par 'no'.",
    applicableGenres: "all",
  },
  {
    id: "prompts-english-only",
    category: "production",
    title: "Prompts en anglais obligatoire",
    description:
      "Les champs 'Style of Music' et 'Exclude from Song' doivent TOUJOURS être rédigés en anglais, même si les lyrics sont dans une autre langue. L'anglais produit les résultats les plus fiables.",
    applicableGenres: "all",
  },
  {
    id: "lyrics-word-count",
    category: "lyrics",
    title: "Nombre de mots cible pour les lyrics",
    description:
      "Viser 200-300 mots de lyrics. Au-delà, Suno tronque ou bâcle la fin. Chaque mot doit compter : privilégier l'impact à la quantité.",
    applicableGenres: "all",
  },
  {
    id: "prompt-word-order",
    category: "production",
    title: "Ordre des mots dans le prompt",
    description:
      "Les premiers mots du positive prompt ont plus de poids. Placer le genre en premier, puis les descripteurs les plus importants (mood, vocal, tempo).",
    applicableGenres: "all",
  },

  // --- Règles spécifiques par genre ---
  {
    id: "hiphop-bar-structure",
    category: "genre-specific",
    title: "Structure en mesures (bars) du hip-hop",
    description:
      "Les couplets hip-hop font typiquement 16 mesures (16 bars). Le hook fait 4-8 mesures. Chaque mesure = 1 ligne de texte. Maintenir un flow constant et des schémas de rimes serrés.",
    applicableGenres: ["hiphop"],
  },
  {
    id: "electronic-minimal-lyrics",
    category: "genre-specific",
    title: "Lyrics minimalistes en électronique",
    description:
      "En electronic/ambient, les lyrics sont souvent minimalistes : phrases courtes répétées, fragments vocaux, ou chant sans paroles. L'accent est sur le son, pas le texte.",
    applicableGenres: ["electronic", "ambient"],
  },
  {
    id: "blues-aab-form",
    category: "genre-specific",
    title: "Forme AAB du blues",
    description:
      "La structure lyrique classique du blues est AAB : la première ligne est chantée, répétée (avec variation), puis une troisième ligne résout. Format idéal pour le 12-bar blues.",
    applicableGenres: ["blues"],
  },
  {
    id: "country-storytelling",
    category: "genre-specific",
    title: "Storytelling concret en country",
    description:
      "Le country excelle dans les détails concrets et spécifiques : noms de lieux, marques, situations quotidiennes. Authenticité et sincérité priment sur la sophistication littéraire.",
    applicableGenres: ["country"],
  },
  {
    id: "metal-vocal-techniques",
    category: "genre-specific",
    title: "Techniques vocales metal",
    description:
      "Préciser le type de voix dans le prompt metal : clean vocals, growl, scream, guttural, falsetto. Suno peut mixer clean et extrême si indiqué. Les breakdowns utilisent souvent des cris courts.",
    applicableGenres: ["metal"],
  },
];
