import type { IEnabled } from '@/common'
import type { IMemberCardPlanType, IMemberCardType } from '@/member/types'
import type { IMemberCardBadgeStyles, IMemberCardStyles } from '@/member/models/card/styles'

/**
 * 会员卡 - 绑定信息
 */
export interface IMemberCardBinding {
  /**
   * 会员卡绑定 ID
   */
  id: number
  /**
   * 会员 ID
   */
  memberId: number
  /**
   * 会员卡 ID
   */
  cardId: number
  /**
   * 会员卡有效期套餐 ID
   */
  planId: number
  /**
   * 会员卡标识
   */
  key: string
  /**
   * 会员卡名称
   */
  name: string
  /**
   * 会员卡类型
   *
   * @see {@link IMemberCardType}
   */
  type: IMemberCardType
  /**
   * 会员卡有效期类型
   *
   * @see {@link IMemberCardPlanType}
   */
  planType: IMemberCardPlanType
  /**
   * 会员折扣
   */
  discount: number
  /**
   * 获得积分倍率
   */
  pointsRatio: number
  /**
   * 是否包邮 (N:否 Y:是)
   *
   * @see {@link IEnabled}
   */
  isFreeShipping: IEnabled
  /**
   * 是否可升级 (N:否 Y:是)
   *
   * @see {@link IEnabled}
   */
  isUpgradeable: IEnabled
  /**
   * 所需成长值
   */
  needExp: number
  /**
   * 下级升级所需成长值
   */
  nextNeedExp: number
  /**
   * 会员卡使用次数
   */
  times: number
  /**
   * 会员卡卡片样式
   *
   * @see {@link IMemberCardStyles}
   */
  cardStyles: IMemberCardStyles
  /**
   * 会员卡徽章样式
   *
   * @see {@link IMemberCardBadgeStyles}
   */
  badgeStyles: IMemberCardBadgeStyles
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
 * 会员卡 - 绑定摘要信息
 */
export type IMemberCardBindingInfo = Pick<
  IMemberCardBinding,
  | 'id'
  | 'cardId'
  | 'planId'
  | 'name'
  | 'type'
  | 'badgeStyles'
>
