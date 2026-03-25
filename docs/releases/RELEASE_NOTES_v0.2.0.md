# Release Notes — v0.2.0 · Phase 1 : Données musicales

> **Date :** 25 mars 2026 · **Phase :** 1/6 · **Statut :** ✅ Terminée

---

## Résumé

Le corpus complet de données musicales est constitué. Il contient 18 genres, 10 moods, 6 styles d'écriture, 22 tags Suno et 22 règles de théorie musicale. Ce corpus sera directement exploité par le Context Builder (Phase 3) pour assembler des prompts IA de haute qualité.

---

## Ce qui est livré

### Types TypeScript (`lib/data/types.ts`)
- 5 interfaces typées : `GenreData`, `MoodData`, `WritingStyleData`, `SunoTag`, `MusicRule`
- Typage strict sans `as any`, union types pour `applicableGenres`

### 18 Genres musicaux (`lib/data/genres.ts`)
Pop, Rock, Hip-Hop, Jazz, Electronic, R&B, Country, Classical, Metal, Folk, Reggae, Latin, Blues, Funk, Soul, Indie, Punk, Ambient — chacun avec 12 champs détaillés : description, sous-genres, BPM, structure, instruments, vocal, historique, tags Suno, keywords, exclusions.

### 10 Moods (`lib/data/moods.ts`)
Joyful, Melancholic, Energetic, Calm, Aggressive, Romantic, Dark, Uplifting, Nostalgic, Epic — chacun avec champs lexicaux (10 mots), caractéristiques musicales, genres compatibles vérifiés et modificateurs de prompt.

### 6 Styles d'écriture (`lib/data/styles.ts`)
Poetic, Storytelling, Direct, Abstract, Conversational, Anthem — chacun avec 6 règles de rédaction, 3 exemples concrets et 4 conseils de formatage Suno.

### 22 Tags Suno 2026 (`lib/data/suno-tags.ts`)
Référence complète en 4 catégories : structure (Intro, Verse, Pre-Chorus, Chorus, Post-Chorus, Bridge, Outro, Hook, Break, Fade Out), instrumental (Instrumental, Solo, Interlude), vocal/delivery (whisper, shout, spoken, echo, choir, ad-lib).

### 22 Règles musicales (`lib/data/music-rules.ts`)
Règles transversales de théorie musicale couvrant : structure de chanson, longueur des sections, durée Suno, harmonie (majeur/mineur, progressions d'accords), rythme (tempo/syllabes, swing), lyrics (show don't tell, rimes, hook-first, chantabilité), production (prompts Suno, négatif, mélange de genres), et règles spécifiques par genre (hip-hop bars, electronic minimal, blues AAB, country storytelling, metal vocals).

### Tests unitaires (`__tests__/music-data.test.ts`)
18 tests couvrant : quantités minimales, unicité des IDs, validité des champs, BPM réalistes, cohérence inter-données (moods → genres, rules → genres), présence des tags essentiels.

---

## Métriques

| Métrique | Valeur |
|---|---|
| Fichiers créés | 7 |
| Genres musicaux | 18 |
| Moods | 10 |
| Styles d'écriture | 6 |
| Tags Suno | 22 |
| Règles musicales | 22 |
| Tests unitaires | 18 (tous passent) |
| Lint | ✅ 0 erreur |
| Build | ✅ succès |

---

## Prochaine étape

**Phase 2 — Interface de composition** : construire l'interface principale du dashboard avec les sélecteurs de genre, mood, style, les composants UI de base et la page de composition.
