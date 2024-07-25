import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { CacheModule } from '@nestjs/cache-manager'
import { EventEmitterModule } from '@nestjs/event-emitter'

// Modules
import { GoodsModule } from '@/goods/goods.module'
import { AssetsModule } from '@/assets/assets.module'
import { StaffsModule } from '@/staffs/staffs.module'
import { UploadModule } from '@/upload/upload.module'
import { SettingsModule } from '@/settings/settings.module'
import { LogisticsModule } from '@/logistics/logistics.module'

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

    // Modules
    SettingsModule.register(),
    GoodsModule,
    AssetsModule,
    LogisticsModule,
    UploadModule,
    StaffsModule,

    // Commands
    CreateMigrateCommand,
    RevertMigrateCommand,
    RunMigrateCommand,
    GenerateMigrateCommand,
    GenerateSettingsMigrateCommand,
  ],
})
export class AppModule {}
