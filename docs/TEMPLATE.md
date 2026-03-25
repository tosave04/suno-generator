# 🎨 Charte UI — Suno Generator

> **Version :** 0.1.0 · **Date :** 25 mars 2026
> **Source autoritaire** pour tout composant UI généré dans ce projet.
> Copilot DOIT consulter ce fichier avant de générer ou modifier tout composant UI.

---

## 1. Palette de couleurs

### 1.1 Thème sombre (défaut)

| Token | Valeur | Usage |
|-------|--------|-------|
| `--background` | `#0a0a0a` | Fond principal (body) |
| `--foreground` | `#ededed` | Texte principal |
| `--muted` | `#1a1a2e` | Fond secondaire (cards, sidebar) |
| `--muted-foreground` | `#a1a1aa` | Texte secondaire, labels |
| `--accent` | `#7c3aed` | Accent principal (violet — identité musicale) |
| `--accent-hover` | `#6d28d9` | Hover accent |
| `--accent-foreground` | `#ffffff` | Texte sur accent |
| `--border` | `#27272a` | Bordures, séparateurs |
| `--ring` | `#7c3aed` | Focus ring |
| `--destructive` | `#ef4444` | Erreurs, suppression |
| `--success` | `#22c55e` | Succès, validation |
| `--warning` | `#f59e0b` | Avertissements |

### 1.2 Thème clair

| Token | Valeur | Usage |
|-------|--------|-------|
| `--background` | `#ffffff` | Fond principal |
| `--foreground` | `#171717` | Texte principal |
| `--muted` | `#f4f4f5` | Fond secondaire |
| `--muted-foreground` | `#71717a` | Texte secondaire |
| `--accent` | `#7c3aed` | Accent principal (identique) |
| `--accent-hover` | `#6d28d9` | Hover accent |
| `--border` | `#e4e4e7` | Bordures |

### 1.3 Classes Tailwind associées

```
bg-background        → Fond principal
text-foreground      → Texte principal
bg-muted             → Fond secondaire (cards, sidebar, sections)
text-muted-foreground → Texte secondaire
bg-accent            → Fond accent (bouton principal, sélection active)
text-accent          → Texte accent
border-border        → Bordures standard
ring-ring            → Focus ring
```

### 1.4 Couleurs de genres musicaux (badges)

Chaque genre a une couleur attribuée pour reconnaissance visuelle rapide :

| Genre | Classe Tailwind |
|-------|----------------|
| Pop | `bg-pink-500/20 text-pink-400` |
| Rock | `bg-red-500/20 text-red-400` |
| Hip-Hop | `bg-amber-500/20 text-amber-400` |
| Jazz | `bg-blue-500/20 text-blue-400` |
| Electronic | `bg-cyan-500/20 text-cyan-400` |
| R&B | `bg-purple-500/20 text-purple-400` |
| Country | `bg-orange-500/20 text-orange-400` |
| Classical | `bg-yellow-500/20 text-yellow-400` |
| Metal | `bg-zinc-500/20 text-zinc-400` |
| Folk | `bg-green-500/20 text-green-400` |
| Reggae | `bg-emerald-500/20 text-emerald-400` |
| Latin | `bg-rose-500/20 text-rose-400` |
| Blues | `bg-indigo-500/20 text-indigo-400` |
| Funk | `bg-fuchsia-500/20 text-fuchsia-400` |
| Soul | `bg-violet-500/20 text-violet-400` |
| Indie | `bg-teal-500/20 text-teal-400` |
| Punk | `bg-lime-500/20 text-lime-400` |
| Ambient | `bg-sky-500/20 text-sky-400` |

---

## 2. Typographie

### 2.1 Polices

| Usage | Police | Variable CSS |
|-------|--------|-------------|
| Texte principal | Geist Sans | `--font-geist-sans` |
| Code / Lyrics tags | Geist Mono | `--font-geist-mono` |

### 2.2 Échelle typographique

| Élément | Classes Tailwind |
|---------|-----------------|
| H1 (titre page) | `text-2xl font-bold tracking-tight` |
| H2 (section) | `text-xl font-semibold` |
| H3 (sous-section) | `text-lg font-medium` |
| Body | `text-sm leading-relaxed` |
| Small / Label | `text-xs text-muted-foreground` |
| Mono (tags Suno) | `font-mono text-sm` |

