import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreIcon } from "@/components/icons/icons";
import { KeyCardsIcon, FountainPenIcon, WastebasketIcon } from "@/components/icons/drawn-icons";

function CabinActions({ cabin, isCreating, onDuplicate, onEdit, onDelete, triggerClassName }: CabinActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className={triggerClassName} aria-label={`Actions for cabin ${cabin.name}`}>
            <MoreIcon className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled={isCreating} onClick={() => onDuplicate(cabin)}>
          <KeyCardsIcon className="size-5" />
          <span>Duplicate</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(cabin)}>
          <FountainPenIcon className="size-5" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive [--icon-accent:currentColor] focus:text-destructive" onClick={() => onDelete(cabin)}>
          <WastebasketIcon className="size-5" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CabinActions;
