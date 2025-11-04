import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  Plus, 
  MoreHorizontal,
  DollarSign,
  FileText,
  Mail,
  Printer,
  Clock,
  ArrowUpRight,
  Download,
  AlertCircle,
  CheckCircle2,
  Receipt
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
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
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium">Bill To</h3>
          <div className="mt-2 space-y-1">
            <p className="font-medium">{invoice.customerName}</p>
            <p>Customer ID: {invoice.customerId}</p>
          </div>
        </div>
        <div className="text-right">
          <h3 className="font-medium">Invoice Details</h3>
          <div className="mt-2 space-y-1">
            <p>Invoice #: {invoice.id}</p>
            <p>Date: {invoice.date}</p>
            <p>Due Date: {invoice.dueDate}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Project Details</h3>
        <p>Project: {invoice.projectTitle}</p>
        <p>Project ID: {invoice.projectId}</p>
      </div>

      <div>
        <h3 className="font-medium mb-2">Items</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Quantity/Hours</TableHead>
              <TableHead className="text-right">Rate</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right">{item.quantity || item.hours}</TableCell>
                <TableCell className="text-right">₹{item.rate.toFixed(2)}</TableCell>
                <TableCell className="text-right">₹{item.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} className="text-right font-medium">Subtotal</TableCell>
              <TableCell className="text-right">₹{subtotal.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="text-right font-medium">Tax (8%)</TableCell>
              <TableCell className="text-right">₹{tax.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
              <TableCell className="text-right font-medium">₹{total.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="font-medium">Notes</h3>
        <p className="text-sm text-muted-foreground mt-1">{invoice.notes}</p>
      </div>

      <div>
        <h3 className="font-medium">Terms</h3>
        <p className="text-sm text-muted-foreground mt-1">{invoice.terms}</p>
      </div>
    </div>
  );
};

const Invoicing = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInvoices = invoicesData.filter(invoice =>
    invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-500">Overdue</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const totalRevenue = invoicesData.reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = invoicesData
    .filter(invoice => invoice.status === 'pending')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold">Invoicing & Billing</h1>
                <p className="text-muted-foreground mt-2">Manage customer invoices and payments</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Invoice
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Total Revenue</p>
                    <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Pending Payments</p>
                    <p className="text-2xl font-bold">₹{pendingAmount.toLocaleString()}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Overdue</p>
                    <p className="text-2xl font-bold">₹0</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Payment Rate</p>
                    <p className="text-2xl font-bold">95%</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-blue-500" />
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.customerName}</TableCell>
                        <TableCell>{invoice.projectTitle}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>₹{invoice.amount.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
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
                              {invoice.status === 'pending' && (
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
              </ScrollArea>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Invoicing; 