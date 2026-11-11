import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  /** Primary action and any secondary buttons, right-aligned on wide screens. */
  actions?: ReactNode;
};

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="font-display text-2xl font-semibold leading-tight">{title}</h1>
        {description ? (
          <p className="mt-0.5 max-w-[70ch] text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2 [&>*]:flex-1 sm:[&>*]:flex-none">
          {actions}
        </div>
      ) : null}
    </header>
  );
}
