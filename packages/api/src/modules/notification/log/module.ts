import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { SystemSettingModule } from '@/system/setting/module'

import { NotificationLogEntity } from './model/entity'
import { NotificationLogRepositoryProvider } from './model/provider'
import { NotificationLogQueryService } from './domain/query/service'
import { NotificationLogStoreService } from './domain/store/service'
import { NotificationLogCleanupService } from './domain/cleanup/service'
import { NotificationLogAdminController } from './controller/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NotificationLogEntity,
    ]),

    forwardRef(() => SystemSettingModule),
  ],

  controllers: [
    NotificationLogAdminController,
  ],

  providers: [
    NotificationLogRepositoryProvider,
    NotificationLogQueryService,
    NotificationLogStoreService,
    NotificationLogCleanupService,
  ],

  exports: [
    NotificationLogStoreService,
  ],
})
export class NotificationLogModule {}
