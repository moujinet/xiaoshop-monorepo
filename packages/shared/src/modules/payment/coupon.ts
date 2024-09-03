/**
 * 支付优惠券信息
 */
export interface IPaymentCoupon {
  /**
   * 优惠券使用 ID
   */
  id: number
  /**
   * 支付 ID
   */
  paymentId: number
  /**
   * 优惠券 ID
   */
  couponId: number
  /**
   * 优惠券折扣
   */
  discount: number
  /**
   * 优惠券金额
   */
  amount: number
}
