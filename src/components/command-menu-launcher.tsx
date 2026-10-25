"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CommandMenu = dynamic(() => import("./command-menu"), { ssr: false });

/**
 * Keeps the command menu out of the initial bundle. Listens for Ctrl/Cmd+K or the nav
 * button until first use, then mounts the menu, which takes over its own shortcuts.
 */
export function CommandMenuLauncher() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    const load = () => setLoaded(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        load();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("cmdk:open", load);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cmdk:open", load);
    };
  }, [loaded]);

  return loaded ? <CommandMenu openOnMount /> : null;
}
