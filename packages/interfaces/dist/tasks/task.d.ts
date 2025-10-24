import { StatusEnum, PriorityEnum } from '@repo/dto/tasks';
export interface ITask {
    id: string;
    title: string;
    description?: string;
    prazo: Date;
    priority: PriorityEnum;
    status: StatusEnum;
    ownerId: string;
    assignedUsers: {
        id: string;
        taskId: string;
        userId: string;
    }[] | number;
    comments: {
        id: string;
        userId: string;
        taskId: string;
        content: string;
        createdAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=task.d.ts.map