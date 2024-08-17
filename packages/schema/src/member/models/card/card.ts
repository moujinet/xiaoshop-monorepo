import type { IEnabled } from '@/common'
import type { IMemberCardType } from '@/member/types'
import type { IMemberCardPlan } from '@/member/models/card/plan'
import type {
  IMemberCardBadgeStyles,
  IMemberCardStyles,
} from '@/member/models/card/styles'

/**
 * 会员卡信息
 */
export interface IMemberCard {
  /**
   * 会员卡编号
   */
  id: number
  /**
   * 会员卡类型
   *
   * @see {@link IMemberCardType}
   */
  type: IMemberCardType
  /**
   * 会员卡状态
   *
   * @see {@link IEnabled}
   */
  isEnabled: IEnabled
  /**
   * 会员卡标识
   */
  key: string
  /**
   * 会员卡名称
   */
  name: string
  /**
   * 会员卡描述
   */
  desc: string
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
   * 会员卡套餐
   *
   * @see {@link IMemberCardPlan}
   */
  plans: IMemberCardPlan[]
  /**
   * 所需成长值
   */
  needExp: number
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
   */
  isFreeShipping: IEnabled
  /**
   * 开通会员数
   *
   * @virtual
   */
  total: number
  /**
   * 创建时间
   */
  createdTime: string
  /**
   * 更新时间
   */
  updatedTime: string
}

/**
 * 会员卡字典
 */
export type IMemberCardDict = Pick<
  IMemberCard,
  | 'id'
  | 'type'
  | 'name'
>

/**
 * 会员等级列表
 */
export type IMemberLevelListItem = Pick<
  IMemberCard,
  | 'id'
  | 'type'
  | 'isEnabled'
  | 'key'
  | 'name'
  | 'desc'
  | 'badgeStyles'
  | 'needExp'
  | 'discount'
  | 'pointsRatio'
  | 'isFreeShipping'
  | 'total'
>

/**
 * 自定义会员卡列表
 */
export type IMemberCustomCardListItem = Pick<
  IMemberCard,
  | 'id'
  | 'type'
  | 'isEnabled'
  | 'key'
  | 'name'
  | 'desc'
  | 'badgeStyles'
  | 'plans'
  | 'discount'
  | 'pointsRatio'
  | 'isFreeShipping'
  | 'total'
  | 'createdTime'
>
