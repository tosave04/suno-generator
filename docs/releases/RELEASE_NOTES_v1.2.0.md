# 📦 Release Notes — v1.2.0 Composition Avancée

> **Date :** 27 mars 2026 · **Statut :** Stable

---

## 🎯 Vue d'ensemble

La v1.2.0 enrichit profondément l'expérience de composition avec des sélections multiples (genres, langues), un mood optionnel, des structures courtes, un style vocal étendu avec icônes et une ambiance futuriste. La robustesse de la génération IA est également renforcée.

---

## ✨ Nouveautés

### Composition multi-choix
- **Multi-genre (1-2)** : Sélectionnez jusqu'à 2 genres pour créer des hybrides (ex: Pop + Electronic, Jazz + Hip-Hop). Le Context Builder fusionne les instructions des deux genres.
- **Multi-langue (1-2)** : Mixez 2 langues dans les lyrics (ex: Français + Anglais). Les sections alternent naturellement entre les langues.
- **Langue elfique** : Quenya (🧝) — langue tolkienienne à phonologie finnoise, avec instructions de prononciation dédiées.

### Flexibilité accrue
- **Mood optionnel** : Le mood n'est plus obligatoire. Toggle deselect pour le retirer.
- **Structures courtes** : Nouveau toggle "Courte / Standard" — génère des chansons de 1-2 min (100-150 mots) avec des structures adaptées par genre.
- **Description du style** : La description du style d'écriture sélectionné s'affiche sous la grille.

### Style vocal enrichi
- **Sélection par icônes** : 8 styles vocaux sous forme de boutons emoji (🧑 Male, 👩 Female, 👫 Duet, 🎶 Choir, 🤫 Whisper, 🎤 Rap, 🎭 Opera, 🤖 Robotic).
- **Voix robotique** : Nouveau style "Robotic" avec instructions spécifiques (vocoder, auto-tune, voix synthétique, phrases mécaniques).

### Ambiance futuriste
- Nouvelle atmosphère culturelle 🚀 **Futuriste** : cyberpunk, sci-fi, vocoder, glitch, synthétiseurs, gammes chromatiques/microtonales. 12 atmosphères au total.

### Robustesse IA
- **Tempo renforcé** : BPM spécifiques par palier directement injectés dans le `positivePrompt`.
- **Fallback vocalGender** : Si DeepSeek renvoie une valeur invalide (ex: "Mixed"), fallback automatique vers "Male" au lieu de crasher.

---

## 📊 Chiffres clés

| Métrique | Valeur |
|----------|--------|
| Genres musicaux | 26 |
| Langues | 13 (dont Elfique) |
| Atmosphères culturelles | 12 |
| Styles vocaux | 8 |
| Tests | 95 (6 fichiers) |
| Lint | 0 erreur |
| Build | 0 erreur TypeScript |

---

## ⬆️ Migration

- **Base de données** : Le champ `mood` est désormais nullable. Exécuter `npx prisma db push` si BDD existante.
- **Schéma Zod** : `genre` → `genres` (array), `language` → `languages` (array), `songLength` ajouté.
- Aucune migration manuelle nécessaire pour les nouvelles installations.

---

## 🔗 Liens

- [Changelog détaillé](../changelogs/CHANGELOG_v1.2.0_COMPOSITION_AVANCEE.md)
- [ROADMAP](../ROADMAP.md)
