import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('NotificationsService');

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
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