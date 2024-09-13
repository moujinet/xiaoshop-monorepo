import 'reflect-metadata'
import { join } from 'node:path'
import { DataSource, DataSourceOptions } from 'typeorm'

import configuration from '..'

const mysql = configuration().db.mysql

const config = {
  ...mysql,
  synchronize: false,
  timezone: '+08:00',
  entityPrefix: 'xs_',
  entities: [
    join(__dirname, '../..', 'modules', '**', '*.entity.{ts,js}'),
    join(__dirname, '../..', 'modules', '**', 'entity.{ts,js}'),
  ],
  migrations: [
    join(__dirname, '../..', 'database/migrations', '**', '*.{ts,js}'),
  ],
} as DataSourceOptions

export const AppDataSource = new DataSource(config)
