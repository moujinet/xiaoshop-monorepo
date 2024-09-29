import { BullModule } from '@nestjs/bull'
import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { SystemSettingModule } from '@/system/setting/module'

import { NOTIFICATION_QUEUE_ID } from './constants'
import { SystemNotificationListener } from './listener'
import { SystemNotificationLogEntity } from './log/entity'
import { SystemNotificationLogService } from './log/service'
import { SystemNotificationEntity } from './notification/entity'
import { SystemNotificationTemplateEntity } from './template/entity'
import { SystemNotificationTemplateService } from './template/service'
import { SystemNotificationAdminService } from './notification/service'
import { SystemNotificationSystemChannel } from './channel/system.channel'
import { SystemNotificationLogAdminController } from './log/controller.admin'
import { SystemNotificationAdminController } from './notification/controller.admin'
import { SystemNotificationTemplateAdminController } from './template/controller.admin'

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
    SystemNotificationLogService,
    SystemNotificationTemplateService,

    // Listeners
    SystemNotificationListener,

    // Channels
    SystemNotificationSystemChannel,
  ],
})
export class SystemNotificationModule {}
