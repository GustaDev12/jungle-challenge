import { Module } from "@nestjs/common";
import TasksServiceController from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskUserEntity } from "./entities/task-user.entity";
import { TasksEntity } from "./entities/task.entity";
import { TasksRepository } from "./repositories/tasks.repository";
import { CommentRepository } from "./repositories/comment.repository";
import { TasksUserRepository } from "./repositories/task-user.repository";
import { CommentsEntity } from "./entities/comment.entity";
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forFeature([TasksEntity, TaskUserEntity, CommentsEntity]),
        ClientsModule.register([{
            name: 'AUDIT_LOGS_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL!],
                queue: 'audit_log-queue'
            }
        }]),
        ClientsModule.register([{
            name: 'AUTH_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL!],
                queue: 'auth_queue'
            }
        }]),
        ClientsModule.register([{
            name: 'NOTIFICATIONS_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL!],
                queue: 'notifications-queue'
            }
        }]),
    ],
    controllers: [
        TasksServiceController
    ],
    providers: [TasksService, TasksUserRepository, TasksRepository, CommentRepository]
})

export class TasksServiceModule { }