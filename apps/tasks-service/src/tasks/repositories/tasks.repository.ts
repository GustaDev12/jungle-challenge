import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TasksEntity } from "../entities/task.entity";
import { ILike, Repository } from "typeorm";
import { CreateTaskDTO, PriorityEnum, StatusEnum, UpdateTaskDTO } from "@repo/dto/tasks";
import { ITaskFilter } from "@repo/interfaces";

@Injectable()
export class TasksRepository {

    constructor(
        @InjectRepository(TasksEntity) private readonly tasksRepository: Repository<TasksEntity>
    ) { }

    async findTaskByTitle(title: string) {
        return this.tasksRepository.findOneBy({ title })
    }

    async findTaskById(id: string) {
        const task = await this.tasksRepository.findOneBy({ id })
        return task
    }

    async getTaskById(id: string) {
        const task = await this.tasksRepository.findOne({
            where: { id },
            relations: {
                assignedUsers: true
            }
        })
        if (!task) return null
        return {
            ...task,
            assignedUsers: task.assignedUsers.length
        }
    }

    async registerTask(ownerId: string, data: CreateTaskDTO) {
        const task = this.tasksRepository.create({
            ownerId: ownerId,
            assignedUsers: [],
            ...data
        })
        const task_save = await this.tasksRepository.save(task)
        return task_save
    }

    async getTasksPagination(
        data: ITaskFilter
    ) {
        const take = data.size;
        const skip = (data.page - 1) * take;

        const where_query: any = {};

        if (data.filters.title) where_query.title = ILike(`%${data.filters.title}%`);
        if (data.filters.status) where_query.status = data.filters.status;
        if (data.filters.priority) where_query.priority = data.filters.priority;

        const [tasks, total] = await this.tasksRepository.findAndCount({
            skip,
            take,
            order: { createdAt: 'DESC' },
            select: {
                title: true,
                description: true,
                id: true,
                prazo: true,
                priority: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
            where: where_query,
            relations: { assignedUsers: true },
        });

        const totalPages = Math.ceil(total / take);

        const sanitizedTasks = tasks.map(task => ({
            ...task,
            assignedUsers: task.assignedUsers.length
        }));

        return {
            data: sanitizedTasks,
            meta: { total, page: data.page, size: data.size, totalPages }
        };
    }


    async deleteTaskById(entity: TasksEntity) {
        if (!entity) {
            throw new Error("Não foram encontradas nenuma tarefa com esse id!", { cause: 'NOT_FOUND' })
        }
        await this.tasksRepository.remove(entity)
        return true
    }

    async updateTask(entity: TasksEntity, data: UpdateTaskDTO) {
        const merge = this.tasksRepository.merge(entity, data)
        const save = await this.tasksRepository.save(merge)
        return save
    }
}
