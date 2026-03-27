"use client";

const TEMPOS = [
  { value: "Very Slow", label: "Very Slow", bpm: "50-70" },
  { value: "Slow", label: "Slow", bpm: "70-90" },
  { value: "Medium", label: "Medium", bpm: "90-120" },
  { value: "Fast", label: "Fast", bpm: "120-150" },
  { value: "Very Fast", label: "Very Fast", bpm: "150+" },
] as const;

const LANGUAGES = [
  { value: "en", label: "English", countryCode: "gb" },
  { value: "fr", label: "Français", countryCode: "fr" },
  { value: "es", label: "Español", countryCode: "es" },
  { value: "pt", label: "Português", countryCode: "br" },
  { value: "ja", label: "日本語", countryCode: "jp" },
  { value: "ko", label: "한국어", countryCode: "kr" },
  { value: "de", label: "Deutsch", countryCode: "de" },
  { value: "it", label: "Italiano", countryCode: "it" },
  { value: "ru", label: "Русский", countryCode: "ru" },
  { value: "hi", label: "हिन्दी", countryCode: "in" },
  { value: "ar", label: "العربية", countryCode: "sa" },
  { value: "zh", label: "中文", countryCode: "cn" },
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
              key={t.value}
              type="button"
              onClick={() => onTempoChange(t.value)}
              title={`${t.bpm} BPM`}
              className={`px-3 py-1.5 text-xs transition-colors ${
                tempo === t.value
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

      {/* Langue */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Langue</label>
        <div className="flex flex-wrap gap-1.5">
          {LANGUAGES.map((lang) => {
            const isSelected = language === lang.value;
            return (
              <button
                key={lang.value}
                type="button"
                onClick={() => onLanguageChange(lang.value)}
                title={lang.label}
                className={`flex items-center gap-1 rounded-md px-2 py-1.5 text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "font-medium bg-accent text-accent-foreground"
                    : "bg-background text-muted-foreground hover:bg-muted border border-border"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://flagcdn.com/20x15/${lang.countryCode}.png`}
                  srcSet={`https://flagcdn.com/40x30/${lang.countryCode}.png 2x`}
                  width={20}
                  height={15}
                  alt={lang.label}
                  className="rounded-sm object-cover"
                />
                <span>{lang.label}</span>
              </button>
            );
          })}
        </div>
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
