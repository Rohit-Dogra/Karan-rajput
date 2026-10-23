import { ImageResponse } from "next/og";
import { artist } from "@/data/artist";
import { latestRelease } from "@/lib/catalogue";

export const alt = `${artist.name} — official site`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0b0a09", color: "#f1e8da" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, width: 680 }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#e5432c" }}>
            Official site
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 132, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4, textTransform: "uppercase" }}>Karan</div>
            <div style={{ fontSize: 132, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4, textTransform: "uppercase" }}>Rajput</div>
            <div style={{ fontSize: 34, marginTop: 28, fontStyle: "italic", color: "#cfae84" }}>{artist.tagline}</div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#a39b90" }}>Out now — {latestRelease.title}</div>
        </div>
        <img src={artist.portrait.src} alt="" width={520} height={630} style={{ objectFit: "cover", width: 520, height: 630 }} />
      </div>
    ),
    size,
  );
}
