export type Theme = "light" | "dark";

export function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  return set === "dark" ? "dark" : "light";
}

export function toggleTheme(): Theme {
  const next: Theme = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
  window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  return next;
}
