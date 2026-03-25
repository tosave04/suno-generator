"use client";

import { WRITING_STYLES } from "@/lib/data/styles";

interface StyleSelectorProps {
  value: string | null;
  onChange: (styleId: string) => void;
}

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-xs font-medium text-muted-foreground">Style d&apos;écriture</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {WRITING_STYLES.map((style) => {
          const isSelected = value === style.id;
          return (
            <label
              key={style.id}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${
                isSelected
                  ? "border-2 border-accent bg-accent/10"
                  : "border border-border bg-muted hover:border-accent/50"
              }`}
            >
              <input
                type="radio"
                name="style"
                value={style.id}
                checked={isSelected}
                onChange={() => onChange(style.id)}
                className="hidden"
              />
              <span className={isSelected ? "text-accent font-medium" : "text-foreground"}>
                {style.name}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
