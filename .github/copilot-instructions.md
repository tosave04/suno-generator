> Copilot: Always load this document first. Follow linked files for authoritative rules.  
> Never generate code before checking these references.

# 🤖 Copilot Instructions — RAG Application

> **Pour Copilot :** Lis TOUJOURS ce document en premier. Applique ces règles strictement. Consulte les docs officielles avant toute suggestion.

---

## 📋 Index des règles prioritaires

### 🔴 Règles critiques (JAMAIS enfreindre)

1. **TypeScript strict** : `as any` interdit (sauf tests/scripts dev temporaires)
2. **Next.js 16** : `params` et `searchParams` = `Promise<>` (TOUJOURS)
3. **Build validation** : `yarn lint; yarn build` doit réussir avant tout commit
4. **Encodage UTF-8** : Tous les fichiers SANS BOM

### 🟠 Règles importantes (respecter systématiquement)

1. **Tests obligatoires** : Minimum 1 test par PR
2. **Server Actions** : Validation Zod + `revalidatePath()` après mutations
3. **Client Components** : `"use client"` seulement si interactivité requise
4. **Modifications manuelles** : Pas de scripts shell pour modifier le code
5. **Revue “Human-Quality” obligatoire** (APRÈS tout ajout de code)  
   Après chaque génération ou modification de code, Copilot DOIT effectuer une revue rapide et appliquer les corrections nécessaires AVANT de proposer la solution finale :
   - Supprimer tout code inutile (imports, variables, fonctions, logs, branches mortes)
   - Éliminer la redondance (factoriser, éviter copier-coller)
   - Simplifier la logique (lisibilité > astuce, éviter la verbosité inutile)
   - Vérifier le typage strict et les cas limites (`null`, `undefined`, erreurs, états vides)
   - Aligner avec les bonnes pratiques Next.js / React / TypeScript (2026)
   - Améliorer la lisibilité “humaine” (noms explicites, structure claire, commentaires uniquement si nécessaires)
6. **UI & Tailwind** : Toute UI générée doit respecter [TEMPLATE.md](../docs/TEMPLATE.md)
   - Utiliser exclusivement les patterns définis (Cards, Buttons, Badges, Tables, Trade Board)
   - Ne pas inventer de styles ou composants hors charte sans mise à jour du template
   - Toute nouvelle variante UI doit être documentée dans `docs/TEMPLATE.md`

### 🟢 Bonnes pratiques (recommandations fortes)

1. **Documentation** : TSDoc/JSDoc pour fonctions exportées
2. **Composants contrôlés** : Préférer valeurs dérivées pour réactivité
3. **Workflow itératif** : Tâches complexes = découpage en étapes
4. **Context7/Fetch** : Consulter docs officielles en cas d'incertitude

---

## 🗺️ Architecture du projet

### Structure initiale des dossiers

```
rag/
├── .github/														# 📖 DOCS AUTORITAIRES — Lis en premier
│   └── copilot-instructions.md					# Ce fichier d'instructions
│
├── app/																# Next.js 16 App Router
│   ├── (dashboard)											# Routes protégées (Dashboard, Settings, etc.)
│   ├── (site)													# Routes publiques (Home, About, etc.)
│   ├── api															# Routes API
│   ├── globals.css											# Styles globaux (Tailwind CSS)
│   ├── layout.tsx											# Layout racine (Server Component)
│   └── page.tsx												# Landing page
│
├── components/													# Composants React organisés
│
├── docs/																# Documentation technique, changelogs, releases
│   ├── changelogs/											# Dossier des changelogs par release
│   │   └── CHANGELOG_vx.x.x_TITLE.md 	# Changelogs détaillés
│   │
│   ├── releases/												# Dossier des releases
│   │   └── RELEASE_NOTES_vx.x.x.md			# Notes de release détaillées
│   │
│   ├── SPECIFICATIONS.md								# Spécifications techniques détaillées du projet (schémas, flux, choix techniques)
│   ├── RELEASES.md											# Résumé synthétique des releases
│   └── ROADMAP.md											# Suivi roadmap projet
│
├── lib/																# Librairies internes (API, utils, services)
├── public/															# Fichiers statiques publics
│
├── .env.example												# Exemple de variables d’environnement
├── .env.local													# Variables d’environnement locales (non commit)
├── .gitignore													# Fichiers/dossiers ignorés par Git
├── package.json												# Dépendances & scripts principaux
└── README.md														# Présentation du projet
```

