import { toast } from "sonner";
import { deleteCabin } from "@/services/api-cabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";


function useDeleteCabin() {
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate } = useMutation({
        mutationFn: deleteCabin,
        onSuccess: () => {
            toast.success("Cabin deleted");
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
        },
        onError: (err) => {
            toast.error("Couldn't delete the cabin", { description: err.message });
        }
    });
    return { isDeleting, mutate };
}

export default useDeleteCabin