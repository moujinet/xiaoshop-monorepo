import type { IMemberCardBadgeStyle, IMemberCardStyle } from './styles'
import type { IMemberCardPlan } from './plan'
import type { MemberCardType } from '@/member/constants'
import type { YesOrNo } from '~/common'

/**
 * 会员卡信息
 */
export interface IMemberCard {
  /**
   * 会员卡 ID
   */
  id: number
  /**
   * 会员卡类型
   *
   * @see {@link MemberCardType}
   */
  type: MemberCardType
  /**
   * 是否启用
   *
   * @see {@link YesOrNo}
   */
  enable: YesOrNo
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
   * 会员卡有效期
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
   *
   * @see {@link YesOrNo}
   */
  freeShipping: YesOrNo
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
 *
 * @see {@link IMemberCard}
 */
export type IMemberCardDict = Pick<
  IMemberCard,
  | 'id'
  | 'type'
  | 'name'
>

/**
 * 会员等级列表
 *
 * @see {@link IMemberCard}
 */
export type IMemberLevelCardListItem = Pick<
  IMemberCard,
  | 'id'
  | 'type'
  | 'enable'
  | 'key'
  | 'name'
  | 'desc'
  | 'badgeStyle'
  | 'needExp'
  | 'discount'
  | 'pointsRatio'
  | 'freeShipping'
  | 'total'
>

/**
 * 自定义会员卡列表
 *
 * @see {@link IMemberLevelCardListItem}
 */
export type IMemberCustomCardListItem = IMemberLevelCardListItem & Pick<
  IMemberCard,
  | 'updatedTime'
>