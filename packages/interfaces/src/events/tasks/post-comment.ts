import { ICommentsTaskWithUser } from "src/tasks";

export interface IEventsPostCommentInTask {
    message: string,
    data: ICommentsTaskWithUser
}
