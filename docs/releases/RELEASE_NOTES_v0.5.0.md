# Release Notes — v0.5.0 · Phase 4 : Historique & Favoris

> **Date :** 26 mars 2026 · **Phase :** 4/6 · **Statut :** ✅ Terminée

---

## Résumé

L'application dispose maintenant d'un panneau latéral (sidebar) affichant l'historique de toutes les générations. Chaque génération apparaît sous forme de card avec son titre, ses badges genre/mood, sa date et des boutons d'action (favori, supprimer). Un système de filtres permet la recherche par texte, le filtrage par genre, l'affichage des favoris uniquement et le tri par date. Cliquer sur une card charge la génération complète dans la zone de résultat principale.

---

## Ce qui est livré

### Sidebar historique
- **Container** avec chargement asynchrone des générations depuis la BDD
- **Refresh automatique** après chaque nouvelle génération (via `refreshKey`)
- **État vide** géré : message "Aucune génération" quand la liste est vide

### Filtres
- **Recherche textuelle** dans le titre et le prompt utilisateur
- **Filtre genre** via dropdown (18 genres disponibles)
- **Filtre favoris** via bouton toggle avec état visuel actif/inactif
- **Tri par date** réversible (récent ↔ ancien)

### Cards de génération
- Affichage du titre ou début du prompt tronqué (fallback)
- Badges colorés : genre (couleur par genre selon TEMPLATE.md) + mood
- Date formatée en français
- Bouton **favori** (heart) visible au hover ou si déjà favori
- Bouton **supprimer** (trash) visible au hover
- Style **active** quand la card est sélectionnée (border accent)

### Server Actions
- `toggleFavorite` : validation Zod, toggle en BDD, revalidation
- `deleteGeneration` : suppression BDD + fichier audio associé si existant
- `getGenerations` : requête filtrée (search, genre, favorites, sort)
- `getGenerationById` : chargement complet avec parsing des sunoSettings JSON

### Intégration
- Layout Dashboard restructuré : `header + (sidebar | main content)` en flex
- Page Compose intègre la sidebar avec état partagé (active generation, refresh)

---

## Métriques

| Métrique | Valeur |
|---|---|
| Fichiers créés | 5 |
| Fichiers modifiés | 3 |
| Tests ajoutés | 13 |
| Tests totaux | 72 (tous passent) |
| Lint | ✅ 0 erreur |
| Build | ✅ succès |
| Routes | `/compose` (sidebar + composition) |

---

## Fichiers impactés

### Nouveaux
- `lib/actions/favorite.ts`
- `components/sidebar/sidebar.tsx`
- `components/sidebar/sidebar-filters.tsx`
- `components/sidebar/generation-card.tsx`
- `__tests__/sidebar.test.tsx`

### Modifiés
- `lib/actions/generation.ts`
- `app/(dashboard)/layout.tsx`
- `app/(dashboard)/compose/page.tsx`
