import * as React from "react"

import { cn } from "@/lib/utils"

type TableProps = React.HTMLAttributes<HTMLTableElement> & {
  /** Classes for the scroll container. Defaults to a viewport-bound height so the header stays pinned. */
  containerClassName?: string
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, containerClassName, ...props }, ref) => (
    <div
      className={cn(
        "relative max-h-[calc(100svh-9rem)] w-full overflow-auto",
        containerClassName
      )}
    >
      <table
        ref={ref}
        className={cn("w-full caption-bottom border-separate border-spacing-0 text-sm", className)}
        {...props}
      />
    </div>
  )
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn(className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child>td]:border-b-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-muted font-medium [&_td]:border-b-0 [&_td]:border-t", className)}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "transition-colors data-[state=selected]:bg-accent [tbody>&:hover]:bg-accent/60",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

type CellAlign = { numeric?: boolean }

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & CellAlign
>(({ className, numeric, ...props }, ref) => (
  <th
    ref={ref}
    scope="col"
    className={cn(
      "sticky top-0 z-10 h-9 whitespace-nowrap border-b bg-muted px-3 text-left align-middle text-xs font-medium text-muted-foreground first:pl-4 last:pr-4",
      numeric && "text-right",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & CellAlign
>(({ className, numeric, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "border-b px-3 py-2 align-middle first:pl-4 last:pr-4",
      numeric && "num text-right",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
