"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;
uniform float uTime;
uniform vec2 uRes;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = vUv;
  // Kurzseiten-Normierung: im Querformat identisch zu vec2(uRes.x / uRes.y, 1.0),
  // im Hochformat verhindert sie, dass nur ein schmaler Streifen des Rauschfelds
  // sichtbar ist. Die max() an den Nennern schuetzen vor einer 0x0-Canvas.
  float a = max(uRes.x, 1.0) / max(uRes.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(max(a, 1.0), max(1.0 / a, 1.0)) * 2.4;
  float t = uTime * 0.035;

  vec2 q = vec2(fbm(p + t), fbm(p + vec2(3.1, 1.7) - t));
  vec2 r = vec2(
    fbm(p + 2.0 * q + vec2(1.7, 9.2) + 0.7 * t),
    fbm(p + 2.0 * q + vec2(8.3, 2.8) - 0.6 * t)
  );
  float f = fbm(p + 2.5 * r);

  vec3 dark   = vec3(0.024, 0.027, 0.050);
  vec3 blue   = vec3(0.30, 0.49, 1.00);
  vec3 violet = vec3(0.545, 0.361, 0.965);
  vec3 purple = vec3(0.659, 0.333, 0.969);

  vec3 col = dark;
  col = mix(col, blue,   smoothstep(0.30, 0.85, f + 0.18 * r.x));
  col = mix(col, violet, smoothstep(0.45, 0.98, length(q) * 0.85));
  col = mix(col, purple, smoothstep(0.55, 1.02, r.y * 0.9 + 0.12 * f));

  // Keep it premium: mostly dark, colour as soft blooms.
  float vig = smoothstep(1.35, 0.15, length((uv - vec2(0.5, 0.42)) * vec2(1.55, 1.25)));
  col *= mix(0.28, 1.0, vig);
  col *= 0.92;

  // subtle dither to avoid banding
  float dither = (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  col += dither;

  gl_FragColor = vec4(col, 1.0);
}`;

const MOBILE_QUERY = "(max-width: 767px)";
/** Zeitpunkt des einen Standbilds, das bei "prefers-reduced-motion" gezeichnet wird. */
const STATIC_TIME = 8.0;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

/**
 * Animierter Aurora-Hintergrund.
 *
 * Der lila CSS-Verlauf (.aurora-fallback) liegt permanent hinter der Canvas.
 * Weil der Kontext mit `alpha: true` erzeugt wird, ist eine nie gezeichnete,
 * geleerte oder verlorene Canvas transparent — der Verlauf traegt dann. Damit
 * kann kein Fehlerpfad einen flachen, grauen Hintergrund erzeugen.
 *
 * `mobileStatic` verzichtet unterhalb von 768px ganz auf WebGL.
 */
export function Aurora({
  className,
  mobileStatic = false,
}: {
  className?: string;
  mobileStatic?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rebuild = () => setEpoch((n) => n + 1);

    // Auf dem Handy traegt der statische Verlauf. Das spart den zweiten
    // WebGL-Kontext und damit die Hauptursache fuer Kontextverluste unter iOS.
    const mq = mobileStatic ? window.matchMedia(MOBILE_QUERY) : null;
    mq?.addEventListener("change", rebuild);
    const stop = () => mq?.removeEventListener("change", rebuild);
    if (mq?.matches) return stop;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    if (!gl) return stop;

    // Ohne echtes fp32 im Fragment-Shader kollabiert hash() zu einer Konstanten
    // und die Aurora faellt zu einer flachen Flaeche zusammen. Dann ist der
    // statische Verlauf das bessere Ergebnis als ein kaputtes Bild.
    const hp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
    if (!hp || hp.precision < 23) return stop;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return stop;

    const prog = gl.createProgram();
    if (!prog) return stop;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return stop;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRes = gl.getUniformLocation(prog, "uRes");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    /** Gibt zurueck, ob der Zeichenpuffer dabei geleert wurde. */
    function resize() {
      const w = Math.floor(canvas!.clientWidth * dpr);
      const h = Math.floor(canvas!.clientHeight * dpr);
      const wiped = canvas!.width !== w || canvas!.height !== h;
      if (wiped) {
        canvas!.width = w;
        canvas!.height = h;
      }
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      return wiped;
    }

    function drawStatic() {
      resize();
      gl!.uniform1f(uTime, STATIC_TIME);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    let raf = 0;
    let running = true;
    const start = performance.now();

    function frame(now: number) {
      if (!running) return;
      resize();
      gl!.uniform1f(uTime, (now - start) / 1000);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    }

    // Einmal synchron dimensionieren, damit uRes auch dann gesetzt ist, wenn die
    // Seite in einem Hintergrund-Tab laedt und rAF vorerst nicht feuert.
    resize();
    if (prefersReduced) drawStatic();
    else raf = requestAnimationFrame(frame);

    // Ein Neusetzen von canvas.width leert den Puffer. Unter Reduce-Motion
    // laeuft keine Schleife, die das nachzeichnet — also von Hand.
    const onResize = () => {
      if (resize() && prefersReduced) drawStatic();
    };
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (prefersReduced) drawStatic();
          else if (!running) {
            running = true;
            raf = requestAnimationFrame(frame);
          }
        } else {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (prefersReduced) {
        drawStatic();
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Ohne preventDefault() ist der Kontext dauerhaft verloren und die Canvas
    // bliebe fuer immer leer.
    const onLost = (e: Event) => {
      e.preventDefault();
      running = false;
      cancelAnimationFrame(raf);
    };
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", rebuild);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", rebuild);
      stop();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [epoch, mobileStatic]);

  return (
    <div
      aria-hidden
      className={cn("aurora-fallback block h-full w-full", className)}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
