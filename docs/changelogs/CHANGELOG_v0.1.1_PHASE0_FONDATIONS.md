# Changelog — v0.1.1 · Phase 0 : Fondations

> **Date :** 25 mars 2026

---

## Ajouts

### Stack technique
- Initialisation Next.js 16.2.1 + React 19.2.4 + Tailwind CSS 4
- Configuration TypeScript strict
- Configuration ESLint 9 (flat config)
- Installation Vitest 4 + configuration jsdom, globals, setup

### Base de données
- Installation Prisma 7 + SQLite (BetterSqlite3 adapter)
- Création du schéma Prisma `Generation` (20+ champs, index sur genre/isFavorite/createdAt)
- Configuration `prisma.config.ts` (schema path, migrations, datasource)
- Création `lib/db.ts` (singleton Prisma avec BetterSqlite3)
- Génération du client Prisma dans `lib/generated/prisma/`
- Scripts DB : `db:generate`, `db:push`, `db:studio`, `db:migrate`

### Dépendances
- Installation Zod 4
- Installation Lucide React

### Documentation
- Rédaction `README.md` professionnel
- Rédaction `docs/SPECIFICATIONS.md` (cahier des charges complet, 8 sections)
- Rédaction `docs/ROADMAP.md` (7 phases, jalons)
- Rédaction `docs/TEMPLATE.md` (charte UI complète — 14 sections, 835 lignes)
  - Palette couleurs (sombre/clair), typographie, spacing
  - Composants : Button (5 variantes), Badge (4 variantes), Card (3 types), Toggle
  - Formulaires : Input, Textarea, Select, Radio group, Boutons segmentés
  - Layout : Header, Sidebar, Zone principale, Zone de résultat
  - Sélecteurs de composition : genre grid, mood badges, style radio, tempo
  - Generation output : tabs, lyrics colorés, prompts copiables, réglages avancés
  - Upload audio, états UI, responsive, icônes Lucide, animations

### Configuration
- Création `.env.example` (DATABASE_URL, DEEPSEEK_API_KEY, DEEPSEEK_MODEL)

### Instructions Copilot
- Renforcement des règles anti-crash token LLM dans `AGENTS.md`
  - Ajout règle critique n°5 : limite 1-2 fichiers par étape
  - Réécriture section workflow itératif avec limites concrètes

---

## Corrections

- Aucune (release initiale)

---

## Breaking Changes

- Aucun (release initiale)
