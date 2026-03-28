# Changelog v1.6.0 — Audio URL, Stats & UX

**Date :** 28 mars 2026
**Type :** Release mineure

---

## 🎯 Objectif

Refactoring complet de l'upload audio vers un système de liens URL (Suno, YouTube). Centralisation des emojis pour les stats. Drapeaux de langues via flagcdn. Améliorations UX du coverflow genres. Ajout d'un favicon.

---

## ✅ Changements

### Refactoring Audio : Upload fichier → Lien URL

Remplacement complet du système d'upload de fichiers audio (MP3/WAV, drag & drop, stockage disque) par un système de liaison d'URL externes.

#### Prisma — `prisma/schema.prisma`

- Suppression des champs `audioFile String?` et `audioFormat String?`
- Ajout du champ `audioUrl String?`
- Reset de la base de données (migration destructive)

#### Schéma Zod — `lib/schemas/upload.ts`

- `ACCEPTED_URL_PREFIXES` : `["https://suno.com/s/", "https://www.youtube.com/watch?v=", "https://youtu.be/"]`
- `audioUrlSchema` : validation `generationId` + `audioUrl` avec vérification des préfixes acceptés
- `deleteAudioSchema` : validation `generationId`
- Suppression de `ACCEPTED_FORMATS`, `MAX_FILE_SIZE`, schéma FormData

#### Actions — `lib/actions/upload.ts`

- `saveAudioUrl({generationId, audioUrl})` : valide, vérifie existence de la génération, sauvegarde l'URL
- `deleteAudio({generationId})` : met `audioUrl` à `null`
- Suppression de `uploadAudio(formData)`, `deleteFileFromDisk()`, toute logique fichier

#### Actions — `lib/actions/generation.ts`

- `GenerationData` / `GenerationSummary` : `audioFile` → `audioUrl`
- `getGenerations` : filtre `audioUrl: { not: null }` pour `withAudio`
- `deleteGeneration` : suppression de la logique de suppression de fichier disque
- `createGeneration` : retourne `audioUrl: null`

#### Composant — `components/composition/audio-upload.tsx`

- Réécriture complète : `AudioUpload` (drag & drop) → `AudioLink` (champ URL + bouton "Lier")
- Validation côté client des préfixes d'URL acceptés
- Affichage du lien avec icône externe + bouton de suppression
- Texte d'aide : "Liens acceptés : suno.com/s/… · youtube.com · youtu.be"

#### Composants consommateurs

- `generation-output.tsx` : `AudioUpload` → `AudioLink`, props `audioUrl`/`onAudioChange`
- `generation-card.tsx` : `audioFile` → `audioUrl` pour l'icône Music
- `sidebar-filters.tsx` : `audioFile` → `audioUrl` dans le label tooltip
- `compose/page.tsx` : `audioFile` → `audioUrl` dans l'état et le handler

#### Tests — `__tests__/upload.test.ts`

- 14 tests upload → 12 tests URL (9 audioUrlSchema + 2 deleteAudioSchema + 1 constantes)
- Couverture : URLs valides (suno, youtube, youtu.be), URLs invalides, préfixes manquants

---

### Centralisation des emojis — `lib/data/emojis.ts` (NOUVEAU)

Fichier centralisé (sans `"use client"`) exportant toutes les maps d'emojis pour usage dans les Server Components (stats) et Client Components (sélecteurs).

- `GENRE_EMOJIS` : 26 genres → emojis
- `MOOD_EMOJIS` : 11 moods → emojis (dont Chaos 🌀)
- `STYLE_ICONS` : 6 styles → emojis
- `TEMPO_EMOJIS` : 5 tempos → emojis
- `LENGTH_EMOJIS` : 4 longueurs → emojis
- `LANG_FLAGS` : 12 codes langue → code pays (pour flagcdn.com)
- `LANG_ICONS` : langues alternatives (qya → 🧝)

Les sélecteurs client (`genre-selector`, `mood-selector`, `style-selector`) réexportent depuis `emojis.ts`.

---

### Drapeaux de langues — `app/(dashboard)/stats/page.tsx`

- Remplacement des emojis Unicode drapeaux (incompatibles Windows) par des images `flagcdn.com`
- `LANG_FLAGS` pour les langues avec code pays, `LANG_ICONS` pour les langues alternatives
- Prop `renderIcon` sur `RankingCard` pour rendu personnalisé d'icônes

---

### Stats : support multi-valeurs — `lib/utils/stats.ts`

- `topN()` accepte un paramètre `split` (3ème argument, booléen)
- Quand `split=true`, les valeurs CSV (`"rock,pop"`) sont séparées et comptées individuellement
- Utilisé pour `topGenres` et `topLanguages`

---

### Coverflow genres : recentrage & shift global

#### Recentrage au mouse leave — `components/composition/genre-selector.tsx`

- `onMouseLeave` recentre le coverflow sur l'élément du milieu du tableau
- Réinitialise le `flowShift` à 0

#### Shift horizontal global

- Constante `FLOW_SHIFT_PX = 120` : amplitude maximale du décalage
- `flowShift` calculé à partir de la position horizontale de la souris
- Appliqué via `transform: translateX(${flowShift}px)` sur le container interne
- Transition CSS fluide

---

### Favicon — `app/icon.svg` (NOUVEAU)

- Fond arrondi sombre (#0a0a0a)
- Notes de musique en dégradé violet (#a855f7 → #7c3aed) cohérent avec le thème accent

---

## 📊 Métriques

- **Fichiers créés :** 2 (`lib/data/emojis.ts`, `app/icon.svg`)
- **Fichiers modifiés :** 12+
- **Tests :** 101/101 passent
- **Lint :** ✅ 0 erreur
- **Build :** ✅ 0 erreur
