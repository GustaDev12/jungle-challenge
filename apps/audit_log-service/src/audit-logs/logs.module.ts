import { Module } from "@nestjs/common";
import { AuditLogsController } from "./logs.controller";
import { AuditLogsService } from "./logs.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuditTasksLogsEntity } from "./entities/tasks.entity";
import { AuditLogsRepository } from "./logs.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([AuditTasksLogsEntity])
    ],
    controllers: [
        AuditLogsController
    ],
    providers: [
        AuditLogsRepository,
        AuditLogsService
    ]
})

export class AuditLogsModule { }