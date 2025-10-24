import { useQuery } from "@tanstack/react-query";
import { tasksService } from "../../tasks/queries/tasksService";

export const useGetUserInTask = (id: string) => {
    return useQuery({
        queryKey: ['task', id, 'isMember'],
        queryFn: () => tasksService.getUserInTask(id)
    })
}