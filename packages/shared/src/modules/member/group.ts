import type {
  IMemberGroupCondKey,
  IMemberGroupCondOperator,
} from './types'

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
   * - `source`: 注册来源 [web]
   * - `status`: 会员状态 [normal, blocked]
   * - `card`: 会员卡 [CardId, cardPlanId]
   * - `tag`: 会员标签 [tagId]
   * - `gender`: 会员性别 [male]
   * - `birthday`: 会员生日 [from, to]
   * - `created_time`: 注册时间 [from, to]
   * - `points`: 当前积分 [min, max]
   * - `exp`: 当前成长值 [min, max]
   * - `sign_in`: 累计签到数 [min, max]
   * - `order_count`: 累计订单数 [min, max]
   * - `order_amount`: 累计订单金额 [min, max]
   *
   * @see {@link IMemberGroupCondKey}
   */
  key: IMemberGroupCondKey
  /**
   * 筛选条件运算符
   *
   * - `in`: 包含
   * - `not_in`: 不包含
   *
   * @see {@link IMemberGroupCondOperator}
   */
  operator: IMemberGroupCondOperator
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
