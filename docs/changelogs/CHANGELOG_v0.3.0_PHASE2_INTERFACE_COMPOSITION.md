# Changelog — v0.3.0 · Phase 2 : Interface de composition

> **Date :** 25 mars 2026

---

## Ajouts

### Tokens de couleur (`app/globals.css`)
- 12 variables CSS (background, foreground, muted, accent, border, ring, destructive, success, warning)
- Thème clair + thème sombre (`prefers-color-scheme: dark`)
- Mapping `@theme inline` Tailwind pour toutes les couleurs
- Font-family avec fallback Geist Sans

### Composants UI (`components/ui/`)
- `button.tsx` — 5 variantes (primary, secondary, ghost, destructive, icon), 3 tailles (sm, md, lg), états loading (spinner Loader2) et disabled, `forwardRef`
- `badge.tsx` — 3 variantes (default, active, mood) + 18 couleurs de genre musical, prop `genreId` pour couleur automatique

### Composants de composition (`components/composition/`)
- `genre-selector.tsx` — Grid responsive (2→3→4 colonnes) de 18 genres avec émojis, état sélectionné (border-accent + bg-accent/10), sous-genres affichés
- `mood-selector.tsx` — Grid de badges cliquables pour 10 moods, état sélectionné (ring accent)
- `style-selector.tsx` — Radio group responsive (2→3 colonnes) pour 6 styles d'écriture, inputs cachés avec labels stylisés
- `params-panel.tsx` — Grid responsive (1→3 colonnes) : boutons segmentés tempo (5 options), dropdown langue (8 langues), dropdown style vocal (7 options)
- `prompt-input.tsx` — Textarea avec limite 2000 caractères, compteur en temps réel, 4 exemples cliquables
- `generation-output.tsx` — Zone de résultat avec tabs (Lyrics, Prompt+, Prompt−, Réglages), coloration des tags Suno (`[Verse]`, `[Chorus]`…), état vide avec icône Music, composant `GenerationResult` prêt pour Phase 3

### Layout Dashboard (`app/(dashboard)/layout.tsx`)
- Header h-14 avec icône Music (accent) + titre "Suno Generator"
- Zone principale scrollable avec padding

### Page de composition (`app/(dashboard)/compose/page.tsx`)
- Orchestration de tous les sélecteurs (genre → mood → style → params → prompt)
- État local React pour chaque paramètre
- Bouton "Générer" (CTA) avec icône Sparkles, désactivé tant que genre + mood + style + prompt ne sont pas remplis
- Zone GenerationOutput (état vide pour l'instant)

### Routing
- `app/page.tsx` — Redirect automatique vers `/compose`

### Tests (`__tests__/composition.test.tsx`)
- 13 tests pour les composants de composition :
  - GenreSelector : rendu des 18 genres, highlight sélection, callback onChange
  - MoodSelector : rendu des 10 moods, highlight sélection, callback onChange
  - StyleSelector : rendu des 6 styles, highlight sélection
  - ParamsPanel : rendu des boutons tempo + dropdowns, highlight tempo actif
  - PromptInput : rendu textarea + compteur de caractères, exemples
  - GenerationOutput : rendu état vide

### Dépendances
- `@testing-library/dom` ajouté (peer dependency manquante)

---

## Corrections

- Suppression du boilerplate Next.js dans `app/page.tsx`
- Metadata du layout racine corrigée (titre + description Suno Generator)

---

## Breaking Changes

- Aucun
