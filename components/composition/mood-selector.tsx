"use client";

import { MOODS } from "@/lib/data/moods";

const MOOD_EMOJIS: Record<string, string> = {
  joyful: "😊", melancholic: "😢", energetic: "⚡", calm: "😌", aggressive: "😤",
  romantic: "💕", dark: "🌑", uplifting: "🌟", nostalgic: "🥀", epic: "🔥",
};

interface MoodSelectorProps {
  value: string | null;
  onChange: (moodId: string | null) => void;
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="space-y-2" role="group" aria-label="Mood / Atmosphère">
      <div className="flex flex-wrap justify-center gap-2">
        <label className="rounded-full px-2.5 py-2 text-xs font-bold bg-muted text-muted-foreground">
          Mood / Atmosphère
        </label>
        {MOODS.map((mood) => {
          const isSelected = value === mood.id;
          return (
            <button
              key={mood.id}
              type="button"
              onClick={() => onChange(isSelected ? null : mood.id)}
              aria-pressed={isSelected}
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors ${
                isSelected
                  ? "bg-accent/20 text-accent ring-1 ring-accent/50"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <span className="text-sm">{MOOD_EMOJIS[mood.id] ?? "🎵"}</span>
              {mood.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
