import { getGlobalStats } from "@/lib/actions/stats";
import { BarChart3, Heart, Music, FileText, TrendingUp, Mic } from "lucide-react";

export default async function StatsPage() {
  const stats = await getGlobalStats();

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Statistiques</h2>

        {/* Cartes KPI */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            icon={<FileText className="h-5 w-5 text-accent" />}
            label="Générations"
            value={stats.totalGenerations}
          />
          <StatCard
            icon={<Heart className="h-5 w-5 text-pink-400" />}
            label="Favoris"
            value={stats.totalFavorites}
          />
          <StatCard
            icon={<Mic className="h-5 w-5 text-cyan-400" />}
            label="Avec audio"
            value={stats.totalWithAudio}
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5 text-success" />}
            label="Mots / génération"
            value={stats.avgWordCount}
          />
        </div>

        {/* Top genres & moods */}
        <div className="grid gap-4 md:grid-cols-2">
          <RankingCard
            title="Genres les plus utilisés"
            icon={<Music className="h-4 w-4 text-accent" />}
            items={stats.topGenres.map((g) => ({ label: g.genre, count: g.count }))}
            total={stats.totalGenerations}
          />
          <RankingCard
            title="Moods les plus utilisés"
            icon={<BarChart3 className="h-4 w-4 text-accent" />}
            items={stats.topMoods.map((m) => ({ label: m.mood, count: m.count }))}
            total={stats.totalGenerations}
          />
        </div>

        {/* Activité récente */}
        <div className="rounded-lg border border-border bg-muted p-4 space-y-3">
          <h3 className="text-sm font-medium text-foreground">Activité (7 derniers jours)</h3>
          <div className="flex items-end gap-2 h-32">
            {stats.recentActivity.map((day) => {
              const maxCount = Math.max(...stats.recentActivity.map((d) => d.count), 1);
              const heightPercent = (day.count / maxCount) * 100;
              const dayLabel = new Date(day.date + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "short" });
              return (
                <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[10px] text-muted-foreground">{day.count}</span>
                  <div
                    className="w-full rounded-t bg-accent/70 transition-all"
                    style={{ height: `${Math.max(heightPercent, 4)}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground capitalize">{dayLabel}</span>
                </div>
              );
            })}
          </div>
        </div>

        {stats.totalGenerations === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            Aucune donnée pour le moment. Lancez votre première génération !
          </p>
        )}
      </div>
    </main>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-muted p-4 space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}

function RankingCard({
  title,
  icon,
  items,
  total,
}: {
  title: string;
  icon: React.ReactNode;
  items: { label: string; count: number }[];
  total: number;
}) {
  return (
    <div className="rounded-lg border border-border bg-muted p-4 space-y-3">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
      </div>
      {items.length === 0 ? (
        <p className="text-xs text-muted-foreground">Aucune donnée</p>
      ) : (
        <ul className="space-y-2" role="list">
          {items.map((item, i) => {
            const percent = total > 0 ? Math.round((item.count / total) * 100) : 0;
            return (
              <li key={item.label} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">
                    <span className="text-muted-foreground mr-2">{i + 1}.</span>
                    {item.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.count} ({percent}%)
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-background">
                  <div
                    className="h-full rounded-full bg-accent/70 transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
