import type { IMemberInfo } from '@/member/models'
import type { IOrderPayment } from '@/order/models'

/**
 * 订单支付优惠券信息
 */
export interface IOrderPaymentCoupon {
  /**
   * 订单支付抵扣编号
   */
  id: number
  /**
   * 买家/会员
   *
   * @see {@link IMemberInfo}
   */
  member: IMemberInfo
  /**
   * 订单支付信息
   *
   * @see {@link IOrderPayment}
   */
  payment: IOrderPayment
}
