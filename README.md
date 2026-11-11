# Roofing ERP Dashboard (design prototype)

A front-end design prototype of an ERP dashboard for a roofing contractor. It lays out the screens such a system would need (projects, estimates, work orders, scheduling, inventory, suppliers, invoicing, payroll, safety and so on) as a single-page React app.

This is a UI design exercise, not a working ERP. There is no backend, database, authentication or API. Every page renders hard-coded sample data defined at the top of its own file, and nothing you do in the UI is saved.

## Screens

| Route | Page | What it shows |
| --- | --- | --- |
| `/` | Dashboard | KPI cards, recent activity, upcoming deadlines |
| `/projects` | Projects | Project cards with status, searchable |
| `/estimates` | Estimates & Quotes | Estimate list with a detail dialog |
| `/analytics` | Analytics | Sales, expenses and profit charts (Recharts) |
| `/employees` | Employees | Team member cards, searchable |
| `/customers` | Customers | Customer table with a detail dialog |
| `/inventory` | Inventory | Stock table with value totals |
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

What actually works: navigation between pages, client-side search filtering on the list pages, tabs, detail dialogs, the schedule calendar/list toggle, and responsive layout with a collapsible sidebar. Buttons such as "Add", "Edit" and "Delete" are visual only (delete on the Customers page just shows a toast).

## Tech stack

- React 18 and TypeScript
- Vite 5 (SWC React plugin)
- Tailwind CSS 3 with `tailwindcss-animate`
- shadcn/ui components on Radix UI primitives
- React Router 6
- Recharts for charts
- lucide-react icons, date-fns, react-day-picker, sonner

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
  App.tsx               Route table
  index.css             Tailwind layers and theme CSS variables
  components/
    AppSidebar.tsx      Main navigation sidebar
    ui/                 shadcn/ui components used by the pages
  hooks/                use-mobile, use-toast
  lib/utils.ts          className helper
  pages/                One file per screen, each with its own mock data
tailwind.config.ts      Theme and animation config
vite.config.ts          Vite config with the `@` -> `src` alias
```

## Known limitations

- All data is mock data embedded in the page components; there is no shared data layer, so figures are not consistent between pages.
- No persistence, forms do not submit, and most action buttons have no handler.
- No authentication or user roles.
- Amounts are displayed in Indian rupees, but formatting is not uniform across pages.
- The production bundle is a single chunk of roughly 950 kB (no code splitting), so Vite prints a chunk-size warning on build.
- TypeScript runs with `strict` disabled.
- There are no automated tests.
- `npm audit` still reports issues in Vite/esbuild, React Router and typescript-eslint's dependencies that can only be cleared with major version upgrades.
