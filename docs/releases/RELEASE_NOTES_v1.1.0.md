# Release Notes — v1.1.0

**Enrichissement Musical & Transparence IA**
**Date :** 27 mars 2026

---

## Vue d'ensemble

La v1.1.0 enrichit considérablement le corpus musical avec 8 nouveaux genres (26 total), 4 langues (12 total), et introduit un système d'atmosphères culturelles (11 ambiances) qui colore le style musical généré. Un nouvel onglet "Prompt IA" offre une transparence totale sur les prompts envoyés à DeepSeek.

---

## Nouvelles fonctionnalités

### 8 nouveaux genres musicaux
Ajout de K-Pop 💖, 16-Bit 👾, Celtic ☘️, Afroworld 🥁, Disco 💿, Middle Eastern 🏜️, Indian 🐘 et Japanese 🎋. Chaque genre inclut sous-genres, BPM, structure, instruments, caractéristiques vocales, tags Suno et mots-clés de prompt. Le corpus passe de 18 à **26 genres**.

### 4 nouvelles langues
Russe, Hindi, Arabe et Chinois ajoutés au sélecteur de langue avec drapeaux via flagcdn.com et intégrés au Context Builder. Le total passe de 8 à **12 langues**.

### Atmosphères culturelles (nouveau)
Nouveau sélecteur optionnel de 11 atmosphères : Arabic, Asian, African, Latin, Western, European, Indian, Hybrid, Nordic, Russian, Slavic. Chaque atmosphère enrichit le prompt avec des gammes, instruments traditionnels et caractéristiques culturelles spécifiques. Toggle on/off par clic.

### Onglet Prompt IA (nouveau)
Le prompt système complet envoyé à DeepSeek est désormais visible dans un troisième onglet du résultat. Le prompt est persisté en base pour chaque génération, copiable en un clic, et consultable depuis l'historique sidebar. Les anciennes générations affichent un fallback.

---

## Améliorations

- **Émojis Windows-compatible** : tous les émojis de genres et atmosphères vérifiés et corrigés pour l'affichage Windows
- **Clés genre-selector corrigées** : `hip-hop`→`hiphop`, `r&b`→`rnb` pour correspondre aux IDs réels

---

## Fichiers impactés

| Catégorie | Fichiers |
|-----------|----------|
| Données | `genres.ts`, `atmospheres.ts` (nouveau), `types.ts` |
| Schémas | `generation.ts` (Zod), `schema.prisma` |
| Services | `context-builder.ts`, `deepseek.ts` |
| Actions | `generation.ts` (Server Actions) |
| Composants | `genre-selector.tsx`, `atmosphere-selector.tsx` (nouveau), `params-panel.tsx`, `generation-output.tsx` |
| Pages | `compose/page.tsx` |
| Docs | `SPECIFICATIONS.md` |

---

## Tests

| Type | Outil | Nombre |
|------|-------|--------|
| Unitaires + intégration | Vitest | 95 |
| E2E | Playwright | 4 |
| Lint ESLint | — | 0 erreur |
| Build TypeScript | — | 0 erreur |

---

## Migration requise

```bash
npx prisma db push   # Ajoute le champ systemPrompt à la table Generation
npx prisma generate   # Régénère le client Prisma
```
