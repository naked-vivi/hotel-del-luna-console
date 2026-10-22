import { useEffect, useState } from "react"
import { ThemeProviderContext } from "@/lib/theme-context"
import { applyTheme } from "@/lib/helpers"
import { DARK_MODE_QUERY, THEME_STORAGE_KEY } from "@/lib/constants"

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = THEME_STORAGE_KEY,
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    )

    useEffect(() => {
        const media = window.matchMedia(DARK_MODE_QUERY)
        const apply = () => applyTheme(theme)

        apply()
        if (theme !== "system") return

        media.addEventListener("change", apply)
        return () => media.removeEventListener("change", apply)
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        },
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}
