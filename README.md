# Foresight — AI-Powered Smart Home Commerce

> Turn your existing home cameras into a proactive shopping assistant that restocks your home before you run out.

---

## Inspiration

You're mid-wash and the dish soap runs out. It's Monday morning and there are no coffee filters. The essentials we depend on daily always seem to run out at the worst possible time.

The cameras and smart devices already in our homes sit idle — they watch but don't act. We asked: what if they could? Foresight turns passive home cameras into an intelligent commerce layer that sees what you're running low on and handles replenishment before you even notice.

---

## What It Does

Foresight is an AI-powered smart home commerce platform. It uses your existing cameras to detect household items in use, predict when they're running low, and automatically purchase replacements through Amazon — all with a single tap of approval from you.

---

## Core Features

### Real-Time AI Vision Detection
A live camera feed powered by OpenAI GPT-4o analyzes your environment in real time, identifying household products and their usage context — washing dishes triggers dish soap detection, cooking triggers olive oil.

### Complementary Item Recommendations
The AI doesn't just identify what's visible. It reasons about what activity is happening and surfaces related products you're likely to need next: see a mouse, get a keyboard recommendation; see a TV, get a streaming device suggestion.

### One-Tap Purchase Approval
Detected items surface as cards on your dashboard. Approve with a single tap — Foresight handles everything else.

### Autonomous Browser Shopping Agent
Powered by Browserbase and Playwright, an AI agent spins up a real cloud browser session, navigates Amazon, searches for the best match, and adds it to your cart — fully autonomously.

### Live Shopping View
Watch the agent shop in real time through an embedded live browser view in the dashboard. A browser-style modal shows the agent navigating Amazon, searching, and checking out.

### Smart Analytics Dashboard
Weekly spending charts, total savings, items tracked, and a live activity feed of every detection, approval, and purchase — all updating in real time.

---

## Additional Details

- Items deduplicate automatically — capped at 2 per detection for quality over quantity
- Confidence scores displayed between 70–100% to reflect realistic detection variance
- Timestamped activity feed logs approvals, declines, and completed purchases
- Stats (total saved, items tracked, automation rate) update dynamically
- Responsive dark theme optimized for always-on home dashboard displays

---

## How We Built It

### Frontend
React 18 + TypeScript, built with Vite for instant hot module reloading. Tailwind CSS and shadcn/ui provide the dark dashboard UI. Framer Motion handles animations throughout.

### AI Vision
OpenAI's GPT-4o processes camera frames via the Chat Completions API with vision capabilities. Frames are sent as base64-encoded images; the model returns structured JSON containing item names, brands, confidence scores, and reasoning. GPT-4o was chosen for its sub-second latency — real-time detection can't wait.

### Prompt Engineering
Prompts are designed to make the model reason about *activities*, not just objects. Instead of "I see dish soap," the model thinks: "someone is washing dishes — what do they depend on?" That shift produces more actionable, contextually aware recommendations.

### Browser Automation
Browserbase SDK provisions cloud browser sessions. Playwright-core connects via Chrome DevTools Protocol (CDP) to drive the full Amazon shopping flow: search, product selection, and add-to-cart — no human required.

### Live View
Browserbase's debug API returns a real-time fullscreen URL that we embed as an iframe, letting users watch the agent shop as it happens.

### Backend
Lightweight Express.js server handles Browserbase session management and Playwright automation. Runs on Node.js (Playwright requires Node — Bun is not supported).

### State Management
`localStorage` bridges the Camera component and Dashboard with polling for real-time sync of pending purchase approvals.

### Security
All API keys (OpenAI, Browserbase) are stored in `.env` and loaded via `dotenv`. No secrets are exposed in client-side code or committed to git history.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion |
| AI Vision | OpenAI GPT-4o (Chat Completions API w/ vision) |
| Browser Automation | Browserbase SDK, Playwright-core, CDP |
| Backend | Node.js, Express.js |
| State | localStorage + polling |
