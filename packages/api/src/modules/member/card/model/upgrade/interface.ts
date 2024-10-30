import type { FindManyOptions } from 'typeorm'

import { MemberCardUpgradeEntity } from './entity'

export type IMemberCardUpgradeSelect = FindManyOptions<MemberCardUpgradeEntity>['select']
export type IMemberCardUpgradeWhere = FindManyOptions<MemberCardUpgradeEntity>['where']

export interface IMemberCardUpgradeRepository<T = MemberCardUpgradeEntity> {
  /**
   * 查询会员升级记录列表
   *
   * @param where 查询条件
   * @param select 查询字段
   * @returns 会员升级记录列表
   */
  find: (where: IMemberCardUpgradeWhere, select?: IMemberCardUpgradeSelect) => Promise<T[]>

  /**
   * 根据 ID 查询会员升级记录
   *
   * @param id 会员升级记录 ID
   * @returns 会员升级记录
   */
  findById: (id: number, select?: IMemberCardUpgradeSelect) => Promise<T>

  /**
   * 判断会员升级记录是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IMemberCardUpgradeWhere) => Promise<boolean>

  /**
   * 创建会员升级记录
   *
   * @param data 会员升级记录
   * @returns 保存后的会员升级记录
   */
  create: (data: Partial<T>) => Promise<T>
}
