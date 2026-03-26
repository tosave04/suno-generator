# Release Notes — v0.6.0 · Phase 5 : Upload Audio

> **Date :** 26 mars 2026 · **Phase :** 5/6 · **Statut :** ✅ Terminée

---

## Résumé

Les générations peuvent désormais recevoir un fichier audio MP3 ou WAV. La zone d'upload est intégrée directement sous le résultat de génération, toujours visible. L'utilisateur peut glisser-déposer un fichier, le remplacer ou le supprimer. Un player HTML5 natif permet l'écoute en ligne. La sidebar propose un nouveau filtre "Audio" pour n'afficher que les générations ayant un fichier audio associé.

---

## Ce qui est livré

### Upload audio
- **Validation stricte** via schéma Zod : formats MP3/WAV uniquement, taille max 20 Mo, vérification type MIME
- **Double validation** : côté client (feedback immédiat) + côté serveur (sécurité)
- **Stockage** dans `public/uploads/` avec nom de fichier sécurisé basé sur l'ID de génération
- **Remplacement** automatique : un nouvel upload supprime l'ancien fichier avant d'écrire le nouveau

### Server Actions
- `uploadAudio(formData)` : extraction FormData → validation Zod → écriture disque → MAJ BDD → revalidation
- `deleteAudio({ generationId })` : suppression fichier + reset BDD → revalidation
- Défense en profondeur : double vérification taille et type MIME au-delà de Zod

### Composant d'upload
- **Drag & drop** avec retour visuel (bordure accent au survol)
- **Sélection fichier** via clic sur la zone ou bouton
- **État loading** avec spinner pendant l'upload
- **Player audio** HTML5 natif intégré avec contrôles complets
- **Actions** : boutons Remplacer et Supprimer stylés

### Filtre sidebar
- Nouveau bouton toggle **"Audio"** dans les filtres rapides, à côté de "Favoris"
- Filtre les générations ayant un `audioFile` non-null en BDD

### Intégration
- Section "Fichier audio" toujours visible sous les tabs Lyrics/Réglages (pas cachée dans un onglet)
- Refresh automatique de la sidebar après upload/suppression
- Icône Music dans les cards sidebar quand un audio est associé (existant depuis Phase 4)

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
| Routes | `/compose` (upload intégré) |

---

## Fichiers impactés

### Nouveaux
- `lib/schemas/upload.ts`
- `lib/actions/upload.ts`
- `components/composition/audio-upload.tsx`
- `__tests__/upload.test.ts`

### Modifiés
- `lib/actions/generation.ts`
- `components/composition/generation-output.tsx`
- `components/sidebar/sidebar-filters.tsx`
- `app/(dashboard)/compose/page.tsx`
