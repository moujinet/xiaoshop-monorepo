import type { INotificationLogRepository } from '@/notification/log/model/interface'

import { Injectable } from '@nestjs/common'

import { FailedException } from '~/common/exceptions'
import { NotificationLogRepo } from '@/notification/log/model/provider'
import { CreateNotificationLogPayload } from '@/notification/log/dto/payload'

@Injectable()
export class NotificationLogStoreService {
  constructor(
    @NotificationLogRepo()
    private readonly repo: INotificationLogRepository,
  ) {}

  /**
   * 创建通知消息发送日志
   *
   * @param data 创建数据
   * @throws {FailedException} 创建通知消息发送日志失败
   * @throws {ExistsException} 通知消息发送日志已存在
   */
  async create(data: CreateNotificationLogPayload) {
    try {
      await this.repo.create(data)
    }
    catch (e) {
      throw new FailedException('创建通知消息发送日志', e.message, e.status)
    }
  }
}
