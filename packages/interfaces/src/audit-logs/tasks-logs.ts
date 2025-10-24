import { ITask } from "../tasks/task";

export interface IAuditLogsTasks {
    userId: string,
    serviceName: string,
    entityId: string,
    action: 'TASK_CREATED' | 'TASK_UPDATED' | 'TASK_DELETED' | 'COMMENT_ADDED'
    payLoad: {
        oldState: ITask | {},
        newState: ITask | {},
    }
}