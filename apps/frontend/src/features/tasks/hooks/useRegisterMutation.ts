import { CreateTaskDTO } from "@repo/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksService } from "../queries/tasksService";
import { toast } from "sonner";
import { useSearch } from "@tanstack/react-router";
import { IEventsGetTasksPagination } from "@repo/interfaces";

export const useRegisterTaskMutation = () => {
    const queryClient = useQueryClient();
    const { page, size, priority, status, title } = useSearch({ from: '/tasks/' })
    return useMutation({
        mutationFn: (data: CreateTaskDTO) => tasksService.registerTask(data),
        onSuccess: (data) => {
            toast.success("Tarefa criada com sucesso!");
            queryClient.setQueryData(['tasks', page, size, { status, priority, title }], (oldData: IEventsGetTasksPagination) => {
                return {
                    ...oldData,
                    data: [
                        ...oldData.data,
                        data.data
                    ],
                }
            })
        },
        onError: (errorResponse: any) => {
            const errorMessage =
                errorResponse.response?.data?.message || "Não foi possível registrar essa tarefa no momento.";
            toast.error(errorMessage);
        },
    });
};
