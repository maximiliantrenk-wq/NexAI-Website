import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// The NEXAI "N" mark — kept identical to app/icon.svg, the header logo and the
// OG image (app/opengraph-image.tsx). Rendered on a full-bleed dark square; iOS
// applies its own rounded mask, Safari favourites show it inside a rounded tile.
const nSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><defs><linearGradient id="d" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4d7cff"/><stop offset="1" stop-color="#a855f7"/></linearGradient></defs><g stroke="#f4f5fa" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M31 71V27l34 44"/><path d="M65 71V34"/><path d="M38 47l18 22"/></g><circle cx="65" cy="26" r="6.5" fill="url(#d)"/></svg>`;
const nDataUri = `data:image/svg+xml;base64,${Buffer.from(nSvg).toString("base64")}`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090d",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={nDataUri} width={116} height={116} alt="NEXAI" />
      </div>
    ),
    size,
  );
}
