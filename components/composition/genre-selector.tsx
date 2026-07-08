// OBSOLETE

"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { GENRES } from "@/lib/data/genres";
import { GENRE_EMOJIS } from "@/lib/data/emojis";

export { GENRE_EMOJIS };

/** Nombre de voisins visibles de chaque côté du centre */
const VISIBLE_SIDE = 8;
const CARD_WIDTH = 140;
const CARD_GAP = 4;
/** Nombre de cards mises en avant (centre + voisins). Ex: 3 = centre + 1 de chaque côté */
const FRONT_COUNT = 5;
/** Décalage horizontal max (px) du flow entier quand la souris est sur un bord */
const FLOW_SHIFT_PX = 80;

interface GenreSelectorProps {
  value: string[];
  onChange: (genres: string[]) => void;
}

export function GenreSelector({ value, onChange }: GenreSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [focusIndex, setFocusIndex] = useState(Math.floor(GENRES.length / 2));
  const [flowShift, setFlowShift] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rawRatio = (e.clientX - rect.left) / rect.width;
    // Zone utile = 30%-70% de la largeur → très peu de mouvement nécessaire
    const PADDING = 0.3;
    const ratio = Math.max(0, Math.min(1, (rawRatio - PADDING) / (1 - 2 * PADDING)));
    const idx = Math.round(ratio * (GENRES.length - 1));
    setFocusIndex(idx);
    // Décalage global : -1 (gauche) à +1 (droite) → pixels
    setFlowShift((rawRatio - 0.5) * 2 * FLOW_SHIFT_PX);
  }, []);

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

      {/* Cover Flow container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { setFocusIndex(Math.floor(GENRES.length / 2)); setFlowShift(0); }}
        className="relative h-50 w-full rounded-xl border border-border bg-muted/50"
        style={{ perspective: "800px" }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-out" style={{ transformStyle: "preserve-3d", transform: `translateX(${flowShift}px)` }}>
          {GENRES.map((genre, i) => {
            const offset = i - focusIndex;
            const absOffset = Math.abs(offset);

            if (absOffset > VISIBLE_SIDE) return null;

            const isSelected = value.includes(genre.id);
            const isDisabled = !isSelected && value.length >= 2;
            // Cards en avant : centre + voisins dans le rayon FRONT_COUNT
            const frontSide = Math.floor(FRONT_COUNT / 2);
            const isFront = absOffset <= frontSide;

            const scale = isFront ? 1 - absOffset * 0.04 : Math.max(0.5, 0.88 - (absOffset - 2) * 0.08);
            // Rotation : les 3 cards devant sont quasi face, le reste pivote progressivement
            const maxRotate = 65;
            const rotateY = isFront
              ? offset * 6
              : -Math.sign(offset) * Math.min(maxRotate, 20 + (absOffset - 1) * 12);
            const translateX = isFront
              ? offset * (CARD_WIDTH + CARD_GAP * 2)
              : Math.sign(offset) * (CARD_WIDTH + CARD_GAP * 2 + (absOffset - 1) * (CARD_WIDTH * 0.6 + CARD_GAP));
            const translateZ = isFront ? 80 - absOffset * 10 : -(absOffset - 1) * 30;
            const zIndex = VISIBLE_SIDE + 2 - absOffset;
            const opacity = isFront ? 1 : Math.max(0.3, 1 - (absOffset - 1) * 0.15);

            return (
              <button
                key={genre.id}
                type="button"
                onClick={() => handleToggle(genre.id)}
                disabled={isDisabled}
                aria-pressed={isSelected}
                className={[
                  "absolute flex flex-col items-center justify-center gap-1.5 rounded-lg p-3 text-center",
                  "transition-all duration-200 ease-out select-none",
                  isDisabled
                    ? "cursor-not-allowed opacity-40"
                    : "cursor-pointer",
                  isSelected
                    ? "border-2 border-accent bg-accent/15 ring-1 ring-accent/40 shadow-[0_0_16px_rgba(124,58,237,0.25)]"
                    : "border border-border bg-muted hover:border-accent/50",
                ].join(" ")}
                style={{
                  width: CARD_WIDTH,
                  height: 160,
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  opacity: isDisabled ? 0.3 : opacity,
                }}
              >
                <span className={absOffset === 0 ? "text-3xl" : "text-2xl"}>
                  {GENRE_EMOJIS[genre.id] ?? "🎵"}
                </span>
                <span
                  className={[
                    "font-medium leading-tight",
                    isFront ? "text-sm" : "text-xs",
                    isSelected ? "text-accent" : "text-foreground",
                  ].join(" ")}
                >
                  {genre.name}
                </span>
                {isFront && (
                  <span
                    className={[
                      "text-[10px] line-clamp-1",
                      isSelected ? "text-accent/70" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {genre.subGenres.slice(0, 2).join(", ")}
                  </span>
                )}
              </button>
            );
          })}
          </div>
        </div>
        {/* Multi-select dropdown — bottom-left inside the card */}
        <div
          ref={dropdownRef}
          className="absolute bottom-2 left-2"
          style={{ zIndex: VISIBLE_SIDE + 10 }}
          onMouseMove={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-1.5 rounded-md border border-border bg-background/90 backdrop-blur-sm px-2.5 py-1.5 text-xs transition-colors hover:bg-muted cursor-pointer"
          >
            {value.length === 0 ? (
              <span className="text-muted-foreground">Sélectionner…</span>
            ) : (
              value.map((id) => {
                const genre = GENRES.find((g) => g.id === id);
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-0.5 rounded-full bg-accent/15 pl-1.5 pr-0.5 py-0.5 text-[11px] font-medium text-accent"
                  >
                    {GENRE_EMOJIS[id] ?? "🎵"} {genre?.name}
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => { e.stopPropagation(); handleToggle(id); }}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.stopPropagation(); handleToggle(id); } }}
                      className="ml-0.5 rounded-full p-0.5 hover:bg-accent/20 transition-colors cursor-pointer"
                      aria-label={`Retirer ${genre?.name}`}
                    >
                      <span className="text-accent/60 text-[10px]">✕</span>
                    </span>
                  </span>
                );
              })
            )}
            <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute bottom-full left-0 mb-1 w-52 max-h-36 overflow-y-auto rounded-md border border-border bg-background/95 backdrop-blur-sm shadow-lg">
              {GENRES.map((genre) => {
                const isSelected = value.includes(genre.id);
                const isDisabled = !isSelected && value.length >= 2;
                return (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() => handleToggle(genre.id)}
                    disabled={isDisabled}
                    className={`flex w-full items-center gap-2 px-2.5 py-1.5 text-xs transition-colors ${
                      isDisabled
                        ? "cursor-not-allowed opacity-40"
                        : "cursor-pointer hover:bg-muted"
                    } ${
                      isSelected ? "bg-accent/10 text-accent font-medium" : "text-foreground"
                    }`}
                  >
                    <span>{GENRE_EMOJIS[genre.id] ?? "🎵"}</span>
                    <span className="flex-1 text-left">{genre.name}</span>
                    {isSelected && <span className="text-accent">✓</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
