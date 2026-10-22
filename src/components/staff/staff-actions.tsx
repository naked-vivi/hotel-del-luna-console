import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreIcon } from "@/components/icons/icons";
import { FountainPenIcon, ReservationCardIcon, WastebasketIcon } from "@/components/icons/drawn-icons";
import AccessTag from "@/components/shared/access-tag";
import { usePermissions } from "@/hooks/authentication/use-permissions";

function StaffActions({ account, isSelf, onView, onEdit, onDelete }: StaffActionsProps) {
  const lock = usePermissions().lockFor("staff.manage");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" aria-label={`Actions for ${account.fullName || account.email}`}>
            <MoreIcon aria-hidden="true" />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onView}><ReservationCardIcon aria-hidden="true" className="size-5" />View details</DropdownMenuItem>
        <DropdownMenuItem disabled={Boolean(lock)} onClick={onEdit}><FountainPenIcon aria-hidden="true" className="size-5" />Edit{lock && <AccessTag reason={lock} className="ml-auto" />}</DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive [--icon-accent:currentColor] focus:text-destructive"
          disabled={isSelf || Boolean(lock)}
          onClick={onDelete}
        >
          <WastebasketIcon aria-hidden="true" className="size-5" />
          {isSelf ? "Can't delete yourself" : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default StaffActions;
