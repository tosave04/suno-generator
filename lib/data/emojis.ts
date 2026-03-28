/** Emoji maps centralisées — importables depuis Server et Client Components */

export const GENRE_EMOJIS: Record<string, string> = {
  pop: "🎤", rock: "🎸", hiphop: "🎧", jazz: "🎷",
  electronic: "🎹", rnb: "🎵", country: "🤠", classical: "🎻",
  metal: "🤘", folk: "🪕", reggae: "🌴", latin: "💃",
  blues: "🎺", funk: "🕺", soul: "✨", indie: "🌙",
  punk: "⚡", ambient: "🌊", kpop: "💖", "16bit": "👾",
  celtic: "☘️", afroworld: "🥁", disco: "💿",
  middleeastern: "🏜️", indian: "🐘", japanese: "🎋",
};

export const MOOD_EMOJIS: Record<string, string> = {
  joyful: "😊", melancholic: "😢", energetic: "⚡", calm: "😌", aggressive: "😤",
  romantic: "💕", dark: "🌑", uplifting: "🌟", nostalgic: "🥀", epic: "🔥",
  chaos: "🌀",
};

export const STYLE_ICONS: Record<string, string> = {
  poetic: "✒️", storytelling: "📖", direct: "🎯", abstract: "🌀",
  conversational: "💬", anthem: "🏟️",
};

export const LANG_FLAGS: Record<string, string> = {
  en: "gb", fr: "fr", es: "es", pt: "br", ja: "jp", ko: "kr",
  de: "de", it: "it", ru: "ru", hi: "in", ar: "sa", zh: "cn",
};

/** Icônes alternatives pour les langues sans drapeau */
export const LANG_ICONS: Record<string, string> = {
  qya: "🧝",
};

export const TEMPO_EMOJIS: Record<string, string> = {
  "Very Slow": "🐢", "Slow": "🚶", "Medium": "🏃", "Fast": "⚡", "Very Fast": "🔥",
};

export const LENGTH_EMOJIS: Record<string, string> = {
  short: "⏱️", radio: "📻", standard: "🎵", long: "🎶",
};
