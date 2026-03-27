# Changelog — v1.1.0 : Enrichissement Musical & Transparence IA

**Date :** 27 mars 2026

---

## Nouveaux genres (8 ajouts → 26 total)

### Fichiers modifiés
- `lib/data/genres.ts` — Ajout de 8 genres complets (sous-genres, BPM, structure, instruments, vocals, sunoTags, promptKeywords, avoidKeywords)

### Genres ajoutés
| Genre | Emoji | Description |
|-------|-------|-------------|
| K-Pop | 💖 | Pop coréenne avec hooks percutants, alternance rap/chant |
| 16-Bit | 👾 | Chiptune et musique retro-gaming 8/16-bit |
| Celtic | ☘️ | Musique celtique traditionnelle et contemporaine |
| Afroworld | 🥁 | Afrobeats, Amapiano, Highlife, Afropop |
| Disco | 💿 | Disco classique, Nu-Disco, Space Disco |
| Middle Eastern | 🏜️ | Musique du Moyen-Orient (Arabesk, Rai, Dabke) |
| Indian | 🐘 | Bollywood, Carnatic, Bhangra |
| Japanese | 🎋 | J-Pop, City Pop, Enka, Shibuya-kei |

### Corrections émojis genre-selector
- `components/composition/genre-selector.tsx` — Clés corrigées (`hip-hop`→`hiphop`, `r&b`→`rnb`) + émojis Windows-compatible pour tous les nouveaux genres

---

## Nouvelles langues (4 ajouts → 12 total)

### Fichiers modifiés
- `lib/services/context-builder.ts` — Ajout dans LANGUAGE_MAP
- `components/composition/params-panel.tsx` — Ajout dans le sélecteur avec drapeaux

### Langues ajoutées
| Langue | Code | Drapeau |
|--------|------|---------|
| Russe | `ru` | 🇷🇺 |
| Hindi | `hi` | 🇮🇳 |
| Arabe | `ar` | 🇸🇦 |
| Chinois | `zh` | 🇨🇳 |

---

## Feature : Atmosphères culturelles (11 atmosphères)

### Fichiers créés
- `lib/data/types.ts` — Interface `AtmosphereData` (id, name, emoji, description, scales, keyInstruments, characteristics, promptKeywords, avoidKeywords)
- `lib/data/atmospheres.ts` — 11 atmosphères complètes
- `components/composition/atmosphere-selector.tsx` — Composant toggle badges

### Fichiers modifiés
- `lib/schemas/generation.ts` — Champ `atmosphere: z.string().optional()`
- `lib/services/context-builder.ts` — Import atmosphères, `buildAtmosphereContext()`, intégration dans `buildSystemPrompt()`
- `app/(dashboard)/compose/page.tsx` — État `atmosphere`, prop `AtmosphereSelector`

### Atmosphères disponibles
| Atmosphère | Emoji | Description |
|------------|-------|-------------|
| Arabic | 🏜️ | Gammes orientales, oud, darbuka |
| Asian | 🎋 | Gammes pentatoniques, guzheng, koto |
| African | 🥁 | Polyrythmies, djembé, balafon |
| Latin | 💃 | Rythmes clave, cuivres, percussions |
| Western | 🎶 | Harmonies classiques pop/rock/blues |
| European | 🏰 | Orchestral, accordéon, classique |
| Indian | 🐘 | Gammes raga, sitar, tabla |
| Hybrid | 🌍 | Fusion multi-culturelle |
| Nordic | ❄️ | Atmosphères froides, nyckelharpa |
| Russian | 🐻 | Gammes slaves, balalaïka, chœurs |
| Slavic | 🌾 | Accords slaves, gusli, accordéon |

---

## Feature : Onglet Prompt IA (transparence DeepSeek)

### Fichiers modifiés
- `prisma/schema.prisma` — Nouveau champ `systemPrompt String?`
- `lib/actions/generation.ts` — `GenerationData.systemPrompt`, sauvegarde en BDD dans `createGeneration`, retour dans `getGenerationById`
- `components/composition/generation-output.tsx` — Nouvel onglet "Prompt IA" avec `SystemPromptView` (affichage scrollable + bouton copier)
- `app/(dashboard)/compose/page.tsx` — Prop `systemPrompt` passée à `GenerationResult`

### Fonctionnement
- Le prompt système complet envoyé à DeepSeek est persisté en base à chaque génération
- Visible dans l'onglet "Prompt IA" du résultat
- Bouton copier pour réutilisation/debug
- Fallback "non disponible" pour les anciennes générations

---

## Documentation mise à jour
- `docs/SPECIFICATIONS.md` — 26 genres, 12 langues, 11 atmosphères, interface AtmosphereData, architecture Context Builder

---

## Tests & Validation

| Métrique | Valeur |
|----------|--------|
| Tests unitaires + intégration | 95 (tous passent) |
| Lint ESLint | 0 erreur |
| Build TypeScript | 0 erreur |
| Migration Prisma | Appliquée (db push) |
