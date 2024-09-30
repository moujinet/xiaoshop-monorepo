import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import { SystemNotificationChannel } from '@xiaoshop/shared'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common'

import { IBaseEvent } from '~/common/events'
import { toEventName } from '~/utils/transformers'

import { SystemNotificationSentEvent } from './events'
import { ISystemNotificationSendJob } from './interface'
import { SystemNotificationLogAdminService } from './log/admin/service'
import { SystemNotificationTemplateSubscribeService } from './template/subscribe/service'
import {
  NOTIFICATION_QUEUE_ID,
  NOTIFICATION_SMS_CHANNEL,
  NOTIFICATION_SYSTEM_CHANNEL,
  NOTIFICATION_WECHAT_CHANNEL,
} from './constants'

@Injectable()
export class SystemNotificationListener implements OnModuleInit {
  private readonly logger = new Logger(SystemNotificationListener.name)

  constructor(
    @Inject(SystemNotificationTemplateSubscribeService)
    private readonly subscribe: SystemNotificationTemplateSubscribeService,

    @InjectQueue(NOTIFICATION_QUEUE_ID)
    private readonly queue: Queue<ISystemNotificationSendJob>,

    @Inject(SystemNotificationLogAdminService)
    private readonly log: SystemNotificationLogAdminService,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 初始化通知模板订阅
   */
  async onModuleInit() {
    try {
      const templates = await this.subscribe.findTriggers()

      if (!templates.length)
        return

      for (const template of templates) {
        this.event.addListener(
          template.trigger,
          this.subscriber.bind(this),
        )
      }
    }
    catch (e) {
      this.logger.error(`初始化通知模板订阅 - ${e.message}`)
    }
  }

  /**
   * 通知订阅者
   *
   * @param event 触发事件
   */
  async subscriber(event: IBaseEvent) {
    try {
      const contents = await this.subscribe.findContentList(
        toEventName(event.constructor.name),
      )

      if (!contents.length)
        return

      for (const content of contents) {
        let channel = NOTIFICATION_SYSTEM_CHANNEL

        switch (content.channel) {
          case SystemNotificationChannel.WECHAT:
            channel = NOTIFICATION_WECHAT_CHANNEL
            break

          case SystemNotificationChannel.SMS:
            channel = NOTIFICATION_SMS_CHANNEL
            break
        }

        await this.queue.add(channel, {
          templateId: content.id,
          type: content.type,
          scene: content.scene,
          title: content.title,
          content: content.content,
          extras: event.extras,
          subscribers: content.subscribers,
        })
      }
    }
    catch (e) {
      this.logger.error(`通知订阅者 - ${e.message}`)
    }
  }

  /**
   * 系统通知发送日志
   *
   * @param payload SystemNotificationSentEvent
   */
  @OnEvent(toEventName(SystemNotificationSentEvent.name), { async: true })
  async handleSystemNotificationSentEvent(payload: SystemNotificationSentEvent) {
    try {
      const {
        templateId,
        channel,
        sendTo,
        result,
        status,
        notice: { type, scene, title, content, extras },
      } = payload

      await this.log.write({
        templateId,
        channel,
        type,
        scene,
        title,
        content,
        extras,
        sendTo,
        status,
        result,
      })
    }
    catch (e) {
      this.logger.error(e.message)
    }
  }
}
