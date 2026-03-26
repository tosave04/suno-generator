# Changelog — v0.6.0 · Phase 5 : Upload Audio

> **Date :** 26 mars 2026

---

## Ajouts

### Schéma Zod
- `lib/schemas/upload.ts` — `uploadAudioSchema` : validation generationId, nom de fichier (extension `.mp3`/`.wav`), taille (1 octet à 20 Mo), type MIME (`audio/mpeg`, `audio/wav`, `audio/wave`, `audio/x-wav`)
- `lib/schemas/upload.ts` — `deleteAudioSchema` : validation generationId
- Constantes exportées : `ACCEPTED_AUDIO_FORMATS`, `ACCEPTED_EXTENSIONS`, `MAX_FILE_SIZE`

### Server Actions
- `lib/actions/upload.ts` — `uploadAudio(formData)` : extraction File + generationId du FormData, double validation (Zod + défense en profondeur), suppression ancien fichier si remplacement, écriture disque dans `public/uploads/`, MAJ BDD (audioFile + audioFormat), revalidation
- `lib/actions/upload.ts` — `deleteAudio({ generationId })` : validation Zod, suppression fichier disque, reset champs BDD, revalidation
- `lib/actions/upload.ts` — `deleteFileFromDisk(relativePath)` : utilitaire interne, silencieux si fichier inexistant

### Composant Upload
- `components/composition/audio-upload.tsx` — `AudioUpload` : composant client avec drag & drop, sélection fichier, validation côté client rapide (taille + extension), `useTransition` pour état loading
- `components/composition/audio-upload.tsx` — `DropZone` : zone dashed avec icône Upload, texte d'aide, état drag-over visuel, état loading avec spinner
- `components/composition/audio-upload.tsx` — `AudioPlayer` : player HTML5 natif avec contrôles, icône Music, boutons Remplacer et Supprimer

### Filtre Sidebar
- `components/sidebar/sidebar-filters.tsx` — Bouton filtre "Audio" (toggle) dans les filtres rapides, à côté de "Favoris"

### Tests
- `__tests__/upload.test.ts` — 14 tests : validation MP3, WAV, audio/wave, rejet >20 Mo, rejet 0 octets, rejet OGG, rejet PDF, rejet generationId vide, rejet fileName vide, taille limite exacte, deleteAudioSchema valide/invalide, constantes MAX_FILE_SIZE et ACCEPTED_EXTENSIONS

---

## Modifications

### `lib/actions/generation.ts`
- `GenerationData` : ajout champ `audioFile: string | null`
- `GenerationFilters` : ajout champ `withAudio?: boolean`
- `createGeneration` : retourne `audioFile: null` dans la réponse
- `getGenerationById` : retourne `audioFile: generation.audioFile ?? null`
- `getGenerations` : filtre `where.audioFile = { not: null }` si `withAudio` actif

### `components/composition/generation-output.tsx`
- Import `AudioUpload` 
- `GenerationResult` : nouvelles props `generationId`, `audioFile`, `onAudioChange`
- Section "Fichier audio" toujours visible sous les tabs (séparée par border-top)

### `components/sidebar/sidebar-filters.tsx`
- Import `Music` de Lucide
- Bouton toggle "Audio" avec icône Music, style actif/inactif

### `app/(dashboard)/compose/page.tsx`
- `handleAudioChange` callback : met à jour `result.audioFile` + incrémente `refreshKey` pour refresh sidebar
- `GenerationResult` : passage des nouvelles props `generationId`, `audioFile`, `onAudioChange`

---

## Métriques

| Métrique | Valeur |
|---|---|
| Fichiers créés | 4 |
| Fichiers modifiés | 4 |
| Tests ajoutés | 14 |
| Tests totaux | 86 (tous passent) |
| Lint | ✅ 0 erreur |
| Build | ✅ succès |
