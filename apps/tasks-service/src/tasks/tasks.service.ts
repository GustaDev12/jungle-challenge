import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateTaskDTO, UpdateTaskDTO } from "@repo/dto/tasks";
import { TasksRepository } from "./repositories/tasks.repository";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { IEventsDeleteTask, IEventsGetTasksById, IEventsGetUserInTask, IEventsJoinUserTask, IEventsQuitUserTask, IEventsRegisterTask, IEventsUpdateTask, IResponseHTPPGetCommentsPagination } from "@repo/interfaces/events";
import { TasksUserRepository } from "./repositories/task-user.repository";
import { CommentRepository } from "./repositories/comment.repository";
import { IAuditLogsTasks } from "@repo/interfaces/audit-logs";
import { lastValueFrom, timeout } from "rxjs";
import { ITaskFilter } from "@repo/interfaces";



@Injectable()
export class TasksService {
    constructor(
        private readonly commentRepository: CommentRepository,
        private readonly tasksRepository: TasksRepository,
        private readonly tasksUserRepository: TasksUserRepository,
        @Inject("AUDIT_LOGS_SERVICE") private auditLogsService: ClientProxy,
        @Inject("AUTH_SERVICE") private authService: ClientProxy,
        @Inject("NOTIFICATIONS_SERVICE") private notificationsService: ClientProxy
    ) { }

    async createTask(ownerId: string, data: CreateTaskDTO): Promise<IEventsRegisterTask> {
        try {
            const newTask = await this.tasksRepository.registerTask(ownerId, data)
            await this.tasksUserRepository.assignUserToTask(ownerId, newTask.id)
            const payload: IAuditLogsTasks = {
                userId: newTask.ownerId,
                serviceName: 'TasksService',
                entityId: newTask.id,
                action: 'TASK_CREATED',
                payLoad: {
                    oldState: {},
                    newState: newTask
                }
            }
            this.auditLogsService.emit({ cmd: 'save.logs' }, payload)
            this.notificationsService.emit('task.created', {
                taskId: newTask.id,
                title: newTask.title,
                ownerId: newTask.ownerId,
                assignedUsers: [ownerId],
                status: newTask.status,
                priority: newTask.priority
            });
            return {
                message: "Tarefa cadastrada com sucesso!",
                data: newTask
            }
        } catch (error) {
            if (error instanceof RpcException) {
                throw error;
            }

            throw new RpcException({
                statusCode: error.status || 500,
                message: 'Erro ao criar uma nova tarefa!',
                error: 'Internal Server Error'
            });
        }
    }

    async getTasksPagination(data: ITaskFilter): Promise<any> {
        try {
            const entity = await this.tasksRepository.getTasksPagination(data)
            return entity
        } catch (error) {
            if (error instanceof RpcException) {
                throw error;
            }

            throw new RpcException({
                statusCode: error.status || 500,
                message: 'Erro ao buscar as tarefas!',
                error: 'Internal Server Error'
            });
        }
    }

