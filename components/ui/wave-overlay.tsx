/**
 * WaveOverlay — animated brand-gradient waves that run along the bottom edge of a
 * card. Hidden by default, revealed on the parent's `group` hover. Pure SVG + CSS
 * keyframes (no JS, no "use client"), modelled on components/sections/circuit-backdrop.tsx.
 *
 * Each layer is an <svg> twice as wide as its frame (two wave periods); the CSS
 * `wave-flow` keyframe (globals.css) slides it left by 50%, so the second period
 * seamlessly takes the first's place — an endless horizontal drift. Stacking two
 * layers at different speeds/opacities gives depth.
 *
 * The global `prefers-reduced-motion` rule in globals.css neutralises the animation
 * automatically (the waves show, frozen), so no extra guard is needed here.
 */

// One wave period spans 1200 user units; the path covers 0..2400 (two periods),
// starting and ending at the same phase so translateX(-50%) tiles seamlessly.
const WAVE_A =
  "M0,120 C100,95 200,95 300,120 C400,145 500,145 600,120 C700,95 800,95 900,120 " +
  "C1000,145 1100,145 1200,120 C1300,95 1400,95 1500,120 C1600,145 1700,145 1800,120 " +
  "C1900,95 2000,95 2100,120 C2200,145 2300,145 2400,120 L2400,200 L0,200 Z";

const WAVE_B =
  "M0,140 C150,120 300,170 600,140 C900,110 1050,165 1200,140 C1350,120 1500,170 1800,140 " +
  "C2100,110 2250,165 2400,140 L2400,200 L0,200 Z";

export function WaveOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    >
      {/* soft glow rising from the bottom edge */}
      <div
        className="absolute inset-x-0 bottom-0 h-full"
        style={{
          background:
            "linear-gradient(to top, color-mix(in oklab, var(--color-violet) 32%, transparent), transparent 78%)",
        }}
      />

      {/* back layer — slower, fainter */}
      <svg
        className="absolute bottom-0 left-0 h-full w-[200%]"
        viewBox="0 0 2400 200"
        preserveAspectRatio="none"
        style={{ animation: "wave-flow 9s linear infinite" }}
      >
        <defs>
          <linearGradient id="nexaiWaveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4d7cff" />
            <stop offset="52%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <path d={WAVE_B} fill="url(#nexaiWaveGrad)" fillOpacity={0.35} />
      </svg>

      {/* front layer — faster, brighter */}
      <svg
        className="absolute bottom-0 left-0 h-full w-[200%]"
        viewBox="0 0 2400 200"
        preserveAspectRatio="none"
        style={{ animation: "wave-flow 6s linear infinite" }}
      >
        <path d={WAVE_A} fill="url(#nexaiWaveGrad)" fillOpacity={0.6} />
      </svg>
    </div>
  );
}
