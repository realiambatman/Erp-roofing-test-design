import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Employees from "./pages/Employees";
import Inventory from "./pages/Inventory";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";
import Payroll from "./pages/Payroll";
import Projects from "./pages/Projects";
import Customers from "./pages/Customers";
import NotFound from "./pages/NotFound";
import Estimates from "./pages/Estimates";
import WorkOrders from "./pages/WorkOrders";
import TimeTracking from "./pages/TimeTracking";
import Equipment from "./pages/Equipment";
import Safety from "./pages/Safety";
import Suppliers from "./pages/Suppliers";
import Invoicing from "./pages/Invoicing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/estimates" element={<Estimates />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/work-orders" element={<WorkOrders />} />
          <Route path="/time-tracking" element={<TimeTracking />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/invoicing" element={<Invoicing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
