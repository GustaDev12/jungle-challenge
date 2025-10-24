import { IAuditLogsTasks } from "@repo/interfaces/audit-logs";
import { AuditLogsRepository } from "./logs.repository";
export declare class AuditLogsService {
    private readonly auditLogRepository;
    constructor(auditLogRepository: AuditLogsRepository);
    registerAuditLogTask(data: IAuditLogsTasks): Promise<void>;
}
