# 🗺️ Roadmap — Suno Generator

> **Dernière mise à jour :** 27 mars 2026

---

## Vue d'ensemble

| Phase | Titre | Statut | Objectif |
|-------|-------|--------|----------|
| **Phase 0** | Fondations | ✅ Terminée | Stack, BDD, structure |
| **Phase 1** | Données musicales | ✅ Terminée | Corpus de genres, moods, styles |
| **Phase 2** | Interface de composition | ✅ Terminée | UI principale + sélecteurs |
| **Phase 3** | Génération IA | ✅ Terminée | Context Builder + DeepSeek |
| **Phase 4** | Historique & favoris | ✅ Terminée | Sidebar, filtres, favoris |
| **Phase 5** | Upload audio | ✅ Terminée | Upload MP3/WAV |
| **Phase 6** | Polish & Stats | ✅ Terminée | Statistiques, UX, tests |
| **v1.1** | Enrichissement musical | ✅ Terminée | Genres, langues, atmosphères, transparence IA |
| **v1.2** | Composition avancée | ✅ Terminée | Multi-genre/langue, mood optionnel, structures courtes, vocal étendu |

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

## Phase 1 — Données musicales ✅ *Terminée*

**Objectif :** Constituer le corpus de connaissances musicales qui alimentera le Context Builder. Recherche approfondie requise pour chaque genre.

- [x] Définir la structure TypeScript des données (`GenreData`, `MoodData`, `WritingStyleData`, `SunoTag`, `MusicRule`) — `lib/data/types.ts`
- [x] Créer `lib/data/genres.ts` — 18 genres avec :
  - Description, sous-genres, BPM typiques
  - Structure type, instruments clés
  - Caractéristiques vocales, contexte historique
  - Tags Suno et mots-clés de prompt
- [x] Créer `lib/data/moods.ts` — 10 moods avec :
  - Champs lexicaux, caractéristiques musicales
  - Genres compatibles, modificateurs de prompt
- [x] Créer `lib/data/styles.ts` — 6 styles d'écriture avec :
  - Règles de rédaction, exemples de patterns
  - Conseils de formatage Suno
- [x] Créer `lib/data/suno-tags.ts` — Référence complète des tags Suno 2026 (tags structure + delivery + metatags créatifs + vocables non-lexicaux)
- [x] Créer `lib/data/music-rules.ts` — Règles transversales (théorie musicale, 25 règles)
- [x] Tests unitaires pour la cohérence des données (18 tests, tous passent)

**Livrable :** Corpus complet exploitable par le Context Builder.

---

## Phase 2 — Interface de composition ✅ *Terminée*

**Objectif :** Construire l'interface principale permettant de sélectionner les paramètres et de lancer une génération.

- [x] Configurer `globals.css` avec tokens couleur complets (thème clair + sombre, TEMPLATE.md)
- [x] Mettre à jour le layout racine (metadata Suno Generator)
- [x] Créer le layout Dashboard (`app/(dashboard)/layout.tsx`) — Header avec icône + titre
- [x] Créer les composants UI de base (`components/ui/`) :
  - Button (5 variantes, 3 tailles, états loading/disabled)
  - Badge (default, active, mood, genre avec couleurs spécifiques)
- [x] Créer `components/composition/genre-selector.tsx` — Grid de cards avec émojis
- [x] Créer `components/composition/mood-selector.tsx` — Grid de badges cliquables
- [x] Créer `components/composition/style-selector.tsx` — Radio group
- [x] Créer `components/composition/params-panel.tsx` — Tempo (boutons segmentés), langue, vocal
- [x] Créer `components/composition/prompt-input.tsx` — Textarea avec compteur + exemples cliquables
- [x] Créer `components/composition/generation-output.tsx` — Affichage résultat avec tabs (Lyrics, Prompt+, Prompt−, Réglages)
- [x] Créer la page principale `app/(dashboard)/compose/page.tsx` — Orchestration de tous les sélecteurs + bouton Générer
- [x] Configurer `app/page.tsx` — Redirect vers `/compose`
- [x] Tests composants (13 tests : rendu, interactions, sélections) — tous passent

**Livrable :** Interface complète de composition accessible à `/compose` (sans génération IA encore).

---

## Phase 3 — Génération IA ✅ *Terminée*

**Objectif :** Intégrer le Context Builder et l'API DeepSeek pour générer lyrics et prompts.

- [x] Créer `lib/schemas/generation.ts` — Schéma Zod de validation (input + réponse IA)
- [x] Créer `lib/utils/stats.ts` — Calcul automatique des statistiques (mots, caractères, sections, durée)
- [x] Créer `lib/services/context-builder.ts` — Assemblage du contexte (genre, mood, style, tempo, langue, tags Suno, règles musicales, format de sortie JSON)
- [x] Créer `lib/services/deepseek.ts` — Client API DeepSeek (appel, parsing JSON, validation Zod, gestion erreurs)
- [x] Créer `lib/actions/generation.ts` — Server Action `createGeneration` (validation → Context Builder → DeepSeek → stats → BDD → revalidatePath)
- [x] Intégrer le bouton Générer → Server Action → affichage résultat
- [x] Gestion des états de chargement (loading avec spinner, erreur avec message, succès avec résultat)
- [x] Gestion des erreurs API (DeepSeekError typée, messages utilisateur clairs)
- [x] Créer `docs/suno/` — 4 guides Suno AI (~1 200 lignes) : structure, prompts, réglages avancés
- [x] Audit et correction des données musicales (tags Suno, structures de genres, règles de production)
- [x] Tests : schémas Zod (5), Context Builder (6), calcul stats (8) — 28 tests ajoutés, 59 au total

