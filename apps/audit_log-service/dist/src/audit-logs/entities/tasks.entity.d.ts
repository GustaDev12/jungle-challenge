export declare class AuditTasksLogsEntity {
    id: string;
    userId: string;
    serviceName: string;
    entityId: string;
    action: 'TASK_CREATED' | 'TASK_UPDATED' | 'TASK_DELETED' | 'COMMENT_ADDED';
    payLoad: any;
    createdAt: Date;
}
