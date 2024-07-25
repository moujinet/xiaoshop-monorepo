import type {
  LogisticsDeliveryModeEnum,
  LogisticsDeliveryStatusEnum,
  LogisticsDeliveryTypeEnum,
  LogisticsFreightTemplateCalcModeEnum,
} from '@/logistics/constants'

/**
 * 物流发货状态
 *
 * - `PENDING`: 待发货
 * - `DELIVERED`: 已发货
 * - `RECEIVED`: 已收货
 *
 * @see {@link LogisticsDeliveryStatusEnum}
 */
export type ILogisticsDeliveryStatus = LogisticsDeliveryStatusEnum

/**
 * 物流发货类型
 *
 * - `DELIVERY`: 发货
 * - `RETURN`: 退货
 * - `REPLACE`: 换货
 *
 * @see {@link LogisticsDeliveryTypeEnum}
 */
export type ILogisticsDeliveryType = LogisticsDeliveryTypeEnum

/**
 * 物流发货方式
 *
 * - `NONE`: 无需发货
 * - `EXPRESS`: 物流快递
 * - `SELF`: 到店自提
 * - `LOCAL`: 同城配送
 *
 * @see {@link LogisticsDeliveryModeEnum}
 */
export type ILogisticsDeliveryMode = LogisticsDeliveryModeEnum

/**
 * 物流 - 运费计算方式
 *
 * - `WEIGHT` - 按重量计费
 * - `VOLUME` - 按体积计费
 * - `COUNT` - 按件计费
 *
 * @see {@link LogisticsFreightTemplateCalcModeEnum}
 */
export type ILogisticsFreightTemplateCalcMode = LogisticsFreightTemplateCalcModeEnum
