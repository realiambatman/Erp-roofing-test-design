
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar as CalendarIcon, Clock, Users, MapPin } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

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

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState("calendar");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "urgent":
        return "bg-red-500";
      case "scheduled":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredSchedules = scheduleData.filter(
    (schedule) => schedule.date === format(date || new Date(), "yyyy-MM-dd")
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold">Schedule</h1>
                <p className="text-muted-foreground mt-2">Manage your team's schedule and appointments.</p>
              </div>
              <Button>
                <CalendarIcon className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </div>

            <Tabs value={view} onValueChange={setView} className="w-full">
              <TabsList>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>

              <TabsContent value="calendar" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-4">
                      Appointments for {date ? format(date, "MMMM d, yyyy") : "Selected Date"}
                    </h3>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-4">
                        {filteredSchedules.map((schedule) => (
                          <Card key={schedule.id} className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium">{schedule.title}</h4>
                              <Badge className={getStatusColor(schedule.status)}>
                                {schedule.status}
                              </Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{schedule.startTime} - {schedule.endTime}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{schedule.address}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>{schedule.crew.join(", ")}</span>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="list" className="mt-4">
                <Card className="p-4">
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-4">
                      {scheduleData.map((schedule) => (
                        <Card key={schedule.id} className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{schedule.title}</h4>
                              <p className="text-sm text-muted-foreground">{schedule.client}</p>
                            </div>
                            <Badge className={getStatusColor(schedule.status)}>
                              {schedule.status}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{schedule.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{schedule.startTime} - {schedule.endTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{schedule.address}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{schedule.crew.join(", ")}</span>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Schedule;
