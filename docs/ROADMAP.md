# 🗺️ Roadmap — Suno Generator

> **Dernière mise à jour :** 25 mars 2026

---

## Vue d'ensemble

| Phase | Titre | Statut | Objectif |
|-------|-------|--------|----------|
| **Phase 0** | Fondations | ✅ Terminée | Stack, BDD, structure |
| **Phase 1** | Données musicales | 🟢 En cours | Corpus de genres, moods, styles |
| **Phase 2** | Interface de composition | ⬜ À faire | UI principale + sélecteurs |
| **Phase 3** | Génération IA | ⬜ À faire | Context Builder + DeepSeek |
| **Phase 4** | Historique & favoris | ⬜ À faire | Sidebar, filtres, favoris |
| **Phase 5** | Upload audio | ⬜ À faire | Upload MP3/WAV |
| **Phase 6** | Polish & Stats | ⬜ À faire | Statistiques, UX, tests |

---

## Phase 0 — Fondations ✅ *Terminée*

**Objectif :** Mettre en place la stack technique, la base de données et la structure du projet.

- [x] Initialisation Next.js 16 + React 19 + Tailwind CSS 4
- [x] Configuration TypeScript strict
- [x] Configuration ESLint 9
- [x] Rédaction README.md professionnel
- [x] Rédaction SPECIFICATIONS.md (cahier des charges)
- [x] Rédaction ROADMAP.md
- [x] Installation Prisma 7 + SQLite (BetterSqlite3 adapter)
- [x] Création du schéma Prisma (`Generation`) avec 20+ champs + index
- [x] Configuration des scripts (`db:generate`, `db:push`, `db:studio`, `db:migrate`)
- [x] Installation Zod 4, Lucide React
- [x] Installation Vitest 4 + configuration (jsdom, globals, setup)
- [x] Création fichier `.env.example` (DATABASE_URL, DEEPSEEK_API_KEY, DEEPSEEK_MODEL)
- [x] Création `lib/db.ts` (singleton Prisma avec BetterSqlite3)
- [x] Configuration `prisma.config.ts`
- [x] Génération du client Prisma (`lib/generated/prisma/`)
- [x] Rédaction `docs/TEMPLATE.md` (charte UI — 14 sections, 835 lignes)

**Livrable :** Projet bootable avec `yarn dev`, BDD initialisée, tests qui passent.

---

## Phase 1 — Données musicales

**Objectif :** Constituer le corpus de connaissances musicales qui alimentera le Context Builder. Recherche approfondie requise pour chaque genre.

- [ ] Définir la structure TypeScript des données (`GenreData`, `MoodData`, `WritingStyleData`)
- [ ] Créer `lib/data/genres.ts` — Minimum 15 genres avec :
  - Description, sous-genres, BPM typiques
  - Structure type, instruments clés
  - Caractéristiques vocales, contexte historique
  - Tags Suno et mots-clés de prompt
- [ ] Créer `lib/data/moods.ts` — Minimum 10 moods avec :
  - Champs lexicaux, caractéristiques musicales
  - Genres compatibles, modificateurs de prompt
- [ ] Créer `lib/data/styles.ts` — Minimum 6 styles d'écriture avec :
  - Règles de rédaction, exemples de patterns
  - Conseils de formatage Suno
- [ ] Créer `lib/data/suno-tags.ts` — Référence complète des tags Suno 2026
- [ ] Créer `lib/data/music-rules.ts` — Règles transversales (théorie musicale)
- [ ] Tests unitaires pour la cohérence des données

**Livrable :** Corpus complet exploitable par le Context Builder.

---

## Phase 2 — Interface de composition

**Objectif :** Construire l'interface principale permettant de sélectionner les paramètres et de lancer une génération.

- [ ] Créer le layout Dashboard (`app/(dashboard)/layout.tsx`)
- [ ] Créer les composants UI de base (`components/ui/`) :
  - Button, Card, Badge, Input, Textarea, Select, Toggle
