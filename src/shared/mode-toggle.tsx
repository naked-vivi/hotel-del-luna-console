import { MoonIcon, SunIcon } from "@/shared/icons"

import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    function toggleTheme() {
        const isDark = theme === "dark" || (
            theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches
        )
        setTheme(isDark ? "light" : "dark")
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
