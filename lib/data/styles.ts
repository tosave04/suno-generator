import type { WritingStyleData } from "./types";

/**
 * Styles d'écriture pour la génération de lyrics.
 * Minimum 6 styles avec règles, exemples et conseils de formatage Suno.
 */
export const WRITING_STYLES: WritingStyleData[] = [
  {
    id: "poetic",
    name: "Poetic",
    description:
      "Écriture riche en métaphores, images et symbolisme. Chaque mot est pesé pour son poids émotionnel et sa musicalité.",
    rules: [
      "Privilégier les métaphores et la symbolique plutôt que le littéral",
      "Utiliser des images sensorielles (vue, toucher, odorat, son)",
      "Varier les longueurs de vers pour créer du rythme",
      "Employer des rimes internes et des assonances",
      "Préférer l'évocation à l'explication directe",
      "Limiter le vocabulaire courant, chercher la beauté des mots",
    ],
    examples: [
      "Silk curtains of rain / Painting the windows blind",
      "We were constellations / Burning across each other's sky",
      "Time folds like origami / Each crease a year undone",
    ],
    sunoFormatting: [
      "Garder des vers courts (5-8 mots) pour le phrasé vocal",
      "Utiliser des pauses naturelles via des retours à la ligne",
      "Les refrains peuvent être plus simples pour contraster avec les couplets",
      "Placer les images les plus fortes en début/fin de section",
    ],
  },
  {
    id: "storytelling",
    name: "Storytelling",
    description:
      "Narration linéaire avec personnages, décor et arc dramatique. La chanson raconte une histoire du début à la fin.",
    rules: [
      "Établir un cadre (qui, où, quand) dès le premier couplet",
      "Faire progresser l'histoire à chaque section",
      "Utiliser des détails concrets pour ancrer le récit",
      "Le refrain résume le thème émotionnel central",
      "Le bridge apporte un retournement ou une révélation",
      "Conclure avec une résolution ou une question ouverte",
    ],
    examples: [
      "She packed her bags on a Tuesday night / Left a note by the bedroom light",
      "The old man sat on the porch at dawn / Watching the world he built move on",
      "They met at a crossroads, summer of '99 / Two strangers trading stories over cheap red wine",
    ],
    sunoFormatting: [
      "Structurer en Verse 1 (setup) → Verse 2 (development) → Verse 3 (resolution)",
      "Le refrain doit être intemporel, applicable à chaque étape de l'histoire",
      "Utiliser [Bridge] pour le climax narratif ou le twist",
      "Garder un fil chronologique clair entre les sections",
    ],
  },
  {
    id: "direct",
    name: "Direct",
    description:
      "Écriture franche et sans détour. Messages clairs, langage courant et impact immédiat. Idéal pour les hymnes et le hip-hop.",
    rules: [
      "Aller droit au but, pas de fioritures inutiles",
      "Utiliser un langage conversationnel et accessible",
      "Répéter les phrases-clés pour l'impact",
      "Les hooks doivent être mémorisables en une écoute",
      "Créer des punchlines percutantes",
      "Privilégier les mots d'une à deux syllabes pour le punch",
    ],
    examples: [
      "I don't need your love, I need my freedom",
      "We run this town, no one can stop us now",
      "Say what you mean, mean what you say",
    ],
    sunoFormatting: [
      "Refrains courts et répétitifs pour l'accroche immédiate",
      "Utiliser [Hook] au lieu de [Chorus] pour les morceaux hip-hop/trap",
      "Les ad-libs entre parenthèses renforcent l'énergie : (yeah!) (let's go!)",
      "Phrases courtes et percutantes, 4-6 mots par ligne",
    ],
  },
  {
    id: "abstract",
    name: "Abstract",
    description:
      "Écriture expérimentale et non-linéaire. Fragments d'images, associations libres et ambiguïté volontaire.",
    rules: [
      "Jouer sur le sonore autant que le sémantique",
      "Juxtaposer des images sans connexion logique",
      "Éviter les narrations linéaires",
      "Laisser l'interprétation ouverte au listener",
      "Utiliser la répétition comme motif hypnotique",
      "Mélanger registres de langage et références inattendues",
    ],
    examples: [
      "Velvet static, chrome cathedral / Dissolving into pixel rain",
      "Seven moons in a cardboard sky / The clock forgot how to try",
      "Glass bones singing electricity / Your name tastes like Tuesday",
    ],
    sunoFormatting: [
      "Structure libre : les sections peuvent être inégales",
      "Utiliser [Break] et [Instrumental] pour créer des espaces",
      "Le refrain peut évoluer légèrement à chaque répétition",
      "Placer des indications vocales : (whisper), (echo), (spoken)",
    ],
  },
  {
    id: "conversational",
    name: "Conversational",
    description:
      "Écriture qui sonne comme une conversation intime. Ton naturel, adresse directe et authenticité.",
    rules: [
      "Écrire comme on parle, avec contractions et familiarité",
      "S'adresser directement au listener ou à un 'tu/you'",
      "Inclure des hésitations et imperfections volontaires",
      "Les rimes ne sont pas obligatoires, le naturel prime",
      "Poser des questions rhétoriques",
      "Varier entre déclaration et introspection",
    ],
    examples: [
      "You know that feeling when the whole world stops? / Yeah, that's what you do to me",
      "I keep telling myself it's fine / But honestly? I don't think it is",
      "So here we are again / Same old kitchen, same old rain",
    ],
    sunoFormatting: [
      "Alterner entre vers chantés et passages quasi-parlés",
      "Utiliser (spoken) pour les passages les plus intimes",
      "Le refrain peut être une question récurrente",
      "Garder un ton naturel, éviter les mots trop 'songwriting'",
    ],
  },
  {
    id: "anthem",
    name: "Anthem",
    description:
      "Écriture fédératrice pensée pour être criée en chœur. Thèmes universels, refrains puissants et énergie collective.",
    rules: [
      "Thèmes universels : liberté, unité, résilience, victoire",
      "Refrains simples, mémorisables et chantables en groupe",
      "Utiliser 'we/nous' plutôt que 'I/je' pour l'inclusion",
      "Crescendo émotionnel du couplet vers le refrain",
      "Répétition stratégique des lignes-clés",
      "Le bridge doit être le moment fort (breakdown → explosion)",
    ],
    examples: [
      "We are the ones who never break / Standing tall when the ground shakes",
      "Light it up, light it up / Every voice, every heart, rising up",
      "This is our time, this is our fight / We won't go gently into the night",
    ],
    sunoFormatting: [
      "Utiliser [Pre-Chorus] pour builder la tension",
      "Le [Chorus] doit pouvoir fonctionner a cappella",
      "Ajouter (choir) ou (gang vocals) pour les refrains",
      "[Post-Chorus] parfait pour la phrase-clé répétée : 'Oh-oh-oh' patterns",
    ],
  },
];
