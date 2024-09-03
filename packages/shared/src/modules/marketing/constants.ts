import { ColorName } from '~/common'

// --------------------------------
// 营销 - 优惠券 - 类型
// --------------------------------

/**
 * 优惠券类型 - 枚举
 *
 * - `DISCOUNT`: 折扣券
 * - `VOUCHER`: 立减券
 * - `FREE_SHIPPING`: 免邮券
 */
export enum CouponType {
  DISCOUNT = 1,
  VOUCHER,
  FREE_SHIPPING,
}

/**
 * 优惠券类型 - 字典
 *
 * @see {@link CouponType}
 */
export const COUPON_TYPES = [
  { label: '折扣券', value: CouponType.DISCOUNT, color: ColorName.CYAN, icon: 'mingcute:sale' },
  { label: '立减券', value: CouponType.VOUCHER, color: ColorName.ORANGERED, icon: 'mingcute:currency-cny' },
  { label: '免邮券', value: CouponType.FREE_SHIPPING, color: ColorName.PURPLE, icon: 'mingcute:truck' },
]

// --------------------------------
// 营销 - 优惠券 - 适用范围
// --------------------------------

/**
 * 优惠券适用范围 - 枚举
 *
 * - `ALL`: 全部商品
 * - `CATEGORY`: 指定分类
 * - `PRODUCT`: 指定商品
 */
export enum CouponScope {
  ALL,
  CATEGORY,
  PRODUCT,
}

/**
 * 优惠券适用范围 - 字典
 *
 * @see {@link CouponScope}
 */
export const COUPON_SCOPES = [
  { label: '全部商品', value: CouponScope.ALL },
  { label: '指定分类', value: CouponScope.CATEGORY },
  { label: '指定商品', value: CouponScope.PRODUCT },
]
