# Changelog v1.5.0 — Calculateur Suno Settings & Chaos

**Date :** 28 mars 2026
**Type :** Release mineure

---

## 🎯 Objectif

Remplacer le choix arbitraire de weirdness/styleInfluence par DeepSeek par un **calculateur déterministe** basé sur le genre, le mood et le style d'écriture. Ajouter un mood **Chaos** pour des compositions expérimentales extrêmes.

---

## ✅ Changements

### Nouveau fichier — `lib/services/settings-calculator.ts`

- Interface `CalculatedSettings` : `{ weirdness: number, styleInfluence: number }`
- `GENRE_WEIRDNESS_BASE` : table de base par genre (26 genres, défaut 40)
- `GENRE_STYLE_INFLUENCE_BASE` : table de base par genre (26 genres, défaut 50)
- `MOOD_WEIRDNESS_MOD` / `MOOD_STYLE_INFLUENCE_MOD` : modificateurs par mood (±18 à ±40)
- `STYLE_WEIRDNESS_MOD` / `STYLE_INFLUENCE_MOD` : modificateurs par style d'écriture (±15)
- `RANDOM_VARIANCE` = 6 : variance aléatoire ± pour éviter la monotonie
- Fonction `calculateSunoSettings(genres, mood, style)` : calcul complet avec clamp 0–100
- Multi-genre : moyenne des bases des genres sélectionnés

### Nouveau mood — `lib/data/moods.ts`

- Ajout du mood **Chaos** (id: `chaos`)
  - Champs lexicaux : glitch, fracture, warp, entropy, distortion, scramble, noise, rupture
  - Genres compatibles : electronic, metal, hiphop, ambient, punk, indie, jazz, rock
  - Modificateurs : chaotic, experimental, glitchy, avant-garde, unpredictable
  - Weirdness mod : **+40** (le plus élevé) / Style influence mod : **-30** (le plus bas)

### Context Builder — `lib/services/context-builder.ts`

- Type de retour changé : `string` → `BuildResult { systemPrompt: string, calculatedSettings: CalculatedSettings }`
- Import et appel de `calculateSunoSettings()` dans `buildSystemPrompt()`
- `buildOutputFormat()` reçoit les settings calculés et les injecte dans le prompt système
- DeepSeek ne choisit plus weirdness/styleInfluence (valeurs pré-calculées)

### Schéma Zod — `lib/schemas/generation.ts`

- `generationResponseSchema.sunoSettings.weirdness` : `z.number()` → `z.number().optional()`
- `generationResponseSchema.sunoSettings.styleInfluence` : `z.number()` → `z.number().optional()`

### Action serveur — `lib/actions/generation.ts`

- Destructure `{ systemPrompt, calculatedSettings }` depuis `buildSystemPrompt()`
- Assemble les `sunoSettings` finaux : `vocalGender` de DeepSeek + `weirdness`/`styleInfluence` du calculateur

### Affichage — `components/composition/generation-output.tsx`

- Fonction `getWeirdnessLabel(value)` : Safe zone (0-25), Expected results (26-50), Experimental results (51-75), Chaos mode (76-100)
- Fonction `getStyleInfluenceLabel(value)` : Loose (0-33), Moderate (34-66), Strong (67-100)
- Sous-labels affichés en italique sous les pourcentages dans l'onglet Réglages

### Tests — `__tests__/settings-calculator.test.ts` (nouveau)

- 9 tests couvrant : valeurs par défaut, genre connu, mood chaos, style abstract, multi-genre, clamp 0-100, variance aléatoire, combinaison complète

### Tests corrigés — `__tests__/composition.test.tsx`

- GenreSelector : tests adaptés au carrousel 3D (dropdown + aria-label)
- PromptInput : test adapté aux exemples aléatoires (vérifie 3 boutons 💡)

### Tests adaptés — `__tests__/generation.test.ts`

- Adapté au nouveau type `BuildResult` retourné par `buildSystemPrompt()`
- Nouveau test de validation des `calculatedSettings`

---

## 📊 Bilan

| Métrique | Valeur |
|----------|--------|
| Fichiers créés | 1 (`settings-calculator.ts`) |
| Fichiers modifiés | 7 |
| Tests ajoutés | 9 (calculateur) |
| Tests corrigés | 4 (composition) |
| Tests totaux | 103 (tous passent) |
| Lint | ✅ OK |
| Build | ✅ OK |
