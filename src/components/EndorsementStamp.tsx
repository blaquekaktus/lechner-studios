import type { CSSProperties } from "react";

interface EndorsementStampProps {
  variant?: "default" | "medium" | "small";
  onDark?: boolean;
  style?: CSSProperties;
}

const VARIANTS = {
  default: { grid: 56, gap: 4, textSize: 14, gridTextGap: 24 },
  medium: { grid: 40, gap: 3, textSize: 12, gridTextGap: 16 },
  small: { grid: 28, gap: 2, textSize: 10, gridTextGap: 12 },
};

/**
 * "A Lechner Studios product" endorsement stamp — per Brand v4.1 spec §4.
 * Small 2×2 pillar grid + inline wordmark; used as a sub-product surface
 * boundary marker on every product surface (footer/about/landing).
 */
export default function EndorsementStamp({
  variant = "small",
  onDark = false,
  style,
}: EndorsementStampProps) {
  const v = VARIANTS[variant];
  const ink = onDark ? "#FDFBF8" : "#1A1812";
  const gold = onDark ? "#C9A961" : "#B8944D";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: v.gridTextGap,
        ...style,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: v.gap,
          width: v.grid,
          height: v.grid,
        }}
      >
        <div style={{ background: "#D6CDBE", borderRadius: 1 }} />
        <div style={{ background: "#8FA8C5", borderRadius: 1 }} />
        <div style={{ background: "#254268", borderRadius: 1 }} />
        <div style={{ background: "#5E8263", borderRadius: 1 }} />
      </div>
      <span
        style={{
          fontFamily: "var(--font-display-bold), Cormorant, serif",
          fontWeight: 700,
          fontSize: v.textSize,
          letterSpacing: "-0.025em",
          color: ink,
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        lechner
        <span
          style={{
            color: gold,
            fontFamily: "var(--font-display-italiana), Italiana, serif",
            fontWeight: 400,
          }}
        >
          .
        </span>
        <span
          style={{
            fontFamily: "var(--font-display-italiana), Italiana, serif",
            fontWeight: 400,
          }}
        >
          studios
        </span>
      </span>
    </div>
  );
}
