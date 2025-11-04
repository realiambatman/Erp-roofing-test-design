import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { BarChart3, Users, Package, TrendingUp, Calendar, AlertTriangle } from "lucide-react";

// Helper function for INR formatting
const formatINR = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const QuickStats = () => {
  const stats = [
    { 
      label: "Monthly Revenue", 
      value: formatINR(1250000), 
      icon: TrendingUp, 
      trend: "+14%",
      description: "vs. last month"
    },
    { 
      label: "Active Projects", 
      value: "12", 
      icon: Package, 
      trend: "+3",
      description: "new this month"
    },
    { 
      label: "Team Members", 
      value: "45", 
      icon: Users, 
      trend: "+5",
      description: "since last month"
    },
    { 
      label: "Pending Jobs", 
      value: "8", 
      icon: Calendar, 
      trend: "-2",
      description: "vs. last week"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6 glass-card animate-in">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-2xl font-semibold mt-2">{stat.value}</h3>
              <div className="flex items-center mt-1">
                <span className={`text-sm font-medium ${stat.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.trend}
                </span>
                <span className="text-sm text-muted-foreground ml-1">
                  {stat.description}
                </span>
              </div>
            </div>
            <stat.icon className="h-5 w-5 text-muted-foreground" />
          </div>
        </Card>
      ))}
    </div>
  );
};

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    type: "project_start",
    title: "New Project Started",
    description: "Residential Roofing - Green Park Villa",
    timestamp: "2 hours ago",
    value: formatINR(350000)
  },
  {
    id: 2,
    type: "payment_received",
    title: "Payment Received",
    description: "Commercial Project - Tech Park Building B",
    timestamp: "5 hours ago",
    value: formatINR(725000)
  },
  {
    id: 3,
    type: "inspection_completed",
    title: "Inspection Completed",
    description: "Maintenance Work - Sunshine Apartments",
    timestamp: "1 day ago",
    value: "Passed"
  },
  {
    id: 4,
    type: "estimate_sent",
    title: "Estimate Sent",
    description: "Industrial Roofing - Metro Warehouse",
    timestamp: "1 day ago",
    value: formatINR(1250000)
  },
  {
    id: 5,
    type: "material_ordered",
    title: "Material Ordered",
    description: "Bulk order - Metal Roofing Sheets",
    timestamp: "2 days ago",
    value: formatINR(480000)
  }
];

// Mock data for upcoming deadlines
const upcomingDeadlines = [
  {
    id: 1,
    project: "Green Park Villa",
    deadline: "Tomorrow",
    status: "on_track",
    completion: 85
  },
  {
    id: 2,
    project: "Tech Park Building B",
    deadline: "Next Week",
    status: "delayed",
    completion: 60
  },
  {
    id: 3,
    project: "Sunshine Apartments",
    deadline: "2 Weeks",
    status: "on_track",
    completion: 30
  }
];

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-semibold">Welcome back</h1>
              <p className="text-muted-foreground mt-2">Here's what's happening with your business today.</p>
            </div>
            
            <QuickStats />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 glass-card h-[400px] animate-in overflow-auto">
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start justify-between p-3 hover:bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-sm text-muted-foreground mt-1">{activity.timestamp}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{activity.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-6 glass-card h-[400px] animate-in">
                <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="flex items-start justify-between p-3 hover:bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{deadline.project}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-sm ${
                            deadline.status === 'on_track' ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {deadline.status === 'on_track' ? '● On Track' : '● Delayed'}
                          </span>
                          <span className="text-sm text-muted-foreground">Due {deadline.deadline}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{deadline.completion}%</span>
                        <div className="w-32 h-2 bg-muted rounded-full mt-2">
                          <div 
                            className={`h-full rounded-full ${
                              deadline.status === 'on_track' ? 'bg-emerald-600' : 'bg-red-600'
                            }`}
                            style={{ width: `${deadline.completion}%` }}
                          />
                        </div>
                      </div>
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

export default Index;
