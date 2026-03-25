"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GenreSelector } from "@/components/composition/genre-selector";
import { MoodSelector } from "@/components/composition/mood-selector";
import { StyleSelector } from "@/components/composition/style-selector";
import { ParamsPanel } from "@/components/composition/params-panel";
import { PromptInput } from "@/components/composition/prompt-input";
import { GenerationOutput } from "@/components/composition/generation-output";

export default function CompositionPage() {
  const [genre, setGenre] = useState<string | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);
  const [tempo, setTempo] = useState<string | null>(null);
  const [language, setLanguage] = useState("en");
  const [vocalStyle, setVocalStyle] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState("");

  const canGenerate = genre && mood && style && userPrompt.trim().length > 0;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
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
      </section>

      {/* CTA Générer */}
      <Button
        size="lg"
        disabled={!canGenerate}
        className="w-full py-3 text-base font-semibold"
      >
        <Sparkles className="mr-2 h-5 w-5" />
        Générer
      </Button>

      {/* Zone de résultat */}
      <section className="space-y-4">
        <GenerationOutput />
      </section>
    </div>
  );
}
