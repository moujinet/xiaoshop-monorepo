import type { IOrderPaymentDiscountType } from '@/order/types'
import type { IOrderGoods, IOrderPayment } from '@/order/models'

/**
 * 订单支付折扣优惠信息
 */
export interface IOrderPaymentDiscount {
  /**
   * 订单支付折扣优惠编号
   */
  id: number
  /**
   * 订单支付折扣类型
   *
   * @see {@link IOrderPaymentDiscountType}
   */
  type: IOrderPaymentDiscountType
  /**
   * 订单支付信息
   *
   * @see {@link IOrderPayment}
   */
  payment: IOrderPayment
  /**
   * 订单支付折扣商品
   *
   * @see {@link IOrderGoods}
   */
  orderGoods: IOrderGoods[]
  /**
   * 订单支付折扣金额
   */
  discountAmount: number
}
