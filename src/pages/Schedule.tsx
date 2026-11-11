import { CalendarDays, CalendarPlus, Clock, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState, Panel } from "@/components/layout/Panel";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/format";

// Mock data for schedules
const scheduleData = [
  {
    id: 1,
    title: "Roof Replacement",
    client: "John Smith",
    address: "123 Oak Street",
    date: "2024-03-15",
    startTime: "08:00",
    endTime: "17:00",
    crew: ["Mike Johnson", "Steve Williams", "Tom Brown"],
    status: "scheduled"
  },
  {
    id: 2,
    title: "Emergency Repair",
    client: "Sarah Davis",
    address: "456 Pine Avenue",
    date: "2024-03-15",
    startTime: "10:00",
    endTime: "14:00",
    crew: ["David Wilson", "James Moore"],
    status: "urgent"
  },
  {
    id: 3,
    title: "Inspection",
    client: "ABC Corporation",
    address: "789 Business Park",
    date: "2024-03-16",
    startTime: "09:00",
    endTime: "11:00",
    crew: ["Robert Taylor"],
    status: "scheduled"
  }
];

type Appointment = (typeof scheduleData)[number];

const scheduledDays = scheduleData.map((schedule) => new Date(`${schedule.date}T00:00:00`));

function AppointmentCard({ schedule }: { schedule: Appointment }) {
  return (
    <li className="px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-medium">{schedule.title}</h4>
          <p className="text-muted-foreground">{schedule.client}</p>
        </div>
        <StatusBadge status={schedule.status} />
      </div>
      <dl className="mt-2 space-y-1 text-muted-foreground [&_svg]:h-3.5 [&_svg]:w-3.5 [&_svg]:shrink-0">
        <div className="flex items-center gap-2">
          <Clock aria-hidden />
          <dt className="sr-only">Time</dt>
          <dd className="num">
            {schedule.startTime} - {schedule.endTime}
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <MapPin aria-hidden />
          <dt className="sr-only">Address</dt>
          <dd>{schedule.address}</dd>
        </div>
        <div className="flex items-start gap-2">
          <Users aria-hidden className="mt-[3px]" />
          <dt className="sr-only">Crew</dt>
          <dd>{schedule.crew.join(", ")}</dd>
        </div>
      </dl>
    </li>
  );
}

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState("calendar");

  const filteredSchedules = scheduleData.filter(
    (schedule) => schedule.date === format(date || new Date(), "yyyy-MM-dd")
  );

  return (
    <>
      <PageHeader
        title="Schedule"
        description="Manage your team's schedule and appointments."
        actions={
          <Button>
            <CalendarPlus />
            New Appointment
          </Button>
        }
      />

      <Tabs value={view} onValueChange={setView} className="w-full">
        <TabsList>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[auto_minmax(0,1fr)]">
            <Panel padded={false}>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                modifiers={{ booked: scheduledDays }}
                modifiersClassNames={{
                  booked:
                    "relative after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-warning",
                }}
                className="mx-auto w-fit"
              />
              <div className="flex items-center justify-between gap-3 border-t px-4 py-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-warning" />
                  Has appointments
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDate(scheduledDays[0])}
                >
                  <CalendarDays />
                  Go to {formatDate(scheduleData[0].date)}
                </Button>
              </div>
            </Panel>

            <Panel
              title={`Appointments for ${date ? format(date, "MMMM d, yyyy") : "Selected Date"}`}
              aside={`${filteredSchedules.length} booked`}
              padded={false}
            >
              {filteredSchedules.length === 0 ? (
                <EmptyState
                  title="Nothing scheduled for this day"
                  hint="Pick a day marked with a dot, or switch to the list view to see every appointment."
                />
              ) : (
                <ul className="divide-y">
                  {filteredSchedules.map((schedule) => (
                    <AppointmentCard key={schedule.id} schedule={schedule} />
                  ))}
                </ul>
              )}
            </Panel>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Panel title="All appointments" aside={`${scheduleData.length} booked`} padded={false}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Crew</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduleData.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell className="whitespace-nowrap font-medium">{schedule.title}</TableCell>
                    <TableCell className="whitespace-nowrap">{schedule.client}</TableCell>
                    <TableCell className="num">{formatDate(schedule.date)}</TableCell>
                    <TableCell className="num">
                      {schedule.startTime} - {schedule.endTime}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">{schedule.address}</TableCell>
                    <TableCell className="min-w-[14rem] text-muted-foreground">{schedule.crew.join(", ")}</TableCell>
                    <TableCell>
                      <StatusBadge status={schedule.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Panel>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Schedule;
