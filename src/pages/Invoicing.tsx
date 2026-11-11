import { ArrowUpRight, Download, FileText, Mail, MoreHorizontal, Plus, Printer } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState, Field, Panel, SearchInput } from "@/components/layout/Panel";
import { StatStrip } from "@/components/layout/StatStrip";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate, formatINR } from "@/lib/format";

// Mock invoices data
const invoicesData = [
  {
    id: "INV-2024-001",
    customerId: "CUST-001",
    customerName: "John Smith",
    projectId: "PRJ-2024-001",
    projectTitle: "Roof Replacement",
    date: "2024-03-15",
    dueDate: "2024-04-14",
    amount: 12500.00,
    status: "paid",
    paymentMethod: "credit_card",
    paymentDate: "2024-03-16",
    items: [
      { description: "Architectural Shingles", quantity: 40, rate: 150.00, amount: 6000.00 },
      { description: "Underlayment", quantity: 10, rate: 89.99, amount: 899.90 },
      { description: "Labor - Installation", hours: 45, rate: 75.00, amount: 3375.00 },
      { description: "Disposal Fee", quantity: 1, rate: 750.00, amount: 750.00 }
    ],
    notes: "Thank you for your business!",
    terms: "Net 30"
  },
  {
    id: "INV-2024-002",
    customerId: "CUST-002",
    customerName: "Sarah Johnson",
    projectId: "PRJ-2024-002",
    projectTitle: "Gutter Installation",
    date: "2024-03-16",
    dueDate: "2024-04-15",
    amount: 3200.00,
    status: "pending",
    items: [
      { description: "Seamless Gutters", quantity: 120, rate: 12.50, amount: 1500.00 },
      { description: "Leaf Guards", quantity: 120, rate: 8.75, amount: 1050.00 },
      { description: "Labor - Installation", hours: 10, rate: 65.00, amount: 650.00 }
    ],
    notes: "Please pay within 30 days",
    terms: "Net 30"
  }
];

type Invoice = typeof invoicesData[0];

const InvoiceDetails = ({ invoice }: { invoice: Invoice }) => {
  const subtotal = invoice.items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + tax;

  return (
    <div className="space-y-4">
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Field label="Bill To">
          <span className="font-medium">{invoice.customerName}</span>
          <span className="num block text-xs text-muted-foreground">Customer ID: {invoice.customerId}</span>
        </Field>
        <Field label="Project">
          {invoice.projectTitle}
          <span className="num block text-xs text-muted-foreground">Project ID: {invoice.projectId}</span>
        </Field>
        <Field label="Invoice #">
          <span className="num">{invoice.id}</span>
        </Field>
        <Field label="Date">
          <span className="num">{formatDate(invoice.date)}</span>
        </Field>
        <Field label="Due Date">
          <span className="num">{formatDate(invoice.dueDate)}</span>
        </Field>
        <Field label="Status">
          <StatusBadge status={invoice.status} />
        </Field>
      </dl>

      <div className="overflow-hidden rounded-md border">
        <Table containerClassName="max-h-none" className="table-compact">
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead numeric>Qty/Hours</TableHead>
              <TableHead numeric>Rate</TableHead>
              <TableHead numeric>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.items.map((item) => (
              <TableRow key={item.description}>
                <TableCell>{item.description}</TableCell>
                <TableCell numeric>{item.quantity || item.hours}</TableCell>
                <TableCell numeric>{formatINR(item.rate, { paise: true })}</TableCell>
                <TableCell numeric>{formatINR(item.amount, { paise: true })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-right font-normal text-muted-foreground">
                Subtotal
              </TableCell>
              <TableCell numeric className="font-normal">
                {formatINR(subtotal, { paise: true })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="!border-t-0 text-right font-normal text-muted-foreground">
                Tax (8%)
              </TableCell>
              <TableCell numeric className="!border-t-0 font-normal">
                {formatINR(tax, { paise: true })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="text-right">
                Total
              </TableCell>
              <TableCell numeric className="font-semibold">
                {formatINR(total, { paise: true })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Notes" className="sm:col-span-2">
          {invoice.notes}
        </Field>
        <Field label="Terms">{invoice.terms}</Field>
      </dl>
    </div>
  );
};

const Invoicing = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const filteredInvoices = invoicesData.filter(
    (invoice) => invoice.customerName.toLowerCase().includes(query) || invoice.id.toLowerCase().includes(query)
  );

  const totalRevenue = invoicesData.reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingInvoices = invoicesData.filter((invoice) => invoice.status === "pending");
  const pendingAmount = pendingInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <>
      <PageHeader
        title="Invoicing & Billing"
        description="Manage customer invoices and payments"
        actions={
          <Button>
            <Plus />
            Create Invoice
          </Button>
        }
      />

      <StatStrip
        stats={[
          { label: "Total Revenue", value: formatINR(totalRevenue), hint: `${invoicesData.length} invoices` },
          {
            label: "Pending Payments",
            value: formatINR(pendingAmount),
            hint: `${pendingInvoices.length} awaiting payment`,
            tone: pendingAmount > 0 ? "attention" : "default",
          },
          { label: "Overdue", value: formatINR(0), hint: "Nothing past due" },
          { label: "Payment Rate", value: "95%", hint: "Paid on time" },
        ]}
      />

      <Panel
        padded={false}
        toolbar={
          <>
            <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search invoices..." />
            <span className="num ml-auto text-xs text-muted-foreground">
              {filteredInvoices.length} of {invoicesData.length}
            </span>
          </>
        }
      >
        {filteredInvoices.length === 0 ? (
          <EmptyState title="No invoices match this search" hint="Try a customer name or an invoice number." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead numeric>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="num font-medium">{invoice.id}</TableCell>
                  <TableCell className="whitespace-nowrap">{invoice.customerName}</TableCell>
                  <TableCell className="whitespace-nowrap">{invoice.projectTitle}</TableCell>
                  <TableCell className="num">{formatDate(invoice.date)}</TableCell>
                  <TableCell className="num">{formatDate(invoice.dueDate)}</TableCell>
                  <TableCell numeric className="font-medium">
                    {formatINR(invoice.amount, { paise: true })}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7" aria-label={`Actions for ${invoice.id}`}>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[700px]">
                            <DialogHeader>
                              <DialogTitle>Invoice Details</DialogTitle>
                              <DialogDescription>
                                {invoice.id} for {invoice.customerName}
                              </DialogDescription>
                            </DialogHeader>
                            <InvoiceDetails invoice={invoice} />
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer className="mr-2 h-4 w-4" />
                          Print Invoice
                        </DropdownMenuItem>
                        {invoice.status === "pending" && (
                          <DropdownMenuItem>
                            <ArrowUpRight className="mr-2 h-4 w-4" />
                            Record Payment
                          </DropdownMenuItem>
                        )}
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

export default Invoicing;
