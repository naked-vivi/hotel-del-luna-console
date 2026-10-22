import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function SettingsSaveBar({ isDirty, isUpdating, onReset }: SettingsSaveBarProps) {
  return (
    <div className={cn("z-10 flex items-center justify-between gap-3 border border-border bg-card px-4 py-4 sm:px-8", isDirty && "sticky bottom-0")}>
      <p className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
        {isDirty && <span aria-hidden="true" className="size-1.5 bg-gold" />}
        {isUpdating ? "Saving the house rules…" : isDirty ? "You have unsaved changes" : "Everything is saved"}
      </p>
      <div className="grid flex-1 grid-cols-2 gap-3 sm:flex sm:flex-none">
        <Button type="button" variant="outline" onClick={onReset} disabled={isUpdating || !isDirty}>Reset changes</Button>
        <Button type="submit" disabled={isUpdating || !isDirty}>{isUpdating ? "Saving…" : "Save settings"}</Button>
      </div>
    </div>
  );
}

export default SettingsSaveBar;
