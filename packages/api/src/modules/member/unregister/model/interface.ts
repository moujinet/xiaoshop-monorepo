import type { IApiPaginationData } from '@xiaoshop/shared'
import type { DeepPartial, FindManyOptions } from 'typeorm'

import { MemberUnregisterEntity } from './entity'

export type IMemberUnregisterSelect = FindManyOptions<MemberUnregisterEntity>['select']
export type IMemberUnregisterWhere = FindManyOptions<MemberUnregisterEntity>['where']

export interface IMemberUnregisterRepository<T = MemberUnregisterEntity> {
  /**
   * 查询会员注销申请分页列表
   *
   * @param where 查询条件
   * @param page 当前页码
   * @param pagesize 分页大小
   * @returns 会员注销申请分页列表
   */
  findAndCount: (where: IMemberUnregisterWhere, page: number, pagesize: number) => Promise<IApiPaginationData<T>>

  /**
   * 根据 ID 查询会员注销申请
   *
   * @param id 会员注销申请 ID
   * @param select 查询字段
   * @returns 会员注销申请
   */
  findById: (id: number, select?: IMemberUnregisterSelect) => Promise<T>

  /**
   * 判断会员注销申请是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IMemberUnregisterWhere) => Promise<boolean>

  /**
   * 创建会员注销申请
   *
   * @param data 会员注销申请
   * @returns 保存后的会员注销申请
   */
  create: (data: Partial<T>) => Promise<T>

  /**
   * 更新会员注销申请
   *
   * @param entity 会员注销申请
   * @param data 更新信息
   * @returns 保存后的会员注销申请
   */
  update: (entity: T, data: Partial<T>) => Promise<T>

  /**
   * 删除会员注销申请
   *
   * @param id 会员注销申请 ID
   */
  destroy: (id: number) => Promise<void>

  /**
   * 创建会员注销申请实例
   *
   * @param entity 实例数据
   * @returns 会员注销申请实例
   */
  newEntity: (entity: DeepPartial<T>) => T
}
