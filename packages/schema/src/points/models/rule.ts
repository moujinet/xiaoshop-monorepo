import type { IEnabled } from '@/common/types'
import type { IPointsRuleKey } from '@/points/types'

/**
 * 会员积分规则
 *
 * @see {@link IPointsRuleOptions}
 */
export interface IPointsRule {
  /**
   * 积分规则标识
   *
   * @see {@link IPointsRuleKey}
   */
  key: IPointsRuleKey
  /**
   * 积分规则启用状态
   *
   * @see {@link IEnabled}
   */
  enable: IEnabled
  /**
   * 积分规则图标
   */
  icon: string
  /**
   * 积分规则名称
   */
  name: string
  /**
   * 积分规则描述
   */
  desc: string
  /**
   * 积分规则选项
   *
   * @see {@link IMemberPointsRuleOptions}
   */
  options: IPointsRuleOptions
}

/**
 * 签到奖励选项
 */
export interface IPointsRuleOptions {
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

/**
 * 会员积分规则列表
 */
export type IPointsRuleListItem = Pick<
  IPointsRule,
  | 'key'
  | 'enable'
  | 'icon'
  | 'name'
  | 'desc'
>
