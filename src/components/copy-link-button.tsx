"use client";

import { useState } from "react";
import { LinkIcon, CheckIcon } from "./icons";

/**
 * Copies the current page URL to the clipboard, with a small label swap for
 * feedback. Isolated in its own client component so the article page itself
 * can stay a server component.
 */
export function CopyLinkButton({
  label,
  copiedLabel,
}: {
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard access can be denied or unavailable; fail quietly.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="ml-auto inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-semibold text-muted transition-colors hover:border-accent/50 hover:text-ink"
    >
      {copied ? (
        <CheckIcon width={13} height={13} className="text-accent" />
      ) : (
        <LinkIcon width={13} height={13} />
      )}
      {copied ? copiedLabel : label}
    </button>
  );
}

