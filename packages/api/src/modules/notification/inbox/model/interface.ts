import type { DeleteResult, FindManyOptions } from 'typeorm'
import type { IApiPaginationData, NotificationType } from '@xiaoshop/shared'

import { NotificationInboxEntity } from './entity'

export type INotificationInboxSelect = FindManyOptions<NotificationInboxEntity>['select']
export type INotificationInboxWhere = FindManyOptions<NotificationInboxEntity>['where']

export interface INotificationInboxRepository<T = NotificationInboxEntity> {
  /**
   * 查询消息分页列表
   *
   * @param where 查询条件
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 消息分页列表
   */
  findAndCount: (where: INotificationInboxWhere, page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询消息列表
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 消息列表
   */
  find: (where: INotificationInboxWhere, select?: INotificationInboxSelect) => Promise<T[]>

  /**
   * 根据 ID 查询消息
   *
   * @param id 消息 ID
   * @param receiverId 接收者 ID
   * @param type 消息类型
   * @returns 消息
   */
  findById: (id: number, receiverId: number, type: NotificationType, select?: INotificationInboxSelect) => Promise<T>

  /**
   * 判断消息是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: INotificationInboxWhere) => Promise<boolean>

  /**
   * 创建消息
   *
   * @param data 消息
   * @returns 保存后的消息
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 设为已读
   *
   * @param ids 消息 ID 列表
   * @param receiverId 接收者 ID
   * @param type 消息类型
   */
  markAsRead: (ids: number[], receiverId: number, type: NotificationType) => Promise<void>

  /**
   * 删除消息
   *
   * @param ids 消息 ID 列表
   * @param receiverId 接收者 ID
   * @param type 消息类型
   */
  destroy: (ids: number[], receiverId: number, type: NotificationType) => Promise<void>

  /**
   * 清理指定天数前的过期消息
   *
   * @param daysAgo 天数
   */
  cleanup: (daysAgo: number) => Promise<DeleteResult>
}