### Stack technique initiale (2026)

| Technologie      | Version | Rôle                                  | Docs officielles                                            |
| ---------------- | ------- | ------------------------------------- | ----------------------------------------------------------- |
| **Next.js**      | >=16    | Framework React full-stack            | `#fetch https://nextjs.org/docs/llms-full.txt`              |
| **React**        | >=19    | Library UI (Server/Client Components) | `mcp_context7_get-library-docs` `/facebook/react`           |
| **TypeScript**   | >=5     | Typage strict                         | `#fetch https://www.typescriptlang.org/docs/`               |
| **Tailwind CSS** | >=4     | Utility-first CSS                     | `mcp_context7_get-library-docs` `/tailwindlabs/tailwindcss` |
| **Eslint**       | >=9     | Linting & qualité de code             | `#fetch https://eslint.org/docs/`                           |
| **Zod**          | >=3     | Validation de données                 | `#fetch https://zod.dev/`                                   |
| **Prisma**       | >=5     | ORM pour base de données              | `#fetch https://www.prisma.io/docs/llms.txt`                |
| **Vitest**       | >=0.34  | Testing framework                     | `#fetch https://vitest.dev/guide/`                          |
| **Playwright**   | >=1.30  | E2E testing                           | `#fetch https://playwright.dev/docs/intro/`                 |
| **MSW**          | >=1.2   | Mocking API                           | `#fetch https://mswjs.io/docs/quick-start/`                 |

**Intégrations externes :**

Fichier `.env.example` (variables d’environnement pour exemple avec explications).
Fichier `.env.local` (variables locales, non commit).

Nom de variable d’environnement = `NOM_SERVICE_VARIABLE` (ex: `DATABASE_URL`, `AUTH_SECRET`, etc.)

Toute autre service externe (Base de données, authentification, etc.) n’a PAS de variable d’environnement par défaut (à configurer selon le déploiement).

### 📖 Documentation technique à toujours consulter (obligatoire)

- Présentation du projet : `README.md` [README.md](../README.md)

- Pour les détails d'implémentation (schémas, flux, choix techniques), consulter `SPECIFICATIONS.md` [SPECIFICATIONS.md](../docs/SPECIFICATIONS.md)

- Feuille de route du projet : `ROADMAP.md` [ROADMAP.md](../docs/ROADMAP.md)

- Résumé des releases : `RELEASES.md` [RELEASES.md](../docs/RELEASES.md)

- Pour toute implémentation UI (composants, pages, layout), consulter obligatoirement `docs/TEMPLATE.md` (charte graphique + patterns Tailwind autoritaires). Ne pas consulter si l'UI n'est pas concernée (ex: API, utils, etc.)

## 🧩 Conventions de nommage

| Élément             | Convention                | Exemple                  |
| ------------------- | ------------------------- | ------------------------ |
| Fichier             | kebab-case                | `user-card.tsx`          |
| Dossier             | kebab-case                | `user-profile/`          |
| Composant React     | PascalCase                | `UserCard.tsx`           |
| Hook                | camelCase (préfixé `use`) | `useAuthSession.ts`      |
| Variable / Fonction | camelCase                 | `fetchUserData()`        |
| Constante           | UPPER_SNAKE_CASE          | `API_BASE_URL`           |
| Type / Interface    | PascalCase                | `User`, `ApiResponse<T>` |

---

## ✅ Checklist avant release

### 1. Lint, Test & Build

```bash
yarn lint     # Doit réussir (0 erreur ESLint)
yarn test     # Doit réussir (0 test failed)
yarn build    # Doit réussir (0 erreur TypeScript)
```

Aucun code ne doit être considéré “terminé” tant que ces commandes ne passent pas.

### 2. Tests

> **Règle projet :** Toute PR doit inclure **au moins 1 test** pertinent.
> Les tests sont obligatoires pour garantir la stabilité en Next.js 16 (App Router) et TypeScript strict.

#### ✅ Stack de test recommandée (2026)

- **Unit & Integration** : **Vitest** + Testing Library
- **E2E (parcours critiques)** : **Playwright**
- **Mocks réseau** : **MSW** (interdiction d’appels réseau réels en test)

#### 🎯 Exigences minimales

1. **1 test minimum par PR** (pas de test “dummy”)
2. Tester en priorité :
   - Schémas **Zod** (validation + erreurs)
   - **Server Actions** (validation + `revalidatePath()` après mutation)
   - Composants interactifs (`"use client"`) : rendu, états vides, erreurs

