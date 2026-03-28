# 📦 Release Notes — v1.3.0 UX & Random Composition

> **Date :** 28 mars 2026 · **Statut :** Stable

---

## 🎯 Vue d'ensemble

La v1.3.0 apporte un système de remplissage aléatoire intelligent avec probabilités pondérées et un effet visuel "tirage de loto", une refonte modulaire des composants de composition, et une réorganisation complète du layout avec correction des erreurs d'hydration.

---

## ✨ Nouveautés

### 🎲 Random Fill intelligent
- **Bouton "Random"** bien visible sous le textarea avec icône baguette magique
- Remplissage automatique de **tous les champs** en un clic : genres, style, mood, tempo, langues, vocal, ambiance, durée et prompt
- **1 194 prompts d'exemple** couvrant tous les genres et styles
- 3 exemples aléatoires cliquables sous le textarea, rafraîchis à chaque utilisation

### 📊 Probabilités pondérées
- Chaque champ utilise une **table de poids réaliste** basée sur la popularité estimée
- 26 genres pondérés (Pop à 10, Rock/Hip-Hop à 8, Electronic à 7… Celtic/16bit à 1)
- Tempo, langues, styles d'écriture, durée — tout est pondéré
- 40% de chance d'aucun style vocal, 25% aucun mood/ambiance pour varier les résultats
- 20% de chance de double genre ou double langue

### 🎰 Effet "tirage de loto"
- Animation slot-machine : les champs changent rapidement (10×50ms) puis ralentissent progressivement (100ms → 200ms → 500ms)
- Feedback visuel : bouton pulsant "Tirage…" avec icône rotative pendant l'animation

### 🃏 Dropdown genres amélioré
- Dropdown multi-select intégré dans la card coverflow du genre selector
- Badges avec boutons ✕ pour retirer un genre rapidement
- Ouverture vers le haut, scroll interne pour les 26 genres

---

## 🔧 Améliorations techniques

### Modularité des composants
- **4 composants extraits** de params-panel : `TempoSelector`, `LanguageSelector`, `VocalStyleSelector`, `SongLengthSelector`
- Styles visuels homogénéisés entre tous les sélecteurs
- Layout réorganisé : Durée|Tempo (ligne 1), Langue|Style vocal (ligne 2, ratio 60/40)

### Corrections
- **Hydration mismatch** corrigé : `suppressHydrationWarning` sur les exemples aléatoires
- **Boutons HTML imbriqués** : remplacement par `<span role="button">` avec accessibilité clavier

---

## 📊 Chiffres clés

| Métrique | Valeur |
|----------|--------|
| Prompts d'exemple | 1 194 |
| Genres pondérés | 26 |
| Tables de probabilités | 6 |
| Composants extraits | 4 |
| Lint | 0 erreur |
| Build | 0 erreur TypeScript |

---

## 🔗 Liens

- [Changelog détaillé](../changelogs/CHANGELOG_v1.3.0_UX_RANDOM_COMPOSITION.md)
- [ROADMAP](../ROADMAP.md)
