import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUser from "@/hooks/authentication/use-user";
import { usePermissions } from "@/hooks/authentication/use-permissions";
import PageLoader from "@/components/shared/page-loader";
import StaffOnlyNotice from "@/components/shared/staff-only-notice";

function ProtectedRoute() {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useUser();
  const { role } = usePermissions();

  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login");
  }, [navigate, isAuthenticated, isPending]);

  if (isPending) return <PageLoader />;
  if (isAuthenticated && !role) return <StaffOnlyNotice />;
  if (isAuthenticated) return <Outlet />;
}

export default ProtectedRoute;