3. Les tests doivent être :
   - **Déterministes** (pas de flakiness)
   - Compatibles CI
   - Strictement typés (aucun `as any`)

### 3. TypeScript strict

- [ ] Aucun `as any` (sauf tests/scripts dev)
- [ ] Enums Prisma importés (pas redéfinis)
- [ ] `params`/`searchParams` = `Promise<>` (Next.js 16)
- [ ] `Link href` avec `as Route`
- [ ] Conversions null→undefined explicites

### 4. Actions serveur

- [ ] `"use server"` en première ligne
- [ ] Validation Zod
- [ ] `revalidatePath()` après mutations
- [ ] Gestion erreurs typées

### 5. Encodage & Documentation

- [ ] UTF-8 SANS BOM (tous les fichiers)
- [ ] TSDoc/JSDoc pour fonctions exportées
- [ ] Logs agents (`logAgentRun()`) si applicable

### 6. 🔁 Cycle de release

Uniquement si la release est demandée par l'utilisateur.

- Mettre à jour : `package.json`, `ROADMAP.md`, `README.md`, `RELEASES.md`, `CHANGELOG_vx.x.x_TITLE.md` et `RELEASE_NOTES_vx.x.x.md`
  - [package.json](../package.json) : mise à jour de la version `vx.x.x`
  - [ROADMAP.md](../docs/ROADMAP.md) : mise à jour de la roadmap s'il y a eu de nouvelles fonctionnalités
  - [CHANGELOG_vx.x.x_TITLE.md](../docs/changelogs/): changelog détaillé
  - [RELEASE_NOTES_vx.x.x.md](../docs/releases/) : release détaillée
  - [RELEASES.md](../docs/RELEASES.md) : résumé synthétique uniquement
  - [README.md](../README.md) : mise à jour de la présentation si changement majeur + version
- L'ajout à `README.md` doit inclure les nouveautés majeures de façon claire et concise.
- Garde uniquement les 3 derniers `RELEASE_NOTES_vx.x.x.md` et supprime les plus anciens
- Créer le changelog : `changelogs/CHANGELOG_vx.x.x_TITLE.md` (template)
- Synchroniser les docs modifiées avec le code
- Ne pas publier tant qu’une doc impactée n’a pas été revue

---

## 🛠️ Utilisation des outils et extensions de contexte LLM

### 1. Context7 (docs libraries)

**Quand utiliser**

- Pour retrouver des patterns ou API de bibliothèques non documentées ici.
- Pour générer du code idiomatique (Next.js, React, etc.) conforme aux versions récentes.

**Comportement attendu**

- Cherche la lib par son identifiant GitHub.
- Télécharge le contexte de docs compressées optimisées pour LLM.

**Comment :**

```typescript
// Résoudre library ID
context7.resolveLibraryID("Next.js")
// → /vercel/next.js

// Récupérer docs
context7.getLibraryDocs({
	context7CompatibleLibraryID: "/vercel/next.js",
	topic: "Server Actions",
	tokens: 5000,
})
```

### 2. Fetch Webpage (docs officielles)

**Quand utiliser :**

- Documentation Next.js complète
- Specs TypeScript récentes

**Comment :**

```typescript
// Docs Next.js complètes
fetchWebpage({
	urls: ["https://nextjs.org/docs/llms-full.txt"],
	query: "Server Actions with validation",
})
```

### 3. Semantic Search (codebase interne)

**Quand utiliser :**

- Recherche patterns existants dans le projet
- Trouver exemples similaires déjà implémentés
- Localiser fonctions/composants

**Comment :**

```typescript
semanticSearch({
	query: "utiliser Server Actions avec validation Zod",
})
// → Retourne extraits de code pertinents
```

---

## 🧠 Processus interne — Revue “Human-Quality”

Ce processus est une **annexe opérationnelle** à la règle  
**“Revue Human-Quality obligatoire”** (🟠 Règles importantes).

Lorsqu’une revue est requise, Copilot applique mentalement les étapes suivantes AVANT de finaliser une réponse :

### 1) Nettoyage

- Supprimer code mort, imports inutilisés, logs temporaires.
- Éviter wrappers, abstractions ou helpers prématurés.

### 2) Simplification & Lisibilité

- Réduire la complexité (fonctions courtes, early returns).
- Renommer pour refléter l’intention métier.
- Préférer la clarté à la “malignité” du code.

