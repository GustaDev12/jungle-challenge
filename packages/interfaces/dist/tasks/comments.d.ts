export declare class ICommentsTask {
    id: string;
    userId: string;
    taskId: string;
    content: string;
    createdAt: Date;
}
export declare class ICommentsTaskWithUser extends ICommentsTask {
    user: {
        id: string;
        username: string;
        email: string;
    } | null;
}
//# sourceMappingURL=comments.d.ts.map