### 2.3 Règles

- Tout texte principal en `text-foreground`
- Labels et texte secondaire en `text-muted-foreground`
- Liens en `text-accent hover:underline`
- Pas de `font-bold` sur le body text — réservé aux titres

---

## 3. Spacing & Layout

### 3.1 Espacements standard

| Contexte | Valeur Tailwind |
|----------|----------------|
| Gap entre sections | `gap-6` |
| Gap entre éléments dans une section | `gap-4` |
| Gap entre éléments inline | `gap-2` |
| Padding de page | `p-6` |
| Padding de card | `p-4` |
| Padding de badge/tag | `px-2.5 py-1` |
| Margin entre sections de page | `space-y-6` |

### 3.2 Bordures et arrondis

| Contexte | Classe Tailwind |
|----------|----------------|
| Card | `rounded-lg border border-border` |
| Button | `rounded-md` |
| Badge | `rounded-full` |
| Input | `rounded-md border border-border` |
| Zone de résultats | `rounded-lg` |

### 3.3 Ombres

- **Pas d'ombres** en thème sombre (inutile sur fond noir)
- Thème clair : `shadow-sm` uniquement sur les cards au hover

---

## 4. Composants UI de base

### 4.1 Button

#### Variantes

| Variante | Classes Tailwind |
|----------|-----------------|
| **Primary** | `bg-accent text-accent-foreground hover:bg-accent-hover rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring` |
| **Secondary** | `bg-muted text-foreground hover:bg-muted/80 rounded-md px-4 py-2 text-sm font-medium border border-border transition-colors` |
| **Ghost** | `text-muted-foreground hover:text-foreground hover:bg-muted rounded-md px-4 py-2 text-sm transition-colors` |
| **Destructive** | `bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-md px-4 py-2 text-sm font-medium transition-colors` |
| **Icon** | `p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors` |

#### Tailles

| Taille | Classes |
|--------|---------|
| sm | `px-3 py-1.5 text-xs` |
| md (défaut) | `px-4 py-2 text-sm` |
| lg | `px-6 py-2.5 text-base` |

#### États

```
disabled  → opacity-50 cursor-not-allowed pointer-events-none
loading   → opacity-70 cursor-wait + spinner inline (Loader2 icon animate-spin)
```

#### Exemple : Bouton Générer (CTA principal)

```html
<button class="w-full bg-accent text-accent-foreground hover:bg-accent-hover
  rounded-md px-6 py-3 text-base font-semibold transition-colors
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
  disabled:opacity-50 disabled:cursor-not-allowed">
  Générer
</button>
```

### 4.2 Badge

#### Variantes

| Variante | Classes Tailwind |
|----------|-----------------|
| **Default** | `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-muted text-muted-foreground` |
| **Active** | `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-accent/20 text-accent ring-1 ring-accent/50` |
| **Genre** | `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium` + couleur du genre (cf. section 1.4) |
| **Mood** | `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-muted text-foreground` |

#### Badge sélectionnable (mood, genre dans les filtres)

```
Non sélectionné → bg-muted text-muted-foreground hover:bg-muted/80 cursor-pointer
Sélectionné     → bg-accent/20 text-accent ring-1 ring-accent/50
```

### 4.3 Toggle / Switch

```html
<!-- Non actif -->
<button class="relative h-5 w-9 rounded-full bg-muted transition-colors">
  <span class="block h-4 w-4 rounded-full bg-muted-foreground translate-x-0.5 transition-transform" />
</button>

<!-- Actif -->
<button class="relative h-5 w-9 rounded-full bg-accent transition-colors">
  <span class="block h-4 w-4 rounded-full bg-accent-foreground translate-x-4.5 transition-transform" />
</button>
```

---

## 5. Cards

### 5.1 Card générique

```html
<div class="rounded-lg border border-border bg-muted p-4 space-y-3">
  <h3 class="text-sm font-medium text-foreground">Titre</h3>
  <p class="text-xs text-muted-foreground">Contenu…</p>
</div>
```

### 5.2 Card de genre (sélecteur — grid cliquable)

