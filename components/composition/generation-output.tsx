"use client";

import { useState } from "react";
import { Music, Copy, Check, Hash, Type, LayoutList, Clock, Terminal } from "lucide-react";
import type { SunoSettings } from "@/lib/actions/generation";
import { AudioLink } from "@/components/composition/audio-upload";

const TABS = ["Lyrics", "Réglages", "Prompt IA"] as const;
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
  generationId,
  title,
  lyrics,
  positivePrompt,
  negativePrompt,
  sunoSettings,
  systemPrompt,
  audioUrl,
  onAudioChange,
  wordCount,
  characterCount,
  sectionCount,
  estimatedDuration,
}: {
  generationId: string;
  title: string;
  lyrics: string;
  positivePrompt: string;
  negativePrompt: string | null;
  sunoSettings: SunoSettings;
  systemPrompt: string | null;
  audioUrl: string | null;
  onAudioChange: (audioUrl: string | null) => void;
  wordCount: number;
  characterCount: number;
  sectionCount: number;
  estimatedDuration: string;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("Lyrics");

  return (
    <div className="rounded-lg border border-border bg-muted p-4 space-y-4 animate-fade-in">
      {/* Header avec titre */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-4 rounded-md bg-background px-3 py-2">
        <StatBadge icon={<Hash className="h-3.5 w-3.5" />} label="Mots" value={wordCount} />
        <StatBadge icon={<Type className="h-3.5 w-3.5" />} label="Caractères" value={characterCount} />
        <StatBadge icon={<LayoutList className="h-3.5 w-3.5" />} label="Sections" value={sectionCount} />
        <StatBadge icon={<Clock className="h-3.5 w-3.5" />} label="Durée est." value={estimatedDuration} />
      </div>

      {/* Tabs */}
      <div className="border-b border-border" role="tablist" aria-label="Sections de la génération">
        <nav className="flex gap-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
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
        {activeTab === "Réglages" && (
          <SettingsView
            positivePrompt={positivePrompt}
            negativePrompt={negativePrompt}
            sunoSettings={sunoSettings}
          />
        )}
        {activeTab === "Prompt IA" && (
          <SystemPromptView systemPrompt={systemPrompt} />
        )}
      </div>

      {/* Lien audio — toujours visible */}
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Lien audio</h4>
        <AudioLink
          generationId={generationId}
          audioUrl={audioUrl}
          onAudioChange={onAudioChange}
        />
      </div>
    </div>
  );
}

function StatBadge({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      {icon}
      <span>{label}</span>
      <span className="font-medium text-foreground">{value}</span>
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

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Copier ${label}`}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] text-muted-foreground hover:text-foreground hover:bg-background transition-colors cursor-pointer"
    >
      {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copié" : label}
    </button>
  );
}

function LyricsView({ lyrics }: { lyrics: string }) {
  const lines = lyrics.split("\n");

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <CopyButton text={lyrics} label="Lyrics" />
      </div>
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
    </div>
  );
}

/** Labels Suno pour le curseur Weirdness. */
function getWeirdnessLabel(value: number): string {
  if (value <= 32) return "Safe zone";
  if (value <= 65) return "Expected results";
  if (value <= 79) return "Experimental results";
  return "Chaos mode";
}

/** Labels Suno pour le curseur Style Influence. */
function getStyleInfluenceLabel(value: number): string {
  if (value <= 32) return "Loose";
  if (value <= 79) return "Moderate";
  return "Strong";
}

function SettingsView({
  positivePrompt,
  negativePrompt,
  sunoSettings,
}: {
  positivePrompt: string;
  negativePrompt: string | null;
  sunoSettings: SunoSettings;
}) {
  const weirdnessLabel = getWeirdnessLabel(sunoSettings.weirdness);
  const styleLabel = getStyleInfluenceLabel(sunoSettings.styleInfluence);

  const settingsItems = [
    { label: "Vocal Gender", value: sunoSettings.vocalGender, sub: null },
    { label: "Weirdness", value: `${sunoSettings.weirdness}%`, sub: weirdnessLabel },
    { label: "Style Influence", value: `${sunoSettings.styleInfluence}%`, sub: styleLabel },
  ];

  return (
    <div className="space-y-4 p-3">
      {/* Prompt + */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Style of Music (Prompt +)</span>
          <CopyButton text={positivePrompt} label="Prompt +" />
        </div>
        <p className="text-sm text-foreground whitespace-pre-wrap rounded-md bg-background p-2.5">
          {positivePrompt}
        </p>
      </div>

      {/* Prompt − */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Exclude from Song (Prompt −)</span>
          {negativePrompt && <CopyButton text={negativePrompt} label="Prompt −" />}
        </div>
        <p className="text-sm text-foreground whitespace-pre-wrap rounded-md bg-background p-2.5">
          {negativePrompt ?? "Aucun prompt négatif"}
        </p>
      </div>

      {/* Suno Settings */}
      <div className="space-y-1.5">
        <span className="text-xs font-medium text-muted-foreground">Paramètres Suno</span>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {settingsItems.map(({ label, value, sub }) => (
            <div key={label} className="rounded-md bg-background p-2.5 space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {label}
              </span>
              <p className="text-sm font-medium text-foreground">{value}</p>
              {sub && (
                <span className="text-[10px] text-muted-foreground italic">{sub}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SystemPromptView({ systemPrompt }: { systemPrompt: string | null }) {
  if (!systemPrompt) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
        <Terminal className="h-6 w-6 text-muted-foreground opacity-50" />
        <p className="text-sm text-muted-foreground">
          Prompt système non disponible pour cette génération
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          Prompt système envoyé à DeepSeek
        </span>
        <CopyButton text={systemPrompt} label="Prompt" />
      </div>
      <pre className="text-xs leading-relaxed whitespace-pre-wrap rounded-md bg-background p-3 max-h-96 overflow-y-auto text-foreground font-mono">
        {systemPrompt}
      </pre>
    </div>
  );
}
