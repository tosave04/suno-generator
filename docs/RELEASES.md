# 📦 Releases — Suno Generator

---

## v1.0.0 — Phase 6 : Polish, Stats & Tests *(26 mars 2026)*

Dashboard de statistiques (KPIs, top genres/moods, activité 7j). Stats par génération (mots, caractères, sections, durée). Responsive mobile complet (sidebar collapsible, grilles adaptatives). Accessibilité ARIA (sélecteurs, onglets, navigation). Pagination sidebar (20 items/page). Animations CSS (fade-in, transitions). Tests E2E Playwright (4 scénarios). 95 tests unitaires, lint + build OK.

➜ [Release Notes](releases/RELEASE_NOTES_v1.0.0.md) · [Changelog](changelogs/CHANGELOG_v1.0.0_PHASE6_POLISH_STATS.md)

---

## v0.6.0 — Phase 5 : Upload Audio *(26 mars 2026)*

Upload de fichiers audio MP3/WAV associés aux générations. Zone d'upload intégrée sous le résultat (drag & drop, validation Zod, 20 Mo max). Player HTML5 natif avec contrôles. Remplacement et suppression de fichiers. Filtre "Audio" dans la sidebar. Server Actions : `uploadAudio`, `deleteAudio`. 86 tests, lint + build OK.

➜ [Release Notes](releases/RELEASE_NOTES_v0.6.0.md) · [Changelog](changelogs/CHANGELOG_v0.6.0_PHASE5_UPLOAD_AUDIO.md)

---

## v0.5.0 — Phase 4 : Historique & Favoris *(26 mars 2026)*

Panneau latéral (sidebar) avec historique complet des générations : cards avec titre, badges genre/mood colorés, date, boutons favori/supprimer. Filtres fonctionnels : recherche texte, genre, favoris, tri date. Chargement d'une génération depuis la sidebar vers la zone principale. Server Actions : `toggleFavorite`, `deleteGeneration`, `getGenerations`, `getGenerationById`. 72 tests, lint + build OK.

➜ [Release Notes](releases/RELEASE_NOTES_v0.5.0.md) · [Changelog](changelogs/CHANGELOG_v0.5.0_PHASE4_HISTORIQUE_FAVORIS.md)

---

## v0.4.0 — Phase 3 : Génération IA *(25 mars 2026)*

Génération IA fonctionnelle de bout en bout : Context Builder + API DeepSeek → titre, lyrics structurées, positive/negative prompts et réglages Suno (Vocal Gender, Weirdness, Style Influence). Documentation Suno exhaustive (~1 200 lignes, 4 guides). Audit et correction des données musicales (tags, structures, règles). 59 tests, lint + build OK.

➜ [Release Notes](releases/RELEASE_NOTES_v0.4.0.md) · [Changelog](changelogs/CHANGELOG_v0.4.0_PHASE3_GENERATION_IA.md)

---

## v0.3.0 — Phase 2 : Interface de composition *(25 mars 2026)*

Interface complète de composition musicale : layout Dashboard, 2 composants UI de base (Button, Badge), 6 composants de composition (genre, mood, style, params, prompt, output), page `/compose` avec orchestration des sélecteurs. Tokens de couleur Tailwind (thème clair + sombre). 13 tests de composants (31 au total). Prêt pour la génération IA (Phase 3).

➜ [Release Notes](releases/RELEASE_NOTES_v0.3.0.md) · [Changelog](changelogs/CHANGELOG_v0.3.0_PHASE2_INTERFACE_COMPOSITION.md)

---

## v0.2.0 — Phase 1 : Données musicales *(25 mars 2026)*

Corpus complet de connaissances musicales : 18 genres (Pop à Ambient), 10 moods, 6 styles d'écriture, 22 tags Suno 2026 et 22 règles de théorie musicale. Types TypeScript stricts. 18 tests unitaires avec validation de cohérence inter-données. Prêt pour le Context Builder (Phase 3).

➜ [Release Notes](releases/RELEASE_NOTES_v0.2.0.md) · [Changelog](changelogs/CHANGELOG_v0.2.0_PHASE1_DONNEES_MUSICALES.md)

---

## v0.1.1 — Phase 0 : Fondations *(25 mars 2026)*

Stack technique complète : Next.js 16, React 19, Tailwind CSS 4, Prisma 7 + SQLite, Zod 4, Vitest 4. Modèle `Generation` (20+ champs). Documentation fondamentale : SPECIFICATIONS.md, ROADMAP.md, TEMPLATE.md (charte UI — 14 sections). Projet bootable, BDD configurée, prêt pour Phase 1.

➜ [Release Notes](releases/RELEASE_NOTES_v0.1.1.md) · [Changelog](changelogs/CHANGELOG_v0.1.1_PHASE0_FONDATIONS.md)