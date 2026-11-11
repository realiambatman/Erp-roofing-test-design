import { AlertTriangle, CalendarDays, FileCheck, FileText, MoreHorizontal } from "lucide-react";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/format";

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

const RowActions = ({ label }: { label: string }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="h-7 w-7" aria-label={`Actions for ${label}`}>
        <MoreHorizontal />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>
        <FileText className="mr-2 h-4 w-4" />
        View Details
      </DropdownMenuItem>
      <DropdownMenuItem>
        <CalendarDays className="mr-2 h-4 w-4" />
        Update Status
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const ActionsHead = () => (
  <TableHead className="w-10">
    <span className="sr-only">Actions</span>
  </TableHead>
);

const Safety = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const incidents = safetyData.incidents.filter((incident) =>
    [incident.id, incident.location, incident.reportedBy, incident.description].some((field) =>
      field.toLowerCase().includes(query)
    )
  );

  return (
    <>
      <PageHeader
        title="Safety Compliance"
        description="Monitor and manage safety protocols"
        actions={
          <>
            <Button variant="outline">
              <FileCheck />
              New Inspection
            </Button>
            <Button>
              <AlertTriangle />
              Report Incident
            </Button>
          </>
        }
      />

      <StatStrip
        stats={[
          { label: "Open Incidents", value: "2", hint: "Awaiting close-out", tone: "attention" },
          { label: "Pending Inspections", value: "3", hint: "Scheduled this month" },
          { label: "Active Certifications", value: "15", hint: "Across the crew" },
          { label: "Safety Score", value: "92%", hint: "Rolling 90 days" },
        ]}
      />

      <Tabs defaultValue="incidents">
        <TabsList>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents">
          <Panel
            padded={false}
            toolbar={
              <>
                <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search incidents..." />
                <span className="num ml-auto text-xs text-muted-foreground">
                  {incidents.length} of {safetyData.incidents.length}
                </span>
              </>
            }
          >
            {incidents.length === 0 ? (
              <EmptyState title="No incidents match this search" hint="Try an incident ID, location or reporter." />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Incident</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <ActionsHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell className="num font-medium">{incident.id}</TableCell>
                      <TableCell className="num">{formatDate(incident.date)}</TableCell>
                      <TableCell className="whitespace-nowrap capitalize">{incident.type.replace("_", " ")}</TableCell>
                      <TableCell className="min-w-[15rem]">
                        <div>{incident.description}</div>
                        <div className="text-xs text-muted-foreground">{incident.location}</div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{incident.reportedBy}</TableCell>
                      <TableCell>
                        <StatusBadge status={incident.severity} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={incident.status} />
                      </TableCell>
                      <TableCell>
                        <RowActions label={incident.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Panel>
        </TabsContent>

        <TabsContent value="inspections">
          <Panel padded={false}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Inspector</TableHead>
                  <TableHead>Findings</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead numeric>Next Inspection</TableHead>
                  <ActionsHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {safetyData.inspections.map((inspection) => (
                  <TableRow key={inspection.id}>
                    <TableCell className="num font-medium">{inspection.id}</TableCell>
                    <TableCell className="num">{formatDate(inspection.date)}</TableCell>
                    <TableCell className="whitespace-nowrap capitalize">{inspection.type.replace("_", " ")}</TableCell>
                    <TableCell className="whitespace-nowrap">{inspection.location}</TableCell>
                    <TableCell className="whitespace-nowrap">{inspection.inspector}</TableCell>
                    <TableCell className="min-w-[14rem] text-muted-foreground">{inspection.findings}</TableCell>
                    <TableCell>
                      <StatusBadge status={inspection.status} />
                    </TableCell>
                    <TableCell numeric>{formatDate(inspection.nextInspection)}</TableCell>
                    <TableCell>
                      <RowActions label={inspection.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Panel>
        </TabsContent>

        <TabsContent value="certifications">
          <Panel padded={false}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Holder</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead numeric>Issue Date</TableHead>
                  <TableHead numeric>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <ActionsHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {safetyData.certifications.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="num font-medium">{cert.id}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div>{cert.type}</div>
                      <div className="text-xs text-muted-foreground">{cert.details}</div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{cert.holder}</TableCell>
                    <TableCell className="whitespace-nowrap">{cert.provider}</TableCell>
                    <TableCell numeric>{formatDate(cert.issueDate)}</TableCell>
                    <TableCell numeric>{formatDate(cert.expiryDate)}</TableCell>
                    <TableCell>
                      <StatusBadge status={cert.status} />
                    </TableCell>
                    <TableCell>
                      <RowActions label={cert.id} />
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

export default Safety;
