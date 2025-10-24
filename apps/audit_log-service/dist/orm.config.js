"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
const path_1 = require("path");
require("dotenv/config");
exports.ormConfig = {
    type: 'postgres',
    schema: 'audit_logs',
    host: process.env.localhost,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [(0, path_1.join)(__dirname, 'src/**/*.entity{.ts,.js}')],
    migrations: [(0, path_1.join)(__dirname, 'src/migrations/*{.ts, .js}')],
    migrationsRun: false,
    synchronize: true,
    logging: false
};
//# sourceMappingURL=orm.config.js.map