- [ ] Créer `components/composition/genre-selector.tsx` — Grid de cards
- [ ] Créer `components/composition/mood-selector.tsx` — Grid de badges
- [ ] Créer `components/composition/style-selector.tsx` — Radio group
- [ ] Créer `components/composition/params-panel.tsx` — Tempo, langue, vocal
- [ ] Créer `components/composition/prompt-input.tsx` — Textarea avec compteur
- [ ] Créer `components/composition/generation-output.tsx` — Affichage résultat
- [ ] Créer la page principale `app/(dashboard)/page.tsx`
- [ ] Tests composants (rendu, interactions basiques)

**Livrable :** Interface complète de composition (sans génération IA encore).

---

## Phase 3 — Génération IA

**Objectif :** Intégrer le Context Builder et l'API DeepSeek pour générer lyrics et prompts.

- [ ] Créer `lib/services/context-builder.ts` — Assemblage du contexte
- [ ] Créer `lib/services/deepseek.ts` — Client API DeepSeek
- [ ] Créer `lib/schemas/generation.ts` — Schéma Zod de validation
- [ ] Créer `lib/actions/generation.ts` — Server Action `createGeneration`
- [ ] Créer `lib/utils/stats.ts` — Calcul automatique des statistiques
- [ ] Intégrer le bouton Générer → Server Action → affichage résultat
- [ ] Gestion des états de chargement (loading, erreur, succès)
- [ ] Gestion des erreurs API (retry, messages utilisateur)
- [ ] Tests : schémas Zod, Context Builder, calcul stats

**Livrable :** Génération fonctionnelle de bout en bout.

---

## Phase 4 — Historique & favoris

**Objectif :** Panneau latéral avec historique filtrable et système de favoris.

- [ ] Créer `components/sidebar/sidebar.tsx` — Container principal
- [ ] Créer `components/sidebar/sidebar-filters.tsx` — Filtres
- [ ] Créer `components/sidebar/generation-card.tsx` — Card de génération
- [ ] Créer `lib/actions/favorite.ts` — Server Action toggle favori
- [ ] Créer `lib/actions/generation.ts` — Ajout `deleteGeneration`
- [ ] Chargement d'une génération depuis la sidebar vers la zone principale
- [ ] Filtres fonctionnels : recherche, genre, favoris, tri
- [ ] Tests : filtres, toggle favori

**Livrable :** Historique navigable avec recherche, filtres et favoris.

---

## Phase 5 — Upload audio

**Objectif :** Permettre l'association de fichiers audio aux générations.

- [ ] Créer `lib/schemas/upload.ts` — Validation Zod
- [ ] Créer `lib/actions/upload.ts` — Server Action upload
- [ ] Composant d'upload dans la zone de résultat
- [ ] Filtre "avec audio" dans la sidebar
- [ ] Lecture audio inline (player basique)
- [ ] Gestion de la suppression/remplacement
- [ ] Tests : validation fichier, upload flow

**Livrable :** Upload MP3/WAV fonctionnel avec lecture.

---

## Phase 6 — Polish, stats & tests

**Objectif :** Finaliser l'UX, ajouter les statistiques et assurer la couverture de tests.

- [ ] Dashboard de statistiques basique (nombre de générations, genres les plus utilisés…)
- [ ] Affichage des stats par génération (word count, sections…)
- [ ] Animations et transitions UI
- [ ] Responsive mobile complet
- [ ] Accessibilité (ARIA, navigation clavier)
- [ ] Tests E2E Playwright (parcours critique : composer → générer → sauvegarder)
- [ ] Optimisation performances (lazy loading sidebar, pagination)
- [ ] Documentation finale

**Livrable :** Application v1.0 complète, testée, documentée.

---

## Jalons

| Jalon | Phase | Date cible |
|-------|-------|------------|
| Stack prête | Phase 0 | Semaine 1 |
| Corpus musical complet | Phase 1 | Semaine 2-3 |
| UI de composition | Phase 2 | Semaine 4-5 |
| Génération fonctionnelle | Phase 3 | Semaine 6-7 |
| Historique & favoris | Phase 4 | Semaine 8 |
| Upload audio | Phase 5 | Semaine 9 |
| **v1.0 Release** | Phase 6 | **Semaine 10-11** |