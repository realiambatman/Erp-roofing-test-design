# Roofing ERP Dashboard (design prototype)

A front-end design prototype of an ERP dashboard for a roofing contractor. It lays out the screens such a system would need (projects, estimates, work orders, scheduling, inventory, suppliers, invoicing, payroll, safety and so on) as a single-page React app.

This is a UI design exercise, not a working ERP. There is no backend, database, authentication or API. Every page renders hard-coded sample data defined at the top of its own file, and nothing you do in the UI is saved.

## Screens

| Route | Page | What it shows |
| --- | --- | --- |
| `/` | Dashboard | KPI strip, recent activity, upcoming deadlines |
| `/projects` | Projects | Project records with status and progress, searchable |
| `/estimates` | Estimates & Quotes | Estimate list with a detail dialog |
| `/analytics` | Analytics | Sales, expenses and profit charts (Recharts) |
| `/employees` | Employees | Team member records, searchable |
| `/customers` | Customers | Customer table with a detail dialog |
| `/inventory` | Inventory | Stock table with value totals, search and a reorder filter |
| `/schedule` | Schedule | Calendar and list views of scheduled jobs |
| `/payroll` | Payroll | Payroll summary table |
| `/work-orders` | Work Orders | Work order table with status and priority badges |
| `/time-tracking` | Time Tracking | Timesheet entries by date |
| `/equipment` | Equipment | Equipment list with maintenance records |
| `/safety` | Safety Compliance | Incidents, inspections and certifications tabs |
| `/suppliers` | Suppliers | Supplier table with products and orders |
| `/invoicing` | Invoicing & Billing | Invoice table with a line-item detail dialog |
| `/settings` | Settings | Settings form layout |
| `*` | Not found | 404 page |

What actually works: navigation between pages, client-side search filtering on the list pages, the status filter on Time Tracking, the reorder filter on Inventory, tabs, detail dialogs, the schedule calendar/list toggle, the light/dark theme toggle (top bar, or Settings > Preferences), and a responsive layout whose sidebar collapses to an icon rail on desktop and opens as a drawer on phones. Buttons such as "Add", "Edit" and "Delete" are visual only (delete on the Customers page just shows a toast).

## Tech stack

- React 18 and TypeScript
- Vite 5 (SWC React plugin)
- Tailwind CSS 3 with `tailwindcss-animate`
- shadcn/ui components on Radix UI primitives
- React Router 6
- Recharts for charts
- lucide-react icons, date-fns, react-day-picker, sonner
- next-themes for the light/dark theme, IBM Plex Sans (self-hosted through `@fontsource-variable/ibm-plex-sans`)

## Design system

The look is a dense, quiet operations tool rather than a marketing page.

- **Colour**: cool-grey surfaces, a slate-blue primary and one amber accent reserved for things that need attention. Red appears only for losses and critical states. All colours are HSL CSS variables in `src/index.css`, with a full `.dark` set; charts read the same variables through `src/lib/chart-theme.ts`.
- **Type**: IBM Plex Sans throughout on a compact scale (13px body). Page titles and large figures use the condensed width of the same variable font (`.font-display`). Numbers are tabular everywhere.
- **Status**: every status and priority goes through `src/components/StatusBadge.tsx`, which maps the text to one of five tones (neutral, info, attention, critical, success).
- **Money**: every rupee amount goes through `formatINR` in `src/lib/format.ts` (Indian digit grouping, optional paise, compact form for chart axes). Dates go through `formatDate`.
- **Page pattern**: `PageHeader` (title, description, actions), an optional `StatStrip` (one ruled band of figures), then `Panel`s holding a filter toolbar and a table with a sticky header, right-aligned numeric columns and row hover.

## Prerequisites

- Node.js 18 or newer
- npm

## Setup

```sh
npm install
npm run dev
```

The dev server runs on http://localhost:8080.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite dev server on port 8080 |
| `npm run build` | Production build into `dist/` |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Type-check the app with `tsc --noEmit` |
| `npm run lint` | Run ESLint |

## Environment variables

None. The app reads no environment variables and makes no network requests.

## Project structure

```
index.html              HTML entry point
public/                 Static assets (favicon)
src/
  main.tsx              React entry point
  App.tsx               Theme provider and route table
  index.css             Tailwind layers and light/dark theme CSS variables
  components/
    AppSidebar.tsx      Grouped, collapsible navigation sidebar
    navigation.ts       Sidebar groups and breadcrumb lookup
    StatusBadge.tsx     Status pill with a shared tone vocabulary
    ThemeToggle.tsx     Light/dark switch
    layout/             AppLayout (shell), PageHeader, StatStrip, Panel helpers
    ui/                 shadcn/ui components used by the pages
  hooks/                use-mobile, use-toast
  lib/
    format.ts           formatINR, formatNumber, formatDate
    chart-theme.ts      Shared Recharts axis, grid and tooltip styling
    utils.ts            className helper
  pages/                One file per screen, each with its own mock data
tailwind.config.ts      Theme tokens, type scale and animation config
vite.config.ts          Vite config with the `@` -> `src` alias
```

## Known limitations

- All data is mock data embedded in the page components; there is no shared data layer, so figures are not consistent between pages.
- No persistence, forms do not submit, and most action buttons have no handler.
- No authentication or user roles.
- Amounts are formatted consistently as Indian rupees, but the sample figures themselves were written at very different scales from page to page.
- The production bundle is a single chunk of roughly 950 kB (no code splitting), so Vite prints a chunk-size warning on build.
- TypeScript runs with `strict` disabled.
- There are no automated tests.
- `npm audit` still reports issues in Vite/esbuild, React Router and typescript-eslint's dependencies that can only be cleared with major version upgrades.
