"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_1.Logger('NotificationsService');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL || "amqp://admin:admin@rabbitmq:5672"],
            queue: 'notifications-queue',
            queueOptions: {
                durable: true,
            },
        },
    });
    await app.startAllMicroservices();
    await app.listen(3004);
    logger.log('Notifications Service iniciado na porta 3004');
    logger.log('WebSocket Gateway disponível em /notifications');
    logger.log('Modo: Notificações em tempo real (sem persistência)');
}
bootstrap();
//# sourceMappingURL=main.js.map