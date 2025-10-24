import { PriorityEnum, StatusEnum } from "@repo/dto";

export interface ITaskFilter {
    page: number,
    size: number, 
    filters: { title?: string; status?: StatusEnum; priority?: PriorityEnum }
}