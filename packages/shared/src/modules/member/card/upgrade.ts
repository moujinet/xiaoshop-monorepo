import type { IDict } from '~/common'
import type { IMemberCardBadgeStyle, IMemberCardInfo, IMemberCardPlanInfo } from './card'

/**
 * 会员卡升级信息
 */
export interface IMemberCardUpgradeInfo {
  /**
   * 升级信息 ID
   */
  id: number
  /**
   * 会员卡 ID (冗余)
   */
  cardId: IMemberCardInfo['id']
  /**
   * 会员卡套餐 ID (冗余)
   */
  cardPlanId: IMemberCardPlanInfo['id']
  /**
   * 会员卡标识 (冗余)
   */
  key: IMemberCardInfo['key']
  /**
   * 会员卡类型 (冗余)
   *
   * @see {@link MemberCardType}
   */
  type: IDict
  /**
   * 会员卡名称 (冗余)
   */
  name: IMemberCardInfo['name']
  /**
   * 会员卡徽章样式 (冗余)
   */
  badgeStyle: IMemberCardBadgeStyle
  /**
   * 升级方式
   *
   * @see {@link MemberCardUpgradeMethod}
   */
  method: IDict
  /**
   * 升级原因
   */
  reason: string
  /**
   * 变更时间
   */
  createdTime: string
}

/**
 * 会员卡升级记录列表
 */
export type IMemberCardUpgradeList = Pick<
  IMemberCardUpgradeInfo,
  | 'id'
  | 'key'
  | 'type'
  | 'name'
  | 'badgeStyle'
  | 'method'
  | 'reason'
  | 'createdTime'
>