```html
<!-- Non sélectionnée -->
<button class="flex flex-col items-center gap-2 rounded-lg border border-border
  bg-muted p-4 text-center transition-all hover:border-accent/50 hover:bg-muted/80
  cursor-pointer">
  <span class="text-2xl">🎸</span>
  <span class="text-sm font-medium text-foreground">Rock</span>
  <span class="text-xs text-muted-foreground">Guitares, énergie brute</span>
</button>

<!-- Sélectionnée -->
<button class="flex flex-col items-center gap-2 rounded-lg border-2 border-accent
  bg-accent/10 p-4 text-center transition-all cursor-pointer ring-1 ring-accent/30">
  <span class="text-2xl">🎸</span>
  <span class="text-sm font-medium text-accent">Rock</span>
  <span class="text-xs text-accent/70">Guitares, énergie brute</span>
</button>
```

### 5.3 Card de génération (sidebar — historique)

```html
<div class="group flex flex-col gap-2 rounded-lg border border-border bg-muted
  p-3 cursor-pointer transition-all hover:border-accent/30 hover:bg-muted/80">
  <!-- Header : titre + favori -->
  <div class="flex items-center justify-between">
    <span class="text-sm font-medium text-foreground truncate">Titre de la chanson</span>
    <button class="p-1 text-muted-foreground hover:text-amber-400 transition-colors">
      <!-- Lucide: Heart ou Star -->
    </button>
  </div>
  <!-- Badges genre + mood -->
  <div class="flex items-center gap-1.5">
    <span class="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium
      bg-red-500/20 text-red-400">Rock</span>
    <span class="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium
      bg-muted text-muted-foreground">Energetic</span>
  </div>
  <!-- Footer : date + icône audio -->
  <div class="flex items-center justify-between text-[10px] text-muted-foreground">
    <span>25 mars 2026</span>
    <span class="flex items-center gap-1">
      <!-- Lucide: Music icon si audio -->
    </span>
  </div>
</div>

<!-- Card active (chargée dans la zone principale) -->
<!-- Ajouter : border-accent/50 bg-accent/5 -->
```

---

## 6. Formulaires & Inputs

### 6.1 Input texte

```html
<div class="space-y-1.5">
  <label class="text-xs font-medium text-muted-foreground">Label</label>
  <input type="text"
    class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm
      text-foreground placeholder:text-muted-foreground/50
      focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
      disabled:opacity-50 disabled:cursor-not-allowed"
    placeholder="Placeholder…" />
</div>
```

### 6.2 Textarea (zone de prompt libre)

```html
<div class="space-y-1.5">
  <label class="text-xs font-medium text-muted-foreground">Décrivez votre chanson</label>
  <textarea
    class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm
      text-foreground placeholder:text-muted-foreground/50 resize-none
      focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
      min-h-25"
    rows="4"
    placeholder="Ex: Une ballade mélancolique sur la pluie en automne…"></textarea>
  <!-- Compteur de caractères -->
  <div class="flex justify-end">
    <span class="text-[10px] text-muted-foreground">142 / 2000</span>
  </div>
</div>
```

### 6.3 Select / Dropdown

```html
<div class="space-y-1.5">
  <label class="text-xs font-medium text-muted-foreground">Langue</label>
  <select class="w-full rounded-md border border-border bg-background px-3 py-2
    text-sm text-foreground
    focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent">
    <option>English</option>
    <option>Français</option>
  </select>
</div>
```

### 6.4 Radio group (style d'écriture)

```html
<fieldset class="space-y-2">
  <legend class="text-xs font-medium text-muted-foreground">Style d'écriture</legend>
  <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
    <!-- Non sélectionné -->
    <label class="flex items-center gap-2 rounded-md border border-border bg-muted
      px-3 py-2 text-sm cursor-pointer hover:border-accent/50 transition-colors">
      <input type="radio" name="style" class="hidden" />
      <span class="text-foreground">Poetic</span>
    </label>
    <!-- Sélectionné -->
    <label class="flex items-center gap-2 rounded-md border-2 border-accent bg-accent/10
      px-3 py-2 text-sm cursor-pointer">
      <input type="radio" name="style" class="hidden" checked />
      <span class="text-accent font-medium">Storytelling</span>
    </label>
  </div>
</fieldset>
```

---

## 7. Zone de composition — Sélecteurs

### 7.1 Genre Selector (grid de cards)

Layout : `grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4`

Chaque card genre utilise le pattern **Card de genre** (section 5.2). Émojis par genre :

