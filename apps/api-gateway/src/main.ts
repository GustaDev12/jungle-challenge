import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { LoggerCustom } from './logger.custom';
import { requestIdMiddleware } from './common/middleware/request-id.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
      methods: ['POST', 'GET', 'PUT', 'DELETE']
    }
  });

  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('Jungle Challenge API Gateway')
    .setDescription(`
      ## 🚀 API Gateway - Sistema de Gerenciamento de Tarefas
      
      Esta é a API Gateway do sistema Jungle Challenge, responsável por:
      - **Autenticação e Autorização** de usuários
      - **Gerenciamento de Tarefas** com sistema completo de CRUD
      - **Comunicação com Microserviços** via RabbitMQ
      - **Rate Limiting** para proteção contra abuso
      - **WebSocket** para notificações em tempo real
      
      ### 🔐 Autenticação
      A API utiliza JWT (JSON Web Tokens) para autenticação. Para acessar endpoints protegidos:
      1. Faça login ou registro para obter um token
      2. Inclua o token no header: \`Authorization: Bearer <seu-token>\`
      
      ### 📊 Rate Limiting
      - **Global**: 10 requisições por minuto
      - **Login/Registro**: 10 tentativas por minuto
      - **Refresh Token**: 10 tentativas por minuto
      
      ### 🌐 Microserviços
      - **Auth Service**: Gerenciamento de usuários e autenticação
      - **Tasks Service**: Operações CRUD de tarefas
      - **Notifications Service**: Notificações em tempo real
      
      ### 📝 Códigos de Status
      - **200**: Sucesso
      - **201**: Criado com sucesso
      - **400**: Dados inválidos
      - **401**: Não autorizado
      - **403**: Acesso negado
      - **404**: Recurso não encontrado
      - **429**: Muitas requisições (Rate Limited)
      - **500**: Erro interno do servidor
    `)
    .setVersion('1.0.0')
    .setContact(
      'Equipe Jungle Challenge',
      'https://github.com/jungle-challenge',
      'contato@junglechallenge.com'
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3001', 'Servidor de Desenvolvimento')
    .addServer('https://api.junglechallenge.com', 'Servidor de Produção')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Insira o token JWT',
        in: 'header',
      },
      'JWT-auth'
    )
    .addTag('Authentication', 'Endpoints para autenticação e gerenciamento de usuários')
    .addTag('Tasks', 'Endpoints para gerenciamento de tarefas')
    .addTag('Comments', 'Endpoints para comentários em tarefas')
    .addTag('Health', 'Endpoints para verificação de saúde da aplicação')
    .build()

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  })

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'none',
      filter: true,
      showRequestHeaders: true,
      showCommonExtensions: true,
      tryItOutEnabled: true,
    },
    customSiteTitle: 'Jungle Challenge API Documentation',
    customfavIcon: '/favicon.ico',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #2c3e50; }
      .swagger-ui .scheme-container { background: #f8f9fa; padding: 20px; border-radius: 8px; }
    `,
  })
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const result = {
        field: errors[0].property,
        message: errors[0].constraints ? errors[0].constraints[Object.keys(errors[0].constraints)[0]] : 'Validation failed'
      }
      return new BadRequestException(result)
    },
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || "amqp://admin:admin@rabbitmq:5672"],
      queue: 'notifications-gateway-service'
    }
  })

  app.useLogger(app.get(LoggerCustom))
  app.use(requestIdMiddleware)

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();