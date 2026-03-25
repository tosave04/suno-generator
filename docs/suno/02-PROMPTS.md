# 02 — Prompts Suno : Style of Music & Exclude from Song

> Guide exhaustif pour rédiger des prompts efficaces dans les champs "Style of Music" (positif) et "Exclude from Song" (négatif).

---

## 🎯 Style of Music (Positive Prompt)

### Le champ le plus important de Suno

Le "Style of Music" décrit à Suno **quel son** produire. C'est une liste de descripteurs séparés par des virgules, **toujours en anglais**.

### Anatomie d'un bon positive prompt

```
[genre], [sous-genre/influence], [mood], [vocal], [tempo], [tonalité], [instruments], [production], [époque/influence]
```

**Exemple réel** :
```
Indie rock, dreamy, jangly guitars, soft male vocals, 120 BPM, key of G major, reverb-heavy, lo-fi production, 90s shoegaze influence
```

### Les 8 catégories de descripteurs

| Catégorie | Exemples | Impact |
|-----------|----------|--------|
| **Genre** | `pop`, `rock`, `hip-hop`, `jazz` | Définit la base sonore |
| **Sous-genre** | `synth pop`, `post-punk`, `neo-soul` | Affine l'identité |
| **Mood** | `dreamy`, `aggressive`, `melancholic`, `euphoric` | Colore l'émotion |
| **Vocal** | `soft female vocals`, `raspy male voice`, `falsetto` | Type de chant |
| **Tempo** | `120 BPM`, `slow tempo`, `uptempo` | Vitesse du morceau |
| **Tonalité** | `key of A minor`, `D major scale` | Ambiance harmonique |
| **Instruments** | `fingerpicked acoustic guitar`, `analog synths`, `brass section` | Palette sonore |
| **Production** | `lo-fi`, `polished`, `raw`, `studio quality`, `vinyl warmth` | Texture globale |

### Règles du positive prompt

1. **Max ~200 caractères** — Au-delà, Suno dilue l'interprétation.
2. **Soyez spécifique** — "fingerpicked acoustic guitar" >>> "guitar".
3. **V4.5 comprend les descriptions nuancées** — "uplifting nostalgic tones", "melodic whistling", "lo-fi bedroom aesthetics" fonctionnent très bien.
4. **Ne répétez pas le genre** si déjà évident par les autres descripteurs.
5. **2-3 genres max en fusion** — "jazz-hop, lo-fi hip-hop with smooth jazz elements" ✅ / "jazz rock ambient electronic country" ❌
6. **L'ordre compte (un peu)** — Les premiers mots ont plus de poids.
7. **Inclure BPM et tonalité** pour des résultats plus cohérents.
8. **Utilisez le Prompt Enhancement Helper** — Outil intégré à Suno qui transforme "indie rock" en description détaillée optimisée V4.5.

### Formules par genre

#### Pop
```
Synth pop, catchy melody, bright female vocals, 118 BPM, C major, polished production, radio-friendly
```

#### Rock
```
Alternative rock, gritty, distorted guitars, powerful male vocals, 130 BPM, E minor, raw energy, 2000s garage rock
```

#### Hip-Hop
```
Boom bap, old school hip-hop, deep male vocals, 90 BPM, vinyl crackle, jazzy samples, head-nodding beat
```

#### Electronic
```
Deep house, atmospheric, pulsing bassline, ethereal female vocals, 124 BPM, hypnotic, late-night club vibes
```

#### R&B / Soul
```
Neo-soul, smooth, silky female vocals, 85 BPM, Fm, Rhodes piano, warm bass, intimate production
```

#### Folk / Country
```
Americana, heartfelt, fingerpicked acoustic guitar, warm male vocals, 95 BPM, G major, front porch storytelling
```

#### Jazz
```
Cool jazz, laid-back, trumpet lead, walking bass, brushed drums, 110 BPM, Bb major, smoky club atmosphere
```

#### Metal
```
Progressive metal, technical, clean and growl vocals, 7-string guitar, odd time signatures, 160 BPM, D minor
```

#### Classical / Cinematic
```
Orchestral, cinematic, sweeping strings, French horn, epic build, 70 BPM, E minor, Hans Zimmer influence
```

#### Reggae / Latin
```
Reggaeton, tropical, infectious rhythm, male vocals, 95 BPM, dancehall influenced, summer vibes, punchy bass
```

---

## 🚫 Exclude from Song (Negative Prompt)

### La règle absolue : préfixer chaque élément par "no"

Le champ "Exclude from Song" indique à Suno ce qu'il doit **éviter**. Chaque élément DOIT commencer par "no".

```
✅ no autotune, no screaming, no heavy bass, no electronic drums
❌ autotune, screaming, heavy bass (INCORRECT — manque le "no")
```

### Quand utiliser le negative prompt

