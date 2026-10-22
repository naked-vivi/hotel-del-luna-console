import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreIcon } from "@/components/icons/icons";
import { KeyCardsIcon, FountainPenIcon, ReservationCardIcon, WastebasketIcon } from "@/components/icons/drawn-icons";
import AccessTag from "@/components/shared/access-tag";
import { usePermissions } from "@/hooks/authentication/use-permissions";

function CabinActions({ cabin, isCreating, onDuplicate, onDelete, triggerClassName }: CabinActionsProps) {
  const lock = usePermissions().lockFor("cabins.manage");

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
        <DropdownMenuItem render={<Link to={`/cabins/${cabin.id}`} />}>
          <ReservationCardIcon className="size-5" />
          <span>View details</span>
        </DropdownMenuItem>
        {lock && (
          <div className="flex items-center justify-between gap-4 px-3 pt-2 pb-2.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Cabin changes</span>
            <AccessTag reason={lock} />
          </div>
        )}
        <DropdownMenuItem disabled={isCreating || Boolean(lock)} onClick={() => onDuplicate(cabin)}>
          <KeyCardsIcon className="size-5" />
          <span>Duplicate</span>
        </DropdownMenuItem>
        {lock ? (
          <DropdownMenuItem disabled>
            <FountainPenIcon className="size-5" />
            <span>Edit</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem render={<Link to={`/cabins/${cabin.id}/edit`} />}>
            <FountainPenIcon className="size-5" />
            <span>Edit</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem disabled={Boolean(lock)} className="text-destructive [--icon-accent:currentColor] focus:text-destructive" onClick={() => onDelete(cabin)}>
          <WastebasketIcon className="size-5" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CabinActions;
