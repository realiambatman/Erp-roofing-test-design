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
  Wrench,
  AlertTriangle,
  Calendar,
  Truck,
  History,
  FileText,
  Settings,
  CheckCircle2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
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

// Mock equipment data
const equipmentData = [
  {
    id: "EQ-001",
    name: "Boom Lift",
    model: "JLG 450AJ",
    type: "Aerial Equipment",
    status: "operational",
    condition: 85,
    lastMaintenance: "2024-02-15",
    nextMaintenance: "2024-03-15",
    location: "Warehouse A",
    assignedTo: "Mike Johnson",
    purchaseDate: "2022-06-10",
    warranty: "2025-06-10",
    maintenanceHistory: [
      {
        date: "2024-02-15",
        type: "Routine",
        description: "Oil change and hydraulic system check",
        technician: "Bob Smith",
        cost: 450.00
      },
      {
        date: "2023-12-10",
        type: "Repair",
        description: "Replace hydraulic hose",
        technician: "Bob Smith",
        cost: 750.00
      }
    ],
    specifications: {
      height: "45 ft",
      capacity: "550 lbs",
      fuelType: "Diesel",
      weight: "12,900 lbs"
    }
  },
  {
    id: "EQ-002",
    name: "Roofing Nail Gun",
    model: "Hitachi NV75AN",
    type: "Power Tools",
    status: "maintenance_required",
    condition: 65,
    lastMaintenance: "2024-01-20",
    nextMaintenance: "2024-03-20",
    location: "Job Site - 123 Oak St",
    assignedTo: "Steve Williams",
    purchaseDate: "2023-03-15",
    warranty: "2024-03-15",
    maintenanceHistory: [
      {
        date: "2024-01-20",
        type: "Routine",
        description: "Cleaning and lubrication",
        technician: "David Wilson",
        cost: 75.00
      }
    ],
    specifications: {
      magazine: "75 nails",
      pressure: "70-120 PSI",
      weight: "7.5 lbs"
    }
  }
];

type Equipment = typeof equipmentData[0];

const EquipmentDetails = ({ equipment }: { equipment: Equipment }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium">Equipment Details</h3>
          <div className="mt-2 space-y-1">
            <p><span className="font-medium">Model:</span> {equipment.model}</p>
            <p><span className="font-medium">Type:</span> {equipment.type}</p>
            <p><span className="font-medium">Location:</span> {equipment.location}</p>
            <p><span className="font-medium">Assigned To:</span> {equipment.assignedTo}</p>
          </div>
        </div>
        <div>
          <h3 className="font-medium">Dates</h3>
          <div className="mt-2 space-y-1">
            <p><span className="font-medium">Purchase Date:</span> {equipment.purchaseDate}</p>
            <p><span className="font-medium">Warranty Until:</span> {equipment.warranty}</p>
            <p><span className="font-medium">Last Maintenance:</span> {equipment.lastMaintenance}</p>
            <p><span className="font-medium">Next Maintenance:</span> {equipment.nextMaintenance}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Specifications</h3>
        <Card className="p-4">
          {Object.entries(equipment.specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between py-1">
              <span className="font-medium capitalize">{key.replace('_', ' ')}:</span>
              <span>{value}</span>
            </div>
          ))}
        </Card>
      </div>

      <div>
        <h3 className="font-medium mb-2">Maintenance History</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipment.maintenanceHistory.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.type}</TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell>{record.technician}</TableCell>
                <TableCell>₹{record.cost.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const Equipment = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEquipment = equipmentData.filter(equipment =>
    equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    equipment.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge className="bg-green-500">Operational</Badge>;
      case 'maintenance_required':
        return <Badge className="bg-yellow-500">Maintenance Required</Badge>;
      case 'out_of_service':
        return <Badge className="bg-red-500">Out of Service</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
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
                <h1 className="text-2xl md:text-3xl font-semibold">Equipment Management</h1>
                <p className="text-muted-foreground mt-2">Track and maintain company equipment</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Equipment
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Total Equipment</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <Wrench className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Maintenance Due</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Out of Service</p>
                    <p className="text-2xl font-bold">1</p>
                  </div>
                  <Settings className="h-8 w-8 text-red-500" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Utilization Rate</p>
                    <p className="text-2xl font-bold">78%</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search equipment..."
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
                      <TableHead>Model</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Next Maintenance</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEquipment.map((equipment) => (
                      <TableRow key={equipment.id}>
                        <TableCell className="font-medium">{equipment.id}</TableCell>
                        <TableCell>{equipment.name}</TableCell>
                        <TableCell>{equipment.model}</TableCell>
                        <TableCell>{getStatusBadge(equipment.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={equipment.condition} className="w-[60px]" />
                            <span className="text-sm">{equipment.condition}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{equipment.location}</TableCell>
                        <TableCell>{equipment.nextMaintenance}</TableCell>
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
                                    <DialogTitle>Equipment Details</DialogTitle>
                                  </DialogHeader>
                                  <EquipmentDetails equipment={equipment} />
                                </DialogContent>
                              </Dialog>
                              <DropdownMenuItem>
                                <Wrench className="mr-2 h-4 w-4" />
                                Schedule Maintenance
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Truck className="mr-2 h-4 w-4" />
                                Update Location
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

export default Equipment; 