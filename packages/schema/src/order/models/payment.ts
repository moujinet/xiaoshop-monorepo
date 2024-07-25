import type { IOrderPaymentStatus, IOrderPaymentType } from '@/order/types'

/**
 * 订单支付信息
 */
export interface IOrderPayment {
  /**
   * 订单支付编号
   */
  id: number
  /**
   * 订单支付状态
   *
   * @see {@link IOrderPaymentStatus}
   */
  status: IOrderPaymentStatus
  /**
   * 订单支付方式
   *
   * @see {@link IOrderPaymentType}
   */
  type: IOrderPaymentType
  /**
   * 订单金额
   */
  orderAmount: number
  /**
   * 修改金额
   */
  alterOrderAmount: number
  /**
   * 抵扣金额
   */
  deductionAmount: number
  /**
   * 折扣金额
   */
  discountAmount: number
  /**
   * 优惠券金额
   */
  couponAmount: number
  /**
   * 运费金额
   */
  freightAmount: number
  /**
   * 实际支付金额
   */
  paymentAmount: number
  /**
   * 订单改价时间
   */
  alterTime: number
  /**
   * 订单支付时间
   */
  paidTime: number
}
