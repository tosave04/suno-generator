"use client";

const SONG_LENGTHS = [
  { value: "short" as const, label: "Courte", hint: "~2 min" },
  { value: "standard" as const, label: "Standard", hint: "~4 min" },
];

interface SongLengthSelectorProps {
  value: "short" | "standard";
  onChange: (songLength: "short" | "standard") => void;
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
