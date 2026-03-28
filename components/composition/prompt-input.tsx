"use client";

import { useState, useCallback } from "react";
import { Wand2 } from "lucide-react";
import { SAMPLES } from "@/lib/data/samples";

const MAX_CHARS = 2000;

function pickRandom<T>(arr: readonly T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onRandomFill?: () => void;
  isRandomizing?: boolean;
}

export function PromptInput({ value, onChange, onRandomFill, isRandomizing }: PromptInputProps) {
  const [examples, setExamples] = useState(() => pickRandom(SAMPLES, 3));

  const refreshExamples = useCallback(() => {
    setExamples(pickRandom(SAMPLES, 3));
  }, []);

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">
        Décrivez votre chanson
      </label>
      <textarea
        value={value}
        onChange={(e) => {
          if (e.target.value.length <= MAX_CHARS) {
            onChange(e.target.value);
          }
        }}
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent min-h-25"
        rows={4}
        placeholder="Ex: Une ballade mélancolique sur la pluie en automne…"
      />
      <div className="flex items-center justify-between">
        {/* Exemples cliquables */}
        <div className="flex flex-wrap gap-2 items-center">
          {onRandomFill && (
            <button
              type="button"
              onClick={onRandomFill}
              disabled={isRandomizing}
              title="Remplir aléatoirement tous les champs"
              className={`inline-flex items-center gap-1.5 rounded-lg border-2 border-accent/40 bg-accent/15 px-3.5 py-1.5 mr-4 text-sm font-semibold text-accent shadow-sm transition-all hover:bg-accent/25 hover:border-accent/60 hover:shadow-md cursor-pointer ${isRandomizing ? "animate-pulse border-accent bg-accent/25 shadow-accent/20" : ""}`}
            >
              <Wand2 className={`h-4 w-4 ${isRandomizing ? "animate-spin" : ""}`} />
              {isRandomizing ? "Tirage…" : "Random"}
            </button>
          )}
          {examples.map((example, i) => (
            <button
              key={`${example}-${i}`}
              type="button"
              suppressHydrationWarning
              onClick={() => { onChange(example); refreshExamples(); }}
              className="text-[10px] text-accent hover:underline"
            >
              💡 {example.length > 50 ? `${example.slice(0, 50)}…` : example}
            </button>
          ))}
        </div>
        {/* Compteur */}
        <span className="text-[10px] text-muted-foreground shrink-0 ml-2">
          {value.length} / {MAX_CHARS}
        </span>
      </div>
    </div>
  );
}
