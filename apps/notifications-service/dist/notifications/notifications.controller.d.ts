import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    UserAssigned(data: {
        userId: string;
        taskId: string;
        taskTitle: string;
        assignedBy?: string;
    }): Promise<import("rxjs").Observable<any>>;
    CommentNew(data: {
        taskId: string;
        taskTitle: string;
        commentId: string;
        content: string;
        authorId: string;
        authorName: string;
        assignedUsers: string[];
    }): Promise<import("@repo/interfaces").NotificationData>;
}
