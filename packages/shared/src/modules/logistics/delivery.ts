import type { IOrder } from '@/order'

/**
 * 物流发货信息
 */
export interface ILogisticsDeliveryInfo {
  /**
   * 物流发货 ID
   */
  id: number
  /**
   * 订单 ID
   */
  orderId: IOrder['id']
  /**
   * 创建时间
   */
  createdTime: string
  /**
   * 更新时间
   */
  updatedTime: string
}
