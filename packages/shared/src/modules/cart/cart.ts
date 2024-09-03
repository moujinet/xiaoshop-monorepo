import type {
  IProductCartInfo,
  IProductSkuInfo,
} from '@/product'
import type { YesOrNo } from '~/common'

/**
 * 购物车
 */
export interface ICart {
  /**
   * 购物车 ID
   */
  id: number
  /**
   * 会员 ID
   */
  memberId: number
  /**
   * 商品 ID
   */
  productId: number
  /**
   * 商品信息
   *
   * @see {@link IProductCartInfo}
   */
  product: IProductCartInfo
  /**
   * 商品 SKU ID
   */
  skuId: number
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