| Situation | Negative prompt |
|-----------|-----------------|
| Pop douce sans auto-tune | `no autotune, no heavy bass, no distortion` |
| Acoustique pure | `no electronic drums, no synths, no autotune, no effects` |
| Rock live sans overproduction | `no electronic elements, no autotune, no pop production` |
| Jazz traditionnel | `no electronic instruments, no distortion, no rap` |
| Rap pur sans chant | `no singing, no melodic chorus, no operatic vocals` |
| Ambient sans rythme | `no drums, no percussion, no vocals, no beat` |

### Règles du negative prompt

1. **3-5 éléments max** — Trop d'exclusions confondent l'algorithme.
2. **Max ~120 caractères** — Court et ciblé.
3. **Exclure ce qui risque d'apparaître naturellement** — Pas besoin d'exclure "death metal" d'un morceau folk.
4. **Chaque élément = "no" + descripteur précis** — "no heavy distortion" > "no noise".
5. **Peut être `null`** — Si le genre est clair et qu'il n'y a pas de risque de dérive, ne rien mettre.

### Exemples de negative prompts par contexte

| Contexte | Negative prompt |
|----------|-----------------|
| **Ballade piano** | `no drums, no electric guitar, no autotune` |
| **Punk brut** | `no autotune, no orchestral, no soft vocals` |
| **Musique d'ambiance** | `no vocals, no drums, no abrupt changes` |
| **Country authentique** | `no electronic elements, no autotune, no heavy effects` |
| **Lo-fi chill** | `no loud vocals, no distortion, no fast tempo` |

---

## 🧪 Combinaisons Prompt+ / Prompt− qui marchent

### 1. Ballade Pop émotionnelle
```
Prompt+ : Piano ballad, emotional, soft female vocals, 72 BPM, A minor, intimate, string accompaniment
Prompt− : no autotune, no drums, no electronic elements
```

### 2. Trap sombre
```
Prompt+ : Dark trap, 808 bass, hi-hats, autotuned male vocals, 140 BPM, D minor, atmospheric, spacey
Prompt− : no acoustic instruments, no happy vibes, no clean vocals
```

### 3. Indie Folk chaleureux
```
Prompt+ : Indie folk, warm acoustic guitar, gentle male vocals, 100 BPM, G major, campfire feel, tambourine
Prompt− : no electric guitar, no electronic production, no heavy drums
```

### 4. Synthwave rétro
```
Prompt+ : Synthwave, retro 80s, analog synths, arpeggiated bass, 128 BPM, neon aesthetics, driving rhythm
Prompt− : no acoustic instruments, no organic drums, no country elements
```

### 5. Jazz-hop nocturne
```
Prompt+ : Jazz-hop, lo-fi, vinyl crackle, mellow saxophone, chill beat, 82 BPM, Eb major, late night mood
Prompt− : no heavy bass, no screaming, no fast tempo
```

---

## ⚡ Tips avancés pour les prompts

### Mots-clés à fort impact

Ces mots modifient significativement le résultat quand Suno les interprète :

| Mot-clé | Effet |
|---------|-------|
| `polished production` | Son studio professionnel, mixé proprement |
| `raw` | Son brut, lo-fi, authentique |
| `lo-fi` | Textures vintage, imperfections voulues |
| `studio quality` | Clarté maximale, son HD |
| `vinyl warmth` | Craquements, chaleur analogique |
| `radio-friendly` | Structure et son calibrés pour la radio |
| `anthemic` | Grand, fédérateur, stade |
| `intimate` | Proche, murmure, chambre |
| `cinematic` | Dramatique, orchestral, montées |
| `hypnotic` | Répétitif, transe, immersif |

### L'astuce de l'ère/influence

Ajouter une référence temporelle ou d'artiste (sans nommer l'artiste) affine le résultat :

```
✅ "90s grunge influence", "2010s bedroom pop aesthetic", "70s funk groove"
❌ "sounds like Nirvana" (Suno filtre les noms d'artistes)
```

> **Tip communautaire (r/SunoAI)** : Au lieu de nommer un artiste, décrivez son style avec des adjectifs précis. "Powerful female vocals, dark pop, dramatic orchestral arrangement, minor key" fonctionne mieux que "like Billie Eilish".

### Les metatags officiels Suno

Selon la documentation officielle, les metatags servent de **"stage directions"** — comme des didascalies au théâtre. Ils guident la génération sans être verbalisés :

```
[laughter]              → Génère un rire naturel
[piano interlude]       → Interlude piano
[whispering]            → Applique un ton chuchoté
[fast rap verse]        → Couplet rap rapide
[slow emotional bridge] → Pont lent et émotionnel
```

> **Source** : La liste n'est pas exhaustive — Suno encourage à expérimenter avec des tags créatifs. "Mix and match, try something entirely new." (Suno Metatags Guide)

### Combiner mood + texture

Le combo mood + production est souvent plus efficace qu'une longue description :

```
"dreamy, reverb-heavy" > "a song that sounds like a dream with lots of reverb on everything"
"gritty, lo-fi" > "a rough sounding song with a lo-fi production quality"
```

---

> **Suivant** : [03 — Réglages & Techniques avancées →](./03-SETTINGS-ADVANCED.md)
> **Retour** : [← Guide principal](./README.md)
