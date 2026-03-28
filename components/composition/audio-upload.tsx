"use client";

import { useState, useTransition } from "react";
import { Link2, Trash2, AlertCircle, Loader2, ExternalLink } from "lucide-react";
import { saveAudioUrl, deleteAudio } from "@/lib/actions/upload";
import { ACCEPTED_URL_PREFIXES } from "@/lib/schemas/upload";

interface AudioLinkProps {
  generationId: string;
  audioUrl: string | null;
  onAudioChange: (audioUrl: string | null) => void;
}

export function AudioLink({ generationId, audioUrl, onAudioChange }: AudioLinkProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  function handleSave() {
    setError(null);
    const url = inputValue.trim();
    if (!url) {
      setError("Veuillez entrer un lien");
      return;
    }

    const isValid = ACCEPTED_URL_PREFIXES.some((prefix) => url.startsWith(prefix));
    if (!isValid) {
      setError("Lien incorrect — Seuls les liens Suno ou YouTube sont acceptés");
      return;
    }

    startTransition(async () => {
      const result = await saveAudioUrl({ generationId, audioUrl: url });
      if (result.success) {
        onAudioChange(result.audioUrl);
        setInputValue("");
      } else {
        setError(result.error);
      }
    });
  }

  function handleDelete() {
    setError(null);
    startTransition(async () => {
      const result = await deleteAudio({ generationId });
      if (result.success) {
        onAudioChange(null);
      } else {
        setError(result.error);
      }
    });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  }

  return (
    <div className="space-y-2.5">
      {audioUrl ? (
        <div className="flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/5 p-3">
          <Link2 className="h-4 w-4 shrink-0 text-accent" />
          <a
            href={audioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 truncate text-xs text-accent hover:underline"
          >
            {audioUrl}
          </a>
          <a
            href={audioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="shrink-0 text-muted-foreground hover:text-destructive transition-colors cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="url"
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value); setError(null); }}
            onKeyDown={handleKeyDown}
            placeholder="https://suno.com/s/... ou lien YouTube"
            disabled={isPending}
            className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none disabled:opacity-50"
          />
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending || !inputValue.trim()}
            className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-3 py-2 text-xs text-accent hover:bg-accent/20 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Link2 className="h-3.5 w-3.5" />
            )}
            Lier
          </button>
        </div>
      )}

      {/* Aide */}
      {!audioUrl && !error && (
        <p className="text-[10px] text-muted-foreground/60">
          Liens acceptés : suno.com/s/… · youtube.com · youtu.be
        </p>
      )}

      {/* Erreur */}
      {error && (
        <div className="flex items-start gap-2 rounded-md border border-red-500/30 bg-red-500/10 p-2.5">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
          <p className="text-xs text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
}
