import { sleep } from 'zx/.'
import { mw } from 'request-ip'
import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { ClsModule } from 'nestjs-cls'
import { BullModule } from '@nestjs/bull'
import { ConfigModule } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { CacheModule } from '@nestjs/cache-manager'
import { EventEmitterModule } from '@nestjs/event-emitter'

import configuration from '~/configs'
import { SystemModule } from '@/system/module'
import { ResourceModule } from '@/resource/module'
import { exceptionFactory } from '~/common/exceptions'
import { ResponseInterceptor } from '~/common/interceptors'
import { ExceptionsFilter, HttpExceptionsFilter } from '~/common/filters'
import {
  BullModuleConfig,
  CacheModuleConfig,
  ClsModuleConfig,
} from '~/configs/modules'

import { dataSourceOptions } from './datasource'
import { getTableName, runSQL, truncateTable } from './tools'

export async function createTestingModule(modules: any[]) {
  const module = Test.createTestingModule({
    imports: [
      // Config
      ConfigModule.forRoot({
        isGlobal: true,
        cache: true,
        load: [configuration],
      }),

      // Cache Manager
      CacheModule.registerAsync({
        isGlobal: true,
        useClass: CacheModuleConfig,
      }),

      // TypeORM
      TypeOrmModule.forRoot(dataSourceOptions),

      // EventEmitter
      EventEmitterModule.forRoot({
        wildcard: true,
        verboseMemoryLeak: true,
      }),

      // CLS
      ClsModule.forRoot(ClsModuleConfig),

      // Queue
      BullModule.forRootAsync({
        useClass: BullModuleConfig,
      }),

      // Schedule
      ScheduleModule.forRoot(),

      ...modules,
    ],
  })

  return module.compile()
}

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

export async function getTestApplication() {
  if (!globalThis.__APP__) {
    const app = await createTestingApplication([
      SystemModule,
      ResourceModule,
    ])
    await app.init()

    await truncateTable([
      'system_user',
      'system_log',
    ])

    await runSQL([
      `INSERT INTO \`${getTableName('system_user')}\` (\`is_admin\`, \`status\`, \`username\`, \`name\`, \`password\`, \`salt\`) VALUES (1, 1, 'admin', 'Admin', '$2b$10$6HjLrj5a0Jefr12T.76SRe/5AISF0uVaCaoL0grW.4mKBI/393zNO', '$2b$10$6HjLrj5a0Jefr12T.76SRe')`,
    ])

    globalThis.__APP__ = app

    await request(app.getHttpServer())
      .post('/admin/system/user/login')
      .set('x-client-ip', '114.114.114.114')
      .send({
        username: 'admin',
        password: 'admin123',
      })
      .then(async ({ body }) => {
        globalThis.__TOKEN__ = body.data.token

        await sleep(10)
      })
  }

  return globalThis.__APP__
}
