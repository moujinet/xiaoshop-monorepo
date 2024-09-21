import {
  ColorName,
  type IDict,
  LogisticDeliveryStatus,
  LogisticDeliveryType,
} from '@xiaoshop/shared'

/**
 * 物流发货类型 - 字典
 *
 * @see {@link LogisticDeliveryType}
 */
export const LOGISTIC_DELIVERY_TYPES: IDict[] = [
  { value: '发货', key: LogisticDeliveryType.DELIVERY },
  { value: '退款', key: LogisticDeliveryType.REFUND },
  { value: '换货/重发', key: LogisticDeliveryType.EXCHANGE },
]

/**
 * 物流发货状态 - 字典
 *
 * @see {@link LogisticDeliveryStatus}
 */
export const LOGISTIC_DELIVERY_STATUSES: IDict[] = [
  { value: '待商家发货', key: LogisticDeliveryStatus.PENDING, color: ColorName.ORANGERED },
  { value: '待买家收货', key: LogisticDeliveryStatus.APPROVED, color: ColorName.ARCOBLUE },
  { value: '待买家评价', key: LogisticDeliveryStatus.RECEIVED, color: ColorName.GREEN },
  { value: '已取消', key: LogisticDeliveryStatus.CANCELLED, color: ColorName.GRAY },
  { value: '已完成', key: LogisticDeliveryStatus.COMPLETED, color: ColorName.GRAY },
]
