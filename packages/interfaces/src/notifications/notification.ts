export enum NotificationType {
    TASK_CREATED = 'TASK_CREATED',
    TASK_UPDATED = 'TASK_UPDATED',
    TASK_ASSIGNED = 'TASK_ASSIGNED',
    COMMENT_ADDED = 'COMMENT_ADDED',
    TASK_DELETED = 'TASK_DELETED',
}

export interface NotificationData {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    taskId?: string;
    commentId?: string;
    metadata?: any;
    timestamp: string
}