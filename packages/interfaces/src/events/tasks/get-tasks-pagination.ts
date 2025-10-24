import { ITask } from '../../tasks/task'


export interface IEventsGetTasksPagination {
    data: ITask[],
    meta: {
        total: number,
        page: number,
        size: number,
        totalPages: number
    }
}
