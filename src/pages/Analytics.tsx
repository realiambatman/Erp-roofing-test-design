import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
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
  Legend
} from 'recharts';

// Helper function for INR formatting
const formatINR = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

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

const Analytics = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">Analytics Overview</h1>
              <p className="text-muted-foreground mt-2">Track your business performance and metrics.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
                <p className="text-2xl font-bold mt-2">{formatINR(totalSales)}</p>
                <p className="text-sm text-muted-foreground mt-1">Last 6 months</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Total Expenses</h3>
                <p className="text-2xl font-bold mt-2">{formatINR(totalExpenses)}</p>
                <p className="text-sm text-muted-foreground mt-1">Last 6 months</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Net Profit</h3>
                <p className={`text-2xl font-bold mt-2 ${totalProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {formatINR(totalProfit)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Last 6 months</p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Avg. Project Value</h3>
                <p className="text-2xl font-bold mt-2">{formatINR(averageProjectValue)}</p>
                <p className="text-sm text-muted-foreground mt-1">Per project</p>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue vs Expenses Chart */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Revenue vs Expenses</h2>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis 
                        tickFormatter={(value) => `₹${(value/1000)}K`}
                      />
                      <Tooltip 
                        formatter={(value: number) => [formatINR(value), '']}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#16a34a" 
                        name="Revenue" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="expenses" 
                        stroke="#dc2626" 
                        name="Expenses" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Monthly Profit Chart */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Monthly Profit</h2>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis 
                        tickFormatter={(value) => `₹${(value/1000)}K`}
                      />
                      <Tooltip 
                        formatter={(value: number) => [formatINR(value), 'Profit']}
                      />
                      <Bar 
                        dataKey="profit" 
                        fill="#6366f1"
                        name="Profit"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Detailed Metrics Table */}
              <Card className="p-6 lg:col-span-2">
                <h2 className="text-lg font-semibold mb-4">Monthly Performance Metrics</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-4 font-medium text-sm text-muted-foreground">
                    <span>Month</span>
                    <span>Revenue</span>
                    <span>Expenses</span>
                    <span>Profit</span>
                    <span>Projects</span>
                  </div>
                  {data.map((month) => (
                    <div key={month.name} className="grid grid-cols-5 gap-4 p-2 hover:bg-gray-50 rounded-lg">
                      <span className="font-medium">{month.name}</span>
                      <span className="text-emerald-600">{formatINR(month.sales)}</span>
                      <span className="text-red-600">{formatINR(month.expenses)}</span>
                      <span className={month.profit >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                        {formatINR(month.profit)}
                      </span>
                      <span>{month.projects}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;
