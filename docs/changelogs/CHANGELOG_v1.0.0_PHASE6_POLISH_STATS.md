# Changelog v1.0.0 — Phase 6 : Polish, Stats & Tests

**Date :** 26 mars 2026

---

## Ajouts

### Dashboard de statistiques (`/stats`)
- Nouvelle page Server Component avec KPIs : total générations, favoris, avec audio, mots moyens par génération
- Top 5 des genres et moods les plus utilisés avec barres de progression
- Graphique d'activité des 7 derniers jours (bar chart CSS)
- Server Action `getGlobalStats()` dans `lib/actions/stats.ts`

### Stats par génération
- Bandeau de statistiques dans `GenerationResult` : nombre de mots, caractères, sections, durée estimée
- Props `wordCount`, `characterCount`, `sectionCount`, `estimatedDuration` propagées depuis la page compose

### Navigation
- Header enrichi avec liens Composer / Stats dans le layout Dashboard
- Icônes BarChart3 pour la navigation Stats

### Animations et transitions
- Keyframes CSS : `fade-in`, `slide-in-left`, `pulse-gentle` dans `globals.css`
- Animation `animate-fade-in` sur les cartes de sidebar et le résultat de génération

### Responsive mobile
- Sidebar collapsible avec overlay sur mobile (< md breakpoint)
- Bouton flottant "Historique" pour ouvrir la sidebar sur mobile
- Transition `translate-x` sur la sidebar
- Grille des réglages Suno adaptée (`grid-cols-1 sm:grid-cols-3`)
- Padding de page adaptatif (`p-4 sm:p-6`)

### Accessibilité
- `role="group"` + `aria-label` sur les sélecteurs Genre et Mood
- `aria-pressed` sur les boutons de sélection
- `role="tablist"` + `role="tab"` + `aria-selected` sur les onglets de résultat
- `aria-label` sur la navigation principale
- Labels ARIA pour les boutons de la sidebar mobile

### Pagination sidebar
- Pagination serveur avec `take`/`skip` (20 items par page)
- Bouton "Charger plus" en bas de la liste
- Détection `hasMore` via fetch +1
- Reset automatique à la page 0 lors du changement de filtres

### Tests
- 9 tests unitaires `stats.test.ts` (computeStats, countWords, countSections, etc.)
- 4 tests E2E Playwright (`e2e/composition.spec.ts`) : chargement /compose, sélection → activation bouton, page /stats, navigation
- Configuration Playwright (`playwright.config.ts`) avec web server intégré
- Total : **95 tests unitaires**, **4 tests E2E**

---

## Fichiers créés
- `lib/actions/stats.ts`
- `app/(dashboard)/stats/page.tsx`
- `__tests__/stats.test.ts`
- `e2e/composition.spec.ts`
- `playwright.config.ts`

## Fichiers modifiés
- `app/(dashboard)/layout.tsx` — Navigation Header
- `app/(dashboard)/compose/page.tsx` — Props stats
- `app/globals.css` — Animations CSS
- `components/composition/generation-output.tsx` — Stats bar + ARIA tabs
- `components/composition/genre-selector.tsx` — ARIA attributes
- `components/composition/mood-selector.tsx` — ARIA attributes
- `components/sidebar/sidebar.tsx` — Responsive + pagination
- `components/sidebar/generation-card.tsx` — Animation fade-in
- `lib/actions/generation.ts` — Pagination (PaginatedGenerations)
- `package.json` — Version 1.0.0, script test:e2e

## Dépendances ajoutées
- `@playwright/test` ^1.58.2 (devDependency)
