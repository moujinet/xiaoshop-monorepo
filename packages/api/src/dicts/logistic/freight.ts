import {
  ColorName,
  type IDict,
  LogisticFreightCalcMode,
} from '@xiaoshop/shared'

/**
 * 运费计算方式 - 字典
 *
 * @see {@link LogisticFreightCalcMode}
 */
export const LOGISTIC_FREIGHT_CALC_MODES: IDict[] = [
  { value: '重量', unit: 'kg', key: LogisticFreightCalcMode.WEIGHT, color: ColorName.CYAN },
  { value: '体积', unit: 'm<sup>3</sup>', key: LogisticFreightCalcMode.VOLUME, color: ColorName.PURPLE },
  { value: '件数', unit: '件', key: LogisticFreightCalcMode.COUNT, color: ColorName.ARCOBLUE },
]
