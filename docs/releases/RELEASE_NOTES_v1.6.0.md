# 📦 Release Notes — v1.6.0

**Audio URL, Stats & UX**
**Date :** 28 mars 2026

---

## 🎯 Résumé

Refactoring majeur de l'upload audio : remplacement du système de fichiers (drag & drop MP3/WAV) par un système de **liens URL** (Suno, YouTube). Centralisation des emojis pour les statistiques (Server Components). Drapeaux de langues via flagcdn.com (compatibles Windows). Améliorations UX du coverflow genres (recentrage + shift global). Favicon.

---

## ✨ Nouveautés

### Liens audio URL (remplace l'upload fichier)

Le composant d'upload de fichiers audio est remplacé par un champ de saisie d'URL. Les liens acceptés sont :

| Plateforme | Préfixe |
|------------|---------|
| **Suno** | `https://suno.com/s/…` |
| **YouTube** | `https://www.youtube.com/watch?v=…` |
| **YouTube (court)** | `https://youtu.be/…` |

- Validation côté client et serveur (Zod)
- Bouton "Lier" pour associer, lien externe cliquable, suppression en un clic
- Plus aucun stockage fichier sur disque

### Emojis dans les statistiques

Tous les emojis (genres, moods, styles, tempos, durées) apparaissent désormais dans la page Stats grâce à un fichier centralisé `lib/data/emojis.ts` compatible Server Components.

### Drapeaux de langues

Les drapeaux Unicode (non supportés sur Windows) sont remplacés par des images `flagcdn.com` dans les classements de langues. Les langues sans drapeau (ex: Elfique 🧝) utilisent un emoji de fallback.

### Coverflow genres amélioré

- **Recentrage automatique** au `mouseLeave` : le coverflow revient à la position centrale
- **Shift horizontal global** : le carousel entier se décale légèrement selon la position de la souris (amplitude configurable `FLOW_SHIFT_PX = 120`)

### Favicon

Icône SVG avec fond sombre et notes de musique en dégradé violet, cohérent avec le thème de l'application.

---

## 🔧 Détails techniques

- **Prisma** : `audioFile` + `audioFormat` → `audioUrl` (migration destructive)
- **Schéma Zod** : `audioUrlSchema` avec validation de préfixes URL
- **Actions** : `saveAudioUrl()` + `deleteAudio()` (plus de logique fichier)
- **`lib/data/emojis.ts`** : maps centralisées sans `"use client"`
- **`topN()`** : paramètre `split` pour valeurs CSV (genres, langues multi-sélection)
- **Coverflow** : `FLOW_SHIFT_PX`, `flowShift` state, `onMouseLeave` recenter

---

## ⚠️ Breaking Changes

- **Base de données** : les champs `audioFile` et `audioFormat` sont supprimés, remplacés par `audioUrl`. Les données audio existantes sont perdues (reset BDD nécessaire).
- **API** : `uploadAudio(formData)` supprimé, remplacé par `saveAudioUrl({generationId, audioUrl})`

---

## 📊 Métriques

| Métrique | Valeur |
|----------|--------|
| Fichiers créés | 2 |
| Fichiers modifiés | 12+ |
| Tests | 101/101 ✅ |
| Lint | ✅ 0 erreur |
| Build | ✅ 0 erreur |

---

## 📋 Fichiers principaux

- `prisma/schema.prisma` — `audioUrl` remplace `audioFile` + `audioFormat`
- `lib/data/emojis.ts` — Maps d'emojis centralisées (NOUVEAU)
- `lib/schemas/upload.ts` — Validation URL (réécrit)
- `lib/actions/upload.ts` — `saveAudioUrl` + `deleteAudio` (réécrit)
- `lib/actions/generation.ts` — `audioUrl` partout
- `lib/actions/stats.ts` — `topN()` avec `split`
- `components/composition/audio-upload.tsx` — `AudioLink` (réécrit)
- `components/composition/genre-selector.tsx` — Recentrage + shift
- `app/(dashboard)/stats/page.tsx` — Flags flagcdn + emojis
- `app/icon.svg` — Favicon (NOUVEAU)
