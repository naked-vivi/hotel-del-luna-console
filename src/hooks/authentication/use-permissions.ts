import useUser from "@/hooks/authentication/use-user";
import { accessLock, getUserRole, hasPermission, isDemoUser } from "@/lib/helpers";

export function usePermissions() {
  const { user } = useUser();
  const role = getUserRole(user);
  const isDemo = isDemoUser(user);

  return {
    role,
    isAdmin: role === "admin",
    isDemo,
    can: (permission: Permission) => accessLock(role, isDemo, permission) === null,
    canView: (permission: Permission) => hasPermission(role, permission),
    lockFor: (permission: Permission) => accessLock(role, isDemo, permission),
  };
}
