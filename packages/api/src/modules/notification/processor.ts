import {
  NotificationChannel,
  NotificationSendStatus,
} from '@xiaoshop/shared'
import { Job } from 'bull'
import { Inject, Logger } from '@nestjs/common'
import { Process, Processor } from '@nestjs/bull'
import { MemberAccountService } from '@/member/account/service'
import { NotificationLogService } from '@/notification/log/service'
import type { INotificationMessageJob } from '@/notification/interface'
import { NotificationMessageService } from '@/notification/message/service'
import {
  NOTIFICATION_QUEUE_ID,
  NOTIFICATION_SMS_NOTIFY,
  NOTIFICATION_SYSTEM_NOTIFY,
  NOTIFICATION_WECHAT_NOTIFY,
} from '@/notification/constants'
import { replaceVariables } from '~/utils'

@Processor(NOTIFICATION_QUEUE_ID)
export class NotificationProcessor {
  private readonly logger = new Logger(NotificationProcessor.name)

  constructor(
    @Inject(NotificationLogService)
    private readonly log: NotificationLogService,

    @Inject(NotificationMessageService)
    private readonly message: NotificationMessageService,

    @Inject(MemberAccountService)
    private readonly member: MemberAccountService,
  ) {}

  /**
   * 发送系统通知
   *
   * @param job INotificationMessageJob
   */
  @Process(NOTIFICATION_SYSTEM_NOTIFY)
  async handleSystemNotify(job: Job<INotificationMessageJob>) {
    const {
      templateId = 0,
      memberId = 0,
      scope,
      scene,
      rawTitle,
      rawContent,
      extras,
    } = job.data

    const title = replaceVariables(rawTitle, extras)
    const content = replaceVariables(rawContent, extras)

    let sendTo = ''

    if (memberId > 0) {
      const member = await this.member.findInfoById(memberId)
      sendTo = member.nickname || ''
    }

    try {
      await this.message.create({ memberId, scope, scene, title, content, extras })

      await this.log.write({
        scope,
        scene,
        memberId,
        templateId,
        title,
        content,
        sendTo,
        channel: NotificationChannel.SYSTEM,
        status: NotificationSendStatus.SUCCESS,
      })
    }
    catch (e) {
      await this.log.write({
        scope,
        scene,
        memberId,
        templateId,
        title,
        content,
        sendTo,
        channel: NotificationChannel.SYSTEM,
        status: NotificationSendStatus.FAILED,
      })

      this.logger.error(`发送系统通知 - ${e.message} - ${JSON.stringify(job)}`)
    }
  }

  /**
   * 发送短信通知
   *
   * @param job INotificationMessageJob
   */
  @Process(NOTIFICATION_SMS_NOTIFY)
  async handleSmsNotify(job: Job<INotificationMessageJob>) {
    try {
      this.logger.debug(`发送短信通知 - ${JSON.stringify(job)}`)
    }
    catch (e) {
      this.logger.error(`发送短信通知 - ${e.message} - ${JSON.stringify(job)}`)
    }
  }

  /**
   * 发送微信通知
   *
   * @param job INotificationMessageJob
   */
  @Process(NOTIFICATION_WECHAT_NOTIFY)
  async handleWechatNotify(job: Job<INotificationMessageJob>) {
    try {
      this.logger.debug(`发送微信通知 - ${JSON.stringify(job)}`)
    }
    catch (e) {
      this.logger.error(`发送微信通知 - ${e.message} - ${JSON.stringify(job)}`)
    }
  }
}
