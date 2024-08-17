// -----------------------------------------------
// 会员积分 - 变更类型
// -----------------------------------------------

/**
 * 枚举: 会员积分变更类型
 *
 * - `ADD`: 增加
 * - `SET`: 变更
 * - `DEDUCT`: 抵现
 */
export enum PointsChangeType {
  ADD = 'add',
  SET = 'set',
  DEDUCT = 'deduct',
}

/**
 * 字典: 会员积分变更类型
 *
 * @see {@link IPointsChangeType}
 */
export const POINTS_CHANGE_TYPES = [
  { label: '增加', value: PointsChangeType.ADD },
  { label: '变更', value: PointsChangeType.SET },
  { label: '抵现', value: PointsChangeType.DEDUCT },
]

// -----------------------------------------------
// 会员积分 - 规则标识
// -----------------------------------------------

export enum PointsRuleKey {
  REGISTER = 'register',
  ORDER = 'order',
  BIRTHDAY = 'birthday',
  SIGN_IN = 'signIn',
  DEDUCT = 'deduct',
}
