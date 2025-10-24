import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuditTasksLogsEntity } from "./entities/tasks.entity";
import { Repository } from "typeorm";
import { IAuditLogsTasks } from "@repo/interfaces/audit-logs";

@Injectable()
export class AuditLogsRepository {
    constructor(@InjectRepository(AuditTasksLogsEntity) private readonly auditLogsRepository: Repository<AuditTasksLogsEntity>) {

    }

    async registerTaskLog(data: IAuditLogsTasks) {
        const entity = this.auditLogsRepository.create({
            action: data.action,
            serviceName: data.serviceName,
            entityId: data.entityId,
            userId: data.userId,
            payLoad: JSON.stringify(data.payLoad)
        })
        const save = await this.auditLogsRepository.save(entity)
        return save
    }
}