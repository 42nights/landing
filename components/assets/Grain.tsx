/**
 * Grain — absolutely-positioned, pointer-events-none SVG fractalNoise overlay.
 *
 * Pure component (no client runtime). Renders a tiled fractal-noise texture as a
 * data-URI background so it costs nothing at runtime and never blocks layout.
 * Use sparingly at very low opacity to add tactile depth over flat surfaces or
 * treated imagery; never as decoration loud enough to be noticed on its own.
 *
 *   <Grain opacity={0.05} blend="overlay" className="rounded-2xl" />
 */

type GrainProps = {
  /** Texture opacity. Keep low (0.03–0.06). Default 0.05. */
  opacity?: number;
  /** CSS mix-blend-mode for the overlay. Default "overlay". */
  blend?: "overlay" | "soft-light" | "multiply" | "screen" | "normal";
  className?: string;
};

// Static fractalNoise tile. baseFrequency tuned for a fine film-grain feel at
// 1:1 device pixels; 160px tile repeats imperceptibly. Encoded as a data URI so
// it ships inline with no extra network request and stays SSR-pure.
const NOISE_TILE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>` +
      `<filter id='n'>` +
      `<feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>` +
      `<feColorMatrix type='saturate' values='0'/>` +
      `</filter>` +
      `<rect width='160' height='160' filter='url(#n)'/>` +
      `</svg>`,
  );

export default function Grain({
  opacity = 0.05,
  blend = "overlay",
  className = "",
}: GrainProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        opacity,
        mixBlendMode: blend,
        backgroundImage: `url("${NOISE_TILE}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "160px 160px",
      }}
    />
  );
}
