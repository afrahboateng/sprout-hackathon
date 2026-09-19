import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { COLORS } from "../theme";

const AGENT_URL = "http://localhost:3001/chat";

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { role: "agent", text: "Hi, I'm your Sprout assistant. Ask me anything about your spending, accounts, or goals." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(AGENT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "agent", text: data.reply || data.error || "Something went wrong." }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "agent", text: "Couldn't reach the agent — make sure the sprout-agent server is running on port 3001." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: COLORS.forest }}>
      <div className="px-5 pt-6 pb-3">
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: COLORS.paper, fontSize: 22 }}>Chat</h2>
        <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: COLORS.muted, fontSize: 12.5 }}>
          Ask about your spending or goals
        </span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 flex flex-col gap-3 pb-3">
        {messages.map((m, i) => (
          <div key={i} className="flex" style={{ justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div
              className="px-3.5 py-2.5"
              style={{
                maxWidth: "78%",
                background: m.role === "user" ? COLORS.sprout : COLORS.forestRaised,
                color: m.role === "user" ? COLORS.forest : COLORS.paper,
                border: m.role === "user" ? "none" : `1px solid ${COLORS.border}`,
                borderRadius: 14,
                borderBottomRightRadius: m.role === "user" ? 4 : 14,
                borderBottomLeftRadius: m.role === "agent" ? 4 : 14,
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex" style={{ justifyContent: "flex-start" }}>
            <div
              className="px-3.5 py-2.5"
              style={{
                background: COLORS.forestRaised,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 14,
                borderBottomLeftRadius: 4,
                color: COLORS.muted,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 13,
              }}
            >
              Sprout is thinking…
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-3 flex items-center gap-2" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask Sprout..."
          className="flex-1 px-3.5 py-2.5"
          style={{
            background: COLORS.forestRaised,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 999,
            color: COLORS.paper,
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 14,
            outline: "none",
          }}
        />
        <button
          onClick={send}
          disabled={loading}
          className="flex items-center justify-center"
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            background: COLORS.sprout,
            color: COLORS.forest,
            opacity: loading ? 0.6 : 1,
            flexShrink: 0,
          }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
