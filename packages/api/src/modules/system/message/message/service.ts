import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { FindOptionsWhere, LessThan, Repository } from 'typeorm'
import {
  type IApiPaginationData,
  type ISystemMessageInfo,
  type ISystemMessageList,
  type ISystemMessageTemplateInfo,
  SystemMessageScene,
  SystemMessageSendStatus,
  SystemMessageStatus,
  SystemMessageType,
} from '@xiaoshop/shared'

import { DEFAULT_PAGE_SIZE } from '~/configs/constants'
import { FailedException, NotFoundException } from '~/common/exceptions'
import { SYSTEM_MESSAGE_SCENES, SYSTEM_MESSAGE_STATUSES } from '~/common/dicts'
import { objectToDict, pipeDict, toDict, toEventName } from '~/utils/transformers'

import { SystemMessage } from './entity'
import { SystemMessageSentEvent } from './events'
import {
  GetSystemMessageListRequest,
  GetSystemMessagePagesRequest,
  SystemMessagePayload,
} from './dto'

@Injectable()
export class SystemMessageService {
  [x: string]: any
  constructor(
    @InjectRepository(SystemMessage)
    private readonly repository: Repository<SystemMessage>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取系统消息列表
   *
   * @param receiverId 接收人 ID
   * @param query 查询条件
   * @returns 系统消息列表
   * @throws {FailedException} 获取系统消息列表失败
   */
  async findPages(
    receiverId: number,
    query: GetSystemMessagePagesRequest,
  ): Promise<IApiPaginationData<ISystemMessageList>> {
    try {
      const {
        type,
        page = 1,
        pagesize = DEFAULT_PAGE_SIZE,
      } = query

      const [list, total] = await this.repository.findAndCount({
        select: ['id', 'scene', 'status', 'title', 'content', 'extras', 'sentTime'],
        where: { receiverId, type },
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: { status: 'ASC', sentTime: 'DESC' },
      })

      return {
        result: pipeDict<ISystemMessageList>(list, [
          row => objectToDict(row, 'scene', SYSTEM_MESSAGE_SCENES),
          row => objectToDict(row, 'status', SYSTEM_MESSAGE_STATUSES),
        ]),
        total,
        page,
        pagesize,
      }
    }
    catch (e) {
      throw new FailedException('获取系统消息列表', e.message)
    }
  }

  /**
   * 获取系统消息列表
   *
   * @param receiverId 接收人 ID
   * @param query 查询条件
   * @returns 系统消息列表
   */
  async findList(
    receiverId: number,
    query: GetSystemMessageListRequest,
  ): Promise<ISystemMessageList[]> {
    try {
      const where: FindOptionsWhere<SystemMessage> = {
        receiverId,
        type: query.type,
      }

      if (query.status)
        where.status = query.status

      const list = await this.repository.find({
        select: ['id', 'scene', 'status', 'title', 'content', 'extras', 'sentTime'],
        where,
        order: { sentTime: 'DESC' },
        take: query.take || DEFAULT_PAGE_SIZE,
      })

      return pipeDict<ISystemMessageList>(list, [
        row => objectToDict(row, 'scene', SYSTEM_MESSAGE_SCENES),
        row => objectToDict(row, 'status', SYSTEM_MESSAGE_STATUSES),
      ])
    }
    catch (e) {
      throw new FailedException('获取系统消息列表', e.message, e.status)
    }
  }

  /**
   * 获取系统消息内容
   *
   * @param id 消息 ID
   * @param receiverId 接收人 ID
   * @param type 消息类型
   * @returns 系统消息内容
   * @throws {FailedException} 获取系统消息内容失败
   * @throws {NotFoundException} 消息不存在
   */
  async findById(id: number, receiverId: number, type: SystemMessageType): Promise<ISystemMessageInfo> {
    try {
      const message = await this.repository.findOne({
        select: ['id', 'scene', 'status', 'title', 'content', 'extras', 'sentTime'],
        where: {
          id,
          receiverId,
          type,
        },
      })

      if (!message)
        throw new NotFoundException('系统消息')

      return {
        ...message,
        scene: toDict(message.scene, SYSTEM_MESSAGE_SCENES),
        status: toDict(message.status, SYSTEM_MESSAGE_STATUSES),
      }
    }
    catch (e) {
      throw new FailedException('获取系统消息内容', e.message)
    }
  }

  /**
   * 读取系统消息, 并设置为已读
   *
   * @param id 消息 ID
   * @param receiverId 收件人 ID
   * @param type 消息类型
   * @returns 系统消息内容
   * @throws {FailedException} 读取系统消息失败
   * @throws {NotFoundException} 消息不存在
   */
  async read(id: number, receiverId: number, type: SystemMessageType): Promise<ISystemMessageInfo> {
    try {
      const message = await this.findById(id, receiverId, type)

      if (message.status.key === SystemMessageStatus.UNREAD)
        await this.markAsRead(id, receiverId, type)

      return message
    }
    catch (e) {
      throw new FailedException('设置系统消息为已读', e.message)
    }
  }

  /**
   * 获取未读消息数量
   *
   * @param receiverId 接收人 ID
   * @param type 消息类型
   * @returns 未读消息数量
   * @throws {FailedException} 获取未读消息数量失败
   */
  async countUnread(receiverId: number, type: SystemMessageType): Promise<number> {
    try {
      return await this.repository.count({
        where: {
          receiverId,
          type,
          status: SystemMessageStatus.UNREAD,
        },
      })
    }
    catch (e) {
      throw new FailedException('获取未读消息数量', e.message)
    }
  }

  /**
   * 设置所有消息为已读
   *
   * @param receiverId 接收人 ID
   * @param type 消息类型
   * @throws {FailedException} 设置所有消息为已读失败
   */
  async markAllAsRead(receiverId: number, type: SystemMessageType) {
    try {
      await this.repository.update({
        receiverId,
        type,
      }, {
        status: SystemMessageStatus.READ,
      })
    }
    catch (e) {
      throw new FailedException('设置所有消息为已读', e.message)
    }
  }

  /**
   * 设置消息为已读
   *
   * @param id 消息 ID
   * @param receiverId 接收人 ID
   * @param type 消息类型
   * @throws {FailedException} 设置消息为已读失败
   */
  async markAsRead(id: number, receiverId: number, type: SystemMessageType) {
    try {
      await this.repository.update({
        id,
        receiverId,
        type,
      }, {
        status: SystemMessageStatus.READ,
      })
    }
    catch (e) {
      throw new FailedException('设置消息为已读', e.message)
    }
  }

  /**
   * 发送系统消息
   *
   * @param templateId 消息模板 ID
   * @param data 发送消息信息
   * @throws {FailedException} 发送系统消息失败
   * @event {SystemMessageSentEvent} 发送系统消息
   */
  async send(
    templateId: ISystemMessageTemplateInfo['id'],
    data: SystemMessagePayload,
  ) {
    const {
      receiverId,
      type = SystemMessageType.BUYER,
      scene = SystemMessageScene.SYSTEM,
      title,
      content,
      extras,
    } = data

    const message = new SystemMessage()

    message.receiverId = receiverId
    message.type = type
    message.scene = scene
    message.title = title
    message.content = content
    message.extras = extras

    try {
      await this.repository.save(message)

      this.event.emit(
        toEventName(SystemMessageSentEvent.name),
        new SystemMessageSentEvent(
          templateId,
          message,
          SystemMessageSendStatus.SUCCESS,
        ),
      )
    }
    catch (e) {
      this.event.emit(
        toEventName(SystemMessageSentEvent.name),
        new SystemMessageSentEvent(
          templateId,
          message,
          SystemMessageSendStatus.FAILED,
        ),
      )

      throw new FailedException('发送系统消息', e.message)
    }
  }

  /**
   * 删除消息
   *
   * @param id 消息 ID
   * @param receiverId 接收人 ID
   * @param type 消息类型
   * @throws {FailedException} 删除消息失败
   */
  async delete(id: number, receiverId: number, type: SystemMessageType) {
    try {
      await this.repository.delete({
        id,
        receiverId,
        type,
      })
    }
    catch (e) {
      throw new FailedException('删除消息', e.message)
    }
  }

  /**
   * 清空消息
   *
   * @param receiverId 接收人 ID
   * @param type 消息类型
   * @throws {FailedException} 清空消息失败
   */
  async deleteAll(receiverId: number, type: SystemMessageType) {
    try {
      await this.repository.delete({
        receiverId,
        type,
      })
    }
    catch (e) {
      throw new FailedException('清空消息', e.message)
    }
  }

  /**
   * 清理历史消息
   *
   * @param days 清理天数
   * @throws {FailedException} 清理历史消息失败
   */
  async cleanupBeforeDays(days: number) {
    try {
      const date = new Date()
      date.setDate(date.getDate() - days)

      const list = await this.repository.find({
        select: ['id'],
        where: {
          sentTime: LessThan(date.toISOString()),
        },
      })

      await this.repository.remove(list, {
        chunk: 100,
        transaction: true,
      })
    }
    catch (e) {
      throw new FailedException('清理历史消息失败', e.message)
    }
  }
}
