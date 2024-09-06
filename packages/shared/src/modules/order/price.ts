import type { IProduct } from '@/product'
import type { YesOrNo } from '~/common'

/**
 * 订单金额信息
 */
export interface IOrderPrice {
  /**
   * 流水号
   */
  id: number
  /**
   * 商品 ID
   */
  productId: IProduct['id']
  /**
   * 运费金额
   */
  freight: number
  /**
   * 订单金额
   */
  orderPrice: number
  /**
   * 优惠金额
   */
  discountPrice: number
  /**
   * 积分抵扣金额
   */
  deductedPrice: number
  /**
   * 优惠券抵扣金额
   */
  couponPrice: number
  /**
   * 实际支付金额
   */
  actualPrice: number
  /**
   * 修改金额
   */
  changePrice: number
  /**
   * 改价原因
   */
  changePriceReason: string
  /**
   * 是否已折扣
   *
   * @see {@link YesOrNo}
   */
  isDiscounted: YesOrNo
  /**
   * 改价时间
   */
  changePriceTime: string
}
