"use client";

type SongLength = "short" | "radio" | "standard" | "long";

const SONG_LENGTHS: { value: SongLength; label: string; hint: string }[] = [
  { value: "short", label: "Courte", hint: "~2 min" },
  { value: "radio", label: "Radio", hint: "~3 min" },
  { value: "standard", label: "Standard", hint: "~4 min" },
  { value: "long", label: "Longue", hint: "~5-6 min" },
];

interface SongLengthSelectorProps {
  value: SongLength;
  onChange: (songLength: SongLength) => void;
}

export function SongLengthSelector({ value, onChange }: SongLengthSelectorProps) {
  return (
    <div className="space-y-1.5">
      <div className="inline-flex rounded-md border border-border overflow-hidden">
        {SONG_LENGTHS.map((sl, i) => (
          <button
            key={sl.value}
            type="button"
            onClick={() => onChange(sl.value)}
            className={`px-3 py-1.5 text-xs transition-colors ${
              value === sl.value
                ? "font-medium text-accent-foreground bg-accent"
                : "text-muted-foreground bg-background hover:bg-muted"
            } ${i < SONG_LENGTHS.length - 1 ? "border-r border-border" : ""}`}
          >
            <span>{sl.label}</span>
            <span className="block text-[9px] opacity-70">{sl.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
