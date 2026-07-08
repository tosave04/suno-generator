# Changelog v1.7.0 — Style Artiste

> **Date :** 8 juillet 2026
> **Branche :** main
> **Type :** Feature

---

## Résumé

Ajout d'un onglet **Style** entre Composer et Stats permettant de dériver
automatiquement les réglages Suno (Style of Music, Exclude from Song,
Vocal Gender, Weirdness, Style Influence) à partir du seul nom d'un artiste
ou d'un titre de morceau connu.

Refactorisation du client DeepSeek en générique typé (`ZodType`) et
extraction des labels Suno en utilitaire partagé.

---

## Nouvelles fonctionnalités

### Onglet Style (`/style`)

- Page dédiée avec champ libre « Artiste ou morceau » (2–200 caractères).
- Appui sur `Enter` ou bouton « Générer les réglages » déclenche l'appel IA.
- Résultat affiché : genre/mood détectés, analyse textuelle (rationale),
  Prompt+, Prompt−, Paramètres Suno (Vocal Gender, Weirdness, Style Influence
  avec labels Safe zone / Loose / etc.).
- Boutons **Copier** individuels pour Prompt+ et Prompt−.

### System prompt Style (`lib/services/style-prompt-builder.ts`)

- Lit `llms-full.txt` intégralement au démarrage du serveur (cache singleton).
- Injecte le corpus complet entre marqueurs `BEGIN/END llms-full.txt` dans le
  system prompt, sans troncature.
- Instructions de tâche en 8 étapes (identification → positivePrompt →
  negativePrompt → rationale) + OUTPUT FORMAT JSON strict.
- `outputFileTracingIncludes` ajouté dans `next.config.ts` pour inclure
  `llms-full.txt` dans le build de production (mode standalone).

### `llms-full.txt` — Section 7 ajoutée

Section 7 complète « Reproduire le style d'un artiste ou d'une musique
connu(e) » : règle d'or anti-copyright, méthode 6 étapes, calcul des
sunoSettings, checklist de validation, format de sortie JSON, 4 exemples
anonymisés, prompt système prêt à l'emploi.

---

## Améliorations techniques

### `lib/services/deepseek.ts` — Generic `ZodType`

- Ajout de `callDeepSeekStructured<S extends ZodType>` : réutilise toute la
  plomberie (auth, parsing, markdown stripping, error handling) avec un schéma
  Zod arbitraire.
- `callDeepSeek` devient un wrapper sur `callDeepSeekStructured` (API publique
  préservée).
- `ZodTypeAny` (déprécié Zod v4) remplacé par `ZodType`.
- `parseResponse` devient générique `<S extends ZodType>`.

### `lib/services/context-builder.ts` — `pickRandom`

- `pickRandom<T>(arr, n)` extrait pour éviter la redondance dans les blocs genre.
- Bloc PRIMARY/SINGLE : 3 items aléatoires parmi sous-genres, instruments,
  caractéristiques vocales, tags Suno, keywords.
- Nouveau bloc SECONDARY : 2 items aléatoires, sans structure ni historique.
- Texte GENRE MIX enrichi avec les noms des genres et exemple de positivePrompt.
- OUTPUT FORMAT du Context Builder aligné sur les meilleures pratiques Suno
  (ordre prioritaire, limite 200 chars, max 5 items négatif).

### `lib/utils/suno-labels.ts` — DRY

- `getWeirdnessLabel(value)` et `getStyleInfluenceLabel(value)` extraits en
  utilitaire partagé.
- Importés par `components/composition/generation-output.tsx` et
  `app/(dashboard)/style/page.tsx`.

---

## Nouveaux fichiers

| Fichier | Description |
|---|---|
| `app/(dashboard)/style/page.tsx` | Page UI de la section Style |
| `lib/schemas/style.ts` | Schémas Zod `createStyleSchema` + `styleResponseSchema` |
| `lib/services/style-prompt-builder.ts` | Builder system prompt + user message |
| `lib/actions/style.ts` | Server Action `createStyleSettings` |
| `lib/utils/suno-labels.ts` | Labels Suno partagés |
| `lib/data/samples.json` | 100 prompts d'exemple enrichis (écriture narrative) |
| `docs/suno/04-SYSTEM-PROMPTS.md` | Documentation bonnes pratiques prompts Suno |
| `docs/TODO.md` | Notes de travail internes |
| `components/composition/genre-selector-light.tsx` | Variante légère du sélecteur de genres |
| `__tests__/style.test.ts` | 10 tests (schémas Zod + builder) |

---

## Fichiers modifiés

| Fichier | Changement |
|---|---|
| `lib/services/deepseek.ts` | Générique `ZodType`, `callDeepSeekStructured` |
| `lib/services/context-builder.ts` | `pickRandom`, blocs genre améliorés, texte OUTPUT FORMAT |
| `components/composition/generation-output.tsx` | Import `suno-labels` |
| `app/(dashboard)/layout.tsx` | Lien « Style » avec icône `Wand2` |
| `next.config.ts` | `outputFileTracingIncludes` pour `llms-full.txt` |
| `llms-full.txt` | Section 7 ajoutée (1 658 → 1 834 lignes) |
| `package.json` | Version `1.6.1` → `1.7.0` |

---

## Tests

| Fichier | Tests |
|---|---|
| `__tests__/style.test.ts` | 10 nouveaux tests |
| Total | 111 tests — lint ✅ · build ✅ |
