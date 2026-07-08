import Link from "next/link";
import { Music, BarChart3, Wand2 } from "lucide-react";
import type { Route } from "next";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <Music className="h-5 w-5 text-accent" />
          <h1 className="text-base font-semibold text-foreground">Suno Generator</h1>
        </div>
        <nav className="flex items-center gap-1" aria-label="Navigation principale">
          <Link
            href={"/compose" as Route}
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            Composer
          </Link>
          <Link
            href={"/style" as Route}
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Wand2 className="inline-block h-4 w-4 mr-1" />
            Style
          </Link>
          <Link
            href={"/stats" as Route}
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <BarChart3 className="inline-block h-4 w-4 mr-1" />
            Stats
          </Link>
        </nav>
      </header>

      {/* Sidebar + main content */}
      <div className="flex flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
