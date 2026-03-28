import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GenerationCard } from "@/components/sidebar/generation-card";
import { SidebarFilters } from "@/components/sidebar/sidebar-filters";
import type { GenerationSummary, GenerationFilters } from "@/lib/actions/generation";

// Mock server actions
vi.mock("@/lib/actions/favorite", () => ({
  toggleFavorite: vi.fn().mockResolvedValue({ success: true, isFavorite: true }),
}));

vi.mock("@/lib/actions/generation", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/lib/actions/generation")>();
  return {
    ...original,
    deleteGeneration: vi.fn().mockResolvedValue({ success: true }),
    getGenerations: vi.fn().mockResolvedValue([]),
  };
});

const mockGeneration: GenerationSummary = {
  id: "test-id-123",
  title: "Test Song",
  userPrompt: "A beautiful song",
  genre: "Rock",
  mood: "Energetic",
  isFavorite: false,
  audioUrl: null,
  createdAt: new Date("2026-03-25"),
};

describe("GenerationCard", () => {
  it("renders generation title, genre, and mood", () => {
    render(
      <GenerationCard
        generation={mockGeneration}
        isActive={false}
        onSelect={() => {}}
        onRefresh={() => {}}
      />
    );
    expect(screen.getByText("Test Song")).toBeInTheDocument();
    expect(screen.getByText("Rock")).toBeInTheDocument();
    expect(screen.getByText("Energetic")).toBeInTheDocument();
  });

  it("displays userPrompt truncated when no title", () => {
    const noTitle = { ...mockGeneration, title: null };
    render(
      <GenerationCard
        generation={noTitle}
        isActive={false}
        onSelect={() => {}}
        onRefresh={() => {}}
      />
    );
    expect(screen.getByText("A beautiful song")).toBeInTheDocument();
  });

  it("applies active style when isActive", () => {
    const { container } = render(
      <GenerationCard
        generation={mockGeneration}
        isActive={true}
        onSelect={() => {}}
        onRefresh={() => {}}
      />
    );
    const card = container.firstElementChild;
    expect(card?.className).toContain("border-accent/50");
  });

  it("calls onSelect when clicked", () => {
    const onSelect = vi.fn();
    render(
      <GenerationCard
        generation={mockGeneration}
        isActive={false}
        onSelect={onSelect}
        onRefresh={() => {}}
      />
    );
    fireEvent.click(screen.getByText("Test Song"));
    expect(onSelect).toHaveBeenCalledWith("test-id-123");
  });

  it("shows filled heart for favorite", () => {
    const fav = { ...mockGeneration, isFavorite: true };
    render(
      <GenerationCard
        generation={fav}
        isActive={false}
        onSelect={() => {}}
        onRefresh={() => {}}
      />
    );
    const favButton = screen.getByTitle("Retirer des favoris");
    expect(favButton).toBeInTheDocument();
  });

  it("shows audio icon when audioUrl is present", () => {
    render(
      <GenerationCard
        generation={{ ...mockGeneration, audioUrl: "https://suno.com/s/abc" }}
        isActive={false}
        onSelect={() => {}}
        onRefresh={() => {}}
      />
    );
    const svg = document.querySelector(".lucide-music");
    expect(svg).toBeInTheDocument();
  });
});

describe("SidebarFilters", () => {
  it("renders search input", () => {
    render(
      <SidebarFilters filters={{}} onChange={() => {}} />
    );
    expect(screen.getByPlaceholderText("Rechercher…")).toBeInTheDocument();
  });

  it("renders favoris toggle button", () => {
    render(
      <SidebarFilters filters={{}} onChange={() => {}} />
    );
    expect(screen.getByText("Favoris")).toBeInTheDocument();
  });

  it("renders genre select with 'Tous les genres'", () => {
    render(
      <SidebarFilters filters={{}} onChange={() => {}} />
    );
    expect(screen.getByText("Tous les genres")).toBeInTheDocument();
  });

  it("calls onChange when search changes", () => {
    const onChange = vi.fn();
    render(
      <SidebarFilters filters={{}} onChange={onChange} />
    );
    fireEvent.change(screen.getByPlaceholderText("Rechercher…"), {
      target: { value: "rock" },
    });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ search: "rock" }));
  });

  it("calls onChange when favorites toggle is clicked", () => {
    const onChange = vi.fn();
    render(
      <SidebarFilters filters={{}} onChange={onChange} />
    );
    fireEvent.click(screen.getByText("Favoris"));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ favoritesOnly: true }));
  });

  it("shows active state for favorites when enabled", () => {
    const filters: GenerationFilters = { favoritesOnly: true };
    render(
      <SidebarFilters filters={filters} onChange={() => {}} />
    );
    const favButton = screen.getByText("Favoris").closest("button");
    expect(favButton?.className).toContain("bg-accent/20");
  });

  it("calls onChange with genre filter", () => {
    const onChange = vi.fn();
    render(
      <SidebarFilters filters={{}} onChange={onChange} />
    );
    const select = screen.getByDisplayValue("Tous les genres");
    fireEvent.change(select, { target: { value: "rock" } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ genre: "rock" }));
  });
});
