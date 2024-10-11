import { join } from 'node:path'
import {
  DataSource,
  type DataSourceOptions,
} from 'typeorm'

import configuration from '~/config'

const mysql = configuration().mysql

export const dataSourceOptions: DataSourceOptions = {
  ...mysql,
  entities: [
    join(__dirname, '../..', 'src/modules', '**', '*.entity.{ts,js}'),
    join(__dirname, '../..', 'src/modules', '**', 'entity.{ts,js}'),
  ],
  timezone: 'Z',
  keepAlive: true,
  autoLoadEntities: true,
  synchronize: true,
  logging: false,
}

const AppDataSource = new DataSource(dataSourceOptions)

/**
 * 获取数据源
 *
 * @returns Promise<DataSource>
 */
export async function getDataSource() {
  return AppDataSource.isInitialized
    ? AppDataSource
    : await AppDataSource.initialize()
}
