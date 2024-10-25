import type { IApiPaginationData } from '@xiaoshop/shared'
import type { DeleteResult, FindManyOptions } from 'typeorm'

import { NotificationLogEntity } from './entity'

export type INotificationLogSelect = FindManyOptions<NotificationLogEntity>['select']
export type INotificationLogWhere = FindManyOptions<NotificationLogEntity>['where']

export interface INotificationLogRepository<T = NotificationLogEntity> {
  /**
   * 查询消息发送日志分页列表
   *
   * @param where 查询条件
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 消息发送日志分页列表
   */
  findAndCount: (where: INotificationLogWhere, page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 根据 ID 查询消息发送日志
   *
   * @param id 消息发送日志 ID
   * @returns 消息发送日志
   */
  findById: (id: number, select?: INotificationLogSelect) => Promise<T>

  /**
   * 判断消息发送日志是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: INotificationLogWhere) => Promise<boolean>

  /**
   * 创建消息发送日志
   *
   * @param data 消息发送日志
   * @returns 保存后的消息发送日志
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 清理指定天数前的过期消息
   *
   * @param daysAgo 天数
   */
  cleanup: (daysAgo: number) => Promise<DeleteResult>
}
