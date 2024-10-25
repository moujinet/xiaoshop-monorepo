import type { INotificationMessageRepository, INotificationMessageWhere } from '@/notification/message/model/interface'

import { Not } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { type INotificationMessageInfo, type INotificationMessageList, YesOrNo } from '@xiaoshop/shared'

import { EventBusEmitter } from '~/services/event-bus/emitter'
import { NotificationMessageRepo } from '@/notification/message/model/provider'
import { GetNotificationMessageListRequest } from '@/notification/message/dto/request'
import { ExistsException, FailedException, NotFoundException } from '~/common/exceptions'
import { toNotificationMessageInfo, toNotificationMessageList } from '@/notification/message/model/mapper'
import { CreateNotificationMessagePayload, UpdateNotificationMessagePayload } from '@/notification/message/dto/payload'

import {
  NotificationMessageCreateEvent,
  NotificationMessageDeleteEvent,
  NotificationMessageDisableEvent,
  NotificationMessageEnableEvent,
  NotificationMessageUpdateEvent,
} from './events'

@Injectable()
export class NotificationMessageService {
  constructor(
    @NotificationMessageRepo()
    private readonly repo: INotificationMessageRepository,

    @Inject(EventBusEmitter)
    private readonly event: EventBusEmitter,
  ) {}

  /**
   * 获取通知消息模板列表
   *
   * @param query 查询条件
   * @returns 通知消息模板列表
   * @throws {FailedException} 获取通知消息模板列表失败
   */
  async findList(query: GetNotificationMessageListRequest): Promise<INotificationMessageList[]> {
    try {
      const where: INotificationMessageWhere = {}

      if (query.type)
        where.type = query.type

      if (query.scene)
        where.scene = query.scene

      return await this.repo.find(where).then(toNotificationMessageList)
    }
    catch (e) {
      throw new FailedException('获取通知消息模板列表', e.message)
    }
  }

  /**
   * 获取通知消息模板详情
   *
   * @param id 通知消息模板 ID
   * @returns 获取通知消息模板详情失败
   */
  async findById(id: number): Promise<INotificationMessageInfo> {
    try {
      const message = await this.repo.findById(id)

      if (!message)
        throw new NotFoundException('通知消息模板')

      return toNotificationMessageInfo(message)
    }
    catch (e) {
      throw new FailedException('获取通知消息模板详情', e.message, e.status)
    }
  }

  /**
   * 创建通知消息模板
   *
   * @param data 创建数据
   * @throws {FailedException} 创建通知消息模板失败
   * @throws {ExistsException} 通知消息模板已存在
   */
  async create(data: CreateNotificationMessagePayload) {
    try {
      if (await this.repo.exists({
        name: data.name.trim(),
        type: data.type,
        scene: data.scene,
      })) {
        throw new ExistsException('通知消息模板')
      }

      const message = await this.repo.create(data)

      this.event.emit(
        new NotificationMessageCreateEvent(message.id, message.name),
      )
    }
    catch (e) {
      throw new FailedException('创建通知消息模板', e.message, e.status)
    }
  }

  /**
   * 更新通知消息模板
   *
   * @param id 通知消息模板 ID
   * @param data 更新数据
   * @throws {FailedException} 更新通知消息模板失败
   * @throws {NotFoundException} 通知消息模板不存在
   * @throws {ExistsException} 通知消息模板已存在
   */
  async update(id: number, data: UpdateNotificationMessagePayload) {
    try {
      const message = await this.repo.findById(id)

      if (!message)
        throw new NotFoundException('通知消息模板')

      if (await this.repo.exists({
        id: Not(id),
        name: data.name.trim(),
        type: message.type,
        scene: message.scene,
      })) {
        throw new ExistsException('通知消息模板')
      }

      const updated = await this.repo.update(message, data)

      this.event.emit(
        new NotificationMessageUpdateEvent(updated.id, updated.name),
      )
    }
    catch (e) {
      throw new FailedException('创建通知消息模板', e.message, e.status)
    }
  }

  /**
   * 更新通知消息模板启用状态
   *
   * @param id 通知消息模板 ID
   * @param isEnabled 是否启用
   * @throws {FailedException} 更新通知消息模板状态失败
   * @throws {NotFoundException} 通知消息模板不存在
   */
  async updateStatus(id: number, isEnabled: YesOrNo) {
    try {
      const message = await this.repo.findById(id, ['id', 'name', 'isEnabled'])

      if (!message)
        throw new NotFoundException('通知消息模板')

      if (message.isEnabled === isEnabled)
        return

      await this.repo.updateStatus(id, isEnabled)

      const EventClass = isEnabled === YesOrNo.YES
        ? NotificationMessageEnableEvent
        : NotificationMessageDisableEvent

      this.event.emit(
        new EventClass(message.id, message.name),
      )
    }
    catch (e) {
      throw new FailedException('更新通知消息模板状态', e.message, e.status)
    }
  }

  /**
   * 删除通知消息模板
   *
   * @param id 通知消息模板 ID
   * @throws {FailedException} 删除通知消息模板失败
   */
  async delete(id: number) {
    try {
      const message = await this.repo.findById(id, ['id', 'name'])

      if (message) {
        await this.repo.destroy(message.id)

        this.event.emit(
          new NotificationMessageDeleteEvent(message.id, message.name),
        )
      }
    }
    catch (e) {
      throw new FailedException('删除通知消息模板', e.message)
    }
  }
}
