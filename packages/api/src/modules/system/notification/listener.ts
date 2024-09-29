import { Queue } from 'bull'
import { Repository } from 'typeorm'
import { InjectQueue } from '@nestjs/bull'
import { InjectRepository } from '@nestjs/typeorm'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ISystemUserDict, SystemNotificationChannel, YesOrNo } from '@xiaoshop/shared'

import { IBaseEvent } from '~/common/events'
import { SYSTEM_USER_STATUSES } from '~/dicts'
import { objectToDict, pipeDict, toEventName } from '~/utils/transformers'

import { SystemNotificationSentEvent } from './events'
import { ISystemNotificationSendJob } from './interface'
import { SystemNotificationLogService } from './log/service'
import { SystemNotificationTemplateEntity } from './template/entity'
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
    @InjectRepository(SystemNotificationTemplateEntity)
    private readonly repo: Repository<SystemNotificationTemplateEntity>,

    @InjectQueue(NOTIFICATION_QUEUE_ID)
    private readonly queue: Queue<ISystemNotificationSendJob>,

    @Inject(SystemNotificationLogService)
    private readonly log: SystemNotificationLogService,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 初始化通知模板订阅
   */
  async onModuleInit() {
    try {
      const templates = await this.repo.find({
        select: ['id', 'trigger'],
        where: {
          isEnabled: YesOrNo.YES,
        },
      })

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
      const templates = await this.repo.find({
        select: {
          id: true,
          type: true,
          scene: true,
          channels: true,
          contents: true,
          subscribers: { id: true, isAdmin: true, status: true, name: true },
        },
        where: {
          isEnabled: YesOrNo.YES,
          trigger: toEventName(event.constructor.name),
        },
      })

      if (!templates.length)
        return

      for (const template of templates) {
        if (template.channels.length === 0 || template.contents.length === 0)
          continue

        template.contents.filter(c => template.channels.includes(c.channel))
          .forEach(async (content) => {
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
              templateId: template.id,
              type: template.type,
              scene: template.scene,
              title: content.title,
              content: content.content,
              extras: event.extras,
              subscribers: template.subscribers
                ? pipeDict<ISystemUserDict>(template.subscribers, [
                  row => objectToDict(row, 'status', SYSTEM_USER_STATUSES),
                ])
                : [],
            })
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
