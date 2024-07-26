import type {
  LogisticsDeliveryMode,
  LogisticsDeliveryStatus,
  LogisticsDeliveryType,
  LogisticsFreightTemplateCalcMode,
} from '@/logistics/constants'

/**
 * 物流发货状态
 *
 * - `PENDING`: 待发货
 * - `DELIVERED`: 已发货
 * - `RECEIVED`: 已收货
 *
 * @see {@link LogisticsDeliveryStatus}
 */
export type ILogisticsDeliveryStatus = typeof LogisticsDeliveryStatus[keyof typeof LogisticsDeliveryStatus]

/**
 * 物流发货类型
 *
 * - `DELIVERY`: 发货
 * - `RETURN`: 退货
 * - `REPLACE`: 换货
 *
 * @see {@link LogisticsDeliveryType}
 */
export type ILogisticsDeliveryType = typeof LogisticsDeliveryType[keyof typeof LogisticsDeliveryType]

/**
 * 物流发货方式
 *
 * - `NONE`: 无需发货
 * - `EXPRESS`: 物流快递
 * - `SELF`: 到店自提
 * - `LOCAL`: 同城配送
 *
 * @see {@link LogisticsDeliveryMode}
 */
export type ILogisticsDeliveryMode = typeof LogisticsDeliveryMode[keyof typeof LogisticsDeliveryMode]

/**
 * 物流 - 运费计算方式
 *
 * - `WEIGHT` - 按重量计费
 * - `VOLUME` - 按体积计费
 * - `COUNT` - 按件计费
 *
 * @see {@link LogisticsFreightTemplateCalcMode}
 */
export type ILogisticsFreightTemplateCalcMode = typeof LogisticsFreightTemplateCalcMode[keyof typeof LogisticsFreightTemplateCalcMode]
