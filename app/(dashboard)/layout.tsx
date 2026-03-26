import { Music } from "lucide-react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <Music className="h-5 w-5 text-accent" />
          <h1 className="text-base font-semibold text-foreground">Suno Generator</h1>
        </div>
      </header>

      {/* Sidebar + main content */}
      <div className="flex flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
