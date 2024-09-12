import type { IMemberAccountInfo } from '@/member'
import type { IOrder } from '@/order'
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
   * 交易 ID
   */
  transactionId: string
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
  memberId: IMemberAccountInfo['id']
  /**
   * 订单 ID
   */
  orderId: IOrder['id']
  /**
   * 实际支付金额
   */
  paidPrice: number
  /**
   * 支付时间
   */
  paidTime: string
}
