import { ITask } from '../../tasks/task'

export interface IEventsUpdateTask {
    message: string,
    data: ITask
}