| Genre | Émoji |
|-------|-------|
| Pop | 🎤 |
| Rock | 🎸 |
| Hip-Hop | 🎧 |
| Jazz | 🎷 |
| Electronic | 🎹 |
| R&B | 🎵 |
| Country | 🤠 |
| Classical | 🎻 |
| Metal | 🤘 |
| Folk | 🪕 |
| Reggae | 🌴 |
| Latin | 💃 |
| Blues | 🎺 |
| Funk | 🕺 |
| Soul | ✨ |
| Indie | 🌙 |
| Punk | ⚡ |
| Ambient | 🌊 |

### 7.2 Mood Selector (grid de badges cliquables)

Layout : `flex flex-wrap gap-2`

Utilise le pattern **Badge sélectionnable** (section 4.2).

### 7.3 Style Selector (radio group)

Layout : `grid grid-cols-2 gap-2 sm:grid-cols-3`

Utilise le pattern **Radio group** (section 6.4).

### 7.4 Params Panel (tempo, langue, vocal)

Layout : `grid grid-cols-1 gap-4 sm:grid-cols-3`

Contient :
- **Tempo** : boutons segmentés (Very Slow / Slow / Medium / Fast / Very Fast)
- **Langue** : Select dropdown (section 6.3)
- **Style vocal** : Select dropdown

#### Boutons segmentés (Tempo)

```html
<div class="inline-flex rounded-md border border-border overflow-hidden">
  <!-- Non actif -->
  <button class="px-3 py-1.5 text-xs text-muted-foreground bg-background
    hover:bg-muted transition-colors border-r border-border">
    Slow
  </button>
  <!-- Actif -->
  <button class="px-3 py-1.5 text-xs font-medium text-accent-foreground bg-accent
    transition-colors border-r border-border">
    Medium
  </button>
  <button class="px-3 py-1.5 text-xs text-muted-foreground bg-background
    hover:bg-muted transition-colors">
    Fast
  </button>
</div>
```

### 7.5 Prompt Input (zone de texte libre)

Utilise le pattern **Textarea** (section 6.2) avec :
- Placeholder dynamique selon le genre sélectionné
- Compteur `caractères / 2000`
- Exemples cliquables en dessous :

```html
<div class="flex flex-wrap gap-1.5 mt-2">
  <button class="text-[10px] text-accent hover:underline">
    💡 Ballade romantique au coucher du soleil
  </button>
  <button class="text-[10px] text-accent hover:underline">
    💡 Hymne énergique pour le sport
  </button>
</div>
```

---

## 8. Layout principal — Dashboard

### 8.1 Structure globale

```
┌──────────────────────────────────────────────────────────┐
│  Header  h-14  bg-background border-b border-border     │
├────────────┬─────────────────────────────────────────────┤
│  Sidebar   │  Main Content                              │
│  w-72      │  flex-1                                    │
│  bg-muted  │  bg-background                             │
│  border-r  │  p-6 overflow-y-auto                       │
│            │                                            │
└────────────┴─────────────────────────────────────────────┘
```

### 8.2 Header

```html
<header class="h-14 border-b border-border bg-background flex items-center
  justify-between px-4">
  <!-- Gauche : logo + titre -->
  <div class="flex items-center gap-3">
    <span class="text-xl">🎵</span>
    <h1 class="text-base font-semibold text-foreground">Suno Generator</h1>
  </div>
  <!-- Droite : actions rapides -->
  <div class="flex items-center gap-2">
    <!-- Bouton nouvelle génération, thème toggle, etc. -->
  </div>
</header>
```

### 8.3 Sidebar

```html
<aside class="w-72 border-r border-border bg-muted flex flex-col h-full">
  <!-- Filtres (haut) -->
  <div class="p-3 border-b border-border space-y-3">
    <!-- Input recherche -->
    <input type="text" placeholder="Rechercher…"
      class="w-full rounded-md border border-border bg-background px-3 py-1.5
        text-xs text-foreground placeholder:text-muted-foreground/50
        focus:outline-none focus:ring-2 focus:ring-ring" />
    <!-- Filtres rapides -->
    <div class="flex items-center gap-2">
      <button class="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground
        hover:bg-accent/20 hover:text-accent transition-colors">⭐ Favoris</button>
      <button class="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground
        hover:bg-accent/20 hover:text-accent transition-colors">🎵 Audio</button>
    </div>
  </div>
  <!-- Liste des générations (scroll) -->
  <div class="flex-1 overflow-y-auto p-2 space-y-2">
    <!-- Cards de génération (section 5.3) -->
  </div>
</aside>
```

