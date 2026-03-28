# 🎵 Suno Generator

> Application de composition musicale assistée par IA, générant des lyrics et prompts optimisés pour [Suno](https://suno.com).

**Version :** `1.5.0` · **Statut :** v1.5 — Calculateur Suno Settings & Chaos · **Licence :** Privé

---

## 🎯 Présentation

Suno Generator est une application web qui permet de créer des chansons de haute qualité via l'IA. L'utilisateur sélectionne un genre musical, un mood, un style d'écriture et d'autres caractéristiques musicales. L'application construit un contexte riche à partir de ces choix, puis génère via l'API DeepSeek (avec raisonnement) :

- **Lyrics** : paroles structurées au format Suno 2026 (tags `[Verse]`, `[Chorus]`, etc.)
- **Prompt positif** : description musicale détaillée pour Suno
- **Prompt négatif** : exclusions courtes pour affiner le résultat
- **Réglages avancés** : recommandations de paramètres Suno adaptés au style

## ✨ Fonctionnalités principales

| Fonctionnalité | Description |
|---|---|
| **Composition assistée** | Sélection de genre (1-2 mix), mood (optionnel), style d'écriture, tempo, langue (1-2 mix), atmosphère, durée (4 longueurs), etc. |
| **26 genres musicaux** | Pop, Rock, Hip-Hop, Jazz, K-Pop, Celtic, Afroworld, Disco, Indian, Japanese… |
| **13 langues** | Anglais, Français, Espagnol, Portugais, Japonais, Coréen, Russe, Hindi, Arabe, Chinois, Elfique… |
| **12 atmosphères culturelles** | Arabic, Asian, African, Latin, Western, European, Indian, Nordic, Russian, Slavic, Hybrid, Futuristic |
| **8 styles vocaux** | Male, Female, Duet, Choir, Whisper, Rap, Opera, Robotic — sélection par icônes |
| **Génération IA** | Lyrics + prompts Suno via DeepSeek (raisonnement avancé) |
| **Calculateur Suno** | Weirdness et styleInfluence calculés automatiquement selon genre/mood/style, avec labels explicites |
| **Transparence IA** | Onglet "Prompt IA" pour visualiser/copier le prompt système DeepSeek |
| **Historique & favoris** | Sauvegarde des générations en BDD avec système de favoris |
| **Filtres & recherche** | Panneau latéral filtrable (genre, favoris, fichier audio associé…) |
| **Upload audio** | Association de fichiers MP3/WAV aux générations |
| **Random Fill** | Remplissage aléatoire intelligent avec probabilités pondérées et effet "tirage de loto" |
| **Dashboard stats** | KPIs, top genres/moods, activité récente, stats par génération |
| **Responsive** | Interface adaptée mobile avec sidebar collapsible |
| **Accessibilité** | ARIA, navigation clavier, landmarks sémantiques |

## 🛠️ Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| **Next.js** | 16 | Framework React full-stack (App Router) |
| **React** | 19 | UI (Server & Client Components) |
| **TypeScript** | 5+ | Typage strict |
| **Tailwind CSS** | 4 | Styling utility-first |
| **Prisma** | 6+ | ORM (SQLite) |
| **Zod** | 3+ | Validation de données |
| **DeepSeek API** | — | Génération IA (raisonnement) |
| **Vitest** | 3+ | Tests unitaires & intégration |
| **Lucide React** | — | Icônes |

## 🚀 Démarrage rapide

### Prérequis

- Node.js >= 20
- Yarn (package manager)

### Installation

```bash
# Cloner le repository
git clone <repo-url> suno-generator
cd suno-generator

# Installer les dépendances
yarn install

# Copier les variables d'environnement
cp .env.example .env.local

# Initialiser la base de données
yarn db:generate
yarn db:push

# Lancer le serveur de développement
yarn dev
```

### Variables d'environnement

Voir [.env.example](.env.example) pour la liste complète. Variables requises :

| Variable | Description |
|---|---|
| `DEEPSEEK_API_KEY` | Clé API DeepSeek pour la génération |
| `DATABASE_URL` | URL de la base de données SQLite |

## 📁 Structure du projet

```
suno-generator/
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Interface principale (composition, historique)
│   ├── (site)/             # Pages publiques
│   ├── api/                # Routes API
│   ├── globals.css         # Styles globaux Tailwind
│   ├── layout.tsx          # Layout racine
│   └── page.tsx            # Landing page
├── components/             # Composants React (UI, composition)
│   ├── ui/                 # Button, Badge
│   └── composition/        # Sélecteurs genre, mood, style, params, prompt, output
├── lib/                    # Services, utilitaires, actions serveur
│   ├── actions/            # Server Actions (génération)
│   ├── data/               # Corpus musical (genres, moods, styles, tags, règles)
│   ├── schemas/            # Schémas Zod de validation
│   ├── services/           # Context Builder, client DeepSeek
│   └── utils/              # Utilitaires (stats)
├── prisma/                 # Schéma Prisma & migrations
├── public/                 # Fichiers statiques & uploads audio
├── docs/                   # Documentation technique
│   ├── suno/               # 4 guides Suno AI (bonnes pratiques)
│   ├── SPECIFICATIONS.md   # Cahier des charges complet
│   ├── ROADMAP.md          # Feuille de route de développement
│   ├── TEMPLATE.md         # Charte graphique & patterns UI
│   ├── RELEASES.md         # Résumé des releases
│   ├── changelogs/         # Changelogs détaillés
│   └── releases/           # Notes de release
└── __tests__/              # Tests (Vitest)
```

## 📖 Documentation

- [Cahier des charges](docs/SPECIFICATIONS.md) — Spécifications complètes
- [Roadmap](docs/ROADMAP.md) — Plan de développement
- [Charte UI](docs/TEMPLATE.md) — Patterns et composants Tailwind
- [Releases](docs/RELEASES.md) — Historique des versions

## 🧪 Scripts disponibles

```bash
yarn dev          # Serveur de développement
yarn build        # Build de production
yarn start        # Serveur de production
yarn lint         # Lint ESLint
yarn test         # Tests Vitest
yarn db:generate  # Générer le client Prisma
yarn db:push      # Appliquer le schéma à la BDD
yarn db:studio    # Interface Prisma Studio
```
