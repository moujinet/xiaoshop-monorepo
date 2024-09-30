import { BullModule } from '@nestjs/bull'
import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { SystemSettingModule } from '@/system/setting/module'

import { NOTIFICATION_QUEUE_ID } from './constants'
import { SystemNotificationListener } from './listener'
import { SystemNotificationLogEntity } from './log/entity'
import { SystemNotificationEntity } from './notification/entity'
import { SystemNotificationTemplateEntity } from './template/entity'
import { SystemNotificationLogAdminService } from './log/admin/service'
import { SystemNotificationSystemChannel } from './channel/system.channel'
import { SystemNotificationLogAdminController } from './log/admin/controller'
import { SystemNotificationAdminService } from './notification/admin/service'
import { SystemNotificationTemplateAdminService } from './template/admin/service'
import { SystemNotificationAdminController } from './notification/admin/controller'
import { SystemNotificationTemplateAdminController } from './template/admin/controller'
import { SystemNotificationTemplateSubscribeService } from './template/subscribe/service'

@Module({
  imports: [
    forwardRef(() => SystemSettingModule),

    TypeOrmModule.forFeature([
      SystemNotificationEntity,
      SystemNotificationLogEntity,
      SystemNotificationTemplateEntity,
    ]),

    BullModule.registerQueue({
      name: NOTIFICATION_QUEUE_ID,
    }),
  ],

  controllers: [
    SystemNotificationAdminController,
    SystemNotificationLogAdminController,
    SystemNotificationTemplateAdminController,
  ],

  providers: [
    SystemNotificationAdminService,
    SystemNotificationLogAdminService,
    SystemNotificationTemplateAdminService,
    SystemNotificationTemplateSubscribeService,

    // Listeners
    SystemNotificationListener,

    // Channels
    SystemNotificationSystemChannel,
  ],
})
export class SystemNotificationModule {}
