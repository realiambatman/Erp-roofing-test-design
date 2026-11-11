import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { navGroups, settingsItem, type NavItem } from "@/components/navigation";

function BrandMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0" aria-hidden>
      <rect width="32" height="32" rx="6" className="fill-sidebar-accent" />
      <path
        d="M6 17 16 8l10 9"
        fill="none"
        stroke="hsl(var(--warning))"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 18v6h12v-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavLink({ item }: { item: NavItem }) {
  const { pathname } = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();
  const isActive = pathname === item.href;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={item.label} className="h-8 max-md:h-9">
        <Link
          to={item.href}
          aria-current={isActive ? "page" : undefined}
          onClick={() => {
            if (isMobile) setOpenMobile(false);
          }}
        >
          <item.icon />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-12 justify-center border-b border-sidebar-border px-2.5 py-0 group-data-[collapsible=icon]:px-2">
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-md text-sidebar-accent-foreground outline-none ring-sidebar-ring focus-visible:ring-2"
        >
          <BrandMark />
          <span className="flex min-w-0 flex-col leading-none group-data-[collapsible=icon]:hidden">
            <span className="font-display truncate text-base font-semibold">Roofing ERP</span>
            <span className="mt-0.5 truncate text-2xs text-sidebar-muted">Design prototype</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-0 py-1">
        {navGroups.map((group) => (
          <SidebarGroup key={group.label} className="py-1.5">
            <SidebarGroupLabel className="h-6">{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {group.items.map((item) => (
                  <NavLink key={item.href} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <NavLink item={settingsItem} />
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
