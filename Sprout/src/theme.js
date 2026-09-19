export const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,900&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
`;

export const COLORS = {
  page: "#E9ECE9",
  forest: "#153229",
  forestRaised: "#1E4238",
  navBg: "#123027",
  sprout: "#5FDD8B",
  wheat: "#E7C27D",
  clay: "#D98564",
  paper: "#F2F1E9",
  muted: "#8FA89B",
  border: "#2C4A3F",
};

export const money = (n) =>
  (n < 0 ? "-$" : "$") +
  Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Compact currency for chart axis labels, e.g. $3.2K instead of $3,200.00
export const shortMoney = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);