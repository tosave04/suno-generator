"use client";

import { MOODS } from "@/lib/data/moods";

const MOOD_EMOJIS: Record<string, string> = {
  joyful: "😊", melancholic: "😢", energetic: "⚡", calm: "😌", aggressive: "😤",
  romantic: "💕", dark: "🌑", uplifting: "🌟", nostalgic: "🥀", epic: "🔥",
};

interface MoodSelectorProps {
  value: string | null;
  onChange: (moodId: string) => void;
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground">Mood / Atmosphère</label>
      <div className="flex flex-wrap gap-2">
        {MOODS.map((mood) => {
          const isSelected = value === mood.id;
          return (
            <button
              key={mood.id}
              type="button"
              onClick={() => onChange(mood.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors ${
                isSelected
                  ? "bg-accent/20 text-accent ring-1 ring-accent/50"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <span>{MOOD_EMOJIS[mood.id] ?? "🎵"}</span>
              {mood.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
