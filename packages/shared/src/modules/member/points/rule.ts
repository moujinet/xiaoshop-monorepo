import type { IMemberPointsRuleKey } from '@/member/types'
import type { IYesOrNo } from '~/common'

/**
 * 会员积分规则设置
 */
export interface IMemberPointsRule {
  /**
   * 积分规则标识
   *
   * - `register`: 注册奖励
   * - `order`: 消费奖励
   * - `birthday`: 生日有礼
   * - `signIn`: 签到奖励
   * - `deduct`: 积分抵现
   *
   * @see {@link IMemberPointsRuleKey}
   */
  key: IMemberPointsRuleKey
  /**
   * 是否启用
   *
   * - `Y`: 启用
   * - `N`: 禁用
   *
   * @see {@link IYesOrNo}
   */
  enable: IYesOrNo
  /**
   * 积分规则选项
   *
   * - `points`: 积分
   * - `limit`: 最大积分
   * - `perOrderRatio`: 消费积分奖励倍率
   * - `perWeekRatio`: 连续 7 天倍率
   * - `perMonthRatio`: 连续 30 天倍率
   * - `ratio`: 积分抵扣比例
   *
   * @see {@link IMemberPointsRuleOptions}
   */
  rule: IMemberPointsRuleOptions
}

/**
 * 积分规则选项
 */
export interface IMemberPointsRuleOptions {
  /**
   * 积分
   */
  points?: number
  /**
   * 最大积分
   */
  limit?: number
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
