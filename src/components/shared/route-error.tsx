import { Link, useRouteError } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CloudedMoon from "@/components/shared/clouded-moon";
import Logo from "@/components/shared/logo";
import useTitle from "@/hooks/shared/use-title";
import { routeErrorMessage } from "@/lib/helpers";

function RouteError() {
  const error = useRouteError();
  useTitle("Something went wrong");

  return (
    <div role="alert" className="relative flex min-h-svh flex-col items-center justify-center gap-8 bg-background px-6 py-16 text-center in-[main]:min-h-[60svh]">
      <Logo size="sm" className="absolute top-10 left-1/2 -translate-x-1/2 in-[main]:hidden" />
      <CloudedMoon className="w-full max-w-72" />
      <div className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">Something went wrong</p>
        <h1 className="text-3xl leading-tight font-extralight text-foreground sm:text-4xl">This page is in the fog</h1>
        <p className="max-w-[48ch] text-sm text-muted-foreground">{routeErrorMessage(error)}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="outline" onClick={() => window.location.reload()}>Try again</Button>
        <Button render={<Link to="/dashboard" />} nativeButton={false}>Back to dashboard</Button>
      </div>
    </div>
  );
}

export default RouteError;
