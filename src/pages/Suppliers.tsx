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
  Building,
  Package,
  DollarSign,
  ShoppingCart,
  FileText,
  Mail,
  Phone,
  History,
  Star
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock suppliers data
const suppliersData = [
  {
    id: "SUP-001",
    name: "ABC Roofing Supply",
    type: "Roofing Materials",
    status: "active",
    rating: 4.8,
    contactName: "John Anderson",
    email: "john@abcroofing.com",
    phone: "(555) 123-4567",
    address: "123 Supply St, Industry City, ST 12345",
    paymentTerms: "Net 30",
    activeOrders: 3,
    yearToDateSpend: 125000,
    products: [
      { name: "Architectural Shingles", price: 45.99, unit: "bundle" },
      { name: "Underlayment", price: 89.99, unit: "roll" },
      { name: "Ridge Vents", price: 24.99, unit: "piece" }
    ],
    orderHistory: [
      {
        id: "ORD-2024-001",
        date: "2024-03-15",
        amount: 12500,
        status: "delivered"
      },
      {
        id: "ORD-2024-002",
        date: "2024-03-10",
        amount: 8750,
        status: "in_transit"
      }
    ]
  },
  {
    id: "SUP-002",
    name: "XYZ Tools & Equipment",
    type: "Tools and Equipment",
    status: "active",
    rating: 4.5,
    contactName: "Sarah Miller",
    email: "sarah@xyztools.com",
    phone: "(555) 234-5678",
    address: "456 Tool Ave, Commerce City, ST 12346",
    paymentTerms: "Net 15",
    activeOrders: 1,
    yearToDateSpend: 75000,
    products: [
      { name: "Power Nailer", price: 299.99, unit: "piece" },
      { name: "Safety Harness", price: 149.99, unit: "piece" },
      { name: "Ladder", price: 189.99, unit: "piece" }
    ],
    orderHistory: [
      {
        id: "ORD-2024-003",
        date: "2024-03-12",
        amount: 4500,
        status: "delivered"
      }
    ]
  }
];

type Supplier = typeof suppliersData[0];

const SupplierDetails = ({ supplier }: { supplier: Supplier }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium">Contact Information</h3>
          <div className="mt-2 space-y-1">
            <p><span className="font-medium">Contact:</span> {supplier.contactName}</p>
            <p><span className="font-medium">Email:</span> {supplier.email}</p>
            <p><span className="font-medium">Phone:</span> {supplier.phone}</p>
            <p><span className="font-medium">Address:</span> {supplier.address}</p>
          </div>
        </div>
        <div>
          <h3 className="font-medium">Business Details</h3>
          <div className="mt-2 space-y-1">
            <p><span className="font-medium">Payment Terms:</span> {supplier.paymentTerms}</p>
            <p><span className="font-medium">Active Orders:</span> {supplier.activeOrders}</p>
            <p><span className="font-medium">YTD Spend:</span> ₹{supplier.yearToDateSpend.toLocaleString()}</p>
            <p><span className="font-medium">Rating:</span> {supplier.rating} / 5</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Products</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplier.products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>₹{product.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="font-medium mb-2">Order History</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplier.orderHistory.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={
                    order.status === 'delivered' ? 'bg-green-500' : 
                    order.status === 'in_transit' ? 'bg-blue-500' : 'bg-yellow-500'
                  }>
                    {order.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const Suppliers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSuppliers = suppliersData.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-500">Inactive</Badge>;
      case 'suspended':
        return <Badge className="bg-red-500">Suspended</Badge>;
      default:
        return <Badge>Unknown</Badge>;
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
                <h1 className="text-2xl md:text-3xl font-semibold">Supplier Management</h1>
                <p className="text-muted-foreground mt-2">Manage suppliers and vendor relationships</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  New Order
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Supplier
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Total Suppliers</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <Building className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Active Orders</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-500" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Monthly Spend</p>
                    <p className="text-2xl font-bold">₹45,250</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Avg. Rating</p>
                    <p className="text-2xl font-bold">4.6</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Active Orders</TableHead>
                      <TableHead>YTD Spend</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.id}</TableCell>
                        <TableCell>{supplier.name}</TableCell>
                        <TableCell>{supplier.type}</TableCell>
                        <TableCell>{supplier.contactName}</TableCell>
                        <TableCell>{supplier.activeOrders}</TableCell>
                        <TableCell>₹{supplier.yearToDateSpend.toLocaleString()}</TableCell>
                        <TableCell>{supplier.rating}</TableCell>
                        <TableCell>{getStatusBadge(supplier.status)}</TableCell>
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
                                    <DialogTitle>Supplier Details</DialogTitle>
                                  </DialogHeader>
                                  <SupplierDetails supplier={supplier} />
                                </DialogContent>
                              </Dialog>
                              <DropdownMenuItem>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Place Order
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Phone className="mr-2 h-4 w-4" />
                                Call Supplier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <History className="mr-2 h-4 w-4" />
                                View History
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

export default Suppliers; 