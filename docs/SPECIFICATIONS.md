# 📋 Cahier des Charges — Suno Generator

> **Version :** 0.1.0 · **Date :** 24 mars 2026 · **Statut :** Phase de conception

---

## 1. Présentation du projet

### 1.1 Vision

Suno Generator est une application web de composition musicale assistée par IA. Elle permet à un utilisateur de définir des paramètres musicaux (genre, mood, style d'écriture, tempo, langue…) et de générer automatiquement :

1. Des **lyrics** structurés au format Suno 2026
2. Un **prompt positif** décrivant le style musical souhaité
3. Un **prompt négatif** court pour exclure les éléments indésirables
4. Des **réglages avancés** recommandés pour Suno

### 1.2 Objectifs principaux

| # | Objectif | Priorité |
|---|----------|----------|
| O1 | Générer des lyrics de qualité professionnelle adaptés à Suno | Critique |
| O2 | Construire un contexte IA riche basé sur les choix musicaux | Critique |
| O3 | Interface sobre, intuitive et rapide | Haute |
| O4 | Historique des générations avec favoris et filtres | Haute |
| O5 | Upload de fichiers audio (MP3/WAV) associés aux générations | Moyenne |
| O6 | Statistiques sur les générations | Basse |

### 1.3 Public cible

- Musiciens et compositeurs utilisant Suno
- Créateurs de contenu souhaitant des musiques originales
- Amateurs de musique explorant la composition assistée par IA

### 1.4 Contraintes techniques

- **Mono-utilisateur** (pas d'authentification dans la v1)
- **Base de données locale** : SQLite via Prisma
- **API externe unique** : DeepSeek (raisonnement avancé)
- **Données musicales en dur** : corpus de règles intégrées à l'application (pas d'appels externes en production)

---

## 2. Architecture technique

### 2.1 Stack

| Couche | Technologie | Justification |
|--------|-------------|---------------|
| Framework | Next.js 16 (App Router) | SSR, Server Components, Server Actions |
| UI | React 19 + Tailwind CSS 4 | Performances, utility-first |
| Typage | TypeScript 5 (strict) | Fiabilité, maintenabilité |
| ORM | Prisma 6 + SQLite | Simple, fichier local, migrations |
| Validation | Zod 3 | Validation runtime typée |
| IA | DeepSeek API (reasoning) | Génération haute qualité |
| Tests | Vitest 3 + Playwright | Unit/Integration + E2E |
| Icônes | Lucide React | Léger, cohérent |

### 2.2 Structure des dossiers

```
suno-generator/
├── app/
│   ├── (dashboard)/              # Interface principale
│   │   ├── layout.tsx            # Layout dashboard (sidebar + main)
│   │   ├── page.tsx              # Page de composition (défaut)
│   │   └── history/
│   │       └── page.tsx          # Page historique complète (optionnel)
│   ├── (site)/
│   │   └── page.tsx              # Landing page publique
│   ├── api/
│   │   ├── generations/          # CRUD générations
│   │   └── upload/               # Upload fichiers audio
│   ├── globals.css
│   ├── layout.tsx                # Layout racine
│   └── page.tsx                  # Redirection ou landing
│
├── components/
│   ├── ui/                       # Composants UI génériques (Button, Card, Badge…)
│   ├── composition/              # Composants de la zone de composition
│   │   ├── genre-selector.tsx
│   │   ├── mood-selector.tsx
│   │   ├── style-selector.tsx
│   │   ├── params-panel.tsx
│   │   ├── prompt-input.tsx
│   │   └── generation-output.tsx
│   ├── sidebar/                  # Panneau latéral historique
│   │   ├── sidebar.tsx
│   │   ├── sidebar-filters.tsx
│   │   └── generation-card.tsx
│   └── shared/                   # Composants partagés (Header, Loading…)
│
├── lib/
│   ├── actions/                  # Server Actions
│   │   ├── generation.ts         # Créer, modifier, supprimer générations
│   │   ├── favorite.ts           # Gérer favoris
│   │   └── upload.ts             # Upload fichiers audio
│   ├── services/
│   │   ├── deepseek.ts           # Client API DeepSeek
│   │   └── context-builder.ts    # Construction du contexte IA
│   ├── data/
│   │   ├── genres.ts             # Données des genres musicaux
│   │   ├── moods.ts              # Données des moods
│   │   ├── styles.ts             # Styles d'écriture
│   │   ├── suno-tags.ts          # Tags de structure Suno
│   │   └── music-rules.ts        # Règles musicales par genre/époque
│   ├── schemas/                  # Schémas Zod
│   │   ├── generation.ts
│   │   └── upload.ts
│   ├── utils/                    # Utilitaires
│   │   ├── stats.ts              # Calcul de statistiques
│   │   └── format.ts             # Formatage
│   └── db.ts                     # Instance Prisma singleton
│
├── prisma/
│   └── schema.prisma             # Schéma de la base de données
│
├── public/
│   └── uploads/                  # Fichiers audio uploadés
│
└── __tests__/                    # Tests Vitest
```

### 2.3 Flux de données principal

```
[Utilisateur]
    │
    ▼
[Sélection paramètres]  ──→  genre, mood, style, tempo, langue, demande libre
    │
    ▼
[Context Builder]        ──→  Construit le prompt système à partir des règles musicales
    │                          en dur + paramètres sélectionnés
    ▼
[DeepSeek API]           ──→  Envoie le contexte enrichi + demande utilisateur
    │                          (mode raisonnement activé)
    ▼
[Parsing réponse]        ──→  Extrait : lyrics, prompt+, prompt-, réglages
    │
    ▼
[Affichage + Sauvegarde] ──→  Affichage dans l'UI + persistance en BDD
```

---

## 3. Base de données

### 3.1 Schéma Prisma

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Generation {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Paramètres utilisateur
  title       String?              // Titre donné par l'utilisateur (optionnel)
  userPrompt  String               // Demande libre de l'utilisateur
  genre       String               // Genre musical sélectionné
  subGenre    String?              // Sous-genre (optionnel)
  mood        String               // Mood sélectionné
  style       String               // Style d'écriture
  tempo       String?              // Tempo (Slow, Medium, Fast, etc.)
  language    String  @default("en") // Langue des lyrics
  vocalStyle  String?              // Style vocal (Male, Female, Duet…)
  songStructure String?            // Structure personnalisée (optionnel)

  // Résultats de la génération
  lyrics          String           // Lyrics générés (format Suno avec tags)
  positivePrompt  String           // Prompt positif pour Suno
  negativePrompt  String?          // Prompt négatif court
  advancedSettings String?         // Réglages avancés (JSON stringifié)

  // Métadonnées
  isFavorite  Boolean @default(false)
  audioFile   String?              // Chemin relatif vers le fichier audio uploadé
  audioFormat String?              // "mp3" | "wav"

  // Statistiques
  wordCount       Int?             // Nombre de mots dans les lyrics
  characterCount  Int?             // Nombre de caractères
  detectedLanguage String?         // Langue détectée automatiquement
  sectionCount    Int?             // Nombre de sections (Verse, Chorus…)
  estimatedDuration String?        // Durée estimée
}
```

### 3.2 Description des champs

| Champ | Type | Description |
|-------|------|-------------|
| `id` | String (CUID) | Identifiant unique |
| `userPrompt` | String | Description libre de la chanson souhaitée |
| `genre` | String | Genre musical principal (Pop, Rock, Hip-Hop…) |
| `subGenre` | String? | Sous-genre optionnel (Indie Rock, Trap…) |
| `mood` | String | Atmosphère (Joyful, Melancholic, Energetic…) |
| `style` | String | Style d'écriture (Poetic, Storytelling, Direct…) |
| `tempo` | String? | Indication de tempo |
| `language` | String | Langue des paroles (code ISO) |
| `vocalStyle` | String? | Type de voix souhaitée |
| `lyrics` | String | Paroles générées avec tags Suno |
| `positivePrompt` | String | Prompt descriptif pour Suno |
| `negativePrompt` | String? | Exclusions courtes |
| `advancedSettings` | String? | JSON des réglages avancés recommandés |
| `isFavorite` | Boolean | Marqué comme favori |
| `audioFile` | String? | Chemin vers le fichier audio uploadé |

### 3.3 Index et performances

```prisma
// Ajouts dans le model Generation :
@@index([genre])
@@index([isFavorite])
@@index([createdAt])
```

La base SQLite est adaptée pour un usage mono-utilisateur avec quelques centaines à milliers de générations.

---

## 4. Interface utilisateur

### 4.1 Principes de design

- **Sobre et professionnel** : thème sombre par défaut, couleurs d'accent mesurées
- **Intuitive** : pas de tutoriel nécessaire, navigation évidente
- **Responsive** : mobile-first, adapté desktop avec sidebar
- **Rapide** : Server Components par défaut, Client Components uniquement pour l'interactivité

### 4.2 Layout principal (Dashboard)

```
┌─────────────────────────────────────────────────────────┐
│  Header : Logo + Titre + Actions rapides                │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  Sidebar     │   Zone principale                        │
│              │                                          │
│  ┌────────┐  │   ┌────────────────────────────────┐     │
│  │Filtres │  │   │  Paramètres de composition     │     │
│  │        │  │   │  (Genre, Mood, Style, Tempo…)  │     │
│  ├────────┤  │   ├────────────────────────────────┤     │
│  │        │  │   │  Zone de texte libre            │     │
│  │Histori-│  │   │  (description de la chanson)    │     │
│  │que des │  │   ├────────────────────────────────┤     │
│  │généra- │  │   │  [Bouton Générer]               │     │
│  │tions   │  │   ├────────────────────────────────┤     │
│  │        │  │   │  Résultat :                     │     │
│  │(cards) │  │   │  - Lyrics (avec tags Suno)      │     │
│  │        │  │   │  - Prompt positif               │     │
│  │        │  │   │  - Prompt négatif               │     │
│  └────────┘  │   │  - Réglages avancés             │     │
│              │   └────────────────────────────────┘     │
└──────────────┴──────────────────────────────────────────┘
```

### 4.3 Composants de la zone de composition

#### 4.3.1 Sélecteurs de paramètres

| Composant | Type | Options |
|-----------|------|---------|
| Genre selector | Grid de cards cliquables | Pop, Rock, Hip-Hop, Jazz, Electronic, R&B, Country, Classical, Metal, Folk, Reggae, Latin, Blues, Funk, Soul, Indie, Punk, Ambient, K-Pop, 16-Bit, Celtic, Afro/World, Disco/Dance, Middle Eastern, Indian, Japanese (26 genres) |
| Sub-genre selector | Dropdown dynamique | Dépend du genre sélectionné |
| Mood selector | Grid de badges | Joyful, Melancholic, Energetic, Calm, Aggressive, Romantic, Dark, Uplifting, Nostalgic, Epic |
| Style d'écriture | Radio group | Poetic, Storytelling, Direct, Abstract, Conversational, Anthem |
| Tempo | Slider ou boutons | Very Slow, Slow, Medium, Fast, Very Fast |
| Langue | Dropdown | English, French, Spanish, Portuguese, Japanese, Korean, German, Italian, Russian, Hindi, Arabic, Chinese (12 langues) |
| Style vocal | Dropdown | Male, Female, Duet, Choir, Whisper, Rap, Opera |
| Ambiance culturelle | Grid de badges (optionnel) | Arabique/Moyen-Orient, Asiatique, Africaine, Latine, Occidentale moderne, Européenne classique/folk, Indienne, Hybride/Cinématique, Nordique, Russe, Slave (11 ambiances) |

#### 4.3.2 Zone de texte libre

- Textarea avec placeholder explicatif
- Compteur de caractères
- Exemples cliquables pour inspirer l'utilisateur

#### 4.3.3 Zone de résultat

- **Lyrics** : affichage formaté avec coloration des tags Suno (`[Verse]`, `[Chorus]`, `[Bridge]`…)
- **Prompt positif** : texte copiable en un clic
- **Prompt négatif** : texte copiable en un clic
- **Réglages avancés** : affichage structuré des recommandations
- **Actions** : Copier tout, Sauvegarder, Ajouter aux favoris, Régénérer, Upload audio

### 4.4 Sidebar — Historique & filtres

#### 4.4.1 Filtres disponibles

| Filtre | Type | Description |
|--------|------|-------------|
| Recherche | Texte libre | Recherche dans titre et userPrompt |
| Genre | Multi-select | Filtrer par genre(s) |
| Favoris uniquement | Toggle | N'afficher que les favoris |
| Avec audio | Toggle | N'afficher que les générations avec fichier audio |
| Tri | Select | Par date (récent/ancien), par titre |

#### 4.4.2 Card de génération (sidebar)

Chaque génération dans la sidebar affiche :
- Titre (ou début du userPrompt si pas de titre)
- Genre + Mood (badges)
- Date de création
- Icône favori (cliquable)
- Icône audio (si fichier associé)

Cliquer sur une card charge la génération dans la zone principale.

### 4.5 Upload audio

- Formats acceptés : **MP3**, **WAV** uniquement
- Taille maximale : **20 Mo**
- Stockage : `public/uploads/` avec nom unique (CUID)
- Association 1:1 avec une génération
- Possibilité de remplacer ou supprimer le fichier audio

---

## 5. Système de génération IA

### 5.1 Architecture du Context Builder

Le Context Builder est le cœur intelligent de l'application. Il transforme les paramètres utilisateur en un contexte riche pour l'IA.

```
Paramètres utilisateur
    │
    ├── Genre + Sub-genre  ──→  Règles musicales du genre
    │                            (structure type, instruments, BPM range,
    │                             techniques vocales, références historiques)
    │
    ├── Mood               ──→  Vocabulaire émotionnel, champs lexicaux,
    │                            tonalités et gammes recommandées
    │
    ├── Style d'écriture   ──→  Règles de rédaction (rimes, métaphores,
    │                            narration, niveau de langage)
    │
    ├── Tempo              ──→  BPM recommandé, densité de syllabes,
    │                            style de delivery
    │
    ├── Langue             ──→  Conventions linguistiques, structure phrasé
    │
    ├── Style vocal        ──→  Indications vocales pour le prompt Suno
    │
    └── Ambiance culturelle ──→ Couleur culturelle (gammes, instruments,
                                 textures sonores) intégrée au prompt Suno
    
    ═══════════════════════════════════
    
    Contexte assemblé (prompt système)
