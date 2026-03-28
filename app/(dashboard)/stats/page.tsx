import { getGlobalStats } from "@/lib/actions/stats";
import {
  BarChart3, Heart, Music, FileText, TrendingUp, Mic,
  Pen, Gauge, Globe, Cloud, Clock, Layers,
} from "lucide-react";
import { ATMOSPHERES } from "@/lib/data/atmospheres";
import {
  GENRE_EMOJIS, MOOD_EMOJIS, STYLE_ICONS,
  LANG_FLAGS, LANG_ICONS, TEMPO_EMOJIS, LENGTH_EMOJIS,
} from "@/lib/data/emojis";

/** Construit un Record id→emoji depuis ATMOSPHERES */
const ATMOSPHERE_EMOJIS: Record<string, string> = Object.fromEntries(
  ATMOSPHERES.map((a) => [a.id, a.emoji])
);

export default async function StatsPage() {
  const stats = await getGlobalStats();

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Statistiques</h2>

        {/* Cartes KPI */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
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
            icon={<TrendingUp className="h-5 w-5 text-green-400" />}
            label="Mots / gén."
            value={stats.avgWordCount}
          />
          <StatCard
            icon={<Layers className="h-5 w-5 text-amber-400" />}
            label="Sections / gén."
            value={stats.avgSectionCount}
          />
          <StatCard
            icon={<BarChart3 className="h-5 w-5 text-violet-400" />}
            label="Taux favoris"
            value={stats.totalGenerations > 0 ? Math.round((stats.totalFavorites / stats.totalGenerations) * 100) : 0}
            suffix="%"
          />
        </div>

        {/* Top genres & moods */}
        <div className="grid gap-4 md:grid-cols-2">
          <RankingCard
            title="Genres"
            icon={<Music className="h-4 w-4 text-accent" />}
            items={stats.topGenres}
            total={stats.totalGenerations}
            emojiMap={GENRE_EMOJIS}
          />
          <RankingCard
            title="Moods"
            icon={<BarChart3 className="h-4 w-4 text-pink-400" />}
            items={stats.topMoods}
            total={stats.totalGenerations}
            emojiMap={MOOD_EMOJIS}
          />
        </div>

        {/* Styles & Tempos */}
        <div className="grid gap-4 md:grid-cols-2">
          <RankingCard
            title="Styles d'écriture"
            icon={<Pen className="h-4 w-4 text-amber-400" />}
            items={stats.topStyles}
            total={stats.totalGenerations}
            emojiMap={STYLE_ICONS}
          />
          <RankingCard
            title="Tempos"
            icon={<Gauge className="h-4 w-4 text-green-400" />}
            items={stats.topTempos}
            total={stats.totalGenerations}
            emojiMap={TEMPO_EMOJIS}
          />
        </div>

        {/* Langues & Atmosphères */}
        <div className="grid gap-4 md:grid-cols-2">
          <RankingCard
            title="Langues"
            icon={<Globe className="h-4 w-4 text-cyan-400" />}
            items={stats.topLanguages}
            total={stats.totalGenerations}
            renderIcon={(label) => {
              const code = LANG_FLAGS[label];
              if (code) {
                return (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={`https://flagcdn.com/20x15/${code}.png`}
                    srcSet={`https://flagcdn.com/40x30/${code}.png 2x`}
                    alt={label}
                    width={20}
                    height={15}
                    className="mr-1.5 inline-block"
                  />
                );
              }
              const icon = LANG_ICONS[label];
              return icon ? <span className="mr-1.5">{icon}</span> : null;
            }}
          />
          <RankingCard
            title="Atmosphères"
            icon={<Cloud className="h-4 w-4 text-violet-400" />}
            items={stats.topAtmospheres}
            total={stats.totalGenerations}
            emojiMap={ATMOSPHERE_EMOJIS}
          />
        </div>

        {/* Durées */}
        <div className="grid gap-4 md:grid-cols-2">
          <RankingCard
            title="Durées choisies"
            icon={<Clock className="h-4 w-4 text-orange-400" />}
            items={stats.topSongLengths}
            total={stats.totalGenerations}
            emojiMap={LENGTH_EMOJIS}
          />
        </div>

        {/* Activité récente */}
        <div className="rounded-lg border border-border bg-muted p-4 space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <h3 className="text-sm font-medium text-foreground">Activité (7 derniers jours)</h3>
          </div>
          <ActivityChart data={stats.recentActivity} />
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

function StatCard({ icon, label, value, suffix }: { icon: React.ReactNode; label: string; value: number; suffix?: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted p-4 space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}{suffix}</p>
    </div>
  );
}

function RankingCard({
  title,
  icon,
  items,
  total,
  emojiMap,
  renderIcon,
}: {
  title: string;
  icon: React.ReactNode;
  items: { label: string; count: number }[];
  total: number;
  emojiMap?: Record<string, string>;
  renderIcon?: (label: string) => React.ReactNode;
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
                  <span className="text-foreground flex items-center">
                    <span className="text-muted-foreground mr-2">{i + 1}.</span>
                    {renderIcon ? renderIcon(item.label) : (
                      emojiMap?.[item.label] && (
                        <span className="mr-1.5">{emojiMap[item.label]}</span>
                      )
                    )}
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

function ActivityChart({ data }: { data: { date: string; count: number }[] }) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const totalWeek = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Total : {totalWeek} génération{totalWeek !== 1 ? "s" : ""}</span>
        <span>Max : {maxCount}</span>
      </div>
      <div className="space-y-1.5">
        {data.map((day) => {
          const percent = (day.count / maxCount) * 100;
          const dayLabel = new Date(day.date + "T12:00:00").toLocaleDateString("fr-FR", {
            weekday: "short",
            day: "numeric",
          });
          return (
            <div key={day.date} className="flex items-center gap-3">
              <span className="w-16 text-right text-[11px] text-muted-foreground capitalize shrink-0">
                {dayLabel}
              </span>
              <div className="flex-1 h-5 rounded bg-background overflow-hidden">
                <div
                  className="h-full rounded bg-accent/70 transition-all"
                  style={{ width: `${Math.max(percent, day.count > 0 ? 6 : 0)}%` }}
                />
              </div>
              <span className="w-6 text-right text-[11px] font-medium text-foreground shrink-0">
                {day.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
