import { Edit, Eye, Mail, MapPin, MoreHorizontal, Phone, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState, Field, Panel, SearchInput } from "@/components/layout/Panel";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { formatDate } from "@/lib/format";

// Mock customer data with more fields
const customersData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA",
    status: "active",
    projectsCount: 3,
    notes: "Prefers communication via email. Regular customer since 2020.",
    lastContact: "2024-02-15"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 234-5678",
    address: "456 Oak Ave, Somewhere, USA",
    status: "active",
    projectsCount: 1,
    notes: "Looking for long-term partnership. Interested in sustainable solutions.",
    lastContact: "2024-02-10"
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike.w@email.com",
    phone: "(555) 345-6789",
    address: "789 Pine Rd, Elsewhere, USA",
    status: "inactive",
    projectsCount: 0,
    notes: "Currently on hold. Follow up in Q2 2024.",
    lastContact: "2024-01-20"
  }
];

type Customer = typeof customersData[0];

const CustomerDetails = ({ customer }: { customer: Customer }) => {
  return (
    <div className="space-y-4">
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Email">
          <span className="flex items-center gap-2">
            <Mail aria-hidden className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            {customer.email}
          </span>
        </Field>
        <Field label="Phone">
          <span className="num flex items-center gap-2">
            <Phone aria-hidden className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            {customer.phone}
          </span>
        </Field>
        <Field label="Address" className="sm:col-span-2">
          <span className="flex items-center gap-2">
            <MapPin aria-hidden className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            {customer.address}
          </span>
        </Field>
        <Field label="Status">
          <StatusBadge status={customer.status} />
        </Field>
        <Field label="Last Contact">
          <span className="num">{formatDate(customer.lastContact)}</span>
        </Field>
      </dl>
      <div>
        <Label htmlFor={`customer-notes-${customer.id}`} className="field-label">
          Notes
        </Label>
        <Textarea id={`customer-notes-${customer.id}`} className="mt-1" value={customer.notes} readOnly />
      </div>
    </div>
  );
};

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const query = searchQuery.trim().toLowerCase();
  const filteredCustomers = customersData.filter(
    (customer) => customer.name.toLowerCase().includes(query) || customer.email.toLowerCase().includes(query)
  );

  const handleDelete = (_customerId: number) => {
    toast({
      title: "Customer deleted",
      description: "The customer has been successfully deleted.",
    });
  };

  return (
    <>
      <PageHeader
        title="Customers"
        description="Manage your customer relationships"
        actions={
          <Button>
            <UserPlus />
            Add Customer
          </Button>
        }
      />

      <Panel
        padded={false}
        toolbar={
          <>
            <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search customers..." />
            <span className="num ml-auto text-xs text-muted-foreground">
              {filteredCustomers.length} of {customersData.length}
            </span>
          </>
        }
      >
        {filteredCustomers.length === 0 ? (
          <EmptyState title="No customers match this search" hint="Try a name or an email address." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead numeric>Projects</TableHead>
                <TableHead numeric>Last Contact</TableHead>
                <TableHead className="w-10">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="whitespace-nowrap font-medium">{customer.name}</TableCell>
                  <TableCell>
                    <div>{customer.email}</div>
                    <div className="num text-xs text-muted-foreground">{customer.phone}</div>
                  </TableCell>
                  <TableCell className="min-w-[12rem] text-muted-foreground">{customer.address}</TableCell>
                  <TableCell>
                    <StatusBadge status={customer.status} />
                  </TableCell>
                  <TableCell numeric>{customer.projectsCount}</TableCell>
                  <TableCell numeric>{formatDate(customer.lastContact)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7" aria-label={`Actions for ${customer.name}`}>
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
                          <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                              <DialogTitle>{customer.name}</DialogTitle>
                              <DialogDescription>
                                {customer.projectsCount} {customer.projectsCount === 1 ? "project" : "projects"} on record
                              </DialogDescription>
                            </DialogHeader>
                            <CustomerDetails customer={customer} />
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(customer.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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

export default Customers;
