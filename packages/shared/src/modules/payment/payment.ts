import type {
  PaymentMethod,
  PaymentStatus,
} from './constants'
import type { IOrder } from '@/order'
import type { IMemberAccount } from '@/member'

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
  memberId: IMemberAccount['id']
  /**
   * 订单 ID
   */
  orderId: IOrder['id']
  /**
   * 实际支付金额
   */
  actualAmount: number
  /**
   * 创建时间
   */
  createdTime: string
  /**
   * 支付时间
   */
  paidTime: string
}
