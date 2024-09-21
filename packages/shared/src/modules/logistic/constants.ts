// --------------------------------
// 发货管理 - 发货类型
// --------------------------------

/**
 * 物流发货类型 - 枚举
 *
 * - `DELIVERY` - 发货
 * - `REFUND` - 退货
 * - `EXCHANGE` - 换货/重发
 */
export enum LogisticDeliveryType {
  DELIVERY = 1,
  REFUND,
  EXCHANGE,
}

// --------------------------------
// 发货管理 - 发货状态
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
export enum LogisticDeliveryStatus {
  PENDING,
  APPROVED,
  RECEIVED,
  CANCELLED,
  COMPLETED,
}

// --------------------------------
// 发货管理 - 运费模板计算方式
// --------------------------------

/**
 * 运费计算方式 - 枚举
 *
 * - `WEIGHT`: 重量
 * - `VOLUME`: 体积
 * - `COUNT`: 数量
 */
export enum LogisticFreightCalcMode {
  WEIGHT = 1,
  VOLUME,
  COUNT,
}

// --------------------------------
// 发货管理 - 地址信息 - 地址类型
// --------------------------------

/**
 * 地址类型 - 枚举
 *
 * - `DELIVERY` - 发货地址
 * - `RECEIVE` - 收货地址
 */
export enum LogisticAddressType {
  DELIVERY = 1,
  RECEIVE,
}

// --------------------------------
// 发货管理 - 地址信息 - 地址归属
// --------------------------------

/**
 * 地址归属 - 枚举
 *
 * - `SELLER` - 商家
 * - `BUYER` - 买家
 */
export enum LogisticAddressOwner {
  SELLER = 1,
  BUYER,
}
