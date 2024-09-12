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
  { label: '全部商品', value: CouponScope.ALL, color: ColorName.ARCOBLUE },
  { label: '指定分类', value: CouponScope.CATEGORY, color: ColorName.ORANGERED },
  { label: '指定商品', value: CouponScope.PRODUCT, color: ColorName.PURPLE },
]

// --------------------------------
// 营销 - 优惠券 - 发放方式
// --------------------------------

/**
 * 优惠券发放方式 - 枚举
 *
 * - `MANUAL`: 手动发放
 * - `AUTO`: 定时发放
 * - `BEHAVIOR`: 按用户行为发放
 */
export enum CouponGrantMode {
  MANUAL = 1,
  AUTO,
  BEHAVIOR,
}

/**
 * 优惠券发放方式 - 字典
 *
 * @see {@link CouponGrantMode}
 */
export const COUPON_GRANT_MODES = [
  { label: '手动发放', value: CouponGrantMode.MANUAL, color: ColorName.ARCOBLUE },
  { label: '定时发放', value: CouponGrantMode.AUTO, color: ColorName.ORANGERED },
  { label: '按用户行为发放', value: CouponGrantMode.BEHAVIOR, color: ColorName.PURPLE },
]

// --------------------------------
// 营销 - 优惠券 - 发放行为
// --------------------------------

/**
 * 优惠券发放行为 - 枚举
 *
 * - `REGISTER`: 注册
 * - `LOGIN`: 登录
 * - `ORDER`: 消费
 * - `SHARE`: 分享
 * - `INVITE`: 邀请
 * - `REFUND`: 退款
 */
export enum CouponGrantBehavior {
  REGISTER = 1,
  LOGIN,
  ORDER,
  SHARE,
  INVITE,
  REFUND,
}

/**
 * 优惠券发放行为 - 字典
 *
 * @see {@link CouponGrantBehavior}
 */
export const COUPON_USER_BEHAVIORS = [
  { label: '注册', value: CouponGrantBehavior.REGISTER },
  { label: '登录', value: CouponGrantBehavior.LOGIN },
  { label: '消费', value: CouponGrantBehavior.ORDER },
  { label: '分享', value: CouponGrantBehavior.SHARE },
  { label: '邀请', value: CouponGrantBehavior.INVITE },
  { label: '退款', value: CouponGrantBehavior.REFUND },
]

// --------------------------------
// 营销 - 促销活动 - 状态
// --------------------------------

/**
 * 促销活动状态 - 枚举
 *
 * - `DRAFT`: 草稿
 * - `SCHEDULING`: 排期中
 * - `IN_PROGRESS`: 进行中
 * - `FINISHED`: 已结束
 */
export enum PromotionStatus {
  DRAFT,
  SCHEDULING,
  IN_PROGRESS,
  FINISHED,
}

/**
 * 促销活动状态 - 字典
 *
 * @see {@link PromotionStatus}
 */
export const PROMOTION_STATUSES = [
  { label: '草稿', value: PromotionStatus.DRAFT, color: ColorName.CYAN },
  { label: '排期中', value: PromotionStatus.SCHEDULING, color: ColorName.PURPLE },
  { label: '进行中', value: PromotionStatus.IN_PROGRESS, color: ColorName.ARCOBLUE },
  { label: '已结束', value: PromotionStatus.FINISHED, color: ColorName.GRAY },
]

// --------------------------------
// 营销 - 促销活动 - 规则类型
// --------------------------------

/**
 * 促销活动规则类型 - 枚举
 *
 * - `DISCOUNT`: 折扣
 * - `VOUCHER`: 满减
 * - `FREE_SHIPPING`: 免邮
 * - `GIFT`: 赠品
 */
export enum PromotionRuleType {
  DISCOUNT = 1,
  VOUCHER,
  FREE_SHIPPING,
  GIFT,
}

/**
 * 促销活动规则类型 - 字典
 *
 * @see {@link PromotionRuleType}
 */
export const PROMOTION_TYPES = [
  { label: '限时折扣', value: PromotionRuleType.DISCOUNT },
  { label: '满减活动', value: PromotionRuleType.VOUCHER },
  { label: '包邮活动', value: PromotionRuleType.FREE_SHIPPING },
  { label: '赠品活动', value: PromotionRuleType.GIFT },
]
