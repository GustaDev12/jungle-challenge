"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const orm_config_1 = require("./orm.config");
const typeorm_1 = require("typeorm");
exports.default = new typeorm_1.DataSource({
    ...orm_config_1.ormConfig,
    entities: [(0, path_1.join)(__dirname, 'src/**/*.entity{.ts,.js}')],
    migrations: [(0, path_1.join)(__dirname, 'src/migrations/*{.ts, .js}')]
});
//# sourceMappingURL=typeorm.config.js.map