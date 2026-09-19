import { Sprout as SproutIcon } from "lucide-react";
import { COLORS } from "../theme";

export default function SplashScreen({ onEnter }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-between px-8 py-14"
      style={{ background: COLORS.forest }}
    >
      <div />
      <div className="flex flex-col items-center gap-5">
        <div
          className="flex items-center justify-center"
          style={{ width: 88, height: 88, borderRadius: 24, background: COLORS.forestRaised, border: `1px solid ${COLORS.border}` }}
        >
          <SproutIcon size={42} color={COLORS.sprout} strokeWidth={2} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 30, color: COLORS.paper }}>
            Sprout
          </span>
          <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14, color: COLORS.muted, textAlign: "center", maxWidth: 220 }}>
            Every account, one dashboard. Watch your money grow.
          </span>
        </div>
      </div>
      <button
        onClick={onEnter}
        className="w-full py-3.5 flex items-center justify-center transition-transform hover:-translate-y-0.5"
        style={{
          background: COLORS.sprout,
          color: COLORS.forest,
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontWeight: 600,
          fontSize: 15,
          borderRadius: 999,
        }}
      >
        Get started
      </button>
    </div>
  );
}
