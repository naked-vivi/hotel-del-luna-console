import { cn } from "@/lib/utils";

function DashboardBox({ className, ...props }: DashboardBoxProps) {
  return (
    <div
      className={cn("flex flex-col gap-6 rounded-md border bg-card p-8 text-card-foreground", className)}
      {...props}
    />
  );
}

export default DashboardBox;