### 8.4 Zone principale

```html
<main class="flex-1 overflow-y-auto p-6 space-y-6">
  <!-- Section paramètres -->
  <section class="space-y-4">
    <h2 class="text-xl font-semibold text-foreground">Composer</h2>
    <!-- Genre selector → Mood selector → Style selector → Params panel → Prompt input -->
  </section>

  <!-- Bouton générer -->
  <!-- Bouton CTA (section 4.1) -->

  <!-- Section résultat -->
  <section class="space-y-4">
    <!-- Generation output (section 9) -->
  </section>
</main>
```

---

## 9. Zone de résultat — Generation Output

### 9.1 Container principal

```html
<div class="rounded-lg border border-border bg-muted p-4 space-y-4">
  <!-- Header résultat -->
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-semibold text-foreground">Résultat</h3>
    <div class="flex items-center gap-1">
      <!-- Actions : Copier tout, Favori, Régénérer -->
      <button class="p-2 rounded-md hover:bg-background text-muted-foreground
        hover:text-foreground transition-colors" title="Copier tout">
        <!-- Lucide: Copy -->
      </button>
      <button class="p-2 rounded-md hover:bg-background text-muted-foreground
        hover:text-amber-400 transition-colors" title="Favori">
        <!-- Lucide: Heart -->
      </button>
      <button class="p-2 rounded-md hover:bg-background text-muted-foreground
        hover:text-foreground transition-colors" title="Régénérer">
        <!-- Lucide: RefreshCw -->
      </button>
    </div>
  </div>

  <!-- Tabs : Lyrics | Prompt+ | Prompt- | Réglages -->
  <!-- Voir section 9.2 -->
</div>
```

### 9.2 Tabs de résultat

```html
<div class="border-b border-border">
  <nav class="flex gap-0">
    <!-- Tab active -->
    <button class="px-4 py-2 text-sm font-medium text-accent border-b-2
      border-accent transition-colors">Lyrics</button>
    <!-- Tab inactive -->
    <button class="px-4 py-2 text-sm text-muted-foreground hover:text-foreground
      border-b-2 border-transparent transition-colors">Prompt +</button>
    <button class="px-4 py-2 text-sm text-muted-foreground hover:text-foreground
      border-b-2 border-transparent transition-colors">Prompt −</button>
    <button class="px-4 py-2 text-sm text-muted-foreground hover:text-foreground
      border-b-2 border-transparent transition-colors">Réglages</button>
  </nav>
</div>
```

### 9.3 Affichage Lyrics (avec tags Suno colorés)

```html
<div class="font-mono text-sm leading-relaxed space-y-3 p-3 rounded-md bg-background">
  <!-- Tag Suno -->
  <span class="text-accent font-semibold">[Verse 1]</span>
  <p class="text-foreground whitespace-pre-wrap">
    Walking down the empty road
    Shadows dancing in the cold
  </p>
  <!-- Tag Suno -->
  <span class="text-accent font-semibold">[Chorus]</span>
  <p class="text-foreground whitespace-pre-wrap">
    We are the lights in the dark
  </p>
  <!-- Indication inline -->
  <span class="text-muted-foreground italic">(instrumental)</span>
</div>
```

Règles de coloration des tags :
- Tags de structure `[Verse]`, `[Chorus]`, etc. → `text-accent font-semibold`
- Indications inline `(whisper)`, `(instrumental)` → `text-muted-foreground italic`
- Texte des paroles → `text-foreground`

### 9.4 Affichage Prompt (positif / négatif)

```html
<!-- Prompt avec bouton copier -->
<div class="relative group p-3 rounded-md bg-background">
  <p class="text-sm text-foreground pr-8">
    Indie rock, dreamy guitars, soft male vocals, 120 BPM, reverb-heavy,
    melancholic atmosphere, minor key progressions…
  </p>
  <button class="absolute top-2 right-2 p-1.5 rounded-md opacity-0
    group-hover:opacity-100 hover:bg-muted text-muted-foreground
    hover:text-foreground transition-all" title="Copier">
    <!-- Lucide: Copy -->
  </button>
</div>
```

