import { PageHeader } from "@/components/layout/PageHeader";
import { StatStrip } from "@/components/layout/StatStrip";
import { Panel } from "@/components/layout/Panel";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatINR } from "@/lib/format";

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

  const totalDeductions = mockPayrollData.reduce((sum, employee) => sum + employee.deductions, 0);

  return (
    <>
      <PageHeader title="Payroll Management" description="Manage employee payroll and compensation" />

      <StatStrip
        stats={[
          { label: "Total Payroll", value: formatINR(totalPayroll), hint: "Net pay this period" },
          { label: "Total Hours", value: totalHours, hint: "Including overtime" },
          { label: "Total Employees", value: totalEmployees, hint: "On this pay run" },
          { label: "Avg. Hourly Rate", value: formatINR(averageRate, { paise: true }), hint: "Per hour" },
        ]}
      />

      <Panel title="Current Pay Period" aside="Mar 1-15, 2024" padded={false}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Position</TableHead>
              <TableHead numeric>Hourly Rate</TableHead>
              <TableHead numeric>Hours</TableHead>
              <TableHead numeric>Overtime</TableHead>
              <TableHead numeric>Deductions</TableHead>
              <TableHead numeric>Net Pay</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPayrollData.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="whitespace-nowrap font-medium">{employee.employeeName}</TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">{employee.position}</TableCell>
                <TableCell numeric>{formatINR(employee.hourlyRate, { paise: true })}</TableCell>
                <TableCell numeric>{employee.hoursWorked}</TableCell>
                <TableCell numeric>{employee.overtime}</TableCell>
                <TableCell numeric>{formatINR(employee.deductions, { paise: true })}</TableCell>
                <TableCell numeric className="font-medium">
                  {formatINR(employee.netPay, { paise: true })}
                </TableCell>
                <TableCell>
                  <StatusBadge status={employee.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell numeric>{formatINR(totalDeductions, { paise: true })}</TableCell>
              <TableCell numeric>{formatINR(totalPayroll, { paise: true })}</TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </Panel>
    </>
  );
};

export default Payroll;
