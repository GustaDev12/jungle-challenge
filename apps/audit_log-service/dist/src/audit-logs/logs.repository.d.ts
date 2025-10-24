import { AuditTasksLogsEntity } from "./entities/tasks.entity";
import { Repository } from "typeorm";
import { IAuditLogsTasks } from "@repo/interfaces/audit-logs";
export declare class AuditLogsRepository {
    private readonly auditLogsRepository;
    constructor(auditLogsRepository: Repository<AuditTasksLogsEntity>);
    registerTaskLog(data: IAuditLogsTasks): Promise<AuditTasksLogsEntity>;
}
