"use client";

import { Search, Star, ArrowUpDown, Music } from "lucide-react";
import { GENRES } from "@/lib/data/genres";
import type { GenerationFilters } from "@/lib/actions/generation";

interface SidebarFiltersProps {
  filters: GenerationFilters;
  onChange: (filters: GenerationFilters) => void;
}

export function SidebarFilters({ filters, onChange }: SidebarFiltersProps) {
  function updateFilter<K extends keyof GenerationFilters>(
    key: K,
    value: GenerationFilters[K]
  ) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="p-3 border-b border-border space-y-3">
      {/* Recherche */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher…"
          value={filters.search ?? ""}
          onChange={(e) => updateFilter("search", e.target.value || undefined)}
          className="w-full rounded-md border border-border bg-background pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Filtres rapides */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => updateFilter("favoritesOnly", !filters.favoritesOnly)}
          className={`text-[10px] px-2 py-1 rounded-full transition-colors cursor-pointer ${
            filters.favoritesOnly
              ? "bg-accent/20 text-accent"
              : "bg-muted text-muted-foreground hover:bg-accent/20 hover:text-accent"
          }`}
        >
          <Star className="inline h-3 w-3 mr-0.5" />
          Favoris
        </button>
        <button
          type="button"
          onClick={() => updateFilter("withAudio", !filters.withAudio)}
          className={`text-[10px] px-2 py-1 rounded-full transition-colors cursor-pointer ${
            filters.withAudio
              ? "bg-accent/20 text-accent"
              : "bg-muted text-muted-foreground hover:bg-accent/20 hover:text-accent"
          }`}
        >
          <Music className="inline h-3 w-3 mr-0.5" />
          Audio
        </button>
      </div>

      {/* Filtre genre + tri */}
      <div className="flex items-center gap-2">
        <select
          value={filters.genre ?? ""}
          onChange={(e) => updateFilter("genre", e.target.value || undefined)}
          className="flex-1 rounded-md border border-border bg-background px-2 py-1 text-[10px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Tous les genres</option>
          {GENRES.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() =>
            updateFilter(
              "sortOrder",
              filters.sortOrder === "oldest" ? "recent" : "oldest"
            )
          }
          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-background transition-colors cursor-pointer"
          title={filters.sortOrder === "oldest" ? "Plus ancien d'abord" : "Plus récent d'abord"}
        >
          <ArrowUpDown className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
