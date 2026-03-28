# Changelog v1.4.0 — Structures & Durée

**Date :** 28 mars 2026
**Type :** Release mineure

---

## 🎯 Objectif

Ajouter 2 nouvelles longueurs de structure (`radioStructure`, `longStructure`) aux 26 genres musicaux, en complément des structures existantes (`shortStructure`, `typicalStructure`). Adapter l'ensemble de la chaîne : types, données, schéma Zod, UI, Context Builder, random composition.

---

## ✅ Changements

### Types — `lib/data/types.ts`

- Ajout de `radioStructure: string[]` dans `GenreData`
- Ajout de `longStructure: string[]` dans `GenreData`
- Ordre des champs : `shortStructure`, `radioStructure`, `typicalStructure`, `longStructure`

### Données — `lib/data/genres.ts`

- **26 genres** enrichis avec 2 nouvelles structures chacun :
  - `radioStructure` : ~3 min, va à l'essentiel (pas d'intro en général), entre short et typical
  - `longStructure` : ~5-6 min, sections étendues avec solos, breaks et reprises supplémentaires
- Structures adaptées au caractère de chaque genre (ex: ambient → Evolution/Climax étendu, blues → 12-bar répétés, kpop → Dance Break + Solo)

### Schéma Zod — `lib/schemas/generation.ts`

- `songLength` étendu de `["short", "standard"]` à `["short", "radio", "standard", "long"]`

### UI — `components/composition/song-length-selector.tsx`

- Type `SongLength` = `"short" | "radio" | "standard" | "long"`
- 4 options affichées : Courte (~2 min), Radio (~3 min), Standard (~4 min), Longue (~5-6 min)

### Context Builder — `lib/services/context-builder.ts`

- `buildGenreContext()` : sélection de structure via `structureMap` (4 clés)
- Instructions de longueur adaptées :
  - `short` : 100-150 mots, 1-2 min
  - `radio` : 150-200 mots, ~3 min, pas d'intro
  - `standard` : pas d'instruction spéciale (par défaut)
  - `long` : 350-450 mots, 5-6 min, développement thématique

### Random Composition — `lib/utils/random-composition.ts`

- Remplacement `SONG_LENGTH_STANDARD_CHANCE` par `SONG_LENGTH_WEIGHTS`
- Poids : short:1, radio:2, standard:5, long:2
- Type `RandomComposition.songLength` étendu à 4 valeurs

### Page Compose — `app/(dashboard)/compose/page.tsx`

- État `songLength` typé avec les 4 valeurs

---

## 📊 Métriques

- **Fichiers modifiés :** 7
- **Genres enrichis :** 26 (radioStructure + longStructure)
- **Lint :** ✅ 0 erreur
- **Build :** ✅ 0 erreur
- **Tests :** 89 passent (4 échecs pré-existants non liés)
