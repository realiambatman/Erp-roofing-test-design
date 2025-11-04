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
  Clock,
  Play,
  Pause,
  StopCircle,
  Calendar,
  MoreHorizontal 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock time entries data
const timeEntriesData = [
  {
    id: 1,
    employeeName: "Mike Johnson",
    workOrderId: "WO-2024-001",
    projectTitle: "Roof Replacement - Phase 1",
    date: "2024-03-18",
    startTime: "08:00",
    endTime: "16:30",
    duration: "8.5",
    status: "completed",
    type: "regular",
    notes: "Completed shingle removal and deck inspection"
  },
  {
    id: 2,
    employeeName: "Steve Williams",
    workOrderId: "WO-2024-001",
    projectTitle: "Roof Replacement - Phase 1",
    date: "2024-03-18",
    startTime: "08:00",
    endTime: "17:00",
    duration: "9",
    status: "completed",
    type: "regular",
    notes: "Assisted with shingle removal, started underlayment installation"
  },
  {
    id: 3,
    employeeName: "David Wilson",
    workOrderId: "WO-2024-002",
    projectTitle: "Gutter Installation",
    date: "2024-03-18",
    startTime: "09:00",
    endTime: null,
    duration: null,
    status: "in_progress",
    type: "regular",
    notes: "Site preparation and material staging"
  }
];

const TimeTracking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const filteredEntries = timeEntriesData.filter(entry =>
    entry.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.workOrderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-500">In Progress</Badge>;
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
                <h1 className="text-2xl md:text-3xl font-semibold">Time Tracking</h1>
                <p className="text-muted-foreground mt-2">Track employee work hours and project time</p>
              </div>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-[160px]"
                />
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Time Entry
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Total Hours Today</p>
                    <p className="text-2xl font-bold">17.5</p>
                  </div>
                  <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Active Timers</p>
                    <p className="text-2xl font-bold">1</p>
                  </div>
                  <Play className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Employees Working</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Active Projects</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  <StopCircle className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 flex-1">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search time entries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Entries</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Work Order</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Start Time</TableHead>
                      <TableHead>End Time</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{entry.employeeName}</TableCell>
                        <TableCell>{entry.workOrderId}</TableCell>
                        <TableCell>{entry.projectTitle}</TableCell>
                        <TableCell>{entry.startTime}</TableCell>
                        <TableCell>{entry.endTime || '-'}</TableCell>
                        <TableCell>{entry.duration ? `${entry.duration}h` : '-'}</TableCell>
                        <TableCell>{getStatusBadge(entry.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {entry.status === 'in_progress' ? (
                                <DropdownMenuItem>
                                  <Pause className="mr-2 h-4 w-4" />
                                  Stop Timer
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <Play className="mr-2 h-4 w-4" />
                                  Start Timer
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <Clock className="mr-2 h-4 w-4" />
                                Edit Time
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

export default TimeTracking; 