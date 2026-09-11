# QuoteRate

A pricing and quotation calculator for freelance web developers — turns project scope, features, complexity, and your own business economics into a transparent, defensible client quote. Built for [@fazal.is-a.dev](https://fazal.is-a.dev/).

QuoteRate is not a hourly-rate multiplier toy. It walks a real pipeline — base project → scope → features → complexity → experience/market positioning → urgency → contingency → a Minimum/Recommended/Premium range — and shows its work at every step, so you can explain a number to a client instead of just handing one over.

## Live Demo

**[quote-rate-fz17.vercel.app](https://quote-rate-fz17.vercel.app)**

## Features

- **Hourly Rate Calculator** — a sustainable rate from your income target, business costs, tax, margin, and realistic billable hours (working hours ≠ billable hours).
- **Project Calculator** — project type, complexity, standard + custom pages, a 30-feature catalog across 7 categories (auth, database, admin, payments, communication, integrations, advanced), experience/specialization/market-positioning/urgency modifiers, contingency, and revision rounds.
- **Calculation engine** — every quote is broken down by category (Design, Frontend, Backend, Database, Admin, Integrations, Testing, Deployment), fully inspectable via "How was this calculated?".
- **AI Pricing Assistant** — describe a project in plain language; a fully local, offline keyword matcher (no API, nothing sent anywhere) suggests a project type, features, and complexity for you to review and edit before anything is applied.
- **Comparison Mode** — auto-generates Basic/Standard/Premium scope tiers for a project type, priced through the same engine.
- **Quote Builder & History** — save quotes, edit/duplicate them, track status (Draft → Sent → Accepted/Rejected/Expired).
- **Client-facing quotes** — a clean, professional document (on-screen, printable, and downloadable as a real PDF) that never leaks internal pricing mechanics like multipliers or contingency percentages.
- **Live currency** — USD/PKR conversion via a free, keyless exchange-rate API, always falling back to a user-configured static rate if unavailable, with the source/date shown whenever a live rate is used.
- **Settings** — your profile, branding (including a logo), currency, market positioning context, and quote defaults, all editable and persisted locally.

## Tech stack

- **React 19 + Vite** — plain JavaScript/JSX, no TypeScript.
- **Tailwind CSS v4** — centralized design tokens (`src/index.css`), light/dark theme support.
- **Zustand** — state management with `localStorage` persistence (business profile, calculator draft, quote history), wrapped to degrade gracefully if storage is unavailable.
- **React Router** — client-side routing.
- **jsPDF** — client-facing quote PDF export, lazy-loaded on demand so it doesn't bloat the initial bundle.

No backend, no database, no accounts — everything runs and persists in your browser.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (Vite's default is `http://localhost:5173`).

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint       # oxlint
```

## Environment variables

None required. The AI Pricing Assistant and currency conversion both work entirely without API keys — the assistant is a local keyword matcher, and the exchange-rate lookup uses a free, unauthenticated public API ([open.er-api.com](https://www.exchangerate-api.com/docs/free)).

If you later want the AI Pricing Assistant to use a real LLM instead of keyword matching, that would go through OpenRouter with a user-supplied key entered in Settings — never hardcoded, never sent anywhere but OpenRouter directly. This isn't wired up yet.

## Project structure

```
src/
├── components/    # Reusable UI primitives (Card, NumberField, RadioCardGroup, ...) and layout (AppShell, PageHeader)
├── config/        # Centralized, editable pricing/business configuration — no numbers hardcoded in components
├── features/      # Feature modules: calculator, quotes, ai, compare, settings
├── hooks/         # Cross-cutting hooks (useExchangeRate)
├── services/      # External API calls (currencyRate.js)
├── store/         # Zustand stores (business profile, calculator draft, quote history)
└── utils/         # Pure calculation logic (pricingEngine, hourlyRate, scopeHours, ...)
```

Every number that affects a price lives in `src/config/pricingConfig.js` and `src/config/businessDefaults.js` — both are development defaults, meant to be edited (via Settings, or directly) as you calibrate the tool to your own work.

## A note on the numbers

Feature hours, multipliers, and contingency defaults in `pricingConfig.js` are starting-point estimates, not market benchmarks — QuoteRate does not claim to know "the" correct market price for anything. Where the app shows externally-sourced data (currently just the live exchange rate), it's always labeled with its source and timestamp. Everything else is your own configured business logic, applied consistently.

## Deployment

Deployed on Vercel. Build command `npm run build`, output directory `dist`, no environment variables required.
