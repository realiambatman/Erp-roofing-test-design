
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold">Employees</h1>
                <p className="text-muted-foreground mt-2">Manage your team members and their roles.</p>
              </div>
              <Button className="w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </div>

            <Card className="p-4 glass-card animate-in">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search employees..."
                  aria-label="Search employees"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee) => (
                <Card key={employee.id} className="p-6 glass-card animate-in">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">{employee.name}</h3>
                      <p className="text-sm text-muted-foreground">{employee.role}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4" />
                        <span>{employee.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4" />
                        <span>{employee.phone}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <span className="text-sm font-medium">{employee.department}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Employees;
