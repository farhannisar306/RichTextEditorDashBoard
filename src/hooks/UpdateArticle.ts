import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryService } from "../Services/QueryService";
import { base_url } from '../static/data'

export const useUpdateArticle = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ article_id, body }: { article_id: string, body: object }) => QueryService({
            QueryURL: `${base_url}/article/${article_id}`,
            Method: "PUT",
            Body: body
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
        }
    });
} 