import { MoonIcon, SunIcon } from "@/components/icons/icons"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/shared/use-theme"
import { isDarkTheme } from "@/lib/helpers"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    function toggleTheme() {
        setTheme(isDarkTheme(theme) ? "light" : "dark")
    }

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            className="relative"
            onClick={toggleTheme}
            aria-label="Switch between day and night"
            title="Switch between day and night"
        >
            <SunIcon aria-hidden="true" className="size-4 stroke-[1.5] opacity-100 transition-opacity dark:opacity-0" />
            <MoonIcon aria-hidden="true" className="absolute size-4 stroke-[1.5] opacity-0 transition-opacity dark:opacity-100" />
        </Button>
    )
}
