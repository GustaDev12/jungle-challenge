import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksService } from "../queries/tasksService";
import { toast } from "sonner";
import { useSearch } from "@tanstack/react-router";

export const useCommentMutation = () => {
    const { commentPage, commentSize }: { commentPage: number, commentSize: number } = useSearch({ from: '/tasks/$taskId' });
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, comment }: { id: string, comment: string }) => tasksService.postCommentInTask(id, comment),
        onSuccess(data) {
            console.log(queryClient.getQueryData(['comments', { commentPage, commentSize }]))
            queryClient.setQueryData(['comments', { commentPage, commentSize }], (oldData: any) => {
                return {
                    ...oldData,
                    comments: [
                        data.data,
                        ...oldData.comments
                    ],
                    meta: {
                        ...oldData.meta,
                        total: oldData.meta.total + 1
                    }
                }
            })
            toast.success(data.message)
        },
        onError(errorResponse: any) {
            const errorMessage = errorResponse.response.data.message || "Não foi possível publicar seu comentário no momento."
            toast.error(errorMessage)
        },
    })
} 