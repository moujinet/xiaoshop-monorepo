// Modules
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
import { CreateMigrateCommand, GenerateMigrateCommand, RevertMigrateCommand, RunMigrateCommand } from '~/database/commands'
import { BullModuleConfig, CacheModuleConfig, ClsModuleConfig, TypeOrmModuleConfig, WinstonModuleConfig } from '~/configs/modules'

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

    // Commands
    CreateMigrateCommand,
    RevertMigrateCommand,
    RunMigrateCommand,
    GenerateMigrateCommand,
  ],
})
export class AppModule {}
