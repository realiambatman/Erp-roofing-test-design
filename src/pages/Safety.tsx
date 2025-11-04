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
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  HardHat,
  ClipboardCheck,
  Calendar,
  FileText,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock safety data
const safetyData = {
  incidents: [
    {
      id: "INC-2024-001",
      date: "2024-03-15",
      type: "near_miss",
      location: "123 Oak Street",
      description: "Worker nearly slipped on wet surface",
      reportedBy: "Mike Johnson",
      status: "investigated",
      severity: "low",
      actions: "Added additional non-slip mats, updated safety protocol",
      witnesses: ["Steve Williams", "David Wilson"],
      followUp: "Weekly surface inspection implemented"
    },
    {
      id: "INC-2024-002",
      date: "2024-03-16",
      type: "injury",
      location: "456 Pine Road",
      description: "Minor cut while handling materials",
      reportedBy: "Steve Williams",
      status: "under_review",
      severity: "medium",
      actions: "First aid administered, reviewing handling procedures",
      witnesses: ["Sarah Davis"],
      followUp: "Scheduled safety training for material handling"
    }
  ],
  inspections: [
    {
      id: "INSP-2024-001",
      date: "2024-03-10",
      type: "site_safety",
      location: "Main Warehouse",
      inspector: "Bob Thompson",
      status: "passed",
      findings: "All safety measures in compliance",
      nextInspection: "2024-04-10",
      items: [
        { item: "Fire Extinguishers", status: "passed" },
        { item: "Emergency Exits", status: "passed" },
        { item: "First Aid Kits", status: "passed" }
      ]
    },
    {
      id: "INSP-2024-002",
      date: "2024-03-12",
      type: "equipment",
      location: "Job Site - 789 Elm St",
      inspector: "Sarah Davis",
      status: "action_required",
      findings: "Safety harnesses need replacement",
      nextInspection: "2024-03-19",
      items: [
        { item: "Safety Harnesses", status: "failed" },
        { item: "Ladders", status: "passed" },
        { item: "Power Tools", status: "passed" }
      ]
    }
  ],
  certifications: [
    {
      id: "CERT-2024-001",
      type: "OSHA Safety",
      holder: "Mike Johnson",
      issueDate: "2023-06-15",
      expiryDate: "2024-06-15",
      status: "active",
      provider: "OSHA",
      details: "General Construction Safety"
    },
    {
      id: "CERT-2024-002",
      type: "First Aid",
      holder: "Steve Williams",
      issueDate: "2023-09-01",
      expiryDate: "2024-09-01",
      status: "active",
      provider: "Red Cross",
      details: "CPR and Basic First Aid"
    }
  ]
};

const Safety = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'passed':
        return <Badge className="bg-green-500">Passed</Badge>;
      case 'action_required':
        return <Badge className="bg-yellow-500">Action Required</Badge>;
      case 'failed':
        return <Badge className="bg-red-500">Failed</Badge>;
      case 'investigated':
        return <Badge className="bg-blue-500">Investigated</Badge>;
      case 'under_review':
        return <Badge className="bg-orange-500">Under Review</Badge>;
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'low':
        return <Badge className="bg-yellow-500">Low</Badge>;
      case 'medium':
        return <Badge className="bg-orange-500">Medium</Badge>;
      case 'high':
        return <Badge className="bg-red-500">High</Badge>;
      default:
        return <Badge>Unknown</Badge>;
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
                <h1 className="text-2xl md:text-3xl font-semibold">Safety Compliance</h1>
                <p className="text-muted-foreground mt-2">Monitor and manage safety protocols</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <FileCheck className="mr-2 h-4 w-4" />
                  New Inspection
                </Button>
                <Button>
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Report Incident
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Open Incidents</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-yellow-500" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Pending Inspections</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <ClipboardCheck className="h-8 w-8 text-blue-500" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Active Certifications</p>
                    <p className="text-2xl font-bold">15</p>
                  </div>
                  <ShieldCheck className="h-8 w-8 text-green-500" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Safety Score</p>
                    <p className="text-2xl font-bold">92%</p>
                  </div>
                  <HardHat className="h-8 w-8 text-green-500" />
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <Tabs defaultValue="incidents">
                <TabsList>
                  <TabsTrigger value="incidents">Incidents</TabsTrigger>
                  <TabsTrigger value="inspections">Inspections</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                </TabsList>

                <TabsContent value="incidents" className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search incidents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {safetyData.incidents.map((incident) => (
                        <TableRow key={incident.id}>
                          <TableCell className="font-medium">{incident.id}</TableCell>
                          <TableCell>{incident.date}</TableCell>
                          <TableCell className="capitalize">{incident.type.replace('_', ' ')}</TableCell>
                          <TableCell>{incident.location}</TableCell>
                          <TableCell>{incident.reportedBy}</TableCell>
                          <TableCell>{getSeverityBadge(incident.severity)}</TableCell>
                          <TableCell>{getStatusBadge(incident.status)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Update Status
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="inspections" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Inspector</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Next Inspection</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {safetyData.inspections.map((inspection) => (
                        <TableRow key={inspection.id}>
                          <TableCell className="font-medium">{inspection.id}</TableCell>
                          <TableCell>{inspection.date}</TableCell>
                          <TableCell className="capitalize">{inspection.type.replace('_', ' ')}</TableCell>
                          <TableCell>{inspection.location}</TableCell>
                          <TableCell>{inspection.inspector}</TableCell>
                          <TableCell>{getStatusBadge(inspection.status)}</TableCell>
                          <TableCell>{inspection.nextInspection}</TableCell>
                          <TableCell>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="certifications" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Holder</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {safetyData.certifications.map((cert) => (
                        <TableRow key={cert.id}>
                          <TableCell className="font-medium">{cert.id}</TableCell>
                          <TableCell>{cert.type}</TableCell>
                          <TableCell>{cert.holder}</TableCell>
                          <TableCell>{cert.provider}</TableCell>
                          <TableCell>{cert.issueDate}</TableCell>
                          <TableCell>{cert.expiryDate}</TableCell>
                          <TableCell>{getStatusBadge(cert.status)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Safety; 