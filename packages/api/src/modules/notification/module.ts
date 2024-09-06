import { BullModule } from '@nestjs/bull'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, forwardRef } from '@nestjs/common'

import { NotificationTemplate } from '@/notification/template/entity'
import { NotificationTemplateService } from '@/notification/template/service'
import { NotificationTemplateAdminController } from '@/notification/template/controller.admin'

import { NotificationTemplateContent } from '@/notification/template-content/entity'
import { NotificationTemplateContentService } from '@/notification/template-content/service'
import { NotificationTemplateContentAdminController } from '@/notification/template-content/controller.admin'

import { NotificationLog } from '@/notification/log/entity'
import { NotificationLogService } from '@/notification/log/service'
import { NotificationLogAdminController } from '@/notification/log/controller.admin'

import { NotificationMessage } from '@/notification/message/entity'
import { NotificationMessageService } from '@/notification/message/service'
import { NotificationMessageAdminController } from '@/notification/message/controller.admin'

import { NotificationService } from '@/notification/service'
import { NotificationProcessor } from '@/notification/processor'
import { NOTIFICATION_QUEUE_ID } from '@/notification/constants'

import { SettingsModule } from '@/settings/module'
import { MemberModule } from '@/member/module'

@Module({
  imports: [
    forwardRef(() => SettingsModule),

    forwardRef(() => MemberModule),

    TypeOrmModule.forFeature([
      NotificationTemplate,
      NotificationTemplateContent,
      NotificationMessage,
      NotificationLog,
    ]),

    BullModule.registerQueue({
      name: NOTIFICATION_QUEUE_ID,
    }),
  ],

  controllers: [
    NotificationMessageAdminController,
    NotificationTemplateAdminController,
    NotificationTemplateContentAdminController,
    NotificationLogAdminController,
  ],

  providers: [
    NotificationService,
    NotificationTemplateService,
    NotificationTemplateContentService,
    NotificationMessageService,
    NotificationLogService,

    // Processor
    NotificationProcessor,
  ],

  exports: [
    NotificationService,
  ],
})
export class NotificationModule {}
