import { useQuery } from "@tanstack/react-query";
import { tasksService } from "../queries/tasksService";

export function useGetTasks(page: number, size: number, filters?: { status?: string; priority?: string; title?: string }) {
    return useQuery({
        queryKey: ['tasks', page, size, filters],
        queryFn: () => tasksService.getTasks(page, size, filters),
    });
}