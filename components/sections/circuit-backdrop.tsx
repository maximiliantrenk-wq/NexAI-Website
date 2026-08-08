import { cn } from "@/lib/utils";

/**
 * Site-wide AI-chip circuit backdrop. Blue traces run from the four edges into
 * a central chip die; small light pulses flow along them and the nodes breathe.
 * Pure SVG + CSS keyframes (no WebGL, no rAF) so it renders reliably everywhere
 * and can be verified from the DOM. Respects prefers-reduced-motion.
 *
 * Layered above the aurora in the fixed background wrapper; a radial mask fades
 * the pattern out toward the edges so it never hard-cuts at the viewBox border.
 */

// Traces emanate from the chip edges (chip = 546..654 × 346..454, centre 600/400).
const TRACES = [
  // right
  "M654 372 H820 V232 H1080 V150",
  "M654 400 H900 V400 H1200",
  "M654 428 H760 V600 H1040 V740",
  // left (mirrored)
  "M546 372 H380 V232 H120 V150",
  "M546 400 H300 V400 H0",
  "M546 428 H440 V600 H160 V740",
  // top
  "M572 346 V220 H360 V90",
  "M600 346 V80",
  "M628 346 V220 H860 V90",
  // bottom (mirrored)
  "M572 454 V580 H360 V720",
  "M600 454 V720",
  "M628 454 V580 H860 V720",
];

// Junction / endpoint nodes that gently pulse.
const NODES: [number, number][] = [
  [820, 232],
  [1080, 232],
  [900, 400],
  [1040, 600],
  [380, 232],
  [120, 232],
  [300, 400],
  [160, 600],
  [360, 220],
  [860, 220],
  [360, 580],
  [860, 580],
];

export function CircuitBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{
        maskImage:
          "radial-gradient(ellipse 72% 68% at 50% 46%, #000 32%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 72% 68% at 50% 46%, #000 32%, transparent 80%)",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes nexaiTraceFlow { from { stroke-dashoffset: 260; } to { stroke-dashoffset: 0; } }
        @keyframes nexaiNodePulse { 0%,100% { opacity: .18; } 50% { opacity: .85; } }
        @keyframes nexaiDieGlow { 0%,100% { opacity: .35; } 50% { opacity: .75; } }
        .nexai-flow { stroke-dasharray: 5 255; animation: nexaiTraceFlow linear infinite; }
        .nexai-node { animation: nexaiNodePulse ease-in-out infinite; }
        .nexai-die { animation: nexaiDieGlow ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .nexai-flow { display: none; }
          .nexai-node, .nexai-die { animation: none; }
          .nexai-node { opacity: .45; }
        }`,
        }}
      />
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        fill="none"
      >
        <g stroke="var(--color-blue-bright)">
          {/* static base traces */}
          {TRACES.map((d, i) => (
            <path
              key={`t${i}`}
              d={d}
              strokeWidth={1}
              strokeOpacity={0.22}
            />
          ))}
          {/* flowing light pulses */}
          {TRACES.map((d, i) => (
            <path
              key={`f${i}`}
              d={d}
              strokeWidth={1.6}
              strokeOpacity={0.9}
              strokeLinecap="round"
              className="nexai-flow"
              style={{
                animationDuration: `${5 + (i % 4)}s`,
                animationDelay: `${((i * 7) % 50) / 10}s`,
              }}
            />
          ))}
        </g>

        {/* pulsing nodes */}
        {NODES.map(([cx, cy], i) => (
          <circle
            key={`n${i}`}
            cx={cx}
            cy={cy}
            r={3}
            fill="var(--color-blue-bright)"
            className="nexai-node"
            style={{
              animationDuration: `${3 + (i % 3)}s`,
              animationDelay: `${((i * 4) % 30) / 10}s`,
            }}
          />
        ))}

        {/* central chip */}
        <rect
          x={546}
          y={346}
          width={108}
          height={108}
          rx={16}
          stroke="var(--color-blue-bright)"
          strokeWidth={1.4}
          strokeOpacity={0.5}
          fill="var(--color-blue)"
          fillOpacity={0.05}
        />
        <rect
          x={576}
          y={376}
          width={48}
          height={48}
          rx={6}
          stroke="var(--color-blue-bright)"
          strokeWidth={1.2}
          strokeOpacity={0.7}
          fill="var(--color-blue-bright)"
          fillOpacity={0.08}
          className="nexai-die"
          style={{ animationDuration: "4s" }}
        />
      </svg>
    </div>
  );
}
