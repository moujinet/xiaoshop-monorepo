import type {
  CouponScope,
  CouponType,
} from './constants'

/**
 * 优惠券信息
 */
export interface ICoupon {
  /**
   * 优惠券 ID
   */
  id: number
  /**
   * 优惠券类型
   *
   * @see {@link CouponType}
   */
  type: CouponType
  /**
   * 适用范围
   *
   * @see {@link CouponScope}
   */
  scope: CouponScope
  /**
   * 优惠券名称
   */
  name: string
  /**
   * 优惠券说明
   */
  desc: string
  /**
   * 创建时间
   */
  createdTime: string
}
