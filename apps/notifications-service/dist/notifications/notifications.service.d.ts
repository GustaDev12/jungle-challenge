import { ClientProxy } from '@nestjs/microservices';
import { NotificationData } from '@repo/interfaces';
export declare class NotificationsService {
    private readonly notificationsGateway;
    constructor(notificationsGateway: ClientProxy);
    private readonly logger;
    createNotification(data: NotificationData): Promise<NotificationData>;
    createTaskCreatedNotification(data: {
        userId: string;
        taskId: string;
        taskTitle: string;
    }): Promise<NotificationData>;
    createTaskUpdatedNotification(data: {
        userId: string;
        taskId: string;
        taskTitle: string;
        oldStatus: string;
        newStatus: string;
    }): Promise<NotificationData>;
    createTaskAssignedNotification(data: {
        userId: string;
        taskId: string;
        taskTitle: string;
        assignedBy?: string;
    }): Promise<import("rxjs").Observable<any>>;
    createCommentNotification(data: {
        taskId: string;
        taskTitle: string;
        commentId: string;
        content: string;
        authorId: string;
        authorName: string;
        assignedUsers: string[];
    }): Promise<NotificationData>;
    createTaskDeletedNotification(data: {
        userId: string;
        taskId: string;
        taskTitle: string;
    }): Promise<NotificationData>;
}
