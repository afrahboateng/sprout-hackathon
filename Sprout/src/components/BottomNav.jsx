import { BarChart3, Target, MessageCircle, User } from "lucide-react";
import { COLORS } from "../theme";

const TABS = [
  { id: "summary", label: "Summary", icon: BarChart3 },
  { id: "goals", label: "Goals", icon: Target },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "profile", label: "Profile", icon: User },
];

export default function BottomNav({ active, setActive }) {
  return (
    <div className="flex items-center justify-around py-2.5" style={{ background: COLORS.navBg, borderTop: `1px solid ${COLORS.border}` }}>
      {TABS.map((t) => {
        const Icon = t.icon;
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => setActive(t.id)} className="flex flex-col items-center gap-1 px-3.5 py-1">
            <Icon size={20} color={isActive ? COLORS.sprout : COLORS.muted} strokeWidth={isActive ? 2.3 : 1.8} />
            <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 10.5, color: isActive ? COLORS.sprout : COLORS.muted }}>
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}