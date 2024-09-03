import { ColorName } from '~/common'

// --------------------------------
// 物流 - 发货方式
// --------------------------------

/**
 * 物流发货方式 - 枚举
 *
 * - `EXPRESS` - 物流快递
 * - `SELF` - 到店自提
 * - `LOCAL` - 同城配送
 * - `NONE` - 无需发货
 */
export enum LogisticsDeliveryMethod {
  EXPRESS = 1,
  SELF,
  LOCAL,
  NONE,
}

/**
 * 物流发货方式 - 字典
 *
 * @see {@link LogisticsDeliveryMethod}
 */
export const LOGISTICS_DELIVERY_MODES = [
  { label: '物流快递', value: LogisticsDeliveryMethod.EXPRESS },
  { label: '到店自提', value: LogisticsDeliveryMethod.SELF },
  { label: '同城配送', value: LogisticsDeliveryMethod.LOCAL },
  { label: '无需发货', value: LogisticsDeliveryMethod.NONE },
]

// --------------------------------
// 物流 - 发货类型
// --------------------------------

/**
 * 物流发货类型 - 枚举
 *
 * - `DELIVERY` - 发货
 * - `REFUND` - 退货
 * - `EXCHANGE` - 换货
 */
export enum LogisticsDeliveryType {
  DELIVERY = 1,
  REFUND,
  EXCHANGE,
}

/**
 * 物流发货类型 - 字典
 *
 * @see {@link LogisticsDeliveryType}
 */
export const LOGISTICS_DELIVERY_TYPES = [
  { label: '发货', value: LogisticsDeliveryType.DELIVERY },
  { label: '退款', value: LogisticsDeliveryType.REFUND },
  { label: '换货', value: LogisticsDeliveryType.EXCHANGE },
]

// --------------------------------
// 物流 - 发货状态
// --------------------------------

/**
 * 物流发货状态 - 枚举
 *
 * - `PENDING` - 待商家发货
 * - `APPROVED` - 待买家收货
 * - `RECEIVED` - 待买家评价
 * - `CANCELLED` - 已取消
 * - `COMPLETED` - 已完成
 */
export enum LogisticsDeliveryStatus {
  PENDING,
  APPROVED,
  RECEIVED,
  CANCELLED,
  COMPLETED,
}

/**
 * 物流发货状态 - 字典
 *
 * @see {@link LogisticsDeliveryStatus}
 */
export const LOGISTICS_DELIVERY_STATUSES = [
  { label: '待商家发货', value: LogisticsDeliveryStatus.PENDING, color: ColorName.ORANGERED },
  { label: '待买家收货', value: LogisticsDeliveryStatus.APPROVED, color: ColorName.ARCOBLUE },
  { label: '待买家评价', value: LogisticsDeliveryStatus.RECEIVED, color: ColorName.GREEN },
  { label: '已取消', value: LogisticsDeliveryStatus.CANCELLED, color: ColorName.GRAY },
  { label: '已完成', value: LogisticsDeliveryStatus.COMPLETED, color: ColorName.GRAY },
]

// --------------------------------
// 物流 - 退货状态
// --------------------------------

/**
 * 物流退货状态 - 枚举
 *
 * - `PENDING`  - 待商家审批
 * - `REJECTED` - 商家已拒绝
 * - `WAITING` - 待买家退货
 * - `APPROVED` - 待商家收货
 * - `RECEIVED` - 待商家退款
 * - `REFUNDED` - 商家已退款
 * - `CANCELLED` - 已取消
 * - `COMPLETED` - 已完成
 */
export enum LogisticsRefundStatus {
  PENDING,
  REJECTED,
  WAITING,
  APPROVED,
  RECEIVED,
  REFUNDED,
  CANCELLED,
  COMPLETED,
}

/**
 * 物流退货状态 - 字典
 *
 * @see {@link LogisticsRefundStatus}
 */
export const LOGISTICS_REFUND_STATUSES = [
  { label: '待商家审批', value: LogisticsRefundStatus.PENDING, color: ColorName.ORANGERED },
  { label: '商家已拒绝', value: LogisticsRefundStatus.REJECTED, color: ColorName.RED },
  { label: '待买家退货', value: LogisticsRefundStatus.WAITING, color: ColorName.ORANGERED },
  { label: '待商家收货', value: LogisticsRefundStatus.APPROVED, color: ColorName.ARCOBLUE },
  { label: '待商家退款', value: LogisticsRefundStatus.RECEIVED, color: ColorName.ARCOBLUE },
  { label: '商家已退款', value: LogisticsRefundStatus.REFUNDED, color: ColorName.GREEN },
  { label: '已取消', value: LogisticsRefundStatus.CANCELLED, color: ColorName.GRAY },
  { label: '已完成', value: LogisticsRefundStatus.COMPLETED, color: ColorName.GRAY },
]

// --------------------------------
// 物流 - 换货状态
// --------------------------------

