import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusTone = "neutral" | "info" | "attention" | "critical" | "success";

// One vocabulary for every status in the app. Amber is the only loud colour
// and is reserved for things that need someone's attention.
const toneByStatus: Record<string, StatusTone> = {
  active: "success",
  available: "success",
  approved: "success",
  accepted: "success",
  completed: "success",
  compliant: "success",
  operational: "success",
  paid: "success",
  passed: "success",
  resolved: "success",
  delivered: "success",
  valid: "success",
  "in stock": "success",
  "on track": "success",
  low: "neutral",

  "in progress": "info",
  "in use": "info",
  "in transit": "info",
  open: "info",
  sent: "info",
  scheduled: "info",
  processing: "info",
  investigated: "info",

  pending: "attention",
  "pending review": "attention",
  "low stock": "attention",
  "under maintenance": "attention",
  maintenance: "attention",
  "maintenance required": "attention",
  "needs attention": "attention",
  "expiring soon": "attention",
  "under investigation": "attention",
  investigating: "attention",
  "under review": "attention",
  "action required": "attention",
  medium: "attention",
  minor: "attention",
  moderate: "attention",
  "due soon": "attention",

  delayed: "critical",
  overdue: "critical",
  urgent: "critical",
  high: "critical",
  critical: "critical",
  major: "critical",
  severe: "critical",
  expired: "critical",
  failed: "critical",
  suspended: "critical",
  rejected: "critical",
  "out of stock": "critical",
  "out of service": "critical",

  draft: "neutral",
  inactive: "neutral",
  cancelled: "neutral",
  "on hold": "neutral",
};

const dotClass: Record<StatusTone, string> = {
  neutral: "bg-muted-foreground/60",
  info: "bg-primary",
  attention: "bg-warning",
  critical: "bg-destructive",
  success: "bg-success",
};

const normalise = (status: string) => status.toLowerCase().replace(/[_-]+/g, " ").trim();

const statusTone = (status: string): StatusTone => toneByStatus[normalise(status)] ?? "neutral";

const sentenceCase = (status: string) => {
  const text = normalise(status);
  return text.charAt(0).toUpperCase() + text.slice(1);
};

type StatusBadgeProps = {
  status: string;
  tone?: StatusTone;
  className?: string;
};

export function StatusBadge({ status, tone, className }: StatusBadgeProps) {
  const resolved = tone ?? statusTone(status);
  return (
    <Badge variant={resolved} className={className}>
      <span aria-hidden className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dotClass[resolved])} />
      {sentenceCase(status)}
    </Badge>
  );
}