```

### 5.2 Données musicales en dur (lib/data/)

Les données musicales seront pré-recherchées et stockées en dur dans le code source. Elles constituent le corpus de connaissances de l'application.

#### 5.2.1 Genres musicaux (`genres.ts`)

Pour chaque genre, les informations suivantes :

```typescript
interface GenreData {
  id: string;
  name: string;
  description: string;
  subGenres: string[];
  typicalBpm: { min: number; max: number };
  typicalStructure: string[];        // Ex: ["Intro", "Verse", "Chorus", "Verse", "Chorus", "Bridge", "Chorus", "Outro"]
  keyInstruments: string[];
  vocalCharacteristics: string[];
  historicalContext: string;          // Origine et évolution du genre
  sunoTags: string[];                // Tags Suno pertinents
  promptKeywords: string[];          // Mots-clés efficaces pour le prompt Suno
  avoidKeywords: string[];           // Mots-clés à éviter pour ce genre
}
```

#### 5.2.2 Moods (`moods.ts`)

```typescript
interface MoodData {
  id: string;
  name: string;
  description: string;
  lexicalFields: string[];           // Champs lexicaux associés
  musicalCharacteristics: string[];  // Mineur/Majeur, dynamique, etc.
  compatibleGenres: string[];        // Genres qui matchent bien
  promptModifiers: string[];         // Modificateurs pour le prompt Suno
}
```

#### 5.2.3 Styles d'écriture (`styles.ts`)

```typescript
interface WritingStyleData {
  id: string;
  name: string;
  description: string;
  rules: string[];                   // Règles d'écriture (rimes, métaphores…)
  examples: string[];                // Exemples de patterns
  sunoFormatting: string[];          // Conseils de formatage pour Suno
}
```

#### 5.2.4 Ambiances culturelles (`atmospheres.ts`)

```typescript
interface AtmosphereData {
  id: string;
  name: string;
  emoji: string;
  description: string;
  scales: string[];                  // Gammes/modes caractéristiques
  keyInstruments: string[];          // Instruments typiques
  characteristics: string[];        // Caractéristiques sonores
  promptKeywords: string[];          // Mots-clés pour le prompt Suno
  avoidKeywords: string[];           // Mots-clés à éviter
}
```

8 ambiances disponibles : Arabique/Moyen-Orient, Asiatique, Africaine, Latine, Occidentale moderne, Européenne classique/folk, Indienne, Hybride/Cinématique, Nordique, Russe, Slave. L'ambiance est optionnelle et ajoute une couleur culturelle qui s'intègre au genre et au mood choisis sans les remplacer.

### 5.3 Intégration DeepSeek API

#### 5.3.1 Configuration

```typescript
// lib/services/deepseek.ts
interface DeepSeekConfig {
  apiKey: string;
  model: string;                     // "deepseek-reasoner" ou équivalent
  maxTokens: number;
  temperature: number;
}
```

#### 5.3.2 Format de la requête

Le prompt envoyé à DeepSeek est composé de :

1. **System prompt** : règles générales de composition + format de sortie attendu
2. **Context** : données musicales assemblées par le Context Builder
3. **User prompt** : la demande libre de l'utilisateur

#### 5.3.3 Format de sortie attendu

L'IA doit retourner un JSON structuré :

```json
{
  "lyrics": "[Intro]\n(instrumental)\n\n[Verse 1]\nLigne 1...\nLigne 2...\n\n[Chorus]\n...",
  "positivePrompt": "Indie rock, dreamy guitars, soft male vocals, 120 BPM, reverb-heavy...",
  "negativePrompt": "no autotune, no heavy bass, no screaming",
  "advancedSettings": {
    "bpm": 120,
    "key": "C Major",
    "duration": "3:30",
    "instrumentalSections": true,
    "vocalEffects": ["reverb", "slight delay"],
    "mixingNotes": "Guitars prominent, drums subtle"
  }
}
```

### 5.4 Tags Suno supportés (2026)

Tags de structure à utiliser dans les lyrics :

| Tag | Description |
|-----|-------------|
| `[Intro]` | Introduction instrumentale |
| `[Verse]` / `[Verse 1]` | Couplet |
| `[Pre-Chorus]` | Pré-refrain |
| `[Chorus]` | Refrain |
| `[Post-Chorus]` | Post-refrain |
| `[Bridge]` | Pont musical |
| `[Outro]` | Conclusion |
| `[Instrumental]` | Section instrumentale |
| `[Break]` | Pause / rupture |
| `[Hook]` | Accroche mélodique |
| `[Ad-lib]` | Improvisations vocales |
| `(instrumental)` | Indication inline |
| `(whisper)`, `(shout)` | Indications de delivery |

### 5.5 Statistiques calculées

Après chaque génération, les statistiques suivantes sont calculées automatiquement :

| Statistique | Calcul |
|-------------|--------|
| `wordCount` | Nombre de mots (hors tags) |
| `characterCount` | Nombre de caractères (hors tags) |
| `sectionCount` | Nombre de sections (tags `[...]`) |
| `detectedLanguage` | Détection basique par analyse du texte |
| `estimatedDuration` | Estimation basée sur le BPM et le nombre de sections |

---

## 6. Server Actions & API

### 6.1 Server Actions (lib/actions/)

Toutes les mutations passent par des Server Actions avec validation Zod.

#### 6.1.1 `createGeneration`

- **Input** : paramètres de composition (validés via Zod)
- **Processus** : Context Builder → DeepSeek API → calcul stats → sauvegarde BDD
- **Output** : `Generation` complète
- **Revalidation** : `revalidatePath("/(dashboard)")`

#### 6.1.2 `toggleFavorite`

- **Input** : `{ id: string }`
- **Processus** : toggle `isFavorite` en BDD
- **Revalidation** : `revalidatePath("/(dashboard)")`

#### 6.1.3 `deleteGeneration`

- **Input** : `{ id: string }`
- **Processus** : supprime la génération + fichier audio associé si existant
- **Revalidation** : `revalidatePath("/(dashboard)")`

#### 6.1.4 `uploadAudio`

- **Input** : `FormData` (fichier + generationId)
- **Validation** : type MIME (audio/mpeg, audio/wav), taille < 20 Mo
- **Processus** : sauvegarde dans `public/uploads/`, mise à jour BDD
- **Revalidation** : `revalidatePath("/(dashboard)")`

### 6.2 Routes API (optionnelles)

| Route | Méthode | Description |
|-------|---------|-------------|
| `/api/generations` | GET | Liste des générations (avec filtres en query params) |
| `/api/generations/[id]` | GET | Détail d'une génération |
| `/api/upload` | POST | Upload fichier audio |

> Note : Les Server Actions sont privilégiées. Les routes API sont prévues pour un éventuel usage externe futur.

### 6.3 Schémas Zod

```typescript
// lib/schemas/generation.ts
const createGenerationSchema = z.object({
  userPrompt: z.string().min(10).max(2000),
  genre: z.string().min(1),
  subGenre: z.string().optional(),
  mood: z.string().min(1),
  style: z.string().min(1),
  tempo: z.string().optional(),
  language: z.string().default("en"),
  vocalStyle: z.string().optional(),
  songStructure: z.string().optional(),
  title: z.string().max(100).optional(),
});

