import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "NEXAI — Digitale Mitarbeiter für Ihr Unternehmen";

const nSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><defs><linearGradient id="d" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4d7cff"/><stop offset="1" stop-color="#a855f7"/></linearGradient></defs><g stroke="#f4f5fa" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M31 71V27l34 44"/><path d="M65 71V34"/><path d="M38 47l18 22"/></g><circle cx="65" cy="26" r="6.5" fill="url(#d)"/></svg>`;
const nDataUri = `data:image/svg+xml;base64,${Buffer.from(nSvg).toString("base64")}`;

export default async function OpengraphImage() {
  const fontsDir = join(
    process.cwd(),
    "node_modules/geist/dist/fonts/geist-sans",
  );
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
          alignItems: "center",
          justifyContent: "center",
          background: "#08090d",
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 40,
            width: 900,
            height: 520,
            display: "flex",
            background:
              "radial-gradient(50% 50% at 50% 45%, rgba(124,92,255,0.38), rgba(8,9,13,0) 70%)",
          }}
        />
        <img src={nDataUri} width={156} height={156} alt="" />
        <div
          style={{
            fontSize: 112,
            fontWeight: 600,
            color: "#f4f5fa",
            letterSpacing: "-0.03em",
            marginTop: 24,
          }}
        >
          NEXAI
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 400,
            color: "#a2a6b8",
            marginTop: 14,
          }}
        >
          Digitale Mitarbeiter für Ihr Unternehmen
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
