"use server";

import { db } from "@/lib/db";

/** Statistiques globales du dashboard. */
export interface GlobalStats {
  totalGenerations: number;
  totalFavorites: number;
  totalWithAudio: number;
  avgWordCount: number;
  avgSectionCount: number;
  topGenres: { label: string; count: number }[];
  topMoods: { label: string; count: number }[];
  topStyles: { label: string; count: number }[];
  topTempos: { label: string; count: number }[];
  topLanguages: { label: string; count: number }[];
  topAtmospheres: { label: string; count: number }[];
  topSongLengths: { label: string; count: number }[];
  recentActivity: { date: string; count: number }[];
}

/** Utilitaire : top N d'un champ (ignore null/vide). Si split=true, éclate les valeurs CSV. */
function topN(values: (string | null)[], n: number, split = false): { label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const v of values) {
    if (!v) continue;
    const items = split ? v.split(",") : [v];
    for (const item of items) {
      const trimmed = item.trim();
      if (trimmed) counts.set(trimmed, (counts.get(trimmed) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

/**
 * Server Action — Récupère les statistiques globales pour le dashboard.
 */
export async function getGlobalStats(): Promise<GlobalStats> {
  const [
    totalGenerations,
    totalFavorites,
    totalWithAudio,
    avgResult,
    allGenerations,
  ] = await Promise.all([
    db.generation.count(),
    db.generation.count({ where: { isFavorite: true } }),
    db.generation.count({ where: { audioUrl: { not: null } } }),
    db.generation.aggregate({ _avg: { wordCount: true, sectionCount: true } }),
    db.generation.findMany({
      select: {
        genre: true,
        mood: true,
        style: true,
        tempo: true,
        language: true,
        atmosphere: true,
        songLength: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const topGenres = topN(allGenerations.map((g) => g.genre), 5, true);
  const topMoods = topN(allGenerations.map((g) => g.mood), 5);
  const topStyles = topN(allGenerations.map((g) => g.style), 5);
  const topTempos = topN(allGenerations.map((g) => g.tempo), 5);
  const topLanguages = topN(allGenerations.map((g) => g.language), 5, true);
  const topAtmospheres = topN(allGenerations.map((g) => g.atmosphere), 5);
  const topSongLengths = topN(allGenerations.map((g) => g.songLength), 5);

  // Activité récente (7 derniers jours)
  const now = new Date();
  const recentActivity: { date: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const count = allGenerations.filter((g) => {
      const gDate = new Date(g.createdAt).toISOString().split("T")[0];
      return gDate === dateStr;
    }).length;
    recentActivity.push({ date: dateStr, count });
  }

  return {
    totalGenerations,
    totalFavorites,
    totalWithAudio,
    avgWordCount: Math.round(avgResult._avg.wordCount ?? 0),
    avgSectionCount: Math.round(avgResult._avg.sectionCount ?? 0),
    topGenres,
    topMoods,
    topStyles,
    topTempos,
    topLanguages,
    topAtmospheres,
    topSongLengths,
    recentActivity,
  };
}
