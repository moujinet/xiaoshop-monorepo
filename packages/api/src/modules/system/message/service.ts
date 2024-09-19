import type { ISystemMessageSendJob } from './interface'

import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { type ISystemMessageExtrasInfo, SystemMessageChannel } from '@xiaoshop/shared'

import { SystemMessageTemplateService } from './template/service'
import { MESSAGE_QUEUE_ID, MESSAGE_SMS_SENDER, MESSAGE_SYSTEM_SENDER, MESSAGE_WECHAT_SENDER } from './constants'

@Injectable()
export class SystemMessageSendService {
  private readonly logger = new Logger(SystemMessageSendService.name)

  constructor(
    @Inject(SystemMessageTemplateService)
    private readonly messageTemplate: SystemMessageTemplateService,

    @InjectQueue(MESSAGE_QUEUE_ID)
    private readonly queue: Queue<ISystemMessageSendJob>,
  ) {}

  /**
   * 发送消息
   *
   * @param templateKey 消息模板标识
   * @param extras 消息扩展信息
   */
  async sendMessage(
    templateKey: string,
    extras: ISystemMessageExtrasInfo = {},
  ) {
    try {
      const templates = await this.messageTemplate.findContentListByKey(templateKey)

      if (!templates.length)
        return

      for (const template of templates) {
        let SENDER = MESSAGE_SYSTEM_SENDER

        switch (template.channel.key) {
          case SystemMessageChannel.WECHAT: {
            SENDER = MESSAGE_WECHAT_SENDER
            break
          }
          case SystemMessageChannel.SMS: {
            SENDER = MESSAGE_SMS_SENDER
            break
          }
        }

        await this.queue.add(SENDER, {
          templateId: template.id,
          type: template.type.key,
          scene: template.scene.key,
          title: template.title,
          content: template.content,
          extras,
        })
      }
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
