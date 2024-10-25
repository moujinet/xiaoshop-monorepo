import type { INotificationSubscriberRepository } from '@/notification/subscriber/model/interface'

import { In } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import {
  type INotificationSellerSubscriber,
  type INotificationSellerSubscriberDict,
  NotificationType,
  SystemUserStatus,
} from '@xiaoshop/shared'

import { FailedException } from '~/common/exceptions'
import { EventBusEmitter } from '~/services/event-bus/emitter'
import { SystemUserService } from '@/system/auth/domain/user/service'
import { toSystemUserDictList } from '@/system/auth/model/user/mapper'
import { NotificationSubscriberRepo } from '@/notification/subscriber/model/provider'
import { UpsertNotificationSubscriberPayload } from '@/notification/subscriber/dto/payload'

import { NotificationSellerSubscriberUpdateEvent } from './events'

@Injectable()
export class NotificationSellerSubscriberService {
  constructor(
    @NotificationSubscriberRepo()
    private readonly repo: INotificationSubscriberRepository,

    @Inject(SystemUserService)
    private readonly user: SystemUserService,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取商家通知订阅者公开信息列表
   *
   * @param messageId 通知消息 ID
   * @returns 商家通知订阅者公开信息列表
   * @throws {FailedException} 获取商家通知订阅者公开信息列表失败
   */
  async findNormalList(messageId: number): Promise<INotificationSellerSubscriber[]> {
    try {
      const subscribers = await this.repo.find({
        type: NotificationType.SELLER,
        messageId,
      }, ['subscriberId'])

      return await this.user.findByIds(
        subscribers.map(i => i.subscriberId),
        [
          'id',
          'status',
          'name',
          'username',
          'mobile',
        ],
      ).then((subscribers) => {
        return subscribers
          .filter(
            subscriber => subscriber.status === SystemUserStatus.NORMAL,
          )
          .map(subscriber => ({
            id: subscriber.id,
            name: subscriber.name,
            username: subscriber.username,
            mobile: subscriber.mobile,
          }))
      })
    }
    catch (e) {
      throw new FailedException('获取商家通知订阅者公开信息列表', e.message)
    }
  }

  /**
   * 获取商家通知订阅者字典信息列表
   *
   * @param messageId 通知消息 ID
   * @returns 商家通知订阅者字典信息列表
   * @throws {FailedException} 获取商家通知订阅者字典信息列表失败
   */
  async findDictList(messageId: number): Promise<INotificationSellerSubscriberDict[]> {
    try {
      const subscribers = await this.repo.find({
        type: NotificationType.SELLER,
        messageId,
      }, ['subscriberId'])

      return await this.user.findByIds(
        subscribers.map(i => i.subscriberId),
        [
          'id',
          'isAdmin',
          'status',
          'name',
        ],
      ).then(toSystemUserDictList)
    }
    catch (e) {
      throw new FailedException('获取商家通知订阅者字典信息列表', e.message)
    }
  }

  /**
   * 更新商家通知订阅者
   *
   * @param data 订阅信息
   */
  async update(data: UpsertNotificationSubscriberPayload) {
    try {
      // Clean up all subscribers
      if (data.subscriberIds.length === 0) {
        await this.repo.destroy({
          type: NotificationType.SELLER,
          messageId: data.messageId,
        })

        return
      }

      const subscribers = await this.repo.find({
        type: NotificationType.SELLER,
        messageId: data.messageId,
      }, [
        'subscriberId',
      ]).then(
        i => i.map(i => i.subscriberId),
      )

      // Remove unsubscribed subscribers
      const unsubscribed = subscribers.filter(i => !data.subscriberIds.includes(i))

      await this.repo.destroy({
        type: NotificationType.SELLER,
        messageId: data.messageId,
        subscriberId: In(unsubscribed),
      })

      // Add new subscribers
      const newSubscribers = data.subscriberIds.filter(i => !subscribers.includes(i))

      for (const id of newSubscribers) {
        await this.repo.create({
          type: NotificationType.SELLER,
          messageId: data.messageId,
          subscriberId: id,
        })
      }

      this.event.emit(
        new NotificationSellerSubscriberUpdateEvent(
          data.messageId,
          data.subscriberIds,
        ),
      )
    }
    catch (e) {
      throw new FailedException('更新通知订阅者', e.message)
    }
  }
}
