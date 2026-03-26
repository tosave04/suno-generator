# Changelog — v0.5.0 · Phase 4 : Historique & Favoris

> **Date :** 26 mars 2026

---

## Ajouts

### Server Actions
- `lib/actions/favorite.ts` — `toggleFavorite` avec validation Zod, toggle `isFavorite` en BDD, revalidation
- `lib/actions/generation.ts` — `getGenerations(filters)` avec recherche texte, filtre genre, filtre favoris, tri date
- `lib/actions/generation.ts` — `deleteGeneration` avec suppression fichier audio associé si existant
- `lib/actions/generation.ts` — `getGenerationById` pour charger une génération complète depuis la sidebar

### Composants Sidebar
- `components/sidebar/sidebar.tsx` — Container principal, chargement asynchrone des générations, refresh automatique après création
- `components/sidebar/sidebar-filters.tsx` — Input recherche, bouton favoris toggle, select genre (18 genres), bouton tri date
- `components/sidebar/generation-card.tsx` — Card avec titre/prompt tronqué, badges genre (couleur) + mood, date formatée (FR), boutons favori (heart) et supprimer (trash) au hover

### Layout
- `app/(dashboard)/layout.tsx` — Passage de `<main>` seul à layout flex `sidebar + main content` via `<div class="flex flex-1 overflow-hidden">`

### Page Compose
- `app/(dashboard)/compose/page.tsx` — Intégration `<Sidebar>` avec `activeGenerationId`, `refreshKey`, `onSelectGeneration`
- Chargement d'une génération depuis la sidebar : clic sur une card → `getGenerationById` → affichage dans la zone de résultat

### Tests
- `__tests__/sidebar.test.tsx` — 13 tests : rendu card (titre, genre, mood, date, favori), fallback sans titre, style active, callback onSelect, rendu filtres (recherche, favoris, genres), interactions filtres (search onChange, favorites toggle, genre select)

---

## Modifications

- `lib/actions/generation.ts` — Ajout import `z` de Zod, export types `GenerationSummary`, `GenerationFilters`, `DeleteActionResult`
- `app/(dashboard)/compose/page.tsx` — Ajout states `activeGenerationId`, `refreshKey`, `handleSelectGeneration` ; refresh sidebar après génération

---

## Métriques

| Métrique | Valeur |
|---|---|
| Fichiers créés | 5 |
| Fichiers modifiés | 3 |
| Tests ajoutés | 13 |
| Tests totaux | 72 (tous passent) |
| Lint | ✅ 0 erreur |
| Build | ✅ succès |
