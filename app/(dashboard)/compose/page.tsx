"use client";

import { useState, useCallback, useTransition } from "react";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GenreSelector } from "@/components/composition/genre-selector";
import { MoodSelector } from "@/components/composition/mood-selector";
import { StyleSelector } from "@/components/composition/style-selector";
import { ParamsPanel } from "@/components/composition/params-panel";
import { PromptInput } from "@/components/composition/prompt-input";
import { AtmosphereSelector } from "@/components/composition/atmosphere-selector";
import {
  GenerationOutput,
  GenerationResult,
} from "@/components/composition/generation-output";
import {
  createGeneration,
  getGenerationById,
  type GenerationData,
} from "@/lib/actions/generation";
import { Sidebar } from "@/components/sidebar/sidebar";

export default function CompositionPage() {
  const [genre, setGenre] = useState<string | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);
  const [tempo, setTempo] = useState<string | null>(null);
  const [language, setLanguage] = useState("en");
  const [vocalStyle, setVocalStyle] = useState<string | null>(null);
  const [atmosphere, setAtmosphere] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState("");

  const [result, setResult] = useState<GenerationData | null>(null);
  const [activeGenerationId, setActiveGenerationId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const canGenerate =
    genre && mood && style && userPrompt.trim().length >= 10 && !isPending;

  function handleGenerate() {
    if (!genre || !mood || !style) return;
    setError(null);

    startTransition(async () => {
      const response = await createGeneration({
        userPrompt,
        genre,
        mood,
        style,
        tempo: tempo ?? undefined,
        language,
        vocalStyle: vocalStyle ?? undefined,
        atmosphere: atmosphere ?? undefined,
      });

      if (response.success) {
        setResult(response.generation);
        setActiveGenerationId(response.generation.id);
        setRefreshKey((k) => k + 1);
      } else {
        setError(response.error);
      }
    });
  }

  const handleSelectGeneration = useCallback((id: string) => {
    startTransition(async () => {
      const data = await getGenerationById(id);
      if (data) {
        setResult(data);
        setActiveGenerationId(data.id);
        setError(null);
      }
    });
  }, []);

  const handleAudioChange = useCallback((audioFile: string | null) => {
    setResult((prev) => prev ? { ...prev, audioFile } : prev);
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <>
      {/* Sidebar */}
      <Sidebar
        activeGenerationId={activeGenerationId}
        onSelectGeneration={handleSelectGeneration}
        refreshKey={refreshKey}
      />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Composer</h2>

            <GenreSelector value={genre} onChange={setGenre} />
            <MoodSelector value={mood} onChange={setMood} />
            <StyleSelector value={style} onChange={setStyle} />
            <ParamsPanel
              tempo={tempo}
              language={language}
              vocalStyle={vocalStyle}
              onTempoChange={setTempo}
              onLanguageChange={setLanguage}
              onVocalStyleChange={(v) => setVocalStyle(v || null)}
            />
            <PromptInput value={userPrompt} onChange={setUserPrompt} />
            <AtmosphereSelector value={atmosphere} onChange={setAtmosphere} />
          </section>

          {/* CTA Générer */}
          <Button
            size="lg"
            disabled={!canGenerate}
            onClick={handleGenerate}
            className="w-full py-3 text-base font-semibold cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Génération en cours…
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Générer
              </>
            )}
          </Button>

          {/* Erreur */}
          {error && (
            <div className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Zone de résultat */}
          <section className="space-y-4">
            {result ? (
              <GenerationResult
                generationId={result.id}
                title={result.title}
                lyrics={result.lyrics}
                positivePrompt={result.positivePrompt}
                negativePrompt={result.negativePrompt}
                sunoSettings={result.sunoSettings}
                systemPrompt={result.systemPrompt}
                audioFile={result.audioFile}
                onAudioChange={handleAudioChange}
                wordCount={result.wordCount}
                characterCount={result.characterCount}
                sectionCount={result.sectionCount}
                estimatedDuration={result.estimatedDuration}
              />
            ) : (
              <GenerationOutput />
            )}
          </section>
        </div>
      </main>
    </>
  );
}
