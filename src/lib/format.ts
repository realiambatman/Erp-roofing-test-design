const inrWhole = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inrPaise = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const inrCompact = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  notation: "compact",
  maximumFractionDigits: 1,
});

const plainNumber = new Intl.NumberFormat("en-IN");

/**
 * The one place rupee amounts are formatted. Whole rupees by default with
 * Indian digit grouping (₹12,50,000). Pass `paise` for rates and small
 * amounts that need two decimals, or `compact` for chart axes (₹4L).
 */
export function formatINR(
  amount: number,
  options: { paise?: boolean; compact?: boolean } = {}
): string {
  if (!Number.isFinite(amount)) return "₹0";
  if (options.compact) return inrCompact.format(amount);
  return (options.paise ? inrPaise : inrWhole).format(amount);
}

export function formatNumber(value: number): string {
  return plainNumber.format(value);
}

/** 2024-03-15 -> 15 Mar 2024. Leaves anything it cannot parse untouched. */
export function formatDate(value: string | Date | undefined | null): string {
  if (!value) return "-";
  const date = typeof value === "string" ? new Date(`${value}T00:00:00`) : value;
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
