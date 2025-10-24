import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TaskUserEntity } from "../entities/task-user.entity";

@Injectable()
export class TasksUserRepository {
    constructor(
        @InjectRepository(TaskUserEntity) private taskUserRepository: Repository<TaskUserEntity>
    ) { }

    async getUserInTask(userId: string, taskId: string) {
        return this.taskUserRepository.findOneBy({ userId, taskId })
    }

    async assignUserToTask(userId: string, taskId: string) {
        const data = this.taskUserRepository.create({
            taskId: taskId,
            userId: userId,
        })
        return this.taskUserRepository.save(data)
    }

    async deleteUsersToTask(taskId: string) {
        const result = await this.taskUserRepository.delete({ taskId })
        return result
    }

    async removeUserTask(entity: TaskUserEntity) {
        await this.taskUserRepository.delete(entity)
        return true
    }

    async getUsersByTaskId(taskId: string) {
        return this.taskUserRepository.findBy({
            taskId
        })
    }

}