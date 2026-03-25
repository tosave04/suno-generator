"use client";

const TEMPOS = ["Very Slow", "Slow", "Medium", "Fast", "Very Fast"] as const;

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
  { value: "es", label: "Español" },
  { value: "pt", label: "Português" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
] as const;

const VOCAL_STYLES = [
  "Male", "Female", "Duet", "Choir", "Whisper", "Rap", "Opera",
] as const;

interface ParamsPanelProps {
  tempo: string | null;
  language: string;
  vocalStyle: string | null;
  onTempoChange: (tempo: string) => void;
  onLanguageChange: (language: string) => void;
  onVocalStyleChange: (vocalStyle: string) => void;
}

export function ParamsPanel({
  tempo,
  language,
  vocalStyle,
  onTempoChange,
  onLanguageChange,
  onVocalStyleChange,
}: ParamsPanelProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Tempo */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Tempo</label>
        <div className="inline-flex rounded-md border border-border overflow-hidden">
          {TEMPOS.map((t, i) => (
            <button
              key={t}
              type="button"
              onClick={() => onTempoChange(t)}
              className={`px-3 py-1.5 text-xs transition-colors ${
                tempo === t
                  ? "font-medium text-accent-foreground bg-accent"
                  : "text-muted-foreground bg-background hover:bg-muted"
              } ${i < TEMPOS.length - 1 ? "border-r border-border" : ""}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Langue */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Langue</label>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Style vocal */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Style vocal</label>
        <select
          value={vocalStyle ?? ""}
          onChange={(e) => onVocalStyleChange(e.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        >
          <option value="">Aucune préférence</option>
          {VOCAL_STYLES.map((vs) => (
            <option key={vs} value={vs}>
              {vs}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
