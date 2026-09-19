import { Sprout as SproutIcon } from "lucide-react";
import { COLORS } from "../theme";

export default function Wordmark({ size = 20 }) {
  return (
    <div className="flex items-center gap-1.5 select-none">
      <SproutIcon size={size + 2} color={COLORS.sprout} strokeWidth={2.2} />
      <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: size, color: COLORS.paper }}>
        Sprout
      </span>
    </div>
  );
}
