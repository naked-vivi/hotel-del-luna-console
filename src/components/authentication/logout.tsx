import { useState } from "react";
import { DoorOutIcon } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import useLogout from "@/hooks/authentication/use-logout";

function Logout() {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, isPending } = useLogout();

    return (
        <>
            <Button variant="ghost" size="icon" disabled={isPending} onClick={() => setIsOpen(true)} aria-label="Log out" title="Log out">
                <DoorOutIcon className="size-4 stroke-[1.5]" />
            </Button>

            <Dialog open={isOpen} onOpenChange={(open) => !isPending && setIsOpen(open)}>
                <DialogContent showCloseButton={false} className="sm:max-w-md">
                    <DialogHeader>
                        <p className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-gold">End of shift</p>
                        <DialogTitle>Log out of the console?</DialogTitle>
                        <DialogDescription>
                            You will need to log in again to see bookings, guests and tonight's arrivals.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline" disabled={isPending} />}>Stay logged in</DialogClose>
                        <Button disabled={isPending} onClick={() => logout()}>
                            {isPending ? "Logging out..." : "Log out"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Logout;
