import type { IMemberAccount } from '@/member'
import type {
  IProduct,
  IProductCartInfo,
  IProductSku,
  IProductSkuInfo,
} from '@/product'
import type { YesOrNo } from '~/common'

/**
 * 购物车商品信息
 */
export interface ICartProduct {
  /**
   * 购物车 ID
   */
  id: number
  /**
   * 会员 ID
   */
  memberId: IMemberAccount['id']
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
   * 商品 SKU
   *
   * @see {@link IProductSkuInfo}
   */
  sku: IProductSkuInfo
  /**
   * 购买数量
   */
  quantity: number
  /**
   * 是否选中
   *
   * - `NO`: 否
   * - `YES`: 是
   *
   * @see {@link YesOrNo}
   */
  selected: YesOrNo
  /**
   * 加购时间
   */
  createdTime: string
}
