import type { IEnabled } from '@/common'
import type { IMemberCardPlanType, IMemberCardType } from '@/member/types'
import type { IMemberCardStyleInfo } from '@/member/models/card/card'

/**
 * 会员卡 - 绑定信息
 */
export interface IMemberCardBinding {
  /**
   * 会员卡绑定 ID
   */
  id: number
  /**
   * 会员卡 ID
   */
  cardId: number
  /**
   * 会员卡类型
   *
   * @see {@link IMemberCardType}
   */
  cardType: IMemberCardType
  /**
   * 会员卡有效期类型
   *
   * @see {@link IMemberCardPlanType}
   */
  cardPlanType: IMemberCardPlanType
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
   * 到期时间 (根据自定义会员卡有效期计算)
   */
  dueTime: string
  /**
   * 会员卡样式信息
   *
   * @see {@link IMemberCardStyleInfo}
   */
  styles: IMemberCardStyleInfo
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
  | 'cardType'
  | 'styles'
>
