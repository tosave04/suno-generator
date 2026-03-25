# Changelog — v0.4.0 · Phase 3 : Génération IA

> **Date :** 25 mars 2026

---

## Ajouts

### Schémas Zod (`lib/schemas/generation.ts`)
- `createGenerationSchema` — Validation des entrées utilisateur (genre, mood, style, tempo, langue, vocalStyle, userPrompt min 10 chars)
- `generationResponseSchema` — Validation de la réponse IA : title, lyrics, positivePrompt, negativePrompt, sunoSettings (vocalGender Male/Female, weirdness 0-100, styleInfluence 0-100)

### Calcul de statistiques (`lib/utils/stats.ts`)
- `computeStats()` — Nombre de mots, caractères, sections, durée estimée (basée sur le BPM)
- `stripTags()` — Nettoyage des tags Suno pour l'analyse du texte brut

### Context Builder (`lib/services/context-builder.ts`)
- `buildSystemPrompt()` — Assemblage du prompt système à partir des paramètres utilisateur
- Contexte genre : description, sous-genres, BPM, structure typique, instruments, caractéristiques vocales, historique, mots-clés
- Contexte mood : champs lexicaux, caractéristiques musicales, genres compatibles
- Contexte style : règles d'écriture, exemples, formatage Suno
- Référence complète des tags Suno (structure + delivery)
- Règles musicales filtrées par genre
- Format de sortie JSON strict avec instructions détaillées pour l'IA
- Bonnes pratiques Suno intégrées : prompts en anglais, negative prompt avec "no", limites de longueur

### Client DeepSeek (`lib/services/deepseek.ts`)
- `callDeepSeek()` — Appel API avec parsing JSON et validation Zod
- Auto-détection du modèle (deepseek-chat vs deepseek-reasoner)
- Pas de rôle système ni temperature pour le reasoner
- `DeepSeekError` typée avec messages clairs
- Extraction JSON robuste depuis les réponses (regex fallback)

### Server Action (`lib/actions/generation.ts`)
- `createGeneration()` — Flow complet : validation Zod → Context Builder → DeepSeek → stats → sauvegarde Prisma → `revalidatePath("/compose")`
- Export `GenerationData` et `SunoSettings` pour typage des composants
- Réponse typée success/error sans `as any`

### Intégration page `/compose`
- Appel Server Action depuis le bouton Générer via `useTransition`
- Affichage du résultat : `GenerationResult` avec titre, lyrics, prompt+, prompt−, réglages Suno
- États : loading (spinner), erreur (banner rouge), succès (résultat tabé)

### Documentation Suno (`docs/suno/`)
- `README.md` — Guide principal : Custom Mode (6 champs), modèles V3.5/V4/V4.5, écosystème complet (Song Editor, Extend, Persona, Cover, Stem Separation, Studio), règles d'or, théorie musicale, sources
- `01-LYRICS-STRUCTURE.md` — Tags de structure/delivery, structures par genre (Pop, Hip-Hop, Blues, Electronic), vocables non-lexicaux, technique Extend, tag `[end]`, chantabilité, schémas de rimes
- `02-PROMPTS.md` — Anatomie du positive prompt (8 catégories), formules par genre (10), negative prompt "no", metatags créatifs, mots-clés à fort impact, Prompt Enhancement Helper
- `03-SETTINGS-ADVANCED.md` — Vocal Gender, Weirdness (0-100%), Style Influence (0-100%), matrice combinée, Persona, Song Editor, Cover, Studio, Stem Separation, distribution/droits

### Audit & corrections des données musicales
- `suno-tags.ts` — Ajout `[end]`, `[Drop]`, 4 metatags créatifs (`[laughter]`, `[piano interlude]`, `[fast rap verse]`, `[slow emotional bridge]`), `NON_LEXICAL_VOCABLES` (8 vocables), fix catégorie `(instrumental)` vocal→delivery, suppression doublon `[Ad-lib]`
- `types.ts` — Catégorie `vocal` remplacée par `metatag` dans `SunoTag`
- `genres.ts` — Tags non-standard corrigés : Jazz `Head`→`Verse`+`Intro`, Electronic `Build-up`→`Verse`/`Breakdown`→`Break`, Metal/Funk `Breakdown`→`Break`
- `music-rules.ts` — 5 règles ajoutées : limite 200 chars prompt+, limite 120 chars prompt−, anglais obligatoire, 200-300 mots lyrics, ordre des mots
- `params-panel.tsx` — Ranges BPM affichés sous chaque tempo (50-70, 70-90, 90-120, 120-150, 150+)
- `context-builder.ts` — Suppression fallback catégorie `vocal` obsolète

### Tests (`__tests__/generation.test.ts`)
- 5 tests schémas Zod (validation input, rejet, validation réponse IA, champs optionnels, bornes numériques)
- 6 tests Context Builder (prompt non vide, contenu genre/mood/style, tags Suno, règles, format JSON)
- 8 tests stats (word count, char count, sections, durée estimée, texte vide, tags exclus)
- Test composition adapté pour nouveau markup tempo BPM

---

## Corrections

- Fix modèle DeepSeek : `deepseek-reasoner` → `deepseek-chat` par défaut (reasoner ne supporte pas system role/temperature)
- Fix chemin BDD : `prisma/dev.db` → `./dev.db` (racine projet)
- Fix format sortie IA : alignement complet sur le Custom Mode réel de Suno (title, sunoSettings au lieu d'advancedSettings)

---

## Métriques

| Métrique | Valeur |
|---|---|
| Fichiers créés | 9 (5 lib + 4 docs) |
| Fichiers modifiés | 8 (données + composants + tests) |
| Tests ajoutés | 28 |
| Tests totaux | 59 (tous passent) |
| Lint | ✅ 0 erreur |
| Build | ✅ succès |
