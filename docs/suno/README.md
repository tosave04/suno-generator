# 🎵 Guide complet des bonnes pratiques Suno AI (2026)

> **Tutoriel exhaustif** pour créer des chansons de qualité professionnelle avec Suno AI en mode Custom.
> Basé sur l'expérience communautaire, les tests intensifs et les recommandations officielles.

---

## 📋 Sommaire

| Guide | Contenu |
|-------|---------|
| [01 — Lyrics & Structure](./01-LYRICS-STRUCTURE.md) | Tags de structure, formatage des paroles, delivery vocale, longueurs optimales |
| [02 — Prompts (Style of Music & Exclude)](./02-PROMPTS.md) | Positive prompt, negative prompt, formules efficaces, exemples par genre |
| [03 — Réglages & Techniques avancées](./03-SETTINGS-ADVANCED.md) | Vocal Gender, Weirdness, Style Influence, tips avancés, erreurs courantes |

---

## 🎯 Suno Custom Mode — Vue d'ensemble

Suno propose deux modes de création :

- **Simple Mode** : On décrit ce qu'on veut en langage naturel, Suno gère tout.
- **Custom Mode** : Contrôle total sur chaque paramètre (celui qu'on utilise ici).

### Les 6 champs du Custom Mode

| Champ | Rôle | Langue |
|-------|------|--------|
| **Song Title** | Titre de la chanson | Libre |
| **Lyrics** | Paroles avec tags de structure `[Verse]`, `[Chorus]`… | Libre |
| **Style of Music** | Descripteurs de style (genre, instruments, mood, BPM…) | **Anglais obligatoire** |
| **Exclude from Song** | Éléments à éviter (chaque élément préfixé par "no") | **Anglais obligatoire** |
| **Vocal Gender** | Voix masculine ou féminine | — |
| **More Options** | Weirdness (0-100%), Style Influence (0-100%) | — |

### Principes fondamentaux

1. **Suno génère des morceaux de 2 à 4 minutes** — Viser 200-300 mots de lyrics.
2. **Les prompts en anglais sont toujours plus efficaces** pour Style of Music et Exclude, même si les lyrics sont dans une autre langue.
3. **La spécificité paie** — "fingerpicked acoustic guitar, breathy female vocals, 90 BPM" > "acoustic song".
4. **Moins c'est plus** — Un prompt surchargé (>200 caractères) dilue le résultat.
5. **La cohérence genre/mood/lyrics est critique** — Des lyrics mélancoliques avec un prompt "upbeat dance pop" donneront un résultat incohérent.

### Modèles de génération (2025-2026)

| Modèle | Disponibilité | Caractéristiques |
|--------|---------------|------------------|
| **V4.5** | Pro / Premier (défaut) | Meilleure qualité audio, meilleure adhérence au prompt, voix les plus riches, génération la plus rapide |
| **V4** | Tous | Excellent, légèrement moins fidèle au prompt que V4.5 |
| **V3.5** | Free (défaut) | Bon pour débuter, qualité inférieure aux V4+ |

> **Tip communautaire** : V4.5 comprend particulièrement bien les descriptions nuancées et évocatrices comme "uplifting nostalgic tones" ou "melodic whistling".

### L'écosystème Suno (au-delà du Custom Mode)

| Outil | Rôle |
|-------|------|
| **Song Editor** | Interface timeline pour éditer, réordonner et re-générer des sections spécifiques |
| **Extend** | Ajouter des segments (60-120 sec) à une chanson existante, jusqu'à 8 min total |
| **Persona** | Sauvegarder un chanteur d'une génération pour le réutiliser dans d'autres chansons |
| **Cover** | Transformer un audio existant dans un nouveau style en préservant la mélodie |
| **Stem Separation** | Séparer jusqu'à 12 pistes instrumentales (voix, basse, batterie, etc.) |
| **Suno Studio** | Workstation audio générative pour Pro/Premier (Warp Markers, Remove FX, Alternates, signatures rythmiques) |
| **Prompt Enhancement Helper** | Transforme un prompt basique en description détaillée optimisée pour V4.5 |

### Le workflow idéal

```
1. Choisir un genre et un mood cohérents
2. Écrire les lyrics avec les bons tags de structure
3. Construire le positive prompt (Style of Music) — concis et précis
4. Ajouter un negative prompt si nécessaire
5. Ajuster Vocal Gender, Weirdness et Style Influence
6. Générer → Écouter → Itérer sur les prompts
7. Utiliser Extend pour allonger, Song Editor pour affiner
8. Sauvegarder la voix en Persona si elle vous plaît
```

---

## 🧠 Règles d'or (applicables à TOUT genre)

### Structure

- **Répétition du refrain** : Le refrain doit être quasi-identique à chaque répétition (Suno reconnaît les patterns).
- **Variation des couplets** : Chaque couplet doit apporter du nouveau (texte, perspective, émotion).
- **Le bridge est unique** : Il n'apparaît qu'une fois, avant le dernier refrain, et offre un contraste.
- **Longueur des sections** : Couplets 4-8 lignes, Refrains 4-6 lignes, Pre-Chorus 2-4 lignes, Bridge 4-6 lignes.

### Écriture

- **Show, don't tell** : "Rain taps the window where you used to sit" > "I'm sad".
- **Voyelles ouvertes sur les notes tenues** : Favoriser "ah", "oh", "ee" en fin de phrase.
- **Éviter les clusters de consonnes** : "strengths", "twelfths" sont impronononçables en chant.
- **Le hook d'abord** : Commencer par écrire le refrain, puis construire les couplets autour.

### Production

- **Combiner maximum 2-3 genres** dans le prompt. Au-delà, le résultat est imprévisible.
- **Le negative prompt doit rester court** : 3-5 éléments max, chacun préfixé par "no".
- **Tester par itération** : Modifier un seul paramètre à la fois entre deux générations.

---

## 🎼 Théorie musicale rapide pour Suno

### Tonalités et émotions

| Tonalité | Émotion | Genres typiques |
|----------|---------|-----------------|
| **Majeur** (C, G, D, A, E) | Joie, espoir, énergie | Pop, Country, Funk, Reggae |
| **Mineur** (Am, Em, Dm, Bm) | Tristesse, tension, mystère | Blues, Metal, R&B, Ambient |

### Progressions d'accords courantes

| Nom | Accords | Usage |
|-----|---------|-------|
| **La plus universelle** | I–V–vi–IV | Pop, Rock — fonctionne toujours |
| **12-bar blues** | I-I-I-I-IV-IV-I-I-V-IV-I-V | Blues, Jazz-blues |
| **Jazz standard** | ii–V–I | Jazz, Bossa Nova |
| **Mélancolique** | vi–IV–I–V | Ballades, Indie |
| **Épique** | I–III–IV–iv | Cinématique, Anthem |

> **Tip Suno** : Inclure la tonalité dans le positive prompt améliore la cohérence : "key of E minor" ou "D major scale".

### Tempo et densité de texte

| Tempo | BPM | Densité de syllabes | Genres |
|-------|-----|---------------------|--------|
| **Très lent** | 50-70 | Peu, mots longs | Ambient, Ballad |
| **Lent** | 70-90 | Modérée | Blues, Soul, R&B |
| **Moyen** | 90-120 | Équilibrée | Pop, Rock, Country |
| **Rapide** | 120-150 | Dense | Punk, Electronic, Funk |
| **Très rapide** | 150+ | Très dense, mots courts | Metal, Drum & Bass, Speed rap |

---

---

## 📚 Sources

Ce guide est compilé à partir de :
- **Suno Docs officiels** : [FAQ](https://suno.com/docs/faqs), [Using Metatags](https://suno-ai.notion.site/Using-Metatags-34944efe09ec41d693e314f13af44695), [Tips & Tricks](https://suno-ai.notion.site/Tips-Tricks-Chirp-v1-969852c74c644c6b8262ec5c5be2325c)
- **Suno Blog** : [Studio 1.2](https://suno.com/blog/studio1_2), [Suno Studio](https://suno.com/blog/suno-studio)
- **Communauté Reddit** : [r/SunoAI Wiki](https://www.reddit.com/r/SunoAI/wiki/index/) — guide communautaire exhaustif
- **Corpus interne** du projet Suno Generator (genres, moods, styles, tags, music rules)

---

> **Continuer** : [01 — Lyrics & Structure →](./01-LYRICS-STRUCTURE.md)
