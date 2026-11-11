import { PageHeader } from "@/components/layout/PageHeader";
import { StatStrip } from "@/components/layout/StatStrip";
import { Panel } from "@/components/layout/Panel";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatINR } from "@/lib/format";
import { axisProps, chartColors, gridProps, tooltipProps } from "@/lib/chart-theme";
import { cn } from "@/lib/utils";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend,
  ReferenceLine
} from 'recharts';

// Updated data with realistic INR values
const data = [
  { name: 'Jan', sales: 400000, expenses: 240000, profit: 160000, projects: 5 },
  { name: 'Feb', sales: 300000, expenses: 139800, profit: 160200, projects: 4 },
  { name: 'Mar', sales: 200000, expenses: 980000, profit: -780000, projects: 3 },
  { name: 'Apr', sales: 278000, expenses: 390800, profit: -112800, projects: 6 },
  { name: 'May', sales: 189000, expenses: 480000, profit: -291000, projects: 4 },
  { name: 'Jun', sales: 239000, expenses: 380000, profit: -141000, projects: 5 },
];

// Calculate key metrics
const totalSales = data.reduce((sum, month) => sum + month.sales, 0);
const totalExpenses = data.reduce((sum, month) => sum + month.expenses, 0);
const totalProfit = totalSales - totalExpenses;
const averageProjectValue = totalSales / data.reduce((sum, month) => sum + month.projects, 0);

const totalProjects = data.reduce((sum, month) => sum + month.projects, 0);

const Analytics = () => {
  return (
    <>
      <PageHeader
        title="Analytics Overview"
        description="Track your business performance and metrics."
      />

      <StatStrip
        stats={[
          { label: "Total Revenue", value: formatINR(totalSales), hint: "Last 6 months" },
          { label: "Total Expenses", value: formatINR(totalExpenses), hint: "Last 6 months" },
          {
            label: "Net Profit",
            value: formatINR(totalProfit),
            hint: "Last 6 months",
            tone: totalProfit >= 0 ? "default" : "critical",
          },
          { label: "Avg. Project Value", value: formatINR(averageProjectValue), hint: "Per project" },
        ]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Revenue vs Expenses" aside="Jan to Jun">
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="name" {...axisProps} />
                <YAxis {...axisProps} width={52} tickFormatter={(value: number) => formatINR(value, { compact: true })} />
                <Tooltip {...tooltipProps} formatter={(value: number, name: string) => [formatINR(value), name]} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="plainline"
                  height={28}
                  wrapperStyle={{ fontSize: 12 }}
                  formatter={(value: string) => <span className="text-muted-foreground">{value}</span>}
                />
                <Line
                  type="linear"
                  dataKey="sales"
                  name="Revenue"
                  stroke={chartColors.primary}
                  strokeWidth={2}
                  dot={{ r: 3, fill: chartColors.primary, strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                  isAnimationActive={false}
                />
                <Line
                  type="linear"
                  dataKey="expenses"
                  name="Expenses"
                  stroke={chartColors.accent}
                  strokeWidth={2}
                  dot={{ r: 3, fill: chartColors.accent, strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Monthly Profit" aside="Jan to Jun">
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="name" {...axisProps} />
                <YAxis {...axisProps} width={56} tickFormatter={(value: number) => formatINR(value, { compact: true })} />
                <Tooltip {...tooltipProps} formatter={(value: number) => [formatINR(value), "Profit"]} />
                <ReferenceLine y={0} stroke="hsl(var(--input))" />
                <Bar dataKey="profit" name="Profit" maxBarSize={36} isAnimationActive={false}>
                  {data.map((month) => (
                    <Cell
                      key={month.name}
                      fill={month.profit >= 0 ? chartColors.primary : chartColors.negative}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel title="Monthly Performance Metrics" aside={`${data.length} months`} padded={false}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead numeric>Revenue</TableHead>
              <TableHead numeric>Expenses</TableHead>
              <TableHead numeric>Profit</TableHead>
              <TableHead numeric>Projects</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((month) => (
              <TableRow key={month.name}>
                <TableCell className="font-medium">{month.name}</TableCell>
                <TableCell numeric>{formatINR(month.sales)}</TableCell>
                <TableCell numeric>{formatINR(month.expenses)}</TableCell>
                <TableCell numeric className={cn("font-medium", month.profit < 0 && "text-destructive")}>
                  {formatINR(month.profit)}
                </TableCell>
                <TableCell numeric>{month.projects}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell numeric>{formatINR(totalSales)}</TableCell>
              <TableCell numeric>{formatINR(totalExpenses)}</TableCell>
              <TableCell numeric className={cn(totalProfit < 0 && "text-destructive")}>
                {formatINR(totalProfit)}
              </TableCell>
              <TableCell numeric>{totalProjects}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Panel>
    </>
  );
};

export default Analytics;
