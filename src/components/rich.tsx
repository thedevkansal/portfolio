import { Fragment } from "react";

/** Renders `backticked` spans in content strings as inline code. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/`([^`]+)`/);
  return parts.map((part, i) =>
    i % 2 ? (
      <code key={i} className="meta rounded-[3px] bg-surface px-1 py-px text-[0.82em] text-ink">
        {part}
      </code>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
