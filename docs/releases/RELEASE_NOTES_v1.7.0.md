# 🎨 Release Notes — v1.7.0 — Style Artiste

> **Date :** 8 juillet 2026
> **Version :** `1.7.0`

---

## ✨ Nouveauté principale : onglet Style

Un nouvel onglet **Style** apparaît dans la navigation entre Composer et Stats.
Il répond à un besoin simple : *"je veux que ma musique Suno sonne comme cet artiste ou ce morceau — mais comment paramétrer l'outil ?"*

### Comment ça marche

1. Saisir un nom d'artiste (`Daft Punk`, `Billie Eilish`, `Miles Davis`…)
   ou un titre de morceau (`Bohemian Rhapsody`, `Bad Guy`…).
2. Cliquer sur **Générer les réglages** (ou appuyer sur `Enter`).
3. Le LLM analyse le style sonore de la cible et produit :
   - **Genre/Mood détectés** — badges affichés pour contexte.
   - **Analyse** — courte explication des choix musicaux.
   - **Style of Music (Prompt +)** — descripteurs prêts à coller dans Suno.
   - **Exclude from Song (Prompt −)** — exclusions ciblées.
   - **Paramètres Suno** — Vocal Gender, Weirdness, Style Influence avec labels
     (Safe zone, Expected results, etc.).
4. Chaque champ dispose d'un bouton **Copier**.

> ⚠️ Le Prompt+ ne contient jamais le nom de l'artiste (interdit par Suno).
> Le LLM décrit uniquement le son : instrumentation, BPM, production, timbre vocal.

---

## 🔧 Améliorations techniques

### Contexte IA enrichi

Le `llms-full.txt` a reçu une **Section 7** complète décrivant la méthode
de reproduction stylistique : règle anti-copyright, méthode 6 étapes,
calcul des réglages, checklist de validation, 4 exemples anonymisés.

Le Context Builder (`context-builder.ts`) utilise désormais `pickRandom`
pour varier les instruments/tags/keywords injectés dans chaque prompt, rendant
les générations moins redondantes.

### DeepSeek générique

Le client DeepSeek expose maintenant `callDeepSeekStructured<S extends ZodType>`
permettant d'appeler l'IA avec n'importe quel schéma de réponse Zod.
L'ancienne fonction `callDeepSeek` est conservée comme wrapper (rétrocompatibilité).

---

## 📦 Contenu technique

- `app/(dashboard)/style/page.tsx` — page UI
- `lib/schemas/style.ts` — schémas Zod
- `lib/services/style-prompt-builder.ts` — construction du system prompt
- `lib/actions/style.ts` — Server Action `createStyleSettings`
- `lib/utils/suno-labels.ts` — labels Weirdness/StyleInfluence partagés
- `next.config.ts` — tracing `llms-full.txt` pour la production
- 10 nouveaux tests · 111 tests au total · lint ✅ · build ✅

---

➜ [Changelog détaillé](../changelogs/CHANGELOG_v1.7.0_STYLE_ARTISTE.md)
