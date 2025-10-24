import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TasksServiceModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '../orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot(ormConfig),
    TasksServiceModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
