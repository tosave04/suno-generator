"use client";

const MAX_CHARS = 2000;

const EXAMPLES = [
  "💡 Ballade romantique au coucher du soleil",
  "💡 Hymne énergique pour le sport",
  "💡 Chanson mélancolique sur la pluie en automne",
  "💡 Track festive pour une nuit d'été",
] as const;

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function PromptInput({ value, onChange }: PromptInputProps) {
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
        <div className="flex flex-wrap gap-1.5">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => onChange(example.slice(2).trim())}
              className="text-[10px] text-accent hover:underline"
            >
              {example}
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
