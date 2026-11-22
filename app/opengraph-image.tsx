import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Expertality Studio: every location posts on brand, every week.";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#15233f", padding: 72, color: "#fff", fontFamily: "sans-serif", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, letterSpacing: 4, fontWeight: 700 }}>
          <div style={{ width: 36, height: 36, borderRadius: 999, border: "6px solid #fff", display: "flex", alignItems: "center" }}><div style={{ width: 24, height: 5, background: "#b4232f" }} /></div>
          <span style={{ color: "#b4232f" }}>EXPERT</span><span style={{ marginLeft: -16 }}>ALITY</span><span style={{ color: "#c9cdd6", letterSpacing: 0, fontWeight: 400 }}>Studio</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
          <span>Every location posts on brand.</span><span>Every week.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 26, color: "#c9cdd6" }}>
          <div style={{ width: 64, height: 3, background: "#b4232f" }} />Reels and posts for every franchise location, checked against your brand guide.
        </div>
      </div>
    ),
    size,
  );
}
