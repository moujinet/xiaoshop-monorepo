import type { ISystemNotificationSendJob } from '@/system/notification/interface'

import { Job } from 'bull'
import { Inject, Logger } from '@nestjs/common'
import { Process, Processor } from '@nestjs/bull'
import { EventEmitter2 } from '@nestjs/event-emitter'
import {
  SystemNotificationChannel,
  SystemNotificationSendStatus,
  SystemNotificationType,
} from '@xiaoshop/shared'

import { replaceVariables } from '~/utils'
import { toEventName } from '~/utils/transformers'
import { SystemNotificationSentEvent } from '@/system/notification/events'
import {
  NOTIFICATION_QUEUE_ID,
  NOTIFICATION_SEND_SUCCESS,
  NOTIFICATION_SYSTEM_CHANNEL,
} from '@/system/notification/constants'

import { SystemNotificationAdminService } from '../notification/admin/service'
import { SystemNotificationTemplateAdminService } from '../template/admin/service'

@Processor(NOTIFICATION_QUEUE_ID)
export class SystemNotificationSystemChannel {
  private readonly logger = new Logger(SystemNotificationSystemChannel.name)

  constructor(
    @Inject(SystemNotificationAdminService)
    private readonly sender: SystemNotificationAdminService,

    @Inject(SystemNotificationTemplateAdminService)
    private readonly template: SystemNotificationTemplateAdminService,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 发送系统通知
   */
  @Process(NOTIFICATION_SYSTEM_CHANNEL)
  async handler(job: Job<ISystemNotificationSendJob>) {
    try {
      if (job.data.type === SystemNotificationType.SELLER) {
        await this.sendToSeller(job.data)
      }
      else {
        await this.sendToSeller(job.data)
      }
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }

  /**
   * 发送给商家
   */
  async sendToSeller(job: ISystemNotificationSendJob) {
    try {
      const subscribers = await this.template.findSubscribersById(job.templateId)

      if (!subscribers.length)
        return

      Promise.all(subscribers.map(
        async (subscriber) => {
          await this.sendTo(subscriber.id, subscriber.name, job)
        },
      ))
    }
    catch (e) {
      this.logger.error(`发送系统通知给商家 - ${e.message}`)
    }
  }

  /**
   * 发送给买家
   */
  async sendToBuyer(job: ISystemNotificationSendJob) {
    try {
      const {
        memberId = 0,
        memberName = '',
      } = job.extras ?? {}

      if (!memberId) {
        this.logger.warn(`发送系统通知给买家 - 买家 ID 不存在 - ${JSON.stringify(job)}`)
        return
      }

      await this.sendTo(memberId, memberName, job)
    }
    catch (e) {
      this.logger.error(`发送系统通知给买家 - ${e.message}`)
    }
  }

  /**
   * 发送系统通知
   *
   * @param receiverId 接收人 ID
   * @param receiverName 接收人 名称
   * @param job 发送任务
   */
  async sendTo(
    receiverId: number,
    receiverName: string,
    job: ISystemNotificationSendJob,
  ) {
    const notice = {
      receiverId,
      type: job.type,
      scene: job.scene,
      title: replaceVariables(job.title, job.extras),
      content: replaceVariables(job.content, job.extras),
      extras: job.extras,
    }

    const result = await this.sender.send(notice)

    this.event.emit(
      toEventName(SystemNotificationSentEvent.name),
      new SystemNotificationSentEvent(
        job.templateId,
        SystemNotificationChannel.SYSTEM,
        receiverName,
        notice,
        result,
        result === NOTIFICATION_SEND_SUCCESS
          ? SystemNotificationSendStatus.SUCCESS
          : SystemNotificationSendStatus.FAILED,
      ),
    )
  }
}
