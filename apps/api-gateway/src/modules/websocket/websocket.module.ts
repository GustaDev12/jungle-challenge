import { Module } from "@nestjs/common";
import { NotificationsGatewayController } from "./websocket.controller";
import { WebsocketGateway } from "./websocket.gateway";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'JUNGLE_SECRET_KEY',
        }),
    ],
    controllers: [NotificationsGatewayController],
    providers: [WebsocketGateway],
})
export class WebSocketNotificationsModule { }