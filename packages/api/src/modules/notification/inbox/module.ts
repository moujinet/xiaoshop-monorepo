import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { SystemSettingModule } from '@/system/setting/module'

import { NotificationInboxEntity } from './model/entity'
import { NotificationInboxRepositoryProvider } from './model/provider'
import { NotificationInBoxStoreService } from './domain/store/service'
import { NotificationInboxManageService } from './domain/manage/service'
import { NotificationInboxCleanupService } from './domain/cleanup/service'
import { NotificationInboxAdminController } from './controller/admin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NotificationInboxEntity,
    ]),

    forwardRef(() => SystemSettingModule),
  ],

  controllers: [
    NotificationInboxAdminController,
  ],

  providers: [
    NotificationInboxRepositoryProvider,
    NotificationInboxManageService,
    NotificationInBoxStoreService,
    NotificationInboxCleanupService,
  ],

  exports: [
    NotificationInBoxStoreService,
  ],
})
export class NotificationInboxModule {}
