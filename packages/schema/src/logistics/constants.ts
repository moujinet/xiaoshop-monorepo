// -----------------------------------------------
// 物流 - 发货状态
// -----------------------------------------------

/**
 * 枚举: 物流发货状态
 *
 * - `PENDING` - 待发货
 * - `DELIVERED` - 已发货
 * - `RECEIVED` - 已收货
 */
export enum LogisticsDeliveryStatus {
  PENDING = 'pending',
  DELIVERED = 'delivered',
  RECEIVED = 'received',
}

/**
 * 字典: 物流发货状态
 *
 * @see {@link ILogisticsDeliveryStatus}
 */
export const LOGISTICS_DELIVERY_STATUSES = [
  { label: '待发货', value: LogisticsDeliveryStatus.PENDING, color: 'orange' },
  { label: '已发货', value: LogisticsDeliveryStatus.DELIVERED, color: 'blue' },
  { label: '已收货', value: LogisticsDeliveryStatus.RECEIVED, color: 'gray' },
]

// -----------------------------------------------
// 物流 - 发货类型
// -----------------------------------------------

/**
 * 枚举: 物流发货类型
 *
 * - `DELIVERY` - 发货
 * - `RETURN` - 退货
 * - `REPLACE` - 换货
 */
export enum LogisticsDeliveryType {
  DELIVERY = 'delivery',
  RETURN = 'return',
  REPLACE = 'replace',
}

/**
 * 字典: 物流发货类型
 *
 * @see {@link ILogisticsDeliveryType}
 */
export const LOGISTICS_DELIVERY_TYPES = [
  { label: '发货', value: LogisticsDeliveryType.DELIVERY },
  { label: '退货', value: LogisticsDeliveryType.RETURN },
  { label: '换货', value: LogisticsDeliveryType.REPLACE },
]

// -----------------------------------------------
// 物流 - 发货方式
// -----------------------------------------------

/**
 * 枚举: 物流发货方式
 *
 * - `NONE` - 无需发货
 * - `EXPRESS` - 物流快递
 * - `SELF` - 到店自提
 * - `LOCAL` - 同城配送
 */
export enum LogisticsDeliveryMode {
  NONE = 'none',
  EXPRESS = 'express',
  SELF = 'self',
  LOCAL = 'local',
}

/**
 * 字典: 物流发货方式
 *
 * @see {@link ILogisticsDeliveryMode}
 */
export const LOGISTICS_DELIVERY_MODES = [
  { label: '无需发货', value: LogisticsDeliveryMode.NONE },
  { label: '物流快递', value: LogisticsDeliveryMode.EXPRESS },
  { label: '到店自提', value: LogisticsDeliveryMode.SELF },
  { label: '同城配送', value: LogisticsDeliveryMode.LOCAL },
]

// -----------------------------------------------
// 物流 - 运费计算方式
// -----------------------------------------------

/**
 * 枚举: 物流运费计算方式
 *
 * - `WEIGHT` - 按重量计费
 * - `VOLUME` - 按体积计费
 * - `COUNT` - 按件计费
 */
export enum LogisticsFreightTemplateCalcMode {
  WEIGHT = 'weight',
  VOLUME = 'volume',
  COUNT = 'count',
}

/**
 * 字典: 物流运费计算方式
 *
 * @see {@link ILogisticsFreightTemplateCalcMode}
 */
export const LOGISTICS_FREIGHT_TEMPLATE_CALC_MODES = [
  { label: '按重量计费', name: '重', unit: 'kg', value: LogisticsFreightTemplateCalcMode.WEIGHT },
  { label: '按体积计费', name: '体积', unit: 'm<sup>3</sup>', value: LogisticsFreightTemplateCalcMode.VOLUME },
  { label: '按件计费', name: '件', unit: '件', value: LogisticsFreightTemplateCalcMode.COUNT },
]
