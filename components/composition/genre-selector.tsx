"use client";

import { GENRES } from "@/lib/data/genres";

const GENRE_EMOJIS: Record<string, string> = {
  pop: "🎤", rock: "🎸", "hip-hop": "🎧", jazz: "🎷",
  electronic: "🎹", "r&b": "🎵", country: "🤠", classical: "🎻",
  metal: "🤘", folk: "🪕", reggae: "🌴", latin: "💃",
  blues: "🎺", funk: "🕺", soul: "✨", indie: "🌙",
  punk: "⚡", ambient: "🌊",
};

interface GenreSelectorProps {
  value: string | null;
  onChange: (genreId: string) => void;
}

export function GenreSelector({ value, onChange }: GenreSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground">Genre musical</label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {GENRES.map((genre) => {
          const isSelected = value === genre.id;
          return (
            <button
              key={genre.id}
              type="button"
              onClick={() => onChange(genre.id)}
              className={`flex flex-col items-center gap-2 rounded-lg p-4 text-center transition-all cursor-pointer ${
                isSelected
                  ? "border-2 border-accent bg-accent/10 ring-1 ring-accent/30"
                  : "border border-border bg-muted hover:border-accent/50 hover:bg-muted/80"
              }`}
            >
              <span className="text-2xl">{GENRE_EMOJIS[genre.id] ?? "🎵"}</span>
              <span className={`text-sm font-medium ${isSelected ? "text-accent" : "text-foreground"}`}>
                {genre.name}
              </span>
              <span className={`text-xs line-clamp-1 ${isSelected ? "text-accent/70" : "text-muted-foreground"}`}>
                {genre.subGenres.slice(0, 2).join(", ")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
