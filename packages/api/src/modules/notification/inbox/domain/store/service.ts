import type { INotificationInboxRepository } from '@/notification/inbox/model/interface'
import type { INotificationMessageSendJob } from '@/notification/message/domain/subscribe/interface'

import { Injectable } from '@nestjs/common'

import { FailedException } from '~/common/exceptions'
import { NotificationInboxRepo } from '@/notification/inbox/model/provider'

@Injectable()
export class NotificationInBoxStoreService {
  constructor(
    @NotificationInboxRepo()
    private readonly repo: INotificationInboxRepository,
  ) {}

  /**
   * 创建通知消息
   *
   * @param data 创建数据
   * @throws {FailedException} 创建通知消息失败
   */
  async create(data: INotificationMessageSendJob) {
    try {
      await this.repo.create(data)
    }
    catch (e) {
      throw new FailedException('创建通知消息', e.message)
    }
  }
}
