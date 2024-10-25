import type { IApiPaginationData, INotificationLogInfo, INotificationLogList } from '@xiaoshop/shared'
import type { INotificationLogRepository, INotificationLogWhere } from '@/notification/log/model/interface'

import { Like } from 'typeorm'
import { Injectable } from '@nestjs/common'

import { toBetweenDate } from '~/utils/typeorm'
import { DEFAULT_PAGESIZE } from '~/common/constants'
import { NotificationLogRepo } from '@/notification/log/model/provider'
import { FailedException, NotFoundException } from '~/common/exceptions'
import { GetNotificationLogPagesRequest } from '@/notification/log/dto/request'
import { toNotificationLogInfo, toNotificationLogList } from '@/notification/log/model/mapper'

@Injectable()
export class NotificationLogQueryService {
  constructor(
    @NotificationLogRepo()
    private readonly repo: INotificationLogRepository,
  ) {}

  /**
   * 获取通知消息发送日志分页列表
   *
   * @param query 查询条件
   * @returns 通知消息发送日志分页列表
   * @throws {FailedException} 获取通知消息发送日志分页列表失败
   */
  async findPages(
    query: GetNotificationLogPagesRequest,
  ): Promise<IApiPaginationData<INotificationLogList>> {
    try {
      const where: INotificationLogWhere = {}

      if (query.type)
        where.type = query.type

      if (query.scene)
        where.scene = query.scene

      if (query.channel)
        where.channel = query.channel

      if (query.status)
        where.status = query.status

      if (query.subscriber)
        where.subscriber = Like(`%${query.subscriber}%`)

      if (query.sentTime) {
        where.sentTime = toBetweenDate(query.sentTime)
      }

      const {
        page = 1,
        pagesize = DEFAULT_PAGESIZE,
      } = query

      return await this.repo.findAndCount(
        where,
        page,
        pagesize,
      ).then(
        ({ list, total, page, pagesize }) => ({
          list: toNotificationLogList(list),
          total,
          page,
          pagesize,
        }),
      )
    }
    catch (e) {
      throw new FailedException('获取通知消息发送日志分页列表', e.message)
    }
  }

  /**
   * 获取通知消息发送日志详情
   *
   * @param id 通知消息发送日志 ID
   * @returns 获取通知消息发送日志详情失败
   */
  async findById(id: number): Promise<INotificationLogInfo> {
    try {
      const query = await this.repo.findById(id)

      if (!query)
        throw new NotFoundException('通知消息发送日志')

      return toNotificationLogInfo(query)
    }
    catch (e) {
      throw new FailedException('获取通知消息发送日志详情', e.message, e.status)
    }
  }
}
