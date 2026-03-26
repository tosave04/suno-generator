"use client";

import { useTransition } from "react";
import { Heart, Music, Trash2 } from "lucide-react";
import { toggleFavorite } from "@/lib/actions/favorite";
import { deleteGeneration, type GenerationSummary } from "@/lib/actions/generation";
import { genreColorClasses } from "@/components/ui/badge";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

interface GenerationCardProps {
  generation: GenerationSummary;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export function GenerationCard({ generation, isActive, onSelect }: GenerationCardProps) {
  const [isPending, startTransition] = useTransition();

  const displayTitle = generation.title ?? generation.userPrompt.slice(0, 50);
  const genreId = generation.genre.toLowerCase();
  const genreColor = genreColorClasses[genreId] ?? "bg-muted text-muted-foreground";

  function handleFavorite(e: React.MouseEvent) {
    e.stopPropagation();
    startTransition(async () => {
      await toggleFavorite({ id: generation.id });
    });
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    startTransition(async () => {
      await deleteGeneration({ id: generation.id });
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
      className={`group flex flex-col gap-2 rounded-lg border p-3 cursor-pointer transition-all ${
        isActive
          ? "border-accent/50 bg-accent/5"
          : "border-border bg-muted hover:border-accent/30 hover:bg-muted/80"
      } ${isPending ? "opacity-60 pointer-events-none" : ""}`}
    >
      {/* Header : titre + actions */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-foreground truncate">{displayTitle}</span>
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
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${genreColor}`}>
          {generation.genre}
        </span>
        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium bg-muted text-muted-foreground">
          {generation.mood}
        </span>
      </div>

      {/* Footer : date + icône audio */}
      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span>{formatDate(generation.createdAt)}</span>
        {generation.audioFile && (
          <span className="flex items-center gap-1">
            <Music className="h-3 w-3" />
          </span>
        )}
      </div>
    </div>
  );
}
