import { join } from 'path'
import { ormConfig } from './orm.config'
import { DataSource } from 'typeorm'

export default new DataSource({
    ...ormConfig,
    entities: [join(__dirname, 'src/**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, 'src/migrations/*{.ts, .js}')]
} as any)