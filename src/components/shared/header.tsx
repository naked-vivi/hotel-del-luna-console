import { UserIcon } from "@/components/icons/icons";
import { Link } from "react-router-dom";

import Logout from "@/components/authentication/logout";
import UserAvatar from "@/components/authentication/user-avatar";
import { Button } from "@/components/ui/button";
import SidebarToggle from "@/components/shared/sidebar-toggle";
import { ModeToggle } from "@/components/shared/mode-toggle";
import LobbyClock from "@/components/shared/lobby-clock";
import TonightMoon from "@/components/shared/tonight-moon";
import FrontDeskCount from "@/components/shared/front-desk-count";
import HeaderDivider from "@/components/shared/header-divider";

function Header() {
    return (
        <header className="sticky top-0 z-20 flex h-20 shrink-0 items-center justify-between gap-6 border-b border-border bg-background px-4 sm:px-8 lg:px-12">
            <div className="flex min-w-0 items-center gap-5">
                <SidebarToggle />
                <HeaderDivider className="hidden lg:block" />
                <div className="hidden lg:block"><LobbyClock /></div>
                <HeaderDivider className="hidden xl:block" />
                <div className="hidden xl:block"><TonightMoon /></div>
                <HeaderDivider className="hidden 2xl:block" />
                <div className="hidden 2xl:block"><FrontDeskCount /></div>
            </div>

            <div className="flex shrink-0 items-center gap-5">
                <UserAvatar />

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
