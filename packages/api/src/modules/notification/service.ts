import {
  NotificationChannel,
} from '@xiaoshop/shared'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { INotificationMessageJob } from '@/notification/interface'
import { NotificationTemplateService } from '@/notification/template/service'
import {
  NOTIFICATION_QUEUE_ID,
  NOTIFICATION_SMS_NOTIFY,
  NOTIFICATION_SYSTEM_NOTIFY,
  NOTIFICATION_WECHAT_NOTIFY,
} from '@/notification/constants'

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name)

  constructor(
    @Inject(NotificationTemplateService)
    private readonly template: NotificationTemplateService,

    @InjectQueue(NOTIFICATION_QUEUE_ID)
    private readonly queue: Queue<INotificationMessageJob>,

  ) {}

  /**
   * 发送消息至会员
   *
   * @param memberId 会员 ID
   * @param templateKey 模板标识
   * @param extras 附加信息
   */
  async sendTo(
    memberId: number,
    templateKey: string,
    extras: Record<string, any> = {},
  ) {
    try {
      const template = await this.template.findByKey(templateKey)

      if (!template) {
        this.logger.debug(`消息模板不存在或未启用 - ${templateKey}`)
        return
      }

      const {
        scope,
        scene,
      } = template

      const contents = template.contents.filter(
        c => template.channels.includes(c.channel),
      )

      for (const { content, title, channel } of contents) {
        if (!content) {
          this.logger.debug(`消息模板内容为空 - ${templateKey} - ${channel}`)
          continue
        }

        let PROCESS_NAME = ''

        switch (channel) {
          // 系统通知
          case NotificationChannel.SYSTEM:
            PROCESS_NAME = NOTIFICATION_SYSTEM_NOTIFY
            break

          // 短信通知
          case NotificationChannel.SMS:
            PROCESS_NAME = NOTIFICATION_SMS_NOTIFY
            break

          // 微信通知
          case NotificationChannel.WECHAT_MP:
          case NotificationChannel.WECHAT_OA:
            PROCESS_NAME = NOTIFICATION_WECHAT_NOTIFY
            break

          default:
            continue
        }

        await this.queue.add(
          PROCESS_NAME,
          {
            templateId: template.id,
            memberId,
            scope,
            scene,
            rawTitle: title,
            rawContent: content,
            extras,
          },
        )
      }
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
