import { useState, type ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeClosedIcon, ViewIcon } from "./icons";
import { cn } from "@/lib/utils";

/** A password field with our own eye icon to show or hide what was typed. Pass the same props as Input. */
function PasswordInput({ className, disabled, ...props }: Omit<ComponentProps<"input">, "type">) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <Input {...props} disabled={disabled} type={isVisible ? "text" : "password"} className={cn("pr-12", className)} />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-1 size-10 -translate-y-1/2 text-muted-foreground hover:bg-transparent hover:text-foreground dark:hover:bg-transparent"
        onClick={() => setIsVisible((visible) => !visible)}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        aria-controls={props.id}
        disabled={disabled}
      >
        {isVisible ? <EyeClosedIcon className="size-4.5" /> : <ViewIcon className="size-4.5" />}
      </Button>
    </div>
  );
}

export default PasswordInput;
