import { type HTMLAttributes } from "react";

const variantClasses = {
  default:
    "bg-muted text-muted-foreground",
  active:
    "bg-accent/20 text-accent ring-1 ring-accent/50",
  mood:
    "bg-muted text-foreground",
} as const;

/** Couleurs de genre musical pour reconnaissance visuelle (clés = genre IDs de lib/data/genres.ts) */
export const genreColorClasses: Record<string, string> = {
  pop: "bg-pink-500/20 text-pink-400",
  rock: "bg-red-500/20 text-red-400",
  hiphop: "bg-amber-500/20 text-amber-400",
  jazz: "bg-blue-500/20 text-blue-400",
  electronic: "bg-cyan-500/20 text-cyan-400",
  rnb: "bg-purple-500/20 text-purple-400",
  country: "bg-orange-500/20 text-orange-400",
  classical: "bg-yellow-500/20 text-yellow-400",
  metal: "bg-zinc-500/20 text-zinc-400",
  folk: "bg-green-500/20 text-green-400",
  reggae: "bg-emerald-500/20 text-emerald-400",
  latin: "bg-rose-500/20 text-rose-400",
  blues: "bg-indigo-500/20 text-indigo-400",
  funk: "bg-fuchsia-500/20 text-fuchsia-400",
  soul: "bg-violet-500/20 text-violet-400",
  indie: "bg-teal-500/20 text-teal-400",
  punk: "bg-lime-500/20 text-lime-400",
  ambient: "bg-sky-500/20 text-sky-400",
  kpop: "bg-pink-400/20 text-pink-300",
  "16bit": "bg-green-400/20 text-green-300",
  celtic: "bg-emerald-400/20 text-emerald-300",
  afroworld: "bg-amber-400/20 text-amber-300",
  disco: "bg-fuchsia-400/20 text-fuchsia-300",
  middleeastern: "bg-orange-400/20 text-orange-300",
  indian: "bg-rose-400/20 text-rose-300",
  japanese: "bg-red-400/20 text-red-300",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variantClasses;
  genreId?: string;
}

export function Badge({ variant = "default", genreId, className = "", children, ...props }: BadgeProps) {
  const colorClass = genreId
    ? genreColorClasses[genreId] ?? variantClasses.default
    : variantClasses[variant];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${colorClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
