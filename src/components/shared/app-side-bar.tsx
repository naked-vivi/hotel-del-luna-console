import MainNav from "@/components/shared/main-nav"
import Logo from "@/components/shared/logo"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { Collapsible } from "@/components/ui/collapsible"
import Uploader from "@/components/shared/uploader"
import { usePermissions } from "@/hooks/authentication/use-permissions"

export function AppSidebar() {
    const { can } = usePermissions()

    return (
        <Sidebar className="[--icon-accent:var(--sidebar-primary)]">
            <SidebarHeader className="px-6 pt-12 pb-10">
                <div className="flex justify-center">
                    <Logo tone="night" />
                </div>
            </SidebarHeader>

            <SidebarContent className="px-3">
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup className="p-0">
                        <p className="px-4 pb-3 text-[9.5px] font-semibold uppercase tracking-[0.36em] text-primary-500">
                            The house
                        </p>
                        <MainNav />
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>

            <SidebarFooter className="gap-4 px-6 pb-8">
                {import.meta.env.DEV && can("sampleData.replace") && <Uploader />}
                <p className="text-center text-[9.5px] font-semibold uppercase tracking-[0.36em] text-primary-500">
                    Open dusk till dawn
                </p>
            </SidebarFooter>
        </Sidebar>
    )
}
