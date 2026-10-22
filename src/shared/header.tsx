import { UserIcon } from "@/shared/icons";
import { Link } from "react-router-dom";

import Logout from "@/features/authentication/logout";
import UserAvatar from "@/features/authentication/user-avatar";
import { Button } from "@/components/ui/button";
import SidebarToggle from "./sidebar-toggle";
import { ModeToggle } from "./mode-toggle";
import LobbyClock from "./lobby-clock";
import TonightMoon from "./tonight-moon";
import FrontDeskCount from "./front-desk-count";

function Divider({ className }: { className: string }) {
    return <span aria-hidden="true" className={`h-9 w-px shrink-0 bg-border ${className}`} />;
}

/**
 * Front-desk bar. Items appear as space allows:
 * clock from lg, tonight's moon from xl, arrivals and departures from 2xl.
 */
function Header() {
    return (
        <header className="sticky top-0 z-20 flex h-20 shrink-0 items-center justify-between gap-6 border-b border-border bg-background px-4 sm:px-8 lg:px-12">
            <div className="flex min-w-0 items-center gap-5">
                <SidebarToggle />
                <Divider className="hidden lg:block" />
                <div className="hidden lg:block"><LobbyClock /></div>
                <Divider className="hidden xl:block" />
                <div className="hidden xl:block"><TonightMoon /></div>
                <Divider className="hidden 2xl:block" />
                <div className="hidden 2xl:block"><FrontDeskCount /></div>
            </div>

            <div className="flex shrink-0 items-center gap-5">
                <UserAvatar />

                {/* Account, theme and log out sit together in one bordered group, like the filters. */}
                <div className="flex items-center divide-x divide-border border border-border">
                    <Button
                        variant="ghost"
                        size="icon"
                        render={<Link to="/account" />}
                        nativeButton={false}
                        aria-label="Your account"
                        title="Your account"
                    >
                        <UserIcon className="size-4 stroke-[1.5]" />
                    </Button>
                    <ModeToggle />
                    <Logout />
                </div>
            </div>
        </header>
    );
}

export default Header;
