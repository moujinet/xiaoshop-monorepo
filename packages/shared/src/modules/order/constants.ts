import { ColorName } from '~/common'

// --------------------------------
// 订单 - 状态
// --------------------------------

/**
 * 订单状态 - 枚举
 *
 * - `PENDING`: 待付款
 * - `PAID`: 待发货
 * - `DELIVERED`: 待收货
 * - `RECEIVED`: 待评价
 * - `FINISHED`: 已完成
 * - `REFUNDED`: 已退款
 * - `CANCELED`: 已取消
 * - `DELETED`: 已删除
 */
export enum OrderStatus {
  PENDING,
  PAID,
  DELIVERED,
  RECEIVED,
  FINISHED,
  REFUNDED,
  CANCELED,
  DELETED,
}

/**
 * 订单状态 - 字典
 *
 * @see {@link OrderStatus}
 */
export const ORDER_STATUSES = [
  { label: '待付款', value: OrderStatus.PENDING, color: ColorName.CYAN },
  { label: '待发货', value: OrderStatus.PAID, color: ColorName.ORANGERED },
  { label: '待收货', value: OrderStatus.DELIVERED, color: ColorName.ARCOBLUE },
  { label: '待评价', value: OrderStatus.RECEIVED, color: ColorName.PURPLE },
  { label: '已完成', value: OrderStatus.FINISHED, color: ColorName.GREEN },
  { label: '已退款', value: OrderStatus.REFUNDED, color: ColorName.RED },
  { label: '已取消', value: OrderStatus.CANCELED, color: ColorName.GRAY },
  { label: '已删除', value: OrderStatus.DELETED, color: ColorName.GRAY },
]

// --------------------------------
// 订单 - 类型
// --------------------------------

/**
 * 订单类型 - 枚举
 *
 * - `NORMAL`: 普通订单
 * - `CONNECT`: 云链订单
 */
export enum OrderType {
  NORMAL = 1,
  CONNECT,
}

/**
 * 订单类型 - 字典
 *
 * @see {@link OrderType}
 */
export const ORDER_TYPES = [
  { label: '普通订单', value: OrderType.NORMAL, color: ColorName.ARCOBLUE },
  { label: '云链订单', value: OrderType.CONNECT, color: ColorName.ORANGERED },
]

// --------------------------------
// 订单 - 来源
// --------------------------------

/**
 * 订单来源 - 枚举
 *
 * - `WECHAT_MP`: 微信小程序
 * - `WECHAT_OA`: 微信公众号
 * - `H5`: 手机端
 * - `APP_ANDROID`: Android APP
 * - `APP_IOS`: iOS APP
 * - `WEB`: 网页端
 * - `MANUAL`: 代客下单
 * - `Cashier`: 收银台
 */
export enum OrderSource {
  WECHAT_MP = 1,
  WECHAT_OA,
  H5,
  APP_ANDROID,
  APP_IOS,
  WEB,
  MANUAL,
  CASHIER,
}

/**
 * 订单来源 - 字典
 *
 * @see {@link OrderSource}
 */
export const ORDER_SOURCES = [
  { label: '微信小程序', value: OrderSource.WECHAT_MP, color: ColorName.GRAY, icon: 'mingcute:wechat-miniprogram' },
  { label: '微信公众号', value: OrderSource.WECHAT_OA, color: ColorName.GREEN, icon: 'mingcute:wechat' },
  { label: '手机端', value: OrderSource.H5, color: ColorName.ARCOBLUE, icon: 'mingcute:cellphone' },
  { label: 'Android APP', value: OrderSource.APP_ANDROID, color: ColorName.CYAN, icon: 'mingcute:android-2' },
  { label: 'iOS APP', value: OrderSource.APP_IOS, color: ColorName.GRAY, icon: 'mingcute:apple' },
  { label: '网页端', value: OrderSource.WEB, color: ColorName.ARCOBLUE, icon: 'mingcute:laptop' },
  { label: '代客下单', value: OrderSource.MANUAL, color: ColorName.ORANGE, icon: 'mingcute:user-edit' },
  { label: '收银台', value: OrderSource.CASHIER, color: ColorName.PURPLE, icon: 'mingcute:barcode-scan' },
]

// --------------------------------
// 订单 - 商品 - 状态
// --------------------------------

/**
 * 订单商品状态 - 枚举
 *
 * - `PENDING`: 待付款
 * - `PAID`: 已付款
 * - `DELIVERED`: 已发货
 * - `RECEIVED`: 已收货
 * - `FINISHED`: 已完成
 * - `AFTER_SALE`: 售后中
 * - `REFUNDED`: 已退款
 */
export enum OrderProductStatus {
  PENDING,
  PAID,
  DELIVERED,
  RECEIVED,
  FINISHED,
  AFTER_SALE,
  REFUNDED,
}

/**
 * 订单商品状态 - 字典
 *
 * @see {@link OrderProductStatus}
 */
export const ORDER_PRODUCT_STATUSES = [
  { label: '待付款', value: OrderProductStatus.PENDING, color: ColorName.ARCOBLUE },
  { label: '已付款', value: OrderProductStatus.PAID, color: ColorName.GREEN },
  { label: '已发货', value: OrderProductStatus.DELIVERED, color: ColorName.ORANGE },
  { label: '已收货', value: OrderProductStatus.RECEIVED, color: ColorName.ORANGERED },
  { label: '已完成', value: OrderProductStatus.FINISHED, color: ColorName.GRAY },
  { label: '售后中', value: OrderProductStatus.AFTER_SALE, color: ColorName.RED },
  { label: '已退款', value: OrderProductStatus.REFUNDED, color: ColorName.PURPLE },
]
