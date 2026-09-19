import { useState } from "react";
import { FONTS, COLORS } from "./theme";
import SplashScreen from "./components/SplashScreen";
import SummaryScreen from "./components/SummaryScreen";
import GoalsScreen from "./components/GoalsScreen";
import ChatScreen from "./components/ChatScreen";
import ProfileScreen from "./components/ProfileScreen";
import BottomNav from "./components/BottomNav";

function AppShell() {
  const [tab, setTab] = useState("summary");
  return (
    <div className="w-full h-full flex flex-col" style={{ background: COLORS.forest }}>
      {tab === "summary" && <SummaryScreen />}
      {tab === "goals" && <GoalsScreen />}
      {tab === "chat" && <ChatScreen />}
      {tab === "profile" && <ProfileScreen />}
      <BottomNav active={tab} setActive={setTab} />
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("splash");
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: COLORS.page, minHeight: 700 }}>
      <style>{FONTS}</style>
      <div
        className="relative overflow-hidden flex flex-col"
        style={{ width: 390, height: 780, borderRadius: 36, boxShadow: "0 30px 60px -20px rgba(0,0,0,0.35)", border: `8px solid #0B120E` }}
      >
        {screen === "splash" ? <SplashScreen onEnter={() => setScreen("app")} /> : <AppShell />}
      </div>
    </div>
  );
}