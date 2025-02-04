import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryService } from "../Services/QueryService";
import { base_url } from "../static/data";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ user_id, body }: { user_id: string, body: object }) => QueryService({
            QueryURL: `${base_url}/user/update-info-admin/${user_id}`,
            Method: "PUT",
            Body: body
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });
}
