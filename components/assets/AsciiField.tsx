"use client";

/**
 * AsciiField — reusable ASCII flow-field renderer (the site's signature motif).
 *
 * A grid of monospace glyphs whose density follows a slow flowing field plus a
 * drifting bloom. Mostly void; faint cream glyphs ripple, optional red-lit core.
 * No SVG, no images — one <canvas>, hand-drawn each frame. Minimal by design.
 *
 *   <AsciiField className="absolute inset-0 h-full w-full" />          // hero
 *   <AsciiField alpha={0.08} tint={false} focusX={0.8} focusY={0.4} /> // subtle section texture
 *
 * Honors prefers-reduced-motion (one static frame). Decorative,
 * pointer-events-none, absolute fill — never shifts layout.
 */

import { useEffect, useRef } from "react";

const RAMP = "   ...,,:;+*?%#@";

type Props = {
  className?: string;
  /** base cream glyph opacity (0–1). */
  alpha?: number;
  /** include the drifting red-lit core. */
  tint?: boolean;
  /** bloom center, normalized 0–1. */
  focusX?: number;
  focusY?: number;
  /** glyph cell size in px (larger = chunkier ASCII). */
  cell?: number;
};

export default function AsciiField({
  className = "",
  alpha = 0.16,
  tint = true,
  focusX = 0.22,
  focusY = 0.66,
  cell = 13,
}: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const CELL = cell;
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let last = 0;

    function size() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
      ctx!.font = `${CELL - 1}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx!.textBaseline = "top";
    }

    function fieldAt(nx: number, ny: number, t: number) {
      const a = Math.sin(nx * 6.0 + t * 0.6) * Math.cos(ny * 5.0 - t * 0.4);
      const b = Math.sin((nx + ny) * 4.0 - t * 0.5);
      const c = Math.sin(nx * 11.0 - t * 0.3) * 0.4;
      return (a + b + c) / 2.4;
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);
      const bx = focusX + Math.sin(t * 0.18) * 0.05;
      const by = focusY + Math.cos(t * 0.13) * 0.05;

      const cream: string[] = [];
      const creamPos: number[] = [];
      const reds: string[] = [];
      const redPos: number[] = [];

      for (let j = 0; j < rows; j++) {
        const ny = j / rows;
        for (let i = 0; i < cols; i++) {
          const nx = i / cols;
          const dist = Math.hypot(nx - bx, (ny - by) * 1.1);
          const bloom = Math.max(0, 1 - dist * 1.9);
          let v = fieldAt(nx, ny, t) * 0.5 + 0.5;
          v = v * 0.62 + bloom * 0.55;
          if (v <= 0.42) continue;
          const idx = Math.min(RAMP.length - 1, Math.floor(v * RAMP.length));
          const ch = RAMP[idx];
          if (ch === " ") continue;
          const x = i * CELL;
          const y = j * CELL;
          if (tint && bloom > 0.45 && v > 0.7) {
            reds.push(ch);
            redPos.push(x, y);
          } else {
            cream.push(ch);
            creamPos.push(x, y);
          }
        }
      }

      ctx!.fillStyle = `rgba(247,245,241,${alpha})`;
      for (let k = 0; k < cream.length; k++) {
        ctx!.fillText(cream[k], creamPos[k * 2], creamPos[k * 2 + 1]);
      }
      if (tint) {
        ctx!.fillStyle = "rgba(255,72,92,0.5)";
        for (let k = 0; k < reds.length; k++) {
          ctx!.fillText(reds[k], redPos[k * 2], redPos[k * 2 + 1]);
        }
      }
    }

    function loop(now: number) {
      if (now - last > 55) {
        last = now;
        draw(now / 1000);
      }
      raf = requestAnimationFrame(loop);
    }

    size();
    if (reduce) {
      draw(0);
      return;
    }

    let rt = 0;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(size, 200);
    };
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(rt);
      window.removeEventListener("resize", onResize);
    };
  }, [alpha, tint, focusX, focusY, cell]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    />
  );
}
