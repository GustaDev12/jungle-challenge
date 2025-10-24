import { Body, Controller } from '@nestjs/common'
import { MessagePattern } from "@nestjs/microservices";
import { CreateCommentDTO, CreateTaskDTO, PriorityEnum, StatusEnum, UpdateTaskDTO } from '@repo/dto/tasks'
import { TasksService } from './tasks.service';
import type { ITaskFilter } from '@repo/interfaces';

@Controller()
export default class TasksServiceController {
    constructor(private readonly tasksService: TasksService) { }

    @MessagePattern({ cmd: 'task-created' })
    async createTaskService(@Body() data: { ownerId: string, data: CreateTaskDTO }) {
        return this.tasksService.createTask(data.ownerId, data.data)
    }

    @MessagePattern({ cmd: 'tasks-get-pagination' })
    async getTasksPagination(@Body() data: ITaskFilter ) {
        return this.tasksService.getTasksPagination(data)
    }

    @MessagePattern({ cmd: 'tasks.get-by-id' })
    async getTaskById(@Body() data: { id: string }) {
        return this.tasksService.getTaskById(data.id)
    }

    @MessagePattern({ cmd: 'tasks-delete-by-id' })
    async deleteTaskById(@Body() data: { ownerId: string, id: string }) {
        return this.tasksService.deleteTaskById(data.ownerId, data.id)
    }

    @MessagePattern({ cmd: 'task-updated' })
    async updateTask(@Body() data: { ownerId: string, id: string, data: UpdateTaskDTO }) {
        return this.tasksService.updateTask(data.ownerId, data.id, data.data)
    }

    @MessagePattern({ cmd: 'join-user-task' })
    async joinUserTask(@Body() data: { userId: string, taskId: string }) {
        return this.tasksService.joinUserInTask(data.userId, data.taskId)
    }

    @MessagePattern({ cmd: 'quit-user-task' })
    async quitUserTask(@Body() data: { userId: string, taskId: string }) {
        return this.tasksService.quitUserTask(data.userId, data.taskId)
    }

    @MessagePattern({ cmd: 'get-userIn-task' })
    async getUserInTask(@Body() data: { userId: string, taskId: string }) {
        return this.tasksService.getUserInTask(data.userId, data.taskId)
    }

    @MessagePattern({ cmd: 'task.publish.comment' })
    async postCommentInTask(@Body() data: { userId: string, taskId: string, data: CreateCommentDTO }) {
        return this.tasksService.postCommentInTask(data.userId, data.taskId, data.data.comment)
    }

    @MessagePattern({ cmd: 'comments-get-pagination' })
    async getCommentsPagination(@Body() data: { taskId: string, page: number, size: number }) {
        return this.tasksService.getCommentsPagination(data.taskId, data.page, data.size)
    }
}