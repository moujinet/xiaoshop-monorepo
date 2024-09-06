import {
  type IApiPaginationData,
  type INotificationLog,
  type INotificationLogListItem,
  NotificationChannel,
  NotificationScene,
  NotificationScope,
  NotificationSendStatus,
} from '@xiaoshop/shared'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'
import { NotificationLog } from '@/notification/log/entity'
import { GetNotificationLogPagesRequest } from '@/notification/log/dto'
import { FailedException, NotFoundException } from '~/common/exceptions'

@Injectable()
export class NotificationLogService {
  constructor(
    @InjectRepository(NotificationLog)
    private readonly repository: Repository<NotificationLog>,
  ) {}

  /**
   * 获取消息发送日志列表
   *
   * @param query 查询条件
   * @returns Promise<IApiPaginationData<INotificationLogListItem>>
   * @throws {FailedException} 获取消息发送日志列表失败
   */
  async findPages(
    query: GetNotificationLogPagesRequest,
  ): Promise<IApiPaginationData<INotificationLogListItem>> {
    try {
      const where: FindOptionsWhere<NotificationLog> = {}

      if (query.scope)
        where.scope = query.scope

      if (query.status)
        where.status = query.status

      if (query.scene)
        where.scene = query.scene

      if (query.templateId)
        where.templateId = query.templateId

      const {
        page = 1,
        pagesize = 10,
      } = query

      const [result, total] = await this.repository.findAndCount({
        select: {
          id: true,
          scope: true,
          status: true,
          scene: true,
          channel: true,
          memberId: true,
          template: { id: true, key: true, enable: true, scene: true, name: true, desc: true },
          sendTo: true,
          title: true,
          createdTime: true,
        },
        where,
        relations: ['template'],
        order: {
          createdTime: 'DESC',
        },
        skip: (page - 1) * pagesize,
        take: pagesize,
      })

      return { result, total, page, pagesize }
    }
    catch (e) {
      throw new FailedException('获取消息发送日志列表', e.message)
    }
  }

  /**
   * 根据 ID 获取消息发送日志
   *
   * @param id 日志 ID
   * @returns Promise<INotificationLog>
   * @throws {NotFoundException} 消息发送日志不存在
   * @throws {FailedException} 获取消息发送日志失败
   */
  async findById(id: number): Promise<INotificationLog> {
    try {
      const log = await this.repository.findOne({
        select: {
          template: { id: true, key: true, enable: true, scene: true, name: true, desc: true },
        },
        where: { id },
        relations: ['template'],
      })

      if (!log)
        throw new NotFoundException('消息发送日志')

      return log
    }
    catch (e) {
      throw new FailedException('获取消息发送日志', e.message, e.status)
    }
  }

  /**
   * 写入消息发送日志
   *
   * @param data 日志内容
   * @throws {FailedException} 写入消息发送日志失败
   */
  async write(data: Partial<INotificationLog>) {
    try {
      const log = new NotificationLog()

      log.scope = data.scope || NotificationScope.BUYER
      log.status = data.status || NotificationSendStatus.FAILED
      log.scene = data.scene || NotificationScene.ORDER
      log.channel = data.channel || NotificationChannel.SYSTEM
      log.memberId = data.memberId || 0
      log.templateId = data.templateId || 0
      log.sendTo = data.sendTo || ''
      log.title = data.title || ''
      log.content = data.content || ''
      log.result = data.result || ''

      await this.repository.save(log)
    }
    catch (e) {
      throw new FailedException('写入消息发送日志', e.message)
    }
  }
}
