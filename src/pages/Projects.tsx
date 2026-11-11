import { Building2, CalendarDays, MapPin, Plus } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState, Meter, Panel, SearchInput } from "@/components/layout/Panel";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";

// Mock data for projects
const projectsData = [
  {
    id: 1,
    title: "Residential Roof Replacement",
    client: "John Smith",
    address: "123 Oak Street, Springfield",
    status: "In Progress",
    startDate: "2024-02-15",
    endDate: "2024-02-28",
    type: "Residential",
    progress: 65,
  },
  {
    id: 2,
    title: "Commercial Building Repair",
    client: "ABC Corporation",
    address: "456 Business Ave, Springfield",
    status: "Scheduled",
    startDate: "2024-03-01",
    endDate: "2024-03-10",
    type: "Commercial",
    progress: 0,
  },
  {
    id: 3,
    title: "Emergency Leak Repair",
    client: "Sarah Johnson",
    address: "789 Pine Road, Springfield",
    status: "Completed",
    startDate: "2024-02-10",
    endDate: "2024-02-11",
    type: "Residential",
    progress: 100,
  },
];

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const filteredProjects = projectsData.filter(
    (project) =>
      project.title.toLowerCase().includes(query) ||
      project.client.toLowerCase().includes(query) ||
      project.address.toLowerCase().includes(query)
  );

  return (
    <>
      <PageHeader
        title="Projects"
        description="Manage your roofing projects and track their progress."
        actions={
          <Button>
            <Plus />
            New Project
          </Button>
        }
      />

      <Panel
        padded={false}
        toolbar={
          <>
            <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search projects..." />
            <span className="num ml-auto text-xs text-muted-foreground">
              {filteredProjects.length} of {projectsData.length}
            </span>
          </>
        }
      >
        {filteredProjects.length === 0 ? (
          <EmptyState title="No projects match this search" hint="Try a project title, client name or address." />
        ) : (
          <ul className="grid grid-cols-1 gap-px bg-border lg:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <li key={project.id} className="flex flex-col gap-3 bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold leading-snug">{project.title}</h3>
                    <p className="text-muted-foreground">{project.client}</p>
                  </div>
                  <StatusBadge status={project.status} />
                </div>

                <dl className="space-y-1.5 text-muted-foreground [&_svg]:h-3.5 [&_svg]:w-3.5 [&_svg]:shrink-0">
                  <div className="flex items-center gap-2">
                    <MapPin aria-hidden />
                    <dt className="sr-only">Address</dt>
                    <dd className="truncate">{project.address}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays aria-hidden />
                    <dt className="sr-only">Dates</dt>
                    <dd className="num">
                      {formatDate(project.startDate)} to {formatDate(project.endDate)}
                    </dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 aria-hidden />
                    <dt className="sr-only">Type</dt>
                    <dd>{project.type}</dd>
                  </div>
                </dl>

                <div className="mt-auto flex items-center gap-3 border-t pt-3">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <Meter
                    value={project.progress}
                    tone={project.progress === 100 ? "success" : "default"}
                    label={`${project.title} progress`}
                  />
                  <span className="num w-9 shrink-0 text-right text-xs font-medium">{project.progress}%</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
};

export default Projects;
