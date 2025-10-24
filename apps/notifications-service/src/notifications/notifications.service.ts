import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices'
import { NotificationData, NotificationType } from '@repo/interfaces'

@Injectable()
export class NotificationsService {
    constructor(
        @Inject("NOTIFICATIONS_SERVICE_GATEWAY") private readonly notificationsGateway: ClientProxy
    ) { }

    private readonly logger = new Logger(NotificationsService.name);

    async createNotification(data: NotificationData): Promise<NotificationData> {
        try {
            this.logger.log(`Criando notificação em tempo real para usuário ${data.userId}: ${data.type}`);

            const notification = {
                ...data,
                timestamp: new Date().toISOString(),
            };

            this.logger.log(`Notificação criada com sucesso para usuário ${data.userId}`);
            return notification;
        } catch (error) {
            this.logger.error(`Erro ao criar notificação: ${error.message}`, error.stack);
            throw error;
        }
    }

    async createTaskCreatedNotification(data: {
        userId: string;
        taskId: string;
        taskTitle: string;
    }): Promise<NotificationData> {
        return await this.createNotification({
            userId: data.userId,
            type: NotificationType.TASK_CREATED,
            title: 'Nova tarefa criada',
            message: `Você criou a tarefa: ${data.taskTitle}`,
            taskId: data.taskId,
            timestamp: new Date().toISOString(),
            metadata: { taskTitle: data.taskTitle },
        });
    }

    async createTaskUpdatedNotification(data: {
        userId: string;
        taskId: string;
        taskTitle: string;
        oldStatus: string;
        newStatus: string;
    }): Promise<NotificationData> {
        return await this.createNotification({
            userId: data.userId,
            type: NotificationType.TASK_UPDATED,
            title: 'Tarefa atualizada',
            message: `A tarefa "${data.taskTitle}" mudou de ${data.oldStatus} para ${data.newStatus}`,
            taskId: data.taskId,
            timestamp: new Date().toISOString(),
            metadata: {
                taskTitle: data.taskTitle,
                oldStatus: data.oldStatus,
                newStatus: data.newStatus,
            },
        });
    }

    async createTaskAssignedNotification(data: {
        userId: string;
        taskId: string;
        taskTitle: string;
        assignedBy?: string;
    }) {

        const notification = await this.createNotification({
            userId: data.userId,
            type: NotificationType.TASK_ASSIGNED,
            title: data.taskTitle,
            message: `Você foi atribuído à tarefa: ${data.taskTitle}`,
            taskId: data.taskId,
            timestamp: new Date().toISOString(),
            metadata: {
                taskTitle: data.taskTitle,
                assignedBy: data.assignedBy,
            },
        });

        return this.notificationsGateway.emit("user.assigned-gateway", notification)
    }

    async createCommentNotification(data: {
        taskId: string,
        taskTitle: string,
        commentId: string,
        content: string,
        authorId: string,
        authorName: string,
        assignedUsers: string[]
    }): Promise<NotificationData> {
        const notification = await this.createNotification({
            userId: data.authorId,
            type: NotificationType.COMMENT_ADDED,
            title: 'Novo comentário',
            message: `${data.authorName} comentou na tarefa "${data.taskTitle}"`,
            taskId: data.taskId,
            commentId: data.commentId,
            timestamp: new Date().toISOString(),
            metadata: {
                taskTitle: data.taskTitle,
                authorName: data.authorName,
                assignedUsers: data.assignedUsers
            },
        });

        this.notificationsGateway.emit("comment:new-gateway", notification)
        return notification
    }

    async createTaskDeletedNotification(data: {
        userId: string;
        taskId: string;
        taskTitle: string;
    }): Promise<NotificationData> {
        return await this.createNotification({
            userId: data.userId,
            type: NotificationType.TASK_DELETED,
            title: 'Tarefa deletada',
            message: `A tarefa "${data.taskTitle}" foi deletada`,
            taskId: data.taskId,
            timestamp: new Date().toISOString(),
            metadata: { taskTitle: data.taskTitle },
        });
    }

}