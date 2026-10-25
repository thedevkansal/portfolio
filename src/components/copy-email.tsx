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
      className={`meta inline-flex items-center gap-2 rounded-md border border-rule px-3 py-2 text-ink transition-colors hover:border-ink ${className}`}
    >
      <span>{email}</span>
      <span className="text-muted" aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
