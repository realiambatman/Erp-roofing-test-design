import { ClipboardCheck, MoreHorizontal, Plus, Timer, Users, Wrench } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState, Field, Meter, Panel, SearchInput } from "@/components/layout/Panel";
import { StatusBadge } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/format";

// Mock work orders data
const workOrdersData = [
  {
    id: "WO-2024-001",
    projectId: "PRJ-2024-001",
    estimateId: "EST-2024-001",
    customerName: "John Smith",
    title: "Roof Replacement - Phase 1",
    status: "in_progress",
    priority: "high",
    startDate: "2024-03-18",
    dueDate: "2024-03-25",
    progress: 65,
    assignedTo: ["Mike Johnson", "Steve Williams"],
    tasks: [
      { id: 1, description: "Remove existing shingles", status: "completed" },
      { id: 2, description: "Inspect and repair deck", status: "completed" },
      { id: 3, description: "Install underlayment", status: "in_progress" },
      { id: 4, description: "Install new shingles", status: "pending" }
    ],
    materials: [
      { item: "Architectural Shingles", allocated: 40, used: 25 },
      { item: "Underlayment", allocated: 10, used: 6 },
      { item: "Ridge Vents", allocated: 8, used: 4 }
    ],
    notes: "Customer requested extra attention to drainage around chimney"
  },
  {
    id: "WO-2024-002",
    projectId: "PRJ-2024-002",
    estimateId: "EST-2024-002",
    customerName: "Sarah Johnson",
    title: "Gutter Installation",
    status: "scheduled",
    priority: "medium",
    startDate: "2024-03-20",
    dueDate: "2024-03-21",
    progress: 0,
    assignedTo: ["David Wilson"],
    tasks: [
      { id: 1, description: "Remove old gutters", status: "pending" },
      { id: 2, description: "Install new gutters", status: "pending" },
      { id: 3, description: "Install leaf guards", status: "pending" }
    ],
    materials: [
      { item: "Seamless Gutters", allocated: 120, used: 0 },
      { item: "Leaf Guards", allocated: 120, used: 0 },
      { item: "Downspouts", allocated: 6, used: 0 }
    ],
    notes: "Ensure proper slope for drainage"
  }
];

type WorkOrder = typeof workOrdersData[0];

const WorkOrderDetails = ({ workOrder }: { workOrder: WorkOrder }) => {
  return (
    <div className="space-y-4">
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Field label="Customer">{workOrder.customerName}</Field>
        <Field label="Work Order ID">
          <span className="num">{workOrder.id}</span>
        </Field>
        <Field label="Start">
          <span className="num">{formatDate(workOrder.startDate)}</span>
        </Field>
        <Field label="Due">
          <span className="num">{formatDate(workOrder.dueDate)}</span>
        </Field>
      </dl>

      <div className="overflow-hidden rounded-md border">
        <Table containerClassName="max-h-none">
          <TableHeader>
            <TableRow>
              <TableHead>Tasks</TableHead>
              <TableHead className="w-32">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workOrder.tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  <StatusBadge status={task.status} tone={task.status === "pending" ? "neutral" : undefined} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table containerClassName="max-h-none">
          <TableHeader>
            <TableRow>
              <TableHead>Materials Usage</TableHead>
              <TableHead numeric>Allocated</TableHead>
              <TableHead numeric>Used</TableHead>
              <TableHead numeric>Remaining</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workOrder.materials.map((material) => (
              <TableRow key={material.item}>
                <TableCell>{material.item}</TableCell>
                <TableCell numeric>{material.allocated}</TableCell>
                <TableCell numeric>{material.used}</TableCell>
                <TableCell numeric className="font-medium">
                  {material.allocated - material.used}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <dl className="space-y-4">
        <Field label="Assigned Team Members">
          <span className="mt-1 flex flex-wrap gap-1.5">
            {workOrder.assignedTo.map((member) => (
              <Badge key={member} variant="neutral">
                {member}
              </Badge>
            ))}
          </span>
        </Field>
        <Field label="Notes">{workOrder.notes}</Field>
      </dl>
    </div>
  );
};

const WorkOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const filteredWorkOrders = workOrdersData.filter(
    (order) => order.customerName.toLowerCase().includes(query) || order.id.toLowerCase().includes(query)
  );

  return (
    <>
      <PageHeader
        title="Work Orders"
        description="Manage and track work orders"
        actions={
          <Button>
            <Plus />
            Create Work Order
          </Button>
        }
      />

      <Panel
        padded={false}
        toolbar={
          <>
            <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search work orders..." />
            <span className="num ml-auto text-xs text-muted-foreground">
              {filteredWorkOrders.length} of {workOrdersData.length}
            </span>
          </>
        }
      >
        {filteredWorkOrders.length === 0 ? (
          <EmptyState title="No work orders match this search" hint="Try a customer name or a work order ID." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Crew</TableHead>
                <TableHead numeric>Due Date</TableHead>
                <TableHead className="w-10">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="num font-medium">{order.id}</TableCell>
                  <TableCell className="whitespace-nowrap">{order.customerName}</TableCell>
                  <TableCell className="whitespace-nowrap">{order.title}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.priority} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Meter value={order.progress} label={`${order.id} progress`} className="w-16" />
                      <span className="num w-8 text-right text-xs">{order.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">{order.assignedTo.join(", ")}</TableCell>
                  <TableCell numeric>{formatDate(order.dueDate)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7" aria-label={`Actions for ${order.id}`}>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <ClipboardCheck className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[700px]">
                            <DialogHeader>
                              <DialogTitle>Work Order Details</DialogTitle>
                              <DialogDescription>{order.title}</DialogDescription>
                            </DialogHeader>
                            <WorkOrderDetails workOrder={order} />
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem>
                          <Timer className="mr-2 h-4 w-4" />
                          Update Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          Assign Team
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Wrench className="mr-2 h-4 w-4" />
                          Update Materials
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

export default WorkOrders;
