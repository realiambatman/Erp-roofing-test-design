import { Edit, Eye, FileText, Mail, MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState, Field, Panel, SearchInput } from "@/components/layout/Panel";
import { StatStrip } from "@/components/layout/StatStrip";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate, formatINR } from "@/lib/format";

// Mock estimates data
const estimatesData = [
  {
    id: 1,
    number: "EST-2024-001",
    customerName: "John Smith",
    projectTitle: "Roof Replacement",
    date: "2024-03-15",
    expiryDate: "2024-04-15",
    amount: 12500.00,
    status: "pending",
    notes: "Complete tear-off and replacement with architectural shingles",
    materials: [
      { item: "Architectural Shingles", quantity: 40, unitPrice: 150.00 },
      { item: "Underlayment", quantity: 10, unitPrice: 89.99 },
      { item: "Ridge Vents", quantity: 8, unitPrice: 45.00 }
    ],
    labor: {
      hours: 45,
      rate: 75.00
    }
  },
  {
    id: 2,
    number: "EST-2024-002",
    customerName: "Sarah Johnson",
    projectTitle: "Gutter Installation",
    date: "2024-03-16",
    expiryDate: "2024-04-16",
    amount: 3200.00,
    status: "accepted",
    notes: "New seamless gutter installation with leaf guards",
    materials: [
      { item: "Seamless Gutters", quantity: 120, unitPrice: 12.50 },
      { item: "Leaf Guards", quantity: 120, unitPrice: 8.75 },
      { item: "Downspouts", quantity: 6, unitPrice: 45.00 }
    ],
    labor: {
      hours: 16,
      rate: 65.00
    }
  }
];

type Estimate = typeof estimatesData[0];

const EstimateDetails = ({ estimate }: { estimate: Estimate }) => {
  const materialsCost = estimate.materials.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const laborCost = estimate.labor.hours * estimate.labor.rate;

  return (
    <div className="space-y-4">
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Field label="Customer">{estimate.customerName}</Field>
        <Field label="Estimate Number">
          <span className="num">{estimate.number}</span>
        </Field>
        <Field label="Issued">
          <span className="num">{formatDate(estimate.date)}</span>
        </Field>
        <Field label="Valid until">
          <span className="num">{formatDate(estimate.expiryDate)}</span>
        </Field>
      </dl>

      <div className="overflow-hidden rounded-md border">
        <Table containerClassName="max-h-none">
          <TableHeader>
            <TableRow>
              <TableHead>Materials</TableHead>
              <TableHead numeric>Quantity</TableHead>
              <TableHead numeric>Unit Price</TableHead>
              <TableHead numeric>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {estimate.materials.map((material) => (
              <TableRow key={material.item}>
                <TableCell>{material.item}</TableCell>
                <TableCell numeric>{material.quantity}</TableCell>
                <TableCell numeric>{formatINR(material.unitPrice, { paise: true })}</TableCell>
                <TableCell numeric>{formatINR(material.quantity * material.unitPrice, { paise: true })}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                Labor
                <span className="num block text-xs text-muted-foreground sm:ml-2 sm:inline">
                  {estimate.labor.hours} hours @ {formatINR(estimate.labor.rate, { paise: true })}/hr
                </span>
              </TableCell>
              <TableCell numeric>{estimate.labor.hours}</TableCell>
              <TableCell numeric>{formatINR(estimate.labor.rate, { paise: true })}</TableCell>
              <TableCell numeric>{formatINR(laborCost, { paise: true })}</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="font-normal text-muted-foreground">
                Materials
              </TableCell>
              <TableCell numeric className="font-normal">
                {formatINR(materialsCost, { paise: true })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="!border-t-0 font-normal text-muted-foreground">
                Labor
              </TableCell>
              <TableCell numeric className="!border-t-0 font-normal">
                {formatINR(laborCost, { paise: true })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell numeric className="font-semibold">
                {formatINR(estimate.amount, { paise: true })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <dl>
        <Field label="Notes">{estimate.notes}</Field>
      </dl>
    </div>
  );
};

const Estimates = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const filteredEstimates = estimatesData.filter(
    (estimate) =>
      estimate.customerName.toLowerCase().includes(query) || estimate.number.toLowerCase().includes(query)
  );

  const totalValue = estimatesData.reduce((sum, estimate) => sum + estimate.amount, 0);
  const pending = estimatesData.filter((estimate) => estimate.status === "pending");
  const accepted = estimatesData.filter((estimate) => estimate.status === "accepted");

  return (
    <>
      <PageHeader
        title="Estimates & Quotes"
        description="Create and manage customer estimates"
        actions={
          <Button>
            <Plus />
            New Estimate
          </Button>
        }
      />

      <StatStrip
        stats={[
          { label: "Quoted value", value: formatINR(totalValue), hint: `${estimatesData.length} estimates` },
          {
            label: "Awaiting reply",
            value: formatINR(pending.reduce((sum, estimate) => sum + estimate.amount, 0)),
            hint: `${pending.length} pending`,
            tone: pending.length > 0 ? "attention" : "default",
          },
          {
            label: "Accepted",
            value: formatINR(accepted.reduce((sum, estimate) => sum + estimate.amount, 0)),
            hint: `${accepted.length} accepted`,
          },
        ]}
      />

      <Panel
        padded={false}
        toolbar={
          <>
            <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search estimates..." />
            <span className="num ml-auto text-xs text-muted-foreground">
              {filteredEstimates.length} of {estimatesData.length}
            </span>
          </>
        }
      >
        {filteredEstimates.length === 0 ? (
          <EmptyState title="No estimates match this search" hint="Try a customer name or an estimate number." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Valid until</TableHead>
                <TableHead numeric>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEstimates.map((estimate) => (
                <TableRow key={estimate.id}>
                  <TableCell className="num font-medium">{estimate.number}</TableCell>
                  <TableCell className="whitespace-nowrap">{estimate.customerName}</TableCell>
                  <TableCell className="whitespace-nowrap">{estimate.projectTitle}</TableCell>
                  <TableCell className="num">{formatDate(estimate.date)}</TableCell>
                  <TableCell className="num text-muted-foreground">{formatDate(estimate.expiryDate)}</TableCell>
                  <TableCell numeric className="font-medium">
                    {formatINR(estimate.amount, { paise: true })}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={estimate.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7" aria-label={`Actions for ${estimate.number}`}>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[700px]">
                            <DialogHeader>
                              <DialogTitle>Estimate Details</DialogTitle>
                              <DialogDescription>{estimate.projectTitle}</DialogDescription>
                            </DialogHeader>
                            <EstimateDetails estimate={estimate} />
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send to Customer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          Generate PDF
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Panel>
    </>
  );
};

export default Estimates;
