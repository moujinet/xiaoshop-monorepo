import type { IGoodsInfo, IGoodsSkuSpec } from '@/goods/models'
import type { IOrderDeliveryInfo } from '@/order/models'
import type { IOrderGoodsStatus } from '@/order/types'

/**
 * 订单 - 商品信息
 */
export interface IOrderGoods {
  /**
   * 订单商品编号
   */
  id: number
  /**
   * 订单商品状态
   *
   * @see {@link IOrderGoodsStatus}
   */
  status: IOrderGoodsStatus
  /**
   * 订单商品关联信息
   *
   * @see {@link IOrderGoodsRelatedInfo}
   */
  goods: IOrderGoodsRelatedInfo
  /**
   * 订单商品名称
   */
  name: string
  /**
   * 订单商品规格 (JSON)
   *
   * @see {@link IGoodsSkuSpec}
   */
  specs: IGoodsSkuSpec[]
  /**
   * 商品价格
   */
  price: number
  /**
   * 商品数量
   */
  qty: number
  /**
   * 发货时间
   */
  deliveredTime: number
  /**
   * 收货时间
   */
  receivedTime: number
  /**
   * 退货时间
   */
  returnedTime: number
  /**
   * 换货时间
   */
  replacedTime: number
}

/**
 * 订单 - 商品 - 发货信息
 */
export type IOrderGoodsDeliveryInfo = IOrderGoods & {
  /**
   * 订单商品发货信息
   *
   * @see {@link IOrderDeliveryInfo}
   */
  delivery?: IOrderDeliveryInfo
}

/**
 * 订单 - 商品 - 信息
 *
 * @see {@link IGoodsInfo}
 */
export type IOrderGoodsRelatedInfo = Pick<IGoodsInfo, 'id' | 'type' | 'status'>
