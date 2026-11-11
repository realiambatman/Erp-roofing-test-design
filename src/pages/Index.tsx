import { Link } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatStrip } from "@/components/layout/StatStrip";
import { Meter, Panel } from "@/components/layout/Panel";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/format";

const stats = [
  { label: "Monthly Revenue", value: formatINR(1250000), trend: "+14%", description: "vs. last month" },
  { label: "Active Projects", value: "12", trend: "+3", description: "new this month" },
  { label: "Team Members", value: "45", trend: "+5", description: "since last month" },
  { label: "Pending Jobs", value: "8", trend: "-2", description: "vs. last week" },
];

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    type: "project_start",
    title: "New Project Started",
    description: "Residential Roofing - Green Park Villa",
    timestamp: "2 hours ago",
    amount: 350000,
  },
  {
    id: 2,
    type: "payment_received",
    title: "Payment Received",
    description: "Commercial Project - Tech Park Building B",
    timestamp: "5 hours ago",
    amount: 725000,
  },
  {
    id: 3,
    type: "inspection_completed",
    title: "Inspection Completed",
    description: "Maintenance Work - Sunshine Apartments",
    timestamp: "1 day ago",
    status: "Passed",
  },
  {
    id: 4,
    type: "estimate_sent",
    title: "Estimate Sent",
    description: "Industrial Roofing - Metro Warehouse",
    timestamp: "1 day ago",
    amount: 1250000,
  },
  {
    id: 5,
    type: "material_ordered",
    title: "Material Ordered",
    description: "Bulk order - Metal Roofing Sheets",
    timestamp: "2 days ago",
    amount: 480000,
  },
];

// Mock data for upcoming deadlines
const upcomingDeadlines = [
  { id: 1, project: "Green Park Villa", deadline: "Tomorrow", status: "on_track", completion: 85 },
  { id: 2, project: "Tech Park Building B", deadline: "Next Week", status: "delayed", completion: 60 },
  { id: 3, project: "Sunshine Apartments", deadline: "2 Weeks", status: "on_track", completion: 30 },
];

const Index = () => {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Here's what's happening with your business today."
        actions={
          <Button asChild variant="outline">
            <Link to="/analytics">View analytics</Link>
          </Button>
        }
      />

      <StatStrip
        stats={stats.map((stat) => ({
          label: stat.label,
          value: stat.value,
          hint: (
            <>
              <span className="num font-medium text-foreground">{stat.trend}</span> {stat.description}
            </>
          ),
        }))}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Panel title="Recent Activity" aside={`${recentActivities.length} events`} padded={false} className="lg:col-span-3">
          <ul className="divide-y">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="flex items-center justify-between gap-4 px-4 py-2.5">
                <div className="min-w-0">
                  <p className="truncate font-medium">{activity.title}</p>
                  <p className="truncate text-muted-foreground">{activity.description}</p>
                </div>
                <div className="shrink-0 text-right">
                  {activity.amount !== undefined ? (
                    <p className="num font-medium">{formatINR(activity.amount)}</p>
                  ) : (
                    <StatusBadge status={activity.status ?? ""} />
                  )}
                  <p className="mt-0.5 text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Upcoming Deadlines" aside={`${upcomingDeadlines.length} projects`} padded={false} className="lg:col-span-2">
          <ul className="divide-y">
            {upcomingDeadlines.map((deadline) => {
              const delayed = deadline.status !== "on_track";
              return (
                <li key={deadline.id} className="px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate font-medium">{deadline.project}</p>
                    <StatusBadge status={deadline.status} />
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <Meter
                      value={deadline.completion}
                      tone={delayed ? "critical" : "default"}
                      label={`${deadline.project} completion`}
                    />
                    <span className="num w-9 shrink-0 text-right text-xs font-medium">{deadline.completion}%</span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">Due {deadline.deadline}</p>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>
    </>
  );
};

export default Index;
