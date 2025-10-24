import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ClientsModule.register([{
            name: 'NOTIFICATIONS_SERVICE_GATEWAY',
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL!],
                queue: 'notifications-gateway-service'
            }
        }]),
    ],
    controllers: [NotificationsController],
    providers: [NotificationsService],
    exports: [NotificationsService],
})
export class NotificationsModule { }