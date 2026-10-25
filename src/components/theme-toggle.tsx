"use client";

import { toggleTheme } from "@/lib/theme";
import { ThemeGlyph } from "./icons";

export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className="grid size-9 place-items-center rounded-md text-muted transition-colors hover:bg-surface hover:text-ink"
    >
      <ThemeGlyph className="transition-transform duration-300 [:root[data-theme=dark]_&]:rotate-180" />
    </button>
  );
}
