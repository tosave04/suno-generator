"use client";

import { GENRES } from "@/lib/data/genres";

const GENRE_EMOJIS: Record<string, string> = {
  pop: "🎤", rock: "🎸", hiphop: "🎧", jazz: "🎷",
  electronic: "🎹", rnb: "🎵", country: "🤠", classical: "🎻",
  metal: "🤘", folk: "🪕", reggae: "🌴", latin: "💃",
  blues: "🎺", funk: "🕺", soul: "✨", indie: "🌙",
  punk: "⚡", ambient: "🌊", kpop: "💖", "16bit": "👾",
  celtic: "☘️", afroworld: "🥁", disco: "💿",
  middleeastern: "🏜️", indian: "🐘", japanese: "🎋",
};

interface GenreSelectorProps {
  value: string[];
  onChange: (genres: string[]) => void;
}

export function GenreSelector({ value, onChange }: GenreSelectorProps) {
  function handleToggle(genreId: string) {
    if (value.includes(genreId)) {
      onChange(value.filter((id) => id !== genreId));
    } else if (value.length < 2) {
      onChange([...value, genreId]);
    }
  }

  return (
    <div className="space-y-2" role="group" aria-label="Genre musical">
      <label className="text-xs font-medium text-muted-foreground">
        Genre musical <span className="text-muted-foreground/60">(1-2 max)</span>
      </label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {GENRES.map((genre) => {
          const isSelected = value.includes(genre.id);
          const isDisabled = !isSelected && value.length >= 2;
          return (
            <button
              key={genre.id}
              type="button"
              onClick={() => handleToggle(genre.id)}
              disabled={isDisabled}
              aria-pressed={isSelected}
              className={`flex flex-col items-center gap-2 rounded-lg p-4 text-center transition-all ${
                isDisabled
                  ? "cursor-not-allowed opacity-40 border border-border bg-muted"
                  : "cursor-pointer"
              } ${
                isSelected
                  ? "border-2 border-accent bg-accent/10 ring-1 ring-accent/30"
                  : isDisabled
                    ? ""
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
