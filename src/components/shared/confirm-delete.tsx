import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

function ConfirmDelete({ resourceName, itemName, onConfirm, isDeleting, isOpen, onClose }: ConfirmDeleteProps) {

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && !isDeleting && onClose()}>
            <DialogContent showCloseButton={false} className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete {resourceName.toLowerCase()}{" "}
                        <span className="font-semibold text-foreground">{itemName}</span>{" "}
                        from the database.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline" disabled={isDeleting} />}>Cancel</DialogClose>
                    <Button variant="destructive" disabled={isDeleting} onClick={onConfirm}>
                        {isDeleting ? "Deleting..." : `Delete ${resourceName}`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmDelete

// Inside your table row:
