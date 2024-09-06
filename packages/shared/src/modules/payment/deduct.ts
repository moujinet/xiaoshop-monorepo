import type { IPayment } from './payment'

/**
 * 支付积分抵扣信息
 */
export interface IPaymentDeduct {
  /**
   * 支付积分抵扣 ID
   */
  id: number
  /**
   * 支付 ID
   */
  paymentId: IPayment['id']
  /**
   * 抵扣积分
   */
  points: number
  /**
   * 抵扣比例
   */
  ratio: number
  /**
   * 抵扣金额
   */
  amount: number
}
