import { toast } from "sonner";
import { updateSetting as updateSettingsApi } from "@/services/api-settings";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useUpdateSettings() {
    const queryClient = useQueryClient();

    const { mutate: updateSettings, isPending: isUpdating } = useMutation({
        mutationFn: updateSettingsApi,
        onSuccess: () => {
            toast.success("Settings saved", { description: "New bookings will follow the updated rules." });
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (err: Error) => {
            toast.error("Couldn't save the settings", { description: err.message });
        },
    });

    return { updateSettings, isUpdating };
}

export default useUpdateSettings;
