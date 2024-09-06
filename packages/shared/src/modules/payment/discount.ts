import type { PaymentDiscountType } from './constants'
import type { IPayment } from './payment'

/**
 * 支付折扣信息
 */
export interface IPaymentDiscount {
  /**
   * 支付折扣 ID
   */
  id: number
  /**
   * 支付 ID
   */
  paymentId: IPayment['id']
  /**
   * 促销 ID
   */
  promotionId: number
  /**
   * 折扣类型
   *
   * @see {@link PaymentDiscountType}
   */
  type: PaymentDiscountType
  /**
   * 折扣
   */
  discount: number
  /**
   * 折扣金额
   */
  amount: number
}
