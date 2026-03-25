import type { SunoTag } from "./types";

/**
 * Référence complète des tags Suno 2026.
 * Tags de structure, d'indication vocale et instrumentale.
 */
export const SUNO_TAGS: SunoTag[] = [
  // --- Structure ---
  {
    tag: "[Intro]",
    description: "Introduction instrumentale ou vocale avant le premier couplet.",
    category: "structure",
    usage: "Placer en tout début de chanson. Peut contenir (instrumental) ou quelques mots.",
  },
  {
    tag: "[Verse]",
    description: "Couplet principal. Avance l'histoire ou développe le thème.",
    category: "structure",
    usage: "Numéroter si plusieurs : [Verse 1], [Verse 2]. Contenu différent à chaque fois.",
  },
  {
    tag: "[Pre-Chorus]",
    description: "Transition montante entre couplet et refrain, crée l'anticipation.",
    category: "structure",
    usage: "2-4 lignes max. Doit monter en intensité vers le refrain.",
  },
  {
    tag: "[Chorus]",
    description: "Refrain — le cœur mélodique et émotionnel de la chanson.",
    category: "structure",
    usage: "Répété 2-3 fois. Doit être mémorable et chantable. Garder identique ou quasi-identique.",
  },
  {
    tag: "[Post-Chorus]",
    description: "Extension du refrain, souvent des 'oh-oh' ou une phrase-clé répétée.",
    category: "structure",
    usage: "1-2 lignes. Renforce le hook. Parfait pour les motifs vocaux simples.",
  },
  {
    tag: "[Bridge]",
    description: "Pont musical offrant un contraste avec le reste de la chanson.",
    category: "structure",
    usage: "Apparaît une seule fois, généralement avant le dernier refrain. Changement de mélodie/tonalité.",
  },
  {
    tag: "[Outro]",
    description: "Conclusion de la chanson. Peut être un fade-out ou une résolution.",
    category: "structure",
    usage: "Placer en fin de chanson. Peut reprendre des éléments du refrain ou de l'intro.",
  },
  {
    tag: "[Hook]",
    description: "Accroche mélodique courte et percutante, alternative au chorus en hip-hop.",
    category: "structure",
    usage: "Plus court qu'un refrain. Utilisé principalement en hip-hop et trap.",
  },
  {
    tag: "[Break]",
    description: "Pause ou rupture rythmique dans la chanson.",
    category: "structure",
    usage: "Crée un silence ou un changement drastique de dynamique.",
  },

  // --- Instrumental ---
  {
    tag: "[Instrumental]",
    description: "Section purement instrumentale (solo, interlude).",
    category: "instrumental",
    usage: "Ajouter (instrumental) comme contenu. Suno génère une section sans voix.",
  },
  {
    tag: "[Solo]",
    description: "Solo instrumental (guitare, saxophone, piano…).",
    category: "instrumental",
    usage: "Préciser l'instrument si pertinent : [Guitar Solo], [Sax Solo].",
  },
  {
    tag: "[Interlude]",
    description: "Passage instrumental de transition entre deux sections.",
    category: "instrumental",
    usage: "Plus court qu'un [Instrumental]. Sert de respiration.",
  },

  // --- Vocal delivery ---
  {
    tag: "(instrumental)",
    description: "Indication inline qu'une section est instrumentale.",
    category: "delivery",
    usage: "Placer dans une section pour indiquer l'absence de paroles.",
  },
  {
    tag: "(whisper)",
    description: "Indication de chuchotement vocal.",
    category: "delivery",
    usage: "Avant ou autour des lignes devant être chuchotées.",
  },
  {
    tag: "(shout)",
    description: "Indication de cri ou de voix forte.",
    category: "delivery",
    usage: "Pour les moments d'intensité maximale.",
  },
  {
    tag: "(spoken)",
    description: "Passage parlé plutôt que chanté.",
    category: "delivery",
    usage: "Pour les intros parlées, les interludes narratifs ou le spoken word.",
  },
  {
    tag: "(echo)",
    description: "Effet d'écho sur les paroles.",
    category: "delivery",
    usage: "Ajouter après la ligne concernée pour un effet de réverbération.",
  },
  {
    tag: "(choir)",
    description: "Section chantée en chœur.",
    category: "delivery",
    usage: "Pour les refrains communautaires ou les harmonies de groupe.",
  },
  {
    tag: "(ad-lib)",
    description: "Improvisation vocale ou interjections.",
    category: "delivery",
    usage: "Pour les 'yeah!', 'uh!', 'let's go!' et autres vocalises libres.",
  },
  {
    tag: "[Fade Out]",
    description: "Indication de diminution progressive du volume en fin de chanson.",
    category: "structure",
    usage: "Placer comme dernière section. Le son diminue graduellement.",
  },
  {
    tag: "[Drop]",
    description: "Climax rythmique, principalement en musique électronique.",
    category: "structure",
    usage: "Utilisé après un build-up. Section instrumentale à haute énergie.",
  },
  {
    tag: "[end]",
    description: "Force la fin immédiate de la chanson.",
    category: "structure",
    usage: "Indispensable avec Extend pour empêcher Suno de continuer. Placer après [Outro].",
  },

  // --- Metatags créatifs ---
  {
    tag: "[laughter]",
    description: "Génère un rire naturel dans la chanson.",
    category: "metatag",
    usage: "Tag expérimental. Suno interprète comme une didascalie.",
  },
  {
    tag: "[piano interlude]",
    description: "Interlude piano généré par Suno.",
    category: "metatag",
    usage: "Préciser l'instrument dans le tag. Fonctionne aussi avec [guitar interlude], etc.",
  },
  {
    tag: "[fast rap verse]",
    description: "Couplet rap rapide.",
    category: "metatag",
    usage: "Combiner style + vitesse dans le tag pour guider Suno.",
  },
  {
    tag: "[slow emotional bridge]",
    description: "Pont lent et émotionnel.",
    category: "metatag",
    usage: "Les tags descriptifs fonctionnent comme des 'stage directions'.",
  },
];

/** Tags de structure ordonnés pour la construction de chansons */
export const STRUCTURE_TAGS = SUNO_TAGS.filter(
  (t) => t.category === "structure"
);

/** Tags de delivery vocale */
export const DELIVERY_TAGS = SUNO_TAGS.filter(
  (t) => t.category === "delivery"
);

/** Metatags créatifs (expérimentaux) */
export const METATAGS = SUNO_TAGS.filter(
  (t) => t.category === "metatag"
);

/**
 * Non-lexical vocables — sons chantés sans signification.
 * Enrichissent les transitions, post-chorus et outros.
 */
export const NON_LEXICAL_VOCABLES = [
  { vocable: "oh-oh-oh", usage: "Refrains, post-chorus" },
  { vocable: "la la la", usage: "Outros, interludes légers" },
  { vocable: "na na na", usage: "Hooks pop/rock" },
  { vocable: "do do do", usage: "Intros joyeuses" },
  { vocable: "ooh / aah", usage: "Harmonies, transitions" },
  { vocable: "hey! / ho!", usage: "Anthems, énergie collective" },
  { vocable: "mm-mmm", usage: "Sections intimes" },
  { vocable: "yeah! / uh!", usage: "Ad-libs hip-hop" },
] as const;
