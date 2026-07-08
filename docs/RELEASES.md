# 📦 Releases — Suno Generator

---

## v1.7.0 — Style Artiste *(8 juillet 2026)*

Nouvel onglet **Style** : saisir un nom d'artiste ou de morceau pour obtenir instantanément les réglages Suno équivalents (Style of Music, Exclude from Song, Vocal Gender, Weirdness, Style Influence). Le LLM analyse le style sonore via le corpus `llms-full.txt` (Section 7 ajoutée). Refactorisation du client DeepSeek en générique typé (`ZodType`) ; `pickRandom` dans le Context Builder pour varier les prompts générés. Labels Suno extraits en utilitaire partagé. 10 nouveaux tests, 111 au total, lint + build OK.

➜ [Release Notes](releases/RELEASE_NOTES_v1.7.0.md) · [Changelog](changelogs/CHANGELOG_v1.7.0_STYLE_ARTISTE.md)

---

## v1.6.0 — Audio URL, Stats & UX *(28 mars 2026)*

Refactoring complet de l'upload audio : remplacement du système de fichiers (drag & drop MP3/WAV) par des **liens URL** (Suno, YouTube, youtu.be) avec validation Zod. Centralisation des emojis dans `lib/data/emojis.ts` pour affichage dans les stats (Server Components). Drapeaux de langues via flagcdn.com (compatibles Windows). Coverflow genres amélioré (recentrage auto + shift horizontal global). Favicon SVG. `topN()` supporte les valeurs CSV (multi-genre/langue). Breaking : `audioFile`/`audioFormat` → `audioUrl` (reset BDD). 101 tests, lint + build OK.

➜ [Release Notes](releases/RELEASE_NOTES_v1.6.0.md) · [Changelog](changelogs/CHANGELOG_v1.6.0_AUDIO_URL_STATS_UX.md)

---

## v1.5.0 — Calculateur Suno Settings & Chaos *(28 mars 2026)*

Calculateur déterministe de weirdness et styleInfluence basé sur genre, mood et style (tables de correspondance + variance aléatoire ±6). Nouveau mood Chaos (weirdness +40, styleInfluence -30) pour compositions avant-gardistes. Labels Suno explicites dans l'onglet Réglages (Safe zone, Expected, Experimental, Chaos mode / Loose, Moderate, Strong). DeepSeek ne choisit plus ces valeurs. 9 nouveaux tests calculateur, 103 tests totaux, lint + build OK.

➜ [Release Notes](releases/RELEASE_NOTES_v1.5.0.md) · [Changelog](changelogs/CHANGELOG_v1.5.0_CALCULATEUR_SUNO_SETTINGS.md)

---

## v1.4.0 — Structures & Durée *(28 mars 2026)*

4 longueurs de structure par genre (short, radio, standard, long) pour les 26 genres musicaux. Sélecteur de durée à 4 options (Courte ~2 min, Radio ~3 min, Standard ~4 min, Longue ~5-6 min). Context Builder avec instructions IA adaptées par longueur. Random fill pondéré sur 4 valeurs. 7 fichiers modifiés, lint + build OK.

➜ [Release Notes](releases/RELEASE_NOTES_v1.4.0.md) · [Changelog](changelogs/CHANGELOG_v1.4.0_STRUCTURES_DUREE.md)

---

## v1.3.0 — UX & Random Composition *(28 mars 2026)*

Remplissage aléatoire intelligent (bouton Random) avec 1 194 prompts d'exemple et probabilités pondérées (26 genres, tempo, langues, styles). Effet "tirage de loto" animé. 4 composants extraits de params-panel (tempo, langue, vocal, durée). Dropdown genres amélioré avec badges ✕. Layout recomposé. Corrections hydration + boutons imbriqués. Lint + build OK.

➜ [Release Notes](releases/RELEASE_NOTES_v1.3.0.md) · [Changelog](changelogs/CHANGELOG_v1.3.0_UX_RANDOM_COMPOSITION.md)

---

## v1.2.0 — Composition Avancée *(27 mars 2026)*

Multi-genre (1-2 mix), multi-langue (1-2 mix + Elfique/Quenya), mood optionnel, structures courtes par genre, style vocal par icônes (8 styles dont Robotic 🤖), ambiance Futuriste 🚀 (12 atmosphères), tempo renforcé avec BPM, fallback vocalGender robuste, description du style affiché. 95 tests, lint + build OK.

➜ [Release Notes](releases/RELEASE_NOTES_v1.2.0.md) · [Changelog](changelogs/CHANGELOG_v1.2.0_COMPOSITION_AVANCEE.md)

---

## v1.1.0 — Enrichissement Musical & Transparence IA *(27 mars 2026)*

8 nouveaux genres (K-Pop, 16-Bit, Celtic, Afroworld, Disco, Middle Eastern, Indian, Japanese → 26 total). 4 nouvelles langues (Russe, Hindi, Arabe, Chinois → 12 total). Système d'atmosphères culturelles (11 ambiances : Arabic, Asian, African, Latin, Western, European, Indian, Hybrid, Nordic, Russian, Slavic). Onglet "Prompt IA" pour visualiser/copier le prompt système DeepSeek. Émojis Windows-compatible. 95 tests, lint + build OK.

➜ [Release Notes](releases/RELEASE_NOTES_v1.1.0.md) · [Changelog](changelogs/CHANGELOG_v1.1.0_ENRICHISSEMENT_MUSICAL.md)

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