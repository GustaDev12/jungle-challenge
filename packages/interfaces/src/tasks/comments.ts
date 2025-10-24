export class ICommentsTask {
    id: string
    userId: string
    taskId: string
    content: string
    createdAt: Date
}

export class ICommentsTaskWithUser extends ICommentsTask{
    user: { id: string, username: string, email: string } | null
}
