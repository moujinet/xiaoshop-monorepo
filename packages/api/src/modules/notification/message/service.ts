import {
  type IApiPaginationData,
  type INotificationMessage,
  type INotificationMessageListItem,
  NotificationScene,
  NotificationScope,
  NotificationStatus,
} from '@xiaoshop/shared'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { FindOptionsWhere, Repository } from 'typeorm'
import { NotificationMessage } from '@/notification/message/entity'
import {
  GetNotificationMessageListRequest,
  GetNotificationMessagePagesRequest,
} from '@/notification/message/dto'
import {
  FailedException,
  NotFoundException,
} from '~/common/exceptions'

@Injectable()
export class NotificationMessageService {
  constructor(
    @InjectRepository(NotificationMessage)
    private readonly repository: Repository<NotificationMessage>,

    @Inject(EventEmitter2)
    private readonly event: EventEmitter2,
  ) {}

  /**
   * 获取消息分页列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<INotificationMessageListItem>>
   * @throws {FailedException} 获取消息模板列表失败
   */
  async findPages(
    query: GetNotificationMessagePagesRequest,
  ): Promise<IApiPaginationData<INotificationMessageListItem>> {
    try {
      const where: FindOptionsWhere<NotificationMessage> = {}

      if (query.memberId)
        where.memberId = query.memberId

      if (query.scope)
        where.scope = query.scope

      if (query.status)
        where.status = query.status

      if (query.scene)
        where.scene = query.scene

      const {
        page = 1,
        pagesize = 10,
      } = query

      const [result, total] = await this.repository.findAndCount({
        select: ['id', 'status', 'scene', 'title', 'content', 'extras', 'sentTime'],
        where,
        skip: (page - 1) * pagesize,
        take: pagesize,
        order: {
          sentTime: 'DESC',
        },
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取消息分页列表', e.message)
    }
  }

  /**
   * 获取消息列表
   *
   * @param query 查询条件
   * @returns Promise<INotificationMessageListItem[]>
   * @throws {FailedException} 获取消息列表失败
   */
  async findList(
    query: GetNotificationMessageListRequest,
  ): Promise<INotificationMessageListItem[]> {
    try {
      const where: FindOptionsWhere<NotificationMessage> = {}

      if (query.scope)
        where.scope = query.scope

      if (query.status)
        where.status = query.status

      if (query.scene)
        where.scene = query.scene

      return await this.repository.find({
        select: ['id', 'status', 'scene', 'title', 'content', 'extras', 'sentTime'],
        where,
        take: query.limit || 10,
        order: {
          sentTime: 'DESC',
        },
      })
    }
    catch (e) {
      throw new FailedException('获取消息列表', e.message)
    }
  }

  /**
   * 根据 ID 获取通知消息
   *
   * @param id 消息 ID
   * @returns Promise<INotificationMessage>
   * @throws {NotFoundException} 通知消息不存在
   * @throws {FailedException} 获取通知消息失败
   */
  async findById(id: number): Promise<INotificationMessage> {
    try {
      const message = await this.repository.findOneBy({ id })

      if (!message)
        throw new NotFoundException('通知消息')

      return message
    }
    catch (e) {
      throw new FailedException('获取通知消息', e.message, e.status)
    }
  }

  /**
   * 创建通知消息 (系统消息)
   *
   * @param data 消息内容
   * @throws {FailedException} 创建通知消息失败
   */
  async create(data: Partial<INotificationMessage>) {
    try {
      const message = new NotificationMessage()

      message.memberId = data.memberId || 0
      message.scope = data.scope || NotificationScope.BUYER
      message.status = NotificationStatus.UNREAD
      message.scene = data.scene || NotificationScene.ORDER
      message.title = data.title || ''
      message.content = data.content || ''
      message.extras = data.extras || {}

      await this.repository.save(message)
    }
    catch (e) {
      throw new FailedException('创建通知消息', e.message)
    }
  }

  /**
   * 删除通知消息
   *
   * @param id 消息 ID
   * @param memberId 会员 ID
   * @throws {NotFoundException} 通知消息不存在
   * @throws {FailedException} 删除通知消息失败
   */
  async delete(id: number, memberId: number) {
    try {
      const message = await this.repository.findOneBy({
        id,
        memberId,
      })

      if (!message)
        throw new NotFoundException('通知消息')

      await this.repository.delete({ id })
    }
    catch (e) {
      throw new FailedException('删除通知消息', e.message, e.status)
    }
  }
}
