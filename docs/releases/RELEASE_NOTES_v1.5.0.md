# 📦 Release Notes — v1.5.0

**Calculateur Suno Settings & Chaos**
**Date :** 28 mars 2026

---

## 🎯 Résumé

Les réglages Suno (weirdness et styleInfluence) ne sont plus choisis arbitrairement par l'IA. Un **calculateur déterministe** les calcule à partir du genre, du mood et du style d'écriture, avec une légère variance aléatoire. Un nouveau mood **Chaos** pousse les paramètres vers l'expérimentation maximale. L'onglet Réglages affiche désormais des labels Suno explicites.

---

## ✨ Nouveautés

### Calculateur de réglages Suno

Chaque génération calcule automatiquement les valeurs de weirdness et styleInfluence via un algorithme multi-facteurs :

| Facteur | Weirdness | Style Influence |
|---------|-----------|-----------------|
| **Base genre** | 27–62 selon le genre | 30–75 selon le genre |
| **Modificateur mood** | -18 à +40 | -30 à +18 |
| **Modificateur style** | -10 à +15 | -15 à +10 |
| **Variance aléatoire** | ±6 | ±6 |

- **Multi-genre** : la base est la moyenne des genres sélectionnés
- Résultat clampé entre 0 et 100

### Mood Chaos

Nouveau mood expérimental pour des compositions avant-gardistes :

- **Weirdness +40** : le modificateur le plus élevé de tous les moods
- **Style Influence -30** : libère l'IA des contraintes stylistiques
- Champs lexicaux : glitch, entropy, distortion, warp, noise
- Compatible avec : Electronic, Metal, Hip-Hop, Ambient, Punk, Indie, Jazz, Rock

### Labels Suno dans l'onglet Réglages

| Paramètre | Plages | Labels |
|-----------|---------|--------|
| **Weirdness** | 0-25 / 26-50 / 51-75 / 76-100 | Safe zone / Expected results / Experimental results / Chaos mode |
| **Style Influence** | 0-33 / 34-66 / 67-100 | Loose / Moderate / Strong |

Les labels s'affichent en sous-titre sous les pourcentages existants.

---

## 🔧 Détails techniques

- **`settings-calculator.ts`** : nouveau service avec tables de correspondance genre→base, mood→mod, style→mod
- **`context-builder.ts`** : retourne `BuildResult { systemPrompt, calculatedSettings }` au lieu de `string`
- **`generation.ts` (schema)** : weirdness/styleInfluence optionnels dans la réponse DeepSeek
- **`generation.ts` (action)** : assemble vocalGender (DeepSeek) + weirdness/styleInfluence (calculateur)
- **`generation-output.tsx`** : fonctions `getWeirdnessLabel()` / `getStyleInfluenceLabel()`
- **9 nouveaux tests** pour le calculateur, **4 tests corrigés** pour les composants

---

## 📊 Statistiques

| Métrique | Valeur |
|----------|--------|
| Tests totaux | 103 |
| Tests passants | 103 (100%) |
| Fichiers créés | 1 |
| Fichiers modifiés | 7 |
| Lint | ✅ |
| Build | ✅ |
