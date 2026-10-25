"use client";

import { useState } from "react";

export function CopyEmail({ email, className = "" }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`meta inline-flex items-center gap-2 rounded-md border px-3 py-2 transition-colors ${className || "border-rule text-ink hover:border-ink"}`}
    >
      <span>{email}</span>
      <span className="opacity-70" aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
