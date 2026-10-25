"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { sections, site } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";

const noop = () => () => {};

export function openCommandMenu() {
  window.dispatchEvent(new Event("cmdk:open"));
}

export function Nav({ home = false }: { home?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  // On the home page the hero already shows the name, so the nav only spells it out
  // once the hero heading has scrolled away. Elsewhere it is always shown.
  const [nameShown, setNameShown] = useState(!home);
  const mod = useSyncExternalStore(
    noop,
    () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl"),
    () => "Ctrl",
  );

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      if (!home) return;
      const heroName = document.getElementById("hero-title");
      setNameShown(heroName ? heroName.getBoundingClientRect().bottom < 64 : true);
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
      setActive(atBottom ? sections[sections.length - 1].id : current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [home]);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-bg transition-colors ${
        scrolled ? "border-rule" : "border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-[1120px] items-center justify-between gap-4 px-4 md:px-8"
      >
        <Link href="/" aria-label={`${site.name}, home`} className="group flex items-center gap-2.5">
          <Mark className="size-8 transition-transform duration-300 ease-out-soft group-hover:-rotate-6" />
          <span
            aria-hidden
            className={`display text-[0.95rem] font-semibold tracking-tight transition-[opacity,transform] duration-300 ease-out-soft ${
              nameShown ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
            }`}
          >
            {site.name}
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <ul className="mr-2 hidden items-center gap-1 md:flex">
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={home ? `#${s.id}` : `/#${s.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`meta relative rounded-md px-2.5 py-1.5 transition-colors hover:text-ink ${
                      isActive ? "text-ink" : "text-muted"
                    }`}
                  >
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute top-1/2 left-0.5 size-1 -translate-y-1/2 rounded-full bg-accent"
                      />
                    )}
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={openCommandMenu}
            aria-label="Open command menu"
            aria-keyshortcuts="Control+K Meta+K"
            className="meta flex h-9 items-center gap-2 rounded-md border border-rule px-2.5 text-muted transition-colors hover:border-ink hover:text-ink"
          >
            <span className="md:hidden">Menu</span>
            <kbd className="hidden font-[inherit] md:inline" suppressHydrationWarning>
              {mod} K
            </kbd>
          </button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

/** The "D." monogram, matching the favicon; colours follow the theme tokens. */
function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <rect width="64" height="64" rx="16" fill="var(--ink)" />
      <path
        d="M16 15h13.5C40.3 15 48 22 48 32s-7.7 17-18.5 17H16V15zm8 7v20h5.2c6.2 0 10.5-4 10.5-10s-4.3-10-10.5-10H24z"
        fill="var(--bg)"
      />
      <circle cx="51" cy="48" r="5" fill="var(--accent)" />
    </svg>
  );
}
