import { useQuery, useQueryClient } from "@tanstack/react-query";
import { tasksService } from "../../tasks/queries/tasksService";
import { IEventsGetTasksPagination } from "@repo/interfaces";

export const useGetTaskById = (
    id: string, title: string, status: string, priority: string, page: number, size: number
) => {

    const filters = { status, priority, title }
    const queryClient = useQueryClient()
    const cache = queryClient.getQueryData<IEventsGetTasksPagination | undefined>(['tasks', page, size, filters])

    const task = cache?.data?.find(task => task.id == id);

    return useQuery({
        queryKey: ['task-by_id', { id }],
        initialData: { data: task },
        enabled: cache ? false : true,
        queryFn: () => tasksService.getTaskById(id)
    })
}