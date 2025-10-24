import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TasksController } from "./tasks.controller";
import { TaskService } from "./tasks.service";
import { JwtStrategy } from "../auth/jwt-strategy";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ClientsModule.register([{
            name: 'TASKS_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL!],
                queue: 'tasks-queue'
            }
        }]),

    ],
    providers: [TaskService, JwtStrategy],
    controllers: [TasksController],
    exports: []
})
export class TaskModule { }