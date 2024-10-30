import { MemberPointsRuleKey } from '@xiaoshop/shared'

/**
 * 会员积分规则标识 - 字典
 *
 * @see {@link MemberPointsRuleKey}
 */
export const MEMBER_POINTS_RULE_KEYS = [
  { value: '注册奖励', desc: '注册会员时赠送的积分', icon: 'mingcute:user-add-2', key: MemberPointsRuleKey.REGISTER },
  { value: '消费奖励', desc: '会员消费时, 赠送消费金额 100% 的积分', icon: 'mingcute:shopping-bag-3', key: MemberPointsRuleKey.ORDER },
  { value: '生日有礼', desc: '会员生日时赠送的积分', icon: 'mingcute:birthday-2', key: MemberPointsRuleKey.BIRTHDAY },
  { value: '签到奖励', desc: '会员签到时赠送的积分', icon: 'mingcute:checkbox', key: MemberPointsRuleKey.CHECK_IN },
  { value: '积分抵现', desc: '会员消费时, 积分抵扣一定金额', icon: 'mingcute:cash', key: MemberPointsRuleKey.DEDUCT },
  { value: '邀请奖励', desc: '邀请会员注册, 赠送一定的积分', icon: 'mingcute:share-forward', key: MemberPointsRuleKey.INVITE },
]
