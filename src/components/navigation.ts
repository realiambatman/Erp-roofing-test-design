import {
  BarChart3,
  Building2,
  CalendarDays,
  ClipboardCheck,
  Clock,
  FileText,
  IndianRupee,
  LayoutDashboard,
  Package,
  Receipt,
  Settings,
  ShieldCheck,
  Truck,
  UserCircle,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { icon: LucideIcon; label: string; href: string };
export type NavGroup = { label: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/" },
      { icon: BarChart3, label: "Analytics", href: "/analytics" },
    ],
  },
  {
    label: "Jobs",
    items: [
      { icon: Building2, label: "Projects", href: "/projects" },
      { icon: FileText, label: "Estimates", href: "/estimates" },
      { icon: ClipboardCheck, label: "Work Orders", href: "/work-orders" },
      { icon: CalendarDays, label: "Schedule", href: "/schedule" },
    ],
  },
  {
    label: "People",
    items: [
      { icon: UserCircle, label: "Customers", href: "/customers" },
      { icon: Users, label: "Employees", href: "/employees" },
      { icon: Clock, label: "Time Tracking", href: "/time-tracking" },
      { icon: ShieldCheck, label: "Safety", href: "/safety" },
    ],
  },
  {
    label: "Stock",
    items: [
      { icon: Package, label: "Inventory", href: "/inventory" },
      { icon: Wrench, label: "Equipment", href: "/equipment" },
      { icon: Truck, label: "Suppliers", href: "/suppliers" },
    ],
  },
  {
    label: "Finance",
    items: [
      { icon: Receipt, label: "Invoicing", href: "/invoicing" },
      { icon: IndianRupee, label: "Payroll", href: "/payroll" },
    ],
  },
];

export const settingsItem: NavItem = { icon: Settings, label: "Settings", href: "/settings" };

export function findNav(pathname: string): { group?: string; item?: NavItem } {
  if (pathname === settingsItem.href) return { item: settingsItem };
  for (const group of navGroups) {
    const item = group.items.find((entry) => entry.href === pathname);
    if (item) return { group: group.label, item };
  }
  return {};
}
