# 03 — Réglages Suno & Techniques avancées

> Guide exhaustif des réglages "More Options" de Suno et des techniques avancées de composition.

---

## ⚙️ Vocal Gender

### Fonctionnement

Suno propose deux options : **Male** et **Female**. Ce choix affecte le timbre, la tessiture et le style d'interprétation.

### Guide de choix

| Critère | Male | Female |
|---------|------|--------|
| **Tessiture naturelle** | Grave à médium (baryton/ténor) | Médium à aigu (mezzo-soprano/soprano) |
| **Genres où excelle** | Rock, Hip-hop, Blues, Country, Metal | Pop, R&B, Soul, Electronic, Jazz vocal |
| **Émotion** | Puissance, gravitas, profondeur | Légèreté, émotion, aérien |
| **Combo avec prompt** | "raspy male voice", "deep baritone" | "breathy female vocals", "powerful alto" |

### Cohérence avec le vocal style

Le prompt "Style of Music" peut affiner le vocal au-delà du genre :

```
Male + "soft male vocals, falsetto"          → Résultat doux et aérien
Male + "powerful male vocals, belting"       → Résultat puissant et projeté
Female + "breathy female whisper"            → Résultat intimiste
Female + "powerful female vocals, operatic"  → Résultat dramatique
```

> **Tip** : Si le prompt vocal contredit le Vocal Gender choisi, Suno suit généralement le Vocal Gender.

---

## 🎲 Weirdness (0-100%)

### C'est quoi ?

Le curseur **Weirdness** contrôle à quel point Suno prend des libertés créatives avec la génération. C'est essentiellement un curseur "surprise vs prévisibilité".

### Échelle détaillée

| Plage | Nom | Comportement | Cas d'usage |
|-------|-----|--------------|-------------|
| **0-10%** | Ultra-safe | Son très conventionnel, proche des morceaux mainstream | Démos commerciales, musique de fond |
| **10-25%** | Conservateur | Résultat prévisible avec légères touches créatives | Pop radio, covers stylisées |
| **25-40%** | Équilibré | Sweet spot pour la plupart des genres | ✅ Recommandation par défaut |
| **40-55%** | Créatif | Choix mélodiques inattendus, arrangements surprenants | Indie, art pop, jazz fusion |
| **55-70%** | Expérimental | Sons inattendus, structures non-conventionnelles | Avant-garde, abstract hip-hop |
| **70-85%** | Bizarre | Résultats souvent étranges, parfois géniaux | Art expérimental, noise, glitch |
| **85-100%** | Chaos | Imprévisible, peut être brillant ou inutilisable | Exploration pure, sound design |

### Recommandations par genre

| Genre | Weirdness recommandée | Pourquoi |
|-------|-----------------------|----------|
| Pop | 15-30% | Doit rester accessible et mémorable |
| Rock | 20-40% | Un peu de surprise dans les riffs |
| Hip-Hop | 15-35% | Le flow doit rester cohérent |
| Jazz | 35-55% | L'improvisation est bienvenue |
| Electronic | 30-50% | La créativité sonore est un plus |
| Ambient | 40-65% | Les textures inattendues enrichissent |
| Metal | 25-45% | Technique = structure, mais surprises bienvenues |
| Folk/Country | 10-25% | La tradition prime |
| Experimental | 60-90% | C'est le but |

> **Règle d'or** : En cas de doute, commencer à **30%** et ajuster par itérations de +/- 10%.

---

## 🎨 Style Influence (0-100%)

### C'est quoi ?

Le curseur **Style Influence** contrôle à quel point Suno suit littéralement le prompt "Style of Music". C'est un curseur "obéissance au prompt".

### Échelle détaillée

| Plage | Nom | Comportement | Cas d'usage |
|-------|-----|--------------|-------------|
| **0-15%** | Ignoré | Suno interprète très librement, le prompt sert de vague inspiration | Résultats surprenants, sérendipité créative |
| **15-35%** | Souple | Suno s'inspire du prompt mais prend des libertés | Quand on veut "dans l'esprit de" sans copier |
| **35-55%** | Équilibré | Suno respecte l'esprit du prompt avec de la marge | ✅ Bon défaut polyvalent |
| **55-75%** | Fidèle | Suno suit le prompt de près, peu de déviations | Quand le prompt est bien travaillé |
| **75-90%** | Strict | Adhérence très forte au prompt décrit | Genres traditionnels, reproduction de styles |
| **90-100%** | Littéral | Suno tente de suivre chaque mot du prompt | Risque de résultat "mécanique" si prompt mal rédigé |

