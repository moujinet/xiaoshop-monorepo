import { ColorName } from '~/common'

// --------------------------------
// 支付 - 状态
// --------------------------------

/**
 * 支付状态 - 枚举
 *
 * - `PENDING`: 待支付
 * - `PAID`: 已支付
 * - `CANCELED`: 已取消
 */
export enum PaymentStatus {
  PENDING,
  PAID,
  CANCELED,
}

/**
 * 支付状态 - 字典
 *
 * @see {@link PaymentStatus}
 */
export const PAYMENT_STATUSES = [
  { label: '待支付', value: PaymentStatus.PENDING, color: ColorName.ORANGERED },
  { label: '已支付', value: PaymentStatus.PAID, color: ColorName.GREEN },
  { label: '已取消', value: PaymentStatus.CANCELED, color: ColorName.GRAY },
]

// --------------------------------
// 支付 - 方式
// --------------------------------

/**
 * 支付方式 - 枚举
 *
 * - `ALIPAY`: 支付宝
 * - `WECHAT`: 微信钱包
 * - `BALANCE`: 余额支付
 * - `CASH`: 现金支付
 * - `POINTS`: 积分支付
 */
export enum PaymentMethod {
  ALIPAY = 1,
  WECHAT,
  BALANCE,
  CASH,
  POINTS,
}

/**
 * 支付方式 - 字典
 *
 * @see {@link PaymentMethod}
 */
export const PAYMENT_METHODS = [
  { label: '支付宝', value: PaymentMethod.ALIPAY, icon: 'mingcute:alipay', color: ColorName.ARCOBLUE },
  { label: '微信钱包', value: PaymentMethod.WECHAT, icon: 'mingcute:wechat-pay', color: ColorName.GREEN },
  { label: '余额支付', value: PaymentMethod.BALANCE, icon: 'mingcute:wallet', color: ColorName.ORANGERED },
  { label: '现金支付', value: PaymentMethod.CASH, icon: 'mingcute:cash', color: ColorName.RED },
  { label: '积分支付', value: PaymentMethod.POINTS, icon: 'mingcute:yuanbao', color: ColorName.PURPLE },
]

// --------------------------------
// 支付 - 折扣类型
// --------------------------------

/**
 * 支付折扣类型 - 枚举
 *
 * - `privilege`: 会员折扣
 * - `promotion`: 促销折扣
 */
export enum PaymentDiscountType {
  PRIVILEGE = 1,
  PROMOTION,
}

/**
 * 支付折扣类型 - 字典
 *
 * @see {@link IPaymentDiscountType}
 */
export const PAYMENT_DISCOUNT_TYPES = [
  { label: '会员折扣', value: PaymentDiscountType.PRIVILEGE, color: ColorName.ORANGERED },
  { label: '促销折扣', value: PaymentDiscountType.PROMOTION, color: ColorName.PINKPURPLE },
]
