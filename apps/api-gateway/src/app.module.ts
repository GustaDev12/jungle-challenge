import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './modules/tasks/tasks.module';
import { WebSocketNotificationsModule } from './modules/websocket/websocket.module';
import { LoggerModule } from 'pino-nestjs';
import { LoggerCustom } from './logger.custom';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, 
          limit: 10 
        }
      ]
    }),
    AuthModule,
    TaskModule,
    PassportModule,
    WebSocketNotificationsModule,
  ],
  controllers: [],
  providers: [
    LoggerCustom,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [LoggerCustom]
})
export class AppModule { }
