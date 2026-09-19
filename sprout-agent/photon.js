import "dotenv/config";
import { Spectrum } from "spectrum-ts";
import { terminal } from "spectrum-ts/providers/terminal";
import { GoogleGenAI } from "@google/genai";
import { ACCOUNTS, transactions, goals } from "../Sprout/src/data.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const accountNameById = Object.fromEntries(
  ACCOUNTS.filter((a) => a.id !== "all").map((a) => [a.id, a.name])
);
const readableTransactions = transactions.map((t) => ({
  name: t.name,
  category: t.cat,
  account: accountNameById[t.account] || t.account,
  amount: t.amount,
  date: t.dateLabel || t.date,
}));
const SPROUT_DATA = {
  accounts: ACCOUNTS.filter((a) => a.id !== "all"),
  transactions: readableTransactions,
  goals,
};

const SYSTEM_INSTRUCTION = `
You are Sprout, a friendly personal finance assistant, now reachable by text.
Only use the financial data below — never invent numbers. Keep answers short and plain-language.

Financial data:
${JSON.stringify(SPROUT_DATA, null, 2)}
`;

const app = await Spectrum({ providers: [terminal.config()] });

console.log("Sprout is live — text it like you're texting a phone number.\n");

for await (const [space, message] of app.messages) {
  if (message.content.type === "text") {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message.content.text,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });
    await space.send(response.text);
  }
}