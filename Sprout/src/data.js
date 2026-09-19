import { COLORS } from "./theme";

export const ACCOUNTS = [
  { id: "all", name: "All accounts" },
  { id: "chase", name: "Chase Sapphire" },
  { id: "wells", name: "Wells Fargo" },
  { id: "amex", name: "Amex Gold" },
];

// Color assigned to each real account, used for the split-by-account chart and legend
export const ACCOUNT_COLORS = {
  chase: COLORS.sprout,
  wells: COLORS.wheat,
  amex: COLORS.clay,
};

// Balance in each account the day before this week's transactions below.
// The 7-day balance trend is calculated FROM this + the transactions — never hand-edited separately.
const STARTING_BALANCE = { chase: 500, wells: 1800, amex: 300 };

// Every transaction has a real date now, so the chart and the activity list always agree.
export const transactions = [
  { name: "Rent", cat: "Housing", account: "wells", amount: -1450.0, date: "2026-09-13", dateLabel: "Sep 13" },
  { name: "Trader Joe's", cat: "Groceries", account: "chase", amount: -64.21, date: "2026-09-14", dateLabel: "Sep 14" },
  { name: "Payroll deposit", cat: "Income", account: "wells", amount: 2140.0, date: "2026-09-15", dateLabel: "Sep 15" },
  { name: "Blue Bottle Coffee", cat: "Dining", account: "amex", amount: -6.5, date: "2026-09-16", dateLabel: "Sep 16" },
  { name: "Auto-save to Sprout", cat: "Pay yourself first", account: "wells", amount: -150.0, date: "2026-09-16", dateLabel: "Sep 16" },
  { name: "Uber", cat: "Transport", account: "amex", amount: -18.4, date: "2026-09-17", dateLabel: "Sep 17" },
  { name: "Spotify", cat: "Subscriptions", account: "chase", amount: -11.99, date: "2026-09-18", dateLabel: "Sep 18" },
];

const DAYS = [
  { d: "Sun", date: "2026-09-13" },
  { d: "Mon", date: "2026-09-14" },
  { d: "Tue", date: "2026-09-15" },
  { d: "Wed", date: "2026-09-16" },
  { d: "Thu", date: "2026-09-17" },
  { d: "Fri", date: "2026-09-18" },
  { d: "Sat", date: "2026-09-19" },
];

// Walks each day forward, applying that day's transactions to the running balance per account.
// This is what makes the chart always match the transaction list below it.
function buildBalanceTrend() {
  const running = { ...STARTING_BALANCE };
  return DAYS.map(({ d, date }) => {
    transactions
      .filter((t) => t.date === date)
      .forEach((t) => {
        running[t.account] += t.amount;
      });
    const total = running.chase + running.wells + running.amex;
    return {
      d,
      chase: Number(running.chase.toFixed(2)),
      wells: Number(running.wells.toFixed(2)),
      amex: Number(running.amex.toFixed(2)),
      total: Number(total.toFixed(2)),
    };
  });
}

export const balanceTrend = buildBalanceTrend();

export const goals = [
  { name: "Emergency fund", target: 5000, saved: 3120 },
  { name: "Trip to Japan", target: 2500, saved: 640 },
];