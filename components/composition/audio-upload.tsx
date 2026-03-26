"use client";

import { useState, useRef, useTransition } from "react";
import { Upload, Trash2, Music, AlertCircle, Loader2, Replace } from "lucide-react";
import { uploadAudio, deleteAudio } from "@/lib/actions/upload";
import { ACCEPTED_EXTENSIONS, MAX_FILE_SIZE } from "@/lib/schemas/upload";

interface AudioUploadProps {
  generationId: string;
  audioFile: string | null;
  onAudioChange: (audioFile: string | null) => void;
}

export function AudioUpload({ generationId, audioFile, onAudioChange }: AudioUploadProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(file: File) {
    setError(null);

    // Validation côté client rapide
    if (file.size > MAX_FILE_SIZE) {
      setError("Le fichier ne doit pas dépasser 20 Mo");
      return;
    }

    if (!file.name.match(/\.(mp3|wav)$/i)) {
      setError("Seuls les fichiers MP3 et WAV sont acceptés");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("generationId", generationId);

      const result = await uploadAudio(formData);
      if (result.success) {
        onAudioChange(result.audioFile);
      } else {
        setError(result.error);
      }
    });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
    // Reset input pour permettre de re-sélectionner le même fichier
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
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

  return (
    <div className="space-y-3">
      {audioFile ? (
        <AudioPlayer
          audioFile={audioFile}
          isPending={isPending}
          onReplace={() => fileInputRef.current?.click()}
          onDelete={handleDelete}
        />
      ) : (
        <DropZone
          dragOver={dragOver}
          isPending={isPending}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        />
      )}

      {/* Input file caché */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS}
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Message d'erreur */}
      {error && (
        <div className="flex items-start gap-2 rounded-md border border-red-500/30 bg-red-500/10 p-2.5">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
          <p className="text-xs text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
}

function DropZone({
  dragOver,
  isPending,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
}: {
  dragOver: boolean;
  isPending: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onClick: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
      className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors cursor-pointer ${
        dragOver
          ? "border-accent bg-accent/5"
          : "border-border hover:border-accent/50 hover:bg-muted/50"
      } ${isPending ? "opacity-60 pointer-events-none" : ""}`}
    >
      {isPending ? (
        <>
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Upload en cours…</p>
        </>
      ) : (
        <>
          <Upload className="h-6 w-6 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Glissez un fichier audio ou cliquez pour parcourir
          </p>
          <p className="text-[10px] text-muted-foreground/60">
            MP3, WAV — 20 Mo max
          </p>
        </>
      )}
    </div>
  );
}

function AudioPlayer({
  audioFile,
  isPending,
  onReplace,
  onDelete,
}: {
  audioFile: string;
  isPending: boolean;
  onReplace: () => void;
  onDelete: () => void;
}) {
  // Le chemin relatif est "uploads/xxx.mp3", le fichier est dans public/
  const audioSrc = `/${audioFile}`;

  return (
    <div className={`space-y-3 ${isPending ? "opacity-60 pointer-events-none" : ""}`}>
      {/* Player */}
      <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
        <Music className="h-5 w-5 shrink-0 text-accent" />
        <audio controls className="flex-1 h-8" preload="metadata">
          <source src={audioSrc} />
        </audio>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onReplace}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-background border border-border transition-colors cursor-pointer disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Replace className="h-3.5 w-3.5" />
          )}
          Remplacer
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-border transition-colors cursor-pointer disabled:opacity-50"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Supprimer
        </button>
      </div>
    </div>
  );
}
