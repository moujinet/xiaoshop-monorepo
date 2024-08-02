import type { DataSourceOptions } from 'typeorm'
import type { TestingModule } from '@nestjs/testing'
import { mw } from 'request-ip'
import { rimraf } from 'rimraf'
import { DataSource } from 'typeorm'
import { Test } from '@nestjs/testing'
import { BullModule } from '@nestjs/bull'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ValidationPipe } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ResponseInterceptor } from '~/common/response/interceptors'
import { CacheConfigService, QueueConfigService } from '~/configs/modules'
import { ExceptionsFilter, HttpExceptionsFilter, exceptionFactory } from '~/common/exception'
import configuration from '~/configs'

const dbConfig = {
  ...configuration().db.mysql,
  autoLoadEntities: true,
  synchronize: true,
  logging: false,
} as DataSourceOptions

const AppDataSource = new DataSource(dbConfig)

function createTestingModule(modules: any[]) {
  const module = Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot(dbConfig),

      ConfigModule.forRoot({
        isGlobal: true,
        cache: true,
        load: [configuration],
      }),

      CacheModule.registerAsync({
        isGlobal: true,
        useClass: CacheConfigService,
      }),

      BullModule.forRootAsync({
        useClass: QueueConfigService,
      }),

      EventEmitterModule.forRoot(),

      ...modules,
    ],
  })

  return module
}

async function createNestApplication(modules: any[]) {
  const module: TestingModule = await createTestingModule(modules).compile()
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

async function truncateTable(tables: string[]) {
  const db = AppDataSource.isInitialized ? AppDataSource : await AppDataSource.initialize()

  for (const table of tables) {
    const result = await db.query(`SELECT * FROM \`${table}\``)

    if (result.length > 0) {
      await db.query(`DELETE FROM \`${table}\``)
    }

    await db.query(`ALTER TABLE \`${table}\` AUTO_INCREMENT = 1`)
  }
}

async function runSQL(sql: string) {
  const db = AppDataSource.isInitialized ? AppDataSource : await AppDataSource.initialize()

  await db.query(sql)
}

async function cleanDirs(dirs: string[]) {
  await rimraf(dirs, { glob: true })
}

export {
  runSQL,
  cleanDirs,
  truncateTable,
  createTestingModule,
  createNestApplication,
}
