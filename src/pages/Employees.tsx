import { Mail, Phone, Plus } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState, Panel, SearchInput } from "@/components/layout/Panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const employeesData = [
  { id: 1, name: "John Doe", role: "Crew Foreman", email: "john@example.com", phone: "+1 234 567 890", department: "Installation" },
  { id: 2, name: "Jane Smith", role: "Project Manager", email: "jane@example.com", phone: "+1 234 567 891", department: "Operations" },
  { id: 3, name: "Mike Johnson", role: "Estimator", email: "mike@example.com", phone: "+1 234 567 892", department: "Sales" },
];

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const filteredEmployees = employeesData.filter((employee) =>
    [employee.name, employee.role, employee.department].some((field) =>
      field.toLowerCase().includes(query)
    )
  );

  return (
    <>
      <PageHeader
        title="Employees"
        description="Manage your team members and their roles."
        actions={
          <Button>
            <Plus />
            Add Employee
          </Button>
        }
      />

      <Panel
        padded={false}
        toolbar={
          <>
            <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search employees..." />
            <span className="num ml-auto text-xs text-muted-foreground">
              {filteredEmployees.length} of {employeesData.length}
            </span>
          </>
        }
      >
        {filteredEmployees.length === 0 ? (
          <EmptyState title="No employees match this search" hint="Try a name, role or department." />
        ) : (
          <ul className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
            {filteredEmployees.map((employee) => (
              <li key={employee.id} className="flex gap-3 bg-card p-4">
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary text-xs font-semibold text-secondary-foreground"
                >
                  {employee.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold leading-snug">{employee.name}</h3>
                      <p className="truncate text-muted-foreground">{employee.role}</p>
                    </div>
                    <Badge variant="neutral">{employee.department}</Badge>
                  </div>
                  <div className="mt-2.5 space-y-1 [&_svg]:h-3.5 [&_svg]:w-3.5 [&_svg]:shrink-0 [&_svg]:text-muted-foreground">
                    <a
                      href={`mailto:${employee.email}`}
                      className="flex items-center gap-2 rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Mail aria-hidden />
                      <span className="truncate">{employee.email}</span>
                    </a>
                    <a
                      href={`tel:${employee.phone.replace(/\s+/g, "")}`}
                      className="flex items-center gap-2 rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Phone aria-hidden />
                      <span className="num">{employee.phone}</span>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
};

export default Employees;
