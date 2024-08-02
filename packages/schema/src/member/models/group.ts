import type { IMemberGroupCondKey, IMemberGroupCondOperator } from '@/member/types'

/**
 * 会员群体信息
 */
export interface IMemberGroup {
  /**
   * 会员群体编号
   */
  id: number
  /**
   * 会员群体名称
   */
  name: string
  /**
   * 会员群体描述
   */
  desc: string
  /**
   * 会员群体条件
   *
   * @see {@link IMemberGroupCondition}
   */
  conditions: IMemberGroupCondition[]
  /**
   * 会员群体人数
   */
  total: number
  /**
   * 创建时间
   */
  createdTime: string
  /**
   * 更新时间
   */
  updatedTime: string
  /**
   * 刷新时间
   */
  refreshTime: string
}

/**
 * 会员群体 - 筛选条件
 */
export interface IMemberGroupCondition {
  /**
   * 会员群体条件标识
   *
   * @see {@link IMemberGroupCondKey}
   */
  key: IMemberGroupCondKey
  /**
   * 会员群体条件运算符
   *
   * @see {@link IMemberGroupCondOperator}
   */
  operator: IMemberGroupCondOperator
  /**
   * 会员群体条件名
   */
  name: string
  /**
   * 会员群体条件值
   */
  value: string[]
}

/**
 * 会员群体字典
 */
export type IMemberGroupDict = Pick<IMemberGroup, 'id' | 'name'>

/**
 * 会员群体列表
 */
export type IMemberGroupListItem = Pick<
  IMemberGroup,
  | 'id'
  | 'name'
  | 'desc'
  | 'total'
  | 'refreshTime'
>

/**
 * 会员群体条件列表
 */
export type IMemberGroupConditionListItem = Pick<
  IMemberGroup,
  | 'id'
  | 'name'
  | 'total'
  | 'conditions'
  | 'refreshTime'
>
