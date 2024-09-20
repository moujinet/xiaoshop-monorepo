// Modules
import { ClsModule } from 'nestjs-cls'
import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { CacheModule } from '@nestjs/cache-manager'
import { EventEmitterModule } from '@nestjs/event-emitter'

import configuration from '~/configs'
import { SystemModule } from '@/system/module'
import { ResourceModule } from '@/resource/module'
import { SettingsMigrationCommand } from '@/system/settings/commands/settings.command'
import { BullModuleConfig, CacheModuleConfig, ClsModuleConfig, TypeOrmModuleConfig } from '~/configs/modules'
import { CreateMigrateCommand, GenerateMigrateCommand, RevertMigrateCommand, RunMigrateCommand } from '~/database/commands'

@Module({
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
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmModuleConfig,
    }),

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

    // XiaoShop Modules
    SystemModule,
    ResourceModule,

    // Commands
    CreateMigrateCommand,
    RevertMigrateCommand,
    RunMigrateCommand,
    GenerateMigrateCommand,
    SettingsMigrationCommand,
  ],
})
export class AppModule {}
