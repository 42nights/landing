"use client";

/**
 * HeroField — the hero's backdrop. Thin wrapper over the shared AsciiField
 * motif with hero-tuned defaults (lower-left red-lit core, full intensity).
 */

import AsciiField from "@/components/assets/AsciiField";

export default function HeroField({ className = "" }: { className?: string }) {
  return (
    <AsciiField
      className={className}
      alpha={0.11}
      tint
      focusX={0.22}
      focusY={0.66}
    />
  );
}
