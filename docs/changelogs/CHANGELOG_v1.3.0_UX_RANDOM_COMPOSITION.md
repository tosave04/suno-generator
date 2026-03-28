# Changelog v1.3.0 — UX & Random Composition

> **Date :** 28 mars 2026

---

## 🎯 Résumé

Version axée sur la modularité des composants de composition, la réorganisation du layout, un système de remplissage aléatoire intelligent avec probabilités pondérées et un effet visuel "tirage de loto".

---

## ✨ Nouvelles fonctionnalités

### Remplissage aléatoire intelligent (Random Fill)
- Bouton "Random" (icône baguette magique) dans le prompt input
- Remplit automatiquement TOUS les champs : genres, style, mood, tempo, langues, vocal, ambiance, durée, prompt
- 1 194 prompts d'exemple dans `lib/data/samples.ts`
- Exemples aléatoires cliquables sous le textarea (3 exemples, rafraîchis au clic)

### Probabilités pondérées par table
- Module centralisé `lib/utils/random-composition.ts`
- **GENRE_WEIGHTS** (26 genres) : Pop(10), Rock/Hip-Hop(8), Electronic(7), R&B/Latin/Indie(5), K-Pop(4), etc.
- **TEMPO_WEIGHTS** : Medium/Fast(4), Slow(2), extrêmes(1)
- **LANGUAGE_WEIGHTS** : EN/FR(10), ES(2), JA/KO/ZH(2), autres(1), Elfique(0.5)
- **STYLE_WEIGHTS** : Poetic/Storytelling(4), autres(1)
- Constantes nommées : `GENRE_DOUBLE_CHANCE(0.2)`, `VOCAL_STYLE_NONE_CHANCE(0.4)`, `MOOD_NONE_CHANCE(0.25)`, `ATMOSPHERE_NONE_CHANCE(0.25)`, `SONG_LENGTH_STANDARD_CHANCE(0.8)`, `LANGUAGE_DOUBLE_CHANCE(0.2)`

### Effet "tirage de loto"
- Animation slot-machine au clic sur Random : 10 itérations rapides (50ms) puis décélération (100ms, 200ms, 500ms)
- Bouton affiche "Tirage…" avec `animate-pulse` + icône `animate-spin` pendant l'animation
- Bouton désactivé pendant le tirage pour éviter les clics multiples
- Nettoyage des timers si re-clic

### Dropdown multi-select genres (coverflow)
- Dropdown intégré dans la card coverflow (bottom-left)
- Ouverture vers le haut (`bottom-full`) avec `max-h-36` scrollable
- Badges des genres sélectionnés avec boutons ✕ pour retirer
- Gestion overflow : `overflow-hidden` sur le wrapper interne uniquement

---

## 🔧 Refactoring

### Extraction des composants params-panel
- `components/composition/tempo-selector.tsx` — Boutons segmentés (5 tempos avec BPM)
- `components/composition/language-selector.tsx` — Multi-select langues (1-2 max) avec drapeaux
- `components/composition/vocal-style-selector.tsx` — Toggle icônes (8 styles vocaux)
- `components/composition/song-length-selector.tsx` — Toggle courte/standard avec durées

### Réorganisation du layout compose
- Ligne 1 : Durée | Tempo (centré, flex-wrap)
- Ligne 2 : Langue | Style vocal (grid `3fr_2fr`)
- Composants importés individuellement (plus de wrapper ParamsPanel)

### Homogénéisation des styles
- LanguageSelector et VocalStyleSelector alignés sur le pattern TempoSelector/SongLengthSelector
- Pattern uniforme : `border-accent bg-accent/15 text-accent` (sélectionné), `border-border bg-background` (non sélectionné)
- Labels supprimés des composants individuels (gérés par le layout)

---

## 🐛 Corrections

### Hydration mismatch
- `suppressHydrationWarning` sur les boutons d'exemples aléatoires (contenu `Math.random()` intentionnellement différent serveur/client)

### Boutons HTML imbriqués
- Bouton ✕ dans le genre selector : `<button>` remplacé par `<span role="button">` avec accessibilité clavier (`tabIndex`, `onKeyDown`)

---

## 📁 Fichiers créés

| Fichier | Description |
|---------|-------------|
| `components/composition/tempo-selector.tsx` | Sélecteur de tempo (5 options) |
| `components/composition/language-selector.tsx` | Sélecteur multi-langues (1-2) |
| `components/composition/vocal-style-selector.tsx` | Toggle styles vocaux (8 options) |
| `components/composition/song-length-selector.tsx` | Toggle durée courte/standard |
| `lib/utils/random-composition.ts` | Module random avec probabilités pondérées |
| `lib/data/samples.ts` | 1 194 prompts d'exemple |

## 📁 Fichiers modifiés

| Fichier | Modification |
|---------|-------------|
| `app/(dashboard)/compose/page.tsx` | Layout réorganisé, imports individuels, handleRandomFill avec effet loto |
| `components/composition/params-panel.tsx` | Simplifié en wrapper (composants extraits) |
| `components/composition/genre-selector.tsx` | Dropdown intégré, span role=button pour ✕ |
| `components/composition/prompt-input.tsx` | Exemples SAMPLES, bouton Random agrandi, suppressHydrationWarning |

---

## 📊 Chiffres clés

| Métrique | Valeur |
|----------|--------|
| Prompts d'exemple | 1 194 |
| Genres pondérés | 26 |
| Tables de probabilités | 6 (genre, tempo, langue, style, vocal, mood/atmosphere) |
| Constantes nommées | 8 |
| Composants extraits | 4 |
| Lint | 0 erreur |
| Build | 0 erreur TypeScript |
