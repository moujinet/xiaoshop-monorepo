import type {
  MemberGroupCondKey,
  MemberGroupCondOperator,
} from './constants'

/**
 * 会员群体信息
 */
export interface IMemberGroup {
  /**
   * 会员群体 ID
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
   * 会员群体筛选条件
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
 * 会员群体筛选条件
 */
export interface IMemberGroupCondition {
  /**
   * 筛选条件标识
   *
   * @see {@link MemberGroupCondKey}
   */
  key: MemberGroupCondKey
  /**
   * 筛选条件运算符
   *
   * @see {@link MemberGroupCondOperator}
   */
  operator: MemberGroupCondOperator
  /**
   * 筛选条件名
   */
  name: string
  /**
   * 筛选条件值
   */
  value: Array<string | number>
}

/**
 * 会员群体字典
 *
 * @see {@link IMemberGroup}
 */
export type IMemberGroupDict = Pick<
  IMemberGroup,
  | 'id'
  | 'name'
>

/**
 * 会员群体列表
 *
 * @see {@link IMemberGroup}
 */
export type IMemberGroupListItem = Pick<
  IMemberGroup,
  | 'id'
  | 'name'
  | `desc`
  | `total`
  | `updatedTime`
>

/**
 * 会员群体条件列表
 *
 * @see {@link IMemberGroup}
 */
export type IMemberGroupConditionListItem = Pick<
  IMemberGroup,
  | 'id'
  | 'name'
  | `total`
  | `conditions`
>
