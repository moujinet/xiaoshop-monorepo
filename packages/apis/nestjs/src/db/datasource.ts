import 'reflect-metadata'
import { join } from 'node:path'
import { DataSource, DataSourceOptions } from 'typeorm'
import configuration from '../configs'

const mysql = configuration().db.mysql

export const config = {
  ...mysql,
  synchronize: false,
  timezone: '+08:00',
  entities: [
    join(__dirname, '../..', 'src/modules', '**', '*.entity.{ts,js}'),
    join(__dirname, '../..', 'src/modules', '**', 'entity.{ts,js}'),
  ],
  migrations: [
    join(__dirname, '../..', 'src/db/migrations', '**', '*.{ts,js}'),
  ],
} as DataSourceOptions

export const AppDataSource = new DataSource(config)

export default config
