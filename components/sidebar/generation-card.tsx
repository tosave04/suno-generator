"use client";

import { useTransition } from "react";
import { Heart, Music, Trash2 } from "lucide-react";
import { toggleFavorite } from "@/lib/actions/favorite";
import { deleteGeneration, type GenerationSummary } from "@/lib/actions/generation";
import { genreColorClasses } from "@/components/ui/badge";

interface GenerationCardProps {
  generation: GenerationSummary;
  isActive: boolean;
  onSelect: (id: string) => void;
  onRefresh: () => void;
}

export function GenerationCard({ generation, isActive, onSelect, onRefresh }: GenerationCardProps) {
  const [isPending, startTransition] = useTransition();

  const displayTitle = generation.title ?? generation.userPrompt.slice(0, 50);
  const genres = generation.genre.split(",");

  function handleFavorite(e: React.MouseEvent) {
    e.stopPropagation();
    startTransition(async () => {
      await toggleFavorite({ id: generation.id });
      onRefresh();
    });
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    startTransition(async () => {
      await deleteGeneration({ id: generation.id });
      onRefresh();
    });
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(generation.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(generation.id);
      }}
      className={`group flex flex-col gap-1 rounded-md border p-2 cursor-pointer transition-all animate-fade-in ${
        isActive
          ? "border-accent/50 bg-accent/5"
          : "border-transparent bg-transparent hover:border-border hover:bg-muted/50"
      } ${isPending ? "opacity-60 pointer-events-none" : ""}`}
    >
      {/* Header : titre + actions */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-foreground truncate flex items-center gap-1">
          {generation.audioUrl && <Music className="h-3 w-3 shrink-0 text-muted-foreground" />}
          {displayTitle}
        </span>
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            type="button"
            onClick={handleFavorite}
            className="p-1 rounded-md text-muted-foreground hover:text-amber-400 transition-colors opacity-0 group-hover:opacity-100 data-[fav=true]:opacity-100 cursor-pointer"
            data-fav={generation.isFavorite}
            title={generation.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart
              className={`h-3.5 w-3.5 ${generation.isFavorite ? "fill-amber-400 text-amber-400" : ""}`}
            />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="p-1 rounded-md text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
            title="Supprimer"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Badges genre + mood */}
      <div className="flex items-center gap-1.5">
        {genres.map((g) => {
          const color = genreColorClasses[g.toLowerCase()] ?? "bg-muted text-muted-foreground";
          return (
            <span key={g} className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${color}`}>
              {g}
            </span>
          );
        })}
        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium bg-muted text-muted-foreground">
          {generation.mood}
        </span>
      </div>
    </div>
  );
}
