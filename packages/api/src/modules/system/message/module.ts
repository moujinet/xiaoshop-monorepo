import { BullModule } from '@nestjs/bull'
import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'

import { SystemSettingsModule } from '@/system/settings/module'

import { MESSAGE_QUEUE_ID } from './constants'
import { SystemMessageLog } from './log/entity'
import { SystemMessage } from './message/entity'
import { SystemMessageListener } from './listener'
import { SystemMessageScheduler } from './scheduler'
import { SystemMessageLogService } from './log/service'
import { SystemMessageService } from './message/service'
import { SystemMessageTemplate } from './template/entity'
import { SystemMessageTemplateService } from './template/service'
import { SystemMessageLogAdminController } from './log/controller.admin'
import { SystemMessageAdminController } from './message/controller.admin'
import { SystemMessageTemplateAdminController } from './template/controller.admin'
import {
  SmsMessageChannel,
  SystemMessageChannel,
  WechatMessageChannel,
} from './message/channels'

@Module({
  imports: [
    forwardRef(() => SystemSettingsModule),

    TypeOrmModule.forFeature([
      SystemMessageTemplate,
      SystemMessage,
      SystemMessageLog,
    ]),

    BullModule.registerQueue({
      name: MESSAGE_QUEUE_ID,
    }),
  ],

  controllers: [
    SystemMessageAdminController,
    SystemMessageTemplateAdminController,
    SystemMessageLogAdminController,
  ],

  providers: [
    SystemMessageService,
    SystemMessageTemplateService,
    SystemMessageLogService,

    // Channels
    SmsMessageChannel,
    SystemMessageChannel,
    WechatMessageChannel,

    // Listener
    SystemMessageListener,

    // Scheduler
    SystemMessageScheduler,
  ],
})
export class SystemMessageModule {}
