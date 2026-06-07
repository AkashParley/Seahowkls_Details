# Seahowlks Topup Details

**Professional Profit Settlement Dashboard**

A production-ready fintech SaaS dashboard for calculating MT5 profit settlements with real-time computation, PDF/PNG export, and professional reporting.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| UI Components | Shadcn/UI + Custom |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| PDF Export | jsPDF |
| PNG Export | html2canvas |
| Toasts | Sonner |
| Fonts | DM Sans + JetBrains Mono |

---

## Project Structure

```
seahowlks/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles, fonts, animations
│   │   ├── layout.tsx           # Root layout with metadata
│   │   └── page.tsx             # Main dashboard page
│   ├── components/
│   │   ├── layout/
│   │   │   └── Header.tsx       # Sticky header with live badge
│   │   └── dashboard/
│   │       ├── TopupForm.tsx    # Input form with validation
│   │       ├── PendingProfitHero.tsx  # Animated profit display
│   │       ├── StatsBar.tsx     # Quick stats chips
│   │       ├── SummaryCard.tsx  # Full summary details
│   │       └── ActionButtons.tsx     # Copy/PDF/PNG actions
│   ├── hooks/
│   │   ├── useTopupCalculator.ts  # Core calculation hook
│   │   └── useExport.ts           # Export logic hook
│   ├── lib/
│   │   ├── utils.ts           # Formatters, calculators, helpers
│   │   ├── validations.ts     # Zod schemas
│   │   └── export.ts          # PDF & PNG export utilities
│   └── types/
│       └── index.ts           # TypeScript type definitions
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.mjs
```

---

## Installation & Setup

```bash
# 1. Clone or copy the project
cd seahowlks

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Core Calculation

```
Pending Profit = Deposit × Profit Share %

Examples:
  Deposit: $10,000 @ 60% = $6,000
  Deposit: $10,000 @ 70% = $7,000
```

Calculation updates **instantly** on every keystroke — no submit required.

---

## Features

- **Live Calculation** — Pending profit updates in real-time with animated transitions
- **Form Validation** — Zod-powered validation with elegant error messages
- **Copy Summary** — Formatted text report to clipboard
- **Download PDF** — Professional A4 PDF with all details via jsPDF
- **Download PNG** — Summary card exported as high-res PNG via html2canvas
- **Responsive** — Mobile-first, works on all screen sizes
- **Dark Mode** — Premium dark theme by default

---

## Design

- **Background**: `#09090B`
- **Cards**: `#111827`
- **Primary**: `#6366F1` (Indigo)
- **Secondary**: `#8B5CF6` (Violet)
- **Success**: `#10B981` (Emerald)
- **Typography**: DM Sans (UI) + JetBrains Mono (numbers)

---

## Build for Production

```bash
npm run build
npm start
```
