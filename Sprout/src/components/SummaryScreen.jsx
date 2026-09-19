import { useMemo, useState } from "react";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronDown, CreditCard } from "lucide-react";
import { COLORS, money, shortMoney } from "../theme";
import { ACCOUNTS, ACCOUNT_COLORS, transactions, balanceTrend } from "../data";

const REAL_ACCOUNTS = ACCOUNTS.filter((a) => a.id !== "all");
const accountNameById = Object.fromEntries(REAL_ACCOUNTS.map((a) => [a.id, a.name]));

export default function SummaryScreen() {
  const [accountId, setAccountId] = useState("all");
  const [openFilter, setOpenFilter] = useState(false);
  const [splitByAccount, setSplitByAccount] = useState(false);
  const account = ACCOUNTS.find((a) => a.id === accountId);

  const filtered = useMemo(
    () => (accountId === "all" ? transactions : transactions.filter((t) => t.account === accountId)),
    [accountId]
  );

  // The big number is your current balance — the last point in the balance trend below.
  const latest = balanceTrend[balanceTrend.length - 1];
  const currentBalance = accountId === "all" ? latest.total : latest[accountId];

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4 flex flex-col gap-5">
      <div>
        <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: COLORS.muted, fontSize: 13 }}>
          {accountId === "all" ? "Total balance, all accounts" : `Balance · ${account.name}`}
        </div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 34, color: COLORS.paper, marginTop: 2 }}>
          {money(currentBalance)}
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpenFilter((v) => !v)}
          className="flex items-center gap-2 px-3.5 py-2 w-full justify-between"
          style={{ background: COLORS.forestRaised, border: `1px solid ${COLORS.border}`, borderRadius: 10 }}
        >
          <span className="flex items-center gap-2" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14, color: COLORS.paper }}>
            <CreditCard size={15} color={COLORS.sprout} />
            {account.name}
          </span>
          <ChevronDown size={15} color={COLORS.muted} />
        </button>
        {openFilter && (
          <div
            className="absolute left-0 right-0 mt-1.5 py-1 z-10"
            style={{ background: COLORS.forestRaised, border: `1px solid ${COLORS.border}`, borderRadius: 10 }}
          >
            {ACCOUNTS.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  setAccountId(a.id);
                  setOpenFilter(false);
                }}
                className="w-full text-left px-3.5 py-2.5"
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: 14,
                  color: a.id === accountId ? COLORS.sprout : COLORS.paper,
                }}
              >
                {a.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-4" style={{ background: COLORS.forestRaised, border: `1px solid ${COLORS.border}`, borderRadius: 14 }}>
        <div className="flex items-center justify-between mb-2">
          <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: COLORS.muted, fontSize: 12 }}>
            Balance, last 7 days
          </span>
          <div className="flex items-center gap-1" style={{ background: COLORS.forest, borderRadius: 999, padding: 2 }}>
            <button
              onClick={() => setSplitByAccount(false)}
              className="px-2.5 py-1"
              style={{
                borderRadius: 999,
                background: !splitByAccount ? COLORS.sprout : "transparent",
                color: !splitByAccount ? COLORS.forest : COLORS.muted,
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 11.5,
                fontWeight: 600,
              }}
            >
              Total
            </button>
            <button
              onClick={() => setSplitByAccount(true)}
              className="px-2.5 py-1"
              style={{
                borderRadius: 999,
                background: splitByAccount ? COLORS.sprout : "transparent",
                color: splitByAccount ? COLORS.forest : COLORS.muted,
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 11.5,
                fontWeight: 600,
              }}
            >
              By account
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={140}>
          {splitByAccount ? (
            <LineChart data={balanceTrend} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
              <XAxis dataKey="d" stroke={COLORS.muted} tick={{ fontFamily: "IBM Plex Mono", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis stroke={COLORS.muted} tick={{ fontFamily: "IBM Plex Mono", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={shortMoney} width={54} />
              <Tooltip
                formatter={(v) => money(v)}
                contentStyle={{ background: COLORS.forest, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontFamily: "IBM Plex Mono", fontSize: 12 }}
              />
              {REAL_ACCOUNTS.map((a) => (
                <Line key={a.id} type="monotone" dataKey={a.id} stroke={ACCOUNT_COLORS[a.id]} strokeWidth={2} dot={false} />
              ))}
            </LineChart>
          ) : (
            <AreaChart data={balanceTrend} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="sproutFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.sprout} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={COLORS.sprout} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="d" stroke={COLORS.muted} tick={{ fontFamily: "IBM Plex Mono", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis stroke={COLORS.muted} tick={{ fontFamily: "IBM Plex Mono", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={shortMoney} width={54} />
              <Tooltip
                formatter={(v) => money(v)}
                contentStyle={{ background: COLORS.forest, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontFamily: "IBM Plex Mono", fontSize: 12 }}
              />
              <Area type="monotone" dataKey="total" stroke={COLORS.sprout} fill="url(#sproutFill)" strokeWidth={2} />
            </AreaChart>
          )}
        </ResponsiveContainer>

        {splitByAccount && (
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            {REAL_ACCOUNTS.map((a) => (
              <div key={a.id} className="flex items-center gap-1.5">
                <span style={{ width: 8, height: 8, borderRadius: 999, background: ACCOUNT_COLORS[a.id], display: "inline-block" }} />
                <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 11, color: COLORS.muted }}>{a.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.muted, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
          Recent activity
        </div>
        <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
          {filtered.map((t, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3"
              style={{ background: COLORS.forestRaised, borderBottom: i === filtered.length - 1 ? "none" : `1px solid ${COLORS.border}` }}
            >
              <div>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: COLORS.paper, fontSize: 14 }}>{t.name}</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", color: COLORS.muted, fontSize: 11 }}>
                  {t.cat} · {accountNameById[t.account]} · {t.dateLabel}
                </div>
              </div>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, color: t.amount > 0 ? COLORS.sprout : COLORS.paper }}>
                {money(t.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}