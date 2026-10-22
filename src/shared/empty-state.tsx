import type { ReactNode } from "react";
import { HalfMoon } from "./logo";

/** Calm placeholder for empty lists: a faint moon, one line, optional action. */
function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div role="status" className="flex flex-col items-center gap-4 border border-border bg-card px-6 py-16 text-center">
      <HalfMoon className="size-8 text-gold opacity-70" />
      <p className="text-xl font-light text-foreground">{title}</p>
      {children && <p className="max-w-[48ch] text-sm text-muted-foreground">{children}</p>}
      {action}
    </div>
  );
}

export default EmptyState;
