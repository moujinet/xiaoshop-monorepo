import type { IEnabled } from '@/common'
import type { IMemberPointsRuleKey } from '@/member/types'

/**
 * 会员积分规则
 */
export interface IMemberPointsRule {
  /**
   * 积分规则编号
   */
  id: number
  /**
   * 积分规则标识
   *
   * @see {@link IMemberPointsRuleKey}
   */
  key: IMemberPointsRuleKey
  /**
   * 积分规则状态
   *
   * @see {@link IEnabled}
   */
  status: IEnabled
  /**
   * 积分规则名称
   */
  name: string
  /**
   * 积分规则描述
   */
  desc: string
  /**
   * 积分规则图标
   */
  icon: string
  /**
   * 积分规则选项
   *
   * @see {@link IMemberPointsRuleOptions}
   */
  options: IMemberPointsRuleOptions
}

/**
 * 签到奖励选项
 */
export interface IMemberPointsRuleOptions {
  /**
   * 积分
   */
  points: number
  /**
   * 最大积分
   */
  limit: number
  /**
   * 积分倍率
   */
  ratio: number
  /**
   * 连续 7 天倍率
   */
  perWeekRatio: number
  /**
   * 连续 30 天倍率
   */
  perMonthRatio: number
}
