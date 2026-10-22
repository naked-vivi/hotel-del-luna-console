import { useState } from "react";
import { DoorOutIcon } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useLogout from "@/hooks/authentication/use-logout";

function Logout() {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, isPending } = useLogout();

    return (
        <>
            <Button variant="ghost" size="icon" disabled={isPending} onClick={() => setIsOpen(true)} aria-label="Log out" title="Log out">
                <DoorOutIcon className="size-4 stroke-[1.5]" />
            </Button>

            <AlertDialog open={isOpen} onOpenChange={(open) => !isPending && setIsOpen(open)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <p className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-gold">End of shift</p>
                        <AlertDialogTitle>Log out of the console?</AlertDialogTitle>
                        <AlertDialogDescription>
                            You will need to log in again to see bookings, guests and tonight's arrivals.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending}>Stay logged in</AlertDialogCancel>
                        <AlertDialogAction disabled={isPending} onClick={() => logout()}>
                            {isPending ? "Logging out..." : "Log out"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default Logout;
