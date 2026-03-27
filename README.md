Foresight — AI-Powered Smart Home Commerce
Inspiration
We've all had that moment — you reach for the dish soap mid-wash, and it's empty. You're out of coffee filters on a Monday morning. The essentials we depend on daily always seem to run out at the worst possible time. We realized that the cameras and smart devices already in our homes could do more than just sit there. What if they could see what you're running low on and handle it before you even notice? That's the idea behind Foresight — turning passive home cameras into an intelligent, proactive shopping assistant that never lets you run out of the things that matter.

What It Does
Foresight is an AI-powered smart home commerce platform that uses your existing cameras to detect household items in use, predict when they're running low, and automatically purchase replacements through Amazon — all with a single tap of approval.

Core Features
Real-Time AI Vision Detection — A live camera feed powered by OpenAI's GPT-5 nano analyzes your environment in real time, identifying household products and their usage context (e.g., washing dishes → dish soap, cooking → olive oil).
Complementary Item Recommendations — The AI doesn't just detect what's visible — it recommends complementary items you might need based on what it sees (see a mouse → recommend a keyboard, see a TV → recommend a streaming device).
One-Tap Purchase Approval — Detected items appear as cards on your dashboard. Approve with a single tap, and Foresight's AI agent handles the rest.
Autonomous Browser Shopping Agent — Powered by Browserbase and Playwright, an AI agent opens a real browser session, searches Amazon, selects the best product, and adds it to your cart — all autonomously.
Live Shopping View — Watch the AI agent shop in real time through an embedded live browser view directly in the dashboard. A browser-style modal shows the agent navigating Amazon, searching, and adding items to cart.
Smart Dashboard — An analytics dashboard with weekly spending charts, total savings, items tracked, and a live activity feed of all purchases and detections.
Additional Features
Items stack without duplicates, limited to 2 items per detection for quality recommendations
Confidence scores randomized between 70-100% for realistic detection display
Activity feed with timestamped entries for approvals, declines, and purchases
Dynamic stats (total saved, items tracked, automation rate) update in real time
Responsive design with dark theme optimized for home dashboard displays
How We Built It
Our tech stack combines cutting-edge AI with modern web technologies:

Frontend: React 18 + TypeScript, built with Vite for instant hot module reloading. Tailwind CSS and shadcn/ui provide a sleek, dark-themed dashboard UI. Framer Motion powers smooth animations throughout.
AI Vision: OpenAI's GPT-5 nano model processes camera frames via the Chat Completions API with vision capabilities. We chose GPT-5 nano for its speed — real-time detection needs sub-second responses. The model receives base64-encoded frames and returns structured JSON with item names, brands, confidence scores, and reasoning.
Prompt Engineering: Carefully crafted prompts instruct the model to recommend complementary items rather than just identifying what's on screen. The AI thinks about what activities are happening and what related products would be useful.
Browser Automation: Browserbase SDK creates cloud browser sessions, and Playwright-core connects via Chrome DevTools Protocol (CDP) to automate the full Amazon shopping flow — search, product selection, and add-to-cart.
Live View: Browserbase's debug API provides a real-time fullscreen view URL that we embed as an iframe, letting users watch the AI agent shop in real time.
Backend: A lightweight Express.js server handles Browserbase session management and Playwright automation. Runs on Node.js (required by Playwright — Bun is not supported).
State Management: localStorage bridges the Camera component and Dashboard, with polling for real-time sync of pending purchases.
Security: All API keys (OpenAI, Browserbase) stored in .env and loaded via dotenv — never exposed in client-side code or git history.
