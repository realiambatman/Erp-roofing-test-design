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
  ClipboardCheck, 
  Timer,
  Users,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium">Customer</h3>
          <p>{workOrder.customerName}</p>
        </div>
        <div>
          <h3 className="font-medium">Work Order ID</h3>
          <p>{workOrder.id}</p>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Tasks</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workOrder.tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                    {task.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="font-medium mb-2">Materials Usage</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Material</TableHead>
              <TableHead>Allocated</TableHead>
              <TableHead>Used</TableHead>
              <TableHead>Remaining</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workOrder.materials.map((material, index) => (
              <TableRow key={index}>
                <TableCell>{material.item}</TableCell>
                <TableCell>{material.allocated}</TableCell>
                <TableCell>{material.used}</TableCell>
                <TableCell>{material.allocated - material.used}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="font-medium">Assigned Team Members</h3>
        <div className="flex gap-2 mt-2">
          {workOrder.assignedTo.map((member, index) => (
            <Badge key={index} variant="secondary">{member}</Badge>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium">Notes</h3>
        <p className="text-sm text-muted-foreground">{workOrder.notes}</p>
      </div>
    </div>
  );
};

const WorkOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkOrders = workOrdersData.filter(order =>
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case 'scheduled':
        return <Badge className="bg-yellow-500">Scheduled</Badge>;
      case 'on_hold':
        return <Badge className="bg-orange-500">On Hold</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return <Badge>Normal</Badge>;
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
                <h1 className="text-2xl md:text-3xl font-semibold">Work Orders</h1>
                <p className="text-muted-foreground mt-2">Manage and track work orders</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Work Order
              </Button>
            </div>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search work orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <ScrollArea className="h-[600px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredWorkOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{order.title}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={order.progress} className="w-[60px]" />
                            <span className="text-sm">{order.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(order.dueDate).toLocaleDateString()}</TableCell>
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
                                    <ClipboardCheck className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[700px]">
                                  <DialogHeader>
                                    <DialogTitle>Work Order Details</DialogTitle>
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
              </ScrollArea>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default WorkOrders;