    async getTaskById(id: string): Promise<IEventsGetTasksById> {
        try {
            const entity = await this.tasksRepository.getTaskById(id);
            if (!entity) {
                throw new RpcException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Não existem tarefas cadastradas com esse id!",
                    error: HttpStatus.NOT_FOUND
                })
            }
            return {
                data: entity
            }
        } catch (error) {
            if (error instanceof RpcException) {
                throw error
            }
            console.log(error)
            throw new RpcException({
                statusCode: error.status || 500,
                message: 'Erro ao buscar a tarefa!',
                error: 'Internal Server Error'
            });
        }
    }

    async deleteTaskById(ownerId: string, id: string): Promise<IEventsDeleteTask> {
        try {
            const entity = await this.tasksRepository.findTaskById(id);
            if (!entity) {
                throw new RpcException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Não existem tarefas cadastradas com esse id!",
                    error: HttpStatus.NOT_FOUND
                })
            }

            if (entity.ownerId != ownerId) {
                throw new RpcException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Não existem tarefas cadastradas com esse id!",
                    error: HttpStatus.NOT_FOUND
                })
            }

            const payload: IAuditLogsTasks = {
                userId: ownerId,
                serviceName: 'TasksService',
                entityId: entity.id,
                action: 'TASK_DELETED',
                payLoad: {
                    oldState: entity,
                    newState: {}
                }
            }

            await this.tasksUserRepository.deleteUsersToTask(id)
            await this.tasksRepository.deleteTaskById(entity)
            this.auditLogsService.emit({ cmd: 'save.logs' }, payload)

            return {
                message: "Tarefa deletada com sucesso!"
            }
        } catch (error) {
            if (error instanceof RpcException) {
                throw error
            }
            throw new RpcException({
                statusCode: error.status || 500,
                message: error.message || 'Erro ao buscar a tarefa!',
                error: error.cause || 'Internal Server Error'
            });
        }
    }

    private async getAssignedUsers(taskId: string): Promise<string[]> {
        const taskUsers = await this.tasksUserRepository.getUsersByTaskId(taskId);
        return taskUsers.map(tu => tu.userId);
    }

    async updateTask(ownerId: string, id: string, data: UpdateTaskDTO): Promise<IEventsUpdateTask> {
        try {
            const entity = await this.tasksRepository.findTaskById(id);
            if (!entity) {
                throw new RpcException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Não existem tarefas cadastradas com esse id!",
                    error: HttpStatus.NOT_FOUND
                })
            }

            if (entity.ownerId != ownerId) {
                throw new RpcException({
                    statusCode: HttpStatus.UNAUTHORIZED,
                    message: "Você não possui permissão para atualizar essa tarefa!",
                    error: HttpStatus.UNAUTHORIZED
                })
            }

            const oldEntity = structuredClone(entity);
            const update = await this.tasksRepository.updateTask(entity, data)

            const payload: IAuditLogsTasks = {
                userId: ownerId,
                serviceName: 'TasksService',
                entityId: entity.id,
                action: 'TASK_UPDATED',
                payLoad: {
                    oldState: oldEntity,
                    newState: update
                }
            }

            const assignedUsers = await this.getAssignedUsers(id);
            this.notificationsService.emit('task.updated', {
                taskId: id,
                title: update.title,
                oldEntity,
                newStatus: update.status,
                assignedUsers,
                updatedBy: ownerId,
                changes: data
            });

            this.auditLogsService.emit({ cmd: 'save.logs' }, payload)
            return {
                message: "Tarefa atualizada com sucesso!",
                data: update
            }
        } catch (error) {
            if (error instanceof RpcException) {
                throw error
            }

            throw new RpcException({
                statusCode: error.status || 500,
                message: error.message || 'Erro ao buscar a tarefa!',
                error: error.cause || 'Internal Server Error'
            })
        }
    }

    async getUserInTask(userId: string, taskId: string): Promise<IEventsGetUserInTask> {
        try {
            const entity = await this.tasksRepository.findTaskById(taskId);
            if (!entity) {
                throw new RpcException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Não existem tarefas cadastradas com esse id!",
                    error: HttpStatus.NOT_FOUND
                })
            }

            const userInTask = await this.tasksUserRepository.getUserInTask(userId, taskId);

            return { status: userInTask ? true : false }
        } catch (error) {
            if (error instanceof RpcException) {
                throw error
            }

            throw new RpcException({
                statusCode: error.status || 500,
                message: error.message || 'Erro ao tentar verificar se  o usuário está na tarefa!',
                error: error.cause || 'Internal Server Error'
            })
        }
    }

    async joinUserInTask(userId: string, taskId: string): Promise<IEventsJoinUserTask> {
        try {
            const entity = await this.tasksRepository.findTaskById(taskId);
            if (!entity) {
                throw new RpcException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Não existem tarefas cadastradas com esse id!",
                    error: HttpStatus.NOT_FOUND
                })
            }

            const userInTask = await this.getUserInTask(userId, taskId)
            if (userInTask.status) {
                throw new RpcException({
                    statusCode: HttpStatus.CONFLICT,
                    message: "Você já faz parte dessa tarefa!",
                    error: HttpStatus.CONFLICT
                })
            }
            await this.tasksUserRepository.assignUserToTask(userId, taskId)
            const user = await lastValueFrom(this.authService.send({ cmd: 'get-user-by-id' }, userId).pipe(
                timeout(5000)
            ));
            this.notificationsService.emit('user.assigned', {
                userId: userId,
                taskId: taskId,
                taskTitle: entity.title,
                assignedBy: user.user.username
            });
            return {
                message: "Você foi atribuido a essa tarefa com sucesso!"
            }
        } catch (error) {
            if (error instanceof RpcException) {
                throw error
            }

            throw new RpcException({
                statusCode: error.status || 500,
                message: error.message || 'Erro ao tentar atribuir o usuário a tarefa!',
                error: error.cause || 'Internal Server Error'
            })
        }
    }

    async quitUserTask(userId: string, taskId: string): Promise<IEventsQuitUserTask> {
        try {
            const entity = await this.tasksRepository.findTaskById(taskId);
            if (!entity) {
                throw new RpcException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Não existem tarefas cadastradas com esse id!",
                    error: HttpStatus.NOT_FOUND
                })
            }
            const userInTask = await this.tasksUserRepository.getUserInTask(userId, taskId);
            if (!userInTask) {
                throw new RpcException({
                    statusCode: HttpStatus.CONFLICT,
                    message: "Você não faz parte dessa tarefa!",
                    error: HttpStatus.CONFLICT
                })
            }
            await this.tasksUserRepository.removeUserTask(userInTask)
            return {
                message: "Você não faz mais parte dessa tarefa!"
            }
        } catch (error) {
            if (error instanceof RpcException) {
                throw error
            }
            throw new RpcException({
                statusCode: error.status || 500,
                message: error.message || "Erro ao tentar remover o usuário de uma tarefa!",
                error: error.cause || 'Internal Server Error'
            })
        }
    }

    async postCommentInTask(userId: string, taskId: string, content: string) {
        try {
            const entity = await this.tasksRepository.findTaskById(taskId);
            if (!entity) {
                throw new RpcException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Não existem tarefas cadastradas com esse id!",
                    error: HttpStatus.NOT_FOUND
                })
            }
            const userInTask = await this.getUserInTask(userId, taskId)
            if (!userInTask.status) {
                throw new RpcException({
                    statusCode: HttpStatus.CONFLICT,
                    message: "Você não participa dessa tarefa!",
                    error: HttpStatus.CONFLICT
                })
            }
            const publish = await this.commentRepository.postCommenter(userId, entity.id, content)
            const user = await lastValueFrom(this.authService.send({ cmd: 'get-user-by-id' }, userId).pipe(
                timeout(5000)
            ));
            const assignedUsers = await this.getAssignedUsers(taskId);
            this.notificationsService.emit('comment:new', {
                taskId,
                taskTitle: entity.title,
                commentId: publish.id,
                content: publish.content,
                authorId: userId,
                authorName: user.user.username,
                assignedUsers
            });
            return {
                message: "Comentário publicado com sucesso!",
                data: {
                    ...publish,
                    user: user ? {
                        id: user.user.id,
                        username: user.user.username,
                        email: user.user.email
                    } : null
                }
            }
        } catch (error) {
            if (error instanceof RpcException) {
                throw error
            }
            throw new RpcException({
                statusCode: error.status || 500,
                message: error.message || "Erro ao tentar remover o usuário de uma tarefa!",
                error: error.cause || 'Internal Server Error'
            })
        }
    }

    async getCommentsPagination(taksId: string, page: number, size: number): Promise<IResponseHTPPGetCommentsPagination> {
        try {
            const entity = await this.tasksRepository.findTaskById(taksId);
            if (!entity) {
                throw new RpcException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Não existem tarefas cadastradas com esse id!",
                    error: HttpStatus.NOT_FOUND
                })
            }
            const data: IResponseHTPPGetCommentsPagination = await this.commentRepository.getCommentsPagination(taksId, page, size)
            return data
        } catch (error) {
            if (error instanceof RpcException) {
                throw error
            }
            throw new RpcException({
                statusCode: error.status || 500,
                message: error.message || "Erro ao tentar buscar os comentários de uma tarefa especifica!",
                error: error.cause || 'Internal Server Error'
            })
        }
    }
}