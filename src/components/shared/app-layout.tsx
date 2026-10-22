import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/shared/app-side-bar'
import Header from '@/components/shared/header'
import { useScrollReset } from '@/hooks/shared/use-scroll-reset'

export default function Layout() {
    const scrollRef = useScrollReset<HTMLDivElement>()

    return (
        <SidebarProvider defaultOpen>
            <AppSidebar />
            <div ref={scrollRef} className="no-scrollbar relative flex h-svh min-w-0 flex-1 flex-col overflow-y-auto bg-background">
                <Header />

                <main className="w-full flex-1 px-4 pt-10 pb-16 sm:px-8 lg:px-12 lg:pt-14">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    )
}
