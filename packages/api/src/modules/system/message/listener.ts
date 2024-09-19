import { OnEvent } from '@nestjs/event-emitter'
import { SystemMessageChannel } from '@xiaoshop/shared'
import { Inject, Injectable, Logger } from '@nestjs/common'

import { toEventName } from '~/utils/transformers'

import { SystemMessageLogService } from './log/service'
import { SystemMessageSentEvent } from './message/events'

@Injectable()
export class SystemMessageListener {
  private readonly logger = new Logger(SystemMessageListener.name)

  constructor(
    @Inject(SystemMessageLogService)
    private readonly log: SystemMessageLogService,
  ) {}

  /**
   * 系统消息发送日志
   *
   * @param payload SystemMessageSentEvent
   */
  @OnEvent(toEventName(SystemMessageSentEvent.name), { async: true })
  async handleSystemMessageSentEvent(payload: SystemMessageSentEvent) {
    try {
      const {
        templateId,
        message,
        status,
      } = payload

      await this.log.write({
        templateId,
        type: message.type,
        scene: message.scene,
        title: message.title,
        content: message.content,
        extras: message.extras,
        receiver: message.extras.userName,
        channel: SystemMessageChannel.SYSTEM,
        status,
      })
    }
    catch (e) {
      this.logger.error(`写入系统消息发送日志 - ${e.message}`)
    }
  }
}