### Matrice Weirdness × Style Influence

| | Style Influence basse (0-30) | Style Influence moyenne (30-70) | Style Influence haute (70-100) |
|---|---|---|---|
| **Weirdness basse (0-30)** | Résultat générique, neutre | Résultat fidèle et prévisible | Très fidèle au prompt, safe |
| **Weirdness moyenne (30-60)** | Créatif et imprévisible | ✅ **Sweet spot** — créatif et guidé | Créatif dans le cadre du style |
| **Weirdness haute (60-100)** | Chaos total, rien de prévisible | Étrange mais dans l'esprit | Étrange mais contrôlé |

### Combinaisons recommandées

| Objectif | Weirdness | Style Influence |
|----------|-----------|-----------------|
| **Morceau commercial fiable** | 15-25% | 65-80% |
| **Exploration créative guidée** | 35-50% | 40-55% |
| **Reproduction d'un style précis** | 10-20% | 80-95% |
| **Art expérimental contrôlé** | 55-75% | 50-65% |
| **Surprise totale (loterie)** | 80-100% | 0-20% |

---

## 🏆 Song Title — Bonnes pratiques

### Qu'est-ce qui fait un bon titre ?

Le titre n'influence PAS directement le son généré par Suno, mais il contextualise l'écoute.

| ✅ Faire | ❌ Éviter |
|----------|----------|
| Titre évocateur lié aux lyrics | Titre générique ("My Song", "Untitled") |
| 2-5 mots percutants | Phrases complètes de 10+ mots |
| Reprendre le hook ou une image forte des lyrics | Titre déconnecté du contenu |
| Évoquer un mood ou une image | Décrire littéralement le genre ("A Rock Song") |

### Formules de titres efficaces

| Type | Exemples | Quand l'utiliser |
|------|----------|------------------|
| **Image poétique** | "Neon Rain", "Paper Moon", "Velvet Static" | Morceaux atmosphériques |
| **Fragment de phrase** | "Still Running", "Before You Go", "Last July" | Morceaux narratifs |
| **Mot unique puissant** | "Wildfire", "Shatter", "Eclipse" | Morceaux intenses |
| **Question** | "Where Did We Go?", "Who's Watching?" | Morceaux introspectifs |
| **Lieu/moment** | "Highway 61", "3 AM Kitchen", "Rooftop November" | Storytelling |

---

## 🔥 Techniques avancées

### 1. L'itération ciblée (le plus important)

Ne jamais modifier plus d'un paramètre entre deux générations :

```
Essai 1 : Prompt de base → Écouter
Essai 2 : Modifier seulement le BPM → Écouter
Essai 3 : Modifier seulement la tonalité → Écouter
Essai 4 : Ajuster Weirdness de +10% → Écouter
```

### 2. La technique du "prompt layering"

Commencer simple, puis enrichir :

```
V1 : "indie rock, male vocals"
V2 : "indie rock, dreamy, male vocals, reverb-heavy"
V3 : "indie rock, dreamy, jangly guitars, soft male vocals, 120 BPM, reverb-heavy, 90s influence"
```

### 3. La méthode A/B sur les lyrics

Garder le même prompt mais varier la structure des lyrics pour comparer :
- Version A : structure classique (Verse-Chorus-Verse-Chorus-Bridge-Chorus)
- Version B : structure progressive (Verse-Verse-Chorus-Bridge-Chorus-Outro)

### 4. Exploiter les transitions

Les tags `[Pre-Chorus]`, `[Post-Chorus]` et `[Break]` modifient la dynamique du morceau de façon significative. Les ajouter ou retirer change radicalement le rendu.

### 5. Le negative prompt comme scalpel

Plutôt que de surcharger le positive prompt, utiliser le negative prompt pour éliminer les défauts récurrents :

```
Si Suno met trop d'autotune → ajouter "no autotune"
Si la basse est trop lourde → ajouter "no heavy bass"
Si le tempo fluctue → ajouter "no tempo changes"
```

### 6. Persona — Cohérence vocale entre chansons

Si vous trouvez une voix qui vous plaît :
1. Cliquer sur les trois points du clip généré
2. Sélectionner "Make a Persona"
3. Réutiliser cette voix dans toutes vos futures générations

> **Usage** : Idéal pour créer un album cohérent, un personnage musical, ou un projet sérialisé. (Pro/Premier uniquement)

### 7. Song Editor — Contrôle chirurgical

L'outil le plus puissant de Suno pour le post-traitement :
- **Re-générer une section spécifique** sans toucher au reste (sélectionner sur la timeline, re-prompter)
- **Réordonner les sections** par glisser-déposer
- **Construire des chansons complexes** en générant des clips séparés et en les arrangeant

