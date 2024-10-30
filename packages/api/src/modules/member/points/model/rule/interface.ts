import type { FindManyOptions } from 'typeorm'
import type { IMemberPointsRuleKey, YesOrNo } from '@xiaoshop/shared'

import { MemberPointsRuleEntity } from './entity'

export type IMemberPointsRuleSelect = FindManyOptions<MemberPointsRuleEntity>['select']
export type IMemberPointsRuleWhere = FindManyOptions<MemberPointsRuleEntity>['where']

export interface IMemberPointsRuleRepository<T = MemberPointsRuleEntity> {
  /**
   * 查询会员积分规则列表
   *
   * @param where 查询条件
   * @returns 会员积分规则列表
   */
  find: (where?: IMemberPointsRuleWhere) => Promise<T[]>

  /**
   * 根据 Key 查询会员积分规则
   *
   * @param key 会员积分规则标识
   * @param select 查询字段
   * @returns 会员积分规则
   */
  findByKey: (key: IMemberPointsRuleKey, select?: IMemberPointsRuleSelect) => Promise<T>

  /**
   * 判断会员积分规则是否存在
   *
   * @param where 查询条件
   * @returns 是否存在
   */
  exists: (where: IMemberPointsRuleWhere) => Promise<boolean>

  /**
   * 更新会员积分规则
   *
   * @param rule 会员积分规则
   * @param data 更新信息
   * @returns 保存后的会员积分规则
   */
  update: (rule: T, data: Partial<T>) => Promise<T>

  /**
   * 更新会员积分规则启用状态
   *
   * @param key 会员积分规则标识
   * @param isEnabled 是否启用
   */
  updateStatus: (key: IMemberPointsRuleKey, isEnabled: YesOrNo) => Promise<void>
}
