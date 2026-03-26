import { z } from "zod";

/** Formats audio acceptés. */
export const ACCEPTED_AUDIO_FORMATS = ["audio/mpeg", "audio/wav", "audio/wave", "audio/x-wav"] as const;

/** Extensions correspondantes pour l'attribut accept du file input. */
export const ACCEPTED_EXTENSIONS = ".mp3,.wav";

/** Taille maximale : 20 Mo. */
export const MAX_FILE_SIZE = 20 * 1024 * 1024;

/**
 * Schéma de validation pour l'upload d'un fichier audio.
 * Valide côté serveur : generationId + métadonnées du fichier.
 */
export const uploadAudioSchema = z.object({
  generationId: z.string().min(1, "L'identifiant de la génération est requis"),
  fileName: z
    .string()
    .min(1, "Le nom du fichier est requis")
    .refine(
      (name) => /\.(mp3|wav)$/i.test(name),
      "Seuls les fichiers MP3 et WAV sont acceptés"
    ),
  fileSize: z
    .number()
    .min(1, "Le fichier est vide")
    .max(MAX_FILE_SIZE, "Le fichier ne doit pas dépasser 20 Mo"),
  fileType: z
    .string()
    .refine(
      (type) => (ACCEPTED_AUDIO_FORMATS as readonly string[]).includes(type),
      "Format audio non supporté (MP3 ou WAV uniquement)"
    ),
});

export type UploadAudioInput = z.infer<typeof uploadAudioSchema>;

/** Schéma de validation pour la suppression d'un fichier audio. */
export const deleteAudioSchema = z.object({
  generationId: z.string().min(1, "L'identifiant de la génération est requis"),
});

export type DeleteAudioInput = z.infer<typeof deleteAudioSchema>;
