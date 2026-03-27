import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GenreSelector } from "@/components/composition/genre-selector";
import { MoodSelector } from "@/components/composition/mood-selector";
import { StyleSelector } from "@/components/composition/style-selector";
import { ParamsPanel } from "@/components/composition/params-panel";
import { PromptInput } from "@/components/composition/prompt-input";
import { GenerationOutput } from "@/components/composition/generation-output";
import { GENRES } from "@/lib/data/genres";
import { MOODS } from "@/lib/data/moods";
import { WRITING_STYLES } from "@/lib/data/styles";

describe("GenreSelector", () => {
  it("renders all genres", () => {
    render(<GenreSelector value={[]} onChange={() => {}} />);
    for (const genre of GENRES) {
      expect(screen.getByText(genre.name)).toBeInTheDocument();
    }
  });

  it("highlights selected genre", () => {
    render(<GenreSelector value={["rock"]} onChange={() => {}} />);
    const rockButton = screen.getByText("Rock").closest("button");
    expect(rockButton?.className).toContain("border-accent");
  });

  it("calls onChange on click", () => {
    const onChange = vi.fn();
    render(<GenreSelector value={[]} onChange={onChange} />);
    fireEvent.click(screen.getByText("Pop"));
    expect(onChange).toHaveBeenCalledWith(["pop"]);
  });
});

describe("MoodSelector", () => {
  it("renders all moods", () => {
    render(<MoodSelector value={null} onChange={() => {}} />);
    for (const mood of MOODS) {
      expect(screen.getByText(mood.name)).toBeInTheDocument();
    }
  });

  it("highlights selected mood", () => {
    render(<MoodSelector value="joyful" onChange={() => {}} />);
    const joyfulButton = screen.getByText("Joyful");
    expect(joyfulButton.className).toContain("text-accent");
  });

  it("calls onChange on click", () => {
    const onChange = vi.fn();
    render(<MoodSelector value={null} onChange={onChange} />);
    fireEvent.click(screen.getByText("Joyful"));
    expect(onChange).toHaveBeenCalledWith("joyful");
  });
});

describe("StyleSelector", () => {
  it("renders all writing styles", () => {
    render(<StyleSelector value={null} onChange={() => {}} />);
    for (const style of WRITING_STYLES) {
      expect(screen.getByText(style.name)).toBeInTheDocument();
    }
  });

  it("highlights selected style", () => {
    render(<StyleSelector value="poetic" onChange={() => {}} />);
    const poeticLabel = screen.getByText("Poetic").closest("label");
    expect(poeticLabel?.className).toContain("border-accent");
  });
});

describe("ParamsPanel", () => {
  it("renders tempo buttons, language and vocal styles", () => {
    render(
      <ParamsPanel
        tempo={null}
        languages={["en"]}
        vocalStyle={null}
        songLength="standard"
        onTempoChange={() => {}}
        onLanguagesChange={() => {}}
        onVocalStyleChange={() => {}}
        onSongLengthChange={() => {}}
      />,
    );
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
  });

  it("highlights active tempo", () => {
    render(
      <ParamsPanel
        tempo="Fast"
        languages={["en"]}
        vocalStyle={null}
        songLength="standard"
        onTempoChange={() => {}}
        onLanguagesChange={() => {}}
        onVocalStyleChange={() => {}}
        onSongLengthChange={() => {}}
      />,
    );
    const fastButton = screen.getByText("Fast").closest("button")!;
    expect(fastButton.className).toContain("bg-accent");
  });
});

describe("PromptInput", () => {
  it("renders textarea and character counter", () => {
    render(<PromptInput value="Hello" onChange={() => {}} />);
    const textarea = screen.getByPlaceholderText(/ballade mélancolique/i);
    expect(textarea).toBeInTheDocument();
    expect(screen.getByText("5 / 2000")).toBeInTheDocument();
  });

  it("renders example suggestions", () => {
    render(<PromptInput value="" onChange={() => {}} />);
    expect(screen.getByText(/Ballade romantique/)).toBeInTheDocument();
  });
});

describe("GenerationOutput", () => {
  it("renders empty state", () => {
    render(<GenerationOutput />);
    expect(screen.getByText("Aucune génération pour le moment")).toBeInTheDocument();
  });
});
