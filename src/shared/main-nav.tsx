import { NavLink } from "react-router-dom";
import type { MouseEvent } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { MoonriseIcon, CalendarTickIcon, AFrameCabinIcon, StaffIcon, CogIcon } from "@/shared/nav-icons";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: MoonriseIcon },
  { to: "/bookings", label: "Bookings", icon: CalendarTickIcon },
  { to: "/cabins", label: "Cabins", icon: AFrameCabinIcon },
  { to: "/users", label: "Staff", icon: StaffIcon },
  { to: "/settings", label: "Settings", icon: CogIcon },
];

function MainNav() {
  const { isMobile, setOpenMobile } = useSidebar();

  function handleNavigate(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (isMobile) setOpenMobile(false);
  }

  // Active page: lighter navy block, ivory text, bronze icon.
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-4 px-4 pt-3.5 pb-3 text-[11px] font-semibold uppercase tracking-[0.26em] transition-colors duration-200 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-sidebar-ring [&>svg]:size-5.5 [&>svg]:-my-1 [&>svg]:shrink-0 ${isActive
      ? "bg-sidebar-accent text-accent-50"
      : "text-primary-300 hover:bg-sidebar-accent/50 hover:text-accent-100"
    }`;

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink to={to} className={navLinkClasses} onClick={handleNavigate}>
              <Icon aria-hidden="true" />
              <span className="flex-1">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MainNav;
