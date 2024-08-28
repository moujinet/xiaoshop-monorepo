import type {
  LogisticAddressType,
  LogisticExchangeStatus,
  LogisticsCalcMode,
  LogisticsChargeMode,
  LogisticsDeliveryMethod,
  LogisticsDeliveryStatus,
  LogisticsDeliveryType,
  LogisticsRefundStatus,
  LogisticsReturnFreightPayer,
} from './constants'

/**
 * 物流发货方式
 *
 * - `express`: 物流快递
 * - `self`: 到店自提
 * - `local`: 同城配送
 * - `none`: 无需发货
 *
 * @see {@link LogisticsDeliveryMethod}
 */
export type ILogisticsDeliveryMethod = `${LogisticsDeliveryMethod}`

/**
 * 物流发货类型
 *
 * - `delivery`: 发货
 * - `refund`: 退货
 * - `exchange`: 换货
 *
 * @see {@link LogisticsDeliveryType}
 */
export type ILogisticsDeliveryType = `${LogisticsDeliveryType}`

/**
 * 物流发货状态
 *
 * - `pending`: 待商家发货
 * - `approved`: 待买家收货
 * - `received`: 待买家评价
 * - `cancelled`: 已取消
 * - `completed`: 已完成
 *
 * @see {@link LogisticsDeliveryStatus}
 */
export type ILogisticsDeliveryStatus = `${LogisticsDeliveryStatus}`

/**
 * 物流退货状态
 *
 * - `pending`: 待商家审批
 * - `rejected`: 商家已拒绝
 * - `waiting`: 待买家退货
 * - `approved`: 待商家收货
 * - `received`: 待商家退款
 * - `refunded`: 商家已退款
 * - `cancelled`: 已取消
 * - `completed`: 已完成
 *
 * @see {@link LogisticsRefundStatus}
 */
export type ILogisticsRefundStatus = `${LogisticsRefundStatus}`

/**
 * 物流换货状态
 *
 * - `pending` - 待商家审批
 * - `rejected` - 商家已拒绝
 * - `waiting` - 待买家退货
 * - `approved` - 待商家收货
 * - `received` - 待商家换货
 * - `approvedAgain` - 待买家收货
 * - `receivedAgain` - 待买家评价
 * - `cancelled` - 已取消
 * - `completed` - 已完成
 *
 * @see {@link LogisticExchangeStatus}
 */
export type ILogisticExchangeStatus = `${LogisticExchangeStatus}`

/**
 * 物流运费承担方
 *
 * - `seller` - 商家承担运费
 * - `buyer` - 买家承担运费
 *
 * @see {@link LogisticsReturnFreightPayer}
 */
export type ILogisticsReturnFreightPayer = `${LogisticsReturnFreightPayer}`

/**
 * 运费支付方式
 *
 * - `std` - 统一运费
 * - `tpl` - 运费模板
 * - `cod` - 货到付款
 *
 * @see {@link LogisticsChargeMode}
 */
export type ILogisticsChargeMode = `${LogisticsChargeMode}`

/**
 * 运费计算方式
 *
 * - `weight`: 重量
 * - `volume`: 体积
 * - `count`: 数量
 *
 * @see {@link LogisticsCalcMode}
 */
export type ILogisticsCalcMode = `${LogisticsCalcMode}`

/**
 * 物流地址类型
 *
 * - `send`: 发货地址
 * - `receive`: 收货地址
 *
 * @see {@link LogisticAddressType}
 */
export type ILogisticAddressType = `${LogisticAddressType}`
