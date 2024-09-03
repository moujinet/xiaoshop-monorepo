import type { MemberCardPlanType } from '@/member/constants'

/**
 * 会员卡 - 有效期
 */
export interface IMemberCardPlan {
  /**
   * 会员卡套餐 ID
   */
  id: number
  /**
   * 会员卡套餐类型
   *
   * @see {@link MemberCardPlanType}
   */
  type: MemberCardPlanType
  /**
   * 会员卡套餐有效期
   */
  due: number
  /**
   * 会员卡套餐价格
   */
  price: number
}
