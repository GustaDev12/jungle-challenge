import { ICommentsTask, ICommentsTaskWithUser } from "../../tasks/comments";
export interface IEventsGetCommentsPagination {
    comments: ICommentsTask[];
    meta: {
        total: number;
        page: number;
        size: number;
        totalPages: number;
    };
}
export interface IResponseHTPPGetCommentsPagination {
    comments: ICommentsTaskWithUser[] | [];
    meta: {
        total: number;
        page: number;
        size: number;
        totalPages: number;
    };
}
//# sourceMappingURL=get-comments-pagination.d.ts.map