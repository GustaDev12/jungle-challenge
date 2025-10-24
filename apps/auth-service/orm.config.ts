import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

import 'dotenv/config';

export const ormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    schema: 'auth',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [join(__dirname, 'src/**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, 'src/migrations/*{.ts,.js}')],
    migrationsRun: false,
    synchronize: true,
    logging: false,
};
