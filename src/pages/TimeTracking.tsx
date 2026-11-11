import { Clock, MoreHorizontal, Pause, Play, Plus } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState, Panel, SearchInput } from "@/components/layout/Panel";
import { StatStrip } from "@/components/layout/StatStrip";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/format";

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
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);

  const query = searchQuery.trim().toLowerCase();
  const filteredEntries = timeEntriesData.filter(
    (entry) =>
      (statusFilter === "all" || entry.status === statusFilter) &&
      (entry.employeeName.toLowerCase().includes(query) || entry.workOrderId.toLowerCase().includes(query))
  );

  return (
    <>
      <PageHeader
        title="Time Tracking"
        description="Track employee work hours and project time"
        actions={
          <>
            <Input
              type="date"
              aria-label="Timesheet date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="num w-[9.5rem]"
            />
            <Button>
              <Plus />
              New Time Entry
            </Button>
          </>
        }
      />

      <StatStrip
        stats={[
          { label: "Total Hours Today", value: "17.5", hint: "Logged so far" },
          { label: "Active Timers", value: "1", hint: "Running now", tone: "attention" },
          { label: "Employees Working", value: "3", hint: "Clocked in today" },
          { label: "Active Projects", value: "2", hint: "With time logged" },
        ]}
      />

      <Panel
        padded={false}
        toolbar={
          <>
            <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search time entries..." />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]" aria-label="Filter by status">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entries</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <span className="num ml-auto text-xs text-muted-foreground">
              {filteredEntries.length} of {timeEntriesData.length}
            </span>
          </>
        }
      >
        {filteredEntries.length === 0 ? (
          <EmptyState title="No time entries match these filters" hint="Try another employee, work order or status." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Work Order</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Date</TableHead>
                <TableHead numeric>Start Time</TableHead>
                <TableHead numeric>End Time</TableHead>
                <TableHead numeric>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="whitespace-nowrap font-medium">{entry.employeeName}</TableCell>
                  <TableCell className="num">{entry.workOrderId}</TableCell>
                  <TableCell className="min-w-[14rem]">
                    <div>{entry.projectTitle}</div>
                    <div className="text-xs text-muted-foreground">{entry.notes}</div>
                  </TableCell>
                  <TableCell className="num">{formatDate(entry.date)}</TableCell>
                  <TableCell numeric>{entry.startTime}</TableCell>
                  <TableCell numeric>{entry.endTime || "-"}</TableCell>
                  <TableCell numeric className="font-medium">
                    {entry.duration ? `${entry.duration}h` : "-"}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={entry.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          aria-label={`Actions for ${entry.employeeName}`}
                        >
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {entry.status === "in_progress" ? (
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
        )}
      </Panel>
    </>
  );
};

export default TimeTracking;
