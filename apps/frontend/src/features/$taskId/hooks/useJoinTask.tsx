import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksService } from "../../tasks/queries/tasksService";
import { useParams } from "@tanstack/react-router";
import { toast } from "sonner";

export const useJoinTaskMutation = () => {
    const { taskId } = useParams({ from: '/tasks/$taskId' })
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => tasksService.joinTask(taskId),
        onSuccess: () => {
            queryClient.setQueryData(['task', taskId, 'isMember'], () => {
                return {
                    status: true
                }
            })
        },
        onError: (errorData: any) => {
            const messageError = errorData.response.data.message || "Não foi possível te atribuir a essa tarefa no momento. Tente novamente mais tarde!"
            toast.error(messageError)
        }
    })
}