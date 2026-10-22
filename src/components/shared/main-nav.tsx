import { NavLink } from "react-router-dom";
import type { MouseEvent } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { NAV_LINKS } from "@/lib/options";
import { isPlainLeftClick, navLinkClassName } from "@/lib/helpers";
import { usePermissions } from "@/hooks/authentication/use-permissions";
import LockedNavItem from "@/components/shared/locked-nav-item";

function MainNav() {
  const { isMobile, setOpenMobile } = useSidebar();
  const { canView } = usePermissions();

  function handleNavigate(event: MouseEvent<HTMLAnchorElement>) {
    if (isPlainLeftClick(event) && isMobile) setOpenMobile(false);
  }

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-col gap-1">
        {NAV_LINKS.map(({ to, label, icon: Icon, permission }) => (
          <li key={to}>
            {permission && !canView(permission) ? (
              <LockedNavItem label={label} icon={Icon} />
            ) : (
              <NavLink to={to} className={navLinkClassName} onClick={handleNavigate}>
                <Icon aria-hidden="true" />
                <span className="flex-1">{label}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MainNav;
