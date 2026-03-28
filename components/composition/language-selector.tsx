"use client";

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

interface LanguageSelectorProps {
  value: string[];
  onChange: (languages: string[]) => void;
}

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  function handleToggle(langValue: string) {
    if (value.includes(langValue)) {
      if (value.length > 1) {
        onChange(value.filter((l) => l !== langValue));
      }
    } else if (value.length < 2) {
      onChange([...value, langValue]);
    }
  }

  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap justify-center gap-1.5">
        {LANGUAGES.map((lang) => {
          const isSelected = value.includes(lang.value);
          const isDisabled = !isSelected && value.length >= 2;
          return (
            <button
              key={lang.value}
              type="button"
              onClick={() => handleToggle(lang.value)}
              disabled={isDisabled}
              title={lang.label}
              className={`flex items-center gap-1.5 rounded-md h-12 px-2.5 py-1.5 text-xs transition-colors border ${
                isDisabled
                  ? "cursor-not-allowed opacity-40 border-border bg-background text-muted-foreground"
                  : isSelected
                    ? "font-medium border-accent bg-accent/15 text-accent"
                    : "cursor-pointer border-border bg-background text-muted-foreground hover:bg-muted"
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
  );
}
