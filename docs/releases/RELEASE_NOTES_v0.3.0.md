# Release Notes — v0.3.0 · Phase 2 : Interface de composition

> **Date :** 25 mars 2026 · **Phase :** 2/6 · **Statut :** ✅ Terminée

---

## Résumé

L'interface complète de composition musicale est en place. L'utilisateur peut sélectionner un genre parmi 18, un mood parmi 10, un style d'écriture parmi 6, régler le tempo, la langue et le style vocal, puis rédiger une description libre. Le bouton Générer est prêt à être connecté au Context Builder (Phase 3). Tous les composants respectent la charte graphique `TEMPLATE.md`.

---

## Ce qui est livré

### Tokens de couleur (`globals.css`)
12 variables CSS avec thème clair et sombre. Mapping complet vers Tailwind via `@theme inline` : background, foreground, muted, accent, border, ring, destructive, success, warning.

### Composants UI de base (`components/ui/`)
- **Button** — 5 variantes (primary, secondary, ghost, destructive, icon), 3 tailles, états loading avec spinner et disabled
- **Badge** — 3 variantes + 18 couleurs de genre musical avec prop `genreId`

### 6 Composants de composition (`components/composition/`)
- **GenreSelector** — Grid responsive de 18 cards avec émojis et sous-genres
- **MoodSelector** — Badges cliquables pour 10 moods
- **StyleSelector** — Radio group pour 6 styles d'écriture
- **ParamsPanel** — Boutons segmentés tempo, dropdowns langue (8) et vocal (7)
- **PromptInput** — Textarea avec compteur 2000 chars et 4 exemples cliquables
- **GenerationOutput** — Résultat tabé (Lyrics, Prompt+, Prompt−, Réglages) avec coloration des tags Suno, état vide

### Layout Dashboard
Header avec icône et titre, zone principale scrollable.

### Page `/compose`
Orchestration de tous les sélecteurs avec état local React. Bouton "Générer" désactivé tant que les champs requis (genre, mood, style, prompt) ne sont pas remplis.

### Tests
13 tests de composants couvrant : rendu complet, sélection/highlight, callbacks onChange.

---

## Métriques

| Métrique | Valeur |
|---|---|
| Fichiers créés | 11 |
| Composants UI | 2 (Button, Badge) |
| Composants composition | 6 |
| Variables CSS | 12 |
| Tests ajoutés | 13 |
| Tests totaux | 31 (tous passent) |
| Lint | ✅ 0 erreur |
| Build | ✅ succès |
| Routes | `/` (redirect), `/compose` |

---

## Prochaine étape

**Phase 3 — Génération IA** : intégrer le Context Builder et l'API DeepSeek pour générer lyrics et prompts de bout en bout.
