import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

function SidebarToggle() {
  const { toggleSidebar, open, openMobile, isMobile } = useSidebar();
  const isOpen = isMobile ? openMobile : open;
  const divider = isOpen ? 10.5 : 7.5;
  const moonX = (3 + divider) / 2;

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="border-border hover:border-foreground/50 hover:bg-transparent aria-expanded:border-border aria-expanded:bg-transparent"
      data-sidebar="trigger"
      onClick={toggleSidebar}
      aria-label={isOpen ? "Close the menu" : "Open the menu"}
      aria-expanded={isOpen}
      title={isOpen ? "Close the menu" : "Open the menu"}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5.5" fill="none" strokeWidth="1.15" strokeLinecap="square">
        <rect x="2.5" y="4.5" width="19" height="15" className="stroke-current" />
        <path d={`M${divider} 4.5V19.5`} className="stroke-current" />
        <g className="text-gold">
          <circle cx={moonX} cy="8.75" r="1.6" stroke="currentColor" strokeWidth="0.9" />
          <path d={`M${moonX} 7.15A1.6 1.6 0 0 1 ${moonX} 10.35Z`} fill="currentColor" />
        </g>
        {isOpen && <path d="M4.75 13H8.25M4.75 15.75H7.5" className="stroke-current opacity-60" />}
      </svg>
    </Button>
  );
}

export default SidebarToggle;
