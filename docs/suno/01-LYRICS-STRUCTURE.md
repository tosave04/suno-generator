# 01 — Lyrics & Structure Suno

> Guide exhaustif du formatage des paroles et des tags de structure pour Suno AI.

---

## 📐 Tags de structure

Les tags de structure organisent la chanson en sections. Suno les interprète pour varier la mélodie, le rythme et l'arrangement.

### Tags principaux

| Tag | Rôle | Lignes recommandées | Notes |
|-----|------|---------------------|-------|
| `[Intro]` | Introduction (instrumentale ou vocale) | 0-4 | Peut contenir `(instrumental)` ou quelques mots |
| `[Verse]` / `[Verse 1]` | Couplet — avance l'histoire | 4-8 | Numéroter si plusieurs : `[Verse 1]`, `[Verse 2]` |
| `[Pre-Chorus]` | Transition montante vers le refrain | 2-4 | Crée l'anticipation, monte en intensité |
| `[Chorus]` | Refrain — cœur mélodique | 4-6 | Répété 2-3 fois, (quasi-)identique à chaque fois |
| `[Post-Chorus]` | Extension du refrain | 1-2 | Parfait pour "oh-oh-oh" ou une phrase-clé répétée |
| `[Bridge]` | Pont — contraste unique | 4-6 | Une seule fois, avant le dernier refrain |
| `[Outro]` | Conclusion | 0-4 | Peut reprendre l'intro ou résoudre le thème |
| `[Hook]` | Accroche courte (hip-hop) | 2-4 | Alternative au `[Chorus]` pour le rap |
| `[Break]` | Rupture/pause rythmique | 0-2 | Silence ou changement drastique de dynamique |
| `[Fade Out]` | Diminution progressive du volume | 0 | Placer comme dernière section |
| `[end]` | Force la fin de la chanson | 0 | Indispensable avec Extend si le modèle continue de chanter |

### Tags instrumentaux

| Tag | Rôle | Usage |
|-----|------|-------|
| `[Instrumental]` | Section sans voix | Suno génère un passage instrumental |
| `[Solo]` | Solo instrumental | Préciser l'instrument : `[Guitar Solo]`, `[Sax Solo]` |
| `[Interlude]` | Transition instrumentale courte | Plus court qu'un `[Instrumental]` |

---

## 🎤 Tags de delivery vocale

Ces tags modifient la façon dont Suno interprète les paroles. Ils se placent **en inline** (dans le texte).

| Tag | Effet | Exemple |
|-----|-------|---------|
| `(whisper)` | Chuchotement | `(whisper) I still hear your voice` |
| `(shout)` | Cri / voix forte | `(shout) We won't back down!` |
| `(spoken)` | Passage parlé | `(spoken) You know what they say...` |
| `(echo)` | Effet d'écho/réverb | `Come back to me (echo)` |
| `(choir)` | Chœur / harmonies de groupe | `(choir) We rise together` |
| `(ad-lib)` | Improvisation vocale | `(ad-lib) Yeah! Let's go!` |
| `(instrumental)` | Inline : pas de voix | Placer dans une section pour la rendre instrumentale |

### Règles d'utilisation

- **Parenthèses `()` pour les indications inline** — Suno les interprète comme des instructions de delivery.
- **Crochets `[]` pour les sections** — Ils marquent un changement structurel.
- **Ne pas abuser** — 2-3 indications de delivery par chanson suffisent. Trop d'instructions confondent Suno.
- **Les placer AVANT le texte concerné** pour meilleure interprétation.

---

## 📏 Structure standard par genre

### Pop / Rock (structure la plus courante)

```
[Intro]
(instrumental)

[Verse 1]
4-8 lignes narratives

[Pre-Chorus]
2-4 lignes montantes

[Chorus]
4-6 lignes — le hook mémorable

[Verse 2]
4-8 lignes (progression de l'histoire)

[Pre-Chorus]
2-4 lignes

[Chorus]
(identique ou quasi-identique)

[Bridge]
4-6 lignes — contraste mélodique/émotionnel

[Chorus]
(dernière répétition, souvent plus intense)

[Outro]
2-4 lignes ou (instrumental)
```

### Hip-Hop / Rap

```
[Intro]
(spoken) ou quelques mesures instrumentales

[Verse 1]
16 lignes (= 16 bars)

[Hook]
4-8 lignes — accroche mélodique

[Verse 2]
16 lignes

[Hook]
(identique)

[Bridge]
8 lignes ou [Instrumental]

[Hook]
(dernière répétition)

[Outro]
(ad-lib) ou fade out
```

### Blues (forme AAB – 12 mesures)

```
[Verse 1]
Ligne A — première déclaration
Ligne A' — même idée, légère variation
Ligne B — résolution / punchline

[Verse 2]
(même structure AAB, histoire progresse)

[Solo]
(instrumental) — guitar solo

[Verse 3]
(résolution finale en AAB)

[Outro]
(instrumental)
```

