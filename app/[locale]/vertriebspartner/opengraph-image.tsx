import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "NEXAI — Setter & Closer (m/w/d) gesucht";

const nSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><defs><linearGradient id="d" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4d7cff"/><stop offset="1" stop-color="#a855f7"/></linearGradient></defs><g stroke="#f4f5fa" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M31 71V27l34 44"/><path d="M65 71V34"/><path d="M38 47l18 22"/></g><circle cx="65" cy="26" r="6.5" fill="url(#d)"/></svg>`;
const nDataUri = `data:image/svg+xml;base64,${Buffer.from(nSvg).toString("base64")}`;

const copy = {
  de: {
    eyebrow: "Vertriebspartner (m/w/d) · Remote · DACH",
    title: "Setter & Closer gesucht",
    sub: "Bis 35 % einmalig + bis 15 % monatlich · stornofrei · kein Deckel",
  },
  en: {
    eyebrow: "Sales partners (m/f/d) · Remote · DACH",
    title: "Setters & closers wanted",
    sub: "Up to 35 % one-off + up to 15 % monthly · no clawbacks · no cap",
  },
} as const;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = copy[locale === "en" ? "en" : "de"];

  const fontsDir = join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans");
  const semibold = readFileSync(join(fontsDir, "Geist-SemiBold.ttf"));
  const regular = readFileSync(join(fontsDir, "Geist-Regular.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0 96px",
          background: "#08090d",
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -120,
            width: 720,
            height: 720,
            display: "flex",
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(124,92,255,0.42), rgba(8,9,13,0) 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img src={nDataUri} width={72} height={72} alt="" />
          <div style={{ fontSize: 40, fontWeight: 600, color: "#f4f5fa", letterSpacing: "-0.02em" }}>
            NEXAI
          </div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 22,
            fontWeight: 400,
            color: "#8b93ff",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {c.eyebrow}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 92,
            fontWeight: 600,
            color: "#f4f5fa",
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
          }}
        >
          {c.title}
        </div>
        <div style={{ marginTop: 22, fontSize: 30, fontWeight: 400, color: "#a2a6b8" }}>
          {c.sub}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
