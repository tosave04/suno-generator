"use client";

import { useState } from "react";
import { Music } from "lucide-react";
import type { SunoSettings } from "@/lib/actions/generation";

const TABS = ["Lyrics", "Prompt +", "Prompt −", "Réglages"] as const;
type Tab = (typeof TABS)[number];

/** État vide : aucune génération encore */
export function GenerationOutput() {
  return (
    <div className="rounded-lg border border-border bg-muted p-4">
      <EmptyState />
    </div>
  );
}

/** Version avec résultat */
export function GenerationResult({
  title,
  lyrics,
  positivePrompt,
  negativePrompt,
  sunoSettings,
}: {
  title: string;
  lyrics: string;
  positivePrompt: string;
  negativePrompt: string | null;
  sunoSettings: SunoSettings;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("Lyrics");

  return (
    <div className="rounded-lg border border-border bg-muted p-4 space-y-4">
      {/* Header avec titre */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex gap-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? "font-medium text-accent border-accent"
                  : "text-muted-foreground hover:text-foreground border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="min-h-40">
        {activeTab === "Lyrics" && <LyricsView lyrics={lyrics} />}
        {activeTab === "Prompt +" && <PromptView text={positivePrompt} />}
        {activeTab === "Prompt −" && <PromptView text={negativePrompt ?? "Aucun prompt négatif"} />}
        {activeTab === "Réglages" && <SunoSettingsView settings={sunoSettings} />}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <Music className="h-8 w-8 text-muted-foreground opacity-50" />
      <p className="text-sm text-muted-foreground">Aucune génération pour le moment</p>
      <p className="text-xs text-muted-foreground/70">
        Sélectionnez vos paramètres et lancez une génération
      </p>
    </div>
  );
}

function LyricsView({ lyrics }: { lyrics: string }) {
  const lines = lyrics.split("\n");

  return (
    <div className="font-mono text-sm leading-relaxed space-y-1 p-3 rounded-md bg-background">
      {lines.map((line, i) => {
        const tagMatch = line.match(/^\[(.+)\]$/);
        const inlineMatch = line.match(/^\((.+)\)$/);

        if (tagMatch) {
          return (
            <p key={i} className="text-accent font-semibold mt-3">
              {line}
            </p>
          );
        }
        if (inlineMatch) {
          return (
            <p key={i} className="text-muted-foreground italic">
              {line}
            </p>
          );
        }
        if (line.trim() === "") {
          return <br key={i} />;
        }
        return (
          <p key={i} className="text-foreground">
            {line}
          </p>
        );
      })}
    </div>
  );
}

function PromptView({ text }: { text: string }) {
  return (
    <div className="relative group p-3 rounded-md bg-background">
      <p className="text-sm text-foreground whitespace-pre-wrap">{text}</p>
    </div>
  );
}

function SunoSettingsView({ settings }: { settings: SunoSettings }) {
  const items = [
    { label: "Vocal Gender", value: settings.vocalGender },
    { label: "Weirdness", value: `${settings.weirdness}%` },
    { label: "Style Influence", value: `${settings.styleInfluence}%` },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 p-3">
      {items.map(({ label, value }) => (
        <div key={label} className="rounded-md bg-background p-2.5 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
          <p className="text-sm font-medium text-foreground">{value}</p>
        </div>
      ))}
    </div>
  );
}
