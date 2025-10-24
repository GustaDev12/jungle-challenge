import { IEventsGetTasksById, IEventsGetTasksPagination, IEventsGetUserInTask, IEventsJoinUserTask, IEventsPostCommentInTask, IEventsQuitUserTask, IEventsRegisterTask, IResponseHTPPGetCommentsPagination } from '@repo/interfaces'
import api from '../../../api/client'
import { CreateTaskDTO } from '@repo/dto'

export const tasksService = {

    registerTask: async (data: CreateTaskDTO) => {
        const response = await api.post<IEventsRegisterTask>('/tasks', data)
        return response.data
    },

    getTasks: async (page: number, size: number, filters?: { status?: string; priority?: string; title?: string }) => {
        const params = new URLSearchParams({
            page: String(page),
            size: String(size),
            ...(filters?.status ? { status: filters.status } : {}),
            ...(filters?.priority ? { priority: filters.priority } : {}),
            ...(filters?.title ? { title: filters.title } : {}),
        });
        console.log(params.toString())
        const response = await api.get<IEventsGetTasksPagination>(`/tasks?${params.toString()}`)
        return response.data
    },

    getTaskById: async (id: string) => {
        const response = await api.get<IEventsGetTasksById>(`/tasks/${id}`)
        return response.data
    },

    getCommentsByTaskId: async (id: string, page: number, size: number) => {
        const response = await api.get<IResponseHTPPGetCommentsPagination>(`/tasks/${id}/comments?page=${page}&size=${size}`)
        return response.data
    },

    postCommentInTask: async (id: string, comment: string) => {
        const response = await api.post<IEventsPostCommentInTask>(`/tasks/${id}/comments`, { comment });
        return response.data
    },

    joinTask: async (id: string) => {
        const response = await api.post<IEventsJoinUserTask>(`/tasks/join/${id}`)
        return response.data
    },

    quitTask: async (id: string) => {
        const response = await api.post<IEventsQuitUserTask>(`/tasks/quit/${id}`)
        return response.data
    },

    getUserInTask: async (id: string) => {
        const response = await api.get<IEventsGetUserInTask>(`/tasks/userInTask/${id}`)
        return response.data
    }
}