### 9.5 Affichage Réglages avancés

```html
<div class="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3">
  <div class="rounded-md bg-background p-2.5 space-y-1">
    <span class="text-[10px] text-muted-foreground uppercase tracking-wider">BPM</span>
    <p class="text-sm font-medium text-foreground">120</p>
  </div>
  <div class="rounded-md bg-background p-2.5 space-y-1">
    <span class="text-[10px] text-muted-foreground uppercase tracking-wider">Tonalité</span>
    <p class="text-sm font-medium text-foreground">C Major</p>
  </div>
  <div class="rounded-md bg-background p-2.5 space-y-1">
    <span class="text-[10px] text-muted-foreground uppercase tracking-wider">Durée</span>
    <p class="text-sm font-medium text-foreground">3:30</p>
  </div>
</div>
```

### 9.6 Upload audio (dans la zone résultat)

```html
<!-- Zone de drop / bouton upload -->
<div class="flex items-center justify-center rounded-lg border-2 border-dashed
  border-border p-6 transition-colors hover:border-accent/50 cursor-pointer">
  <div class="flex flex-col items-center gap-2 text-center">
    <!-- Lucide: Upload -->
    <span class="text-muted-foreground text-2xl">📁</span>
    <p class="text-sm text-muted-foreground">Glissez un fichier audio ou cliquez</p>
    <p class="text-[10px] text-muted-foreground/70">MP3 ou WAV · Max 20 Mo</p>
  </div>
</div>

<!-- Fichier audio associé (player inline) -->
<div class="flex items-center gap-3 rounded-md bg-background p-3">
  <button class="p-2 rounded-full bg-accent text-accent-foreground hover:bg-accent-hover
    transition-colors">
    <!-- Lucide: Play -->
  </button>
  <div class="flex-1 min-w-0">
    <p class="text-sm font-medium text-foreground truncate">chanson-finale.mp3</p>
    <p class="text-[10px] text-muted-foreground">3.2 Mo · MP3</p>
  </div>
  <button class="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
    <!-- Lucide: Trash2 -->
  </button>
</div>
```

---

## 10. États UI

### 10.1 Loading (génération en cours)

```html
<!-- Overlay sur la zone résultat -->
<div class="flex flex-col items-center justify-center gap-4 py-12">
  <!-- Lucide: Loader2 animate-spin -->
  <div class="h-8 w-8 animate-spin text-accent">⟳</div>
  <p class="text-sm text-muted-foreground">Génération en cours…</p>
  <p class="text-[10px] text-muted-foreground/70">Cela peut prendre quelques secondes</p>
</div>
```

### 10.2 État vide (pas encore de génération)

```html
<div class="flex flex-col items-center justify-center gap-3 py-16 text-center">
  <span class="text-4xl opacity-50">🎵</span>
  <p class="text-sm text-muted-foreground">Aucune génération pour le moment</p>
  <p class="text-xs text-muted-foreground/70">Sélectionnez vos paramètres et lancez une génération</p>
</div>
```

### 10.3 État erreur

```html
<div class="flex items-center gap-3 rounded-lg border border-destructive/30
  bg-destructive/5 p-4">
  <!-- Lucide: AlertTriangle -->
  <span class="text-destructive text-lg">⚠️</span>
  <div>
    <p class="text-sm font-medium text-destructive">Erreur de génération</p>
    <p class="text-xs text-muted-foreground">L'API n'a pas pu répondre. Réessayez.</p>
  </div>
  <button class="ml-auto text-xs text-accent hover:underline">Réessayer</button>
</div>
```

### 10.4 Notification de succès (copie, favori, etc.)

```html
<!-- Toast en bas à droite -->
<div class="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg
  border border-border bg-muted px-4 py-3 shadow-lg animate-in slide-in-from-bottom-4">
  <span class="text-success">✓</span>
  <p class="text-sm text-foreground">Copié dans le presse-papier</p>
</div>
```

---

## 11. Responsive

### 11.1 Breakpoints

| Breakpoint | Largeur | Comportement |
|------------|---------|-------------|
| Mobile | `< 640px` | Sidebar masquée (drawer), layout colonne unique |
| Tablet | `640px – 1024px` | Sidebar collapsible, grid 2 colonnes |
| Desktop | `> 1024px` | Layout complet sidebar + main |

