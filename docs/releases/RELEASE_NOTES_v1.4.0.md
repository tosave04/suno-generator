# 📦 Release Notes — v1.4.0

**Structures & Durée**
**Date :** 28 mars 2026

---

## 🎯 Résumé

Ajout de 2 nouvelles longueurs de structure pour les 26 genres musicaux : **Radio** (~3 min) et **Longue** (~5-6 min). Le sélecteur de durée passe de 2 à 4 options. Le Context Builder, le random fill et toute la chaîne sont adaptés.

---

## ✨ Nouveautés

### 4 longueurs de structure par genre

Chaque genre dispose désormais de 4 structures adaptées :

| Longueur | Durée cible | Caractéristique |
|----------|-------------|-----------------|
| **Courte** | ~2 min | Ultra-concis, essentiel |
| **Radio** | ~3 min | Pas d'intro, droit au but |
| **Standard** | ~4 min | Structure complète classique |
| **Longue** | ~5-6 min | Sections étendues, solos, reprises |

### Sélecteur de durée enrichi

Le toggle à 2 options (Courte / Standard) est remplacé par 4 boutons segmentés : **Courte**, **Radio**, **Standard**, **Longue**.

### Instructions IA adaptées

Le Context Builder envoie des instructions de longueur spécifiques selon le choix :
- **Radio** : 150-200 mots, structure sans intro
- **Longue** : 350-450 mots, développement thématique complet

### Random fill étendu

Le remplissage aléatoire utilise des poids pondérés pour les 4 longueurs : standard (50%), radio (20%), long (20%), short (10%).

---

## 🔧 Détails techniques

- **Type `GenreData`** : `radioStructure: string[]`, `longStructure: string[]`
- **Schéma Zod** : `songLength: z.enum(["short", "radio", "standard", "long"])`
- **Context Builder** : `structureMap` pour sélection de structure, instructions par longueur
- **Random** : `SONG_LENGTH_WEIGHTS` remplace `SONG_LENGTH_STANDARD_CHANCE`

---

## 📊 Métriques

| Métrique | Valeur |
|----------|--------|
| Fichiers modifiés | 7 |
| Genres enrichis | 26 |
| Structures ajoutées | 52 (26 radio + 26 long) |
| Lint | ✅ 0 erreur |
| Build | ✅ 0 erreur |
| Tests | 89/93 (4 échecs pré-existants) |

---

## 📋 Fichiers modifiés

- `lib/data/types.ts` — Interface GenreData étendue
- `lib/data/genres.ts` — 26 genres avec radioStructure + longStructure
- `lib/schemas/generation.ts` — Enum songLength à 4 valeurs
- `components/composition/song-length-selector.tsx` — 4 options UI
- `lib/services/context-builder.ts` — structureMap + instructions longueur
- `lib/utils/random-composition.ts` — Poids pondérés songLength
- `app/(dashboard)/compose/page.tsx` — Type état étendu
