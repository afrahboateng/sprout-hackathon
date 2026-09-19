# Sprout

Sprout is a personal finance app built around one idea: pay yourself first. It gives you a single dashboard across all your accounts, and includes a Gemini-powered chat assistant that can answer questions about your spending, accounts, and savings goals in plain language.

Built for **Hack for Humanity: San Francisco** (Sept 19, 2026).

## What's in this repo

This repo has two parts that run separately:

- **`Sprout/`** — the React app (the actual dashboard you look at and use)
- **`sprout-agent/`** — a small Node server that powers the Chat tab, using the Google Gemini API

The chat assistant is Sprout's Gemini integration: it reads the same seeded transaction, account, and goals data as the app (`Sprout/src/data.js`) and answers questions grounded in that data — no invented numbers.

## Before you start

You'll need:

- **Node.js v18 or higher** — check with `node -v`. Get it from [nodejs.org](https://nodejs.org) if needed.
- **A free Gemini API key** — get one at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey). No billing required for the free tier.

## Setup

### 1. Clone the repo

```
git clone https://github.com/afrahboateng/sprout-hackathon.git
cd sprout-hackathon
```

### 2. Set up the frontend (Sprout)

```
cd Sprout
npm install
```

### 3. Set up the agent (sprout-agent)

```
cd ../sprout-agent
npm install
```

Then create a `.env` file in `sprout-agent` with your own Gemini API key (this file isn't included in the repo on purpose, since API keys should never be committed to GitHub):

```
echo 'GEMINI_API_KEY=your_key_here' > .env
```

Replace `your_key_here` with the real key from AI Studio.

## Running it

Sprout needs **two terminals running at the same time** — one for the app, one for the chat agent.

**Terminal 1 — start the agent:**

```
cd sprout-agent
node index.js
```

You should see `Sprout agent listening on port 3001`. Leave this running.

**Terminal 2 — start the app:**

```
cd Sprout
npm run dev
```

This prints a `localhost` link (usually `http://localhost:5173/`). Open it in your browser.

Tap **Get started** on the splash screen, then explore the **Summary**, **Goals**, **Chat**, and **Profile** tabs. The Chat tab only works while the agent (Terminal 1) is running.

## Notes

- All financial data is seeded/demo data (`Sprout/src/data.js`) — this isn't connected to a real bank yet.
- If you edit `data.js`, restart the agent (`Ctrl+C`, then `node index.js` again) so it picks up the change — the frontend hot-reloads automatically, but the agent doesn't.