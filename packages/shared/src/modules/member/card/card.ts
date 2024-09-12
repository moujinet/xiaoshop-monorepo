import type { MemberCardType } from '@/member/constants'
import type { YesOrNo } from '~/common'
import type { IMemberCardPlanInfo } from './plan'
import type { IMemberCardBadgeStyle, IMemberCardStyle } from './styles'

/**
 * 会员卡信息
 */
export interface IMemberCardInfo {
  /**
   * 会员卡 ID
   */
  id: number
  /**
   * 是否启用
   *
   * @see {@link YesOrNo}
   */
  isEnabled: YesOrNo
  /**
   * 会员卡类型
   *
   * @see {@link MemberCardType}
   */
  type: MemberCardType
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
   * @see {@link IMemberCardPlanInfo}
   */
  plans: IMemberCardPlanInfo[]
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
  isFreeShipping: YesOrNo
}

/**
 * 会员卡字典
 *
 * @see {@link IMemberCardInfo}
 */
export type IMemberCardDict = Pick<
  IMemberCardInfo,
  | 'id'
  | 'type'
  | 'name'
>

/**
 * 会员等级列表
 *
 * @see {@link IMemberCardInfo}
 */
export type IMemberLevelCardList = Pick<
  IMemberCardInfo,
  | 'id'
  | 'isEnabled'
  | 'key'
  | 'name'
  | 'desc'
  | 'badgeStyle'
  | 'needExp'
  | 'discount'
  | 'pointsRatio'
  | 'isFreeShipping'
> & {
  /**
   * 开通数量
   */
  total: number
}

/**
 * 自定义会员卡列表
 *
 * @see {@link IMemberCardInfo}
 */
export type IMemberCustomCardList = IMemberLevelCardList &
  Pick<
    IMemberCardInfo,
    | 'plans'
  > & {
  /**
   * 更新时间
   */
    updatedTime: string
  }
