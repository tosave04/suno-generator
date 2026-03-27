# Changelog v1.2.0 — Composition Avancée

> **Date :** 27 mars 2026

---

## 🎯 Résumé

Version axée sur l'enrichissement de l'expérience de composition : multi-sélection genres/langues, mood optionnel, structures courtes, style vocal étendu avec icônes, ambiance futuriste, et robustesse accrue de la génération IA.

---

## ✨ Nouvelles fonctionnalités

### Multi-genre (1-2 max)
- `GenreSelector` passe de sélection simple à multi-sélection (1-2 genres)
- Mix de genres : instruction `GENRE MIX` dans le prompt pour fusionner 2 genres
- Genres au-delà de 2 visuellement désactivés (`opacity-40 cursor-not-allowed`)
- Schéma Zod : `genre` → `genres: z.array().min(1).max(2)`
- BDD : stockage `genres.join(",")` dans le champ `genre`

### Multi-langue (1-2 max)
- `ParamsPanel` passe de sélection simple à multi-sélection (1-2 langues)
- Mix de langues : alternance naturelle entre les deux langues dans les lyrics
- Schéma Zod : `language` → `languages: z.array().min(1).max(2)`
- BDD : stockage `languages.join(",")` dans le champ `language`

### Langue elfique (Quenya)
- Nouvelle langue : Elfique 🧝 avec phonologie finnoise (Quenya de Tolkien)
- Instructions spécifiques dans le contexte : voyelles douces, consonnes liquides, diphtongues

### Mood optionnel
- Le mood n'est plus requis pour générer
- Toggle deselect : cliquer sur le mood sélectionné le désélectionne
- Label "(optionnel)" ajouté
- Schéma Prisma : `mood String` → `mood String?` (nullable)
- Stats : gestion `null` avec fallback `"none"`

### Structures courtes
- Ajout `shortStructure: string[]` à `GenreData` (26 genres)
- Toggle "Courte / Standard" dans `ParamsPanel` (champ `songLength`)
- Context Builder utilise `shortStructure` quand `songLength === "short"`
- Instruction : "100-150 words max, use short structure, aim for 1-2 minutes"

### Style vocal étendu avec icônes
- Dropdown remplacé par des boutons icônes (emoji) avec toggle on/off
- Styles : 🧑 Male, 👩 Female, 👫 Duet, 🎶 Choir, 🤫 Whisper, 🎤 Rap, 🎭 Opera, 🤖 Robotic
- Style "Robotic" : instructions spécifiques (vocoder, auto-tune, voix synthétique)
- Fonction dédiée `buildVocalStyleContext()` dans le Context Builder

### Description du style d'écriture
- Affichage de la description du style sélectionné sous la grille de sélection

### Tempo renforcé dans les prompts
- Nouvelle fonction `buildTempoContext()` avec BPM spécifiques par palier
- Instruction explicite d'inclure le BPM dans `positivePrompt`

### Ambiance "Futuriste"
- Nouvelle atmosphère culturelle 🚀 (id: `futuristic`)
- Gammes : whole tone, chromatique, lydien, octatonique, microtonale
- Instruments : synthesizer, vocoder, drum machine, granular synth, sub bass, glitch
- 12 atmosphères culturelles au total

### Robustesse vocalGender
- `vocalGender` Zod : `.catch("Male")` — fallback silencieux si DeepSeek renvoie une valeur invalide
- Prompt renforcé : "MUST be exactly Male or Female"

---

## 📁 Fichiers modifiés

| Fichier | Modification |
|---------|-------------|
| `lib/data/types.ts` | Ajout `shortStructure` à `GenreData` |
| `lib/data/genres.ts` | Ajout `shortStructure` aux 26 genres |
| `lib/data/atmospheres.ts` | Ajout atmosphère "Futuriste" |
| `lib/schemas/generation.ts` | `genres[]`, `languages[]`, `mood` optional, `songLength`, `vocalGender.catch()` |
| `components/composition/genre-selector.tsx` | Multi-sélection (1-2 max) |
| `components/composition/mood-selector.tsx` | Toggle deselect, optionnel |
| `components/composition/style-selector.tsx` | Affichage description |
| `components/composition/params-panel.tsx` | Multi-langue, icônes vocal, songLength, Robotic |
| `lib/services/context-builder.ts` | Multi-genre, tempo BPM, multi-langue, elfique, songLength, buildVocalStyleContext |
| `lib/actions/generation.ts` | Adaptation genres/languages join, mood nullable |
| `lib/actions/stats.ts` | Gestion mood null |
| `app/(dashboard)/compose/page.tsx` | Nouveaux états et props |
| `prisma/schema.prisma` | `mood String?` nullable |
| `__tests__/generation.test.ts` | Tests adaptés aux nouveaux schémas |
| `__tests__/composition.test.tsx` | Tests adaptés aux nouvelles props |

---

## 🧪 Tests

- **95 tests** passent (6 fichiers)
- Lint : 0 erreur
- Build : 0 erreur TypeScript
