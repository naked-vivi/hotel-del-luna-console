import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "@/lib/utils"

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "inline-flex h-6 w-11 shrink-0 items-center border border-input bg-muted p-0.5 transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring data-checked:border-primary data-checked:bg-primary data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="block size-4.5 border border-input bg-card transition-transform duration-200 data-checked:translate-x-5 data-checked:border-transparent data-checked:bg-primary-foreground"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
