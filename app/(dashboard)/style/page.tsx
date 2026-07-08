"use client";

import { useState, useTransition } from "react";
import { Sparkles, Loader2, AlertCircle, Wand2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createStyleSettings } from "@/lib/actions/style";
import type { StyleResponse } from "@/lib/schemas/style";
import {
  getWeirdnessLabel,
  getStyleInfluenceLabel,
} from "@/lib/utils/suno-labels";

export default function StylePage() {
  const [reference, setReference] = useState("");
  const [result, setResult] = useState<StyleResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const canSubmit = reference.trim().length >= 2 && !isPending;

  function handleSubmit() {
    if (!canSubmit) return;
    setError(null);
    setResult(null);
    startTransition(async () => {
      const response = await createStyleSettings({ reference });
      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.error);
      }
    });
  }

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-semibold text-foreground">Style</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Indique le nom d&apos;un artiste connu ou d&apos;un morceau pour
            générer automatiquement les réglages Suno équivalents
            (Style of Music, Exclude from Song, Vocal Gender, Weirdness,
            Style Influence).
          </p>
        </section>

        <section className="space-y-3 rounded-lg border border-border bg-muted p-4">
          <label
            htmlFor="style-reference"
            className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
          >
            Artiste ou morceau
          </label>
          <input
            id="style-reference"
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && canSubmit) handleSubmit();
            }}
            placeholder='Ex: "Daft Punk", "Bohemian Rhapsody", "Billie Eilish - bad guy"...'
            maxLength={200}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {reference.length}/200
            </span>
            <Button
              disabled={!canSubmit}
              onClick={handleSubmit}
              className="cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyse en cours…
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Générer les réglages
                </>
              )}
            </Button>
          </div>
        </section>

        {error && (
          <div className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {result && <StyleResultView data={result} />}
      </div>
    </main>
  );
}

function StyleResultView({ data }: { data: StyleResponse }) {
  const weirdnessLabel = getWeirdnessLabel(data.sunoSettings.weirdness);
  const styleLabel = getStyleInfluenceLabel(data.sunoSettings.styleInfluence);

  const settingsItems = [
    { label: "Vocal Gender", value: data.sunoSettings.vocalGender, sub: null },
    {
      label: "Weirdness",
      value: `${data.sunoSettings.weirdness}%`,
      sub: weirdnessLabel,
    },
    {
      label: "Style Influence",
      value: `${data.sunoSettings.styleInfluence}%`,
      sub: styleLabel,
    },
  ];

  return (
    <section className="space-y-4 rounded-lg border border-border bg-muted p-4 animate-fade-in">
      {/* Détection */}
      <div className="flex flex-wrap gap-2">
        <Badge label="Genre détecté" value={data.detectedGenre} />
        {data.detectedMood && (
          <Badge label="Mood détecté" value={data.detectedMood} />
        )}
      </div>

      {/* Rationale */}
      <div className="space-y-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          Analyse
        </span>
        <p className="text-sm text-foreground whitespace-pre-wrap rounded-md bg-background p-2.5">
          {data.rationale}
        </p>
      </div>

      {/* Prompt + */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            Style of Music (Prompt +)
          </span>
          <CopyButton text={data.positivePrompt} label="Prompt +" />
        </div>
        <p className="text-sm text-foreground whitespace-pre-wrap rounded-md bg-background p-2.5">
          {data.positivePrompt}
        </p>
      </div>

      {/* Prompt − */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            Exclude from Song (Prompt −)
          </span>
          {data.negativePrompt && (
            <CopyButton text={data.negativePrompt} label="Prompt −" />
          )}
        </div>
        <p className="text-sm text-foreground whitespace-pre-wrap rounded-md bg-background p-2.5">
          {data.negativePrompt ?? "Aucun prompt négatif"}
        </p>
      </div>

      {/* Suno Settings */}
      <div className="space-y-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          Paramètres Suno
        </span>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {settingsItems.map(({ label, value, sub }) => (
            <div
              key={label}
              className="rounded-md bg-background p-2.5 space-y-1"
            >
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {label}
              </span>
              <p className="text-sm font-medium text-foreground">{value}</p>
              {sub && (
                <span className="text-[10px] text-muted-foreground italic">
                  {sub}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Badge({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-background px-2.5 py-1 text-xs">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium text-foreground">{value}</span>
    </span>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore clipboard failures silently
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-muted-foreground hover:text-foreground hover:bg-background transition-colors cursor-pointer"
      aria-label={`Copier ${label}`}
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" />
          Copié
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          Copier
        </>
      )}
    </button>
  );
}
