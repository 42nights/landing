"use client";

/**
 * AsciiBackground — the site's single ASCII flow-field, rendered once.
 *
 * Replaces the old per-section <AsciiField> canvases (hero, moat, CTA), each of
 * which ran its own requestAnimationFrame loop. This is ONE fixed, viewport-wide
 * <canvas> behind all content with ONE loop — the consolidation that fixes the
 * perf cost of three simultaneous renderers.
 *
 * Interaction: pointer movement drops expanding ring "ripples" plus a soft halo
 * that follows the cursor, locally boosting glyph density/brightness so the
 * field reacts like water under the mouse.
 *
 * Perf: per-frame scratch buffers are preallocated and reused (no per-cell GC
 * churn); total cell count is capped (CELL grows on large/4K viewports) so cost
 * is roughly display-size independent; the hot path uses squared-distance culls
 * before any sqrt. Loop runs ~30fps while interacting, ~15fps at rest, pauses
 * entirely while the tab is hidden, and renders a single static frame under
 * prefers-reduced-motion. Decorative, pointer-events-none.
 *
 * NOTE: the field is full-bleed because the canvas is position:fixed. Do not add
 * transform / filter / will-change / contain to <main>, <body>, or <html> — any
 * of those would re-root this fixed canvas to that ancestor and clip it.
 */

import { useEffect, useRef } from "react";

const RAMP = "   ...,,:;+*?%#@";

// Field look (merged from the three old instances): faint cream glyphs, a
// drifting red-lit core in the lower-left, chunky cells.
const ALPHA = 0.42;
const TINT = true;
const RED_FILL = "rgba(255,68,68,0.6)"; // bright RED core (no pink); field is a deeper red
const FOCUS_X = 0.26;
const FOCUS_Y = 0.6;
const BASE_CELL = 13;
// Cap glyph count so field math stays bounded on 4K / ultrawide displays.
const MAX_CELLS = 16000;

// Ripple tuning (CSS px / seconds).
const RING_SPEED = 520; // expansion rate
const RING_LIFE = 1.4; // time to fade out
const RING_WIDTH = 46; // ring thickness (gaussian sigma)
const RING_STRENGTH = 0.22;
const HALO_RADIUS = 140; // soft cursor glow radius
const HALO_STRENGTH = 0.18;
const MAX_RIPPLES = 10;
const SPAWN_GAP = 55; // min ms between spawned rings
const SPAWN_DIST = 26; // min px moved to spawn a new ring
const IDLE_MS = 700; // pointer treated as "left" after this long without moving

type Ripple = { x: number; y: number; t0: number };

function chooseCell(w: number, h: number) {
  if (Math.ceil(w / BASE_CELL) * Math.ceil(h / BASE_CELL) <= MAX_CELLS) {
    return BASE_CELL;
  }
  return Math.ceil(Math.sqrt((w * h) / MAX_CELLS));
}

