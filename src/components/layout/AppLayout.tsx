import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { findNav } from "@/components/navigation";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const today = new Date().toLocaleDateString("en-IN", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});

// The sidebar component stores its state in a cookie; read it back so a
// collapsed sidebar stays collapsed after a reload.
const sidebarDefaultOpen = !document.cookie.split("; ").includes("sidebar:state=false");

export function AppLayout() {
  const { pathname } = useLocation();
  const { group, item } = findNav(pathname);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <SidebarProvider defaultOpen={sidebarDefaultOpen}>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-2 focus:top-2"
      >
        Skip to content
      </a>
      <AppSidebar />
      <SidebarInset className="min-w-0 bg-background">
        <div className="sticky top-0 z-20 flex h-12 shrink-0 items-center gap-2 border-b bg-card px-3 sm:px-4">
          <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
          <span aria-hidden className="h-4 w-px bg-border" />
          <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
            {group ? (
              <>
                <span className="hidden text-muted-foreground sm:inline">{group}</span>
                <span aria-hidden className="hidden text-muted-foreground/60 sm:inline">/</span>
              </>
            ) : null}
            <span className="truncate font-medium">{item?.label ?? "Not found"}</span>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <span className="num hidden text-xs text-muted-foreground md:inline">{today}</span>
            <ThemeToggle />
          </div>
        </div>
        <div ref={mainRef} id="main" tabIndex={-1} className="flex-1 outline-none">
          <div className="mx-auto w-full max-w-[88rem] space-y-4 p-3 sm:p-5 lg:p-6">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
