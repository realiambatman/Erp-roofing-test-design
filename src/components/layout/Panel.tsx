import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PanelProps = {
  title?: string;
  /** Right side of the header row: a count, a period, a small control. */
  aside?: ReactNode;
  /** Filter row rendered under the header, above the content. */
  toolbar?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Set to false for tables, which run edge to edge. */
  padded?: boolean;
};

/** Bordered surface with an optional ruled header. Used for tables, charts and lists. */
export function Panel({ title, aside, toolbar, children, className, padded = true }: PanelProps) {
  return (
    <section className={cn("min-w-0 overflow-hidden rounded-lg border bg-card", className)}>
      {title || aside ? (
        <div className="flex min-h-10 items-center justify-between gap-3 border-b px-4 py-2">
          {title ? <h2 className="text-sm font-semibold">{title}</h2> : <span />}
          {aside ? <div className="text-xs text-muted-foreground">{aside}</div> : null}
        </div>
      ) : null}
      {toolbar ? (
        <div className="flex flex-wrap items-center gap-2 border-b px-4 py-2">{toolbar}</div>
      ) : null}
      <div className={cn(padded && "p-4")}>{children}</div>
    </section>
  );
}

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
};

export function SearchInput({ value, onChange, placeholder, className }: SearchInputProps) {
  return (
    <div className={cn("relative w-full sm:max-w-xs", className)}>
      <Search
        aria-hidden
        className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="search"
        className="pl-8"
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

/** Shown when a list or table has nothing to display. */
export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
      <p className="text-sm font-medium">{title}</p>
      {hint ? <p className="mt-1 max-w-sm text-sm text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

/** Thin progress bar with an accessible value. */
export function Meter({
  value,
  tone = "default",
  label,
  className,
}: {
  value: number;
  tone?: "default" | "attention" | "critical" | "success";
  label: string;
  className?: string;
}) {
  const fill = {
    default: "bg-primary",
    attention: "bg-warning",
    critical: "bg-destructive",
    success: "bg-success",
  }[tone];
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-secondary", className)}
    >
      <div className={cn("h-full rounded-full", fill)} style={{ width: `${clamped}%` }} />
    </div>
  );
}

/** Label and value pair for detail dialogs. */
export function Field({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("min-w-0", className)}>
      <dt className="field-label">{label}</dt>
      <dd className="mt-0.5 break-words text-sm">{children}</dd>
    </div>
  );
}
