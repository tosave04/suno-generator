"use client";

import { ATMOSPHERES } from "@/lib/data/atmospheres";

interface AtmosphereSelectorProps {
  value: string | null;
  onChange: (atmosphereId: string | null) => void;
}

export function AtmosphereSelector({ value, onChange }: AtmosphereSelectorProps) {
  return (
    <div className="space-y-2" role="group" aria-label="Ambiance culturelle">
      <label className="text-xs font-medium text-muted-foreground">
        Ambiance culturelle <span className="text-muted-foreground/60">(optionnel)</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {ATMOSPHERES.map((atmo) => {
          const isSelected = value === atmo.id;
          return (
            <button
              key={atmo.id}
              type="button"
              onClick={() => onChange(isSelected ? null : atmo.id)}
              aria-pressed={isSelected}
              title={atmo.description}
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors ${
                isSelected
                  ? "bg-accent/20 text-accent ring-1 ring-accent/50"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <span>{atmo.emoji}</span>
              {atmo.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
