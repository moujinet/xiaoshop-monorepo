import type {
  PaymentMethod,
  PaymentStatus,
} from './constants'

/**
 * 支付信息
 */
export interface IPayment {
  /**
   * 支付 ID
   */
  id: number
  /**
   * 支付状态
   *
   * @see {@link PaymentStatus}
   */
  status: PaymentStatus
  /**
   * 支付方式
   *
   * @see {@link PaymentMethod}
   */
  method: PaymentMethod
  /**
   * 会员 ID
   */
  memberId: number
  /**
   * 订单 ID
   */
  orderId: number
  /**
   * 订单金额
   */
  orderAmount: number
  /**
   * 优惠金额
   */
  discountAmount: number
  /**
   * 积分抵扣金额
   */
  deductedAmount: number
  /**
   * 优惠券抵扣金额
   */
  couponAmount: number
  /**
   * 运费金额
   */
  freightAmount: number
  /**
   * 实际支付金额
   */
  actualAmount: number
  /**
   * 修改金额
   */
  changeAmount: number
  /**
   * 改价原因
   */
  changeReason: string
  /**
   * 改价时间
   */
  changedTime: string
  /**
   * 创建时间
   */
  createdTime: string
  /**
   * 支付时间
   */
  paidTime: string
}
