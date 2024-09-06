import type {
  OrderSource,
  OrderStatus,
  OrderType,
} from './constants'
import type {
  IMemberAccount,
  IMemberAccountInfo,
} from '@/member'
import type { YesOrNo } from '~/common'

/**
 * 订单信息
 */
export interface IOrder {
  /**
   * 订单 ID
   */
  id: number
  /**
   * 订单云链 ID
   */
  connectId: string
  /**
   * 订单状态
   *
   * @see {@link OrderStatus}
   */
  status: OrderStatus
  /**
   * 订单类型
   *
   * @see {@link OrderType}
   */
  type: OrderType
  /**
   * 订单来源
   *
   * @see {@link OrderSource}
   */
  source: OrderSource
  /**
   * 会员 ID
   */
  memberId: IMemberAccount['id']
  /**
   * 会员信息
   *
   * @see {@link IMemberAccountInfo}
   */
  member: IMemberAccountInfo
  /**
   * 是否已发票
   *
   * @see {@link YesOrNo}
   */
  isInvoiced: YesOrNo
  /**
   * 创建时间
   */
  createdTime: string
}
