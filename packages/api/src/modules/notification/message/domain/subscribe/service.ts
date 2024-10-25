import type { INotifyBasedEvent } from '~/common/events'
import type { INotificationMessageSendJob } from './interface'
import type { INotificationMessageRepository } from '@/notification/message/model/interface'

import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Inject, Injectable, Logger, type OnModuleInit } from '@nestjs/common'
import {
  type INotificationExtrasInfo,
  type INotificationMessageContentList,
  NotificationChannel,
  NotificationType,
  YesOrNo,
} from '@xiaoshop/shared'

import { FailedException } from '~/common/exceptions'
import { toEventName } from '~/services/event-bus/helpers'
import { NotificationMessageRepo } from '@/notification/message/model/provider'
import { toNotificationMessageContentList } from '@/notification/message/model/mapper'
import { NotificationSellerSubscriberService } from '@/notification/subscriber/domain/seller/service'
import {
  NOTIFICATION_MESSAGE_CHANNEL_SMS,
  NOTIFICATION_MESSAGE_CHANNEL_SYSTEM,
  NOTIFICATION_MESSAGE_CHANNEL_WECHAT,
  NOTIFICATION_MESSAGE_QUEUE_KEY,
} from '@/notification/message/constants'

@Injectable()
export class NotificationMessageSubscribeService implements OnModuleInit {
  private readonly logger = new Logger(NotificationMessageSubscribeService.name)

  constructor(
    @NotificationMessageRepo()
    private readonly repo: INotificationMessageRepository,

    @Inject(NotificationSellerSubscriberService)
    private readonly seller: NotificationSellerSubscriberService,

    @InjectQueue(NOTIFICATION_MESSAGE_QUEUE_KEY)
    private readonly queue: Queue<INotificationMessageSendJob>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 初始化通知消息订阅
   */
  async onModuleInit() {
    try {
      const events = await this.repo.find(
        { isEnabled: YesOrNo.YES },
        ['id', 'listenTo'],
      )

      if (!events.length)
        return

      for (const event of events) {
        this.event.addListener(
          event.listenTo,
          this.onSubscribe.bind(this),
        )

        this.logger.debug(`开始监听通知消息订阅 - ${event.listenTo}`)
      }
    }
    catch (e) {
      this.logger.error(`初始化通知消息订阅 - ${e.message}`, e.stack)
    }
  }

  /**
   * 通知消息订阅
   *
   * @param event INotifyBasedEvent
   */
  async onSubscribe(event: INotifyBasedEvent) {
    try {
      const messages = await this.repo.find(
        {
          isEnabled: YesOrNo.YES,
          listenTo: toEventName(event.constructor.name),
        },
        ['id', 'type', 'scene', 'channels', 'contents'],
      ).then(
        toNotificationMessageContentList,
      )

      if (!messages.length)
        return

      for (const message of messages) {
        let channel = NOTIFICATION_MESSAGE_CHANNEL_SYSTEM

        if (message.channel === NotificationChannel.SMS)
          channel = NOTIFICATION_MESSAGE_CHANNEL_SMS

        else if (message.channel === NotificationChannel.WECHAT)
          channel = NOTIFICATION_MESSAGE_CHANNEL_WECHAT

        if (message.type === NotificationType.SELLER) {
          await this.addToSeller(channel, message, event.extras || {})
        }
        else if (message.type === NotificationType.BUYER) {
          await this.addToBuyer(channel, message, event.extras || {})
        }
      }
    }
    catch (e) {
      this.logger.error(e.message, e.stack)
    }
  }

  /**
   * 卖家消息
   *
   * @param channel 消息渠道
   * @param message 发送消息
   * @param extras 附加数据
   */
  async addToSeller(
    channel: string,
    message: INotificationMessageContentList,
    extras: INotificationExtrasInfo,
  ) {
    try {
      const subscribers = await this.seller.findNormalList(message.id)

      for (const subscriber of subscribers) {
        await this.queue.add(channel, {
          subscriberId: subscriber.id,
          type: message.type,
          scene: message.scene,
          title: message.title,
          content: message.content,
          extras: {
            ...extras,
            subscriberId: subscriber.id,
            subscriberName: subscriber.name,
            subscriberMobile: subscriber.mobile,
            subscriberUsername: subscriber.username,
          },
        })
      }
    }
    catch (e) {
      throw new FailedException(e.message)
    }
  }

  /**
   * 买家消息
   *
   * @param channel 消息渠道
   * @param message 发送消息
   * @param extras 附加数据
   */
  async addToBuyer(
    channel: string,
    message: INotificationMessageContentList,
    extras: INotificationExtrasInfo,
  ) {
    if ('memberId' in extras) {
      await this.queue.add(channel, {
        subscriberId: extras.memberId,
        type: message.type,
        scene: message.scene,
        title: message.title,
        content: message.content,
        extras: {
          ...extras,
          subscriberId: extras.memberId,
          subscriberName: extras.memberName,
          subscriberMobile: extras.memberMobile,
          subscriberUsername: extras.memberUsername,
        },
      })
    }
    else {
      this.logger.fatal('订阅者不存在', { channel, message, extras })
    }
  }
}
