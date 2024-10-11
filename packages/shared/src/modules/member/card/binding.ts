import type { IDict, YesOrNo } from '~/common'
import type { IMemberCardBadgeStyle, IMemberCardStyle } from './card'

/**
 * 会员卡绑定信息
 */
export interface IMemberCardBindingInfo {
  /**
   * 绑定 ID
   */
  id: number
  /**
   * 会员卡 ID (冗余)
   */
  cardId: number
  /**
   * 会员卡标识 (冗余)
   */
  key: string
  /**
   * 会员卡类型 (冗余)
   *
   * @see {@link MemberCardType}
   */
  type: IDict
  /**
   * 会员卡名称 (冗余)
   */
  name: string
  /**
   * 会员卡有效期 ID (冗余)
   */
  cardPlanId: number
  /**
   * 会员卡有效期类型 (冗余)
   *
   * @see {@link MemberCardPlanType}
   */
  cardPlanType: IDict
  /**
   * 会员卡卡片样式 (冗余)
   */
  cardStyle: IMemberCardStyle
  /**
   * 会员卡徽章样式 (冗余)
   */
  badgeStyle: IMemberCardBadgeStyle
  /**
   * 所需成长值 (冗余)
   */
  needExp: number
  /**
   * 会员折扣 (冗余)
   */
  discount: number
  /**
   * 获得积分倍率 (冗余)
   */
  pointsRatio: number
  /**
   * 是否包邮 (冗余)
   */
  isFreeShipping: YesOrNo
  /**
   * 会员卡使用次数
   */
  useTimes: number
  /**
   * 到期时间 (根据自定义会员卡有效期计算)
   */
  dueTime: string
  /**
   * 开通时间
   */
  createdTime: string
}

/**
 * 会员卡绑定关联信息
 */
export type IMemberCardBindCard = Pick<
  IMemberCardBindingInfo,
  | 'id'
  | 'key'
  | 'type'
  | 'name'
  | 'badgeStyle'
  | 'dueTime'
>
