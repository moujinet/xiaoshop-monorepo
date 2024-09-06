import { ClsModule } from 'nestjs-cls'
import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { WinstonModule } from 'nest-winston'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { CacheModule } from '@nestjs/cache-manager'
import { EventEmitterModule } from '@nestjs/event-emitter'

import {
  BullModuleConfig,
  CacheModuleConfig,
  ClsModuleConfig,
  TypeOrmModuleConfig,
  WinstonModuleConfig,
} from '~/configs/modules'

import configuration from '~/configs'

// Modules
import { AuthModule } from '@/auth/module'
import { LogisticsModule } from '@/logistics/module'
import { MemberModule } from '@/member/module'
import { NotificationModule } from '@/notification/module'
import { OrganizeModule } from '@/organize/module'
import { ProductModule } from '@/product/module'
import { ResourceModule } from '@/resource/module'
import { SettingsModule } from '@/settings/module'
import { UploadModule } from '@/upload/module'

// Commands
import {
  CreateMigrateCommand,
  GenerateMigrateCommand,
  RevertMigrateCommand,
  RunMigrateCommand,
} from '~/database/commands'
import {
  SettingsMigrationCommand,
} from '@/settings/commands/settings.command'

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),

    // Winston
    WinstonModule.forRootAsync({
      useClass: WinstonModuleConfig,
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

    // Modules
    SettingsModule,
    ProductModule,
    MemberModule,
    LogisticsModule,
    NotificationModule,
    AuthModule,
    OrganizeModule,
    ResourceModule,
    UploadModule,

    // Commands
    CreateMigrateCommand,
    RevertMigrateCommand,
    RunMigrateCommand,
    GenerateMigrateCommand,
    SettingsMigrationCommand,
  ],
})
export class AppModule {}
