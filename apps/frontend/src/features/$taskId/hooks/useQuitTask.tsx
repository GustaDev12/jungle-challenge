import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksService } from "../../tasks/queries/tasksService";
import { useParams } from "@tanstack/react-router";
import { toast } from "sonner";

export const useQuitTask = () => {
    const { taskId } = useParams({ from: '/tasks/$taskId' })
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => tasksService.quitTask(taskId),
        onSuccess: (data) => {
            queryClient.setQueryData(['task', taskId, 'isMember'], (oldData: any) => {
                return {
                    status: false
                }
            })
            toast.success(data.message)
        },
        onError: (errorData: any) => {
            const messageError = errorData.response.data.message || "Não foi possível te atribuir a essa tarefa no momento. Tente novamente mais tarde!"
            toast.error(messageError)
        }
    })
}