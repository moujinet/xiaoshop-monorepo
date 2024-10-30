import { ClsModule } from 'nestjs-cls'
import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { CacheModule } from '@nestjs/cache-manager'

import { AssetModule } from '@/asset/module'
import { SystemModule } from '@/system/module'
import { MemberModule } from '@/member/module'
import { NotificationModule } from '@/notification/module'

import configuration from './config'
import { EventBusModule } from './services/event-bus'
import {
  BullModuleConfig,
  CacheModuleConfig,
  ClsModuleConfig,
  TypeOrmModuleConfig,
} from './config/modules'

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      ignoreEnvVars: true,
      ignoreEnvFile: true,
      load: [
        configuration,
      ],
    }),

    // Cache
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheModuleConfig,
    }),

    // Async Context
    ClsModule.forRoot(ClsModuleConfig),

    // Queue
    BullModule.forRootAsync({
      useClass: BullModuleConfig,
    }),

    // Schedule
    ScheduleModule.forRoot({
      cronJobs: true,
      intervals: true,
    }),

    // Database
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmModuleConfig,
    }),

    // Event
    EventBusModule,

    // Modules
    SystemModule,
    NotificationModule,
    AssetModule,
    MemberModule,
  ],
})
export class Server {}
