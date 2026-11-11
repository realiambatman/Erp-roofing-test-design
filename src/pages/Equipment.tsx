import { FileText, History, MoreHorizontal, Plus, Truck, Wrench } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState, Field, Meter, Panel, SearchInput } from "@/components/layout/Panel";
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

const conditionTone = (condition: number) => (condition >= 75 ? "default" : condition >= 50 ? "attention" : "critical");

const EquipmentDetails = ({ equipment }: { equipment: Equipment }) => {
  return (
    <div className="space-y-4">
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Field label="Model">{equipment.model}</Field>
        <Field label="Type">{equipment.type}</Field>
        <Field label="Location">{equipment.location}</Field>
        <Field label="Assigned To">{equipment.assignedTo}</Field>
        <Field label="Purchase Date">
          <span className="num">{formatDate(equipment.purchaseDate)}</span>
        </Field>
        <Field label="Warranty Until">
          <span className="num">{formatDate(equipment.warranty)}</span>
        </Field>
        <Field label="Last Maintenance">
          <span className="num">{formatDate(equipment.lastMaintenance)}</span>
        </Field>
        <Field label="Next Maintenance">
          <span className="num">{formatDate(equipment.nextMaintenance)}</span>
        </Field>
      </dl>

      <div>
        <h3 className="field-label mb-1">Specifications</h3>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border bg-border sm:grid-cols-4">
          {Object.entries(equipment.specifications).map(([key, value]) => (
            <div key={key} className="bg-card px-3 py-2">
              <dt className="field-label capitalize">{key.replace(/([a-z])([A-Z])/g, "$1 $2").replace("_", " ")}</dt>
              <dd className="num font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table containerClassName="max-h-none">
          <TableHeader>
            <TableRow>
              <TableHead>Maintenance History</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead numeric>Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipment.maintenanceHistory.map((record) => (
              <TableRow key={`${record.date}-${record.type}`}>
                <TableCell className="num">{formatDate(record.date)}</TableCell>
                <TableCell>{record.type}</TableCell>
                <TableCell className="min-w-[12rem]">{record.description}</TableCell>
                <TableCell className="whitespace-nowrap">{record.technician}</TableCell>
                <TableCell numeric>{formatINR(record.cost, { paise: true })}</TableCell>
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

  const query = searchQuery.trim().toLowerCase();
  const filteredEquipment = equipmentData.filter(
    (equipment) => equipment.name.toLowerCase().includes(query) || equipment.id.toLowerCase().includes(query)
  );

  return (
    <>
      <PageHeader
        title="Equipment Management"
        description="Track and maintain company equipment"
        actions={
          <Button>
            <Plus />
            Add Equipment
          </Button>
        }
      />

      <StatStrip
        stats={[
          { label: "Total Equipment", value: "24", hint: "Across all sites" },
          { label: "Maintenance Due", value: "3", hint: "Service overdue or due soon", tone: "attention" },
          { label: "Out of Service", value: "1", hint: "Unavailable for jobs" },
          { label: "Utilization Rate", value: "78%", hint: "Fleet in use" },
        ]}
      />

      <Panel
        padded={false}
        toolbar={
          <>
            <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search equipment..." />
            <span className="num ml-auto text-xs text-muted-foreground">
              {filteredEquipment.length} of {equipmentData.length}
            </span>
          </>
        }
      >
        {filteredEquipment.length === 0 ? (
          <EmptyState title="No equipment matches this search" hint="Try an equipment name or ID." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead numeric>Next Maintenance</TableHead>
                <TableHead className="w-10">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEquipment.map((equipment) => (
                <TableRow key={equipment.id}>
                  <TableCell className="num font-medium">{equipment.id}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="font-medium">{equipment.name}</div>
                    <div className="text-xs text-muted-foreground">{equipment.model}</div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={equipment.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Meter
                        value={equipment.condition}
                        tone={conditionTone(equipment.condition)}
                        label={`${equipment.name} condition`}
                        className="w-16"
                      />
                      <span className="num w-8 text-right text-xs">{equipment.condition}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{equipment.location}</TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">{equipment.assignedTo}</TableCell>
                  <TableCell numeric>{formatDate(equipment.nextMaintenance)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7" aria-label={`Actions for ${equipment.name}`}>
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
                              <DialogTitle>Equipment Details</DialogTitle>
                              <DialogDescription>
                                {equipment.id}, {equipment.name}
                              </DialogDescription>
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
        )}
      </Panel>
    </>
  );
};

export default Equipment;
