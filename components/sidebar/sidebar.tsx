"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
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

  const fetchGenerations = useCallback(() => {
    startTransition(async () => {
      const data = await getGenerations(filters);
      setGenerations(data);
    });
  }, [filters]);

  // Chargement initial et à chaque changement de filtre ou refresh
  useEffect(() => {
    fetchGenerations();
  }, [fetchGenerations, refreshKey]);

  return (
    <aside className="w-72 border-r border-border bg-muted flex flex-col h-full shrink-0">
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
          generations.map((gen) => (
            <GenerationCard
              key={gen.id}
              generation={gen}
              isActive={activeGenerationId === gen.id}
              onSelect={onSelectGeneration}
            />
          ))
        )}
      </div>
    </aside>
  );
}
