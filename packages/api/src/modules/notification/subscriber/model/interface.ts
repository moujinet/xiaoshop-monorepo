import type { FindManyOptions, FindOptionsWhere, ObjectId } from 'typeorm'

import { NotificationSubscriberEntity } from './entity'

export type INotificationSubscriberSelect = FindManyOptions<NotificationSubscriberEntity>['select']
export type INotificationSubscriberWhere = FindManyOptions<NotificationSubscriberEntity>['where']
export type INotificationSubscriberDeleteWhere = string | string[] | number | number[] | Date | Date[] | ObjectId | ObjectId[] | FindOptionsWhere<NotificationSubscriberEntity>

export interface INotificationSubscriberRepository<T = NotificationSubscriberEntity> {
  /**
   * 查询通知消息订阅者列表
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 通知消息订阅者列表
   */
  find: (where: INotificationSubscriberWhere, select?: INotificationSubscriberSelect) => Promise<T[]>

  /**
   * 判断通知消息订阅者是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: INotificationSubscriberWhere) => Promise<boolean>

  /**
   * 创建通知消息订阅者
   *
   * @param data 通知消息订阅者
   * @returns 保存后的通知消息订阅者
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 删除通知消息订阅者
   *
   * @param where 查询条件
   */
  destroy: (where: INotificationSubscriberDeleteWhere) => Promise<void>
}