### 8. Cover — Transformer un morceau existant

Uploader un audio (voix memo, morceau complet, jusqu'à 8 min) et le transformer dans un nouveau style tout en préservant la mélodie originale. Combinable avec les Personas.

### 9. Suno Studio (Premier)

Workstation audio générative (depuis sept. 2025) :
- **Warp Markers** : Ajuster le timing et le groove des clips
- **Remove FX** : Retirer les effets (réverb, etc.) pour exporter en DAW
- **Alternates** : Créer des variations et les auditionner depuis une piste
- **Time Signatures** : Support 6/8, 7/8, 11/4 et autres signatures non-4/4

### 10. Stem Separation intégrée

Séparer un morceau en **jusqu'à 12 pistes** (voix, basse, batterie, guitare, etc.) :
- 2 versions de séparation proposées
- Upscale haute qualité de chaque piste
- Coût : 50 crédits par utilisation

> **Alternative gratuite** : [Ultimate Vocal Remover](https://ultimatevocalremover.com/) pour PC.

---

## ❌ Erreurs les plus courantes

| Erreur | Conséquence | Solution |
|--------|-------------|----------|
| Prompt > 200 caractères | Résultat flou, dilué | Garder 120-200 chars, être concis |
| Lyrics > 300 mots | Fin tronquée ou bâclée | Couper, chaque mot doit compter |
| Weirdness > 60% + Style Influence < 30% | Résultat inutilisable | Monter Style Influence en tandem |
| Negative prompt sans "no" | Suno l'ignore ou le traite comme positif | TOUJOURS préfixer par "no" |
| Mélanger 4+ genres | Son incohérent | Max 2-3 genres en fusion |
| Tags de structure manquants | Suno invente la structure | Toujours baliser avec `[Verse]`, `[Chorus]`, etc. |
| Prompt en français pour Style of Music | Résultat imprévisible | TOUJOURS en anglais |
| Refrain différent à chaque fois | Pas de mélodie récurrente | Copier-coller le refrain |
| Sections > 8 lignes | Section monotone, Suno perd le fil | 4-6 lignes par section |
| Vocal Gender ≠ vocal dans le prompt | Conflit d'interprétation | Aligner les deux |

---

## � Distribution & Droits commerciaux

### Règles de propriété (source : Suno FAQ officiel)

| Plan | Propriété | Usage commercial | Attribution |
|------|-----------|-----------------|-------------|
| **Free** | Suno est propriétaire | Non-commercial uniquement | "Made with Suno" obligatoire |
| **Pro** ($10/mois) | Vous êtes propriétaire | Oui (YouTube, Spotify, etc.) | Appréciée mais pas obligatoire |
| **Premier** ($30/mois) | Vous êtes propriétaire | Oui (licence complète) | Appréciée mais pas obligatoire |

> **Important** : L'upgrade vers Pro ne donne PAS rétroactivement de droits commerciaux sur les chansons générées en Free.

> **Vous gardez toujours vos lyrics** : Peu importe le plan, vos paroles originales vous appartiennent.

### Plateformes de distribution

| Plateforme | Politique IA | Coût |
|------------|-------------|------|
| **DistroKid** | Généralement accepté | ~$23/an |
| **RouteNote** | Partiellement accepté | Gratuit (15% rev share) ou ~$30/an |
| **LANDR** | Accepté si droits respectés | ~$96/an |
| **TuneCore** | Politique stricte / IA détectée | ~$30/an |
| **SoundCloud for Artists** | Non accepté | — |

> **Source** : r/SunoAI Wiki (juin 2025). Les politiques évoluent rapidement — toujours vérifier les conditions actuelles.

---

## �📊 Cheatsheet rapide

```
┌─────────────────────────────────────────────────┐
│              SUNO CUSTOM MODE 2026              │
├─────────────────────────────────────────────────┤
│ Title      │ 2-5 mots, évocateur, lié aux lyrics│
│ Lyrics     │ 200-300 mots, tags [], 4-6 l/sect  │
│ Style+     │ <200 chars, EN, genre+mood+vocal+BPM│
│ Exclude−   │ <120 chars, EN, "no X, no Y, no Z" │
│ Gender     │ Male/Female, aligner avec le prompt │
│ Weirdness  │ Défaut 30%, +10 pour expérimental   │
│ Influence  │ Défaut 50-70%, +20 pour genre strict │
└─────────────────────────────────────────────────┘
```

---

> **Retour** : [← Guide principal](./README.md)