// lib/schemas/upload.ts
const uploadSchema = z.object({
  generationId: z.string().cuid(),
  file: z.instanceof(File)
    .refine((f) => f.size <= 20 * 1024 * 1024, "Fichier trop volumineux (max 20 Mo)")
    .refine(
      (f) => ["audio/mpeg", "audio/wav"].includes(f.type),
      "Format non supporté (MP3 ou WAV uniquement)"
    ),
});
```

---

## 7. Contraintes & règles

### 7.1 Performance

- Les données musicales (genres, moods, styles) sont en dur : **aucun appel BDD ni API** au chargement des sélecteurs
- Le seul appel API externe est vers DeepSeek lors de la génération
- Utiliser les Server Components pour le layout et la sidebar (pas de JS client)
- Client Components uniquement pour les sélecteurs interactifs et le formulaire

### 7.2 Sécurité

- Validation Zod systématique sur toutes les entrées
- Sanitization des noms de fichiers uploadés (CUID comme nom)
- Vérification MIME type des fichiers audio côté serveur
- Pas d'exposition de la clé API DeepSeek côté client
- Rate limiting basique sur la génération (éviter les abus)

### 7.3 Gestion d'erreurs

| Cas d'erreur | Comportement |
|--------------|-------------|
| API DeepSeek indisponible | Message d'erreur explicite, pas de crash |
| Réponse IA mal formatée | Retry automatique (1x), puis erreur utilisateur |
| Upload fichier invalide | Rejet avec message d'erreur clair |
| Validation Zod échouée | Affichage des erreurs par champ |
| BDD inaccessible | Message d'erreur générique |

### 7.4 Limites de la v1

- Pas d'authentification (mono-utilisateur)
- Pas de collaboration / partage
- Pas de streaming de la réponse IA (réponse complète uniquement)
- Pas d'édition manuelle des lyrics post-génération (prévu v2)
- Pas d'intégration directe avec l'API Suno (copier-coller)

---

## 8. Évolutions futures (post-v1)

| Fonctionnalité | Version cible |
|----------------|---------------|
| Édition manuelle des lyrics avec preview live | v1.1 |
| Streaming de la réponse IA (affichage progressif) | v1.1 |
| Multi-langues pour l'interface | v1.2 |
| Authentification & multi-utilisateur | v2.0 |
| Intégration API Suno directe | v2.0 |
| Export PDF des lyrics | v1.2 |
| Templates de chansons prédéfinis | v1.1 |
| Historique des versions d'une génération | v2.0 |