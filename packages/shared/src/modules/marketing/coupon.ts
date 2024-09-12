import type { YesOrNo } from '~/common'
import type {
  CouponGrantBehavior,
  CouponGrantMode,
  CouponScope,
  CouponType,
} from './constants'
import type { IPromotion } from './promotion'

/**
 * 优惠券方案信息
 *
 * #### 限时折扣券 `无门槛`
 *
 * - `type`:          `CouponType.DISCOUNT` - 折扣券
 * - `discountRatio`: `90`                  - 折扣比例 `90%`
 * - `dueTime`:       `2024-01-01 23:59:59` - 有效期至 `2024-01-01 23:59:59`
 * - `useRule`:       `0`                   - 不启用规则
 *
 * #### 不限时折扣券
 *
 * - `type`:          `CouponType.DISCOUNT` - 折扣券
 * - `discountRatio`: `90`                  - 折扣比例 `90%`
 * - `useRule`:       `0`                   - 不启用规则
 *
 * #### 满减券 `满 100 减 20`
 *
 * - `type`:          `CouponType.VOUCHER`  - 立减券
 * - `voucherValue`:  `20`                  - 立减金额 `20`
 * - `useRule`:       `1`                   - 启用规则
 * - `reachPrice`:    `100`                 - 达到金额 `100`
 *
 * #### 包邮券 `满 99 包邮`
 *
 * - `type`:          `CouponType.FREE_SHIPPING`  - 包邮券
 * - `useRule`:       `1`                         - 启用规则
 * - `reachPrice`:    `99`                        - 达到金额 `99`
 */
export interface ICoupon {
  /**
   * 优惠券 ID
   */
  id: number
  /**
   * 促销活动 ID
   */
  promotionId: IPromotion['id']
  /**
   * 是否启用
   *
   * @see {@link YesOrNo}
   */
  isEnabled: YesOrNo
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
   * 发放方式
   *
   * @see {@link CouponGrantMode}
   */
  grantMode: CouponGrantMode
  /**
   * 发放行为
   *
   * - 当 `grantMode` 为 `CouponGrantMode.BEHAVIOR` 时
   *
   * @see {@link CouponUserBehavior}
   */
  grantBehavior: CouponGrantBehavior
  /**
   * 优惠券名称
   */
  name: string
  /**
   * 优惠券说明
   */
  desc: string
  /**
   * 达到金额
   */
  reachPrice: number
  /**
   * 达到数量
   */
  reachTotal: number
  /**
   * 折扣比例
   *
   * - 当 `type` 为 `CouponType.DISCOUNT` 时
   */
  discountRatio: number
  /**
   * 优惠券面值
   *
   * - 当 `type` 为 `CouponType.VOUCHER` 时
   */
  voucherValue: number
  /**
   * 适用商品分类
   *
   * - 当 `scope` 为 `CouponScope.CATEGORY` 时
   */
  categories: number[]
  /**
   * 适用商品
   *
   * - 当 `scope` 为 `CouponScope.PRODUCT` 时
   */
  products: number[]
  /**
   * 是否启用使用规则
   *
   * @see {@link YesOrNo}
   */
  isUseRule: YesOrNo
  /**
   * 是否启用到期提醒
   *
   * @see {@link YesOrNo}
   */
  isRemind: YesOrNo
  /**
   * 有效期
   */
  dueTime: string
  /**
   * 创建时间
   */
  createdTime: string
  /**
   * 更新时间
   */
  updatedTime: string
}
