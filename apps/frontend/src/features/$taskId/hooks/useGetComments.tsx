import { useQuery } from "@tanstack/react-query";
import { tasksService } from "../../tasks/queries/tasksService";

export const useGetComments = (id: string, commentPage: number, commentSize: number) => {
    return useQuery({
        queryKey: ['comments', { commentPage, commentSize }],
        queryFn: () => tasksService.getCommentsByTaskId(id, commentPage, commentSize),
    })
}