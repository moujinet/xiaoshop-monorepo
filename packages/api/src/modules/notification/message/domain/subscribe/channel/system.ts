import type { INotificationMessageSendJob } from '@/notification/message/domain/subscribe/interface'

import { Job } from 'bull'
import { Inject, Logger } from '@nestjs/common'
import { Process, Processor } from '@nestjs/bull'

import { replaceVariables } from '~/utils'
import { NotificationInBoxStoreService } from '@/notification/inbox/domain/store/service'
import {
  NOTIFICATION_MESSAGE_CHANNEL_SYSTEM,
  NOTIFICATION_MESSAGE_QUEUE_CONCURRENCY,
  NOTIFICATION_MESSAGE_QUEUE_KEY,
} from '@/notification/message/constants'

@Processor(NOTIFICATION_MESSAGE_QUEUE_KEY)
export class NotificationMessageSubscribeSystemChannel {
  private readonly logger = new Logger(
    NotificationMessageSubscribeSystemChannel.name,
  )

  constructor(
    @Inject(NotificationInBoxStoreService)
    private readonly inbox: NotificationInBoxStoreService,
  ) {}

  @Process({
    name: NOTIFICATION_MESSAGE_CHANNEL_SYSTEM,
    concurrency: NOTIFICATION_MESSAGE_QUEUE_CONCURRENCY,
  })
  async handle(job: Job<INotificationMessageSendJob>) {
    try {
      const {
        subscriberId,
        type,
        scene,
        title,
        content,
        extras,
      } = job.data

      await this.inbox.create({
        subscriberId,
        type,
        scene,
        title: replaceVariables(title, extras || {}),
        content: replaceVariables(content, extras || {}),
        extras,
      })
    }
    catch (e) {
      this.logger.error(`发送通知消息失败 - ${e.message}`, e.stack)
    }
  }
}
