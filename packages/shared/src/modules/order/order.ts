import type {
  OrderSource,
  OrderStatus,
  OrderType,
} from './constants'
import type { IMemberAccountInfo } from '@/member'

/**
 * 订单信息
 */
export interface IOrder {
  /**
   * 订单 ID
   */
  id: number
  /**
   * 订单 UUID
   */
  uuid: string
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
  memberId: number
  /**
   * 会员信息
   *
   * @see {@link IMemberAccountInfo}
   */
  member: IMemberAccountInfo
  /**
   * 创建时间
   */
  createdTime: string
}
