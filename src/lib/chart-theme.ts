// Shared Recharts styling so every chart reads from the theme tokens and
// follows the light/dark switch without re-rendering.
export const chartColors = {
  primary: "hsl(var(--chart-1))",
  accent: "hsl(var(--chart-2))",
  neutral: "hsl(var(--chart-3))",
  negative: "hsl(var(--chart-negative))",
  grid: "hsl(var(--chart-grid))",
  axis: "hsl(var(--muted-foreground))",
};

export const axisProps = {
  tickLine: false,
  axisLine: false,
  tick: { fill: chartColors.axis, fontSize: 12 },
} as const;

export const gridProps = {
  stroke: chartColors.grid,
  vertical: false,
} as const;

export const tooltipProps = {
  cursor: { fill: "hsl(var(--accent))", stroke: "hsl(var(--border))" },
  contentStyle: {
    background: "hsl(var(--popover))",
    border: "1px solid hsl(var(--border))",
    borderRadius: 6,
    boxShadow: "0 6px 20px -8px hsl(218 30% 10% / 0.35)",
    color: "hsl(var(--popover-foreground))",
    fontSize: 12,
    padding: "6px 10px",
  },
  labelStyle: { color: "hsl(var(--muted-foreground))", marginBottom: 2 },
  itemStyle: { color: "hsl(var(--popover-foreground))", padding: 0 },
} as const;
