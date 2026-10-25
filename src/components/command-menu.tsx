"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { projectIndex, projects } from "@/content/projects";
import { sections, site, socials } from "@/content/site";
import { toggleTheme } from "@/lib/theme";

type Item = {
  id: string;
  group: "Jump to" | "Projects" | "Actions";
  label: string;
  hint?: string;
  run: () => void;
};

/** Case-insensitive subsequence match, so "cflow" finds "CampusFlow". */
function matches(text: string, query: string) {
  const t = text.toLowerCase();
  let i = 0;
  for (const ch of query.toLowerCase().replace(/\s+/g, "")) {
    i = t.indexOf(ch, i);
    if (i === -1) return false;
    i++;
  }
  return true;
}

export function CommandMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const listId = useId();

  const close = useCallback(() => dialogRef.current?.close(), []);

  const open = useCallback(() => {
    const d = dialogRef.current;
    if (!d || d.open) return;
    setQuery("");
    setCursor(0);
    d.showModal();
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("cmdk:open", open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cmdk:open", open);
    };
  }, [open, close]);

  const items = useMemo<Item[]>(() => {
    const go = (hash: string) => {
      if (pathname === "/") {
        document.getElementById(hash)?.scrollIntoView();
        history.replaceState(null, "", `#${hash}`);
      } else {
        router.push(`/#${hash}`);
      }
    };
    const external = (href: string) => window.open(href, "_blank", "noopener,noreferrer");

    return [
      ...sections.map<Item>((s) => ({
        id: `section-${s.id}`,
        group: "Jump to",
        label: s.label,
        run: () => go(s.id),
      })),
      ...projects.map<Item>((p) => ({
        id: `project-${p.slug}`,
        group: "Projects",
        label: p.title,
        hint: projectIndex(p.slug),
        run: () => router.push(`/projects/${p.slug}`),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: site.email,
        run: () => {
          navigator.clipboard?.writeText(site.email).then(
            () => setToast("Email copied"),
            () => (window.location.href = `mailto:${site.email}`),
          );
        },
      },
      { id: "theme", group: "Actions", label: "Toggle theme", run: () => toggleTheme() },
      { id: "resume", group: "Actions", label: "Open résumé", hint: "PDF", run: () => external(site.resume) },
      ...socials.map<Item>((s) => ({
        id: `social-${s.label}`,
        group: "Actions",
        label: `Open ${s.label}`,
        run: () => external(s.href),
      })),
    ];
  }, [pathname, router]);

  const filtered = useMemo(
    () => (query ? items.filter((i) => matches(`${i.label} ${i.group}`, query)) : items),
    [items, query],
  );

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  function select(item: Item | undefined) {
    if (!item) return;
    close();
    item.run();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const n = filtered.length;
    if (!n) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % n);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + n) % n);
    } else if (e.key === "Home") {
      e.preventDefault();
      setCursor(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setCursor(n - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(filtered[cursor]);
    }
  }

  useEffect(() => {
    document.getElementById(`${listId}-${cursor}`)?.scrollIntoView({ block: "nearest" });
  }, [cursor, listId]);

  return (
    <>
      <dialog
        ref={dialogRef}
        className="cmdk"
        aria-label="Command menu"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="flex max-h-[inherit] flex-col">
          <div className="flex items-center gap-3 border-b border-rule px-4">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCursor(0);
              }}
              onKeyDown={onKeyDown}
              placeholder="Jump to a section or project"
              aria-label="Search commands"
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-activedescendant={filtered.length ? `${listId}-${cursor}` : undefined}
              autoComplete="off"
              spellCheck={false}
              className="h-13 w-full bg-transparent font-serif text-base outline-none placeholder:text-muted focus-visible:outline-none"
            />
            <kbd className="meta shrink-0 rounded border border-rule px-1.5 text-muted">Esc</kbd>
          </div>

          <ul id={listId} role="listbox" aria-label="Commands" className="overflow-y-auto p-2">
            {filtered.length === 0 && (
              <li className="meta px-3 py-8 text-center text-muted">Nothing matches “{query}”.</li>
            )}
            {filtered.map((item, i) => {
              const showGroup = i === 0 || filtered[i - 1].group !== item.group;
              const selected = i === cursor;
              return (
                <li key={item.id} role="presentation">
                  {showGroup && (
                    <div role="presentation" className="meta px-3 pt-3 pb-1 text-muted">
                      {item.group}
                    </div>
                  )}
                  <div
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={selected}
                    onMouseMove={() => setCursor(i)}
                    onClick={() => select(item)}
                    className={`flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 ${
                      selected ? "bg-bg text-ink" : "text-ink/85"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {selected && <span aria-hidden className="size-1 rounded-full bg-accent" />}
                      {item.label}
                    </span>
                    {item.hint && <span className="meta truncate text-muted">{item.hint}</span>}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="meta flex gap-4 border-t border-rule px-4 py-2 text-muted">
            <span>↑↓ to move</span>
            <span>Enter to open</span>
          </div>
        </div>
      </dialog>

      <div
        role="status"
        aria-live="polite"
        className={`meta pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-md bg-ink px-3 py-2 text-bg transition-opacity ${
          toast ? "opacity-100" : "opacity-0"
        }`}
      >
        {toast}
      </div>
    </>
  );
}