**Livrable :** Génération fonctionnelle de bout en bout, documentation Suno complète.

---

## Phase 4 — Historique & favoris ✅ *Terminée*

**Objectif :** Panneau latéral avec historique filtrable et système de favoris.

- [x] Créer `components/sidebar/sidebar.tsx` — Container principal avec chargement des générations
- [x] Créer `components/sidebar/sidebar-filters.tsx` — Recherche texte, filtre genre, filtre favoris, tri date
- [x] Créer `components/sidebar/generation-card.tsx` — Card avec titre, badges genre/mood, date, boutons favori/supprimer
- [x] Créer `lib/actions/favorite.ts` — Server Action `toggleFavorite` avec validation Zod
- [x] Créer `lib/actions/generation.ts` — Ajout `getGenerations` (filtres), `deleteGeneration`, `getGenerationById`
- [x] Chargement d'une génération depuis la sidebar vers la zone principale
- [x] Filtres fonctionnels : recherche, genre, favoris, tri (récent/ancien)
- [x] Intégration sidebar dans le layout Dashboard (sidebar + main content flex)
- [x] Tests : 13 tests sidebar (rendu, interactions, filtres) — 72 tests au total

**Livrable :** Historique navigable avec recherche, filtres et favoris.

---

## Phase 5 — Upload audio ✅ *Terminée*

**Objectif :** Permettre l'association de fichiers audio aux générations.

- [x] Créer `lib/schemas/upload.ts` — Validation Zod (formats MP3/WAV, taille max 20 Mo, validation types MIME)
- [x] Créer `lib/actions/upload.ts` — Server Actions `uploadAudio` et `deleteAudio` avec écriture fichier + MAJ BDD
- [x] Créer `components/composition/audio-upload.tsx` — Composant d'upload dans la zone de résultat (onglet Audio)
- [x] Filtre "avec audio" dans la sidebar (bouton toggle dans les filtres rapides)
- [x] Lecture audio inline (player HTML5 natif avec contrôles)
- [x] Gestion de la suppression/remplacement (boutons Remplacer et Supprimer)
- [x] Drag & drop de fichiers audio sur la zone d'upload
- [x] Tests : 14 tests (validation schéma upload + delete, constantes, cas limites) — 86 tests au total

**Livrable :** Upload MP3/WAV fonctionnel avec lecture, remplacement et suppression.

---

## Phase 6 — Polish, stats & tests ✅ *Terminée*

**Objectif :** Finaliser l'UX, ajouter les statistiques et assurer la couverture de tests.

- [x] Dashboard de statistiques basique (nombre de générations, genres les plus utilisés…)
- [x] Affichage des stats par génération (word count, sections…)
- [x] Animations et transitions UI
- [x] Responsive mobile complet
- [x] Accessibilité (ARIA, navigation clavier)
- [x] Tests E2E Playwright (parcours critique : composer → générer → sauvegarder)
- [x] Optimisation performances (lazy loading sidebar, pagination)
- [x] Documentation finale

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

---

## v1.1 — Enrichissement Musical & Transparence IA ✅ *Terminée*

**Objectif :** Enrichir le corpus musical, ajouter des atmosphères culturelles et offrir la transparence sur les prompts IA.

- [x] Ajout de 8 nouveaux genres musicaux (K-Pop, 16-Bit, Celtic, Afroworld, Disco, Middle Eastern, Indian, Japanese) — 26 genres au total
- [x] Ajout de 4 langues (Russe, Hindi, Arabe, Chinois) — 12 langues au total
- [x] Correction des clés et émojis du genre-selector pour compatibilité Windows
- [x] Création du système d'atmosphères culturelles — `lib/data/atmospheres.ts` (11 atmosphères)
- [x] Interface `AtmosphereData` dans `lib/data/types.ts`
- [x] Composant `atmosphere-selector.tsx` (toggle badges)
- [x] Intégration atmosphères dans le Context Builder (`buildAtmosphereContext()`)
- [x] Schéma Zod mis à jour (`atmosphere: z.string().optional()`)
- [x] Nouveau champ `systemPrompt` dans le schéma Prisma
- [x] Onglet "Prompt IA" dans le résultat de génération (affichage + copie)
- [x] Mise à jour SPECIFICATIONS.md (26 genres, 12 langues, 11 atmosphères)
- [x] 95 tests, lint + build OK

**Livrable :** Corpus élargi, atmosphères culturelles, transparence totale sur les prompts IA.

---

## v1.2 — Composition Avancée ✅ *Terminée*

**Objectif :** Enrichir la composition avec des sélections multiples, un mood optionnel, des structures courtes et un style vocal étendu.

- [x] Multi-genre (1-2 max) avec mix et instruction `GENRE MIX` dans le prompt
- [x] Multi-langue (1-2 max) avec alternance naturelle dans les lyrics
- [x] Langue elfique (Quenya) avec phonologie finnoise
- [x] Mood optionnel (toggle deselect, schéma Prisma nullable)
- [x] Structures courtes (`shortStructure`) pour les 26 genres + toggle songLength
- [x] Style vocal par icônes (8 styles : Male, Female, Duet, Choir, Whisper, Rap, Opera, Robotic)
- [x] Style "Robotic" avec instructions vocoder/auto-tune dédiées
- [x] Description du style d'écriture affichée sous la sélection
- [x] Tempo renforcé avec BPM spécifiques dans `positivePrompt`
- [x] Ambiance "Futuriste" 🚀 (12 atmosphères au total)
- [x] Fallback `vocalGender` robuste (`.catch("Male")`)
- [x] 95 tests, lint + build OK

**Livrable :** Composition multi-choix, structures courtes, 8 styles vocaux, ambiance futuriste.