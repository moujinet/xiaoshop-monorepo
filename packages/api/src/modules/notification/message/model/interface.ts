import type { FindManyOptions } from 'typeorm'
import type { IApiPaginationData, YesOrNo } from '@xiaoshop/shared'

import { NotificationMessageEntity } from './entity'

export type INotificationMessageSelect = FindManyOptions<NotificationMessageEntity>['select']
export type INotificationMessageWhere = FindManyOptions<NotificationMessageEntity>['where']

export interface INotificationMessageRepository<T = NotificationMessageEntity> {
  /**
   * 查询通知消息分页列表
   *
   * @param where 查询条件
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 通知消息分页列表
   */
  findAndCount: (where: INotificationMessageWhere, page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询通知消息列表
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 通知消息列表
   */
  find: (where: INotificationMessageWhere, select?: INotificationMessageSelect) => Promise<T[]>

  /**
   * 根据 ID 查询通知消息
   *
   * @param id 通知消息 ID
   * @returns 通知消息
   */
  findById: (id: number, select?: INotificationMessageSelect) => Promise<T>

  /**
   * 判断通知消息是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: INotificationMessageWhere) => Promise<boolean>

  /**
   * 创建通知消息
   *
   * @param data 通知消息
   * @returns 保存后的通知消息
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新通知消息
   *
   * @param NotificationMessage 通知消息
   * @param data 更新信息
   * @returns 保存后的通知消息
   */
  update: (NotificationMessage: T, data: Partial<T>) => Promise<T>

  /**
   * 更新通知消息启用状态
   *
   * @param id 通知消息 ID
   * @param isEnabled 是否启用
   * @returns 保存后的通知消息
   */
  updateStatus: (id: number, isEnabled: YesOrNo) => Promise<void>

  /**
   * 删除通知消息
   *
   * @param id 通知消息 ID
   */
  destroy: (id: number) => Promise<void>
}
