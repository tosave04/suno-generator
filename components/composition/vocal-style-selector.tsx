"use client";

const VOCAL_STYLES = [
  { value: "Male", icon: "🧑" },
  { value: "Female", icon: "👩" },
  { value: "Duet", icon: "👫" },
  { value: "Choir", icon: "🎶" },
  { value: "Whisper", icon: "🤫" },
  { value: "Rap", icon: "🎤" },
  { value: "Opera", icon: "🎭" },
  { value: "Robotic", icon: "🤖" },
] as const;

interface VocalStyleSelectorProps {
  value: string | null;
  onChange: (vocalStyle: string | null) => void;
}

export function VocalStyleSelector({ value, onChange }: VocalStyleSelectorProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap justify-center gap-1.5">
        {VOCAL_STYLES.map((vs) => {
          const isSelected = value === vs.value;
          return (
            <button
              key={vs.value}
              type="button"
              onClick={() => onChange(isSelected ? null : vs.value)}
              title={vs.value}
              className={`flex items-center gap-1.5 rounded-md h-12 px-2.5 py-1.5 text-xs transition-colors cursor-pointer border ${
                isSelected
                  ? "font-medium border-accent bg-accent/15 text-accent"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              <span className="text-base">{vs.icon}</span>
              <span>{vs.value}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
