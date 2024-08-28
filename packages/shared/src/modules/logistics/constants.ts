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
  EXPRESS = 'express',
  SELF = 'self',
  LOCAL = 'local',
  NONE = 'none',
}

/**
 * 物流发货方式 - 字典
 *
 * @see {@link ILogisticsDeliveryMethod}
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
 *
 * @see {@link ILogisticsDeliveryType}
 */
export enum LogisticsDeliveryType {
  DELIVERY = 'delivery',
  REFUND = 'refund',
  EXCHANGE = 'exchange',
}

/**
 * 物流发货类型 - 字典
 *
 * @see {@link ILogisticsDeliveryType}
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
 *
 * @see {@link ILogisticsDeliveryStatus}
 */
export enum LogisticsDeliveryStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  RECEIVED = 'received',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

/**
 * 物流发货状态 - 字典
 *
 * @see {@link ILogisticsDeliveryStatus}
 */
export const LOGISTICS_DELIVERY_STATUSES = [
  { label: '待商家发货', value: LogisticsDeliveryStatus.PENDING, color: 'orange' },
  { label: '待买家收货', value: LogisticsDeliveryStatus.APPROVED, color: 'arcoblue' },
  { label: '待买家评价', value: LogisticsDeliveryStatus.RECEIVED, color: 'green' },
  { label: '已取消', value: LogisticsDeliveryStatus.CANCELLED, color: 'gray' },
  { label: '已完成', value: LogisticsDeliveryStatus.COMPLETED, color: 'gray' },
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
 *
 * @see {@link ILogisticsRefundStatus}
 */
export enum LogisticsRefundStatus {
  PENDING = 'pending',
  REJECTED = 'rejected',
  WAITING = 'waiting',
  APPROVED = 'approved',
  RECEIVED = 'received',
  REFUNDED = 'refunded',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

/**
 * 物流退货状态 - 字典
 *
 * @see {@link ILogisticsRefundStatus}
 */
export const LOGISTICS_REFUND_STATUSES = [
  { label: '待商家审批', value: LogisticsRefundStatus.PENDING, color: 'orange' },
  { label: '商家已拒绝', value: LogisticsRefundStatus.REJECTED, color: 'red' },
  { label: '待买家退货', value: LogisticsRefundStatus.WAITING, color: 'orange' },
  { label: '待商家收货', value: LogisticsRefundStatus.APPROVED, color: 'arcoblue' },
  { label: '待商家退款', value: LogisticsRefundStatus.RECEIVED, color: 'arcoblue' },
  { label: '商家已退款', value: LogisticsRefundStatus.REFUNDED, color: 'green' },
  { label: '已取消', value: LogisticsRefundStatus.CANCELLED, color: 'gray' },
  { label: '已完成', value: LogisticsRefundStatus.COMPLETED, color: 'gray' },
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
 *
 * @see {@link ILogisticsExchangeStatus}
 */
export enum LogisticExchangeStatus {
  PENDING = 'pending',
  REJECTED = 'rejected',
  WAITING = 'waiting',
  APPROVED = 'approved',
  RECEIVED = 'received',
  APPROVED_AGAIN = 'approvedAgain',
  RECEIVED_AGAIN = 'receivedAgain',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

/**
 * 物流换货状态 - 字典
 *
 * @see {@link ILogisticsExchangeStatus}
 */
export const LOGISTICS_EXCHANGE_STATUSES = [
  { label: '待商家审批', value: LogisticExchangeStatus.PENDING, color: 'orange' },
  { label: '商家已拒绝', value: LogisticExchangeStatus.REJECTED, color: 'red' },
  { label: '待买家退货', value: LogisticExchangeStatus.WAITING, color: 'orange' },
  { label: '待商家收货', value: LogisticExchangeStatus.APPROVED, color: 'arcoblue' },
  { label: '待商家换货', value: LogisticExchangeStatus.RECEIVED, color: 'arcoblue' },
  { label: '待买家收货', value: LogisticExchangeStatus.APPROVED_AGAIN, color: 'arcoblue' },
  { label: '待买家评价', value: LogisticExchangeStatus.RECEIVED_AGAIN, color: 'arcoblue' },
  { label: '已取消', value: LogisticExchangeStatus.CANCELLED, color: 'gray' },
  { label: '已完成', value: LogisticExchangeStatus.COMPLETED, color: 'gray' },
]

// --------------------------------
// 物流 - 退货运费承担方
// --------------------------------

/**
 * 物流退货运费承担方 - 枚举
 *
 * - `SELLER` - 商家承担退费运费
 * - `BUYER` - 买家承担退货运费
 *
 * @see {@link ILogisticsReturnFreightPayer}
 */
export enum LogisticsReturnFreightPayer {
  SELLER = 'seller',
  BUYER = 'buyer',
}

/**
 * 物流退货运费承担方 - 字典
 *
 * @see {@link ILogisticsReturnFreightPayer}
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
 *
 * @see {@link ILogisticsChargeMode}
 */
export enum LogisticsChargeMode {
  STD = 'std',
  TPL = 'tpl',
  COD = 'cod',
}

/**
 * 运费支付方式 - 字典
 *
 * @see {@link ILogisticsChargeMode}
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
 *
 * @see {@link ILogisticsCalcMode}
 */
export enum LogisticsCalcMode {
  WEIGHT = 'weight',
  VOLUME = 'volume',
  COUNT = 'count',
}

/**
 * 运费计算方式 - 字典
 *
 * @see {@link ILogisticsCalcMode}
 */
export const LOGISTICS_CALC_MODES = [
  { label: '按重量计费', name: '重量', unit: 'kg', value: LogisticsCalcMode.WEIGHT, color: 'cyan' },
  { label: '按体积计费', name: '体积', unit: 'm<sup>3</sup>', value: LogisticsCalcMode.VOLUME, color: 'purple' },
  { label: '按件数计费', name: '件数', unit: '件', value: LogisticsCalcMode.COUNT, color: 'arcoblue' },
]

// --------------------------------
// 物流 - 地址管理 - 地址类型
// --------------------------------

/**
 * 地址类型 - 枚举
 *
 * - `SEND` - 发货地址
 * - `RECEIVE` - 收货地址
 *
 * @see {@link ILogisticAddressType}
 */
export enum LogisticAddressType {
  SEND = 'send',
  RECEIVE = 'receive',
}

/**
 * 地址类型 - 字典
 *
 * @see {@link ILogisticAddressType}
 */
export const LOGISTIC_ADDRESS_TYPES = [
  { label: '发货地址', value: LogisticAddressType.SEND, color: 'arcoblue' },
  { label: '收货地址', value: LogisticAddressType.RECEIVE, color: 'purple' },
]
