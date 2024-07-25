import type { IOrderSource, IOrderStatus, IOrderType } from '@/order/types'
import type { IOrderDeliveryInfo, IOrderGoods, IOrderPayment } from '@/order/models'
import type { IMemberInfo } from '@/member/models'

/**
 * 订单信息
 */
export interface IOrder {
  /**
   * 订单号
   */
  id: string
  /**
   * 订单类型
   *
   * @see {@link IOrderType}
   */
  type: IOrderType
  /**
   * 订单状态
   *
   * @see {@link IOrderStatus}
   */
  status: IOrderStatus
  /**
   * 订单来源
   *
   * @see {@link IOrderSource}
   */
  source: IOrderSource
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
   * 订单发货信息
   *
   * @see {@link IOrderDeliveryInfo}
   */
  delivery: IOrderDeliveryInfo
  /**
   * 订单商品信息
   *
   * @see {@link IOrderGoods}
   */
  goods: IOrderGoods[]
  /**
   * 订单总额
   */
  amount: number
  /**
   * 订单商品数量
   */
  qty: number
  /**
   * 订单备注
   */
  remark: string
  /**
   * 下单时间
   */
  createdTime: number
}

/**
 * 订单基本信息
 */
export type IOrderInfo = Pick<IOrder, 'id' | 'type' | 'status' | 'amount' | 'qty'>
