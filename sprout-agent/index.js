import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import { ACCOUNTS, transactions, goals } from "../Sprout/src/data.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const app = express();
app.use(cors());
app.use(express.json());

// Pulled live from ../Sprout/src/data.js — the single source of truth.
// Edit that file and this agent picks up the change automatically on restart.
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
You are Sprout, a friendly personal finance assistant inside the Sprout app.
Sprout's whole philosophy is "pay yourself first" — helping people understand
their spending across accounts and grow their savings.

Rules:
- Only use the financial data provided below. Never invent transactions, accounts, or numbers that aren't in it.
- If someone asks something the data can't answer, say so plainly instead of guessing.
- Keep answers short, plain-language, and friendly — no jargon.
- When relevant, gently point out opportunities to save (e.g. recurring subscriptions, categories with high spend).
- This is demo/seeded data for a hackathon, not a real bank connection.

Here is the user's current financial data as JSON:
${JSON.stringify(SPROUT_DATA, null, 2)}
`;

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Missing 'message' in request body." });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    res.json({ reply: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong talking to Gemini." });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Sprout agent listening on port ${PORT}`);
});