/**
 * 物流换货状态 - 枚举
 *
 * - `PENDING` - 待商家审批
 * - `REJECTED` - 商家已拒绝
 * - `WAITING` - 待买家退货
 * - `APPROVED` - 待商家收货
 * - `RECEIVED` - 待商家换货
 * - `APPROVED_AGAIN` - 待买家收货
 * - `RECEIVED_AGAIN` - 待买家评价
 * - `CANCELLED` - 已取消
 * - `COMPLETED` - 已完成
 */
export enum LogisticExchangeStatus {
  PENDING,
  REJECTED,
  WAITING,
  APPROVED,
  RECEIVED,
  APPROVED_AGAIN,
  RECEIVED_AGAIN,
  CANCELLED,
  COMPLETED,
}

/**
 * 物流换货状态 - 字典
 *
 * @see {@link LogisticsExchangeStatus}
 */
export const LOGISTICS_EXCHANGE_STATUSES = [
  { label: '待商家审批', value: LogisticExchangeStatus.PENDING, color: ColorName.ORANGERED },
  { label: '商家已拒绝', value: LogisticExchangeStatus.REJECTED, color: ColorName.RED },
  { label: '待买家退货', value: LogisticExchangeStatus.WAITING, color: ColorName.ORANGERED },
  { label: '待商家收货', value: LogisticExchangeStatus.APPROVED, color: ColorName.ARCOBLUE },
  { label: '待商家换货', value: LogisticExchangeStatus.RECEIVED, color: ColorName.ARCOBLUE },
  { label: '待买家收货', value: LogisticExchangeStatus.APPROVED_AGAIN, color: ColorName.ARCOBLUE },
  { label: '待买家评价', value: LogisticExchangeStatus.RECEIVED_AGAIN, color: ColorName.ARCOBLUE },
  { label: '已取消', value: LogisticExchangeStatus.CANCELLED, color: ColorName.GRAY },
  { label: '已完成', value: LogisticExchangeStatus.COMPLETED, color: ColorName.GRAY },
]

// --------------------------------
// 物流 - 退货运费承担方
// --------------------------------

/**
 * 物流退货运费承担方 - 枚举
 *
 * - `SELLER` - 商家承担退费运费
 * - `BUYER` - 买家承担退货运费
 */
export enum LogisticsReturnFreightPayer {
  SELLER = 1,
  BUYER,
}

/**
 * 物流退货运费承担方 - 字典
 *
 * @see {@link LogisticsReturnFreightPayer}
 */
export const LOGISTICS_RETURN_FREIGHT_PAYERS = [
  { label: '商家承担', value: LogisticsReturnFreightPayer.SELLER },
  { label: '买家承担', value: LogisticsReturnFreightPayer.BUYER },
]

// --------------------------------
// 物流 - 运费支付方式
// --------------------------------

/**
 * 运费支付方式 - 枚举
 *
 * - `STD` - 统一运费
 * - `TPL` - 运费模板
 * - `COD` - 货到付款
 */
export enum LogisticsChargeMode {
  STD = 1,
  TPL,
  COD,
}

/**
 * 运费支付方式 - 字典
 *
 * @see {@link LogisticsChargeMode}
 */
export const LOGISTICS_CHARGE_MODES = [
  { label: '统一运费', value: LogisticsChargeMode.STD },
  { label: '运费模板', value: LogisticsChargeMode.TPL },
  { label: '货到付款', value: LogisticsChargeMode.COD },
]

// --------------------------------
// 物流 - 运费计算方式
// --------------------------------

/**
 * 运费计算方式 - 枚举
 *
 * - `WEIGHT`: 重量
 * - `VOLUME`: 体积
 * - `COUNT`: 数量
 */
export enum LogisticsCalcMode {
  WEIGHT = 1,
  VOLUME,
  COUNT,
}

/**
 * 运费计算方式 - 字典
 *
 * @see {@link LogisticsCalcMode}
 */
export const LOGISTICS_CALC_MODES = [
  { label: '按重量计费', name: '重量', unit: 'kg', value: LogisticsCalcMode.WEIGHT, color: ColorName.CYAN },
  { label: '按体积计费', name: '体积', unit: 'm<sup>3</sup>', value: LogisticsCalcMode.VOLUME, color: ColorName.PURPLE },
  { label: '按件数计费', name: '件数', unit: '件', value: LogisticsCalcMode.COUNT, color: ColorName.ARCOBLUE },
]

// --------------------------------
// 物流 - 地址管理 - 地址类型
// --------------------------------

/**
 * 地址类型 - 枚举
 *
 * - `SEND` - 发货地址
 * - `RECEIVE` - 收货地址
 */
export enum LogisticAddressType {
  SEND = 1,
  RECEIVE,
}

/**
 * 地址类型 - 字典
 *
 * @see {@link LogisticAddressType}
 */
export const LOGISTIC_ADDRESS_TYPES = [
  { label: '发货地址', value: LogisticAddressType.SEND, color: ColorName.ARCOBLUE },
  { label: '收货地址', value: LogisticAddressType.RECEIVE, color: ColorName.PURPLE },
]
