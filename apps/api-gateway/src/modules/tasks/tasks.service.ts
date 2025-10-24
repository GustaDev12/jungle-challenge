import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateCommentDTO, CreateTaskDTO, UpdateTaskDTO } from "@repo/dto/tasks";
import { IEventsGetTasksById, IEventsGetTasksPagination, IEventsRegisterTask, IEventsDeleteTask, IEventsUpdateTask, IEventsQuitUserTask, IEventsJoinUserTask, IEventsGetUserInTask, IEventsGetCommentsPagination } from "@repo/interfaces/events";
import { catchError, filter, lastValueFrom, timeout } from "rxjs";

@Injectable()
export class TaskService {
    constructor(@Inject("TASKS_SERVICE") private tasksService: ClientProxy) { }

    async createTask(ownerId: string, data: CreateTaskDTO): Promise<IEventsRegisterTask> {
        const register_task: IEventsRegisterTask = await lastValueFrom(this.tasksService.send({ cmd: 'task-created' }, { ownerId, data }).pipe(
            timeout(5000),
            catchError(error => {
                if (error.name == "TimeoutError") {
                    throw new HttpException(
                        "Serviço de tarefas indisponível no momento!",
                        HttpStatus.SERVICE_UNAVAILABLE
                    )
                }
                throw new HttpException(
                    error.message || "Serviço de tarefas indisponível no momento!",
                    error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
                )
            })
        ));
        return register_task
    }

    async getTasksPagination(page: string, size: string, filters: { title: string | undefined, status: string | undefined, priority: string | undefined }): Promise<IEventsGetTasksPagination> {
        const PageNumber = Number(page) || 1;
        const SizeNumber = Number(size) || 10;
        const tasks: IEventsGetTasksPagination = await lastValueFrom(this.tasksService.send({ cmd: 'tasks-get-pagination' }, { page: PageNumber, size: SizeNumber, filters }).pipe(
            timeout(5000),
            catchError(error => {
                if (error.name == "TimeoutError") {
                    throw new HttpException(
                        "Serviço de tarefas indisponível no momento!",
                        HttpStatus.SERVICE_UNAVAILABLE
                    )
                }
                throw new HttpException(
                    error.message || "Serviço de tarefas indisponível no momento!",
                    error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
                )
            })
        ))
        return tasks
    }

    async getTaskById(id: string): Promise<IEventsGetTasksById> {
        const task: IEventsGetTasksById = await lastValueFrom(this.tasksService.send({ cmd: 'tasks.get-by-id' }, { id }).pipe(
            timeout(5000),
            catchError(error => {
                if (error.name == "TimeoutError") {
                    throw new HttpException(
                        "Serviço de tarefas indisponível no momento!",
                        HttpStatus.SERVICE_UNAVAILABLE
                    )
                }
                throw new HttpException(
                    error.message || "Serviço de tarefas indisponível no momento!",
                    error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
                )
            })
        ))
        return task
    }

    async updateTaskById(ownerId: string, id: string, data: UpdateTaskDTO): Promise<IEventsUpdateTask> {
        const update_task: IEventsUpdateTask = await lastValueFrom(this.tasksService.send({ cmd: 'task-updated' }, { ownerId, id, data }).pipe(
            timeout(5000),
            catchError(error => {
                if (error.name === "TimeoutError") {
                    throw new HttpException(
                        "Serviço de tarefas indisponível no momento!",
                        HttpStatus.SERVICE_UNAVAILABLE
                    )
                }
                throw new HttpException(
                    error.message || "Serviço de tarefas indisponível no momento!",
                    error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
                )
            })
        ))
        return update_task
    }

