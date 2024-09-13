import {
  DataSource,
  type DataSourceOptions,
} from 'typeorm'

import configuration from '~/configs'

export const dataSourceOptions: DataSourceOptions = {
  ...configuration().db.mysql,
  timezone: '+08:00',
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
