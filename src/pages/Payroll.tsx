import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BadgeDollarSign, Clock, Users, Calculator } from "lucide-react";

const mockPayrollData = [
  {
    id: 1,
    employeeName: "John Smith",
    position: "Senior Roofer",
    hourlyRate: 28.50,
    hoursWorked: 40,
    overtime: 5,
    deductions: 125.00,
    netPay: 1375.00,
    payPeriod: "Mar 1-15, 2024",
    status: "Paid"
  },
  {
    id: 2,
    employeeName: "Mike Johnson",
    position: "Roofing Technician",
    hourlyRate: 24.00,
    hoursWorked: 38,
    overtime: 0,
    deductions: 98.00,
    netPay: 814.00,
    payPeriod: "Mar 1-15, 2024",
    status: "Pending"
  },
  {
    id: 3,
    employeeName: "Sarah Wilson",
    position: "Project Manager",
    hourlyRate: 32.00,
    hoursWorked: 40,
    overtime: 2,
    deductions: 145.00,
    netPay: 1395.00,
    payPeriod: "Mar 1-15, 2024",
    status: "Paid"
  }
];

const Payroll = () => {
  // Calculate total payroll
  const totalPayroll = mockPayrollData.reduce(
    (sum, employee) => sum + employee.netPay,
    0
  );

  // Calculate total hours
  const totalHours = mockPayrollData.reduce(
    (sum, employee) => sum + employee.hoursWorked + employee.overtime,
    0
  );

  // Count total employees
  const totalEmployees = mockPayrollData.length;

  // Calculate average hourly rate
  const averageRate = mockPayrollData.reduce(
    (sum, employee) => sum + employee.hourlyRate,
    0
  ) / totalEmployees;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">Payroll Management</h1>
              <p className="text-muted-foreground mt-2">Manage employee payroll and compensation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <BadgeDollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Total Payroll</h3>
                    <p className="text-2xl font-bold">₹{totalPayroll.toLocaleString()}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Total Hours</h3>
                    <p className="text-2xl font-bold">{totalHours}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Total Employees</h3>
                    <p className="text-2xl font-bold">{totalEmployees}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Calculator className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Avg. Hourly Rate</h3>
                    <p className="text-2xl font-bold">₹{averageRate.toFixed(2)}</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Current Pay Period</h2>
                <span className="text-sm text-muted-foreground">Mar 1-15, 2024</span>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Hourly Rate</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Overtime</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead>Net Pay</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPayrollData.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.employeeName}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>₹{employee.hourlyRate.toFixed(2)}/hour</TableCell>
                        <TableCell>{employee.hoursWorked}</TableCell>
                        <TableCell>{employee.overtime}</TableCell>
                        <TableCell>₹{employee.deductions.toFixed(2)}</TableCell>
                        <TableCell>₹{employee.netPay.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              employee.status === "Paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {employee.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Payroll;
