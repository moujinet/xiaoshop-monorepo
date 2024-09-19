import type { ISystemMessageSendJob } from './interface'

import { Job } from 'bull'
import { Inject, Logger } from '@nestjs/common'
import { Process, Processor } from '@nestjs/bull'
import {
  SystemMessageType,
  SystemUserStatus,
} from '@xiaoshop/shared'

import { SystemMessageChannel } from './message/channels'
import { SystemMessageTemplateService } from './template/service'
import {
  MESSAGE_QUEUE_ID,
  MESSAGE_SMS_SENDER,
  MESSAGE_SYSTEM_SENDER,
  MESSAGE_WECHAT_SENDER,
} from './constants'

@Processor(MESSAGE_QUEUE_ID)
export class MessageProcessor {
  private readonly logger = new Logger(MessageProcessor.name)

  constructor(
    @Inject(SystemMessageTemplateService)
    private readonly template: SystemMessageTemplateService,

    @Inject(SystemMessageChannel)
    private readonly systemMessage: SystemMessageChannel,
  ) {}

  /**
   * 发送系统消息
   */
  @Process(MESSAGE_SYSTEM_SENDER)
  async handleSendSystemMessage(job: Job<ISystemMessageSendJob>) {
    try {
      const { type, templateId } = job.data

      if (type === SystemMessageType.SELLER) {
        const subscribers = await this.template.findSubscribersById(templateId).then(
          all => all.filter(
            subscriber => subscriber.status.key === SystemUserStatus.NORMAL,
          ),
        )

        Promise.all(subscribers.map(
          subscriber => this.systemMessage.sendToSeller(subscriber, job.data),
        ))
      }
      else {
        await this.systemMessage.sendToBuyer(job.data)
      }
    }
    catch (e) {
      this.logger.error(`发送系统消息 - ${e.message} - ${JSON.stringify(job)}`)
    }
  }

  /**
   * 发送短信消息
   */
  @Process(MESSAGE_SMS_SENDER)
  async handleSendSmsMessage(job: Job<ISystemMessageSendJob>) {
    try {
      this.logger.debug(`发送短信消息 - ${JSON.stringify(job)}`)
    }
    catch (e) {
      this.logger.error(`发送短信消息 - ${e.message} - ${JSON.stringify(job)}`)
    }
  }

  /**
   * 发送微信消息
   */
  @Process(MESSAGE_WECHAT_SENDER)
  async handleSendWechatMessage(job: Job<ISystemMessageSendJob>) {
    try {
      this.logger.debug(`发送微信消息 - ${JSON.stringify(job)}`)
    }
    catch (e) {
      this.logger.error(`发送微信消息 - ${e.message} - ${JSON.stringify(job)}`)
    }
  }
}
