import type {
  IProduct,
  IProductCartInfo,
  IProductSku,
  IProductSkuInfo,
} from '@/product'
import type { IOrder, OrderProductStatus } from '@/order'

/**
 * 订单商品信息
 */
export interface IOrderProduct {
  /**
   * ID
   */
  id: number
  /**
   * 订单商品云链 ID
   */
  connectId: string
  /**
   * 订单 ID
   */
  orderId: IOrder['id']
  /**
   * 商品 ID
   */
  productId: IProduct['id']
  /**
   * 商品信息
   *
   * @see {@link IProductCartInfo}
   */
  product: IProductCartInfo
  /**
   * 商品 SKU ID
   */
  skuId: IProductSku['id']
  /**
   * 商品 SKU 信息
   *
   * @see {@link IProductSkuInfo}
   */
  sku: IProductSkuInfo
  /**
   * 订单商品状态
   *
   * @see {@link OrderProductStatus}
   */
  status: OrderProductStatus
  /**
   * 购买数量
   */
  quantity: number
}
