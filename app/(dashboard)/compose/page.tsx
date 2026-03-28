"use client";

import { useState, useCallback, useRef, useTransition } from "react";
import { Sparkles, Loader2, AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GenreSelector } from "@/components/composition/genre-selector";
import { MoodSelector } from "@/components/composition/mood-selector";
import { StyleSelector } from "@/components/composition/style-selector";
import { TempoSelector } from "@/components/composition/tempo-selector";
import { LanguageSelector } from "@/components/composition/language-selector";
import { VocalStyleSelector } from "@/components/composition/vocal-style-selector";
import { SongLengthSelector } from "@/components/composition/song-length-selector";
import { AtmosphereSelector } from "@/components/composition/atmosphere-selector";
import { PromptInput } from "@/components/composition/prompt-input";
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
import { generateRandomComposition } from "@/lib/utils/random-composition";

/** Effet "tirage de loto" : itérations rapides puis décélération */
const LOTTERY_DELAYS = [
  50, 50, 50, 50, 50, 50,
  100, 100, 200, 200, 500,
];

export default function CompositionPage() {
  const [genres, setGenres] = useState<string[]>([]);
  const [style, setStyle] = useState<string | null>("poetic");
  const [mood, setMood] = useState<string | null>(null);
  const [tempo, setTempo] = useState<string | null>("Medium");
  const [languages, setLanguages] = useState<string[]>(["en"]);
  const [vocalStyle, setVocalStyle] = useState<string | null>(null);
  const [atmosphere, setAtmosphere] = useState<string | null>(null);
  const [songLength, setSongLength] = useState<"short" | "radio" | "standard" | "long">("radio");
  const [userPrompt, setUserPrompt] = useState("");

  const [result, setResult] = useState<GenerationData | null>(null);
  const [activeGenerationId, setActiveGenerationId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isRandomizing, setIsRandomizing] = useState(false);
  const randomTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const canGenerate =
    genres.length > 0 && style && userPrompt.trim().length >= 10 && !isPending;

  function handleGenerate() {
    if (!genres.length || !style) return;
    setError(null);
    setResult(null);

    startTransition(async () => {
      const response = await createGeneration({
        userPrompt,
        genres,
        mood: mood ?? undefined,
        style,
        tempo: tempo ?? undefined,
        languages,
        vocalStyle: vocalStyle ?? undefined,
        atmosphere: atmosphere ?? undefined,
        songLength,
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
        // Restaurer les paramètres du formulaire
        setGenres(data.genre.split(","));
        setMood(data.mood);
        setStyle(data.style);
        setTempo(data.tempo);
        setLanguages(data.language.split(","));
        setVocalStyle(data.vocalStyle);
        setAtmosphere(data.atmosphere);
        if (data.songLength === "short" || data.songLength === "radio" || data.songLength === "standard" || data.songLength === "long") {
          setSongLength(data.songLength);
        }
        setUserPrompt(data.userPrompt);
      }
    });
  }, []);

  const handleAudioChange = useCallback((audioUrl: string | null) => {
    setResult((prev) => prev ? { ...prev, audioUrl } : prev);
    setRefreshKey((k) => k + 1);
  }, []);

  const applyRandom = useCallback(() => {
    const r = generateRandomComposition();
    setGenres(r.genres);
    setStyle(r.style);
    setMood(r.mood);
    setTempo(r.tempo);
    setLanguages(r.languages);
    setVocalStyle(r.vocalStyle);
    setAtmosphere(r.atmosphere);
    setSongLength(r.songLength);
    setUserPrompt(r.userPrompt);
  }, []);

  const handleRandomFill = useCallback(() => {
    randomTimers.current.forEach(clearTimeout);
    randomTimers.current = [];
    setIsRandomizing(true);

    let elapsed = 0;
    for (const delay of LOTTERY_DELAYS) {
      elapsed += delay;
      randomTimers.current.push(setTimeout(applyRandom, elapsed));
    }
    randomTimers.current.push(
      setTimeout(() => setIsRandomizing(false), elapsed),
    );
  }, [applyRandom]);

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

            <GenreSelector value={genres} onChange={setGenres} />
            <StyleSelector value={style} onChange={setStyle} />

            <div className="space-y-4">
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                <SongLengthSelector value={songLength} onChange={setSongLength} />
                <TempoSelector value={tempo} onChange={setTempo} />
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">
              </div>
            </div>
          </section>

          <LanguageSelector value={languages} onChange={setLanguages} />
          <VocalStyleSelector value={vocalStyle} onChange={setVocalStyle} />
          <MoodSelector value={mood} onChange={setMood} />
          <AtmosphereSelector value={atmosphere} onChange={setAtmosphere} />

          <PromptInput value={userPrompt} onChange={setUserPrompt} onRandomFill={handleRandomFill} isRandomizing={isRandomizing} />

          {/* CTA Générer + Reset */}
          <div className="flex gap-3">
            <Button
              size="lg"
              disabled={!canGenerate}
              onClick={handleGenerate}
              className="flex-1 py-3 text-base font-semibold cursor-pointer"
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
            <Button
              size="lg"
              variant="ghost"
              disabled={isPending}
              onClick={() => {
                setGenres([]);
                setStyle("poetic");
                setMood(null);
                setTempo("Medium");
                setLanguages(["en"]);
                setVocalStyle(null);
                setAtmosphere(null);
                setSongLength("radio");
                setUserPrompt("");
                setResult(null);
                setError(null);
              }}
              className="group relative px-4 py-3 cursor-pointer rounded-md border border-border/50 hover:border-accent/40 hover:bg-accent/5 transition-all duration-200"
              aria-label="Réinitialiser les réglages"
            >
              <RotateCcw className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-180" />
            </Button>
          </div>

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
                audioUrl={result.audioUrl}
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
