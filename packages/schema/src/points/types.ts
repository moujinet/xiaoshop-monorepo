import type {
  PointsChangeType,
  PointsRuleKey,
} from '@/points/constants'

/**
 * 会员积分规则标识
 *
 * - `register`: 注册
 * - `order`: 订单
 * - `birthday`: 生日
 * - `signIn`: 签到
 * - `deduct`: 抵现
 *
 * @see {@link PointsRuleKey}
 */
export type IPointsRuleKey = `${PointsRuleKey}`

/**
 * 会员积分变更类型
 *
 * - `add`: 增加
 * - `set`: 变更
 * - `deduct`: 抵现
 *
 * @see {@link PointsChangeType}
 */
export type IPointsChangeType = `${PointsChangeType}`
