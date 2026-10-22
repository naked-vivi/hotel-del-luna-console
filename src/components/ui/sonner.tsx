import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CloseIcon } from "@/components/icons/icons"
import { CrescentGlyph, HalfMoonGlyph, NewMoonGlyph, QuarterMoonGlyph, WaxingGlyph } from "@/components/icons/toast-icons"
import { useTheme } from "@/hooks/shared/use-theme"
import { isDarkTheme } from "@/lib/helpers"
import { TOAST_CLASS_NAMES, TOAST_DURATION } from "@/lib/constants"

function Toaster(props: ToasterProps) {
  const { theme } = useTheme()

  return (
    <Sonner
      theme={isDarkTheme(theme) ? "dark" : "light"}
      position="bottom-right"
      gap={12}
      duration={TOAST_DURATION}
      closeButton
      icons={{
        success: <HalfMoonGlyph />,
        error: <NewMoonGlyph />,
        warning: <CrescentGlyph />,
        info: <QuarterMoonGlyph />,
        loading: <WaxingGlyph />,
        close: <CloseIcon />,
      }}
      toastOptions={{ unstyled: true, classNames: TOAST_CLASS_NAMES }}
      {...props}
    />
  )
}

export { Toaster }
