import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
import { usePermissions } from "@/hooks/authentication/use-permissions";

function PermissionRoute({ permission }: PermissionRouteProps) {
  const { canView } = usePermissions();
  const allowed = canView(permission);

  useEffect(() => {
    if (!allowed) toast.error("Admins only", { id: `denied-${permission}`, description: "Ask an admin if you need this page." });
  }, [allowed, permission]);

  if (!allowed) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

export default PermissionRoute;
