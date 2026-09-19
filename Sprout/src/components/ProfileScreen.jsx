import { User, CreditCard } from "lucide-react";
import { COLORS } from "../theme";
import { ACCOUNTS } from "../data";

export default function ProfileScreen() {
  return (
    <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center" style={{ width: 52, height: 52, borderRadius: 999, background: COLORS.forestRaised, border: `1px solid ${COLORS.border}` }}>
          <User size={22} color={COLORS.sprout} />
        </div>
        <div>
          <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: COLORS.paper, fontSize: 16, fontWeight: 600 }}>Afrah</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.muted, fontSize: 12 }}>3 accounts linked</div>
        </div>
      </div>
      <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
        {ACCOUNTS.filter((a) => a.id !== "all").map((a, i, arr) => (
          <div key={a.id} className="flex items-center justify-between px-4 py-3" style={{ background: COLORS.forestRaised, borderBottom: i === arr.length - 1 ? "none" : `1px solid ${COLORS.border}` }}>
            <span className="flex items-center gap-2" style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: COLORS.paper, fontSize: 14 }}>
              <CreditCard size={15} color={COLORS.muted} /> {a.name}
            </span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.sprout, fontSize: 12 }}>Connected</span>
          </div>
        ))}
      </div>
    </div>
  );
}
