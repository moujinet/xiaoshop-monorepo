import type { MemberCardPlanType, MemberCardType } from '@/member/constants'
import type { YesOrNo } from '~/common'
import type { IMemberCardBadgeStyle, IMemberCardStyle } from './card/styles'

/**
 * 会员卡 - 绑定信息
 */
export interface IMemberBindingInfo {
  /**
   * 绑定 ID
   */
  id: number
  /**
   * 会员卡标识
   */
  key: string
  /**
   * 会员卡名称
   */
  name: string
  /**
   * 会员卡 ID
   */
  cardId: number
  /**
   * 会员卡类型
   *
   * @see {@link MemberCardType}
   */
  cardType: MemberCardType
  /**
   * 会员卡有效期 ID
   */
  planId: number
  /**
   * 会员卡有效期类型
   *
   * @see {@link MemberCardPlanType}
   */
  planType: MemberCardPlanType
  /**
   * 会员卡卡片样式
   *
   * @see {@link IMemberCardStyle}
   */
  cardStyle: IMemberCardStyle
  /**
   * 会员卡徽章样式
   *
   * @see {@link IMemberCardBadgeStyle}
   */
  badgeStyle: IMemberCardBadgeStyle
  /**
   * 会员折扣
   */
  discount: number
  /**
   * 获得积分倍率
   */
  pointsRatio: number
  /**
   * 所需成长值
   */
  needExp: number
  /**
   * 下级升级所需成长值
   */
  nextLevelExp: number
  /**
   * 是否包邮
   *
   * @see {@link YesOrNo}
   */
  isFreeShipping: YesOrNo
  /**
   * 是否可升级
   *
   * @see {@link YesOrNo}
   */
  upgradeable: YesOrNo
  /**
   * 会员卡使用次数
   */
  times: number
  /**
   * 开通时间
   */
  createdTime: string
  /**
   * 到期时间 (根据自定义会员卡有效期计算)
   */
  dueTime: string
}