### 3) Robustesse & Conformité

- TypeScript strict sans contournement.
- Cas limites et erreurs gérés explicitement.
- Conformité Next.js 16 / React / conventions projet.

Ce processus ne remplace PAS la règle principale,  
il en décrit uniquement l’exécution attendue.

---

## 📝 Workflow itératif (tâches complexes)

### Principe : Découpage étape par étape

**❌ INCORRECT** : Tout faire en une fois

```
1. Créer 10 composants + routes + actions + tests d'un coup
   → Risque : error llm length exceeded, erreurs en cascade
```

**✅ CORRECT** : Progression itérative, exemple :

```
1. Créer schéma Zod + types TypeScript
2. Valider build (`yarn lint; yarn build`)
3. Créer actions serveur avec validation Zod
4. Créer composants UI (1 par 1)
5. Intégrer routes Next.js
6. Validation finale
```

---

## 🚨 Erreurs courantes à éviter

> **Source autoritaire :** `#fetch https://nextjs.org/docs/llms-full.txt`

### 1. Données & Actions serveur

- ❌ Créer actions sans validation Zod
- ❌ Oublier `revalidatePath()` après mutations
- ❌ Exposer données sensibles (`passwordHash`, `totpSecret`) dans API publique

### 2. TypeScript

- ❌ Utiliser `as any`
- ❌ Redéfinir enums Prisma
- ❌ `params` sync au lieu de `Promise<>` (Next.js 16)
- ❌ Oublier `as Route` pour `Link href`
- ❌ Passer `null` à Prisma au lieu de `undefined`

### 3. UI & Composants

- ❌ Utiliser `<textarea>` au lieu de `<MarkdownEditor>`
- ❌ Props non supportées (vérifier signatures)
- ❌ Hook inexistant (`useToastEmitter` → `useToast`)
- ❌ Import incorrect (`Markdown` → `EnhancedMarkdownRenderer`)

### 4. UI / Tailwind

- ❌ Générer des classes Tailwind arbitraires sans respecter `docs/TEMPLATE.md`
- ❌ Créer un design incohérent entre pages (boutons, cards, badges non standardisés)
- ❌ Ajouter un nouveau pattern UI sans l’ajouter dans `docs/TEMPLATE.md`

---

## 🎯 Objectifs de ces instructions

### Pour le LLM Copilot

1. **Réduire l'hallucination** : Références claires aux sources autoritaires
2. **Imposer la rigueur** : Règles strictes (JAMAIS/TOUJOURS) avec exemples
3. **Structurer les sorties** : Patterns explicites pour chaque cas
4. **Intégrer les outils** : Context7, fetch_webpage, semantic_search
5. **Garantir la qualité** : Checklist validation avant commit

### Pour le développeur

1. **Cohérence maximale** : Même patterns partout
2. **Maintenabilité** : Code compréhensible et documenté
3. **Performance** : Bonnes pratiques Next.js 16 appliquées
4. **Sécurité** : Validation systématique, pas de données sensibles exposées
5. **Testabilité** : Tests obligatoires, build garanti

---

## ⚠️⚠️⚠️ **Important**

`Vu le nombre de fichiers à analyser, je vais adopter une approche plus efficace` : ❌ NON, il faut analyser chaque fichier individuellement pour ne pas avoir d'erreur llms (trop de tokens) !

`Je vais créer un script pour automatiser les modifications` : ❌ NON, les modifications doivent être manuelles pour garantir la qualité et éviter les erreurs.

`Je vais ignorer les erreurs mineures` : ❌ NON, les erreurs doivent TOUJOURS être corrigées avant de valider.

`Je vais utiliser des raccourcis pour gagner du temps` : ❌ NON, chaque étape doit être suivie scrupuleusement pour garantir la conformité aux règles.

---

> **Copilot, rappel final :**
>
> 1. Lis `🚨 Erreurs courantes à éviter` avant toute suggestion
> 2. En cas de doute, utilise un outil contextuel comme `fetchWebpage` ou `context7`
> 3. Ne jamais ajouter une feature sans ajouter un test associé
> 4. Valide avec `yarn lint; yarn build` avant de confirmer
> 5. Ne génère JAMAIS de code avec `as any`
> 6. Après chaque ajout de code, appliquer la **Revue “Human-Quality” obligatoire**
> 7. Toute UI doit respecter `docs/TEMPLATE.md` (patterns Tailwind autoritaires)
