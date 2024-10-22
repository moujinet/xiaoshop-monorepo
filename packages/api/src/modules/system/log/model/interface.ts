import type { FindManyOptions } from 'typeorm'
import type { IApiPaginationData } from '@xiaoshop/shared'

import { SystemLogEntity } from './entity'

export type ISystemLogSelect = FindManyOptions<SystemLogEntity>['select']
export type ISystemLogWhere = FindManyOptions<SystemLogEntity>['where']

/**
 * 系统日志存储接口
 */
export interface ISystemLogRepository<T = SystemLogEntity> {
  /**
   * 查询日志分页列表
   *
   * @param where 查询条件
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 日志分页列表
   */
  findAndCount: (where: ISystemLogWhere, page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 查询指定天前的系统日志列表
   *
   * @param days 天数
   * @returns 系统日志列表
   */
  findBeforeDays: (days: number) => Promise<T[]>

  /**
   * 写入系统日志
   *
   * @param data 日志数据
   */
  create: (data: Partial<SystemLogEntity>) => Promise<void>

  /**
   * 删除指定 ID 的系统日志
   *
   * @param ids 日志 ID 列表
   */
  destroyByIds: (ids: number[]) => Promise<void>
}
