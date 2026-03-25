# Changelog — v0.2.0 · Phase 1 : Données musicales

> **Date :** 25 mars 2026

---

## Ajouts

### Types TypeScript (`lib/data/types.ts`)
- Interface `GenreData` — 12 champs (id, name, description, subGenres, typicalBpm, typicalStructure, keyInstruments, vocalCharacteristics, historicalContext, sunoTags, promptKeywords, avoidKeywords)
- Interface `MoodData` — 7 champs (id, name, description, lexicalFields, musicalCharacteristics, compatibleGenres, promptModifiers)
- Interface `WritingStyleData` — 6 champs (id, name, description, rules, examples, sunoFormatting)
- Interface `SunoTag` — 4 champs (tag, description, category, usage)
- Interface `MusicRule` — 5 champs (id, category, title, description, applicableGenres)

### Genres musicaux (`lib/data/genres.ts`)
- 18 genres complets : Pop, Rock, Hip-Hop, Jazz, Electronic, R&B, Country, Classical, Metal, Folk, Reggae, Latin, Blues, Funk, Soul, Indie, Punk, Ambient
- Chaque genre inclut : description, 6-8 sous-genres, range BPM, structure type, instruments clés, caractéristiques vocales, contexte historique, tags Suno, mots-clés de prompt, mots-clés à éviter

### Moods (`lib/data/moods.ts`)
- 10 moods : Joyful, Melancholic, Energetic, Calm, Aggressive, Romantic, Dark, Uplifting, Nostalgic, Epic
- Chaque mood inclut : description, 10 mots de champ lexical, caractéristiques musicales, genres compatibles (vérifiés), modificateurs de prompt

### Styles d'écriture (`lib/data/styles.ts`)
- 6 styles : Poetic, Storytelling, Direct, Abstract, Conversational, Anthem
- Chaque style inclut : description, 6 règles de rédaction, 3 exemples concrets, 4 conseils de formatage Suno

### Tags Suno (`lib/data/suno-tags.ts`)
- 22 tags en 4 catégories : structure (11), instrumental (3), vocal (2), delivery (6)
- Exports filtrés : `STRUCTURE_TAGS`, `DELIVERY_TAGS`

### Règles musicales (`lib/data/music-rules.ts`)
- 22 règles transversales en 6 catégories : structure (4), harmony (3), rhythm (2), lyrics (4), production (3), genre-specific (6)
- Genres applicables vérifiés pour les règles spécifiques

### Tests (`__tests__/music-data.test.ts`)
- 18 tests unitaires couvrant : quantités minimales, unicité des ids, champs requis non vides, BPM réalistes, cohérence inter-données (genres référencés existants), tags essentiels présents

---

## Corrections

- Aucune

---

## Breaking Changes

- Aucun
