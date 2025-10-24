import type { IAuditLogsTasks } from "@repo/interfaces/audit-logs";
import { AuditLogsService } from "./logs.service";
export declare class AuditLogsController {
    private readonly auditLogService;
    constructor(auditLogService: AuditLogsService);
    saveLogs(data: IAuditLogsTasks): Promise<void>;
}
