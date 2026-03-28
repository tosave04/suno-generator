"use client";

const TEMPOS = [
  { value: "Very Slow", label: "Very Slow", bpm: "50-70" },
  { value: "Slow", label: "Slow", bpm: "70-90" },
  { value: "Medium", label: "Medium", bpm: "90-120" },
  { value: "Fast", label: "Fast", bpm: "120-150" },
  { value: "Very Fast", label: "Very Fast", bpm: "150+" },
] as const;

interface TempoSelectorProps {
  value: string | null;
  onChange: (tempo: string) => void;
}

export function TempoSelector({ value, onChange }: TempoSelectorProps) {
  return (
    <div className="space-y-1.5">
      <div className="inline-flex rounded-md border border-border overflow-hidden">
        {TEMPOS.map((t, i) => (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            title={`${t.bpm} BPM`}
            className={`px-3 py-1.5 text-xs transition-colors ${
              value === t.value
                ? "font-medium text-accent-foreground bg-accent"
                : "text-muted-foreground bg-background hover:bg-muted"
            } ${i < TEMPOS.length - 1 ? "border-r border-border" : ""}`}
          >
            <span>{t.label}</span>
            <span className="block text-[9px] opacity-70">{t.bpm}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
