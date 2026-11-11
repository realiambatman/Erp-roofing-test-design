import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState, Panel, SearchInput } from "@/components/layout/Panel";
import { StatStrip } from "@/components/layout/StatStrip";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatINR, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

const mockInventoryData = [
  {
    id: 1,
    item: "Asphalt Shingles",
    brand: "GAF",
    category: "Roofing Materials",
    quantity: 1500,
    unit: "bundles",
    unitPrice: 279.99,
    status: "In Stock",
    reorderPoint: 500,
    location: "Warehouse A",
    lastUpdated: "2024-03-15",
    warranty: "30 years",
    specifications: "Timberline HDZ, Weathered Wood color"
  },
  {
    id: 2,
    item: "Metal Roofing Panels",
    brand: "Metal Sales",
    category: "Roofing Materials",
    quantity: 200,
    unit: "sheets",
    unitPrice: 375.50,
    status: "Low Stock",
    reorderPoint: 250,
    location: "Warehouse B",
    lastUpdated: "2024-03-14",
    warranty: "40 years",
    specifications: "24 gauge, Standing Seam"
  },
  {
    id: 3,
    item: "Roofing Nails",
    brand: "Grip-Rite",
    category: "Fasteners",
    quantity: 25000,
    unit: "pieces",
    unitPrice: 0.85,
    status: "In Stock",
    reorderPoint: 10000,
    location: "Warehouse A",
    lastUpdated: "2024-03-13",
    warranty: "N/A",
    specifications: "1-1/4 inch, Hot-dipped galvanized"
  },
  {
    id: 4,
    item: "Underlayment",
    brand: "CertainTeed",
    category: "Roofing Materials",
    quantity: 45,
    unit: "rolls",
    unitPrice: 749.99,
    status: "In Stock",
    reorderPoint: 30,
    location: "Warehouse A",
    lastUpdated: "2024-03-12",
    warranty: "15 years",
    specifications: "DiamondDeck® Synthetic"
  },
  {
    id: 5,
    item: "Flashing Material",
    brand: "Custom-Bilt",
    category: "Accessories",
    quantity: 100,
    unit: "pieces",
    unitPrice: 99.75,
    status: "Critical",
    reorderPoint: 150,
    location: "Warehouse B",
    lastUpdated: "2024-03-11",
    warranty: "10 years",
    specifications: "Aluminum Step Flashing"
  },
  {
    id: 6,
    item: "Ridge Vent",
    brand: "Air Vent Inc",
    category: "Ventilation",
    quantity: 75,
    unit: "pieces",
    unitPrice: 74.99,
    status: "In Stock",
    reorderPoint: 50,
    location: "Warehouse A",
    lastUpdated: "2024-03-10",
    warranty: "5 years",
    specifications: "ShingleVent II"
  }
];

type StockFilter = "all" | "reorder";

const needsReorder = (status: string) => status === "Low Stock" || status === "Critical";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");

  const query = searchQuery.trim().toLowerCase();
  const visibleItems = mockInventoryData.filter(
    (item) =>
      (stockFilter === "all" || needsReorder(item.status)) &&
      [item.item, item.brand, item.category, item.location].some((field) => field.toLowerCase().includes(query))
  );

  // Calculate total inventory value
  const totalValue = mockInventoryData.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  // Count items by status
  const lowStockCount = mockInventoryData.filter(
    (item) => item.status === "Low Stock" || item.status === "Critical"
  ).length;

  // Calculate total unique items
  const totalItems = mockInventoryData.length;

  // Calculate total quantity across all items
  const totalQuantity = mockInventoryData.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <PageHeader
        title="Inventory Management"
        description="Track and manage your roofing materials inventory."
      />

      <StatStrip
        stats={[
          { label: "Total Items", value: totalItems, hint: "Distinct stock lines" },
          {
            label: "Low Stock Items",
            value: lowStockCount,
            hint: "At or below reorder point",
            tone: lowStockCount > 0 ? "attention" : "default",
          },
          { label: "Total Value", value: formatINR(totalValue), hint: "Quantity x unit price" },
          { label: "Total Quantity", value: formatNumber(totalQuantity), hint: "All units on hand" },
        ]}
      />

      <Panel
        title="Inventory List"
        aside={
          <span className="num">
            {visibleItems.length} of {totalItems}
          </span>
        }
        padded={false}
        toolbar={
          <>
            <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search inventory..." />
            <div role="group" aria-label="Stock filter" className="flex rounded-md border p-0.5">
              {(
                [
                  ["all", "All stock"],
                  ["reorder", "Needs reorder"],
                ] as const
              ).map(([value, label]) => (
                <Button
                  key={value}
                  variant="ghost"
                  size="sm"
                  aria-pressed={stockFilter === value}
                  onClick={() => setStockFilter(value)}
                  className={cn(
                    "h-6 rounded-[4px] text-muted-foreground",
                    stockFilter === value && "bg-secondary text-foreground hover:bg-secondary"
                  )}
                >
                  {label}
                </Button>
              ))}
            </div>
          </>
        }
      >
        {visibleItems.length === 0 ? (
          <EmptyState title="No stock lines match these filters" hint="Clear the search or switch back to all stock." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead numeric>Quantity</TableHead>
                <TableHead numeric>Reorder at</TableHead>
                <TableHead numeric>Unit Price</TableHead>
                <TableHead numeric>Total Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Specifications</TableHead>
                <TableHead numeric>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="whitespace-nowrap">
                    <div className="font-medium">{item.item}</div>
                    <div className="text-xs text-muted-foreground">{item.brand}</div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{item.category}</TableCell>
                  <TableCell numeric>
                    {formatNumber(item.quantity)} <span className="text-xs text-muted-foreground">{item.unit}</span>
                  </TableCell>
                  <TableCell numeric className="text-muted-foreground">
                    {formatNumber(item.reorderPoint)}
                  </TableCell>
                  <TableCell numeric>{formatINR(item.unitPrice, { paise: true })}</TableCell>
                  <TableCell numeric className="font-medium">
                    {formatINR(item.quantity * item.unitPrice)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{item.location}</TableCell>
                  <TableCell className="min-w-[13rem]">
                    <div>{item.specifications}</div>
                    <div className="text-xs text-muted-foreground">Warranty: {item.warranty}</div>
                  </TableCell>
                  <TableCell numeric>{formatDate(item.lastUpdated)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Panel>
    </>
  );
};

export default Inventory;
