import {
  type IDict,
  MemberCardPlanType,
  MemberCardType,
  MemberCardUpgradeMethod,
} from '@xiaoshop/shared'

/**
 * 会员卡类型 - 字典
 *
 * @see {@link MemberCardType}
 */
export const MEMBER_CARD_TYPES: IDict[] = [
  { value: '会员等级', key: MemberCardType.LEVEL },
  { value: '超级会员卡', key: MemberCardType.CUSTOM },
]

/**
 * 会员卡套餐类型 - 字典
 *
 * @see {@link MemberCardPlanType}
 */
export const MEMBER_CARD_PLAN_TYPES: IDict[] = [
  { value: '次', key: MemberCardPlanType.TIMES },
  { value: '天', key: MemberCardPlanType.DAY },
  { value: '月', key: MemberCardPlanType.MONTH },
  { value: '年', key: MemberCardPlanType.YEAR },
]

/**
 * 会员卡套餐类型 - 字典
 *
 * @see {@link MemberCardUpgradeMethod}
 */
export const MEMBER_CARD_UPGRADE_METHODS: IDict[] = [
  { value: '等级升级', key: MemberCardUpgradeMethod.LEVELUP },
  { value: '升级会员', key: MemberCardUpgradeMethod.UPGRADE },
]
