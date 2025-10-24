import { Injectable } from "@nestjs/common";
import { IAuditLogsTasks } from "@repo/interfaces/audit-logs";
import { AuditLogsRepository } from "./logs.repository";

@Injectable()
export class AuditLogsService {
    constructor(private readonly auditLogRepository: AuditLogsRepository) { }

    async registerAuditLogTask(data: IAuditLogsTasks) {
        try {
            const register = await this.auditLogRepository.registerTaskLog(data) 
            console.log("Nova log registrada!")
        } catch (error) {
            console.log("Não foi possível registrar essa log!" + error)
        }
    }
}