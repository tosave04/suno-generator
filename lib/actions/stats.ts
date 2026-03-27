"use server";

import { db } from "@/lib/db";

/** Statistiques globales du dashboard. */
export interface GlobalStats {
  totalGenerations: number;
  totalFavorites: number;
  totalWithAudio: number;
  avgWordCount: number;
  topGenres: { genre: string; count: number }[];
  topMoods: { mood: string; count: number }[];
  recentActivity: { date: string; count: number }[];
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
    db.generation.count({ where: { audioFile: { not: null } } }),
    db.generation.aggregate({ _avg: { wordCount: true } }),
    db.generation.findMany({
      select: { genre: true, mood: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // Top genres (top 5)
  const genreCounts = new Map<string, number>();
  for (const g of allGenerations) {
    genreCounts.set(g.genre, (genreCounts.get(g.genre) ?? 0) + 1);
  }
  const topGenres = [...genreCounts.entries()]
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Top moods (top 5)
  const moodCounts = new Map<string, number>();
  for (const g of allGenerations) {
    const mood = g.mood ?? "none";
    moodCounts.set(mood, (moodCounts.get(mood) ?? 0) + 1);
  }
  const topMoods = [...moodCounts.entries()]
    .map(([mood, count]) => ({ mood, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

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
    topGenres,
    topMoods,
    recentActivity,
  };
}
