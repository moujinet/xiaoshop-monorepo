import {
  ColorName,
  type IDict,
  LogisticAddressOwner,
  LogisticAddressType,
} from '@xiaoshop/shared'

/**
 * 地址类型 - 字典
 *
 * @see {@link LogisticAddressType}
 */
export const LOGISTIC_ADDRESS_TYPES: IDict[] = [
  { value: '发货地址', key: LogisticAddressType.DELIVERY, color: ColorName.ARCOBLUE },
  { value: '收货地址', key: LogisticAddressType.RECEIVE, color: ColorName.PURPLE },
]

/**
 * 地址归属 - 字典
 *
 * @see {@link LogisticAddressOwner}
 */
export const LOGISTIC_ADDRESS_OWNERS: IDict[] = [
  { value: '商家', key: LogisticAddressOwner.SELLER, color: ColorName.ARCOBLUE },
  { value: '买家', key: LogisticAddressOwner.BUYER, color: ColorName.ORANGERED },
]
