import { mw } from 'request-ip'
import { rimraf } from 'rimraf'
import { Test } from '@nestjs/testing'
import { ClsModule } from 'nestjs-cls'
import { BullModule } from '@nestjs/bull'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ValidationPipe } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { DataSource, type DataSourceOptions } from 'typeorm'
import { exceptionFactory } from '~/common/exceptions'
import { ResponseInterceptor } from '~/common/interceptors'
import { ExceptionsFilter, HttpExceptionsFilter } from '~/common/filters'
import { BullModuleConfig, CacheModuleConfig, ClsModuleConfig } from '~/configs/modules'
import configuration from '~/configs'

const dataSourceOptions: DataSourceOptions = {
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

/**
 * 创建测试模块
 *
 * @param modules 模块数组
 * @returns Promise<TestingModule>
 */
export async function createTestingModule(modules: any[]) {
  const module = Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot(dataSourceOptions),

      ConfigModule.forRoot({
        isGlobal: true,
        cache: true,
        load: [configuration],
      }),

      CacheModule.registerAsync({
        useClass: CacheModuleConfig,
      }),

      BullModule.forRootAsync({
        useClass: BullModuleConfig,
      }),

      EventEmitterModule.forRoot({
        global: true,
      }),

      // CLS
      ClsModule.forRoot(ClsModuleConfig),

      ...modules,
    ],
  })

  return module.compile()
}

/**
 * 创建测试应用
 *
 * @param modules 模块数组
 * @returns Promise<NestApplication>
 */
export async function createTestingApplication(modules: any[]) {
  const module = await createTestingModule(modules)
  const app = module.createNestApplication()

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    exceptionFactory,
  }))

  app.useGlobalFilters(new ExceptionsFilter())
  app.useGlobalFilters(new HttpExceptionsFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())

  app.use(mw({ attributeName: 'ip' }))

  return app
}

/**
 * 清理数据表
 *
 * @param tables 要清理的表
 */
export async function truncateTable(tables: string[]) {
  const dataSource = await getDataSource()

  for (const table of tables) {
    const result = await dataSource.query(`SELECT * FROM \`${table}\``)

    if (result.length > 0) {
      await dataSource.query(`DELETE FROM \`${table}\``)
    }

    await dataSource.query(`ALTER TABLE \`${table}\` AUTO_INCREMENT = 1`)
  }
}

/**
 * 执行 SQL
 *
 * @param sql 要执行的sql
 */
export async function runSQL(sql: string | string[]) {
  const dataSource = await getDataSource()
  const runs = Array.isArray(sql) ? sql : [sql]

  for (const run of runs) {
    await dataSource.query(run)
  }
}

/**
 * 清理目录
 *
 * @param dirs 要清理的目录
 */
export async function cleanDirs(dirs: string[]) {
  await rimraf(dirs, { glob: true })
}

/**
 * 拼接 API
 *
 * @param api string
 * @returns string
 */
export function apiURL(api: string, skip: boolean = false): string {
  return skip ? api : `/admin${api}`
}
