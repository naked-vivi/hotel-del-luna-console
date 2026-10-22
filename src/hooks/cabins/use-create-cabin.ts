// import { toast } from "@/components/ui/toast";
// import { createCabin } from "@/services/api-cabins";
// import { useQueryClient, useMutation } from "@tanstack/react-query";
// import { data } from "react-router-dom";

// function useCreateCabin() {
//     const queryClient = useQueryClient();

//     const { mutate, isPending: isCreating } = useMutation({
//         mutationFn: (data: CabinFormValues) => createCabin(data, editId),
//         onSuccess: () => {
//             toast.add({
//                 type: "success",
//                 description: isEditSession ? "Cabin updated!" : "New cabin created!",
//             });
//             console.log(data)

//             queryClient.invalidateQueries({ queryKey: ['cabins'] });

//             form.reset();
//             onClose?.();
//         },
//     });

//     return { mutate, isCreating };
// }

// export default useCreateCabin

import { toast } from "sonner";
import { saveCabin } from "@/services/api-cabins";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useCreateCabin(options?: CreateCabinOptions) {
    const queryClient = useQueryClient();
    const { editId, onSuccessCallback } = options || {};
    const isEditSession = Boolean(editId);

    const { mutate: createCabinMutate, isPending: isCreating } = useMutation({
        mutationFn: (values: CabinFormValues) => saveCabin({ values, id: editId }),
        onSuccess: (cabin) => {
            toast.success(isEditSession ? `N° ${cabin.name} updated` : `N° ${cabin.name} added`, {
                description: isEditSession ? "The new details are live." : "It's ready to take bookings.",
            });

            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            queryClient.invalidateQueries({ queryKey: ["cabin", cabin.id] });

            onSuccessCallback?.(cabin);
        },
        onError: (err: Error) => {
            toast.error("Couldn't save the cabin", { description: err.message });
        },
    });

    return { createCabinMutate, isCreating, isEditSession };
}

export default useCreateCabin;