export function AsciiBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    let cell = BASE_CELL;
    let cols = 0;
    let rows = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let last = 0;

    // Reused per-frame scratch buffers (allocated in size()). Counts reset each
    // draw — no per-cell allocation in the hot loop.
    let creamX = new Float32Array(0);
    let creamY = new Float32Array(0);
    let creamI = new Uint8Array(0);
    let redX = new Float32Array(0);
    let redY = new Float32Array(0);
    let redI = new Uint8Array(0);

    // Per-frame ripple scratch (squared band bounds + fade), sized to the cap.
    const ripX = new Float32Array(MAX_RIPPLES);
    const ripY = new Float32Array(MAX_RIPPLES);
    const ripRadius = new Float32Array(MAX_RIPPLES);
    const ripLo2 = new Float32Array(MAX_RIPPLES);
    const ripHi2 = new Float32Array(MAX_RIPPLES);
    const ripFade = new Float32Array(MAX_RIPPLES);

    // Pointer state (CSS px). hx/hy are smoothed toward px/py for the halo.
    let px = -9999;
    let py = -9999;
    let hx = -9999;
    let hy = -9999;
    let haloOn = 0; // 0..1, ramps in on first move, fades on leave/idle
    let pointerInside = false;
    let lastMoveAt = -9999;
    let lastSpawn = 0;
    let lastSpawnX = -9999;
    let lastSpawnY = -9999;
    const ripples: Ripple[] = [];

    const HALO_R2 = HALO_RADIUS * HALO_RADIUS;
    const BAND = 3 * RING_WIDTH;
    const TWO_SIGMA2 = 2 * RING_WIDTH * RING_WIDTH;

    function size() {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cell = chooseCell(w, h);
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      ctx!.font = `${cell - 1}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx!.textBaseline = "top";

      const cap = cols * rows;
      if (creamX.length < cap) {
        creamX = new Float32Array(cap);
        creamY = new Float32Array(cap);
        creamI = new Uint8Array(cap);
        redX = new Float32Array(cap);
        redY = new Float32Array(cap);
        redI = new Uint8Array(cap);
      }
    }

    function fieldAt(nx: number, ny: number, t: number) {
      const a = Math.sin(nx * 6.0 + t * 0.6) * Math.cos(ny * 5.0 - t * 0.4);
      const b = Math.sin((nx + ny) * 4.0 - t * 0.5);
      const c = Math.sin(nx * 11.0 - t * 0.3) * 0.4;
      return (a + b + c) / 2.4;
    }

    function draw(t: number, now: number) {
      ctx!.clearRect(0, 0, w, h);
      const bx = FOCUS_X + Math.sin(t * 0.18) * 0.05;
      const by = FOCUS_Y + Math.cos(t * 0.13) * 0.05;

      // Smooth halo toward the live pointer; fade its strength in/out.
      hx += (px - hx) * 0.18;
      hy += (py - hy) * 0.18;
      const haloTarget = pointerInside ? 1 : 0;
      haloOn += (haloTarget - haloOn) * 0.08;
      const haloActive = haloOn > 0.01 ? haloOn : 0;

      // Purge expired ripples, then precompute their per-frame band bounds once
      // (not per cell): a ripple only touches the annulus radius ± 3σ.
      for (let r = ripples.length - 1; r >= 0; r--) {
        if (now - ripples[r].t0 > RING_LIFE * 1000) ripples.splice(r, 1);
      }
      const nrip = ripples.length;
      for (let r = 0; r < nrip; r++) {
        const rip = ripples[r];
        const age = (now - rip.t0) / 1000;
        const radius = age * RING_SPEED;
        ripX[r] = rip.x;
        ripY[r] = rip.y;
        ripRadius[r] = radius;
        const lo = Math.max(0, radius - BAND);
        ripLo2[r] = lo * lo;
        const hi = radius + BAND;
        ripHi2[r] = hi * hi;
        ripFade[r] = (1 - age / RING_LIFE) * RING_STRENGTH;
      }

      let nc = 0;
      let nr = 0;

      for (let j = 0; j < rows; j++) {
        const ny = j / rows;
        const y = j * cell;
        const dby = (ny - by) * 1.1;
        for (let i = 0; i < cols; i++) {
          const nx = i / cols;
          const x = i * cell;
          const dbx = nx - bx;
          const bloom = Math.max(0, 1 - Math.sqrt(dbx * dbx + dby * dby) * 1.9);
          let v = fieldAt(nx, ny, t) * 0.5 + 0.5;
          v = v * 0.66; // even field, no focal bloom (kills the left-middle blob)

          // Cursor halo: soft local boost (squared-distance cull before sqrt).
          if (haloActive) {
            const dx = x - hx;
            const dy = y - hy;
            const d2 = dx * dx + dy * dy;
            if (d2 < HALO_R2) {
              const f = 1 - Math.sqrt(d2) / HALO_RADIUS;
              v += f * f * HALO_STRENGTH * haloActive;
            }
          }

          // Expanding ring ripples (squared band cull, sqrt only in-band).
          for (let r = 0; r < nrip; r++) {
            const dx = x - ripX[r];
            const dy = y - ripY[r];
            const d2 = dx * dx + dy * dy;
            if (d2 < ripLo2[r] || d2 > ripHi2[r]) continue;
            const d = Math.sqrt(d2) - ripRadius[r];
            v += Math.exp(-(d * d) / TWO_SIGMA2) * ripFade[r];
          }

          if (v <= 0.36) continue;
          const idx = Math.min(RAMP.length - 1, Math.floor(v * RAMP.length));
          const ch = RAMP.charCodeAt(idx);
          if (ch === 32) continue; // space
          if (TINT && bloom > 0.45 && v > 0.7) {
            redX[nr] = x;
            redY[nr] = y;
            redI[nr] = idx;
            nr++;
          } else {
            creamX[nc] = x;
            creamY[nc] = y;
            creamI[nc] = idx;
            nc++;
          }
        }
      }

      ctx!.fillStyle = `rgba(140,26,32,${ALPHA})`;
      for (let k = 0; k < nc; k++) {
        ctx!.fillText(RAMP[creamI[k]], creamX[k], creamY[k]);
      }
      if (TINT) {
        ctx!.fillStyle = RED_FILL;
        for (let k = 0; k < nr; k++) {
          ctx!.fillText(RAMP[redI[k]], redX[k], redY[k]);
        }
      }
    }

    function loop(now: number) {
      // Drop the pointer to "left" after a spell of no movement so the loop can
      // throttle back to the rest cadence (the window pointerleave alone misses
      // the common "cursor parked inside the viewport" case).
      if (pointerInside && now - lastMoveAt > IDLE_MS) pointerInside = false;

      // ~30fps while interacting (smooth ripples), ~15fps at rest.
      const active = ripples.length > 0 || haloOn > 0.01;
      const interval = active ? 33 : 66;
      if (now - last > interval) {
        last = now;
        draw(now / 1000, now);
      }
      raf = requestAnimationFrame(loop);
    }

    // --- pointer ---
    function onMove(e: PointerEvent) {
      px = e.clientX;
      py = e.clientY;
      lastMoveAt = performance.now();
      if (!pointerInside) {
        // first contact: seat the halo so it doesn't fly in from 0,0
        hx = px;
        hy = py;
        pointerInside = true;
      }
      const now = lastMoveAt;
      const sdx = px - lastSpawnX;
      const sdy = py - lastSpawnY;
      const movedEnough = sdx * sdx + sdy * sdy > SPAWN_DIST * SPAWN_DIST;
      if (now - lastSpawn > SPAWN_GAP && movedEnough) {
        lastSpawn = now;
        lastSpawnX = px;
        lastSpawnY = py;
        ripples.push({ x: px, y: py, t0: now });
        if (ripples.length > MAX_RIPPLES) ripples.shift();
      }
    }
    function onLeave() {
      pointerInside = false;
    }

    // --- lifecycle ---
    let rt = 0;
    function onResize() {
      window.clearTimeout(rt);
      rt = window.setTimeout(size, 200);
    }
    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf && !reduce) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    }

    size();

    if (reduce) {
      // Static single frame; no loop, no interaction.
      draw(0, 0);
      window.addEventListener("resize", onResize);
      window.visualViewport?.addEventListener("resize", onResize);
      return () => {
        window.clearTimeout(rt);
        window.removeEventListener("resize", onResize);
        window.visualViewport?.removeEventListener("resize", onResize);
      };
    }

    window.addEventListener("resize", onResize);
    // iOS Safari collapses/expands chrome without a reliable window resize;
    // visualViewport resize re-sizes the buffer so no unpainted strip appears.
    window.visualViewport?.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(rt);
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full select-none"
    />
  );
}