    async deleteTaskById(ownerId: string, id: string): Promise<IEventsDeleteTask> {
        const delete_task: IEventsDeleteTask = await lastValueFrom(this.tasksService.send({ cmd: 'tasks-delete-by-id' }, { ownerId, id }).pipe(
            timeout(5000),
            catchError(error => {
                if (error.name == "TimeoutError") {
                    throw new HttpException(
                        "Serviço de tarefas indisponível no momento!",
                        HttpStatus.SERVICE_UNAVAILABLE
                    )
                }
                throw new HttpException(
                    error.message || "Serviço de tarefas indisponível no momento!",
                    error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
                )
            })
        ))
        return delete_task
    }

    async joinUserTask(userId: string, taskId: string): Promise<IEventsJoinUserTask> {
        const response = await lastValueFrom(this.tasksService.send({ cmd: 'join-user-task' }, { userId, taskId }).pipe(
            timeout(5000),
            catchError(error => {
                if (error.name === "TimeoutError") {
                    throw new HttpException(
                        "Serviço de tarefas indisponível no momento!",
                        HttpStatus.SERVICE_UNAVAILABLE
                    )
                }
                throw new HttpException(
                    error.message || "Serviço de tarefas indisponível no momento!",
                    error.statusCode || HttpStatus.SERVICE_UNAVAILABLE
                )
            })
        ))
        return response
    }

    async quitUserTask(userId: string, taskId: string): Promise<IEventsQuitUserTask> {
        const response = await lastValueFrom(this.tasksService.send({ cmd: 'quit-user-task' }, { userId, taskId }).pipe(
            timeout(5000),
            catchError(error => {
                if (error.name == "TimeoutError") {
                    throw new HttpException(
                        "Serviço de tarefas indisponível no momento!",
                        HttpStatus.SERVICE_UNAVAILABLE
                    )
                }
                throw new HttpException(
                    error.message || "Serviço de tarefas indisponível no momento!",
                    error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
                )
            })
        ))
        return response
    }


    async getUserInTask(userId: string, taskId: string): Promise<IEventsGetUserInTask> {
        const response = await lastValueFrom(this.tasksService.send({ cmd: 'get-userIn-task' }, { userId, taskId }).pipe(
            timeout(5000),
            catchError(error => {
                if (error.name == "TimeoutError") {
                    throw new HttpException(
                        "Serviço de tarefas indisponível no momento!",
                        HttpStatus.SERVICE_UNAVAILABLE
                    )
                }
                throw new HttpException(
                    error.message || "Serviço de tarefas indisponível no momento!",
                    error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
                )
            })
        ))
        return response
    }

    async commentInTask(userId: string, taskId: string, data: CreateCommentDTO) {
        const response = await lastValueFrom(this.tasksService.send({ cmd: 'task.publish.comment' }, { userId, taskId, data }).pipe(
            timeout(5000),
            catchError(error => {
                if (error.name === "TimeoutError") {
                    throw new HttpException(
                        "Serviço de tarefas indisponível no momento!",
                        HttpStatus.SERVICE_UNAVAILABLE
                    )
                }
                throw new HttpException(
                    error.message || "Serviço de tarefas indisponível no momento!",
                    error.statusCode || HttpStatus.SERVICE_UNAVAILABLE
                )
            })
        ))
        return response
    }

    async getCommentsPagination(id: string, page: string, size: string): Promise<IEventsGetCommentsPagination> {
        const pageNumber = Number(page) || 1;
        const sizeNumber = Number(size) || 5;
        const response: IEventsGetCommentsPagination = await lastValueFrom(this.tasksService.send({ cmd: 'comments-get-pagination' }, { taskId: id, page: pageNumber, size: sizeNumber }).pipe(
            timeout(5000),
            catchError(error => {
                if (error.name === "TimeoutError") {
                    throw new HttpException(
                        "Serviço de tarefas indisponível no momento!",
                        HttpStatus.SERVICE_UNAVAILABLE
                    )
                }
                throw new HttpException(
                    error.message || "Serviço de tarefas indisponível no momento!",
                    error.statusCode || HttpStatus.SERVICE_UNAVAILABLE
                )
            })
        ))

        return response
    }
}