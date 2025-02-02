import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryService } from "../Services/QueryService";

export const useUpdateArticle = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ article_id, body }: { article_id: string, body: object }) => QueryService({
            QueryURL: `https://devtalks-backend.onrender.com/api/v1/article/${article_id}`,
            Method: "PUT",
            Body: body
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
        }
    });
} 