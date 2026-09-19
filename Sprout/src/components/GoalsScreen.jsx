import { Plus } from "lucide-react";
import { COLORS, money } from "../theme";
import { goals } from "../data";

export default function GoalsScreen() {
  return (
    <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4 flex flex-col gap-4">
      <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: COLORS.paper, fontSize: 22 }}>Goals</h2>
      {goals.map((g) => {
        const pct = Math.min(100, Math.round((g.saved / g.target) * 100));
        return (
          <div key={g.name} className="p-4" style={{ background: COLORS.forestRaised, border: `1px solid ${COLORS.border}`, borderRadius: 14 }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: COLORS.paper, fontSize: 15, fontWeight: 500 }}>{g.name}</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.wheat, fontSize: 13 }}>{pct}%</span>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: COLORS.border, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: COLORS.sprout, borderRadius: 999 }} />
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.muted, fontSize: 12, marginTop: 6 }}>
              {money(g.saved)} of {money(g.target)}
            </div>
          </div>
        );
      })}
      <button
        className="w-full py-3 flex items-center justify-center gap-2"
        style={{ border: `1px dashed ${COLORS.border}`, borderRadius: 14, color: COLORS.muted, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14 }}
      >
        <Plus size={15} /> New goal
      </button>
    </div>
  );
}