### Electronic / Ambient (lyrics minimalistes)

```
[Intro]
(instrumental) — long build atmosphérique

[Verse 1]
2-4 lignes courtes, fragmentées

[Drop]
(instrumental) — climax rythmique

[Verse 2]
2-4 lignes

[Break]
(silence ou texture sonore)

[Drop]
(instrumental)

[Outro]
(instrumental) — long fade
```

---

## ✍️ Bonnes pratiques d'écriture de lyrics

### Chantabilité (singability)

| ✅ Faire | ❌ Éviter |
|----------|----------|
| Voyelles ouvertes en fin de phrase (sky, free, home) | Clusters de consonnes (strengths, twelfths) |
| Mots de 1-3 syllabes sur les notes hautes | Mots complexes sur les notes tenues |
| Rimes sur les temps forts | Rimes forcées qui cassent le sens |
| Pauses naturelles = retours à la ligne | Phrases de 15+ mots sans respiration |

### Schémas de rimes

| Schéma | Pattern | Usage |
|--------|---------|-------|
| **AABB** | vers 1-2 riment, 3-4 riment | Couplets rimés traditionnels |
| **ABAB** | 1 rime avec 3, 2 rime avec 4 | Rimes croisées (pop/rock) |
| **ABCB** | Seuls 2 et 4 riment | Plus souple, naturel |
| **Rimes internes** | Rimes dans la même ligne | Texture hip-hop |
| **Near-rhymes** | Consonance approximative | Moderne, moins prévisible |

### Longueur cible

| Métrique | Valeur optimale | Risque si trop long |
|----------|----------------|---------------------|
| **Mots total** | 200-300 | Tronqué par Suno, fin bâclée |
| **Sections** | 6-10 | Chanson décousue |
| **Lignes par section** | 4-6 (max 8) | Section monotone, perte d'impact |
| **Durée résultante** | 2-4 min | Au-delà : répétitif ou coupé |

---

## 🎤 Non-Lexical Vocables

Les vocables non-lexicaux sont des sons chantés sans signification : ils enrichissent les sections instrumentales et les transitions.

| Vocable | Usage typique | Exemple de placement |
|---------|---------------|---------------------|
| `oh-oh-oh` | Refrains, post-chorus | `[Post-Chorus]` |
| `la la la` | Outros, interludes légers | `[Outro]` la la la, la la la |
| `na na na` | Hooks pop/rock | `[Hook]` na na na na |
| `do do do` | Intros joyeuses | `[Intro]` do do-do do |
| `ooh` / `aah` | Harmonies, transitions | `(choir)` ooh, ooh |
| `hey!` / `ho!` | Anthems, énergie collective | `(shout)` hey! ho! |
| `mm-mmm` | Sections intimes | `(whisper)` mm-mmm |
| `yeah!` / `uh!` | Ad-libs hip-hop | `(ad-lib)` yeah! |

> **Source officielle** : Suno recommande les non-lexical vocables comme technique créative (Tips & Tricks).

---

## ➕ Technique : Extend (allonger une chanson)

Suno limite la génération initiale à ~2-4 min. Pour aller au-delà (jusqu'à 8 min) :

### Workflow Extend

1. **Générer** la première partie de la chanson.
2. **Sélectionner** "Extend" sur le clip.
3. **Choisir un timestamp** d'où continuer (par défaut : fin du clip).
4. **Ajouter UNIQUEMENT les nouvelles paroles** — celles qui n'ont pas encore été chantées.
5. **Style** : Laisser vide (Suno matche automatiquement) ou spécifier un nouveau style.
6. **Get Whole Song** : Fusionner tous les segments en un seul fichier (0 crédit).

### Comment forcer la fin

Si le modèle continue de chanter après la section finale :

```
[Outro]
(instrumental)

[end]
```

> **Tip** : Si `[end]` ne fonctionne pas en V4/V4.5, essayer en V3.5 qui obéit mieux à cette directive.

---

## 🔄 Répétition vs Variété

### Le refrain : stabilité

- Garder le texte **identique** (ou quasi) à chaque répétition.
- Suno reconnaît le pattern et ajuste la mélodie en conséquence.
- Variation autorisée : changer un mot pour l'émotion (ex: "I will find the light" → "We will find the light").

### Les couplets : progression

- Chaque couplet doit **apporter du neuf** : nouvelle scène, nouvel angle, progression temporelle.
- La mélodie du couplet est généralement similaire, mais le texte change.

### Le bridge : rupture contrôlée

- **Mélodie différente** du reste de la chanson.
- **Moment de vérité** : révélation, retournement ou climax émotionnel.
- Apparaît **une seule fois**, généralement avant le dernier refrain.

---

> **Suivant** : [02 — Prompts (Style of Music & Exclude) →](./02-PROMPTS.md)
> **Retour** : [← Guide principal](./README.md)