### 11.2 Sidebar mobile

Sur mobile (`< 640px`) :
- Sidebar masquée par défaut
- Bouton hamburger dans le header pour ouvrir en drawer (overlay)
- Drawer : `fixed inset-y-0 left-0 z-40 w-72 bg-muted border-r border-border`
- Backdrop : `fixed inset-0 z-30 bg-black/50`

### 11.3 Grids responsives

| Composant | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Genre selector | `grid-cols-2` | `grid-cols-3` | `grid-cols-4` |
| Params panel | `grid-cols-1` | `grid-cols-2` | `grid-cols-3` |
| Réglages avancés | `grid-cols-2` | `grid-cols-3` | `grid-cols-3` |
| Radio group styles | `grid-cols-2` | `grid-cols-3` | `grid-cols-3` |

---

## 12. Icônes — Lucide React

### 12.1 Icônes utilisées

| Usage | Icône Lucide | Import |
|-------|-------------|--------|
| Favori (vide) | `Heart` | `lucide-react` |
| Favori (plein) | `HeartOff` ou style `fill-current` | `lucide-react` |
| Copier | `Copy` | `lucide-react` |
| Régénérer | `RefreshCw` | `lucide-react` |
| Supprimer | `Trash2` | `lucide-react` |
| Upload | `Upload` | `lucide-react` |
| Audio/Musique | `Music` | `lucide-react` |
| Lecture | `Play` | `lucide-react` |
| Pause | `Pause` | `lucide-react` |
| Recherche | `Search` | `lucide-react` |
| Fermer | `X` | `lucide-react` |
| Menu | `Menu` | `lucide-react` |
| Loading | `Loader2` (+`animate-spin`) | `lucide-react` |
| Erreur | `AlertTriangle` | `lucide-react` |
| Succès | `Check` | `lucide-react` |
| Paramètres | `Settings` | `lucide-react` |
| Étoile | `Star` | `lucide-react` |

### 12.2 Taille standard

```
Icônes inline (boutons, badges)    → className="h-4 w-4"
Icônes d'action (header, toolbar)  → className="h-5 w-5"
Icônes décoratives (état vide)     → className="h-8 w-8"
```

---

## 13. Animations & Transitions

### 13.1 Transitions standard

| Contexte | Classe |
|----------|--------|
| Couleurs (hover, focus) | `transition-colors` |
| Tout (taille, position) | `transition-all` |
| Durée | Tailwind par défaut (150ms) |

### 13.2 Animations

| Usage | Classe |
|-------|--------|
| Spinner loading | `animate-spin` |
| Toast apparition | `animate-in slide-in-from-bottom-4` |
| Sidebar drawer (mobile) | `transition-transform duration-200` |

### 13.3 Règle

- Animations **subtiles uniquement** — pas de bounce, shake, ou effets excessifs
- Préférer `transition-colors` sur les éléments interactifs
- `transition-all` seulement si plusieurs propriétés changent

---

## 14. Règles générales

### 14.1 Principes

1. **Cohérence** : utiliser UNIQUEMENT les patterns définis ci-dessus
2. **Sobriété** : thème sombre, pas d'effets visuels excessifs
3. **Accessibilité** : focus-visible sur tout élément interactif, aria-labels
4. **Performance** : Server Components par défaut, `"use client"` uniquement si interactivité

### 14.2 Interdictions

- ❌ Ombres en thème sombre (sauf toast)
- ❌ Gradients sur les fonds principaux
- ❌ Couleurs arbitraires hors palette (pas de `bg-[#xxx]`)
- ❌ Polices autres que Geist Sans / Geist Mono
- ❌ `!important` en Tailwind
- ❌ Styles inline (`style={}`) sauf cas exceptionnel documenté

### 14.3 Checklist pour tout nouveau composant

- [ ] Utilise les tokens de couleur définis (section 1)
- [ ] Respecte l'échelle typographique (section 2)
- [ ] Suit les patterns de spacing (section 3)
- [ ] A un état hover, focus-visible et disabled
- [ ] Est responsive (section 11)
- [ ] Utilise les icônes Lucide listées (section 12)
- [ ] Transitions subtiles appliquées (section 13)
