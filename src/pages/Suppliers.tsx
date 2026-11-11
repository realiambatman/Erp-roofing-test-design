import { FileText, History, Mail, MoreHorizontal, Phone, Plus, ShoppingCart } from "lucide-react";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate, formatINR } from "@/lib/format";

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
    <div className="space-y-4">
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Field label="Contact">{supplier.contactName}</Field>
        <Field label="Email">{supplier.email}</Field>
        <Field label="Phone">
          <span className="num">{supplier.phone}</span>
        </Field>
        <Field label="Payment Terms">{supplier.paymentTerms}</Field>
        <Field label="Address" className="col-span-2 sm:col-span-1">
          {supplier.address}
        </Field>
        <Field label="Active Orders">
          <span className="num">{supplier.activeOrders}</span>
        </Field>
        <Field label="YTD Spend">
          <span className="num">{formatINR(supplier.yearToDateSpend)}</span>
        </Field>
        <Field label="Rating">
          <span className="num">{supplier.rating} / 5</span>
        </Field>
      </dl>

      <div className="overflow-hidden rounded-md border">
        <Table containerClassName="max-h-none">
          <TableHeader>
            <TableRow>
              <TableHead>Products</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead numeric>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplier.products.map((product) => (
              <TableRow key={product.name}>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-muted-foreground">{product.unit}</TableCell>
                <TableCell numeric>{formatINR(product.price, { paise: true })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table containerClassName="max-h-none">
          <TableHeader>
            <TableRow>
              <TableHead>Order History</TableHead>
              <TableHead>Date</TableHead>
              <TableHead numeric>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplier.orderHistory.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="num">{order.id}</TableCell>
                <TableCell className="num">{formatDate(order.date)}</TableCell>
                <TableCell numeric>{formatINR(order.amount)}</TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
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

  const query = searchQuery.trim().toLowerCase();
  const filteredSuppliers = suppliersData.filter(
    (supplier) => supplier.name.toLowerCase().includes(query) || supplier.id.toLowerCase().includes(query)
  );

  return (
    <>
      <PageHeader
        title="Supplier Management"
        description="Manage suppliers and vendor relationships"
        actions={
          <>
            <Button variant="outline">
              <ShoppingCart />
              New Order
            </Button>
            <Button>
              <Plus />
              Add Supplier
            </Button>
          </>
        }
      />

      <StatStrip
        stats={[
          { label: "Total Suppliers", value: "24", hint: "On the vendor list" },
          { label: "Active Orders", value: "12", hint: "Open purchase orders" },
          { label: "Monthly Spend", value: formatINR(45250), hint: "This month" },
          { label: "Avg. Rating", value: "4.6", hint: "Out of 5" },
        ]}
      />

      <Panel
        padded={false}
        toolbar={
          <>
            <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search suppliers..." />
            <span className="num ml-auto text-xs text-muted-foreground">
              {filteredSuppliers.length} of {suppliersData.length}
            </span>
          </>
        }
      >
        {filteredSuppliers.length === 0 ? (
          <EmptyState title="No suppliers match this search" hint="Try a supplier name or ID." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Terms</TableHead>
                <TableHead numeric>Active Orders</TableHead>
                <TableHead numeric>YTD Spend</TableHead>
                <TableHead numeric>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="num font-medium">{supplier.id}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="font-medium">{supplier.name}</div>
                    <div className="text-xs text-muted-foreground">{supplier.type}</div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div>{supplier.contactName}</div>
                    <div className="num text-xs text-muted-foreground">{supplier.phone}</div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">{supplier.paymentTerms}</TableCell>
                  <TableCell numeric>{supplier.activeOrders}</TableCell>
                  <TableCell numeric className="font-medium">
                    {formatINR(supplier.yearToDateSpend)}
                  </TableCell>
                  <TableCell numeric>{supplier.rating.toFixed(1)}</TableCell>
                  <TableCell>
                    <StatusBadge status={supplier.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7" aria-label={`Actions for ${supplier.name}`}>
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
                              <DialogTitle>Supplier Details</DialogTitle>
                              <DialogDescription>
                                {supplier.name}, {supplier.type}
                              </DialogDescription>
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
        )}
      </Panel>
    </>
  );
};

export default Suppliers;
