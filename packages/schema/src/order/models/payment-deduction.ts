import type { IMemberInfo } from '@/member/models'
import type { IOrderPayment } from '@/order/models'

/**
 * 订单支付抵扣信息
 */
export interface IOrderPaymentDeduction {
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
  deductionAmount: number
}
