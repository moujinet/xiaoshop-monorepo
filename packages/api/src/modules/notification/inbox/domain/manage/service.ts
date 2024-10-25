import type { INotificationInboxRepository } from '@/notification/inbox/model/interface'

import { Injectable } from '@nestjs/common'
import {
  type IApiPaginationData,
  type INotificationInfo,
  type INotificationList,
  NotificationStatus,
} from '@xiaoshop/shared'

import { DEFAULT_PAGESIZE } from '~/common/constants'
import { FailedException, NotFoundException } from '~/common/exceptions'
import { NotificationInboxRepo } from '@/notification/inbox/model/provider'
import { toNotificationInfo, toNotificationList } from '@/notification/inbox/model/mapper'
import { GetNotificationInboxPagesRequest, GetNotificationWithOwnerRequest } from '@/notification/inbox/dto/request'

@Injectable()
export class NotificationInboxManageService {
  constructor(
    @NotificationInboxRepo()
    private readonly repo: INotificationInboxRepository,
  ) {}

  /**
   * 获取通知消息分页列表
   *
   * @param owner 接收人
   * @param pager 分页条件
   * @returns 通知消息分页列表
   * @throws {FailedException} 获取通知消息分页列表失败
   */
  async findPages(
    owner: GetNotificationWithOwnerRequest,
    pager: GetNotificationInboxPagesRequest,
  ): Promise<IApiPaginationData<INotificationList>> {
    try {
      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = pager

      return await this.repo.findAndCount(
        { ...owner },
        page,
        pagesize,
      ).then(
        ({ list, total, page, pagesize }) => ({
          list: toNotificationList(list),
          total,
          page,
          pagesize,
        }),
      )
    }
    catch (e) {
      throw new FailedException('获取通知消息分页列表', e.message)
    }
  }

  /**
   * 读取通知消息详情
   *
   * @param id 通知消息 ID
   * @param owner 消息接收者
   * @returns 通知消息详情
   */
  async read(id: number, owner: GetNotificationWithOwnerRequest): Promise<INotificationInfo> {
    try {
      const notification = await this.repo.findById(id, owner.receiverId, owner.type)

      if (!notification)
        throw new NotFoundException('通知消息')

      if (notification.status === NotificationStatus.UNREAD)
        await this.markAsRead([id], owner)

      return toNotificationInfo(notification)
    }
    catch (e) {
      throw new FailedException('读取通知消息详情', e.message, e.status)
    }
  }

  /**
   * 标记为已读
   *
   * @param ids 通知消息 ID 列表
   * @param owner 消息接收者
   * @throws {FailedException} 标记为已读失败
   */
  async markAsRead(ids: number[], owner: GetNotificationWithOwnerRequest) {
    try {
      await this.repo.markAsRead(ids, owner.receiverId, owner.type)
    }
    catch (e) {
      throw new FailedException('标记为已读', e.message)
    }
  }

  /**
   * 删除通知消息
   *
   * @param ids 消息 ID 列表
   * @param owner 消息接收者
   */
  async delete(ids: number[], owner: GetNotificationWithOwnerRequest) {
    try {
      await this.repo.destroy(ids, owner.receiverId, owner.type)
    }
    catch (e) {
      throw new FailedException('删除通知消息', e.message)
    }
  }
}
