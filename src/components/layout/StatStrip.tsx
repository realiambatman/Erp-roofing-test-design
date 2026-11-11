import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Stat = {
  label: string;
  value: ReactNode;
  /** Short qualifier under the figure, e.g. "Last 6 months". */
  hint?: ReactNode;
  /** Colours the figure. Use sparingly: amber for attention, red for loss. */
  tone?: "default" | "attention" | "critical";
};

const toneClass = {
  default: "",
  attention: "text-warning-foreground",
  critical: "text-destructive",
};

/** A single ruled band of figures. Replaces a row of separate KPI cards. */
export function StatStrip({ stats, className }: { stats: Stat[]; className?: string }) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border",
        stats.length === 3 ? "sm:grid-cols-3" : "lg:grid-cols-4",
        className
      )}
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={cn(
            "flex min-w-0 flex-col bg-card px-4 py-3",
            stats.length % 2 === 1 && index === stats.length - 1 && "col-span-2 sm:col-span-1"
          )}
        >
          <dt className="truncate text-xs text-muted-foreground">{stat.label}</dt>
          <dd
            className={cn(
              "num font-display mt-1 text-2xl font-semibold leading-none",
              toneClass[stat.tone ?? "default"]
            )}
          >
            {stat.value}
          </dd>
          {stat.hint ? (
            <dd className="mt-1.5 truncate text-xs text-muted-foreground">{stat.hint}</dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
