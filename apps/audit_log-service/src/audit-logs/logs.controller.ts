import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, MqttContext, Payload } from '@nestjs/microservices'
import type { IAuditLogsTasks } from "@repo/interfaces/audit-logs";
import { AuditLogsService } from "./logs.service";

@Controller()
export class AuditLogsController {
    constructor(private readonly auditLogService: AuditLogsService) { }
    
    @EventPattern({ cmd: "save.logs" })
    async saveLogs(@Payload() data: IAuditLogsTasks) {
        return this.auditLogService.registerAuditLogTask(data)
    }
}