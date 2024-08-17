import { ClsModule } from 'nestjs-cls'
import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { WinstonModule } from 'nest-winston'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { CacheModule } from '@nestjs/cache-manager'
import { EventEmitterModule } from '@nestjs/event-emitter'
import configuration from '~/configs'

import {
  BullModuleConfig,
  CacheModuleConfig,
  ClsModuleConfig,
  TypeOrmModuleConfig,
  WinstonModuleConfig,
} from '~/configs/modules'

// Modules

// Commands
import {
  CreateMigrateCommand,
  GenerateMigrateCommand,
  RevertMigrateCommand,
  RunMigrateCommand,
} from '~/database/commands'

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
      useClass: CacheModuleConfig,
    }),

    // TypeORM
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmModuleConfig,
    }),

    // Queue
    BullModule.forRootAsync({
      useClass: BullModuleConfig,
    }),

    // Schedule
    ScheduleModule.forRoot(),

    // EventEmitter
    EventEmitterModule.forRoot(),

    // CLS
    ClsModule.forRoot(ClsModuleConfig),

    // Modules

    // Commands
    CreateMigrateCommand,
    RevertMigrateCommand,
    RunMigrateCommand,
    GenerateMigrateCommand,
  ],
})
export class AppModule {}
