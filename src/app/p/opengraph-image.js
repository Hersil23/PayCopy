import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Te enviaron un cobro - PayCopy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <svg width="100" height="100" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="4" width="36" height="48" rx="4" fill="#1a1a1a" stroke="#ea580c" strokeWidth="3" />
            <line x1="16" y1="16" x2="36" y2="16" stroke="#a1a1a1" strokeWidth="2" />
            <line x1="16" y1="24" x2="32" y2="24" stroke="#a1a1a1" strokeWidth="2" />
            <line x1="16" y1="32" x2="34" y2="32" stroke="#a1a1a1" strokeWidth="2" />
            <rect x="28" y="28" width="28" height="32" rx="4" fill="#1a1a1a" stroke="#05df72" strokeWidth="3" />
            <path d="M36 44l4 4 8-8" stroke="#05df72" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: "90px", fontWeight: "bold", color: "#fafafa" }}>
            Pay<span style={{ color: "#ea580c" }}>Copy</span>
          </span>
        </div>
        <p style={{ fontSize: "45px", color: "#ea580c", margin: "0", fontWeight: "bold" }}>
          Te enviaron un cobro
        </p>
        <p style={{ fontSize: "28px", color: "#a1a1a1", marginTop: "16px" }}>
          Abre el enlace para ver los datos y pagar fácil
        </p>
      </div>
    ),
    { ...size }
  );
}
