import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-[60svh] flex-col items-center justify-center text-center">
      <p className="num font-display text-3xl font-semibold text-muted-foreground">404</p>
      <h1 className="font-display mt-2 text-2xl font-semibold">Page not found</h1>
      <p className="mt-1 max-w-sm text-muted-foreground">
        Nothing lives at <span className="break-all font-medium text-foreground">{location.pathname}</span>. Pick a
        section from the menu or go back to the dashboard.
      </p>
      <Button asChild className="mt-4">
        <Link to="/">Go to dashboard</Link>
      </Button>
    </div>
  );
};

export default NotFound;
