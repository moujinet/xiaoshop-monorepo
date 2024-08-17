import { ClsModule } from 'nestjs-cls'
import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { CacheModule } from '@nestjs/cache-manager'
import { EventEmitterModule } from '@nestjs/event-emitter'

// Modules
import { AssetsModule } from '@/assets/assets.module'
import { AuthModule } from '@/auth/auth.module'
import { GoodsModule } from '@/goods/goods.module'
import { LogisticsModule } from '@/logistics/logistics.module'
import { MemberModule } from '@/member/member.module'
import { PointsModule } from '@/points/points.module'
import { SettingsModule } from '@/settings/settings.module'
import { StaffModule } from '@/staff/staff.module'
import { UploadModule } from '@/upload/upload.module'

// Commands
import {
  CreateMigrateCommand,
  GenerateMigrateCommand,
  RevertMigrateCommand,
  RunMigrateCommand,
} from '~/db/commands'

import { GenerateSettingsMigrateCommand } from '@/settings/settings.command'

import {
  CacheConfigService,
  DatabaseConfigService,
  QueueConfigService,
} from '~/configs/modules'

import configuration from '~/configs'

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),

    // TypeORM
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),

    // Cache Manager
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheConfigService,
    }),

    // Queue
    BullModule.forRootAsync({
      useClass: QueueConfigService,
    }),

    // Schedule
    ScheduleModule.forRoot(),

    // EventEmitter
    EventEmitterModule.forRoot(),

    // CLS
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        setup: (cls, req) => {
          cls.set<string>('IP', req.ip)
          cls.set<string>('AGENT', req.headers['user-agent'] || '')
        },
      },
    }),

    // Modules
    AuthModule,
    SettingsModule.register(),
    MemberModule,
    PointsModule,
    GoodsModule,
    AssetsModule,
    LogisticsModule,
    StaffModule,
    UploadModule,

    // Commands
    CreateMigrateCommand,
    RevertMigrateCommand,
    RunMigrateCommand,
    GenerateMigrateCommand,
    GenerateSettingsMigrateCommand,
  ],
})
export class AppModule {}
