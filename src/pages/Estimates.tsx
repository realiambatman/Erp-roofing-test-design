import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus, MoreHorizontal, FileText, Mail, Calculator, Edit, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

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
  const materialsCost = estimate.materials.reduce((sum, item) => 
    sum + (item.quantity * item.unitPrice), 0
  );
  const laborCost = estimate.labor.hours * estimate.labor.rate;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium">Customer</h3>
          <p>{estimate.customerName}</p>
        </div>
        <div>
          <h3 className="font-medium">Estimate Number</h3>
          <p>{estimate.number}</p>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Materials</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {estimate.materials.map((material, index) => (
              <TableRow key={index}>
                <TableCell>{material.item}</TableCell>
                <TableCell>{material.quantity}</TableCell>
                <TableCell>₹{material.unitPrice.toFixed(2)}</TableCell>
                <TableCell>₹{(material.quantity * material.unitPrice).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium">Labor</h3>
          <p>{estimate.labor.hours} hours @ ₹{estimate.labor.rate}/hr</p>
          <p className="font-medium mt-1">Total: ₹{laborCost.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="font-medium">Summary</h3>
          <div className="space-y-1">
            <p>Materials: ₹{materialsCost.toFixed(2)}</p>
            <p>Labor: ₹{laborCost.toFixed(2)}</p>
            <p className="font-medium">Total: ₹{estimate.amount.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium">Notes</h3>
        <p className="text-sm text-muted-foreground">{estimate.notes}</p>
      </div>
    </div>
  );
};

const Estimates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredEstimates = estimatesData.filter(estimate =>
    estimate.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    estimate.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "expired":
        return "bg-gray-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold">Estimates & Quotes</h1>
                <p className="text-muted-foreground mt-2">Create and manage customer estimates</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Estimate
              </Button>
            </div>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search estimates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <ScrollArea className="h-[600px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Number</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEstimates.map((estimate) => (
                      <TableRow key={estimate.id}>
                        <TableCell className="font-medium">{estimate.number}</TableCell>
                        <TableCell>{estimate.customerName}</TableCell>
                        <TableCell>{estimate.projectTitle}</TableCell>
                        <TableCell>{new Date(estimate.date).toLocaleDateString()}</TableCell>
                        <TableCell>₹{estimate.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(estimate.status)}>
                            {estimate.status}
                          </Badge>
                        </TableCell>
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
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[700px]">
                                  <DialogHeader>
                                    <DialogTitle>Estimate Details</DialogTitle>
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
              </ScrollArea>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Estimates; 