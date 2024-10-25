import type { YesOrNo } from '~/common'

import type { MemberPointsRuleKey } from '../constants'

/**
 * 会员积分规则标识
 *
 * @see {@link MemberPointsRuleKey}
 */
export type IMemberPointsRuleKey = `${MemberPointsRuleKey}`

/**
 * 会员积分规则
 */
export interface IMemberPointsRule {
  /**
   * 是否启用
   */
  isEnabled: YesOrNo
  /**
   * 积分规则标识
   */
  key: IMemberPointsRuleKey
  /**
   * 积分规则选项
   *
   * - `points`: 积分
   * - `maxPoints`: 最大积分
   * - `perOrderRatio`: 消费积分奖励倍率
   * - `perWeekRatio`: 连续 7 天倍率
   * - `perMonthRatio`: 连续 30 天倍率
   * - `ratio`: 积分抵扣比例
   */
  rule: IMemberPointsRuleOptions
}

/**
 * 会员积分规则选项
 */
export interface IMemberPointsRuleOptions {
  /**
   * 积分
   */
  points?: number
  /**
   * 最大积分
   */
  maxPoints?: number
  /**
   * 消费积分奖励倍率
   */
  perOrderRatio?: number
  /**
   * 连续 7 天倍率
   */
  perWeekRatio?: number
  /**
   * 连续 30 天倍率
   */
  perMonthRatio?: number
  /**
   * 积分抵扣比例
   */
  ratio?: number
}
