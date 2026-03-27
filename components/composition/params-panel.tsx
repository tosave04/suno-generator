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
  { value: "qya", label: "Elfique", countryCode: null },
] as const;

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

interface ParamsPanelProps {
  tempo: string | null;
  languages: string[];
  vocalStyle: string | null;
  songLength: "short" | "standard";
  onTempoChange: (tempo: string) => void;
  onLanguagesChange: (languages: string[]) => void;
  onVocalStyleChange: (vocalStyle: string | null) => void;
  onSongLengthChange: (songLength: "short" | "standard") => void;
}

export function ParamsPanel({
  tempo,
  languages,
  vocalStyle,
  songLength,
  onTempoChange,
  onLanguagesChange,
  onVocalStyleChange,
  onSongLengthChange,
}: ParamsPanelProps) {
  function handleToggleLanguage(langValue: string) {
    if (languages.includes(langValue)) {
      if (languages.length > 1) {
        onLanguagesChange(languages.filter((l) => l !== langValue));
      }
    } else if (languages.length < 2) {
      onLanguagesChange([...languages, langValue]);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Langue (1-2) */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          Langue <span className="text-muted-foreground/60">(1-2 max)</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {LANGUAGES.map((lang) => {
            const isSelected = languages.includes(lang.value);
            const isDisabled = !isSelected && languages.length >= 2;
            return (
              <button
                key={lang.value}
                type="button"
                onClick={() => handleToggleLanguage(lang.value)}
                disabled={isDisabled}
                title={lang.label}
                className={`flex items-center gap-1 rounded-md px-2 py-1.5 text-xs transition-colors ${
                  isDisabled
                    ? "cursor-not-allowed opacity-40 bg-background text-muted-foreground border border-border"
                    : "cursor-pointer"
                } ${
                  isSelected
                    ? "font-medium bg-accent text-accent-foreground"
                    : isDisabled
                      ? ""
                      : "bg-background text-muted-foreground hover:bg-muted border border-border"
                }`}
              >
                {lang.countryCode ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={`https://flagcdn.com/20x15/${lang.countryCode}.png`}
                    srcSet={`https://flagcdn.com/40x30/${lang.countryCode}.png 2x`}
                    width={20}
                    height={15}
                    alt={lang.label}
                    className="rounded-sm object-cover"
                  />
                ) : (
                  <span className="text-sm">🧝</span>
                )}
                <span>{lang.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Style vocal (icons) */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Style vocal</label>
        <div className="flex flex-wrap gap-1.5">
          {VOCAL_STYLES.map((vs) => {
            const isSelected = vocalStyle === vs.value;
            return (
              <button
                key={vs.value}
                type="button"
                onClick={() => onVocalStyleChange(isSelected ? null : vs.value)}
                title={vs.value}
                className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "font-medium bg-accent text-accent-foreground"
                    : "bg-background text-muted-foreground hover:bg-muted border border-border"
                }`}
              >
                <span className="text-base">{vs.icon}</span>
                <span>{vs.value}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Durée */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Durée</label>
        <div className="inline-flex rounded-md border border-border overflow-hidden">
          <button
            type="button"
            onClick={() => onSongLengthChange("short")}
            className={`px-3 py-1.5 text-xs transition-colors ${
              songLength === "short"
                ? "font-medium text-accent-foreground bg-accent"
                : "text-muted-foreground bg-background hover:bg-muted"
            } border-r border-border`}
          >
            Courte
          </button>
          <button
            type="button"
            onClick={() => onSongLengthChange("standard")}
            className={`px-3 py-1.5 text-xs transition-colors ${
              songLength === "standard"
                ? "font-medium text-accent-foreground bg-accent"
                : "text-muted-foreground bg-background hover:bg-muted"
            }`}
          >
            Standard
          </button>
        </div>
      </div>
    </div>
  );
}
