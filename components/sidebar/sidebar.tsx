"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { PanelLeftClose, PanelLeft, ChevronDown } from "lucide-react";
import { SidebarFilters } from "@/components/sidebar/sidebar-filters";
import { GenerationCard } from "@/components/sidebar/generation-card";
import {
  getGenerations,
  type GenerationFilters,
  type GenerationSummary,
} from "@/lib/actions/generation";

interface SidebarProps {
  activeGenerationId: string | null;
  onSelectGeneration: (id: string) => void;
  /** Incrémenté à chaque nouvelle génération pour déclencher un refresh */
  refreshKey: number;
}

export function Sidebar({ activeGenerationId, onSelectGeneration, refreshKey }: SidebarProps) {
  const [filters, setFilters] = useState<GenerationFilters>({});
  const [generations, setGenerations] = useState<GenerationSummary[]>([]);
  const [isPending, startTransition] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const fetchGenerations = useCallback((loadPage = 0) => {
    startTransition(async () => {
      const data = await getGenerations({ ...filters, page: loadPage });
      if (loadPage === 0) {
        setGenerations(data.items);
      } else {
        setGenerations((prev) => [...prev, ...data.items]);
      }
      setHasMore(data.hasMore);
      setPage(loadPage);
    });
  }, [filters]);

  // Reset to page 0 when filters or refreshKey change
  useEffect(() => {
    fetchGenerations(0);
  }, [fetchGenerations, refreshKey]);

  function handleLoadMore() {
    fetchGenerations(page + 1);
  }

  function handleSelect(id: string) {
    onSelectGeneration(id);
    setMobileOpen(false);
  }

  const sidebarContent = (
    <>
      {/* Filtres */}
      <SidebarFilters filters={filters} onChange={setFilters} />

      {/* Liste des générations */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {isPending && generations.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">
            Chargement…
          </p>
        ) : generations.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">
            Aucune génération
          </p>
        ) : (
          <>
            {generations.map((gen) => (
              <GenerationCard
                key={gen.id}
                generation={gen}
                isActive={activeGenerationId === gen.id}
                onSelect={handleSelect}
              />
            ))}
            {hasMore && (
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isPending}
                className="flex w-full items-center justify-center gap-1.5 rounded-md py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-background transition-colors cursor-pointer disabled:opacity-50"
              >
                <ChevronDown className="h-3.5 w-3.5" />
                Charger plus
              </button>
            )}
          </>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm text-accent-foreground shadow-lg md:hidden cursor-pointer"
        aria-label="Ouvrir l'historique"
      >
        <PanelLeft className="h-4 w-4" />
        Historique
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => { if (e.key === "Escape") setMobileOpen(false); }}
          role="button"
          tabIndex={-1}
          aria-label="Fermer l'historique"
        />
      )}

      {/* Sidebar - desktop: always visible, mobile: overlay slide-in */}
      <aside
        className={`
          border-r border-border bg-muted flex flex-col h-full shrink-0
          fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-200
          md:static md:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-end p-2 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-background transition-colors cursor-pointer"
            aria-label="Fermer l'historique"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        </div>
        {sidebarContent}
      </aside>
    </>
  );
}
